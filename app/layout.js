import "./globals.css";

export const metadata = {
  title: "Quetra | Tüm Bağlantılarım",
  description: "Quetra'nın canlı yayın, sosyal medya, destek ve oyun bağlantılarına tek noktadan ulaş.",
  metadataBase: new URL("https://quetraonline-quetraonline.vercel.app"),
  openGraph: {
    title: "Quetra — Tüm Bağlantılarım",
    description: "Canlı yayınlar, sosyal medya ve oyun dünyası. Tüm Quetra bağlantıları tek yerde.",
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
