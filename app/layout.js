import "./globals.css";

export const metadata = {
  title: "QuetraOnline - Resmi Web Sitesi",
  description: "QuetraOnline yayınları, sosyal medya hesapları, oyunları ve destek bağlantıları.",
  icons: { icon: "/favicon.svg?v=20261108", shortcut: "/favicon.svg?v=20261108" },
  metadataBase: new URL("https://quetraonline-quetraonline.vercel.app"),
  openGraph: {
    title: "QuetraOnline — Yayıncı Profili",
    description: "Canlı yayınlar, sosyal medya ve oyun topluluğu.",
    type: "website"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
