"use client";

import { useState } from "react";

export default function BrowserGamePage() {
  const [fullscreen, setFullscreen] = useState(false);
  const [repairing, setRepairing] = useState(false);
  const [downloading, setDownloading] = useState(false);

  async function toggleFullscreen() {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setFullscreen(true);
      } else {
        await document.exitFullscreen();
        setFullscreen(false);
      }
    } catch {
      setFullscreen(Boolean(document.fullscreenElement));
    }
  }

  return (
    <main className="cross-page">
      <div className="cross-shell">
        <header className="cross-header">
          <a className="cross-brand" href="/" aria-label="Quetra Online World ana sayfa">
            <span className="cross-brand-mark">Q</span>
            <span>QUETRA<span className="cross-brand-light"> ONLINE WORLD</span></span>
          </a>
          <span className="cross-header-caption">BROWSER GAME CLIENT</span>
        </header>

        <section className="cross-stage">
          <div className="cross-stage-top">
            <span className="cross-live-dot" />
            <span>OYUN MERKEZİ</span>
            <span className="cross-stage-line" />
            <span className="cross-stage-version">WEB CLIENT</span>
          </div>

          <div className="cross-game-window">
            <div className="cross-game-art">
              <div className="cross-art-glow" />
              <div className="cross-art-content">
                <div className="cross-emblem">Q</div>
                <div className="cross-game-title">QUETRA</div>
                <div className="cross-game-subtitle">ONLINE WORLD</div>
                <div className="cross-game-rule"><span /> KNIGHT ONLINE COMMUNITY <span /></div>
              </div>
              <div className="cross-game-footer">ADVENTURE AWAITS</div>
            </div>
            <div className="cross-game-status">
              <div className="cross-server-block">
                <span className="cross-muted-label">Sunucu</span>
                <strong><i className="cross-status-dot" /> Bakım çalışması</strong>
              </div>
              <div className="cross-status-message">
                <strong>Şu anda bakımdayız</strong>
                <span>Size daha iyi bir hizmet verebilmek için şu anda bakım modundayız.</span>
                <span>Bakım bitince bu sayfa kendiliğinden oyuna döner.</span>
              </div>
            </div>
          </div>

          <div className="cross-actions">
            <a className="cross-button cross-button-primary" href="https://panel.crossmyko.com/" target="_blank" rel="noreferrer">
              <span className="cross-button-icon">＋</span> KAYIT OL
            </a>
            <a className="cross-button cross-button-secondary" href="https://panel.crossmyko.com/" target="_blank" rel="noreferrer">
              <span className="cross-button-icon">↗</span> KO PANEL
            </a>
          </div>

          <div className="cross-tools">
            <button type="button" onClick={() => { setDownloading(true); window.setTimeout(() => setDownloading(false), 1800); }}>
              <span>↓</span>{downloading ? "HAZIRLANIYOR" : "İNDİR"}
            </button>
            <button type="button" onClick={() => { setRepairing(true); window.setTimeout(() => setRepairing(false), 1800); }}>
              <span>⟳</span>{repairing ? "KONTROL EDİLİYOR" : "ONAR"}
            </button>
            <button type="button" onClick={toggleFullscreen}>
              <span>⛶</span>{fullscreen ? "TAM EKRANDAN ÇIK" : "TAM EKRAN"}
            </button>
          </div>
          <p className="cross-note">İndirme ve onarım işlemleri oyun istemcisi entegrasyonu tamamlandığında etkinleştirilecektir.</p>
        </section>

        <footer className="cross-footer">
          <a href="/">QUETRA ONLINE WORLD</a>
          <span>© {new Date().getFullYear()} QUETRA ONLINE WORLD</span>
        </footer>
      </div>

      <style jsx global>{`
        * { box-sizing: border-box; }
        body { margin: 0; background: #080b10; }
        .cross-page { min-height: 100vh; padding: 28px 22px; color: #e9edf4; background: radial-gradient(ellipse at 50% 24%, #182333 0%, #0c121b 42%, #07090d 100%); font-family: Arial, Helvetica, sans-serif; }
        .cross-shell { width: min(100%, 1080px); margin: 0 auto; }
        .cross-header { height: 66px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,.09); margin-bottom: 28px; }
        .cross-brand { display:flex; align-items:center; gap:12px; color:#f5f7fb; text-decoration:none; font-weight:900; letter-spacing:2px; font-size:17px; }
        .cross-brand-mark { display:grid; place-items:center; width:36px; height:36px; border:1px solid #c49a4a; color:#e0b65f; font-family:Georgia,serif; font-size:24px; transform:skew(-7deg); }
        .cross-brand-light { color:#aeb8c7; font-weight:500; letter-spacing:1px; }
        .cross-header-caption,.cross-stage-version { color:#8491a3; font-size:10px; letter-spacing:2px; }
        .cross-stage { border:1px solid rgba(194,157,91,.28); background:linear-gradient(145deg,rgba(23,31,43,.97),rgba(10,14,21,.98)); box-shadow:0 24px 80px rgba(0,0,0,.42); padding:20px; }
        .cross-stage-top { display:flex; align-items:center; gap:10px; color:#c9a15a; font-size:10px; font-weight:800; letter-spacing:2px; margin:0 2px 16px; }
        .cross-live-dot,.cross-status-dot { display:inline-block; width:7px; height:7px; border-radius:50%; background:#d0a85e; box-shadow:0 0 12px rgba(208,168,94,.6); }
        .cross-stage-line { height:1px; flex:1; background:rgba(255,255,255,.1); }
        .cross-game-window { border:1px solid rgba(255,255,255,.1); background:#080d15; }
        .cross-game-art { min-height:350px; position:relative; overflow:hidden; display:grid; place-items:center; background:radial-gradient(ellipse at 50% 55%,rgba(112,76,34,.35),transparent 32%),linear-gradient(115deg,rgba(7,11,17,.18),rgba(8,12,18,.9)), repeating-linear-gradient(135deg,rgba(255,255,255,.018) 0 1px,transparent 1px 5px),linear-gradient(110deg,#111c2a,#263142 48%,#101722); }
        .cross-game-art:before,.cross-game-art:after { content:""; position:absolute; width:340px; height:340px; border:1px solid rgba(203,164,91,.13); border-radius:50%; transform:scaleX(1.55); }
        .cross-game-art:after { width:450px; height:450px; }
        .cross-art-glow { position:absolute; width:260px; height:260px; background:#b17c32; opacity:.12; filter:blur(100px); }
        .cross-art-content { position:relative; z-index:1; text-align:center; }
        .cross-emblem { margin:0 auto 12px; width:64px; height:64px; display:grid; place-items:center; border:1px solid #c39a55; color:#e3bc72; font:48px Georgia,serif; text-shadow:0 0 25px #b8873d; }
        .cross-game-title { color:#f1d49a; font:900 48px Georgia,serif; letter-spacing:10px; text-shadow:0 4px 24px #000; }
        .cross-game-subtitle { margin-top:3px; color:#e5e9ef; font-size:12px; letter-spacing:8px; }
        .cross-game-rule { display:flex; align-items:center; justify-content:center; gap:12px; margin-top:24px; color:#b8a17b; font-size:9px; letter-spacing:3px; }
        .cross-game-rule span { width:38px; height:1px; background:#947447; }
        .cross-game-footer { position:absolute; bottom:18px; color:rgba(230,208,171,.48); font-size:9px; letter-spacing:4px; }
        .cross-game-status { display:flex; align-items:stretch; gap:30px; padding:22px 24px; background:linear-gradient(90deg,#111a27,#0c121b); border-top:1px solid rgba(255,255,255,.08); }
        .cross-server-block { min-width:180px; border-right:1px solid rgba(255,255,255,.1); display:flex; flex-direction:column; justify-content:center; gap:9px; }
        .cross-muted-label { color:#8290a2; font-size:11px; }
        .cross-server-block strong { display:flex; align-items:center; gap:9px; font-size:14px; color:#e2c184; }
        .cross-status-dot { background:#d2a04e; }
        .cross-status-message { display:flex; flex-direction:column; justify-content:center; gap:7px; }
        .cross-status-message strong { font-size:14px; color:#e7ebf2; }
        .cross-status-message span { color:#9ba7b7; font-size:12px; line-height:1.5; }
        .cross-actions { display:flex; gap:12px; justify-content:center; margin:22px 0 14px; }
        .cross-button { min-width:190px; height:48px; display:flex; justify-content:center; align-items:center; gap:12px; text-decoration:none; font-size:11px; font-weight:900; letter-spacing:1.7px; transition:.2s; }
        .cross-button-primary { color:#17120a; background:linear-gradient(110deg,#d8b36e,#b8873d); border:1px solid #e2c17e; }
        .cross-button-secondary { color:#e0c38b; border:1px solid rgba(204,164,94,.55); background:rgba(194,150,74,.06); }
        .cross-button:hover { filter:brightness(1.15); transform:translateY(-1px); }
        .cross-button-icon { font-size:17px; }
        .cross-tools { display:flex; justify-content:center; gap:28px; padding:17px 0 5px; border-top:1px solid rgba(255,255,255,.08); }
        .cross-tools button { border:0; background:none; color:#9da8b7; cursor:pointer; font-size:10px; letter-spacing:1.2px; display:flex; align-items:center; gap:8px; }
        .cross-tools button span { color:#d0aa68; font-size:16px; }
        .cross-tools button:hover { color:#fff; }
        .cross-note { text-align:center; color:#667386; font-size:10px; margin:12px 0 0; }
        .cross-footer { display:flex; justify-content:space-between; align-items:center; padding:22px 2px; color:#647184; font-size:9px; letter-spacing:1.4px; }
        .cross-footer a { color:#b99a65; text-decoration:none; }
        @media(max-width:650px) { .cross-page{padding:12px}.cross-header{margin-bottom:16px}.cross-header-caption{display:none}.cross-stage{padding:12px}.cross-game-art{min-height:260px}.cross-game-title{font-size:34px;letter-spacing:6px}.cross-game-status{display:block;padding:17px}.cross-server-block{border-right:0;border-bottom:1px solid rgba(255,255,255,.1);padding-bottom:14px;margin-bottom:14px}.cross-actions{flex-direction:column}.cross-button{width:100%}.cross-tools{gap:14px;flex-wrap:wrap}.cross-tools button{font-size:9px}.cross-footer{gap:12px;flex-wrap:wrap} }
      `}</style>
    </main>
  );
}
