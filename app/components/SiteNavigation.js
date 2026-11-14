"use client";

import { useEffect, useRef, useState } from "react";

const SUPABASE_URL = "https://hfmosadynxpwkscvpard.supabase.co";
const SUPABASE_KEY = "sb_publishable_1UDqJWj6DAKrx7tfWMs2lA_nW-Ee29S";
const ADMIN_EMAIL = "quetraonline@gmail.com";

export default function SiteNavigation({ active = "home" }) {
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
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
    if (hash.includes("access_token=") && (hash.includes("type=recovery") || hash.includes("type%3Drecovery"))) {
      const params = new URLSearchParams(hash.replace(/^#/, ""));
      const accessToken = params.get("access_token");
      if (accessToken) {
        setRecoveryToken(accessToken);
        setRecoveryOpen(true);
        setLoginOpen(false);
      }
    }
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

  async function loadAdminSettings(token) {
    setPanelLoading(true);
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/quetra_site_settings?select=hero_logo_visible&id=eq.true`, {
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${token}` }, cache: "no-store",
      });
      if (response.ok) { const rows = await response.json(); setHeroVisible(rows[0]?.hero_logo_visible ?? true); }
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
          <nav
            id="site-navigation-links"
            className={`site-menu-dropdown${open ? " is-open" : ""}`}
            aria-label="Ana menü"
          >
            <a className={active === "home" ? "active" : ""} href="/" onClick={() => setOpen(false)}>Ana Sayfa</a>
            <a className={active === "contact" ? "active" : ""} href="/iletisim" onClick={() => setOpen(false)}>İletişim</a>
          </nav>
        </div>
        <div style={{ marginLeft: "auto", paddingRight: "clamp(14px,3vw,34px)", display: "flex", alignItems: "center" }}>
          {isAdmin ? (
            <button type="button" style={loginButtonStyle} onClick={() => { setError(""); setLoginOpen(true); }}>YÖNETİCİ PANELİ</button>
          ) : (
            <button type="button" style={loginButtonStyle} onClick={() => { setError(""); setLoginOpen(true); }}>GİRİŞ YAP</button>
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
              width: "min(100%,430px)", position: "relative", padding: "clamp(24px,5vw,36px)",
              border: "1px solid #655033", borderRadius: 15,
              background: "radial-gradient(ellipse at 50% 0%,#302719 0,transparent 48%),#14171d",
              color: "#eef0f3", boxShadow: "0 24px 90px #000b",
            }}
          >
            <button type="button" aria-label="Pencereyi kapat" onClick={() => setLoginOpen(false)}
              style={{ position: "absolute", top: 12, right: 14, border: 0, background: "transparent", color: "#aeb4bd", fontSize: 27, cursor: "pointer" }}>×</button>
            <div style={{ textAlign: "center", marginBottom: 25 }}>
              <img src="/quetra-logo.svg?v=20261108" alt="QuetraOnline" style={{ width: 150, maxWidth: "65%", height: 58, objectFit: "contain", margin: "0 auto 13px" }} />
              <div style={{ color: "#c9a86a", fontSize: 10, fontWeight: 900, letterSpacing: 3 }}>QUETRAONLINE</div>
              <h2 id="quetra-login-title" style={{ margin: "9px 0 5px", fontSize: 27 }}>{recoveryOpen ? "Yeni Şifre Belirle" : "Yönetici Girişi"}</h2>
              <p style={{ margin: 0, color: "#9da4af", fontSize: 13 }}>{recoveryOpen ? "QuetraOnline hesabınız için yeni şifrenizi oluşturun." : "Yönetim paneline erişmek için giriş yapın."}</p>
            </div>
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
              <div style={{ display: "grid", gap: 15 }}>
                <div style={{ padding: 17, border: "1px solid #3a414c", borderRadius: 10, background: "#0d1015" }}>
                  <div style={{ color: "#c9a86a", fontSize: 10, fontWeight: 900, letterSpacing: 1.5, marginBottom: 9 }}>ANA SAYFA GÖRÜNÜMÜ</div>
                  <strong style={{ display: "block", marginBottom: 7 }}>Büyük QuetraOnline logosu</strong>
                  <p style={{ color: "#9da4af", fontSize: 12, lineHeight: 1.5, margin: "0 0 15px" }}>Ana sayfanın üst bölümündeki büyük logonun ziyaretçilere gösterilmesini ayarlayın.</p>
                  <button type="button" disabled={busy || panelLoading} onClick={toggleHero} style={{ ...loginButtonStyle, width: "100%" }}>{panelLoading ? "YÜKLENİYOR..." : busy ? "KAYDEDİLİYOR..." : heroVisible ? "LOGOYU GİZLE" : "LOGOYU GÖSTER"}</button>
                  <div style={{ color: heroVisible ? "#9ed6a8" : "#ffb18a", fontSize: 12, textAlign: "center", marginTop: 10 }}>{heroVisible ? "Logo şu anda ziyaretçilere gösteriliyor." : "Logo şu anda ana sayfada gizli."}</div>
                </div>
                <button type="button" onClick={logout} style={{ ...loginButtonStyle, background: "transparent", color: "#d4d8df", borderColor: "#454c57" }}>GÜVENLİ ÇIKIŞ</button>
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
