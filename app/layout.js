import "./globals.css";

export const metadata = {
  title: "QuetraOnline | Gamer · Streamer · Community",
  description: "QuetraOnline — Knight Online yayınları, videoları ve Nowa Online World topluluğu.",
  metadataBase: new URL("https://quetraonline-quetraonline.vercel.app"),
  openGraph: {
    title: "QuetraOnline",
    description: "Oyunun ruhunu yaşa.",
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
