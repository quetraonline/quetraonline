export const dynamic = "force-dynamic";

const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131.0.0.0 Safari/537.36";

function normalizeVideo(item, platform) {
  if (!item || typeof item !== "object") return null;
  const id = String(item.id || item.video_id || item.uuid || "");
  const title = item.title || item.name || item.livestream?.session_title || item.livestream?.title || "";
  const created = item.created_at || item.createdAt || item.published_at || item.started_at || item.livestream?.created_at || "";
  const thumbnail = item.thumbnail_url || item.thumbnailURL || item.thumbnail?.src || item.thumbnail?.url || item.preview?.thumbnail_url || "";
  const url = platform === "twitch"
    ? (item.url || (id ? "https://www.twitch.tv/videos/" + id : ""))
    : (item.url || (item.uuid ? "https://kick.com/video/" + item.uuid : id ? "https://kick.com/video/" + id : ""));
  if (!id || !title || !url) return null;
  return {
    id: platform + "-" + id,
    platform,
    title,
    thumbnail: String(thumbnail).replace("{width}", "640").replace("{height}", "360") || "",
    url,
    published: created ? new Date(created).toLocaleDateString("tr-TR") : "",
    publishedAt: created ? new Date(created).getTime() : 0,
    viewCount: Number.isFinite(Number(item.view_count ?? item.views)) ? new Intl.NumberFormat("tr-TR").format(Number(item.view_count ?? item.views)) + " görüntülenme" : "",
  };
}

function collectTwitchVideos(node, output = []) {
  if (!node || typeof node !== "object") return output;
  if ((node.__typename === "Video" || node.video || node.videoId) && (node.id || node.video?.id)) {
    const candidate = node.video || node;
    const normalized = normalizeVideo({
      id: candidate.id || candidate.videoId,
      title: candidate.title || candidate.name,
      createdAt: candidate.createdAt || candidate.created_at,
      thumbnailURL: candidate.thumbnailURL || candidate.previewThumbnailURL || candidate.thumbnail_url,
      url: candidate.url,
      view_count: candidate.viewCount || candidate.view_count,
    }, "twitch");
    if (normalized) output.push(normalized);
  }
  if (Array.isArray(node)) node.forEach((value) => collectTwitchVideos(value, output));
  else Object.values(node).forEach((value) => {
    if (value && typeof value === "object") collectTwitchVideos(value, output);
  });
  return output;
}

async function getTwitchVideos() {
  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;
  if (clientId && clientSecret) {
    const tokenResponse = await fetch("https://id.twitch.tv/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ client_id: clientId, client_secret: clientSecret, grant_type: "client_credentials" }),
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });
    if (tokenResponse.ok) {
      const token = await tokenResponse.json();
      const userResponse = await fetch("https://api.twitch.tv/helix/users?login=quetraonline", {
        headers: { "Client-Id": clientId, Authorization: "Bearer " + token.access_token },
        signal: AbortSignal.timeout(8000),
        cache: "no-store",
      });
      if (userResponse.ok) {
        const user = (await userResponse.json()).data?.[0];
        if (user?.id) {
          const videosResponse = await fetch("https://api.twitch.tv/helix/videos?user_id=" + user.id + "&type=archive&first=20", {
            headers: { "Client-Id": clientId, Authorization: "Bearer " + token.access_token },
            signal: AbortSignal.timeout(10000),
            cache: "no-store",
          });
          if (videosResponse.ok) {
            const data = await videosResponse.json();
            return (data.data || []).map((item) => normalizeVideo(item, "twitch")).filter(Boolean).slice(0, 5);
          }
        }
      }
    }
  }

  const response = await fetch("https://www.twitch.tv/quetraonline/videos?filter=archives&sort=time", {
    headers: { "User-Agent": USER_AGENT, "Accept-Language": "tr-TR,tr;q=0.9,en;q=0.8" },
    signal: AbortSignal.timeout(12000),
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Twitch HTTP " + response.status);
  const html = await response.text();
  const videos = [];
  for (const match of html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)) {
    const script = match[1];
    if (!script.includes("video") || !script.includes("quetraonline")) continue;
    try {
      const data = JSON.parse(script);
      collectTwitchVideos(data, videos);
    } catch {}
  }
  const unique = [...new Map(videos.map((video) => [video.id, video])).values()];
  return unique.sort((a, b) => b.publishedAt - a.publishedAt).slice(0, 5);
}

async function getKickVideos() {
  const response = await fetch("https://kick.com/api/v2/channels/quetraonline/videos?sort=created_at&order=desc", {
    headers: { "User-Agent": USER_AGENT, Accept: "application/json", "Accept-Language": "tr-TR,tr;q=0.9,en;q=0.8" },
    signal: AbortSignal.timeout(12000),
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Kick HTTP " + response.status);
  const payload = await response.json();
  const source = Array.isArray(payload) ? payload : payload.videos || payload.data || payload?.data?.videos || [];
  return source.map((item) => normalizeVideo(item, "kick")).filter(Boolean)
    .sort((a, b) => b.publishedAt - a.publishedAt).slice(0, 5);
}

export async function GET() {
  const [twitchResult, kickResult] = await Promise.allSettled([getTwitchVideos(), getKickVideos()]);
  const twitch = twitchResult.status === "fulfilled" ? twitchResult.value : [];
  const kick = kickResult.status === "fulfilled" ? kickResult.value : [];
  return Response.json({
    twitch,
    kick,
    errors: {
      twitch: twitchResult.status === "rejected" ? String(twitchResult.reason?.message || "Twitch kayıtları alınamadı") : null,
      kick: kickResult.status === "rejected" ? String(kickResult.reason?.message || "Kick kayıtları alınamadı") : null,
    },
  }, { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } });
}
