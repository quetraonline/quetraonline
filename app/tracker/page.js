"use client";

import { useCallback, useEffect, useState } from "react";
import "./tracker.css";

function todayInTurkey() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Istanbul" }).format(new Date());
}

function formatTurkeyDateTime(value) {
  if (!value) return "—";
  return new Date(value).toLocaleString("tr-TR", {
    timeZone: "Europe/Istanbul",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}

export default function TrackerPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [day, setDay] = useState(todayInTurkey);
  const [search, setSearch] = useState("");
  const [player, setPlayer] = useState("");
  const [messages, setMessages] = useState([]);
  const [stats, setStats] = useState({ total: 0, active_players: 0, players: [], last_message_at: null });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!authenticated) return;
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (day) params.set("date", day);
      if (search.trim()) params.set("search", search.trim());
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
      if (!messageResponse.ok) throw new Error(messageData.error || "Sohbet kayıtları yüklenemedi.");
      if (!statsResponse.ok) throw new Error(statsData.error || "İstatistikler yüklenemedi.");
      setMessages(messageData.items || []);
      setStats(statsData);
    } catch (e) {
      setError(e.message || "Veriler yüklenirken hata oluştu.");
    } finally {
      setLoading(false);
    }
  }, [authenticated, day, search, player]);

  useEffect(() => {
    let active = true;
    fetch("/api/tracker/session", { cache: "no-store" })
      .then(r => r.json())
      .then(data => { if (active) setAuthenticated(Boolean(data.authenticated)); })
      .catch(() => {})
      .finally(() => { if (active) setChecking(false); });
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
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password })
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
    setStats({ total: 0, active_players: 0, players: [], last_message_at: null });
  }

  function resetFilters() {
    setSearch("");
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
        <p className="tracker-muted">LDPlayer sohbet geçmişi ve oyuncu kayıtları</p>
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

  const lastMessage = stats.last_message_at ? formatTurkeyDateTime(stats.last_message_at) : "Henüz kayıt yok";

  return (
    <main className="tracker-page">
      <div className="tracker-shell">
        <header className="tracker-header">
          <div>
            <a className="tracker-back" href="/">← QuetraOnline</a>
            <p className="tracker-eyebrow">NOWA ONLINE WORLD</p>
            <h1>CHAT <span>TRACKER</span></h1>
            <p className="tracker-muted">LDPlayer sohbet alanında görünen tüm okunabilir satırların arşivi</p>
          </div>
          <div className="tracker-header-actions">
            <span className="tracker-live"><i /> CANLI RAPOR</span>
            <button className="tracker-logout" onClick={logout}>Çıkış</button>
          </div>
        </header>

        <section className="tracker-stat-grid">
          <article className="tracker-stat">
            <span>Günlük sohbet satırı</span>
            <strong>{Number(stats.total || 0).toLocaleString("tr-TR")}</strong>
            <small>{day}</small>
          </article>
          <article className="tracker-stat">
            <span>Aktif oyuncu sayısı</span>
            <strong>{Number(stats.active_players || 0).toLocaleString("tr-TR")}</strong>
            <small>Seçili tarihte yazan oyuncular</small>
          </article>
          <article className="tracker-stat">
            <span>Son kayıt zamanı</span>
            <strong className="tracker-last-time">{stats.last_message_at ? new Date(stats.last_message_at).toLocaleTimeString("tr-TR", { timeZone: "Europe/Istanbul", hour: "2-digit", minute: "2-digit", second: "2-digit" }) : "—"}</strong>
            <small>{lastMessage}</small>
          </article>
        </section>

        <section className="tracker-filters">
          <label>Tarih<input type="date" value={day} onChange={e => setDay(e.target.value)} /></label>
          <label>Mesajda ara<input value={search} onChange={e => setSearch(e.target.value)} placeholder="Sohbet metninde ara…" /></label>
          <label>Oyuncu<input value={player} onChange={e => setPlayer(e.target.value)} placeholder="Oyuncu adı" /></label>
          <div className="tracker-filter-actions">
            <button onClick={load}>Filtrele</button>
            <button className="tracker-secondary" onClick={resetFilters}>Temizle</button>
          </div>
        </section>

        {error && <div className="tracker-error tracker-error-box">{error}</div>}

        <div className="tracker-content-grid">
          <section className="tracker-panel tracker-messages">
            <div className="tracker-panel-heading">
              <h2>Tüm yakalanan sohbet satırları</h2>
              <span>{loading ? "Güncelleniyor…" : messages.length + " kayıt gösteriliyor"}</span>
            </div>
            <div className="tracker-table-wrap">
              <table>
                <thead>
                  <tr><th>Kayıt tarihi / saati</th><th>Oyun saati</th><th>Oyuncu</th><th>Sohbet mesajı</th></tr>
                </thead>
                <tbody>
                  {messages.map(item => (
                    <tr key={item.id}>
                      <td className="tracker-time">{formatTurkeyDateTime(item.created_at)}</td>
                      <td className="tracker-game-time">{item.game_time_text || "—"}</td>
                      <td className="tracker-player">{item.player || "Bilinmiyor"}</td>
                      <td className="tracker-chat-message">{item.message}</td>
                    </tr>
                  ))}
                  {!messages.length && (
                    <tr><td colSpan="4" className="tracker-empty">{loading ? "Sohbet kayıtları yükleniyor…" : "Bu tarihte sohbet satırı bulunamadı."}</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <aside className="tracker-side">
            <section className="tracker-panel">
              <div className="tracker-panel-heading"><h2>En aktif oyuncular</h2><span>İlk 20</span></div>
              {stats.players?.length ? stats.players.map((item, index) => (
                <div className="tracker-rank" key={item.name}>
                  <span><b>{String(index + 1).padStart(2, "0")}</b>{item.name}</span>
                  <strong>{item.count}</strong>
                </div>
              )) : <p className="tracker-empty">Henüz oyuncu kaydı yok.</p>}
            </section>
            <section className="tracker-panel tracker-note-panel">
              <div className="tracker-panel-heading"><h2>Kayıt bilgisi</h2></div>
              <p>Takip kelimesi şartı yoktur. Sohbet alanında okunabilen her satır kaydedilir.</p>
              <p>Kayıt tarihi ve saati sunucu tarafından tutulur. Oyun ekranında ayrıca saat görünüyorsa “Oyun saati” alanında gösterilir.</p>
              <p>Panel 30 saniyede bir otomatik yenilenir.</p>
            </section>
          </aside>
        </div>

        <footer className="tracker-footer">LDPlayer sohbet arşivi · Europe/Istanbul · 30 saniyede otomatik yenileme</footer>
      </div>
    </main>
  );
}
