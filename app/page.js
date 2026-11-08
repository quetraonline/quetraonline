import YouTubeReplays from "./components/YouTubeReplays";

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
  ["Discord", "/quetraonline", "https://discord.com", "◉"],
];

export default function Home() {
  return (
    <main className="quetra-site">
      <header className="site-header">
        <nav aria-label="Ana menü">
          <a className="active" href="#home">⌂ <span>Ana Sayfa</span></a>
          <a href="/iletisim">✉ <span>İletişim</span></a>
        </nav>
      </header>

      <section className="hero-banner" id="home">
        <div className="hero-sky" />
        <div className="hero-copy">
          <img className="hero-logo" src="/quetra-logo.svg?v=20261108" alt="QuetraOnline" />
        </div>
      </section>

      <div className="content-shell">
        <section className="live-section" id="live">
          <h2 className="gold-heading">🎥 CANLI YAYIN HESAPLARIM</h2>
          <div className="live-grid">
            {live.map((item) => (
              <a className={`live-card ${item.tone}`} href={item.href} target="_blank" rel="noreferrer" key={item.name}>
                <div className="live-brand">{item.name === "TikTok" ? <img className="platform-mark tiktok-mark" src="/tiktok-logo.svg?v=20261108" alt="TikTok" /> : item.name === "YouTube" ? <img className="platform-mark" src="/youtube-logo.svg?v=20261108" alt="YouTube" /> : item.name === "Kick" ? <img className="platform-mark" src="/kick-logo.svg?v=20261108" alt="Kick" /> : item.name === "Twitch" ? <img className="platform-mark" src="/twitch-logo.svg?v=20261108" alt="Twitch" /> : <b>{item.mark}</b>}<strong>{item.name}</strong></div>
                <span className="handle">{item.handle}</span>
                <span className="live-action">{item.action} <i>›</i></span>
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
            <div><h3>KLAS<span>GAME</span></h3><small>Destek Olmak İçin</small><p>KlasGame üzerinden bağış yapabilirsiniz.</p><b className="support-button">Destek Ol ›</b></div>
            <picture><source media="(max-width: 520px)" srcSet="/klasgame-mobile-logo.svg?v=20261108" /><img className="klasgame-logo" src="/klasgame-logo.svg?v=20261108" alt="KLASGAME" /></picture>
          </a>
          <a className="support-card oyuneks" href="https://oyuneks.com/yayinci/quetraonline" target="_blank" rel="noreferrer">
            <div><h3>OYUN<span>EKS</span></h3><small>Destek Olmak İçin</small><p>Oyuneks üzerinden bağış yapabilirsiniz.</p><b className="support-button">Destek Ol ›</b></div>
            <img className="oyuneks-logo" src="/oyuneks-mark.svg?v=20261108" alt="Oyuneks logosu" />
          </a>
          <a className="support-card byno" href="https://donate.bynogame.com/quetraonline" target="_blank" rel="noreferrer">
            <div><h3>ByNo<span>Game</span></h3><small>Destek Olmak İçin</small><p>ByNoGame üzerinden bağış yapabilirsiniz.</p><b className="support-button">Destek Ol ›</b></div>
            <img className="bynogame-mascot" src="/bynogame-logo.svg?v=20261108" alt="ByNoGame maskotu" />
          </a>
        </section>

        <YouTubeReplays />

        <section className="game-links">
          <div className="game-brand"><img src="/c12449a6-73d4-4bcd-8234-dd18147dc63c.png" alt="NOWA Online World" /></div>
          <h2 className="gold-heading">OYUN BAĞLANTILARI</h2>
          <a href="https://www.nowaonlineworld.com/" target="_blank" rel="noreferrer">♟ <span>Nowa Online World<small>Resmi Site</small></span> ›</a>
          <a href="https://www.nowaonlineworld.com/chaos-zone-user-ranking" target="_blank" rel="noreferrer">🏆 <span>Chaos Zone<small>Sıralaması</small></span> ›</a>
        </section>

        <footer className="site-footer" id="contact">
          <img className="footer-logo" src="/quetra-logo.svg?v=20261108" alt="QuetraOnline" />
          <p>© 2026 QuetraOnline.com - Tüm hakları saklıdır.</p>
          <p>Sorun ve şikayetleriniz için <a href="/iletisim">İletişim</a> sayfasından bana ulaşın.</p>
        </footer>
      </div>
    </main>
  );
}

