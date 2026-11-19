"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

const CACHE_KEY = "quetraonline-platform-replays-v2";
const PLATFORM_LINKS = {
  all: "https://www.youtube.com/@quetraonline/streams",
  youtube: "https://www.youtube.com/@quetraonline/streams",
  twitch: "https://www.twitch.tv/quetraonline/videos",
  kick: "https://kick.com/quetraonline/videos",
};
const TABS = [
  { id: "all", label: "Tümü" },
  { id: "youtube", label: "YouTube", logo: "/youtube-logo.svg?v=20261108" },
  { id: "twitch", label: "Twitch", logo: "/twitch-logo.svg?v=20261108" },
  { id: "kick", label: "Kick", logo: "/kick-logo.svg?v=20261108" },
];

function sortNewest(items) {
  return [...items].sort((a, b) => {
    const aTime = Number(a.publishedAt) || Date.parse(a.published || "") || 0;
    const bTime = Number(b.publishedAt) || Date.parse(b.published || "") || 0;
    return bTime - aTime;
  });
}

export default function YouTubeReplays() {
  const [activeTab, setActiveTab] = useState("all");
  const [platformVideos, setPlatformVideos] = useState({ youtube: [], twitch: [], kick: [] });
  const [loading, setLoading] = useState(true);

  const loadVideos = useCallback(async () => {
    try {
      const [youtubeResponse, platformResponse] = await Promise.all([
        fetch("/api/youtube-streams", { cache: "no-store", headers: { Accept: "application/json" } }),
        fetch("/api/platform-replays", { cache: "no-store", headers: { Accept: "application/json" } }),
      ]);
      const [youtubeData, platformData] = await Promise.all([
        youtubeResponse.json(),
        platformResponse.json(),
      ]);
      if (!youtubeResponse.ok) throw new Error(youtubeData.error || "YouTube yayınları alınamadı");
      const next = {
        youtube: Array.isArray(youtubeData.videos) ? youtubeData.videos.slice(0, 5).map((video) => ({ ...video, platform: "youtube" })) : [],
        twitch: Array.isArray(platformData.twitch) ? platformData.twitch.slice(0, 5) : [],
        kick: Array.isArray(platformData.kick) ? platformData.kick.slice(0, 5) : [],
      };
      setPlatformVideos(next);
      try {
        window.localStorage.setItem(CACHE_KEY, JSON.stringify({ savedAt: Date.now(), videos: next }));
      } catch {}
    } catch (error) {
      console.error("Canlı yayın geçmişleri yenilenemedi:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    try {
      const cached = JSON.parse(window.localStorage.getItem(CACHE_KEY) || "null");
      if (cached?.videos && ["youtube", "twitch", "kick"].every((key) => Array.isArray(cached.videos[key]))) {
        setPlatformVideos(cached.videos);
        setLoading(false);
      }
    } catch {}
    loadVideos();
    const interval = window.setInterval(loadVideos, 30 * 60 * 1000);
    return () => window.clearInterval(interval);
  }, [loadVideos]);

  const visibleVideos = useMemo(() => {
    if (activeTab === "all") {
      return sortNewest([...platformVideos.youtube, ...platformVideos.twitch, ...platformVideos.kick]).slice(0, 5);
    }
    return sortNewest(platformVideos[activeTab] || []).slice(0, 5);
  }, [activeTab, platformVideos]);

  const tabLabel = activeTab === "all" ? "TÜM PLATFORMLAR" : activeTab.toUpperCase();
  const allLoaded = Object.values(platformVideos).some((items) => items.length > 0);

  return (
    <section className="youtube-replays" id="youtube-replays">
      <div className="youtube-replays-heading">
        <div className="youtube-replays-heading-copy">
          <span className="youtube-kicker">QUETRAONLINE CANLI YAYIN ARŞİVİ</span>
          <h2 className="gold-heading youtube-replays-title">
            {activeTab === "all" ? "SON 5 CANLI YAYINIM" : activeTab === "youtube" ? "YOUTUBE SON 5 CANLI YAYINIM" : activeTab === "twitch" ? "TWITCH SON 5 CANLI YAYINIM" : "KICK SON 5 CANLI YAYINIM"}
          </h2>
          <p>{activeTab === "all" ? "YouTube, Twitch ve Kick kanallarındaki en yeni canlı yayın kayıtları." : tabLabel + " kanalındaki en yeni canlı yayın kayıtları."}</p>
        </div>
        <a className="youtube-all-link" href={PLATFORM_LINKS[activeTab]} target="_blank" rel="noreferrer">
          Tüm Yayınları Gör <span>↗</span>
        </a>
      </div>

      <div className="replay-tabs" role="tablist" aria-label="Canlı yayın platformu seç">
        {TABS.map((tab) => (
          <button
            className={"replay-tab" + (activeTab === tab.id ? " active" : "")}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.id === "all" ? (
              <span className="replay-tab-all-logos" aria-hidden="true">
                <img src="/youtube-logo.svg?v=20261108" alt="" />
                <img src="/twitch-logo.svg?v=20261108" alt="" />
                <img src="/kick-logo.svg?v=20261108" alt="" />
              </span>
            ) : <img className="replay-tab-logo" src={tab.logo} alt="" />}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="youtube-replays-status">Son canlı yayınlar yükleniyor…</div>
      ) : visibleVideos.length ? (
        <div className="youtube-replays-grid">
          {visibleVideos.map((video) => (
            <a className={"youtube-replay-card replay-card-" + (video.platform || activeTab)} href={video.url} target="_blank" rel="noreferrer" key={video.id}>
              <div className="youtube-replay-thumb">
                {video.thumbnail ? <img src={video.thumbnail} alt="" loading="lazy" /> : <div className="replay-thumb-fallback">CANLI YAYIN KAYDI</div>}
                <span className={"replay-platform-badge replay-badge-" + (video.platform || activeTab)}>
                  {video.platform === "youtube" ? <img src="/youtube-logo.svg?v=20261108" alt="YouTube" /> : video.platform === "twitch" ? <img src="/twitch-logo.svg?v=20261108" alt="Twitch" /> : <img src="/kick-logo.svg?v=20261108" alt="Kick" />}
                </span>
              </div>
              <strong>{video.title}</strong>
              {(video.published || video.viewCount) ? (
                <div className="youtube-replay-meta">
                  {video.published ? <span className="youtube-replay-meta-item"><svg viewBox="0 0 16 16" aria-hidden="true"><rect x="2.25" y="3.5" width="11.5" height="10" rx="1.5" /><path d="M5 2v3M11 2v3M2.5 6.5h11" /></svg><span>{video.published}</span></span> : null}
                  {video.viewCount ? <span className="youtube-replay-meta-item"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M1.5 8s2.3-4 6.5-4 6.5 4 6.5 4-2.3 4-6.5 4-6.5-4-6.5-4Z" /><circle cx="8" cy="8" r="1.8" /></svg><span>{video.viewCount}</span></span> : null}
                </div>
              ) : null}
            </a>
          ))}
        </div>
      ) : (
        <div className="youtube-replays-status">
          {activeTab === "all" && !allLoaded ? "Yayın kayıtları şu anda alınamadı." : activeTab === "twitch" ? "Twitch yayın geçmişi şu anda alınamıyor." : activeTab === "kick" ? "Kick yayın geçmişi şu anda alınamıyor." : "Bu platformda henüz yayın kaydı bulunamadı."}
          {" "}<a href={PLATFORM_LINKS[activeTab]} target="_blank" rel="noreferrer">Platform arşivini aç ↗</a>
        </div>
      )}
    </section>
  );
}
