const previewTargets = {
  recomposition: "https://recomposition-official.ru/",
  cityoptic: "https://cityoptic.vercel.app/",
  "apex-ege": "https://apex-ege.vercel.app/",
  "atelier-build": "https://atelier-build-studio-site.vercel.app/",
  "atelier-nordovest": "https://atelier-nordovest.vercel.app/",
  "terra-forma": "https://terra-forma-chi.vercel.app/"
};

export const dynamic = "force-dynamic";

function previewPatch(targetOrigin) {
  return `
    <style>
      html,
      body {
        overflow-y: auto !important;
        -webkit-overflow-scrolling: touch !important;
      }

      img,
      picture,
      video,
      canvas {
        content-visibility: visible !important;
      }

      [loading="lazy"] {
        content-visibility: visible !important;
      }

      [style*="opacity:0"],
      [style*="opacity: 0"] {
        opacity: 1 !important;
        transform: none !important;
      }

      ::-webkit-scrollbar {
        width: 0;
        height: 0;
      }
    </style>
    <script>
      (() => {
        const nativeObserver = window.IntersectionObserver;
        const nativeReplaceState = window.history.replaceState;
        const nativePushState = window.history.pushState;
        const targetOrigin = "${targetOrigin}";

        const safeHistoryUrl = (url) => {
          if (url == null) return url;

          try {
            const parsed = new URL(url, window.location.href);
            if (parsed.origin === targetOrigin) {
              return window.location.pathname + window.location.search + window.location.hash;
            }
          } catch {
            return url;
          }

          return url;
        };

        window.history.replaceState = function replaceState(state, title, url) {
          return nativeReplaceState.call(this, state, title, safeHistoryUrl(url));
        };

        window.history.pushState = function pushState(state, title, url) {
          return nativePushState.call(this, state, title, safeHistoryUrl(url));
        };

        if (nativeObserver) {
          window.IntersectionObserver = class {
            constructor(callback) {
              this.callback = callback;
              this.items = new Set();
            }

            observe(target) {
              this.items.add(target);
              window.setTimeout(() => {
                const rect = target.getBoundingClientRect();
                this.callback([{
                  target,
                  isIntersecting: true,
                  intersectionRatio: 1,
                  boundingClientRect: rect,
                  intersectionRect: rect,
                  rootBounds: document.documentElement.getBoundingClientRect(),
                  time: performance.now()
                }], this);
              }, 0);
            }

            unobserve(target) {
              this.items.delete(target);
            }

            disconnect() {
              this.items.clear();
            }

            takeRecords() {
              return [];
            }
          };
        }

        const forcePreviewWake = () => {
          document.querySelectorAll("img").forEach((image) => {
            image.loading = "eager";
            image.decoding = "sync";
            if (image.src.startsWith(window.location.origin + "/_next/")) {
              image.src = targetOrigin + image.src.slice(window.location.origin.length);
            }
            if (image.srcset.includes(window.location.origin + "/_next/")) {
              image.srcset = image.srcset.replaceAll(window.location.origin + "/_next/", targetOrigin + "/_next/");
            }
            if (image.dataset?.src && !image.getAttribute("src")) image.src = image.dataset.src;
            if (image.dataset?.srcset && !image.getAttribute("srcset")) image.srcset = image.dataset.srcset;
          });

          document.querySelectorAll("[loading='lazy']").forEach((element) => {
            element.setAttribute("loading", "eager");
          });

          window.dispatchEvent(new Event("scroll"));
          window.dispatchEvent(new Event("resize"));
          document.dispatchEvent(new Event("scroll"));
        };

        document.addEventListener("DOMContentLoaded", forcePreviewWake);
        window.addEventListener("load", forcePreviewWake);
        window.setTimeout(forcePreviewWake, 250);
        window.setTimeout(forcePreviewWake, 1000);
        window.setTimeout(forcePreviewWake, 2500);
      })();
    </script>
  `;
}

function patchHtml(html, targetUrl) {
  const target = new URL(targetUrl);
  const targetOrigin = target.origin;
  const withoutCsp = html.replace(/<meta[^>]+http-equiv=["']?Content-Security-Policy["']?[^>]*>/gi, "");
  const withAbsoluteAssets = withoutCsp
    .replace(/\/_next\//g, `${targetOrigin}/_next/`)
    .replace(/\b(src|href|poster|action)=["']\/(?!\/)/gi, `$1="${targetOrigin}/`)
    .replace(/url\(["']?\/(?!\/)/gi, `url("${targetOrigin}/`);
  const patch = previewPatch(targetOrigin);

  if (/<head([^>]*)>/i.test(withAbsoluteAssets)) {
    return withAbsoluteAssets.replace(/<head([^>]*)>/i, `<head$1>${patch}`);
  }

  return `${patch}${withAbsoluteAssets}`;
}

export async function GET(_request, { params }) {
  const targetUrl = previewTargets[params.id];

  if (!targetUrl) {
    return new Response("Unknown preview", { status: 404 });
  }

  const response = await fetch(targetUrl, {
    headers: {
      "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1"
    },
    cache: "no-store"
  });

  if (!response.ok) {
    return new Response("Unable to load preview", { status: 502 });
  }

  const html = patchHtml(await response.text(), targetUrl);

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}
