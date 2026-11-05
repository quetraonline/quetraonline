"use client";

const groups = [
  {
    title: "BANA DESTEK OLMAK İSTERSENİZ",
    links: [
      { name: "KlasGame Bağış Sayfam", note: "Yayınlarıma destek ol", url: "https://www.klasgame.com/yayincilar/quetraonline", icon: "₺", featured: true },
      { name: "ByNoGame Bağış Sayfam", note: "Quetra'ya destek gönder", url: "https://donate.bynogame.com/quetraonline", icon: "♥", featured: true }
    ]
  },
  {
    title: "CANLI YAYIN HESAPLARIM",
    links: [
      { name: "TikTok", note: "@quetraonline", url: "https://www.tiktok.com/@quetraonline", icon: "♪", tag: "LIVE" },
      { name: "YouTube", note: "@quetraonline", url: "https://www.youtube.com/@quetraonline", icon: "▶" },
      { name: "Twitch", note: "Canlı yayın kanalım", url: "https://www.twitch.tv/quetraonline", icon: "▣" },
      { name: "Kick", note: "Canlı yayın kanalım", url: "https://kick.com/quetraonline", icon: "K" }
    ]
  },
  {
    title: "SOSYAL MEDYA HESAPLARIM",
    links: [
      { name: "Instagram", note: "@quetraonline", url: "https://www.instagram.com/quetraonline", icon: "◎" },
      { name: "Facebook", note: "@quetraonline", url: "https://www.facebook.com/quetraonline", icon: "f" },
      { name: "X", note: "@quetraonline", url: "https://x.com/quetraonline", icon: "𝕏" },
      { name: "Threads", note: "@quetraonline", url: "https://www.threads.com/@quetraonline", icon: "@" }
    ]
  },
  {
    title: "DİĞER PLATFORM HESAPLARIM",
    links: [
      { name: "Discord", note: "Quetra Discord profili", url: "https://discord.com/users/295839795874365440", icon: "◉" },
      { name: "Telegram", note: "@quetraonline", url: "https://t.me/quetraonline", icon: "➤" },
      { name: "Tumblr", note: "@quetraonline", url: "https://www.tumblr.com/quetraonline", icon: "t" },
      { name: "Reddit", note: "u/quetraonline", url: "https://www.reddit.com/user/quetraonline/", icon: "r" }
    ]
  },
  {
    title: "OYUN PLATFORMLARINDA BEN",
    links: [
      { name: "Steam", note: "steamcommunity.com/id/Quetraonline", url: "https://steamcommunity.com/id/Quetraonline", icon: "⌘" }
    ]
  }
];

const games = [
  { name: "NOWA ONLINE WORLD", detail: "Mobile · Resmî web sitesi", url: "https://www.nowaonlineworld.com/", symbol: "⚔" },
  { name: "CHAOS ZONE SIRALAMASI", detail: "Oyuncu sıralamasını görüntüle", url: "https://www.nowaonlineworld.com/chaos-zone-user-ranking", symbol: "🏆" },
  { name: "GARENA DELTA FORCE", detail: "Mobile", url: "https://deltaforce.garena.com/", symbol: "🎯" }
];

export default function Home() {
  return (
    <main className="linkPage">
      <div className="ambient ambientOne" />
      <div className="ambient ambientTwo" />
      <div className="profile">
        <div className="profileImageWrap">
          <img className="profileImage" src="https://ugc.production.linktr.ee/ac7d6a84-ecf8-4272-9f48-4c6c9f21d869_IMG-2626.png" alt="Quetra logosu" />
          <span className="onlineDot" />
        </div>
        <div className="profileName">Quetra<span>®</span></div>
        <div className="profileSubtitle">RESMİ HESAP · OFFICIAL ACCOUNT</div>
        <p className="profileBio">Yayınlar, oyunlar ve güzel bir topluluk.<br />Tüm bağlantılarım burada. Hoş geldin!</p>
        <div className="profileSocials" aria-label="Öne çıkan sosyal hesaplar">
          <a href="https://www.youtube.com/@quetraonline" target="_blank" rel="noreferrer" aria-label="YouTube">▶</a>
          <a href="https://www.instagram.com/quetraonline" target="_blank" rel="noreferrer" aria-label="Instagram">◎</a>
          <a href="https://www.tiktok.com/@quetraonline" target="_blank" rel="noreferrer" aria-label="TikTok">♪</a>
          <a href="https://www.twitch.tv/quetraonline" target="_blank" rel="noreferrer" aria-label="Twitch">▣</a>
        </div>
      </div>

      <div className="linksWrap">
        {groups.map((group, groupIndex) => (
          <section className="linkGroup" key={group.title}>
            <h2><span>{String(groupIndex + 1).padStart(2, "0")}</span>{group.title}</h2>
            <div className="linkList">
              {group.links.map((link) => (
                <a className={link.featured ? "linkCard featuredLink" : "linkCard"} href={link.url} target="_blank" rel="noreferrer" key={link.name}>
                  <span className="linkIcon">{link.icon}</span>
                  <span className="linkText"><strong>{link.name}</strong><small>{link.note}</small></span>
                  {link.tag && <span className="liveTag">{link.tag}</span>}
                  <span className="linkArrow">↗</span>
                </a>
              ))}
            </div>
          </section>
        ))}

        <section className="linkGroup gameGroup">
          <h2><span>06</span> OYNADIĞIM OYUNLAR</h2>
          <div className="gameLinks">
            {games.map((game) => (
              <a href={game.url} target="_blank" rel="noreferrer" className="gameCard" key={game.name}>
                <span className="gameSymbol">{game.symbol}</span>
                <span><strong>{game.name}</strong><small>{game.detail}</small></span>
                <b>↗</b>
              </a>
            ))}
          </div>
        </section>

        <section className="linkGroup emailGroup">
          <h2><span>07</span> BENİMLE İLETİŞİME GEÇ</h2>
          <div className="linkList">
            <a className="linkCard featuredLink" href="mailto:quetraonline@gmail.com?subject=QuetraOnline%20%C4%B0leti%C5%9Fim">
              <span className="linkIcon">✉</span>
              <span className="linkText"><strong>Bana Mail Gönder</strong><small>quetraonline@gmail.com</small></span>
              <span className="linkArrow">↗</span>
            </a>
          </div>
        </section>
      </div>

      <footer className="linkFooter">
        <div className="footerBrand">QUETRA<span>ONLINE</span><i>.</i></div>
        <p>OYUNDA GÖRÜŞÜRÜZ. ✦</p>
        <small>© 2026 QUETRAONLINE · TÜM HAKLARI SAKLIDIR</small>
      </footer>
    </main>
  );
}
