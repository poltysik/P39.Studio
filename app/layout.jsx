import "./globals.css";

export const metadata = {
  title: "P39.Studio",
  description: "Digital systems. Creative technology. Built with precision.",
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
