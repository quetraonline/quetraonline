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
            <img src="/quetra-logo.svg?v=20261108" alt="QuetraOnline logosu" />
          </div>
        </section>
        <section className="profile-section">
          <div className="profile-heading">
            <div className="profile-icon" aria-hidden="true">▣</div>
            <div><span>BİYOGRAFİ</span><h2>CENK PEKKAN KİMDİR?</h2></div>
          </div>
          <div className="profile-table">
            {[
              ["Tam adı", "Cenk Pekkan"],
              ["Bilinen adı", "CenkBeyResmi"],
              ["Eski takma adı", "JackPackkan (Twitch dönemi)"],
              ["İzleyicilerin deyişiyle", "Cenk Bey, Cenk Abi"],
              ["Meslek", "Yayıncı, içerik üreticisi"],
              ["Yaşadığı yer", "Malta"],
              ["Önceki ikamet", "Kuzey Makedonya (~2 yıl)"],
              ["Doğum yılı", "1990"],
              ["Ana platform", "YouTube (@CenkBeyYayin)"],
              ["Casino yayınları", "Kendi sitesi (cenkbey)"],
              ["Kick hesabı", "Şu anda askıda"],
              ["Yayına başlangıç", "2019"]
            ].map(([label, value]) => (
              <div className="profile-row" key={label}><span>{label}</span><strong>{value}</strong></div>
            ))}
          </div>
        </section>
        <section className="platform-section">
          <div className="platform-heading">
            <div className="platform-icon" aria-hidden="true">⌘</div>
            <div><span>PLATFORMLAR</span><h2>NEREDE BULUNUR?</h2></div>
          </div>
          <div className="platform-list">
            {[
              { icon: "▶", name: "YouTube", handle: "@CenkBeyYayin", detail: "Ana yayın kanalı", href: "https://www.youtube.com/@CenkBeyYayin" },
              { icon: "◎", name: "Instagram", handle: "@realcenkkpekkan", detail: "Aktif Instagram hesabı", href: "https://www.instagram.com/realcenkkpekkan" },
              { icon: "➤", name: "Telegram", handle: "cenkbeychat", detail: "Sohbet grubu", href: "https://t.me/cenkbeychat" },
              { icon: "➤", name: "Telegram", handle: "cenkbeyduyuru", detail: "Duyuru kanalı", href: "https://t.me/cenkbeyduyuru" },
              { icon: "➤", name: "Telegram", handle: "cenkbeyetkinlik", detail: "Etkinlik ve çekiliş kanalı", href: "https://t.me/cenkbeyetkinlik" },
              { icon: "◉", name: "WhatsApp", handle: "CenkBey WhatsApp", detail: "WhatsApp kanalı" },
              { icon: "◉", name: "Spotify", handle: "CenkBey Spotify", detail: "Spotify profili" },
              { icon: "K", name: "Kick", handle: "cenkbeyresmi", detail: "Eski ana platform, hesap askıda", href: "https://kick.com/cenkbeyresmi" }
            ].map((item) => (
              <a className="platform-row" key={item.name + item.handle} href={item.href || undefined} target={item.href ? "_blank" : undefined} rel={item.href ? "noreferrer" : undefined}>
                <span className="platform-brand-icon">{item.icon}</span>
                <span className="platform-copy"><span><b>{item.name}</b><strong>{item.handle}</strong></span><small>{item.detail}</small></span>
                {item.href && <span className="platform-arrow">↗</span>}
              </a>
            ))}
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
        .about-hero-visual{position:relative;display:flex;align-items:center;justify-content:center;min-height:230px;overflow:hidden}
                .about-hero-visual img{position:relative;z-index:1;display:block;width:min(100%,330px);height:190px;object-fit:contain;filter:drop-shadow(0 5px 10px #0007)}
        .profile-section{margin-top:22px}
        .profile-heading{display:flex;align-items:center;gap:15px;margin:0 0 16px}
        .profile-icon{width:56px;height:56px;flex:0 0 56px;display:grid;place-items:center;border:1px solid #4b4b4b;border-radius:17px;background:#333;color:#f3f3f3;font-size:26px}
        .profile-heading span{display:block;color:#b9c0ca;font-size:10px;font-weight:800;letter-spacing:1.5px;margin-bottom:3px}
        .profile-heading h2{margin:0;color:#f2f3f5;font:900 clamp(22px,3vw,31px)/1.1 Manrope,sans-serif;letter-spacing:-.8px;text-transform:uppercase;text-shadow:2px 2px 0 #9d702e}
        .profile-table{overflow:hidden;border:1px solid #51402a;border-radius:13px;background:rgba(26,30,39,.94);box-shadow:0 10px 28px #0003}
        .profile-row{display:grid;grid-template-columns:minmax(180px,18%) 1fr;min-height:41px;align-items:center;border-bottom:1px solid rgba(224,170,69,.16);padding:0 16px;gap:16px}
        .profile-row:last-child{border-bottom:0}
        .profile-row span{color:#d0d3da;font-size:13px;font-weight:700}
        .profile-row strong{color:#f7f7f7;font-size:13px;font-weight:800}
        .platform-section{margin-top:22px}
        .platform-heading{display:flex;align-items:center;gap:15px;margin:0 0 16px}
        .platform-icon{width:56px;height:56px;flex:0 0 56px;display:grid;place-items:center;border:1px solid #4b4b4b;border-radius:17px;background:#333;color:#fff;font-size:27px}
        .platform-heading span{display:block;color:#b9c0ca;font-size:10px;font-weight:800;letter-spacing:1.5px;margin-bottom:3px}
        .platform-heading h2{margin:0;color:#f2f3f5;font:900 clamp(22px,3vw,31px)/1.1 Manrope,sans-serif;letter-spacing:-.8px;text-transform:uppercase;text-shadow:2px 2px 0 #9d702e}
        .platform-list{overflow:hidden;border:1px solid #51402a;border-radius:13px;background:rgba(26,30,39,.94);box-shadow:0 10px 28px #0003}
        .platform-row{display:flex;align-items:center;gap:14px;min-height:60px;padding:9px 17px;border-bottom:1px solid rgba(224,170,69,.16);color:#fff;text-decoration:none;transition:background .15s}
        .platform-row:last-child{border-bottom:0}
        .platform-row[href]:hover{background:#3a4252}
        .platform-brand-icon{width:20px;flex:0 0 20px;text-align:center;color:#fff;font-size:19px;font-weight:900}
        .platform-copy{display:flex;flex-direction:column;gap:2px;min-width:0}
        .platform-copy>span{display:flex;flex-wrap:wrap;gap:9px;align-items:baseline}
        .platform-copy b{font-size:13px;font-weight:900;color:#fff}
        .platform-copy strong{font-size:12px;color:#d7d9de;font-weight:700}
        .platform-copy small{font-size:11px;color:#c4c8d0}
        .platform-arrow{margin-left:auto;color:#c4c4c4;font-size:16px}
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
        @media(max-width:700px){.platform-heading{gap:11px}.platform-icon{width:48px;height:48px;flex-basis:48px}.platform-row{min-height:57px;padding:9px 12px;gap:11px}.platform-copy b{font-size:12px}.platform-copy strong{font-size:11px}.profile-heading{gap:11px}.profile-icon{width:48px;height:48px;flex-basis:48px}.profile-row{grid-template-columns:minmax(112px,38%) 1fr;gap:10px;padding:9px 12px;min-height:42px}.profile-row span,.profile-row strong{font-size:11px}.about-page{padding-top:24px}.about-hero{grid-template-columns:1fr;padding:25px 19px 14px}.about-hero-copy{order:1}.about-hero-visual{order:2;min-height:145px;margin-top:10px}.about-hero-visual img{height:120px;width:min(75%,280px)}.about-hero h1{font-size:clamp(25px,7vw,35px)}.about-hero p{font-size:12px}.about-facts{gap:18px;margin-top:17px}.about-facts strong{font-size:15px}.about-grid{grid-template-columns:1fr}.about-panel{padding:21px}}
      `}</style>
    </main>
  );
}
