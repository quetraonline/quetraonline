import "./globals.css";

export const metadata = {
  title: "QuetraOnline | Yayıncı Profili",
  description: "QuetraOnline yayınları, sosyal medya hesapları, oyunları ve destek bağlantıları.",
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
