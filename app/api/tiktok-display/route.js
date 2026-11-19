import { decryptOAuthTokens, saveOAuthConnection } from "../../../lib/server/oauth-token-vault";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const VIDEO_FIELDS = [
  "id", "title", "video_description", "duration", "cover_image_url",
  "share_url", "embed_link", "create_time", "view_count",
  "like_count", "comment_count", "share_count",
].join(",");

async function getLatestConnection() {
  if (!SUPABASE_URL || !SERVICE_KEY) throw new Error("Supabase server configuration is missing.");
  const query = new URLSearchParams({
    provider: "eq.tiktok",
    select: "provider,account_id,account_name,encrypted_tokens,scopes,updated_at",
    order: "updated_at.desc",
    limit: "1",
  });
  const response = await fetch(
    SUPABASE_URL.replace(/\/$/, "") + "/rest/v1/quetra_oauth_connections?" + query.toString(),
    {
      headers: { apikey: SERVICE_KEY, Authorization: "Bearer " + SERVICE_KEY },
      cache: "no-store",
    }
  );
  if (!response.ok) throw new Error("TikTok bağlantı bilgileri okunamadı.");
  const rows = await response.json();
  return rows[0] || null;
}

function getScopeList(value) {
  if (Array.isArray(value)) return value.flatMap((entry) => String(entry).split(/[ ,]+/)).filter(Boolean);
  return String(value || "").split(/[ ,]+/).filter(Boolean);
}

async function refreshTikTokTokens(connection, tokens) {
  const expiresAt = Number(tokens.expiry_date || 0);
  if (expiresAt && expiresAt > Date.now() + 10 * 60 * 1000) return tokens;
  if (!tokens.refresh_token) throw new Error("TikTok erişim süresi dolmuş. Hesabı yeniden bağlayın.");

  const clientKey = process.env.TIKTOK_CLIENT_KEY;
  const clientSecret = process.env.TIKTOK_CLIENT_SECRET;
  if (!clientKey || !clientSecret) throw new Error("TikTok uygulama kimlik bilgileri eksik.");

  const response = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded", "Cache-Control": "no-cache" },
    body: new URLSearchParams({
      client_key: clientKey,
      client_secret: clientSecret,
      grant_type: "refresh_token",
      refresh_token: tokens.refresh_token,
    }),
    cache: "no-store",
  });
  const payload = await response.json();
  const refreshed = payload.data || payload;
  if (!response.ok || !refreshed.access_token || !refreshed.refresh_token) {
    throw new Error(payload.error_description || payload.error?.message || payload.message || "TikTok erişimi yenilenemedi.");
  }

  const updated = {
    access_token: refreshed.access_token,
    refresh_token: refreshed.refresh_token,
    token_type: refreshed.token_type || "Bearer",
    expiry_date: Date.now() + Number(refreshed.expires_in || 7200) * 1000,
    refresh_expiry_date: Date.now() + Number(refreshed.refresh_expires_in || 0) * 1000,
  };
  await saveOAuthConnection({
    provider: "tiktok",
    accountId: connection.account_id,
    accountName: connection.account_name,
    tokens: updated,
    scopes: refreshed.scope || connection.scopes || [],
  });
  return updated;
}

async function callTikTokProfile(accessToken) {
  const fields = "open_id,display_name,avatar_url";
  const response = await fetch("https://open.tiktokapis.com/v2/user/info/?fields=" + fields, {
    headers: { Authorization: "Bearer " + accessToken },
    cache: "no-store",
  });
  const payload = await response.json();
  if (!response.ok || (payload.error?.code && payload.error.code !== "ok")) {
    throw new Error(payload.error?.message || "TikTok profil bilgileri alınamadı.");
  }
  return payload.data?.user || null;
}

async function callTikTokVideos(accessToken) {
  const response = await fetch(
    "https://open.tiktokapis.com/v2/video/list/?fields=" + VIDEO_FIELDS,
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ max_count: 20 }),
      cache: "no-store",
    }
  );
  const payload = await response.json();
  if (!response.ok || (payload.error?.code && payload.error.code !== "ok")) {
    const error = new Error(payload.error?.message || "TikTok videoları alınamadı.");
    error.code = payload.error?.code || "video_list_error";
    throw error;
  }
  return Array.isArray(payload.data?.videos) ? payload.data.videos : [];
}

export async function GET() {
  try {
    const connection = await getLatestConnection();
    if (!connection) {
      return Response.json({ connected: false, canConnect: Boolean(process.env.TIKTOK_CLIENT_KEY && process.env.TIKTOK_CLIENT_SECRET), videos: [] }, { headers: { "Cache-Control": "no-store" } });
    }

    const scopes = getScopeList(connection.scopes);
    const videoScopeGranted = scopes.includes("video.list");
    let tokens = decryptOAuthTokens(connection.encrypted_tokens);
    tokens = await refreshTikTokTokens(connection, tokens);

    const profile = await callTikTokProfile(tokens.access_token);
    let videos = [];
    let videoError = null;
    if (videoScopeGranted) {
      try {
        const rawVideos = await callTikTokVideos(tokens.access_token);
        videos = rawVideos.map((video) => ({
          id: String(video.id || ""),
          title: video.title || video.video_description || "TikTok Videosu",
          description: video.video_description || "",
          duration: Number(video.duration || 0),
          thumbnail: video.cover_image_url || "",
          url: video.share_url || "",
          embedUrl: video.embed_link || "",
          createdAt: video.create_time ? new Date(Number(video.create_time) * 1000).toISOString() : null,
          viewCount: Number.isFinite(Number(video.view_count)) ? Number(video.view_count) : null,
          likeCount: Number.isFinite(Number(video.like_count)) ? Number(video.like_count) : null,
          commentCount: Number.isFinite(Number(video.comment_count)) ? Number(video.comment_count) : null,
          shareCount: Number.isFinite(Number(video.share_count)) ? Number(video.share_count) : null,
        })).filter((video) => video.id && video.url);
      } catch (error) {
        videoError = error.code || error.message || "video_list_error";
      }
    }

    return Response.json({
      connected: true,
      account: {
        displayName: profile?.display_name || connection.account_name || "TikTok hesabı",
        avatarUrl: profile?.avatar_url || "",
        profileUrl: "https://www.tiktok.com/@quetraonline",
      },
      videoScopeGranted,
      videos,
      videoError,
      refreshedAt: new Date().toISOString(),
    }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("[tiktok-display]", error);
    return Response.json({
      connected: false,
      videos: [],
      error: error.message || "TikTok verileri alınamadı.",
    }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}
