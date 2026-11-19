"use client";

import { useCallback, useEffect, useState } from "react";

const CACHE_KEY = "quetraonline-youtube-streams-v1";

export default function YouTubeReplays() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

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
      try {
        window.localStorage.setItem(CACHE_KEY, JSON.stringify({
          savedAt: Date.now(),
          videos: nextVideos,
        }));
      } catch {}
    } catch (error) {
      console.error("YouTube yayın listesi yenilenemedi:", error);
      // Geçici YouTube/Vercel hatalarında daha önce yüklenen yayınları silme.
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
          <div className="youtube-replays-grid">
            {videos.map((video) => (
              <a className="youtube-replay-card" href={video.url} target="_blank" rel="noreferrer" key={video.id}>
                <div className="youtube-replay-thumb">
                  <img src={video.thumbnail} alt="" loading="lazy" />
                </div>
                <strong>{video.title}</strong>
                {(video.published || video.meta || video.viewCount) ? (
                  <div className="youtube-replay-meta">
                    <span className="youtube-replay-avatar-wrap">
                      <img
                        className="youtube-replay-avatar"
                        src="https://hfmosadynxpwkscvpard.supabase.co/storage/v1/object/public/publisher-avatars/publishers/f18d4762-9947-4cb0-b9dd-92c51a744fe0.png"
                        alt="Quetra TikTok profil fotoğrafı"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    </span>
                    <span className="youtube-replay-meta-info">
                      {(video.published || video.meta) ? (
                        <span className="youtube-replay-meta-item">
                          <svg viewBox="0 0 16 16" aria-hidden="true"><rect x="2.25" y="3.5" width="11.5" height="10" rx="1.5" /><path d="M5 2v3M11 2v3M2.5 6.5h11" /></svg>
                          <span>{video.published || video.meta}</span>
                        </span>
                      ) : null}
                      {video.viewCount ? (
                        <span className="youtube-replay-meta-item">
                          <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M1.5 8s2.3-4 6.5-4 6.5 4 6.5 4-2.3 4-6.5 4-6.5-4-6.5-4Z" /><circle cx="8" cy="8" r="1.8" /></svg>
                          <span>{video.viewCount} görüntülenme</span>
                        </span>
                      ) : null}
                    </span>
                  </div>
                ) : null}
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
