"use client";

import { useEffect, useState } from "react";

export default function YouTubeReplays() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetch("/api/youtube-streams")
      .then((response) => response.json())
      .then((data) => {
        if (active) setVideos(Array.isArray(data.videos) ? data.videos.slice(0, 5) : []);
      })
      .catch(() => {
        if (active) setVideos([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  return (
    <section className="youtube-replays" id="youtube-replays">
      <div className="youtube-replays-heading">
        <div>
          <span className="youtube-kicker">QUETRAONLINE YOUTUBE</span>
          <h2 className="gold-heading"><span>▶</span> SON CANLI YAYINLARIMIZ</h2>
          <p>YouTube kanalındaki en yeni 5 canlı yayın kaydı.</p>
        </div>
        <a className="youtube-all-link" href="https://www.youtube.com/@quetraonline/streams" target="_blank" rel="noreferrer">
          Tüm Yayınları Gör <span>↗</span>
        </a>
      </div>

      {loading ? (
        <div className="youtube-replays-status">Son canlı yayınlar yükleniyor…</div>
      ) : videos.length ? (
        <div className="youtube-replays-grid">
          {videos.map((video) => (
            <a className="youtube-replay-card" href={video.url} target="_blank" rel="noreferrer" key={video.id}>
              <div className="youtube-replay-thumb">
                <img src={video.thumbnail} alt="" loading="lazy" />
                <span className="youtube-play-icon">▶</span>
              </div>
              <strong>{video.title}</strong>
              {video.meta ? <small>{video.meta}</small> : null}
            </a>
          ))}
        </div>
      ) : (
        <div className="youtube-replays-status">
          Yayın kayıtları şu anda alınamadı. <a href="https://www.youtube.com/@quetraonline/streams" target="_blank" rel="noreferrer">YouTube yayın arşivini aç ↗</a>
        </div>
      )}
    </section>
  );
}
