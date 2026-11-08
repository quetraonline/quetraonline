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
                <div className="live-brand">{item.name === "TikTok" ? <img className="platform-mark tiktok-mark" src="/tiktok-logo.svg" alt="TikTok" /> : item.name === "YouTube" ? <img className="platform-mark" src="/youtube-logo.svg" alt="YouTube" /> : item.name === "Kick" ? <img className="platform-mark" src="/kick-logo.svg" alt="Kick" /> : item.name === "Twitch" ? <img className="platform-mark" src="/twitch-logo.svg" alt="Twitch" /> : <b>{item.mark}</b>}<strong>{item.name}</strong></div>
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
                {name === "Instagram" ? <img className="social-instagram-logo" src="/instagram-logo.webp" alt="Instagram" /> : name === "X (Twitter)" ? <img className="social-x-logo" src="/x-logo.svg" alt="X" /> : name === "Facebook" ? <img className="social-x-logo" src="/facebook-logo.svg" alt="Facebook" /> : name === "Threads" ? <img className="social-x-logo" src="/threads-logo.svg" alt="Threads" /> : name === "Telegram" ? <img className="social-x-logo" src="/telegram-logo.svg?v=2" alt="Telegram" /> : name === "Discord" ? <img className="social-x-logo" src="data:image/png;base64,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" alt="Discord" /> : <b>{mark}</b>}<span><strong>{name}</strong><small>{handle}</small></span>
              </a>
            ))}
          </div>
        </section>

        <section className="support-grid" id="support">
          <a className="support-card klas" href="https://www.klasgame.com/yayincilar/quetraonline" target="_blank" rel="noreferrer">
            <div><h3>KLAS<span>GAME</span></h3><small>Destek Olmak İçin</small><p>KlasGame üzerinden bağış yapabilirsiniz.</p><b className="support-button">Destek Ol ›</b></div>
            <img className="klasgame-logo" src="/klasgame-logo.svg" alt="KLASGAME" />
          </a>
          <a className="support-card byno" href="https://www.bynogame.com/" target="_blank" rel="noreferrer">
            <div><h3>ByNo<span>Game</span></h3><small>Destek Olmak İçin</small><p>ByNoGame üzerinden bağış yapabilirsiniz.</p><b className="support-button">Destek Ol ›</b></div>
            <img className="bynogame-mascot" src="/bynogame-mascot.png" alt="ByNoGame maskotu" />
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
