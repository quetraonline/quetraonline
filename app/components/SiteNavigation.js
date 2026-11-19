"use client";

import { useEffect, useRef, useState } from "react";

const SUPABASE_URL = "https://hfmosadynxpwkscvpard.supabase.co";
const SUPABASE_KEY = "sb_publishable_1UDqJWj6DAKrx7tfWMs2lA_nW-Ee29S";
const ADMIN_EMAIL = "quetraonline@gmail.com";

export default function SiteNavigation({ active = "home" }) {
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  const [ataturkFlagVisible, setAtaturkFlagVisible] = useState(false);
  const [panelLoading, setPanelLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [recoveryOpen, setRecoveryOpen] = useState(false);
  const [recoveryToken, setRecoveryToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const menuRef = useRef(null);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes("access_token=")) {
      const params = new URLSearchParams(hash.replace(/^#/, ""));
      const accessToken = params.get("access_token");
      if (accessToken) {
        setRecoveryToken(accessToken);
        setRecoveryOpen(true);
        setLoginOpen(false);
      }
    }
    loadAtaturkFlagSetting();
    const savedToken = sessionStorage.getItem("quetra_admin_token");
    setIsAdmin(Boolean(savedToken));
    if (savedToken) loadAdminSettings(savedToken);
    function handlePointerDown(event) {
      if (!menuRef.current?.contains(event.target)) setOpen(false);
    }
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setOpen(false);
        setLoginOpen(false);
      }
    }
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  async function loadAtaturkFlagSetting() {
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/quetra_site_settings?select=ataturk_flag_visible&id=eq.true`, {
        headers: { apikey: SUPABASE_KEY }, cache: "no-store",
      });
      if (response.ok) {
        const rows = await response.json();
        setAtaturkFlagVisible(rows[0]?.ataturk_flag_visible ?? true);
      }
    } catch {}
  }

  async function loadAdminSettings(token) {
    setPanelLoading(true);
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/quetra_site_settings?select=hero_logo_visible,ataturk_flag_visible&id=eq.true`, {
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${token}` }, cache: "no-store",
      });
      if (response.ok) {
        const rows = await response.json();
        setHeroVisible(rows[0]?.hero_logo_visible ?? true);
        setAtaturkFlagVisible(rows[0]?.ataturk_flag_visible ?? true);
      }
    } finally { setPanelLoading(false); }
  }

  async function toggleHero() {
    const token = sessionStorage.getItem("quetra_admin_token");
    if (!token) { setIsAdmin(false); setError("Oturumunuz sona ermiş. Yeniden giriş yapın."); return; }
    setBusy(true); setError("");
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/quetra_site_settings?id=eq.true`, {
        method: "PATCH", headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${token}`, "Content-Type": "application/json", Prefer: "return=representation" },
        body: JSON.stringify({ hero_logo_visible: !heroVisible, updated_at: new Date().toISOString() }),
      });
      if (!response.ok) throw new Error("Ayar kaydedilemedi. Tekrar giriş yapmayı deneyin.");
      setHeroVisible(!heroVisible);
    } catch (err) { setError(err.message || "Ayar kaydedilemedi."); }
    finally { setBusy(false); }
  }

  async function toggleAtaturkFlag() {
    const token = sessionStorage.getItem("quetra_admin_token");
    if (!token) { setIsAdmin(false); setError("Oturumunuz sona ermiş. Yeniden giriş yapın."); return; }
    setBusy(true); setError("");
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/quetra_site_settings?id=eq.true`, {
        method: "PATCH",
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${token}`, "Content-Type": "application/json", Prefer: "return=representation" },
        body: JSON.stringify({ ataturk_flag_visible: !ataturkFlagVisible, updated_at: new Date().toISOString() }),
      });
      if (!response.ok) throw new Error("Atatürk ve Bayrak ayarı kaydedilemedi. Tekrar giriş yapmayı deneyin.");
      setAtaturkFlagVisible(!ataturkFlagVisible);
    } catch (err) { setError(err.message || "Atatürk ve Bayrak ayarı kaydedilemedi."); }
    finally { setBusy(false); }
  }

  function logout() {
    sessionStorage.removeItem("quetra_admin_token");
    setIsAdmin(false); setLoginOpen(false); setError(""); setPassword("");
  }

  async function handlePasswordRecovery(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    if (newPassword.length < 8) {
      setError("Şifre en az 8 karakter olmalıdır.");
      setBusy(false);
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Şifreler birbiriyle eşleşmiyor.");
      setBusy(false);
      return;
    }
    try {
      const response = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
        method: "PUT",
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${recoveryToken}`, "Content-Type": "application/json" },
        body: JSON.stringify({ password: newPassword }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.msg || data.message || "Şifre güncellenemedi. Kurtarma bağlantısının süresi dolmuş olabilir.");
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
      setRecoveryOpen(false);
      setRecoveryToken("");
      setNewPassword("");
      setConfirmPassword("");
      setPassword("");
      setLoginOpen(true);
      setError("Şifreniz başarıyla oluşturuldu. Yeni şifrenizle giriş yapabilirsiniz.");
    } catch (err) {
      setError(err.message || "Şifre güncellenemedi.");
    } finally {
      setBusy(false);
    }
  }

  async function handleLogin(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
        method: "POST",
        headers: { apikey: SUPABASE_KEY, "Content-Type": "application/json" },
        body: JSON.stringify({ email: ADMIN_EMAIL, password }),
      });
      const data = await response.json();
      if (!response.ok || !data.access_token) {
        throw new Error(data.msg || data.message || "Giriş başarısız. E-posta davetini onaylayıp şifrenizi oluşturduğunuzdan emin olun.");
      }

      const verify = await fetch(`${SUPABASE_URL}/rest/v1/quetra_admins?select=user_id&limit=1`, {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${data.access_token}`,
        },
        cache: "no-store",
      });
      if (!verify.ok) throw new Error("Yönetici yetkisi doğrulanamadı. Lütfen tekrar deneyin.");
      const admins = await verify.json();
      if (!admins.length) throw new Error("Bu hesap yönetici olarak yetkilendirilmemiş.");

      sessionStorage.setItem("quetra_admin_token", data.access_token);
      setIsAdmin(true);
      setPassword("");
      await loadAdminSettings(data.access_token);
      setLoginOpen(true);
    } catch (err) {
      setError(err.message || "Giriş yapılamadı.");
    } finally {
      setBusy(false);
    }
  }

  const loginButtonStyle = {
    border: "1px solid #b8955c",
    borderRadius: 7,
    padding: "10px 17px",
    background: "linear-gradient(135deg,#c9a86a,#94703e)",
    color: "#111",
    fontSize: 12,
    fontWeight: 900,
    letterSpacing: 1,
    cursor: "pointer",
    whiteSpace: "nowrap",
  };

  return (
    <>
      <header className="site-header">
        <div className="site-menu" ref={menuRef}>
          <button
            className="site-menu-trigger"
            type="button"
            aria-expanded={open}
            aria-haspopup="true"
            aria-controls="site-navigation-links"
            onClick={() => setOpen((value) => !value)}
          >
            <img src="/quetra-logo.svg?v=20261108" alt="QuetraOnline menüsünü aç" />
          </button>
          {ataturkFlagVisible ? (
            <img className="site-ataturk-flag" src="/ataturkbayrak.gif?v=20261120" alt="Atatürk ve Türk Bayrağı" draggable={false} />
          ) : null}
          <nav
            id="site-navigation-links"
            className={`site-menu-dropdown${open ? " is-open" : ""}`}
            aria-label="Ana menü"
          >
            <a className={active === "home" ? "active" : ""} href="/" onClick={() => setOpen(false)}><svg className="site-menu-item-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" /></svg><span>Ana Sayfa</span></a>
            <a className={active === "contact" ? "active" : ""} href="/iletisim" onClick={() => setOpen(false)}><svg className="site-menu-item-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg><span>İletişim</span></a>
          </nav>
        </div>
        <div style={{ position: "absolute", top: "50%", right: "max(calc((100vw - 1024px)/2),20px)", transform: "translateY(-50%)", paddingRight: 0, display: "flex", alignItems: "center", zIndex: 2 }}>
          {isAdmin ? (
            <button
              type="button"
              aria-label="Yönetici Paneli"
              title="Yönetici Paneli"
              style={{ ...loginButtonStyle, width: 34, height: 34, minWidth: 34, padding: 0, display: "inline-flex", alignItems: "center", justifyContent: "center", letterSpacing: 0 }}
              onClick={() => { setError(""); setLoginOpen(true); }}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#17130c" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3 20 6v5c0 4.7-3.2 8.4-8 10-4.8-1.6-8-5.3-8-10V6l8-3Z" />
                <circle cx="12" cy="10" r="2.2" />
                <path d="M8.5 16c.8-1.6 2-2.4 3.5-2.4s2.7.8 3.5 2.4" />
              </svg>
            </button>
          ) : (
            <button
              type="button"
              aria-label="Giriş Yap"
              title="Giriş Yap"
              style={{ ...loginButtonStyle, width: 34, height: 34, minWidth: 34, padding: 0, display: "inline-flex", alignItems: "center", justifyContent: "center", letterSpacing: 0 }}
              onClick={() => { setError(""); setLoginOpen(true); }}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#17130c" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M10 17 15 12 10 7" />
                <path d="M15 12H3" />
                <path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" />
              </svg>
            </button>
          )}
        </div>
      </header>

      {(loginOpen || recoveryOpen) && (
        <div
          role="presentation"
          onMouseDown={(event) => { if (event.target === event.currentTarget && !busy) setLoginOpen(false); }}
          style={{
            position: "fixed", inset: 0, zIndex: 10000, display: "grid", placeItems: "center",
            padding: 18, background: "rgba(0,0,0,.78)", backdropFilter: "blur(7px)",
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="quetra-login-title"
            style={{
              width: "min(100%,620px)", maxHeight: "90vh", overflowY: "auto", position: "relative", padding: "clamp(20px,4vw,28px)",
              border: "1px solid #485366", borderRadius: 18,
              background: "radial-gradient(ellipse at 50% 0%,#263242 0,transparent 52%),#141b25",
              color: "#eef0f3", boxShadow: "0 24px 90px #000b",
            }}
          >
            <button type="button" aria-label="Pencereyi kapat" onClick={() => setLoginOpen(false)}
              style={{ position: "absolute", top: 12, right: 14, border: 0, background: "transparent", color: "#aeb4bd", fontSize: 27, cursor: "pointer" }}>×</button>
            {!isAdmin || recoveryOpen ? (
              <div style={{ textAlign: "center", marginBottom: 25 }}>
                <img src="/quetra-logo.svg?v=20261108" alt="QuetraOnline" style={{ width: 150, maxWidth: "65%", height: 58, objectFit: "contain", margin: "0 auto 13px" }} />
                <div style={{ color: "#c9a86a", fontSize: 10, fontWeight: 900, letterSpacing: 3 }}>QUETRAONLINE</div>
                <h2 id="quetra-login-title" style={{ margin: "9px 0 5px", fontSize: 27 }}>{recoveryOpen ? "Yeni Şifre Belirle" : "Yönetici Girişi"}</h2>
                <p style={{ margin: 0, color: "#9da4af", fontSize: 13 }}>{recoveryOpen ? "QuetraOnline hesabınız için yeni şifrenizi oluşturun." : "Yönetim paneline erişmek için giriş yapın."}</p>
              </div>
            ) : null}
            {recoveryOpen ? (
              <form onSubmit={handlePasswordRecovery} style={{ display: "grid", gap: 12 }}>
                <label htmlFor="quetra-new-password" style={{ color: "#d6d9df", fontSize: 12, fontWeight: 700 }}>Yeni şifre</label>
                <input id="quetra-new-password" type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} autoComplete="new-password" required minLength={8} placeholder="En az 8 karakter" style={{ width: "100%", boxSizing: "border-box", padding: 13, borderRadius: 8, border: "1px solid #3a414c", background: "#0d1015", color: "#eef0f3" }} />
                <label htmlFor="quetra-confirm-password" style={{ color: "#d6d9df", fontSize: 12, fontWeight: 700 }}>Yeni şifre tekrar</label>
                <input id="quetra-confirm-password" type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} autoComplete="new-password" required minLength={8} placeholder="Yeni şifrenizi tekrar girin" style={{ width: "100%", boxSizing: "border-box", padding: 13, borderRadius: 8, border: "1px solid #3a414c", background: "#0d1015", color: "#eef0f3" }} />
                {error && <p role="alert" style={{ margin: "3px 0", color: "#ff9292", fontSize: 12, lineHeight: 1.5 }}>{error}</p>}
                <button type="submit" disabled={busy} style={{ ...loginButtonStyle, marginTop: 9, padding: 14, opacity: busy ? .7 : 1 }}>{busy ? "KAYDEDİLİYOR..." : "ŞİFREYİ KAYDET"}</button>
              </form>
            ) : isAdmin ? (
              <div style={{ display: "grid", gap: 16 }}>
                <div style={{ padding: "0 42px 14px 0", borderBottom: "1px solid #303b4a" }}>
                  <h2 id="quetra-login-title" style={{ margin: 0, fontSize: 20, letterSpacing: .2, fontWeight: 900 }}>YÖNETİM PANELİ</h2>
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ padding: "8px 12px", borderRadius: 7, border: "1px solid #d1a957", background: "linear-gradient(135deg,#d9b66b,#a47b3e)", color: "#17130c", fontSize: 11, fontWeight: 900 }}>SİTE AYARLARI</span>
                  <button type="button" onClick={logout} style={{ marginLeft: "auto", padding: "8px 12px", borderRadius: 7, border: "1px solid #465365", background: "#1a2330", color: "#e6e9ee", fontSize: 11, fontWeight: 800, cursor: "pointer" }}>ÇIKIŞ YAP</button>
                </div>
                <div style={{ height: 1, width: "100%", background: "#303b4a", marginTop: -2 }} />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap", padding: "14px 0 2px" }}>
                  <span style={{ color: heroVisible ? "#a8d6a1" : "#f0b17d", fontSize: 12, fontWeight: 800 }}>{heroVisible ? "● LOGO AKTİF" : "● LOGO GİZLİ"}</span>
                  <button type="button" disabled={busy || panelLoading} onClick={toggleHero} style={{ ...loginButtonStyle, padding: "9px 14px", opacity: busy || panelLoading ? .65 : 1 }}>{panelLoading ? "YÜKLENİYOR..." : busy ? "KAYDEDİLİYOR..." : heroVisible ? "LOGOYU GİZLE" : "LOGOYU GÖSTER"}</button>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap", padding: "14px 0 2px", borderTop: "1px solid #303b4a" }}>
                  <div style={{ display: "grid", gap: 4 }}>
                    <span style={{ color: "#eef0f3", fontSize: 12, fontWeight: 800 }}>Atatürk ve Bayrak</span>
                    <span style={{ color: ataturkFlagVisible ? "#a8d6a1" : "#f0b17d", fontSize: 10, fontWeight: 800 }}>{ataturkFlagVisible ? "AÇIK" : "KAPALI"}</span>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-label="Atatürk ve Bayrak"
                    aria-checked={ataturkFlagVisible}
                    disabled={busy || panelLoading}
                    onClick={toggleAtaturkFlag}
                    style={{ width: 48, height: 27, padding: 3, display: "inline-flex", alignItems: "center", justifyContent: ataturkFlagVisible ? "flex-end" : "flex-start", border: "1px solid #7d6846", borderRadius: 999, background: ataturkFlagVisible ? "linear-gradient(135deg,#d9b66b,#a47b3e)" : "#303946", cursor: busy || panelLoading ? "wait" : "pointer", opacity: busy || panelLoading ? .65 : 1, transition: "background .18s" }}
                  >
                    <span style={{ display: "block", width: 19, height: 19, borderRadius: "50%", background: "#fff", boxShadow: "0 1px 4px #0006" }} />
                  </button>
                </div>

                {error && <p role="alert" style={{ margin: 0, color: "#ff9292", fontSize: 12 }}>{error}</p>}
              </div>
            ) : (
            <form onSubmit={handleLogin} style={{ display: "grid", gap: 12 }}>
              <label htmlFor="quetra-admin-email" style={{ color: "#d6d9df", fontSize: 12, fontWeight: 700 }}>E-posta adresi</label>
              <input id="quetra-admin-email" type="email" value={ADMIN_EMAIL} readOnly
                style={{ width: "100%", boxSizing: "border-box", padding: 13, borderRadius: 8, border: "1px solid #3a414c", background: "#0d1015", color: "#cbd0d8" }} />
              <label htmlFor="quetra-admin-password" style={{ color: "#d6d9df", fontSize: 12, fontWeight: 700, marginTop: 4 }}>Şifre</label>
              <input id="quetra-admin-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password" required placeholder="Şifrenizi girin"
                style={{ width: "100%", boxSizing: "border-box", padding: 13, borderRadius: 8, border: "1px solid #3a414c", background: "#0d1015", color: "#eef0f3" }} />
              {error && <p role="alert" style={{ margin: "3px 0", color: "#ff9292", fontSize: 12, lineHeight: 1.5 }}>{error}</p>}
              <button type="submit" disabled={busy} style={{ ...loginButtonStyle, marginTop: 9, padding: 14, opacity: busy ? .7 : 1 }}>
                {busy ? "GİRİŞ YAPILIYOR..." : "GİRİŞ YAP"}
              </button>
            </form>
            )}
          </section>
        </div>
      )}
    </>
  );
}
