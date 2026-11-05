"use client";

import { useMemo, useState } from "react";

const platforms = [
  { number: "01", name: "YouTube", detail: "Videolar · yayın arşivi", href: "https://youtube.com/quetraonline", symbol: "▶" },
  { number: "02", name: "TikTok LIVE", detail: "Canlı yayın · kısa içerikler", href: "https://www.tiktok.com/@quetraonline", symbol: "♪" },
  { number: "03", name: "Twitch", detail: "Canlı yayın kanalı", href: "https://www.twitch.tv/quetraonline", symbol: "▣" },
  { number: "04", name: "Kick", detail: "Canlı yayın kanalı", href: "https://kick.com/quetraonline", symbol: "K" }
];

const videos = [
  { tag: "KNIGHT ONLINE", title: "Chaos Zone'da mücadele", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=85", href: "https://youtube.com/quetraonline" },
  { tag: "NOWA ONLINE WORLD", title: "Boss avı ve ekip savaşları", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1000&q=85", href: "https://youtube.com/quetraonline" },
  { tag: "HIGHLIGHTS", title: "Yayınlardan unutulmaz anlar", image: "https://images.unsplash.com/photo-1547394765-185e1e68f34e?auto=format&fit=crop&w=1000&q=85", href: "https://youtube.com/quetraonline" }
];

const guides = [
  { category: "REHBER", title: "Chaos Zone rehberi", desc: "Bölge, mücadele düzeni ve sıralama hakkında temel notlar." },
  { category: "KARAKTER", title: "Karakter sınıfları", desc: "Warrior, Rogue, Mage ve Priest sınıflarına genel bakış." },
  { category: "BOSS", title: "Boss hazırlığı", desc: "Boss karşılaşmaları öncesinde ekip ve hazırlık notları." }
];

export default function Home() {
  const [filter, setFilter] = useState("TÜMÜ");
  const [menuOpen, setMenuOpen] = useState(false);
  const filteredGuides = useMemo(() => guides.filter((item) => filter === "TÜMÜ" || item.category === filter), [filter]);

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top">QUETRA<span>ONLINE</span><i>.</i></a>
        <button className="menuButton" aria-label="Menüyü aç" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        <nav className={menuOpen ? "nav navOpen" : "nav"}>
          <a href="#about" onClick={() => setMenuOpen(false)}>Hakkımda</a>
          <a href="#channels" onClick={() => setMenuOpen(false)}>Yayınlar</a>
          <a href="#videos" onClick={() => setMenuOpen(false)}>Videolar</a>
          <a href="#world" onClick={() => setMenuOpen(false)}>Oyun dünyası</a>
        </nav>
        <a className="topCta" href="#channels">KANALLAR <span>↗</span></a>
      </header>

      <section className="hero" id="top">
        <div className="heroPhoto" />
        <div className="heroOverlay" />
        <div className="heroText">
          <div className="eyebrow"><span /> GAMER · STREAMER · COMMUNITY</div>
          <h1>OYUNUN<br /><em>RUHUNU</em><br />YAŞA.</h1>
          <p>Ben Quetra. Knight Online dünyasında macera, rekabet ve dostluk için buradayım.</p>
          <div className="heroButtons">
            <a className="buttonGold" href="#channels">YAYIN KANALLARIM <b>↗</b></a>
            <a className="buttonGhost" href="#about">BENİ TANI</a>
          </div>
        </div>
        <div className="heroFoot"><b>01</b> / CREATOR PORTFOLIO</div>
        <div className="heroSide">QUETRA ONLINE WORLD</div>
      </section>

      <div className="ticker"><div>KNIGHT ONLINE　✳　LIVE THE GAME　✳　QUETRA ONLINE　✳　KNIGHT ONLINE　✳　LIVE THE GAME　✳　</div></div>

      <section className="section intro" id="about">
        <div className="kicker">01 — HAKKIMDA</div>
        <div className="introGrid">
          <h2>SADECE<br />OYUN DEĞİL.<br /><em>BİR TOPLULUK.</em></h2>
          <div className="introCopy">
            <p className="lead">Ekranın arkasında bir oyuncu, yayında bir enerji, oyunda birlikte büyüyen bir topluluk var.</p>
            <p>QuetraOnline; yayınları, oyun içerikleri ve Nowa Online World maceralarını tek yerde buluşturur. Yayınlara katıl, videoları keşfet ve bu yolculuğun bir parçası ol.</p>
            <a className="textLink" href="https://instagram.com/quetraonline">SOSYAL HESAPLARIMA GÖZ AT <b>↗</b></a>
          </div>
        </div>
        <div className="stats"><div><b>KO</b><span>ANA OYUN</span></div><div><b>LIVE</b><span>CANLI YAYIN</span></div><div><b>ONE</b><span>TOPLULUK</span></div></div>
      </section>

      <section className="channels" id="channels">
        <div className="section">
          <div className="kicker gold">02 — YAYIN MERKEZİ</div>
          <div className="sectionHead"><h2>YAYINDA<br /><em>BULUŞALIM.</em></h2><p>Canlı yayınları kaçırma. Favori platformundan Quetra'ya katıl.</p></div>
          <div className="platformList">
            {platforms.map((platform) => <a className="platform" href={platform.href} target="_blank" rel="noreferrer" key={platform.name}>
              <span className="platformNo">{platform.number}</span><span className="platformIcon">{platform.symbol}</span>
              <span className="platformName">{platform.name}<small>{platform.detail}</small></span><span className="platformAction">KANALA GİT</span><b>↗</b>
            </a>)}
          </div>
        </div>
      </section>

      <section className="section videos" id="videos">
        <div className="kicker">03 — SON İÇERİKLER</div>
        <div className="sectionHead darkHead"><h2>SON YAYINLAR<br /><em>& VİDEOLAR.</em></h2><a className="textLink" href="https://youtube.com/quetraonline" target="_blank" rel="noreferrer">YOUTUBE KANALI <b>↗</b></a></div>
        <div className="videoGrid">
          {videos.map((video, index) => <a className="videoCard" href={video.href} target="_blank" rel="noreferrer" key={video.title}>
            <div className="videoImage" style={{ backgroundImage: "linear-gradient(0deg,rgba(0,0,0,.58),transparent 65%),url(" + video.image + ")" }}><span className="play">▶</span><b>0{index + 1}</b></div>
            <div className="videoMeta"><span>{video.tag}</span><b>↗</b></div><h3>{video.title}</h3>
          </a>)}
        </div>
      </section>

      <section className="gameWorld" id="world">
        <div className="gameBg" />
        <div className="section gameInner">
          <div className="kicker gold">04 — OYUN EVRENİ</div>
          <div className="gameTitle"><span>THE WORLD OF</span><h2>KNIGHT<br /><em>ONLINE.</em></h2><p>Macera burada başlıyor.</p></div>
          <div className="gameBottom"><div><b>NOWA ONLINE WORLD</b><p>Boss savaşları, Chaos Zone, karakter gelişimi ve oyuncu topluluğu.</p></div><a className="buttonGold" href="https://www.nowaonlineworld.com/" target="_blank" rel="noreferrer">NOWA'YI KEŞFET ↗</a></div>
        </div>
      </section>

      <section className="section guides">
        <div className="kicker">05 — OYUN NOTLARI</div>
        <div className="sectionHead darkHead"><h2>OYUN BİLGİSİ.<br /><em>TECRÜBE PAYLAŞIMI.</em></h2><span className="muted">Rehberler ve içerikler</span></div>
        <div className="filters">{["TÜMÜ", "REHBER", "KARAKTER", "BOSS"].map((item) => <button className={filter === item ? "filter active" : "filter"} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div>
        <div className="guideList">{filteredGuides.map((guide, index) => <article className="guide" key={guide.title}><span>0{index + 1}</span><div><h3>{guide.title}</h3><p>{guide.desc}</p></div><small>{guide.category}</small><b>↗</b></article>)}</div>
        <a className="ranking" href="https://www.nowaonlineworld.com/chaos-zone-user-ranking" target="_blank" rel="noreferrer"><div><span>NOWA ONLINE WORLD</span><h3>CHAOS ZONE SIRALAMASI</h3><p>Oyuncu sıralamalarını resmi sayfadan takip et.</p></div><b>SIRALAMAYI GÖR ↗</b></a>
      </section>

      <section className="social">
        <div className="section">
          <div className="kicker gold">06 — BAĞLANTIDA KAL</div>
          <h2>OYUNDA<br /><em>GÖRÜŞÜRÜZ.</em></h2>
          <p>Yeni yayınlardan ve topluluk etkinliklerinden haberdar ol.</p>
          <div className="socialRows">
            <a href="https://youtube.com/quetraonline" target="_blank" rel="noreferrer"><b>YouTube</b><span>youtube.com/quetraonline</span>↗</a>
            <a href="https://instagram.com/quetraonline" target="_blank" rel="noreferrer"><b>Instagram</b><span>@quetraonline</span>↗</a>
            <a href="https://www.tiktok.com/@quetraonline" target="_blank" rel="noreferrer"><b>TikTok</b><span>@quetraonline</span>↗</a>
          </div>
        </div>
      </section>
      <footer><a className="brand" href="#top">QUETRA<span>ONLINE</span><i>.</i></a><span>© 2026 QUETRAONLINE</span><a href="#top">YUKARI DÖN ↑</a></footer>
    </main>
  );
}
