"use client";

import { useCallback, useEffect, useState } from "react";

const CACHE_KEY = "quetraonline-youtube-streams-v1";

export default function YouTubeReplays() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshError, setRefreshError] = useState(false);

  const loadVideos = useCallback(async (showLoader = false) => {
    if (showLoader && videos.length === 0) setLoading(true);
    try {
      const response = await fetch("/api/youtube-streams", {
        cache: "no-store",
        headers: { Accept: "application/json" },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Yayınlar alınamadı");
      const nextVideos = Array.isArray(data.videos) ? data.videos.slice(0, 5) : [];
      if (!nextVideos.length) throw new Error("YouTube yayın listesi boş döndü");

      setVideos(nextVideos);
      setRefreshError(false);
      try {
        window.localStorage.setItem(CACHE_KEY, JSON.stringify({
          savedAt: Date.now(),
          videos: nextVideos,
        }));
      } catch {}
    } catch (error) {
      console.error("YouTube yayın listesi yenilenemedi:", error);
      // Geçici YouTube/Vercel hatalarında daha önce yüklenen yayınları silme.
      setRefreshError(true);
    } finally {
      setLoading(false);
    }
  }, [videos.length]);

  useEffect(() => {
    try {
      const cached = JSON.parse(window.localStorage.getItem(CACHE_KEY) || "null");
      if (Array.isArray(cached?.videos) && cached.videos.length) {
        setVideos(cached.videos.slice(0, 5));
        setLoading(false);
      }
    } catch {}
    loadVideos(false);
    const interval = window.setInterval(() => loadVideos(false), 30 * 60 * 1000);
    return () => window.clearInterval(interval);
  }, [loadVideos]);

  return (
    <section className="youtube-replays" id="youtube-replays">
      <div className="youtube-replays-heading">
        <div>
          <span className="youtube-kicker">QUETRAONLINE YOUTUBE</span>
          <h2 className="gold-heading youtube-replays-title">
            <img className="youtube-section-logo" src="/youtube-logo.svg?v=20261108" alt="YouTube" />
            <span className="youtube-title-desktop">YOUTUBE SON 5 CANLI YAYINIM</span>
            <span className="youtube-title-mobile">YOUTUBE SON 4 CANLI YAYINIM</span>
          </h2>
          <p><span className="youtube-copy-desktop">YouTube kanalındaki en yeni 5 canlı yayın kaydı.</span><span className="youtube-copy-mobile">YouTube kanalındaki en yeni 4 canlı yayın kaydı.</span></p>
        </div>
        <a className="youtube-all-link" href="https://www.youtube.com/@quetraonline/streams" target="_blank" rel="noreferrer">
          Tüm Yayınları Gör <span>↗</span>
        </a>
      </div>

      {loading ? (
        <div className="youtube-replays-status">Son canlı yayınlar yükleniyor…</div>
      ) : videos.length ? (
        <>
          {refreshError ? <div className="youtube-replays-status">Yayınlar geçici olarak yenilenemedi; son başarılı kayıtlar gösteriliyor.</div> : null}
          <div className="youtube-replays-grid">
            {videos.map((video) => (
              <a className="youtube-replay-card" href={video.url} target="_blank" rel="noreferrer" key={video.id}>
                <div className="youtube-replay-thumb">
                  <img src={video.thumbnail} alt="" loading="lazy" />
                </div>
                <strong>{video.title}</strong>
                {video.meta ? <small>{video.meta}</small> : null}
              </a>
            ))}
          </div>
        </>
      ) : (
        <div className="youtube-replays-status">
          Yayın kayıtları şu anda alınamadı. <a href="https://www.youtube.com/@quetraonline/streams" target="_blank" rel="noreferrer">YouTube yayın arşivini aç ↗</a>
        </div>
      )}
    </section>
  );
}
