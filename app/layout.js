import "./globals.css";
import BackToTop from "./components/BackToTop";

export const metadata = {
  title: "QuetraOnline - Resmi Web Sitesi",
  description: "QuetraOnline resmi web sitesi. Knight Online yayınları, Nowa Online World içerikleri, canlı yayınlar, oyun topluluğu ve sosyal medya hesapları.",
  keywords: ["Quetra", "QuetraOnline", "Quetra Online", "Knight Online", "Knight", "NowaOnlineWorld", "Nowa Online World", "NowaOnline", "Nowa", "Knight Online yayınları"],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } },
  icons: { icon: "/favicon.svg?v=20261108", shortcut: "/favicon.svg?v=20261108" },
  metadataBase: new URL("https://quetraonline.com"),
  openGraph: {
    title: "QuetraOnline — Yayıncı Profili",
    description: "Canlı yayınlar, sosyal medya ve oyun topluluğu.",
    type: "website",
    url: "https://quetraonline.com",
    siteName: "QuetraOnline",
    locale: "tr_TR"
  },
  twitter: { card: "summary_large_image", title: "QuetraOnline - Resmi Web Sitesi", description: "Knight Online ve Nowa Online World yayınları, içerikleri ve topluluk bağlantıları." }
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
