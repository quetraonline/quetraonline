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
                {name === "Instagram" ? <img className="social-instagram-logo" src="/instagram-logo.webp" alt="Instagram" /> : name === "X (Twitter)" ? <img className="social-x-logo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAES0lEQVR42u2YPUhcTRSG37l37u76E/xLs8SkiAhCCgVFMYWlIVhKwEKrpAgGrBRCkPBFSGxsLPwp01hEElIqIqgEF1vJEmxUFCQsIqK44rK77/tVd9mYdb2b+EE+yMA0d+6cee55z8ycc421VvgDmoM/pP0FudxssUHXdQs+z2azgRcwxsBxHJCEpNJBJCGVShWeZG1giHQ6HWievQoiFArp4cOHyGQycF0XJGGMQSqVwsbGhnGc4qo6joN0Oo26ujq1tbXh27dvODg4MK7rFvaMtVaXeygUkrVWHz58yErS+fk5JeX64OAgASgSiajY/MrKSsbjce7s7DAajdJaK8/zCs6BtZaFDDmOo1u3bvH79+/89OlT9u7du9nGxkbOz88znU6rsbGRxpjcon73PE+hUEgAuLi4yNPTU967d48Afnr3WhBrrcLhsACou7ubktjV1UUAqq2tZSKRYCwWy4Hkf2UkEhEAzczMUJI6OjoIQOFw+EqIoiD5RmdnZ3lycsK6ujoC0KNHjyhJL1++/EEi//2RkRFKUm9vb1EJA4N4nifP8xQOh7m/v8+PHz8SgABocnKSktTS0kIAqqioEAA9efKEkjQ8PBwY4lqQfIk6OjooiQMDAwSgsrIybm1tMR6PMxKJEIA6OzspSdPT0yVBBALJd/nbt2+ZyWRywdfa2kpJHBsb4507d3h2dsaFhQUC4OXYuREQfyc4jsN4PM4vX77kJBodHaUk7e3tcXNzk5WVlXRdt+gO+WUQXyJjjB48eEBJHBkZIQBZa7m6ukpJampqKlmSkkHyJRoeHqYkNjc3E4AaGhqYTCY5NTUVaKv+NogvkTFGS0tL/Pr1ay5Qnz59Skl8/PjxL8GUBGKtVVlZmQDo2bNnWUl69+5dLl4+f/7Mo6Mj1tTUMP+o/8+k6erqYjab5fr6OiWxu7ubAHT79m0eHx9zfn6+ZK+UFKwAdP/+fSaTSS4sLNBay8XFRSYSCVZXVxOAenp6KIl9fX03e6D5LnZdV1VVVdze3ubm5iYrKirouq6i0SiTySTn5uZyEs3MzPDi4oLRaDTwVr4WJP8MWVtb4+HhIaPRKI0xKi8v/+FY971QXl7O3d1dLi0tBZbo2rvGl+T9+/eURP9u8Y3743Nzczw/P2d9fT0BqL29nZL4/PnzQBIFun1fv35NSerp6fnJqO/2qqoqJhIJLi8v5yR68+YNJbGhoaFg7lJSPtLf309JevHixZVfdil30dDQkA/D5eVlrq+vE0DuNi8pQzPGqLe3l5I0MTFxrXt9mKmpKUpSLBZjLBbT1taWJGl8fJzGmCvjxXUc559CybPneejr69PKyopevXrleJ5XtBzws/a1tTV4nqdUKoWjoyPt7OwoFosJADY2NpBKpQom3qZY7ZvJZAAAQSD8RhIkSy5DioK4rgtjTA4oaC1TqDCTVLQwM3//Bvwvi3Bf3htY51ob/wJDslXsvVD3KgAAAABJRU5ErkJggg==" alt="X" /> : <b>{mark}</b>}<span><strong>{name}</strong><small>{handle}</small></span>
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
