"use client";

const socials = [
  { label: "TikTok", handle: "@quetraonline", href: "https://www.tiktok.com/@quetraonline", icon: "♪" },
  { label: "YouTube", handle: "YouTube kanalım", href: "https://www.youtube.com/@quetraonline", icon: "▶" },
  { label: "Twitch", handle: "Canlı yayın", href: "https://www.twitch.tv/quetraonline", icon: "▣" },
  { label: "Kick", handle: "Canlı yayın", href: "https://kick.com/quetraonline", icon: "K" },
  { label: "Instagram", handle: "@quetraonline", href: "https://www.instagram.com/quetraonline", icon: "◎" },
  { label: "X", handle: "@quetraonline", href: "https://x.com/quetraonline", icon: "𝕏" },
  { label: "Facebook", handle: "QuetraOnline", href: "https://www.facebook.com/quetraonline", icon: "f" },
  { label: "Threads", handle: "@quetraonline", href: "https://www.threads.com/@quetraonline", icon: "@" }
];

const games = [
  { title: "Nowa Online World", subtitle: "Birlikte savaştığımız dünya", href: "https://www.nowaonlineworld.com/", icon: "⚔" },
  { title: "Chaos Zone Sıralaması", subtitle: "Oyuncu sıralamasını görüntüle", href: "https://www.nowaonlineworld.com/chaos-zone-user-ranking", icon: "🏆" },
  { title: "Garena Delta Force", subtitle: "Savaş alanına katıl", href: "https://deltaforce.garena.com/", icon: "🎯" }
];

export default function Home() {
  return (
    <main className="siteShell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="QuetraOnline ana sayfa">
          <span className="brandMark">Q</span>
          <span>QUETRA<span className="brandLight">ONLINE</span></span>
        </a>
        <nav className="topNav">
          <a href="#yayinda">Yayınlar</a>
          <a href="#sosyal">Sosyal Medya</a>
          <a href="#oyunlar">Oyunlar</a>
        </nav>
        <a className="topSupport" href="https://www.klasgame.com/yayincilar/quetraonline" target="_blank" rel="noreferrer">♥ <span>Destek Ol</span></a>
      </header>

      <section className="heroBanner">
        <div className="bannerGlow" />
        <div className="bannerContent">
          <span className="eyebrow"><i /> RESMİ YAYINCI PROFİLİ</span>
          <h1>OYUNUN OLDUĞU<br /><em>YERDEYİZ.</em></h1>
          <p>Yayınlar, oyunlar ve güçlü bir topluluk. Quetra'nın dünyasına hoş geldin.</p>
        </div>
        <div className="bannerSeal">Q<span>ONLINE</span></div>
      </section>

      <div className="contentGrid">
        <section className="mainColumn">
          <article className="profilePanel">
            <div className="profileCover">
              <div className="coverLines" />
              <span className="coverTag">QUETRA COMMUNITY</span>
            </div>
            <div className="profileBody">
              <div className="avatarFrame">
                <img src="https://ugc.production.linktr.ee/ac7d6a84-ecf8-4272-9f48-4c6c9f21d869_IMG-2626.png" alt="Quetra profil görseli" />
                <span className="statusDot" />
              </div>
              <div className="profileInfo">
                <div className="profileTitleRow">
                  <h2>Quetra<span className="verified">✓</span></h2>
                  <span className="profileType">YAYINCI</span>
                </div>
                <p>Nowa Online World oyuncusu · İçerik üreticisi · Yayıncı</p>
                <div className="profileMeta"><span>✦</span> OYUNDA GÖRÜŞÜRÜZ.</div>
              </div>
              <a className="profileContact" href="mailto:quetraonline@gmail.com?subject=QuetraOnline%20%C4%B0leti%C5%9Fim">✉ <span>İletişime Geç</span></a>
            </div>
            <div className="profileStats">
              <div><strong>QUETRA</strong><small>Yayıncı adı</small></div>
              <div><strong>ONLINE</strong><small>Topluluk</small></div>
              <div><strong>2026</strong><small>Birlikte nice yayınlara</small></div>
            </div>
          </article>

          <section className="sectionBlock" id="yayinda">
            <div className="sectionHeading"><div><span className="sectionKicker">CANLI YAYIN</span><h2>Yayın kanallarım</h2></div><span className="headingLine" /></div>
            <div className="streamGrid">
              <a className="streamCard tiktok" href="https://www.tiktok.com/@quetraonline" target="_blank" rel="noreferrer">
                <span className="streamIcon">♪</span><span className="streamInfo"><strong>TikTok LIVE</strong><small>@quetraonline</small></span><b>YAYINA GİT ↗</b>
              </a>
              <a className="streamCard youtube" href="https://www.youtube.com/@quetraonline" target="_blank" rel="noreferrer">
                <span className="streamIcon">▶</span><span className="streamInfo"><strong>YouTube</strong><small>QuetraOnline</small></span><b>KANALA GİT ↗</b>
              </a>
              <a className="streamCard twitch" href="https://www.twitch.tv/quetraonline" target="_blank" rel="noreferrer">
                <span className="streamIcon">▣</span><span className="streamInfo"><strong>Twitch</strong><small>QuetraOnline</small></span><b>KANALA GİT ↗</b>
              </a>
              <a className="streamCard kick" href="https://kick.com/quetraonline" target="_blank" rel="noreferrer">
                <span className="streamIcon">K</span><span className="streamInfo"><strong>Kick</strong><small>QuetraOnline</small></span><b>KANALA GİT ↗</b>
              </a>
            </div>
            <div className="streamNotice"><span className="noticePulse" /> Canlı yayın başladığında favori kanalından bize katıl.</div>
          </section>

          <section className="sectionBlock" id="sosyal">
            <div className="sectionHeading"><div><span className="sectionKicker">BİZİ TAKİP ET</span><h2>Sosyal medya hesaplarım</h2></div><span className="headingLine" /></div>
            <div className="socialGrid">
              {socials.map((item) => (
                <a className="socialCard" href={item.href} target="_blank" rel="noreferrer" key={item.label}>
                  <span className="socialIcon">{item.icon}</span><span><strong>{item.label}</strong><small>{item.handle}</small></span><b>↗</b>
                </a>
              ))}
            </div>
          </section>

          <section className="sectionBlock" id="oyunlar">
            <div className="sectionHeading"><div><span className="sectionKicker">OYUN DÜNYAM</span><h2>Oynadığım oyunlar</h2></div><span className="headingLine" /></div>
            <div className="gameGrid">
              {games.map((game) => (
                <a className="gameCard" href={game.href} target="_blank" rel="noreferrer" key={game.title}>
                  <span className="gameIcon">{game.icon}</span><span><strong>{game.title}</strong><small>{game.subtitle}</small></span><b>↗</b>
                </a>
              ))}
            </div>
          </section>
        </section>

        <aside className="sideColumn">
          <section className="supportPanel">
            <span className="sideKicker">TOPLULUĞUMUZUN GÜCÜ</span>
            <div className="heartMark">♥</div>
            <h2>Yayınlarıma<br /><em>destek ol!</em></h2>
            <p>Desteğin, daha güzel yayınlar ve içerikler üretmem için bana güç veriyor. Şimdiden teşekkürler!</p>
            <a className="donateButton" href="https://www.klasgame.com/yayincilar/quetraonline" target="_blank" rel="noreferrer">BAĞIŞ YAP <span>↗</span></a>
            <a className="secondaryDonate" href="https://donate.bynogame.com/quetraonline" target="_blank" rel="noreferrer">ByNoGame üzerinden destek ol ↗</a>
          </section>

          <section className="sidePanel">
            <div className="sidePanelTitle"><span>✦</span> HIZLI BAĞLANTILAR</div>
            <a href="https://www.nowaonlineworld.com/" target="_blank" rel="noreferrer">Nowa Online World <b>↗</b></a>
            <a href="https://www.nowaonlineworld.com/chaos-zone-user-ranking" target="_blank" rel="noreferrer">Chaos Zone Sıralaması <b>↗</b></a>
            <a href="mailto:quetraonline@gmail.com?subject=QuetraOnline%20%C4%B0leti%C5%9Fim">E-posta gönder <b>↗</b></a>
          </section>

          <section className="contactPanel">
            <span className="sideKicker">İLETİŞİM</span>
            <h3>Bir mesaj uzağındayım.</h3>
            <p>İş birlikleri ve tüm soruların için bana ulaşabilirsin.</p>
            <a href="mailto:quetraonline@gmail.com?subject=QuetraOnline%20%C4%B0leti%C5%9Fim">✉ quetraonline@gmail.com</a>
          </section>
        </aside>
      </div>

      <footer className="footer">
        <a className="brand footerBrand" href="/"><span className="brandMark">Q</span><span>QUETRA<span className="brandLight">ONLINE</span></span></a>
        <p>OYUNDA GÖRÜŞÜRÜZ. <span>✦</span></p>
        <small>© 2026 QUETRAONLINE · TÜM HAKLARI SAKLIDIR</small>
      </footer>
    </main>
  );
}
