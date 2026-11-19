"use client";

import { useCallback, useEffect, useState } from "react";

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function formatCount(value) {
  if (value === null || value === undefined || !Number.isFinite(Number(value))) return "";
  return new Intl.NumberFormat("tr-TR", { notation: "compact", maximumFractionDigits: 1 }).format(Number(value));
}

export default function TikTokDisplay() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      const response = await fetch("/api/tiktok-display", {
        cache: "no-store",
        headers: { Accept: "application/json" },
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "TikTok bilgileri alınamadı.");
      setData(payload);
      setError("");
    } catch (err) {
      setError(err.message || "TikTok içerikleri şu anda yüklenemiyor.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get("tiktok-connect");
    if (status === "error") setError("TikTok bağlantısı tamamlanamadı. Uygulama izinlerini ve Vercel ayarlarını kontrol edin.");
    else if (status === "cancelled") setError("TikTok hesap bağlantısı iptal edildi.");
    else if (status === "state-error") setError("Güvenlik doğrulaması başarısız. Bağlantıyı yeniden başlatın.");
    load();
    const interval = window.setInterval(load, 30 * 60 * 1000);
    return () => window.clearInterval(interval);
  }, [load]);

  const connected = Boolean(data?.connected);
  const videos = Array.isArray(data?.videos) ? data.videos.slice(0, 5) : [];

  return (
    <section className="tiktok-display" id="tiktok-content">
      <div className="tiktok-display-heading">
        <div>
          <span className="tiktok-display-kicker">QUETRAONLINE SOSYAL MEDYA</span>
          <h2 className="gold-heading tiktok-display-title">
            <img src="/tiktok-logo.svg?v=20261108" alt="" />
            TIKTOK İÇERİKLERİM
          </h2>
          <p>Bağlı TikTok hesabımın herkese açık son videoları.</p>
        </div>
        {connected && data.account?.profileUrl ? (
          <a className="tiktok-profile-link" href={data.account.profileUrl} target="_blank" rel="noreferrer">TikTok Profilini Gör <span>↗</span></a>
        ) : null}
      </div>

      {loading ? (
        <div className="tiktok-display-status">TikTok hesabı ve videolar yükleniyor…</div>
      ) : error ? (
        <div className="tiktok-display-status" role="status">{error}</div>
      ) : !connected ? (
        <div className="tiktok-connect-panel">
          <div className="tiktok-connect-copy">
            <strong>TikTok hesabı henüz bağlanmadı.</strong>
            <span>Hesap sahibi, TikTok üzerinden izin vererek profilini ve herkese açık videolarını QuetraOnline'da gösterebilir.</span>
          </div>
          <a className="tiktok-connect-button" href="/api/auth/tiktok">
            <img src="/tiktok-logo.svg?v=20261108" alt="" />
            TikTok ile Bağlan
          </a>
        </div>
      ) : (
        <>
          <div className="tiktok-connected-account">
            {data.account?.avatarUrl ? (
              <img className="tiktok-connected-avatar" src={data.account.avatarUrl} alt="" loading="lazy" />
            ) : (
              <span className="tiktok-connected-avatar-fallback">♪</span>
            )}
            <div className="tiktok-connected-name">
              <strong>{data.account?.displayName || "TikTok hesabı"}</strong>
              <span><i aria-hidden="true" /> TikTok hesabı bağlı</span>
            </div>
            <a className="tiktok-profile-link tiktok-profile-link-inline" href={data.account?.profileUrl || "https://www.tiktok.com/@quetraonline"} target="_blank" rel="noreferrer">Profili Aç ↗</a>
          </div>

          {!data.videoScopeGranted ? (
            <div className="tiktok-display-status">
              Profil bağlantısı başarılı. Videoları göstermek için TikTok Developer Portal'da Display API ürününün ve <code>video.list</code> izninin onaylanması, ardından hesabın yeniden yetkilendirilmesi gerekiyor.
            </div>
          ) : data.videoError ? (
            <div className="tiktok-display-status">TikTok video listesi şu anda alınamadı: {data.videoError}</div>
          ) : videos.length ? (
            <div className="tiktok-video-grid">
              {videos.map((video) => (
                <a className="tiktok-video-card" href={video.url} target="_blank" rel="noreferrer" key={video.id}>
                  <div className="tiktok-video-thumb">
                    {video.thumbnail ? <img src={video.thumbnail} alt="" loading="lazy" /> : <span>QUETRAONLINE</span>}
                    <span className="tiktok-video-open" aria-hidden="true">▶</span>
                  </div>
                  <strong>{video.title}</strong>
                  <div className="tiktok-video-meta">
                    {video.createdAt ? <span>{formatDate(video.createdAt)}</span> : null}
                    {video.viewCount !== null ? <span>◉ {formatCount(video.viewCount)}</span> : null}
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="tiktok-display-status">Bağlı TikTok hesabında şu anda görüntülenebilir herkese açık video bulunamadı.</div>
          )}
          <div className="tiktok-display-footnote">
            <span>Gösterilenler TikTok API üzerinden alınan herkese açık video bilgileridir.</span>
            <a href="/api/auth/tiktok">Hesabı yeniden bağla</a>
          </div>
        </>
      )}
    </section>
  );
}
