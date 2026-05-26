import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://p39.studio"),
  title: {
    default: "P39.Studio - сайты, инфографика и автоматизация",
    template: "%s | P39.Studio"
  },
  description: "P39.Studio проектирует лендинги, web-продукты, маркетплейс-инфографику, Telegram-ботов и автоматизацию бизнес-процессов.",
  keywords: [
    "P39 Studio",
    "создание лендингов",
    "разработка сайтов",
    "инфографика для Wildberries",
    "инфографика для Ozon",
    "Telegram боты",
    "автоматизация бизнеса",
    "web продукты"
  ],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    url: "https://p39.studio/",
    siteName: "P39.Studio",
    title: "P39.Studio - сайты, инфографика и автоматизация",
    description: "Частная студия цифровых систем: лендинги, web-продукты, инфографика для маркетплейсов, Telegram-боты и автоматизация.",
    locale: "ru_RU",
    images: [
      {
        url: "/p39-logo-original.png",
        width: 1024,
        height: 1024,
        alt: "P39.Studio"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "P39.Studio - сайты, инфографика и автоматизация",
    description: "Частная студия цифровых систем: лендинги, web-продукты, маркетплейс-инфографика, Telegram-боты и автоматизация.",
    images: ["/p39-logo-original.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  icons: {
    icon: [{ url: "/p39-favicon.png", sizes: "512x512", type: "image/png" }],
    shortcut: "/p39-favicon.png",
    apple: [{ url: "/p39-favicon.png", sizes: "512x512", type: "image/png" }]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" data-theme="dark" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
