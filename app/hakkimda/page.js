import SiteNavigation from "../components/SiteNavigation";
import VisitorCounter from "../components/VisitorCounter";

export const metadata = {
  title: "Hakkımda | QuetraOnline",
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
          <div className="about-hero-copy">
            <span className="about-eyebrow">BİYOGRAFİ</span>
            <h1>Quetra Kimdir?</h1>
            <p>QuetraOnline; oyun, canlı yayın ve topluluk kültürünü bir araya getiren kişisel bir marka ve dijital buluşma noktasıdır. Nowa Online World ve Knight Online başta olmak üzere çevrim içi oyun dünyasındaki yayınları, içerikleri ve topluluk çalışmalarını tek çatı altında buluşturur.</p>
            <div className="about-facts">
              <div><span>ODAK NOKTASI</span><strong>Oyun & Yayın</strong></div>
              <div><span>BAŞLANGIÇ</span><strong>2012</strong></div>
              <div><span>ANA PLATFORM</span><strong>TikTok</strong></div>
            </div>
            <div className="about-hero-actions">
              <a href="https://www.tiktok.com/@quetraonline" target="_blank" rel="noreferrer">TikTok Kanalı</a>
              <a href="#social-links">Sosyal Hesaplar</a>
            </div>
          </div>
          <div className="about-hero-visual">
            <div className="about-hero-glow" />
            <img src="/quetra-logo.svg?v=20261108" alt="QuetraOnline logosu" />
            <span>QUETRAONLINE</span>
          </div>
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
            <div className="about-links" id="social-links">
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
        .about-page{padding-top:34px}
        .about-hero{position:relative;display:grid;grid-template-columns:minmax(0,1.35fr) minmax(250px,.65fr);align-items:stretch;min-height:285px;overflow:hidden;padding:30px 24px 24px;border:1px solid rgba(224,170,69,.38);border-radius:15px;background:linear-gradient(110deg,#24262a 0%,#1b1e24 58%,#292b30 100%);box-shadow:0 16px 45px #0005}
        .about-hero-copy{position:relative;z-index:2;display:flex;flex-direction:column;align-items:flex-start;justify-content:center;max-width:690px}
        .about-eyebrow{display:block;color:#c9a86a;letter-spacing:2px;font-size:10px;font-weight:800;margin-bottom:8px}
        .about-hero h1{font:900 clamp(28px,4vw,43px)/1.05 Manrope,sans-serif;letter-spacing:-1.7px;margin:0 0 12px;color:#f1f2f4;text-transform:uppercase;text-shadow:2px 2px 0 #8d6a36}
        .about-hero p{max-width:650px;margin:0;color:#d1d4da;font-size:13px;line-height:1.75}
        .about-facts{display:flex;flex-wrap:wrap;gap:28px;margin-top:22px}
        .about-facts div{display:flex;flex-direction:column;gap:5px}
        .about-facts span{font-size:9px;font-weight:800;letter-spacing:1.3px;color:#aeb4bf}
        .about-facts strong{font:800 18px Manrope,sans-serif;color:#f1f2f4}
        .about-hero-actions{display:flex;flex-wrap:wrap;gap:9px;margin-top:17px}
        .about-hero-actions a{display:inline-flex;align-items:center;justify-content:center;min-height:36px;padding:0 15px;border-radius:7px;background:#e51d2a;color:#fff;font-size:11px;font-weight:800}
        .about-hero-actions a+ a{background:#41454c;border:1px solid #555b65}
        .about-hero-visual{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;min-height:230px;overflow:hidden}
        .about-hero-glow{position:absolute;width:280px;height:220px;bottom:-90px;border-radius:50%;background:#c9a86a26;filter:blur(35px)}
        .about-hero-visual img{position:relative;z-index:1;display:block;width:min(100%,330px);height:190px;object-fit:contain;filter:drop-shadow(0 8px 18px #0009)}
        .about-hero-visual span{position:relative;z-index:1;margin:0 0 7px;color:#c9a86a;font-size:9px;font-weight:800;letter-spacing:3px}
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
        @media(max-width:700px){.about-page{padding-top:24px}.about-hero{grid-template-columns:1fr;padding:25px 19px 14px}.about-hero-copy{order:1}.about-hero-visual{order:2;min-height:145px;margin-top:10px}.about-hero-visual img{height:120px;width:min(75%,280px)}.about-hero h1{font-size:clamp(25px,7vw,35px)}.about-hero p{font-size:12px}.about-facts{gap:18px;margin-top:17px}.about-facts strong{font-size:15px}.about-grid{grid-template-columns:1fr}.about-panel{padding:21px}}
      `}</style>
    </main>
  );
}
