import YouTubeReplays from "./components/YouTubeReplays";
import VisitorCounter from "./components/VisitorCounter";
import SiteNavigation from "./components/SiteNavigation";

const live = [
  { name: "TikTok", handle: "@quetraonline", action: "Yayına Katıl", href: "https://www.tiktok.com/@quetraonline", tone: "pink", mark: "♪" },
  { name: "YouTube", handle: "/quetraonline", action: "Kanalı Ziyaret Et", href: "https://www.youtube.com/@quetraonline", tone: "red", mark: "▶" },
  { name: "Kick", handle: "/quetraonline", action: "Canlı Yayını İzle", href: "https://kick.com/quetraonline", tone: "green", mark: "K" },
  { name: "Twitch", handle: "/quetraonline", action: "Canlı Yayını İzle", href: "https://www.twitch.tv/quetraonline", tone: "purple", mark: "▣" },
];

const socials = [
  ["Instagram", "/quetraonline", "https://www.instagram.com/quetraonline", "◎"],
  ["X (Twitter)", "/quetraonline", "https://x.com/quetraonline", "𝕏"],
  ["Facebook", "/quetraonline", "https://www.facebook.com/quetraonline", "f"],
  ["Threads", "/quetraonline", "https://www.threads.com/@quetraonline", "＠"],
  ["Telegram", "/quetraonline", "https://t.me/quetraonline", "➤"],
  ["Discord", "/quetraonline", "http://discordapp.com/users/295839795874365440", "◉"],
];

export const dynamic = "force-dynamic";

export default async function Home() {
  let heroLogoVisible = true;
  try {
    const response = await fetch("https://hfmosadynxpwkscvpard.supabase.co/rest/v1/quetra_site_settings?select=hero_logo_visible&id=eq.true", {
      headers: { apikey: "sb_publishable_1UDqJWj6DAKrx7tfWMs2lA_nW-Ee29S", Authorization: "Bearer sb_publishable_1UDqJWj6DAKrx7tfWMs2lA_nW-Ee29S" },
      cache: "no-store",
    });
    if (response.ok) {
      const settings = await response.json();
      if (typeof settings[0]?.hero_logo_visible === "boolean") heroLogoVisible = settings[0].hero_logo_visible;
    }
  } catch {}
  return (
    <main className="quetra-site">
      <SiteNavigation active="home" />

      {heroLogoVisible && (
        <section className="hero-banner" id="home">
          <div className="hero-sky" />
          <div className="hero-copy">
            <img className="hero-logo" src="/quetra-logo.svg?v=20261108" alt="QuetraOnline" />
          </div>
        </section>
      )}

      <div className="content-shell">
        <section className="live-section" id="live">
          <h2 className="gold-heading">🎥 CANLI YAYIN HESAPLARIM</h2>
          <div className="live-grid">
            {live.map((item) => (
              <a className={`live-card ${item.tone}`} href={item.href} target="_blank" rel="noreferrer" key={item.name}>
                <div className="live-brand">{item.name === "TikTok" ? <img className="platform-mark tiktok-mark" src="/tiktok-logo.svg?v=20261108" alt="TikTok" /> : item.name === "YouTube" ? <img className="platform-mark" src="/youtube-logo.svg?v=20261108" alt="YouTube" /> : item.name === "Kick" ? <img className="platform-mark" src="/kick-logo.svg?v=20261108" alt="Kick" /> : item.name === "Twitch" ? <img className="platform-mark" src="/twitch-logo.svg?v=20261108" alt="Twitch" /> : <b>{item.mark}</b>}<strong>{item.name}</strong></div>
                <span className="handle">{item.handle}</span>
                <span className="live-action">
                  {item.action}
                  <svg className="live-action-logo live-action-arrow" viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M2.5 8h10M8.5 3.5 13 8l-4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="social-section" id="social">
          <h2 className="gold-heading">🌎 SOSYAL MEDYA HESAPLARIM</h2>
          <div className="social-grid">
            {socials.map(([name, handle, href, mark]) => (
              <a href={href} target="_blank" rel="noreferrer" className="social-card" key={name}>
                {name === "Instagram" ? <img className="social-instagram-logo" src="/instagram-logo.webp?v=20261108" alt="Instagram" /> : name === "X (Twitter)" ? <img className="social-x-logo" src="/x-logo.svg?v=20261108" alt="X" /> : name === "Facebook" ? <img className="social-x-logo" src="/facebook-logo.svg?v=20261108" alt="Facebook" /> : name === "Threads" ? <img className="social-x-logo" src="/threads-logo.svg?v=20261108" alt="Threads" /> : name === "Telegram" ? <img className="social-x-logo" src="/telegram-logo.svg?v=20261108" alt="Telegram" /> : name === "Discord" ? <img className="social-x-logo" src="/discord-logo-fixed.svg?v=20261108" alt="Discord" /> : <b>{mark}</b>}<span><strong>{name}</strong><small>{handle}</small></span>
              </a>
            ))}
          </div>
        </section>


        <h2 className="gold-heading support-heading">💰 BANA DESTEK OLMAK İSTERSENİZ;</h2>
        <section className="support-grid" id="support">
          <a className="support-card klas" href="https://www.klasgame.com/yayincilar/quetraonline" target="_blank" rel="noreferrer">
            <div><h3>KLAS<span>GAME</span></h3><small>Destek Olmak İçin</small><p>KlasGame üzerinden bağış yapabilirsiniz.</p><b className="support-button">Destek Ol<svg className="support-button-arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M2.5 8h10M8.5 3.5 13 8l-4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></b></div>
            <picture><source media="(max-width: 520px)" srcSet="/klasgame-mobile-logo.svg?v=20261108" /><img className="klasgame-logo" src="/klasgame-logo.svg?v=20261108" alt="KLASGAME" /></picture>
          </a>
          <a className="support-card oyuneks" href="https://oyuneks.com/yayinci/quetraonline" target="_blank" rel="noreferrer">
            <div><h3>OYUN<span>EKS</span></h3><small>Destek Olmak İçin</small><p>Oyuneks üzerinden bağış yapabilirsiniz.</p><b className="support-button">Destek Ol<svg className="support-button-arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M2.5 8h10M8.5 3.5 13 8l-4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></b></div>
            <img className="oyuneks-logo" src="/oyuneks-mark.svg?v=20261108" alt="Oyuneks logosu" />
          </a>
          <a className="support-card byno" href="https://donate.bynogame.com/quetraonline" target="_blank" rel="noreferrer">
            <div><h3>ByNo<span>Game</span></h3><small>Destek Olmak İçin</small><p>ByNoGame üzerinden bağış yapabilirsiniz.</p><b className="support-button">Destek Ol<svg className="support-button-arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M2.5 8h10M8.5 3.5 13 8l-4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></b></div>
            <img className="bynogame-mascot" src="/bynogame-logo.svg?v=20261108" alt="ByNoGame maskotu" />
          </a>
          <a className="support-card oyunfor" href="https://www.oyunfor.com/donate/quetraonline" target="_blank" rel="noreferrer">
            <div><h3>OYUNFOR</h3><small>Destek Olmak İçin</small><p>Oyunfor üzerinden bağış yapabilirsiniz.</p><b className="support-button">Destek Ol<svg className="support-button-arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M2.5 8h10M8.5 3.5 13 8l-4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></b></div>
            <img className="support-logo-placeholder oyunfor-logo" src="/oyunfor.png?v=20261114-1634" alt="Oyunfor logosu" />
          </a>
          <a className="support-card kopazar" href="https://www.kopazar.com/streamer/quetraonline" target="_blank" rel="noreferrer">
            <div><h3>KOPAZAR</h3><small>Destek Olmak İçin</small><p>Kopazar üzerinden bağış yapabilirsiniz.</p><b className="support-button">Destek Ol<svg className="support-button-arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M2.5 8h10M8.5 3.5 13 8l-4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></b></div>
            <img className="support-logo-placeholder kopazar-logo" src="/kopazarr.png?v=20261114-1715" alt="Kopazar logosu" />
          </a>
          <a className="support-card sonteklif" href="https://www.sonteklif.com/yayinci/quetraonline" target="_blank" rel="noreferrer">
            <div><h3>SONTEKLİF</h3><small>Destek Olmak İçin</small><p>Sonteklif üzerinden bağış yapabilirsiniz.</p><b className="support-button">Destek Ol<svg className="support-button-arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M2.5 8h10M8.5 3.5 13 8l-4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></b></div>
            <img className="support-logo-placeholder sonteklif-logo" src="/sontekliflogoo.png?v=20261114-1705" alt="Sonteklif logosu" />
          </a>
        </section>

        <YouTubeReplays />

        <footer className="site-footer" id="contact">
          <img className="footer-logo" src="/quetra-logo.svg?v=20261108" alt="QuetraOnline" />
          <VisitorCounter />
          <p>© 2026 QuetraOnline.com - Tüm hakları saklıdır.</p>
          <p>Sorun ve şikayetleriniz için <a href="/iletisim">İletişim</a> sayfasından bana ulaşın.</p>
        </footer>
      </div>
    </main>
  );
}
