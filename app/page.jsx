"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, ChevronLeft, ChevronRight, Globe2, Moon, MousePointer2, Sun, X } from "lucide-react";
import Image from "next/image";
import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";

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
      { title: "Web products", items: ["Landing pages", "Online stores", "Infographics", "Telegram web apps", "Telegram bots", "Widgets"] },
      { title: "Automation", items: ["Content creation", "AI assistants", "Process optimization"] },
      { title: "Custom development", items: ["ERP", "CRM", "AI integration"] }
    ],
    proof: "Identity, interaction, and digital systems share one disciplined visual language.",
    worksEyebrow: "Portfolio",
    worksTitle: "Selected work",
    worksCategories: ["Sites", "Infographics"],
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
      unavailable: "Request was not sent.\nPlease try again later or contact us directly.",
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
      { title: "Web продукты", items: ["Лендинги", "Интернет-магазины", "Инфографика", "Telegram web apps", "Telegram боты", "Виджеты"] },
      { title: "Автоматизация", items: ["Создание контента", "ИИ-помощники", "Оптимизация процессов"] },
      { title: "Кастомная разработка", items: ["ERP", "CRM", "Интеграция ИИ"] }
    ],
    proof: "Айдентика, взаимодействие и цифровые системы говорят на одном точном визуальном языке.",
    worksEyebrow: "Портфолио",
    worksTitle: "Примеры работ",
    worksCategories: ["Сайты", "Инфографика"],
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
      unavailable: "Запрос не отправлен.\nПопробуйте позже или напишите нам напрямую.",
      placeholderName: "",
      placeholderContact: "@alexcarter",
      placeholderProject: "AI-автоматизация для Telegram-воронки продаж."
    }
  }
};

const decodeGlyphs = "/<>[]{}01_";

function longestText(...values) {
  return values.reduce((longest, value = "") => (value.length > longest.length ? value : longest), "");
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
  worksCategory: longestText(...copy.ru.worksCategories, ...copy.en.worksCategories),
  worksCategories: copy.ru.worksCategories.map((item, index) => longestText(item, copy.en.worksCategories[index])),
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

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://p39.studio/#organization",
      name: "P39.Studio",
      url: "https://p39.studio/",
      logo: "https://p39.studio/p39-logo-original.png",
      email: "P39.Studio@gmail.com"
    },
    {
      "@type": "WebSite",
      "@id": "https://p39.studio/#website",
      url: "https://p39.studio/",
      name: "P39.Studio",
      inLanguage: "ru-RU",
      publisher: {
        "@id": "https://p39.studio/#organization"
      }
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://p39.studio/#service",
      name: "P39.Studio",
      url: "https://p39.studio/",
      image: "https://p39.studio/p39-logo-original.png",
      email: "P39.Studio@gmail.com",
      areaServed: ["RU", "Worldwide"],
      serviceType: [
        "Разработка лендингов",
        "Web-продукты",
        "Инфографика для маркетплейсов",
        "Telegram-боты",
        "Автоматизация бизнес-процессов"
      ],
      provider: {
        "@id": "https://p39.studio/#organization"
      }
    }
  ]
};

const portfolioWorks = [
  {
    id: "recomposition",
    urlLabel: "recomposition-official.ru",
    href: "https://recomposition-official.ru/",
    previewSrc: "/api/recomposition-frame",
    mobilePreviewSrc: "/recomposition-official-preview.png",
    title: {
      ru: "Recomposition",
      en: "Recomposition"
    },
    tags: {
      ru: ["Лендинг", "Фитнес-продукт", "UX / UI"],
      en: ["Landing page", "Fitness product", "UX / UI"]
    }
  },
  {
    id: "cityoptic",
    urlLabel: "cityoptic.vercel.app",
    href: "https://cityoptic.vercel.app/",
    previewSrc: "https://cityoptic.vercel.app/",
    mobilePreviewSrc: "/site-previews/cityoptic.png",
    title: {
      ru: "City Optic",
      en: "City Optic"
    },
    tags: {
      ru: ["Оптика", "Проверка зрения", "Лендинг"],
      en: ["Optics", "Eye exam", "Landing page"]
    }
  },
  {
    id: "apex-ege",
    urlLabel: "apex-ege.vercel.app",
    href: "https://apex-ege.vercel.app/",
    previewSrc: "https://apex-ege.vercel.app/",
    mobilePreviewSrc: "/site-previews/apex-ege.png",
    title: {
      ru: "Apex EGE",
      en: "Apex EGE"
    },
    tags: {
      ru: ["EdTech", "Подготовка к ЕГЭ", "Conversion UI"],
      en: ["EdTech", "Exam preparation", "Conversion UI"]
    }
  },
  {
    id: "atelier-build",
    urlLabel: "atelier-build-studio-site.vercel.app",
    href: "https://atelier-build-studio-site.vercel.app/",
    previewSrc: "https://atelier-build-studio-site.vercel.app/",
    mobilePreviewSrc: "/site-previews/atelier-build.png",
    title: {
      ru: "Atelier Build",
      en: "Atelier Build"
    },
    tags: {
      ru: ["Ремонт под ключ", "Premium commercial", "Калькулятор"],
      en: ["Renovation studio", "Premium commercial", "Estimator"]
    }
  },
  {
    id: "atelier-nordovest",
    urlLabel: "atelier-nordovest.vercel.app",
    href: "https://atelier-nordovest.vercel.app/",
    previewSrc: "https://atelier-nordovest.vercel.app/",
    mobilePreviewSrc: "/site-previews/atelier-nordovest.png",
    title: {
      ru: "Atelier Nordovest",
      en: "Atelier Nordovest"
    },
    tags: {
      ru: ["Кухни на заказ", "Editorial layout", "Light luxury"],
      en: ["Custom kitchens", "Editorial layout", "Light luxury"]
    }
  },
  {
    id: "terra-forma",
    urlLabel: "terra-forma-chi.vercel.app",
    href: "https://terra-forma-chi.vercel.app/",
    previewSrc: "https://terra-forma-chi.vercel.app/",
    mobilePreviewSrc: "/site-previews/terra-forma.png",
    title: {
      ru: "Terra Forma",
      en: "Terra Forma"
    },
    tags: {
      ru: ["Ландшафтный дизайн", "Digital experience", "Organic UI"],
      en: ["Landscape design", "Digital experience", "Organic UI"]
    }
  }
];

const legacyInfographicWorks = [
  {
    id: "magnesium-glycinate",
    urlLabel: {
      ru: "маркетплейс / бады",
      en: "marketplace card / supplements"
    },
    imageSrc: "/infographics/magnesium-glycinate.png",
    title: {
      ru: "Magnesium Glycinate",
      en: "Magnesium Glycinate"
    },
    tags: {
      ru: ["WB / Ozon", "БАДы"],
      en: ["WB / Ozon", "Supplements"]
    }
  },
  {
    id: "necklace",
    urlLabel: {
      ru: "маркетплейс / украшения",
      en: "marketplace card / jewelry"
    },
    imageSrc: "/infographics/necklace.png",
    title: {
      ru: "Подвеска с камнем",
      en: "Stone Necklace"
    },
    tags: {
      ru: ["WB / Ozon", "Украшения"],
      en: ["WB / Ozon", "Jewelry"]
    }
  },
  {
    id: "soft-bunny",
    urlLabel: {
      ru: "маркетплейс / игрушки",
      en: "marketplace card / toys"
    },
    imageSrc: "/infographics/soft-bunny.png",
    title: {
      ru: "Мягкий зайка",
      en: "Soft Bunny"
    },
    tags: {
      ru: ["WB / Ozon", "Игрушки"],
      en: ["WB / Ozon", "Toys"]
    }
  },
  {
    id: "pet-carrier",
    urlLabel: {
      ru: "маркетплейс / питомцы",
      en: "marketplace card / pets"
    },
    imageSrc: "/infographics/pet-carrier.png",
    title: {
      ru: "Переноска для собак",
      en: "Dog Carrier"
    },
    tags: {
      ru: ["WB / Ozon", "Для питомцев"],
      en: ["WB / Ozon", "Pet products"]
    }
  },
  {
    id: "sport-set",
    urlLabel: {
      ru: "маркетплейс / спорт",
      en: "marketplace card / sport"
    },
    imageSrc: "/infographics/sport-set.png",
    title: {
      ru: "Спортивный комплект",
      en: "Sport Set"
    },
    tags: {
      ru: ["WB / Ozon", "Одежда"],
      en: ["WB / Ozon", "Apparel"]
    }
  }
];

const infographicTopics = [
  { ru: "Массажный пистолет", en: "Massage gun" },
  { ru: "LED ночник", en: "LED night light" },
  { ru: "Автопылесос", en: "Car vacuum" },
  { ru: "Умные часы", en: "Smart watch" },
  { ru: "Термобутылка", en: "Thermo bottle" },
  { ru: "Миска для животных", en: "Pet bowl" },
  { ru: "Органайзеры для дома", en: "Home organizers" },
  { ru: "Крем для лица", en: "Face cream" },
  { ru: "Чехол iPhone", en: "iPhone case" },
  { ru: "Спортивное питание", en: "Sports nutrition" }
];

const infographicWorks = infographicTopics.map((topic, index) => {
  const number = String(index + 1).padStart(2, "0");

  return {
    id: `infographic-${number}`,
    urlLabel: {
      ru: "маркетплейс / инфографика",
      en: "marketplace card / infographic"
    },
    imageSrc: `/infographics/infographic-${number}.png`,
    title: {
      ru: topic.ru,
      en: topic.en
    },
    tags: {
      ru: ["WB / Ozon", topic.ru],
      en: ["WB / Ozon", topic.en]
    }
  };
});

const workTagReserve = Array.from({ length: 3 }, (_, tagIndex) =>
  longestText(
    ...portfolioWorks.flatMap((work) => [work.tags.ru[tagIndex], work.tags.en[tagIndex]]),
    ...infographicWorks.flatMap((work) => [work.tags.ru[tagIndex], work.tags.en[tagIndex]])
  )
);

const workUrlLabelReserve = longestText(
  ...portfolioWorks.map((work) => work.urlLabel),
  ...infographicWorks.flatMap((work) => [work.urlLabel.ru, work.urlLabel.en])
);

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

function getStatsSessionId() {
  if (typeof window === "undefined") return "";

  const key = "p39_stats_session";
  const existing = window.localStorage.getItem(key);
  if (existing) return existing;

  const random = window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const sessionId = `p39-${random}`;
  window.localStorage.setItem(key, sessionId);
  return sessionId;
}

function getDeviceType() {
  if (typeof navigator === "undefined") return "unknown";
  const ua = navigator.userAgent || "";
  if (/tablet|ipad/i.test(ua)) return "tablet";
  if (/mobile|android|iphone|ipod/i.test(ua)) return "mobile";
  return "desktop";
}

function getBrowserFamily() {
  if (typeof navigator === "undefined") return "unknown";
  const ua = navigator.userAgent || "";
  if (/Edg\//.test(ua)) return "edge";
  if (/Chrome\//.test(ua)) return "chrome";
  if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) return "safari";
  if (/Firefox\//.test(ua)) return "firefox";
  return "unknown";
}

function getReferrerHost() {
  if (typeof document === "undefined" || !document.referrer) return "";

  try {
    const url = new URL(document.referrer);
    return url.hostname === window.location.hostname ? "internal" : url.hostname;
  } catch {
    return "";
  }
}

function trackStatsEvent(type, metadata = {}, options = {}) {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const payload = {
    site: "P39.Studio",
    sessionId: getStatsSessionId(),
    type,
    path: `${window.location.pathname}${window.location.search}`,
    referrer: getReferrerHost(),
    utmSource: params.get("utm_source") || "",
    utmMedium: params.get("utm_medium") || "",
    utmCampaign: params.get("utm_campaign") || "",
    device: getDeviceType(),
    browser: getBrowserFamily(),
    language: navigator.language || "",
    metadata
  };

  const body = JSON.stringify(payload);

  if (options.beacon && navigator.sendBeacon) {
    navigator.sendBeacon("/api/stats/event", new Blob([body], { type: "application/json" }));
    return;
  }

  fetch("/api/stats/event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: Boolean(options.keepalive)
  }).catch(() => {});
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
    if (!open || (step !== 1 && step !== 3)) return;

    const focusDelays = [80, 360, 720];
    const timers = focusDelays.map((delay) =>
      window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), delay)
    );

    return () => timers.forEach((timer) => window.clearTimeout(timer));
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
    const payload = { ...form, contact };
    const body = JSON.stringify(payload);

    const sendContactRequest = () => fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body
    });

    try {
      let response = await sendContactRequest();
      if (!response.ok) {
        await new Promise((resolve) => window.setTimeout(resolve, 450));
        response = await sendContactRequest();
      }

      if (response.ok) {
        setStatus("success");
        trackStatsEvent("contact_submit_success", { method: form.method });
        return;
      }

      const queued = navigator.sendBeacon?.("/api/contact", new Blob([body], { type: "application/json" }));
      setStatus(queued ? "success" : "local");
      if (queued) {
        trackStatsEvent("contact_submit_success", { method: form.method, fallback: "beacon" });
      }
    } catch {
      const queued = navigator.sendBeacon?.("/api/contact", new Blob([body], { type: "application/json" }));
      setStatus(queued ? "success" : "local");
      if (queued) {
        trackStatsEvent("contact_submit_success", { method: form.method, fallback: "beacon" });
      }
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
                        <button key={method} disabled={step > 3} onClick={() => { if (step > 3) return; trackStatsEvent("contact_method_select", { method }); setForm({ ...form, method, contact: contactsByMethod[method] || "" }); setStep(3); }} className={`cmd-method ${form.method === method ? "is-selected" : ""}`}>
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

function openTerminalWithMobileFocus(openModal) {
  flushSync(() => openModal(true));

  if (typeof window === "undefined") return;

  const input = document.querySelector(".cmd-input:not(.is-locked)");
  input?.focus();

  window.setTimeout(() => {
    document.querySelector(".cmd-input:not(.is-locked)")?.focus();
  }, 60);
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
  const [activeWorkIndex, setActiveWorkIndex] = useState(0);
  const [activeInfographicIndex, setActiveInfographicIndex] = useState(0);
  const [activeWorkCategoryIndex, setActiveWorkCategoryIndex] = useState(0);
  const [workCategoryMotionKey, setWorkCategoryMotionKey] = useState(0);
  const [isMobileFrameMode, setIsMobileFrameMode] = useState(false);
  const [workFramesEnabled, setWorkFramesEnabled] = useState([]);
  const [workFramesWarmupStarted, setWorkFramesWarmupStarted] = useState(false);
  const [loadedWorkFrames, setLoadedWorkFrames] = useState({});
  const [workFrameLoaderFallbacks, setWorkFrameLoaderFallbacks] = useState({});
  const [workFrameHeights, setWorkFrameHeights] = useState({});
  const [navMotion, setNavMotion] = useState({ drift: 0, panelShift: 0 });
  const [navReady, setNavReady] = useState(false);
  const [mobileNavCollapsed, setMobileNavCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const worksSectionRef = useRef(null);
  const workPreviewTouchHandledRef = useRef(false);
  const infographicSwipeStartRef = useRef(null);
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
    const media = window.matchMedia("(max-width: 720px)");
    const syncFrameMode = () => setIsMobileFrameMode(media.matches);

    syncFrameMode();
    media.addEventListener?.("change", syncFrameMode);
    return () => media.removeEventListener?.("change", syncFrameMode);
  }, []);

  useEffect(() => {
    trackStatsEvent("page_view");

    const seenSections = new Set();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting || entry.intersectionRatio < 0.35) continue;
        const section = entry.target.id;
        if (!section || seenSections.has(section)) continue;
        seenSections.add(section);
        trackStatsEvent("section_view", { section });
      }
    }, { threshold: [0.35, 0.65] });

    for (const id of ["systems", "works", "contact"]) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }

    const scrollMarks = [25, 50, 75, 100];
    const sentScrollMarks = new Set();
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const depth = scrollable > 0 ? Math.round((window.scrollY / scrollable) * 100) : 100;
      for (const mark of scrollMarks) {
        if (depth >= mark && !sentScrollMarks.has(mark)) {
          sentScrollMarks.add(mark);
          trackStatsEvent("scroll_depth", { depth: mark });
        }
      }
    };

    const startedAt = Date.now();
    let sentTime = false;
    const sendTimeOnPage = () => {
      if (sentTime) return;
      sentTime = true;
      const seconds = Math.max(1, Math.round((Date.now() - startedAt) / 1000));
      trackStatsEvent("time_on_page", { seconds }, { beacon: true, keepalive: true });
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") sendTimeOnPage();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pagehide", sendTimeOnPage);
    document.addEventListener("visibilitychange", onVisibilityChange);
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pagehide", sendTimeOnPage);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      sendTimeOnPage();
    };
  }, []);

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

  useEffect(() => {
    const worksSection = worksSectionRef.current;
    if (!worksSection || workFramesWarmupStarted || isMobileFrameMode) return;

    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      setWorkFramesWarmupStarted(true);
      setWorkFramesEnabled((enabled) => (enabled.includes(activeWorkIndex) ? enabled : [...enabled, activeWorkIndex]));
      observer.disconnect();
    }, { rootMargin: "360px 0px", threshold: 0.01 });

    observer.observe(worksSection);
    return () => observer.disconnect();
  }, [activeWorkIndex, workFramesWarmupStarted, isMobileFrameMode]);

  useEffect(() => {
    if (!workFramesWarmupStarted || isMobileFrameMode) return;

    const orderedIndexes = [
      activeWorkIndex,
      (activeWorkIndex + 1) % portfolioWorks.length,
      (activeWorkIndex - 1 + portfolioWorks.length) % portfolioWorks.length,
      ...portfolioWorks.map((_, index) => index)
    ].filter((index, position, list) => list.indexOf(index) === position);

    const timers = orderedIndexes.map((index, position) => (
      window.setTimeout(() => {
        setWorkFramesEnabled((enabled) => (enabled.includes(index) ? enabled : [...enabled, index]));
      }, position * 450)
    ));

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [activeWorkIndex, workFramesWarmupStarted, isMobileFrameMode]);

  const serviceGroups = useMemo(() => t.serviceGroups, [t.serviceGroups]);
  const controlsLocked = translation.active || themeVeil.active;
  const activeWorkCategory = t.worksCategories[activeWorkCategoryIndex];
  const activeWorkCategorySlug = activeWorkCategoryIndex === 0 ? "sites" : "infographics";
  const isInfographicsCategory = activeWorkCategorySlug === "infographics";
  const activeWorkItems = isInfographicsCategory ? infographicWorks : portfolioWorks;
  const activeItemIndex = isInfographicsCategory ? activeInfographicIndex : activeWorkIndex;
  const activeWork = portfolioWorks[activeWorkIndex];
  const activeInfographic = infographicWorks[activeInfographicIndex];
  const activeShowcaseItem = isInfographicsCategory ? activeInfographic : activeWork;
  const activeWorkTags = activeShowcaseItem.tags[displayLang];
  const activeWorkUrlLabel = isInfographicsCategory ? activeShowcaseItem.urlLabel[displayLang] : activeShowcaseItem.urlLabel;
  const enabledWorkFrames = isMobileFrameMode
    ? [activeWork]
    : portfolioWorks.filter((_, index) => workFramesEnabled.includes(index));

  useEffect(() => {
    if (isInfographicsCategory || loadedWorkFrames[activeWorkIndex]) return;

    const timer = window.setTimeout(() => {
      setWorkFrameLoaderFallbacks((current) => ({ ...current, [activeWorkIndex]: true }));
    }, 3200);

    return () => window.clearTimeout(timer);
  }, [activeWorkIndex, isInfographicsCategory, loadedWorkFrames]);

  const switchWork = (direction) => {
    if (isInfographicsCategory) {
      setActiveInfographicIndex((current) => (current + direction + infographicWorks.length) % infographicWorks.length);
      return;
    }

    setActiveWorkIndex((current) => {
      const next = (current + direction + portfolioWorks.length) % portfolioWorks.length;
      setWorkFramesEnabled((enabled) => (enabled.includes(next) ? enabled : [...enabled, next]));
      return next;
    });
  };

  const selectWork = (index) => {
    if (isInfographicsCategory) {
      setActiveInfographicIndex(index);
      return;
    }

    setWorkFramesEnabled((enabled) => (enabled.includes(index) ? enabled : [...enabled, index]));
    setActiveWorkIndex(index);
  };

  const switchWorkCategory = (direction) => {
    setWorkCategoryMotionKey((current) => current + 1);
    setActiveWorkCategoryIndex((current) => {
      const count = t.worksCategories.length;
      return (current + direction + count) % count;
    });
  };

  const startInfographicSwipe = (event) => {
    if (!isInfographicsCategory || event.pointerType === "mouse") return;
    infographicSwipeStartRef.current = {
      x: event.clientX,
      y: event.clientY
    };
  };

  const finishInfographicSwipe = (event) => {
    const start = infographicSwipeStartRef.current;
    infographicSwipeStartRef.current = null;
    if (!start || !isInfographicsCategory || event.pointerType === "mouse") return;

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    if (Math.abs(deltaX) < 42 || Math.abs(deltaX) < Math.abs(deltaY) * 1.2) return;

    switchWork(deltaX < 0 ? 1 : -1);
  };

  const registerWorkFrameLoad = (index, frame) => {
    setLoadedWorkFrames((current) => ({ ...current, [index]: true }));
    try {
      const doc = frame?.contentDocument;
      const height = Math.max(
        doc?.documentElement?.scrollHeight || 0,
        doc?.body?.scrollHeight || 0
      );
      if (height > 0) {
        setWorkFrameHeights((current) => ({
          ...current,
          [index]: Math.min(Math.max(height, 1200), 12000)
        }));
      }
    } catch {
      // Cross-origin previews keep the default mobile frame height.
    }

  };

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
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
            <button onClick={() => { trackStatsEvent("cta_click", { cta: "hero_create_project" }); trackStatsEvent("contact_open", { source: "hero" }); openTerminalWithMobileFocus(setModalOpen); }} className="hero-cta mt-8 inline-flex items-center justify-center rounded-full text-sm uppercase tracking-[0.18em] sm:mt-10">
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

      <section id="works" ref={worksSectionRef} className="relative z-10 px-5 py-16 sm:px-8">
        <div className="works-axis mx-auto max-w-7xl">
          <div className="hairline mb-8" />
          <div className="works-showcase">
            <div className="works-showcase__copy">
              <DecodeText value={t.worksEyebrow} reserveValue={stableText.worksEyebrow} {...decodeProps} as="p" className="text-center text-sm uppercase tracking-[0.34em] text-accent" />
              <DecodeText value={t.worksTitle} reserveValue={stableText.worksTitle} {...decodeProps} as="h2" className="mt-5 text-center text-4xl font-semibold leading-tight sm:text-6xl" />
              <div className={`works-category-switch works-category-switch--${activeWorkCategorySlug}`} aria-label={displayLang === "ru" ? "Категория портфолио" : "Portfolio category"}>
                <span className="works-category-switch__glow" aria-hidden="true" />
                <span key={`${activeWorkCategorySlug}-${workCategoryMotionKey}`} className="works-category-switch__burst" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </span>
                <button type="button" onClick={() => switchWorkCategory(-1)} className="works-category-switch__arrow" aria-label={displayLang === "ru" ? "Предыдущая категория" : "Previous category"}>
                  <ChevronLeft size={16} />
                </button>
                <DecodeText key={`${activeWorkCategorySlug}-${displayLang}-${workCategoryMotionKey}`} value={activeWorkCategory} reserveValue={stableText.worksCategory} {...decodeProps} as="span" className="works-category-switch__label" />
                <button type="button" onClick={() => switchWorkCategory(1)} className="works-category-switch__arrow" aria-label={displayLang === "ru" ? "Следующая категория" : "Next category"}>
                  <ChevronRight size={16} />
                </button>
              </div>
              <DecodeText value={t.worksDescription} reserveValue={stableText.worksDescription} {...decodeProps} as="p" className="mt-6 max-w-xl text-center text-lg leading-relaxed text-[color:var(--muted)]" />
              <div className="work-meta justify-center">
                {activeWorkTags.map((item, index) => (
                  <DecodeText key={`${activeShowcaseItem.id}-${item}`} value={item} reserveValue={workTagReserve[index]} {...decodeProps} as="span" />
                ))}
              </div>
            </div>

            <motion.div className={`work-browser work-browser--${activeWorkCategorySlug} work-browser--pulse-${workCategoryMotionKey % 2 === 0 ? "a" : "b"}`} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
              <div className="work-browser__top">
                <div className="work-browser__dots" aria-label="Индикаторы примеров работ">
                  {activeWorkItems.map((work, index) => (
                    <button
                      key={`${work.id}-top-dot`}
                      type="button"
                      onClick={() => selectWork(index)}
                      className={index === activeItemIndex ? "is-active" : ""}
                      aria-label={`Открыть ${work.title.ru}`}
                      aria-pressed={index === activeItemIndex}
                    />
                  ))}
                </div>
                <DecodeText value={activeWorkUrlLabel} reserveValue={workUrlLabelReserve} {...decodeProps} as="span" className="work-browser__url" />
                {!isInfographicsCategory && (
                  <>
                    <a href={activeWork.href} target="_blank" rel="noreferrer" className="work-browser__mobile-link">
                      <DecodeText value={t.workOpenSite} reserveValue={stableText.workOpenSite} {...decodeProps} />
                      <ArrowRight size={14} />
                    </a>
                    <button
                      type="button"
                      className={`work-browser__lock ${workPreviewUnlocked ? "is-unlocked" : "is-locked"}`}
                      onPointerDown={(event) => {
                        if (event.pointerType === "touch") {
                          event.preventDefault();
                          workPreviewTouchHandledRef.current = true;
                          setWorkPreviewUnlocked((current) => !current);
                        }
                      }}
                      onClick={() => {
                        if (workPreviewTouchHandledRef.current) {
                          workPreviewTouchHandledRef.current = false;
                          return;
                        }
                        setWorkPreviewUnlocked((current) => !current);
                      }}
                      aria-label={workPreviewUnlocked ? "Disable preview interaction" : "Enable preview interaction"}
                      aria-pressed={workPreviewUnlocked}
                    >
                      <MousePointer2 size={14} />
                    </button>
                    <a href={activeWork.href} target="_blank" rel="noreferrer" className="work-browser__link">
                      <DecodeText value={t.workOpenSite} reserveValue={stableText.workOpenSite} {...decodeProps} />
                      <ArrowRight size={14} />
                    </a>
                  </>
                )}
              </div>
              <div className={`work-browser__viewport ${isInfographicsCategory || workPreviewUnlocked ? "is-unlocked" : "is-locked"}`}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeWorkCategorySlug}
                    className="work-browser__category-content"
                    initial={{ opacity: 0, scale: 0.985, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.992, filter: "blur(8px)" }}
                    transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {isInfographicsCategory ? (
                      <div
                        className="infographic-stage"
                        aria-label={displayLang === "ru" ? "Примеры инфографики" : "Infographic examples"}
                        onPointerDown={startInfographicSwipe}
                        onPointerUp={finishInfographicSwipe}
                        onPointerCancel={() => {
                          infographicSwipeStartRef.current = null;
                        }}
                      >
                        {infographicWorks.map((work, index) => {
                          const offset = index - activeInfographicIndex;
                          const wrappedOffset = offset > infographicWorks.length / 2
                            ? offset - infographicWorks.length
                            : offset < -infographicWorks.length / 2
                              ? offset + infographicWorks.length
                              : offset;
                          const isActive = index === activeInfographicIndex;
                          const isVisible = Math.abs(wrappedOffset) <= 1;

                          return (
                            <button
                              key={work.id}
                              type="button"
                              onClick={() => setActiveInfographicIndex(index)}
                              className={`infographic-card ${isActive ? "is-active" : ""} ${isVisible ? "is-visible" : ""}`}
                              style={{
                                "--card-offset": wrappedOffset,
                                "--card-depth": Math.abs(wrappedOffset),
                                "--card-rotate": `${wrappedOffset * 4}deg`
                              }}
                              aria-label={`Открыть ${work.title.ru}`}
                              aria-pressed={isActive}
                            >
                              <Image src={work.imageSrc} alt={work.title[displayLang]} fill sizes="(max-width: 720px) 72vw, 29rem" loading="lazy" quality={76} />
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <>
                        {enabledWorkFrames.map((work) => {
                          const index = portfolioWorks.findIndex((item) => item.id === work.id);
                          const isActive = index === activeWorkIndex;

                          return (
                            <iframe
                              key={work.id}
                              src={work.previewSrc}
                              title={`${work.title[displayLang]} website preview`}
                              scrolling="yes"
                              loading="eager"
                              onLoad={(event) => registerWorkFrameLoad(index, event.currentTarget)}
                              className={isActive ? "is-active" : ""}
                              style={{ "--frame-scroll-height": `${workFrameHeights[index] || 12000}px` }}
                            />
                          );
                        })}
                        {!loadedWorkFrames[activeWorkIndex] && !workFrameLoaderFallbacks[activeWorkIndex] && (
                          <div className="work-browser__loading" aria-hidden="true">
                            <span className="work-browser__loading-logo">P39</span>
                          </div>
                        )}
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="work-browser__bottom-nav">
                <button type="button" onClick={() => switchWork(-1)} className="work-browser__nav-button" aria-label="Предыдущий сайт">
                  <ChevronLeft size={16} />
                </button>
                <button type="button" onClick={() => switchWork(1)} className="work-browser__nav-button" aria-label="Следующий сайт">
                  <ChevronRight size={16} />
                </button>
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
          <button onClick={() => { trackStatsEvent("cta_click", { cta: "contact_create_project" }); trackStatsEvent("contact_open", { source: "contact" }); openTerminalWithMobileFocus(setModalOpen); }} className="contact-cta inline-flex items-center justify-center rounded-full text-sm uppercase tracking-[0.18em]">
            <DecodeText value={heroCtaLabel} reserveValue={heroCtaLabelReserve} {...decodeProps} />
          </button>
        </div>
      </section>

      <footer className="site-footer relative z-10 px-4 py-5 sm:px-8 sm:py-6">
        <div className="site-footer__inner mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-3 text-xs text-[color:var(--muted)] sm:text-sm">
          <p className="site-footer__brand justify-self-start">P39.Studio</p>
          <div className="site-footer__place justify-self-center text-center">
            <DecodeText value={t.footerPlace} reserveValue={stableText.footerPlace} {...decodeProps} />
          </div>
          <a href="mailto:P39.Studio@gmail.com" className="site-footer__email justify-self-end transition hover:text-[color:var(--text)]">P39.Studio@gmail.com</a>
        </div>
      </footer>

      <TerminalModal open={modalOpen} onClose={() => setModalOpen(false)} lang={displayLang} />
    </main>
  );
}
