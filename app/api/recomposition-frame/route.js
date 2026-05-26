const TARGET_URL = "https://recomposition-official.ru/";
const CACHE_TTL = 1000 * 60 * 10;

export const dynamic = "force-dynamic";

let cachedHtml = null;
let cachedAt = 0;

function withPreviewStyles(html) {
  const scrollbarStyle = `
    <style>
      html {
        scrollbar-width: none;
      }

      html,
      body {
        overflow-y: auto !important;
        -webkit-overflow-scrolling: touch;
      }

      ::-webkit-scrollbar {
        width: 0;
        height: 0;
      }
    </style>
  `;

  return html
    .replace(/<head([^>]*)>/i, `<head$1><base href="${TARGET_URL}">${scrollbarStyle}`)
    .replace(/<meta[^>]+http-equiv=["']?Content-Security-Policy["']?[^>]*>/gi, "");
}

export async function GET() {
  const now = Date.now();

  if (cachedHtml && now - cachedAt < CACHE_TTL) {
    return new Response(cachedHtml, {
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "public, max-age=300, stale-while-revalidate=600"
      }
    });
  }

  const response = await fetch(TARGET_URL, {
    headers: {
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36"
    },
    cache: "force-cache",
    next: { revalidate: 600 }
  });

  if (!response.ok) {
    return new Response("Unable to load Recomposition preview", { status: 502 });
  }

  const html = withPreviewStyles(await response.text());
  cachedHtml = html;
  cachedAt = now;

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=300, stale-while-revalidate=600"
    }
  });
}
