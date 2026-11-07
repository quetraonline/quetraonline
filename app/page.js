const live = [
  { name: "TikTok", handle: "@quetraonline", action: "Yayına Katıl", href: "https://www.tiktok.com/@quetraonline", tone: "pink", mark: "♪" },
  { name: "YouTube", handle: "/quetraonline", action: "Kanalı Ziyaret Et", href: "https://www.youtube.com/@quetraonline", tone: "red", mark: "▶" },
  { name: "KICK", handle: "/quetraonline", action: "Canlı Yayını İzle", href: "https://kick.com/quetraonline", tone: "green", mark: "K" },
  { name: "Twitch", handle: "/quetraonline", action: "Canlı Yayını İzle", href: "https://www.twitch.tv/quetraonline", tone: "purple", mark: "▣" },
];

const socials = [
  ["Instagram", "/quetraonline", "https://www.instagram.com/quetraonline", "◎"],
  ["X (Twitter)", "/quetraonline", "https://x.com/quetraonline", "𝕏"],
  ["Facebook", "/quetraonline", "https://www.facebook.com/quetraonline", "f"],
  ["Threads", "/quetraonline", "https://www.threads.com/@quetraonline", "＠"],
  ["Telegram", "/quetraonline", "https://t.me/quetraonline", "➤"],
  ["Discord", "QuetraOnline", "https://discord.com", "◉"],
];

export default function Home() {
  return (
    <main className="quetra-site">
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="QuetraOnline ana sayfa">
          <img src="/quetra-logo.svg" alt="QuetraOnline" />
        </a>
        <nav aria-label="Ana menü">
          <a className="active" href="#home">⌂ <span>Ana Sayfa</span></a>
          <a href="#live">▣ <span>Canlı Yayınlar</span></a>
          <a href="#social">✥ <span>Sosyal Medya</span></a>
          <a href="#support">♙ <span>Destek</span></a>
          <a href="/tracker">◉ <span>Chat Tracker</span></a>
          <a href="#contact">✉ <span>İletişim</span></a>
        </nav>
      </header>

      <section className="hero-banner" id="home">
        <div className="hero-sky" />
        <div className="hero-copy">
          <img className="hero-logo" src="/quetra-logo.svg" alt="QuetraOnline" />
          <p>NOWA ONLINE WORLD</p>
          <span className="ornament">✦ ━━━━━━━━━━━━━━━━━ ✦</span>
        </div>
      </section>

      <div className="content-shell">
        <section className="live-section" id="live">
          <h2 className="gold-heading"><span>◉</span> CANLI YAYINLAR</h2>
          <div className="live-grid">
            {live.map((item) => (
              <a className={`live-card ${item.tone}`} href={item.href} target="_blank" rel="noreferrer" key={item.name}>
                <div className="live-brand">{item.name === "TikTok" ? <img className="platform-mark tiktok-mark" src="/tiktok-logo.svg" alt="TikTok" /> : item.name === "YouTube" ? <img className="platform-mark" src="/youtube-logo.svg" alt="YouTube" /> : <b>{item.mark}</b>}<strong>{item.name}</strong></div>
                <span className="handle">{item.handle}</span>
                <span className="live-action">{item.action} <i>›</i></span>
              </a>
            ))}
          </div>
        </section>

        <section className="social-section" id="social">
          <h2 className="gold-heading"><span>✧</span> SOSYAL MEDYA HESAPLARIMIZ <span>✧</span></h2>
          <div className="social-grid">
            {socials.map(([name, handle, href, mark]) => (
              <a href={href} target="_blank" rel="noreferrer" className="social-card" key={name}>
                <b>{mark}</b><span><strong>{name}</strong><small>{handle}</small></span>
              </a>
            ))}
          </div>
        </section>

        <section className="support-grid" id="support">
          <a className="support-card klas" href="https://www.klasgame.com/yayincilar/quetraonline" target="_blank" rel="noreferrer">
            <div><h3>KLAS<span>GAME</span></h3><small>Destek Olmak İçin</small><p>KlasGame üzerinden bağış yapabilirsiniz.</p><b className="support-button">Destek Ol ›</b></div>
            <span className="treasure">♜</span>
          </a>
          <a className="support-card byno" href="https://www.bynogame.com/" target="_blank" rel="noreferrer">
            <div><h3>◒ ByNoGame</h3><small>Destek Olmak İçin</small><p>ByNoGame üzerinden bağış yapabilirsiniz.</p><b className="support-button">Destek Ol ›</b></div>
            <span className="treasure">♛</span>
          </a>
        </section>

        <section className="game-links">
          <div className="game-brand"><strong>NOWA</strong><span>Online World</span></div>
          <h2 className="gold-heading">OYUN BAĞLANTILARI</h2>
          <a href="https://www.nowaonlineworld.com/" target="_blank" rel="noreferrer">♟ <span>Nowa Online World<small>Resmi Site</small></span> ›</a>
          <a href="https://www.nowaonlineworld.com/chaos-zone-user-ranking" target="_blank" rel="noreferrer">🏆 <span>Chaos Zone<small>Sıralaması</small></span> ›</a>
        </section>

        <footer className="site-footer" id="contact">
          <a href="mailto:quetraonline@gmail.com"><span>✉</span><strong>Bana Mail Gönder</strong><small>quetraonline@gmail.com</small></a>
        </footer>
      </div>
    </main>
  );
}
