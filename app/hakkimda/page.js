import SiteNavigation from "../components/SiteNavigation";
import VisitorCounter from "../components/VisitorCounter";

export const metadata = {
  title: "Hakkımızda | QuetraOnline",
  description: "QuetraOnline hakkında: Nowa Online World ve Knight Online topluluğu için yayınlar, içerikler ve topluluk çalışmaları.",
  alternates: { canonical: "/hakkimda" },
  openGraph: {
    title: "Hakkımızda | QuetraOnline",
    description: "Oyun, canlı yayın ve topluluk ruhunu aynı çatı altında buluşturuyoruz.",
    url: "https://quetraonline.com/hakkimda",
    siteName: "QuetraOnline",
    locale: "tr_TR",
    type: "website"
  }
};

const values = [
  ["Canlı yayınlar", "QuetraOnline yayın kanallarını tek noktada keşfetme imkânı."],
  ["Oyun topluluğu", "Nowa Online World ve çevrim içi oyun dünyasına yönelik içerikler."],
  ["Sosyal bağlantılar", "Topluluğun farklı platformlardaki hesaplarına kolay erişim."],
  ["Topluluk odağı", "Oyuncuları ve yayıncıları ortak bir ortamda buluşturma hedefi."]
];

export default function AboutPage() {
  return (
    <main className="quetra-site">
      <SiteNavigation active="about" />
      <div className="content-shell about-page">
        <section className="about-hero">
          <span className="about-eyebrow">BİZ KİMİZ?</span>
          <img src="/quetra-logo.svg" alt="QuetraOnline" />
          <h1>Hakkımızda</h1>
          <p>Oyun, canlı yayın ve topluluk ruhunu aynı çatı altında buluşturuyoruz. QuetraOnline; Nowa Online World başta olmak üzere çevrim içi oyun dünyasına, yayıncılara ve oyunculara odaklanan bir topluluk ve içerik platformudur.</p>
        </section>
        <section className="about-grid">
          <article className="about-panel">
            <h2>QuetraOnline Hakkında</h2>
            <p>QuetraOnline, oyun topluluğuyla bir araya gelmek, canlı yayınları takip etmek ve içerikleri tek noktadan keşfetmek için oluşturulmuş bir markadır.</p>
            <p>Nowa Online World ve Knight Online ekosisteminden ilham alan yayın ve topluluk çalışmalarımızda; oyuncuların, yayıncıların ve takipçilerin kolayca buluşabilmesini önemsiyoruz.</p>
            <p>Amacımız yalnızca yayın paylaşmak değil; topluluğun etkileşimini güçlendiren, erişilebilir ve düzenli bir dijital buluşma noktası sunmaktır.</p>
          </article>
          <aside className="about-panel">
            <h2>Neler Yapıyoruz?</h2>
            <div className="about-values">
              {values.map(([title, desc]) => <div className="about-value" key={title}><b>{title}</b><span>{desc}</span></div>)}
            </div>
            <div className="about-links">
              <a href="https://www.youtube.com/@quetraonline" target="_blank" rel="noreferrer">YouTube</a>
              <a href="https://www.tiktok.com/@quetraonline" target="_blank" rel="noreferrer">TikTok</a>
              <a href="https://www.instagram.com/quetraonline" target="_blank" rel="noreferrer">Instagram</a>
            </div>
          </aside>
        </section>
        <footer className="site-footer" id="contact">
          <img className="footer-logo" src="/quetra-logo.svg?v=20261108" alt="QuetraOnline" />
          <VisitorCounter />
          <p>© 2026 QuetraOnline.com - Tüm hakları saklıdır.</p>
          <p>Sorun ve şikayetleriniz için <a href="/iletisim">İletişim</a> sayfasından bana ulaşın.</p>
        </footer>
      </div>
      <style>{`
        .about-page{padding-top:42px}
        .about-hero{text-align:center;padding:42px 26px 38px;border:1px solid rgba(224,170,69,.45);border-radius:16px;background:linear-gradient(135deg,rgba(36,30,25,.96),rgba(22,26,35,.96));box-shadow:0 16px 50px #0006}
        .about-eyebrow{display:block;color:#e8b85b;letter-spacing:3px;font-size:12px;font-weight:800}
        .about-hero img{display:block;width:min(310px,75%);max-height:120px;object-fit:contain;margin:18px auto}
        .about-hero h1{font-size:clamp(30px,5vw,46px);margin:12px 0;color:#f0bd59}
        .about-hero p{max-width:760px;margin:0 auto;color:#d6d8df;font-size:17px;line-height:1.8}
        .about-grid{display:grid;grid-template-columns:1.15fr .85fr;gap:18px;margin-top:22px}
        .about-panel{background:rgba(26,30,39,.94);border:1px solid #51402a;border-radius:13px;padding:26px;box-shadow:0 10px 28px #0003}
        .about-panel h2{font-size:19px;color:#f0c36b;margin:0 0 14px}
        .about-panel p{color:#cbd0d9;line-height:1.85;margin:0 0 12px}
        .about-values{display:grid;gap:12px}
        .about-value{padding:14px;border-radius:9px;background:#202631;border-left:3px solid #e0aa45}
        .about-value b{display:block;color:#fff;margin-bottom:5px}
        .about-value span{font-size:13px;color:#b9bec8;line-height:1.6}
        .about-links{display:flex;flex-wrap:wrap;gap:10px;margin-top:18px}
        .about-links a{color:#fff;text-decoration:none;border:1px solid #9d702e;background:#332719;padding:10px 14px;border-radius:8px;font-weight:700;font-size:13px}
        .about-links a:hover{border-color:#f0c36b;background:#49351c}
        @media(max-width:700px){.about-page{padding-top:24px}.about-hero{padding:30px 18px}.about-hero p{font-size:15px}.about-grid{grid-template-columns:1fr}.about-panel{padding:21px}}
      `}</style>
    </main>
  );
}
