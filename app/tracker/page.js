"use client";

import { useCallback, useEffect, useState } from "react";
import "./tracker.css";

function todayInTurkey() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Istanbul" }).format(new Date());
}

export default function TrackerPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [day, setDay] = useState(todayInTurkey);
  const [keyword, setKeyword] = useState("");
  const [player, setPlayer] = useState("");
  const [messages, setMessages] = useState([]);
  const [stats, setStats] = useState({ total: 0, players: [], keywords: [] });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!authenticated) return;
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (day) params.set("date", day);
      if (keyword.trim()) params.set("keyword", keyword.trim());
      if (player.trim()) params.set("player", player.trim());
      const statsParams = new URLSearchParams();
      if (day) statsParams.set("date", day);
      const [messageResponse, statsResponse] = await Promise.all([
        fetch("/api/tracker/messages?" + params.toString(), { cache: "no-store" }),
        fetch("/api/tracker/stats?" + statsParams.toString(), { cache: "no-store" })
      ]);
      if (messageResponse.status === 401 || statsResponse.status === 401) {
        setAuthenticated(false);
        return;
      }
      const messageData = await messageResponse.json();
      const statsData = await statsResponse.json();
      if (!messageResponse.ok) throw new Error(messageData.error || "Mesajlar yüklenemedi.");
      if (!statsResponse.ok) throw new Error(statsData.error || "İstatistikler yüklenemedi.");
      setMessages(messageData.items || []);
      setStats(statsData);
    } catch (e) {
      setError(e.message || "Veriler yüklenirken hata oluştu.");
    } finally {
      setLoading(false);
    }
  }, [authenticated, day, keyword, player]);

  useEffect(() => {
    let active = true;
    fetch("/api/tracker/session", { cache: "no-store" }).then(r => r.json()).then(data => {
      if (active) setAuthenticated(Boolean(data.authenticated));
    }).catch(() => {}).finally(() => { if (active) setChecking(false); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!authenticated) return;
    load();
    const timer = setInterval(load, 30000);
    return () => clearInterval(timer);
  }, [authenticated, load]);

  async function login(event) {
    event.preventDefault();
    setLoginError("");
    const response = await fetch("/api/tracker/session", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password })
    });
    const data = await response.json();
    if (!response.ok) { setLoginError(data.error || "Giriş başarısız."); return; }
    setPassword("");
    setAuthenticated(true);
  }

  async function logout() {
    await fetch("/api/tracker/session", { method: "DELETE" });
    setAuthenticated(false);
    setMessages([]);
    setStats({ total: 0, players: [], keywords: [] });
  }

  function resetFilters() {
    setKeyword("");
    setPlayer("");
  }

  if (checking) return <main className="tracker-page"><div className="tracker-loading">Panel hazırlanıyor…</div></main>;

  if (!authenticated) return (
    <main className="tracker-page tracker-auth">
      <div className="tracker-login">
        <a className="tracker-back" href="/">← QuetraOnline ana sayfa</a>
        <div className="tracker-emblem">◈</div>
        <p className="tracker-eyebrow">NOWA ONLINE WORLD</p>
        <h1>CHAT TRACKER</h1>
        <p className="tracker-muted">Günlük sohbet takibi ve oyuncu istatistikleri</p>
        <form onSubmit={login}>
          <label htmlFor="tracker-password">Panel şifresi</label>
          <input id="tracker-password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Şifrenizi girin" autoComplete="current-password" required />
          {loginError && <p className="tracker-error">{loginError}</p>}
          <button type="submit">Panele Giriş Yap</button>
        </form>
        <small>Bu panel yalnızca yetkili erişim içindir.</small>
      </div>
    </main>
  );

  const topPlayer = stats.players?.[0]?.name || "—";
  return (
    <main className="tracker-page">
      <div className="tracker-shell">
        <header className="tracker-header">
          <div>
            <a className="tracker-back" href="/">← QuetraOnline</a>
            <p className="tracker-eyebrow">NOWA ONLINE WORLD</p>
            <h1>CHAT <span>TRACKER</span></h1>
            <p className="tracker-muted">Oyun sohbetinden yakalanan kelimelerin günlük raporu</p>
          </div>
          <div className="tracker-header-actions"><span className="tracker-live"><i /> CANLI RAPOR</span><button className="tracker-logout" onClick={logout}>Çıkış</button></div>
        </header>

        <section className="tracker-stat-grid">
          <article className="tracker-stat"><span>Günlük eşleşen mesaj</span><strong>{stats.total.toLocaleString("tr-TR")}</strong><small>{day}</small></article>
          <article className="tracker-stat"><span>Takip edilen olay</span><strong>4</strong><small>Boss Stone Spawned · Elder Dragon Spawned · Elder Dragon Dead · Boss Stone Dead</small></article>
          <article className="tracker-stat"><span>En aktif oyuncu</span><strong className="tracker-player-name">{topPlayer}</strong><small>{stats.players?.[0]?.count || 0} eşleşen mesaj</small></article>
        </section>

        <section className="tracker-filters">
          <label>Tarih<input type="date" value={day} onChange={e => setDay(e.target.value)} /></label>
          <label>Olay türü<select value={keyword} onChange={e => setKeyword(e.target.value)}><option value="">Tüm olaylar</option><option value="Boss Stone Spawned">Boss Stone Spawned</option><option value="Elder Dragon Spawned">Elder Dragon Spawned</option><option value="Elder Dragon Dead">Elder Dragon Dead</option><option value="Boss Stone Dead">Boss Stone Dead</option></select></label>
          <label>Oyuncu<input value={player} onChange={e => setPlayer(e.target.value)} placeholder="Oyuncu adı" /></label>
          <div className="tracker-filter-actions"><button onClick={load}>Filtrele</button><button className="tracker-secondary" onClick={resetFilters}>Temizle</button></div>
        </section>

        {error && <div className="tracker-error tracker-error-box">{error}</div>}

        <div className="tracker-content-grid">
          <section className="tracker-panel tracker-messages">
            <div className="tracker-panel-heading"><h2>Yakalanan mesajlar</h2><span>{loading ? "Güncelleniyor…" : messages.length + " kayıt gösteriliyor"}</span></div>
            <div className="tracker-table-wrap">
              <table><thead><tr><th>Saat</th><th>Oyuncu</th><th>Mesaj</th><th>Eşleşme</th></tr></thead>
                <tbody>{messages.map(item => <tr key={item.id}>
                  <td className="tracker-time">{new Date(item.created_at).toLocaleTimeString("tr-TR", { timeZone: "Europe/Istanbul", hour: "2-digit", minute: "2-digit", second: "2-digit" })}</td>
                  <td className="tracker-player">{item.player}</td><td>{item.message}</td>
                  <td>{(item.matched_keywords || []).map(word => <span className="tracker-tag" key={word}>{word}</span>)}</td>
                </tr>)}
                {!messages.length && <tr><td colSpan="4" className="tracker-empty">{loading ? "Kayıtlar yükleniyor…" : "Bu tarihte eşleşen mesaj bulunamadı."}</td></tr>}</tbody>
              </table>
            </div>
          </section>

          <aside className="tracker-side">
            <section className="tracker-panel"><div className="tracker-panel-heading"><h2>Oyuncu sıralaması</h2><span>İlk 20</span></div>
              {stats.players?.length ? stats.players.map((item, index) => <div className="tracker-rank" key={item.name}><span><b>{String(index + 1).padStart(2, "0")}</b>{item.name}</span><strong>{item.count}</strong></div>) : <p className="tracker-empty">Henüz oyuncu kaydı yok.</p>}
            </section>
            <section className="tracker-panel"><div className="tracker-panel-heading"><h2>Kelime istatistikleri</h2></div>
              {stats.keywords?.length ? stats.keywords.map(item => <div className="tracker-rank" key={item.name}><span>{item.name}</span><strong>{item.count}</strong></div>) : <p className="tracker-empty">Henüz kelime kaydı yok.</p>}
            </section>
          </aside>
        </div>
        <footer className="tracker-footer">Veriler LDPlayer ekranından OCR ajanı ile alınır · İstanbul saat dilimi · 30 saniyede otomatik yenileme</footer>
      </div>
    </main>
  );
}
