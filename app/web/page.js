"use client";
import { useState } from "react";
import "./web.css";

export default function BrowserGamePage() {
  const [fullscreen, setFullscreen] = useState(false);
  async function toggleFullscreen() {
    try {
      if (!document.fullscreenElement) { await document.documentElement.requestFullscreen(); setFullscreen(true); }
      else { await document.exitFullscreen(); setFullscreen(false); }
    } catch { setFullscreen(Boolean(document.fullscreenElement)); }
  }
  return (
    <main className="cross-page">
      <div className="cross-backdrop" aria-hidden="true"><div className="cross-moon"/><div className="cross-mountains cross-mountains-back"/><div className="cross-mountains cross-mountains-front"/></div>
      <div className="cross-shell">
        <header className="cross-header">
          <a className="cross-home" href="/" aria-label="Quetra Online World ana sayfa"><span className="cross-home-mark">Q</span><span><b>QUETRA</b><small>ONLINE WORLD</small></span></a>
          <div className="cross-header-right"><span>BROWSER GAME</span><i/><span>PC · MOBİL · TARAYICI</span></div>
        </header>
        <section className="cross-main">
          <div className="cross-brand-area">
            <div className="cross-brand-frame"><span className="cross-corner tl"/><span className="cross-corner tr"/><span className="cross-corner bl"/><span className="cross-corner br"/>
              <img className="cross-original-logo" src="https://www.crossmyko.com/kapi/marka/crossmyko_logo_alt.png" alt="CrossMYKO"/>
            </div>
            <p className="cross-tagline">KARUS İLE EL MORAD'IN SAVAŞI SENİ BEKLİYOR</p><div className="cross-ornament"><i/>✦<i/></div>
          </div>
          <div className="cross-panel">
            <div className="cross-panel-heading"><span>✧</span><b>SUNUCU DURUMU</b><i/><small><em/> BİLGİ</small></div>
            <div className="cross-maintenance">
              <div className="cross-maintenance-icon"><span>⚔</span></div>
              <div className="cross-maintenance-copy"><small>OYUN SUNUCUSU</small><h1>Bakım çalışması</h1><p>Size daha iyi bir hizmet verebilmek için şu anda bakım modundayız.</p><p>Bakım bitince bu sayfa kendiliğinden oyuna döner.</p></div>
              <div className="cross-maintenance-state"><i/>BAKIMDA</div>
            </div>
            <div className="cross-actions">
              <a className="cross-action primary" href="https://panel.crossmyko.com/kayit" target="_blank" rel="noreferrer"><span className="symbol">＋</span><span><b>KAYIT OL</b><small>ÜCRETSİZ HESAP OLUŞTUR</small></span><strong>›</strong></a>
              <a className="cross-action secondary" href="https://panel.crossmyko.com/" target="_blank" rel="noreferrer"><span className="symbol">↗</span><span><b>KO PANEL</b><small>HESABINI YÖNET</small></span><strong>›</strong></a>
            </div>
            <div className="cross-panel-bottom"><span><i/>DURUM BİLGİSİ</span><button onClick={() => window.location.reload()}><b>⟳</b> YENİDEN DENE</button><button onClick={toggleFullscreen}><b>⛶</b> {fullscreen ? "TAM EKRANDAN ÇIK" : "TAM EKRAN"}</button></div>
          </div>
          <footer className="cross-footer"><nav><a href="https://panel.crossmyko.com/">PANEL</a><i>✦</i><a href="https://panel.crossmyko.com/sss">YARDIM</a><i>✦</i><a href="https://panel.crossmyko.com/rehber">OYUN REHBERİ</a></nav><small>© {new Date().getFullYear()} QUETRA ONLINE WORLD</small></footer>
        </section>
      </div>
    </main>
  );
}
