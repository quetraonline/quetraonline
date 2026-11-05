"use client";

const streams = [
  { label: "TikTok LIVE", handle: "@quetraonline", href: "https://www.tiktok.com/@quetraonline", icon: "♪", tone: "tiktok", action: "YAYINA KATIL" },
  { label: "YouTube", handle: "/quetraonline", href: "https://www.youtube.com/@quetraonline", icon: "▶", tone: "youtube", action: "KANALI ZİYARET ET" },
  { label: "Kick", handle: "/quetraonline", href: "https://kick.com/quetraonline", icon: "K", tone: "kick", action: "CANLI YAYINI İZLE" },
  { label: "Twitch", handle: "/quetraonline", href: "https://www.twitch.tv/quetraonline", icon: "▣", tone: "twitch", action: "CANLI YAYINI İZLE" }
];

const socials = [
  { label: "Instagram", handle: "/quetraonline", href: "https://www.instagram.com/quetraonline", icon: "◎" },
  { label: "X (Twitter)", handle: "/quetraonline", href: "https://x.com/quetraonline", icon: "𝕏" },
  { label: "Facebook", handle: "/quetraonline", href: "https://www.facebook.com/quetraonline", icon: "f" },
  { label: "Threads", handle: "/quetraonline", href: "https://www.threads.com/@quetraonline", icon: "@" },
  { label: "Telegram", handle: "QuetraOnline", href: "https://t.me/quetraonline", icon: "➤" },
  { label: "Discord", handle: "Topluluğa katıl", href: "https://discord.com/", icon: "◉" }
];

export default function Home() {
  return (
    <main className="photoSite">
      <header className="photoNav">
        <a className="photoLogo" href="/">✦ QuetraOnline</a>
        <nav>
          <a href="#anasayfa">Ana Sayfa</a><a href="#yayinda">Canlı Yayınlar</a><a href="#sosyal">Sosyal Medya</a><a href="#destek">Destek</a><a href="#iletisim">İletişim</a>
        </nav>
      </header>

      <section className="photoHero" id="anasayfa">
        <div className="heroShade" />
        <div className="heroWords">
          <span className="goldEyebrow">NOWA ONLINE WORLD • OYUNDA GÖRÜŞÜRÜZ</span>
          <h1>QUETRA<span>ONLINE</span></h1>
          <h2>MACERA BURADA BAŞLIYOR.</h2>
          <p>Canlı yayınlar, oyun dünyası ve aynı tutkuyu paylaşan güçlü bir topluluk.</p>
          <div className="heroActions"><a href="#yayinda" className="goldButton">CANLI YAYINLAR <b>↗</b></a><a href="#sosyal" className="ghostButton">TOPLULUĞA KATIL</a></div>
        </div>
        <div className="heroFoot"><span>✦ RESMİ TOPLULUK SAYFASI</span><span>KNIGHT ONLINE • NOWA ONLINE WORLD</span></div>
      </section>

      <div className="photoContent">
        <section className="photoSection" id="yayinda">
          <div className="photoSectionHead"><div><span>CANLI YAYIN</span><h2>Yayın kanallarım</h2></div><i /></div>
          <div className="photoStreamGrid">
            {streams.map((s) => <a className={`photoStream ${s.tone}`} href={s.href} target="_blank" rel="noreferrer" key={s.label}>
              <span className="photoStreamIcon">{s.icon}</span><span className="photoStreamText"><strong>{s.label}</strong><small>{s.handle}</small></span><b>{s.action} ↗</b>
            </a>)}
          </div>
        </section>

        <section className="photoSection" id="sosyal">
          <div className="photoSectionHead"><div><span>BİZİ TAKİP ET</span><h2>Sosyal medya hesaplarımız</h2></div><i /></div>
          <div className="photoSocialGrid">
            {socials.map((s) => <a href={s.href} target="_blank" rel="noreferrer" className="photoSocial" key={s.label}><span>{s.icon}</span><div><strong>{s.label}</strong><small>{s.handle}</small></div><b>↗</b></a>)}
          </div>
        </section>

        <section className="photoSupportGrid" id="destek">
          <a className="donatePhoto klas" href="https://www.klasgame.com/yayincilar/quetraonline" target="_blank" rel="noreferrer"><div><span>TOPLULUĞUMUZUN DESTEĞİ</span><h2>KLAS<span>GAME</span></h2><p>Yayınlarıma destek olmak için KlasGame üzerinden bağış yapabilirsiniz.</p><b>DESTEK OL ↗</b></div></a>
          <a className="donatePhoto byno" href="https://donate.bynogame.com/quetraonline" target="_blank" rel="noreferrer"><div><span>HER DESTEK DEĞERLİ</span><h2>ByNoGame</h2><p>Desteğin, daha güzel yayınlar ve içerikler üretmem için güç veriyor.</p><b>DESTEK OL ↗</b></div></a>
        </section>

        <section className="gamePhoto" id="oyunlar">
          <div className="gamePhotoCopy"><span>MACERA DEVAM EDİYOR</span><h2>NOWA<br/>ONLINE WORLD</h2><p>Birlikte savaştığımız, birlikte kazandığımız dünya.</p><a href="https://www.nowaonlineworld.com/" target="_blank" rel="noreferrer">RESMİ SİTE <b>↗</b></a></div>
          <div className="gamePhotoSide"><span>OYUN BAĞLANTILARI</span><a href="https://www.nowaonlineworld.com/" target="_blank" rel="noreferrer">⚔ Nowa Online World <b>↗</b></a><a href="https://www.nowaonlineworld.com/chaos-zone-user-ranking" target="_blank" rel="noreferrer">🏆 Chaos Zone Sıralaması <b>↗</b></a></div>
        </section>

        <section className="photoContact" id="iletisim"><span>İŞ BİRLİKLERİ VE SORULARIN İÇİN</span><a href="mailto:quetraonline@gmail.com?subject=QuetraOnline%20%C4%B0leti%C5%9Fim">✉ <strong>Bana mail gönder</strong><small>quetraonline@gmail.com</small></a></section>
      </div>
      <footer className="photoFooter"><a href="/">✦ QuetraOnline</a><span>OYUNDA GÖRÜŞÜRÜZ. ✦</span><small>© 2026 QUETRAONLINE</small></footer>
    </main>
  );
}
