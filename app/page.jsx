"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Globe2, Moon, MousePointer2, Sun, X } from "lucide-react";
import Image from "next/image";
import { forwardRef, useEffect, useMemo, useRef, useState } from "react";

const copy = {
  en: {
    nav: ["Systems", "Works", "Contact"],
    heroKicker: "PRIVATE DIGITAL SYSTEMS STUDIO",
    heroTitle: "P39.Studio",
    heroSub: "",
    heroAlt: "Private digital systems studio",
    start: "Start Project",
    servicesEyebrow: "About us",
    servicesTitle: "Core directions",
    servicesSub: "We shape digital systems around the task: from fast product launches to automation, integrations, and internal tools.",
    serviceGroups: [
      { title: "Web products", items: ["Landing pages", "Online stores", "Telegram web apps", "Telegram bots", "Widgets"] },
      { title: "Automation", items: ["Content creation", "AI assistants", "Process optimization"] },
      { title: "Custom development", items: ["ERP", "CRM", "AI integration"] }
    ],
    proof: "Identity, interaction, and digital systems share one disciplined visual language.",
    worksEyebrow: "Portfolio",
    worksTitle: "Selected work",
    worksDescription: "A live project example: structure, interface, visual rhythm, and interaction scenarios inside a finished digital product.",
    workMeta: ["Landing page", "Digital fitness product", "UX / UI"],
    workOpenSite: "Open site",
    terminalTitle: "Contact Protocol",
    contactDescription: "Enter your name and preferred contact. We will get back to you to discuss the project you are interested in.",
    footerPlace: "Russia / Worldwide",
    terminal: {
      init: "Initialize contact protocol...",
      name: "Enter your name:",
      method: "Contact method",
      methods: ["Telegram", "WhatsApp", "Email", "VK", "Phone"],
      contact: "Enter contact for follow-up:",
      project: "Describe your project:",
      transmitting: "Transmitting request...",
      success: "Request accepted.\nWe will contact you using the provided details. :)",
      unavailable: "Request accepted.\nWe will contact you using the provided details. :)",
      placeholderName: "",
      placeholderContact: "@alexcarter",
      placeholderProject: "AI automation system for Telegram sales funnel."
    }
  },
  ru: {
    nav: ["Системы", "Работы", "Контакт"],
    heroKicker: "ЧАСТНАЯ СТУДИЯ ЦИФРОВЫХ СИСТЕМ",
    heroTitle: "P39.Studio",
    heroSub: "",
    heroAlt: "Частная студия цифровых систем",
    start: "Начать проект",
    servicesTitle: "Основные направления",
    servicesSub: "Собираем цифровые решения вокруг задачи: от быстрых запусков и интерфейсов до автоматизации, интеграций и внутренних инструментов.",
    serviceGroups: [
      { title: "Web продукты", items: ["Лендинги", "Интернет-магазины", "Telegram web apps", "Telegram боты", "Виджеты"] },
      { title: "Автоматизация", items: ["Создание контента", "ИИ-помощники", "Оптимизация процессов"] },
      { title: "Кастомная разработка", items: ["ERP", "CRM", "Интеграция ИИ"] }
    ],
    proof: "Айдентика, взаимодействие и цифровые системы говорят на одном точном визуальном языке.",
    worksEyebrow: "Портфолио",
    worksTitle: "Примеры работ",
    worksDescription: "Показываем готовый цифровой продукт: структуру, интерфейс, визуальный ритм и сценарии взаимодействия.",
    workMeta: ["Лендинг", "Цифровой фитнес-продукт", "UX / UI"],
    workOpenSite: "Открыть сайт",
    terminalTitle: "Контактный протокол",
    contactDescription: "Укажите свое имя и контакт для обратной связи. Мы свяжемся с вами, чтобы обсудить интересующий вас проект.",
    footerPlace: "Россия / Весь мир",
    terminal: {
      init: "Инициализация контактного протокола...",
      name: "Введите ваше имя:",
      method: "Контакт для связи",
      methods: ["Telegram", "WhatsApp", "Email", "ВК", "Номер телефона"],
      contact: "Укажите контакт для связи:",
      project: "Опишите проект:",
      transmitting: "Передача запроса...",
      success: "Запрос принят.\nС вами свяжутся по указанным контактам. :)",
      unavailable: "Запрос принят.\nС вами свяжутся по указанным контактам. :)",
      placeholderName: "",
      placeholderContact: "@alexcarter",
      placeholderProject: "AI-автоматизация для Telegram-воронки продаж."
    }
  }
};

const decodeGlyphs = "/<>[]{}01_";

function longestText(...values) {
  return values.reduce((longest, value) => (value.length > longest.length ? value : longest), "");
}

const stableText = {
  nav: copy.ru.nav.map((item, index) => longestText(item, copy.en.nav[index])),
  heroAlt: longestText(copy.ru.heroAlt, copy.en.heroAlt),
  start: longestText(copy.ru.start, copy.en.start),
  servicesTitle: longestText(copy.ru.servicesTitle, copy.en.servicesTitle),
  servicesSub: longestText(copy.ru.servicesSub, copy.en.servicesSub),
  serviceGroups: copy.ru.serviceGroups.map((group, index) => ({
    title: longestText(group.title, copy.en.serviceGroups[index].title),
    items: group.items.map((item, itemIndex) => longestText(item, copy.en.serviceGroups[index].items[itemIndex]))
  })),
  proof: longestText(copy.ru.proof, copy.en.proof),
  worksEyebrow: longestText(copy.ru.worksEyebrow, copy.en.worksEyebrow),
  worksTitle: longestText(copy.ru.worksTitle, copy.en.worksTitle),
  worksDescription: longestText(copy.ru.worksDescription, copy.en.worksDescription),
  workMeta: copy.ru.workMeta.map((item, index) => longestText(item, copy.en.workMeta[index])),
  workOpenSite: longestText(copy.ru.workOpenSite, copy.en.workOpenSite),
  terminalTitle: longestText(copy.ru.terminalTitle, copy.en.terminalTitle),
  contactDescription: longestText(copy.ru.contactDescription, copy.en.contactDescription),
  footerPlace: longestText(copy.ru.footerPlace, copy.en.footerPlace)
};

const navTargets = ["#systems", "#works", "#contact"];
const navOutsideGapPx = 220;
const navLockedAxisShiftRem = -2.45;
const navPinnedDrift = 1;
const navPinnedLeftOffsetRatio = 0.125;

function scrambleText(value, tick) {
  return value
    .split("")
    .map((char, index) => {
      if (char === " " || char === "\n") return char;
      if (/[.,:;!?/()-]/.test(char)) return char;
      const shouldResolve = ((index + tick) % 5 === 0) || tick > 10 + (index % 6);
      return shouldResolve ? char : decodeGlyphs[(tick + index * 3) % decodeGlyphs.length];
    })
    .join("");
}

function revealScrambleText(value, tick) {
  const reveal = Math.min(value.length + 4, Math.floor(tick * 1.15));

  return value
    .split("")
    .map((char, index) => {
      if (char === " " || char === "\n") return index < reveal ? char : "\u00A0";
      if (index < reveal - 3) return char;
      if (index <= reveal) return decodeGlyphs[(tick + index * 3) % decodeGlyphs.length];
      return "\u00A0";
    })
    .join("");
}

function centeredRevealScrambleText(value, tick) {
  const reveal = Math.min(value.length, Math.floor(tick * 1.15));

  return value
    .slice(0, reveal)
    .split("")
    .map((char, index) => {
      if (char === " " || char === "\n") return char;
      if (index < reveal - 3) return char;
      return decodeGlyphs[(tick + index * 3) % decodeGlyphs.length];
    })
    .join("");
}

function DecodeText({ value, reserveValue, className = "", as = "span", active = false, tick = 0 }) {
  const Tag = as;
  const display = active ? scrambleText(value, tick) : value;
  const reserve = reserveValue || value;

  return (
    <Tag className={className} aria-label={value}>
      <span className="decode-stable">
        <span className="decode-stable__ghost" style={{ visibility: "hidden" }} aria-hidden="true">{reserve}</span>
        <span className="decode-stable__visible" aria-hidden="true">{display}</span>
      </span>
    </Tag>
  );
}
function HeroIntroText({ value, reserveValue, className = "", as = "p", active = false, tick = 0 }) {
  const Tag = as;
  const [introTick, setIntroTick] = useState(0);
  const [started, setStarted] = useState(false);
  const [complete, setComplete] = useState(false);
  const isCompactViewport = typeof window !== "undefined" && window.innerWidth <= 720;

  useEffect(() => {
    let interval;
    const startTimer = window.setTimeout(() => {
      setStarted(true);
      let nextTick = 0;
      interval = window.setInterval(() => {
        nextTick += 1;
        setIntroTick(nextTick);
        if (nextTick >= 34) {
          window.clearInterval(interval);
          setComplete(true);
        }
      }, 48);
    }, 3380);

    return () => {
      window.clearTimeout(startTimer);
      if (interval) window.clearInterval(interval);
    };
  }, []);

  const display = !started
    ? ""
    : complete
      ? active
        ? scrambleText(value, tick)
        : value
      : isCompactViewport
        ? revealScrambleText(value, introTick)
        : centeredRevealScrambleText(value, introTick);

  return (
    <Tag className={className} aria-label={value}>
      <span className="decode-stable">
        <span className="decode-stable__ghost" style={{ visibility: "hidden" }} aria-hidden="true">{reserveValue || value}</span>
        <span className="decode-stable__visible" aria-hidden="true">{display}</span>
      </span>
    </Tag>
  );
}

function HeroCtaLabel({ value, reserveValue, active = false, tick = 0 }) {
  const [introTick, setIntroTick] = useState(0);
  const [started, setStarted] = useState(false);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    let interval;
    const startTimer = window.setTimeout(() => {
      setStarted(true);
      let nextTick = 0;
      interval = window.setInterval(() => {
        nextTick += 1;
        setIntroTick(nextTick);
        if (nextTick >= 18) {
          window.clearInterval(interval);
          setComplete(true);
        }
      }, 45);
    }, 8330);

    return () => {
      window.clearTimeout(startTimer);
      if (interval) window.clearInterval(interval);
    };
  }, []);

  const display = !started
    ? ""
    : complete
      ? active
        ? scrambleText(value, tick)
        : value
      : revealScrambleText(value, introTick);

  return (
    <span className="hero-cta__label" aria-hidden="true">
      <span className="decode-stable">
        <span className="decode-stable__ghost" style={{ visibility: "hidden" }}>{reserveValue || value}</span>
        <span className="decode-stable__visible">{display}</span>
      </span>
    </span>
  );
}

function BrandText({ className = "", as = "span", variant = "compact", ...props }) {
  const Tag = as;
  if (variant === "hero") {
    return (
      <Tag className={`brand-logo brand-logo--hero ${className}`} {...props}>
        <span className="brand-logo__mark">P39</span>
        <span className="brand-logo__divider" aria-hidden="true" />
        <span className="brand-logo__studio">Studio</span>
      </Tag>
    );
  }

  return (
    <Tag className={`brand-logo ${className}`} {...props}>
      <span className="brand-logo__mark">P39</span>
      <span className="brand-logo__studio">.Studio</span>
    </Tag>
  );
}

function getClientPrompt() {
  if (typeof navigator === "undefined") return "Client Guest>";

  const platform = `${navigator.userAgent || ""} ${navigator.platform || ""}`.toLowerCase();

  if (/iphone/.test(platform)) return "iPhone Guest>";
  if (/android/.test(platform)) return "Android Guest>";
  if (/ipad|mac/.test(platform)) return "MacBook Guest>";
  if (/win/.test(platform)) return "C:\\Users\\Guest>";

  return "Client Guest>";
}

function needsContactHandle(method) {
  return method === "Telegram" || method === "ВК" || method === "VK";
}

function needsPhonePrefix(method) {
  return method === "WhatsApp" || method === "Номер телефона" || method === "Phone";
}

function getContactPrefix(method) {
  if (needsContactHandle(method)) return "@";
  if (needsPhonePrefix(method)) return "+";
  return "";
}

function cleanContactValue(method, value) {
  if (needsContactHandle(method)) return value.replace(/^@+/, "");
  if (needsPhonePrefix(method)) return value.replace(/^\++/, "");
  return value;
}

function getContactPlaceholder(method) {
  if (needsContactHandle(method)) return "username";
  if (needsPhonePrefix(method)) return "7 999 000-00-00";
  if (method === "Email") return "name@example.com";
  return "";
}

function TerminalModal({ open, onClose, lang }) {
  const t = copy[lang].terminal;
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: "", method: "Telegram", contact: "", project: "" });
  const [contactsByMethod, setContactsByMethod] = useState({});
  const [status, setStatus] = useState("idle");
  const [clientPrompt, setClientPrompt] = useState("Client Guest>");
  const [bootText, setBootText] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    setStep(0);
    setStatus("idle");
    setContactsByMethod({});
    setForm({ name: "", method: "Telegram", contact: "", project: "" });
    const prompt = getClientPrompt();
    const fullBootText = `${prompt} ${t.init}`;
    setClientPrompt(prompt);
    setBootText("");

    let tick = 0;
    let stepTimer;
    const interval = window.setInterval(() => {
      tick += 1;
      setBootText(fullBootText.slice(0, tick));

      if (tick >= fullBootText.length) {
        window.clearInterval(interval);
        stepTimer = window.setTimeout(() => setStep(1), 240);
      }
    }, 28);

    return () => {
      window.clearInterval(interval);
      if (stepTimer) window.clearTimeout(stepTimer);
    };
  }, [open, t.init]);

  useEffect(() => {
    if (!open) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 120);
  }, [open, step]);

  const keepInputFocus = () => {
    window.setTimeout(() => inputRef.current?.focus(), 0);
  };

  const lockActiveInput = () => {
    inputRef.current?.blur();
  };

  const submit = async () => {
    setStatus("sending");
    setStep(5);
    const contactPrefix = getContactPrefix(form.method);
    const contact = contactPrefix
      ? `${contactPrefix}${cleanContactValue(form.method, form.contact)}`
      : form.contact;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, contact })
      });
      setStatus(response.ok ? "success" : "local");
    } catch {
      setStatus("local");
    }
  };

  const advanceProtocol = () => {
    if (step === 1 && form.name) {
      lockActiveInput();
      setStep(2);
    }
    if (step === 3 && form.contact) {
      lockActiveInput();
      submit();
    }
  };

  const updateContact = (value) => {
    const contact = cleanContactValue(form.method, value);
    setForm({ ...form, contact });
    setContactsByMethod((current) => ({ ...current, [form.method]: contact }));
  };

  const onEnter = (event) => {
    if (event.key !== "Enter" || event.shiftKey) return;
    event.preventDefault();
    advanceProtocol();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/62 px-4 py-6 backdrop-blur-2xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div
            className="cmd-window relative h-[min(88vh,42rem)] min-h-[36rem] w-full max-w-5xl overflow-hidden"
            style={{
              "--cmd-text": "#f1f1f1",
              "--cmd-muted": "#bdbdbd",
              "--cmd-dim": "#8f8f8f"
            }}
            initial={{ y: 24, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 18, scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="cmd-titlebar">
              <div className="cmd-titlebar__label">
                <img className="cmd-titlebar__logo" src="/p39-favicon.png" alt="" aria-hidden="true" />
                <span>{copy[lang].terminalTitle}</span>
              </div>
              <button onClick={onClose} className="cmd-titlebar__close" aria-label="Close">
                <X size={16} />
              </button>
            </div>
            <div className="cmd-screen" onClick={keepInputFocus}>
              <div className="cmd-output">
                <p className="cmd-boot-line" aria-label={`${clientPrompt} ${t.init}`}>{bootText}</p>
                {step >= 1 && (
                  <TerminalInput locked={step > 1} label={t.name} value={form.name} placeholder={t.placeholderName} onChange={(name) => setForm({ ...form, name })} onSubmit={advanceProtocol} onBlur={keepInputFocus} onKeyDown={onEnter} ref={step === 1 ? inputRef : null} />
                )}
                {step >= 2 && (
                  <div className="cmd-field">
                    <p className="cmd-label cmd-reveal-line" style={{ "--cmd-line-chars": t.method.length }}>{t.method}</p>
                    <div className="cmd-methods">
                      {t.methods.map((method) => (
                        <button key={method} disabled={step > 3} onClick={() => { if (step > 3) return; setForm({ ...form, method, contact: contactsByMethod[method] || "" }); setStep(3); }} className={`cmd-method ${form.method === method ? "is-selected" : ""}`}>
                          {method}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {step >= 3 && (
                  <TerminalInput locked={step > 3} prefix={getContactPrefix(form.method)} highlightAt={form.method === "Email"} label={t.contact} value={form.contact} placeholder={getContactPlaceholder(form.method)} onChange={updateContact} onSubmit={advanceProtocol} onBlur={keepInputFocus} onKeyDown={onEnter} ref={step === 3 ? inputRef : null} />
                )}
                {step === 5 && (
                  <div className="cmd-status">
                    {status === "sending" ? <span className="cmd-cursor" /> : <Check size={16} />}
                    <TerminalStatusText value={status === "sending" ? t.transmitting : status === "success" ? t.success : t.unavailable} />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const TerminalInput = ReactForwardInput("input");
const TerminalArea = ReactForwardInput("textarea");

function renderHighlightedAt(value, placeholder) {
  const isPlaceholder = !value;
  const text = value || placeholder || "";

  return text.split("").map((char, index) => (
    char === "@" && !isPlaceholder
      ? <span key={index} className="cmd-input-visual__accent">@</span>
      : <span key={index}>{char}</span>
  ));
}

function TerminalStatusText({ value }) {
  const smileIndex = value.indexOf(":)");

  if (smileIndex === -1) {
    return <p className="whitespace-pre-line">{value}</p>;
  }

  return (
    <p className="whitespace-pre-line">
      {value.slice(0, smileIndex)}
      <span className="cmd-status-smile">:)</span>
      {value.slice(smileIndex + 2)}
    </p>
  );
}

function ReactForwardInput(type) {
  const Comp = function TerminalField({ prefix = "", highlightAt = false, locked = false, label, value, placeholder, onChange, onSubmit, onBlur, onKeyDown }, ref) {
    const Element = type;
    const shouldHighlightAt = highlightAt && type === "input";

    return (
      <label className="cmd-field">
        <span className="cmd-label cmd-reveal-line" style={{ "--cmd-line-chars": label.length }}>{label}</span>
        <span className="cmd-input-row">
          {prefix && <span className="cmd-input-prefix" aria-hidden="true">{prefix}</span>}
          <span className="cmd-input-shell">
            {shouldHighlightAt && (
              <span className={`cmd-input-visual ${value ? "" : "is-placeholder"}`} aria-hidden="true">
                {renderHighlightedAt(value, placeholder)}
              </span>
            )}
            <Element
              ref={ref}
              value={value}
              placeholder={shouldHighlightAt ? "" : placeholder}
              onChange={(event) => onChange(event.target.value)}
              onBlur={locked ? undefined : onBlur}
              onKeyDown={onKeyDown}
              rows={type === "textarea" ? 4 : undefined}
              readOnly={locked}
              tabIndex={locked ? -1 : undefined}
              className={`cmd-input ${shouldHighlightAt ? "cmd-input--highlight-at" : ""} ${locked ? "is-locked" : ""}`}
            />
          </span>
          {value && !locked && (
            <button type="button" className="cmd-submit-symbol" onClick={onSubmit} aria-label="Continue">
              ↵
            </button>
          )}
        </span>
      </label>
    );
  };
  return forwardRef(Comp);
}

export default function Home() {
  const [lang, setLang] = useState("ru");
  const [theme, setTheme] = useState("dark");
  const [translation, setTranslation] = useState({ active: false, target: "ru", tick: 0 });
  const [themeVeil, setThemeVeil] = useState({ active: false, target: "dark" });
  const [modalOpen, setModalOpen] = useState(false);
  const [workPreviewUnlocked, setWorkPreviewUnlocked] = useState(true);
  const [navMotion, setNavMotion] = useState({ drift: 0, panelShift: 0 });
  const [navReady, setNavReady] = useState(false);
  const [mobileNavCollapsed, setMobileNavCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const displayLang = translation.active ? translation.target : lang;
  const t = copy[displayLang];

  useEffect(() => {
    const timer = window.setTimeout(() => setNavReady(true), 2300);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    const resetTimer = window.setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, 60);

    return () => window.clearTimeout(resetTimer);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.lang = lang;
  }, [theme, lang]);

  useEffect(() => {
    let frame = 0;

    const updateNavDrift = () => {
      frame = 0;
      const viewportWidth = document.documentElement.clientWidth || window.innerWidth;
      const isMobileViewport = viewportWidth <= 720;
      const nextCollapsed = isMobileViewport && window.scrollY > 36;
      setMobileNavCollapsed(nextCollapsed);
      if (!nextCollapsed) setMobileNavOpen(false);

      const panel = document.querySelector(".site-nav__panel");
      const worksSection = document.getElementById("works");
      const worksRect = worksSection?.getBoundingClientRect();
      const worksStyle = worksSection ? window.getComputedStyle(worksSection) : null;
      const rootFontSize = Number(window.getComputedStyle(document.documentElement).fontSize.replace("px", "")) || 16;
      const maxAxisWidth = rootFontSize * 80;
      const centeredPanelLeft = panel ? (viewportWidth - panel.offsetWidth) / 2 : viewportWidth / 2;
      const worksPaddingLeft = worksStyle ? Number(worksStyle.paddingLeft.replace("px", "")) || 0 : 0;
      const worksPaddingRight = worksStyle ? Number(worksStyle.paddingRight.replace("px", "")) || 0 : 0;
      const worksInnerWidth = worksRect ? worksRect.width - worksPaddingLeft - worksPaddingRight : 0;
      const lockedAxisWidth = Math.min(maxAxisWidth, worksInnerWidth);
      const lockedAxisLeft = worksRect
        ? worksRect.left + worksPaddingLeft + ((worksInnerWidth - lockedAxisWidth) / 2) + (navLockedAxisShiftRem * rootFontSize)
        : 0;
      const lockedAxisRight = lockedAxisLeft + lockedAxisWidth;
      const panelLeftOffset = panel ? panel.offsetWidth * navPinnedLeftOffsetRatio : 0;
      const panelShiftBase = worksRect ? lockedAxisRight - centeredPanelLeft + navOutsideGapPx - panelLeftOffset : 0;
      const viewportEdgeGap = isMobileViewport ? 0 : Math.max(24, worksPaddingRight);
      const panelMaxShift = panel ? viewportWidth - panel.offsetWidth - viewportEdgeGap - centeredPanelLeft : panelShiftBase;
      const panelShift = isMobileViewport ? panelShiftBase : Math.min(panelShiftBase, panelMaxShift);
      setNavMotion({
        drift: navPinnedDrift,
        panelShift: Math.round(panelShift),
        lift: 0
      });
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateNavDrift);
    };

    updateNavDrift();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const serviceGroups = useMemo(() => t.serviceGroups, [t.serviceGroups]);
  const controlsLocked = translation.active || themeVeil.active;

  const switchLanguage = () => {
    if (controlsLocked) return;
    const target = lang === "en" ? "ru" : "en";
    setTranslation({ active: true, target, tick: 0 });

    let tick = 0;
    const interval = window.setInterval(() => {
      tick += 1;
      setTranslation((current) => (current.active ? { ...current, tick } : current));
    }, 76);

    window.setTimeout(() => {
      window.clearInterval(interval);
      setLang(target);
      setTranslation({ active: false, target, tick: 0 });
    }, 1220);
  };

  const switchTheme = () => {
    if (controlsLocked) return;
    const target = theme === "dark" ? "light" : "dark";
    setThemeVeil({ active: true, target });

    window.setTimeout(() => {
      setTheme(target);
    }, 90);

    window.setTimeout(() => {
      setThemeVeil({ active: false, target });
    }, 920);
  };

  const decodeProps = { active: translation.active, tick: translation.tick };
  const languageButtonLabel = lang === "ru" ? "EN" : "RU";
  const servicesEyebrowLabel = displayLang === "ru" ? "О нас" : "About us";
  const servicesEyebrowReserve = longestText("О нас", "About us");
  const heroCtaLabel = displayLang === "ru" ? "Создать проект" : "Create Project";
  const heroCtaLabelReserve = longestText("Создать проект", "Create Project");
  const closeMobileNav = () => setMobileNavOpen(false);

  return (
    <main className="relative min-h-[100svh] overflow-hidden sm:min-h-screen">
      <div className="linear-bg" />
      <div className="texture" />
      <div className="grain" />
      <div className={`theme-veil theme-veil--${themeVeil.target} ${themeVeil.active ? "is-active" : ""}`} />
      <nav className={`site-nav ${navReady ? "is-ready" : ""} ${mobileNavCollapsed ? "is-mobile-collapsed" : ""} ${mobileNavOpen ? "is-mobile-open" : ""} fixed left-0 right-0 top-0 z-40 mx-auto flex h-20 max-w-7xl items-center justify-center px-5 sm:px-8`} style={{ "--nav-drift": navMotion.drift, "--nav-panel-shift": `${navMotion.panelShift}px`, "--nav-lift": `${navMotion.lift || 0}px` }}>
        <div className={`site-nav__panel panel flex items-center gap-1 rounded-full px-2 py-2 ${mobileNavCollapsed ? "is-mobile-collapsed" : ""} ${mobileNavOpen ? "is-mobile-open" : ""}`}>
          {t.nav.map((item, index) => (
            <a
              key={item}
              href={navTargets[index]}
              onClick={closeMobileNav}
              className={`site-nav__control ${index < 2 ? "inline-flex" : "hidden"} w-full items-center justify-center rounded-full px-1.5 py-2 text-center text-[0.54rem] uppercase tracking-[0.1em] text-[color:var(--muted)] transition hover:text-[color:var(--text)] sm:px-3 sm:text-xs sm:tracking-[0.18em] ${index < 2 ? "sm:inline-flex" : "sm:block"}`}
            >
              <DecodeText value={item} reserveValue={stableText.nav[index]} {...decodeProps} />
            </a>
          ))}
          <span className="mx-1 hidden h-4 w-px bg-[color:var(--line)] sm:block" />
          <button disabled={controlsLocked} onClick={switchLanguage} className="site-nav__control flex w-full items-center justify-center gap-1 rounded-full px-1.5 py-2 text-center text-[0.66rem] uppercase tracking-[0.08em] text-[color:var(--muted)] transition hover:text-[color:var(--text)] disabled:cursor-default disabled:opacity-80 sm:gap-2 sm:px-3 sm:text-xs sm:tracking-[0.18em]" aria-label="Switch language">
            <Globe2 size={14} className="hidden sm:block" />
            <span className="normal-case tracking-normal">{languageButtonLabel}</span>
          </button>
          <button disabled={controlsLocked} onClick={switchTheme} className="site-nav__control flex w-full items-center justify-center rounded-full p-2 text-[color:var(--muted)] transition hover:text-[color:var(--text)] disabled:cursor-default disabled:opacity-80" aria-label="Switch theme">
            {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
          </button>
          <button
            type="button"
            onClick={() => setMobileNavOpen((current) => !current)}
            className="site-nav__burger hidden items-center justify-center rounded-[1.05rem] text-[color:var(--text)] sm:hidden"
            aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileNavOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <div className={`site-nav__drawer panel ${mobileNavOpen ? "is-open" : ""}`}>
          {t.nav.map((item, index) => (
            <a key={`${item}-drawer`} href={navTargets[index]} onClick={closeMobileNav} className="site-nav__drawer-link">
              <DecodeText value={item} reserveValue={stableText.nav[index]} {...decodeProps} />
            </a>
          ))}
          <div className="site-nav__drawer-controls">
            <button disabled={controlsLocked} onClick={switchLanguage} className="site-nav__drawer-button site-nav__drawer-button--compact" aria-label="Switch language">
              <span className="tracking-[0.02em]">{languageButtonLabel}</span>
            </button>
            <button disabled={controlsLocked} onClick={switchTheme} className="site-nav__drawer-button site-nav__drawer-button--compact" aria-label="Switch theme">
              {theme === "dark" ? <Moon size={15} /> : <Sun size={15} />}
            </button>
          </div>
        </div>
      </nav>

      <section id="top" className="relative z-10 min-h-[100svh] px-5 pt-24 sm:min-h-screen sm:px-8">
        <div className="hero-axis mx-auto flex min-h-[calc(100svh-6rem)] max-w-7xl items-center justify-center sm:min-h-[calc(100vh-6rem)]">
          <motion.div className="flex flex-col items-center text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            <BrandText as="h1" variant="hero" className="max-w-none text-[clamp(8.4rem,34vw,22.5rem)] font-semibold leading-[0.86] tracking-normal sm:text-[clamp(6.1rem,26vw,22.5rem)]" />
            <HeroIntroText value={t.heroAlt} reserveValue={stableText.heroAlt} {...decodeProps} as="p" className="hero-typewriter mt-8 max-w-none text-[0.8rem] uppercase leading-relaxed tracking-[0.19em] text-[color:var(--dim)] sm:mt-10 sm:text-lg sm:tracking-[0.28em]" />
            <button onClick={() => setModalOpen(true)} className="hero-cta mt-8 inline-flex items-center justify-center rounded-full text-sm uppercase tracking-[0.18em] sm:mt-10">
              <DecodeText value={heroCtaLabel} reserveValue={heroCtaLabelReserve} {...decodeProps} />
            </button>
          </motion.div>
        </div>
      </section>

      <section id="systems" className="relative z-10 px-5 pb-24 pt-12 sm:px-8">
        <div className="systems-axis mx-auto max-w-7xl">
          <div className="services-layout">
            <div className="services-heading">
              <DecodeText value={servicesEyebrowLabel} reserveValue={servicesEyebrowReserve} {...decodeProps} as="p" className="text-center text-sm uppercase tracking-[0.34em] text-accent" />
              <DecodeText value={t.servicesTitle} reserveValue={stableText.servicesTitle} {...decodeProps} as="h2" className="max-w-3xl text-center text-4xl font-semibold leading-tight sm:text-6xl" />
            </div>
            <DecodeText value={t.servicesSub} reserveValue={stableText.servicesSub} {...decodeProps} as="p" className="max-w-3xl text-center text-lg leading-relaxed text-[color:var(--muted)]" />
            <div className="service-matrix">
              {serviceGroups.map((group, index) => (
                <motion.div key={group.title} className="service-row">
                  <div className="service-row__meta">
                    <p className="service-row__index">{String(index + 1).padStart(2, "0")}</p>
                    <span className="service-row__signal" />
                  </div>
                  <div className="service-row__content">
                    <DecodeText value={group.title} reserveValue={stableText.serviceGroups[index].title} {...decodeProps} as="h3" className="service-row__title" />
                    <div className="service-row__items">
                      {group.items.map((item, itemIndex) => (
                        <DecodeText key={item} value={item} reserveValue={stableText.serviceGroups[index].items[itemIndex]} {...decodeProps} className="service-row__item" />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="works" className="relative z-10 px-5 py-16 sm:px-8">
        <div className="works-axis mx-auto max-w-7xl">
          <div className="hairline mb-8" />
          <div className="works-showcase">
            <div className="works-showcase__copy">
              <DecodeText value={t.worksEyebrow} reserveValue={stableText.worksEyebrow} {...decodeProps} as="p" className="text-center text-sm uppercase tracking-[0.34em] text-accent" />
              <DecodeText value={t.worksTitle} reserveValue={stableText.worksTitle} {...decodeProps} as="h2" className="mt-5 text-center text-4xl font-semibold leading-tight sm:text-6xl" />
              <DecodeText value={t.worksDescription} reserveValue={stableText.worksDescription} {...decodeProps} as="p" className="mt-6 max-w-xl text-center text-lg leading-relaxed text-[color:var(--muted)]" />
              <div className="work-meta justify-center">
                {t.workMeta.map((item, index) => (
                  <DecodeText key={item} value={item} reserveValue={stableText.workMeta[index]} {...decodeProps} as="span" />
                ))}
              </div>
            </div>

            <motion.div className="work-browser" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
              <div className="work-browser__top">
                <div className="work-browser__dots" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <span className="work-browser__url">recomposition-official.ru</span>
                <button
                  type="button"
                  className={`work-browser__lock ${workPreviewUnlocked ? "is-unlocked" : "is-locked"}`}
                  onClick={() => setWorkPreviewUnlocked((current) => !current)}
                  aria-label={workPreviewUnlocked ? "Disable preview interaction" : "Enable preview interaction"}
                  aria-pressed={workPreviewUnlocked}
                >
                  <MousePointer2 size={14} />
                </button>
                <a href="https://recomposition-official.ru/" target="_blank" rel="noreferrer" className="work-browser__link">
                  <DecodeText value={t.workOpenSite} reserveValue={stableText.workOpenSite} {...decodeProps} />
                  <ArrowRight size={14} />
                </a>
              </div>
              <div className={`work-browser__viewport ${workPreviewUnlocked ? "is-unlocked" : "is-locked"}`}>
                <iframe src="/api/recomposition-frame" title="Recomposition official website preview" loading="eager" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="contact" className="relative z-10 px-5 pb-44 pt-28 sm:px-8">
        <div className="contact-band contact-axis mx-auto flex max-w-7xl flex-col items-center gap-16 py-20 text-center">
          <div className="contact-band__copy">
            <DecodeText value={t.terminalTitle} reserveValue={stableText.terminalTitle} {...decodeProps} as="h2" className="text-4xl font-semibold leading-none sm:text-6xl" />
            <DecodeText value={t.contactDescription} reserveValue={stableText.contactDescription} {...decodeProps} as="p" className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-[color:var(--muted)]" />
          </div>
          <button onClick={() => setModalOpen(true)} className="contact-cta inline-flex items-center justify-center rounded-full text-sm uppercase tracking-[0.18em]">
            <DecodeText value={heroCtaLabel} reserveValue={heroCtaLabelReserve} {...decodeProps} />
          </button>
        </div>
      </section>

      <footer className="site-footer relative z-10 px-4 py-5 sm:px-8 sm:py-6">
        <div className="site-footer__inner mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-3 text-xs text-[color:var(--muted)] sm:text-sm">
          <p className="justify-self-start">P39.Studio</p>
          <div className="justify-self-center text-center">
            <DecodeText value={t.footerPlace} reserveValue={stableText.footerPlace} {...decodeProps} />
          </div>
          <a href="mailto:P39.Studio@gmail.com" className="justify-self-end transition hover:text-[color:var(--text)]">P39.Studio@gmail.com</a>
        </div>
      </footer>

      <TerminalModal open={modalOpen} onClose={() => setModalOpen(false)} lang={displayLang} />
    </main>
  );
}
