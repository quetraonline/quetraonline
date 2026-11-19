import { timingSafeEqual } from "node:crypto";
import { saveOAuthConnection } from "../../../../../lib/server/oauth-token-vault";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function cookieValue(request, name) {
  const raw = request.headers.get("cookie") || "";
  const item = raw.split(";").map((part) => part.trim()).find((part) => part.startsWith(name + "="));
  return item ? decodeURIComponent(item.slice(name.length + 1)) : "";
}

function redirect(request, path) {
  const response = new Response(null, {
    status: 302,
    headers: {
      Location: new URL(path, request.url).toString(),
      "Set-Cookie": "quetra_tiktok_oauth_state=; HttpOnly; Secure; SameSite=Lax; Path=/api/auth/tiktok; Max-Age=0",
      "Cache-Control": "no-store",
    },
  });
  return response;
}

export async function GET(request) {
  const url = new URL(request.url);
  const state = url.searchParams.get("state") || "";
  const savedState = cookieValue(request, "quetra_tiktok_oauth_state");
  const a = Buffer.from(state);
  const b = Buffer.from(savedState);
  if (!state || !savedState || a.length !== b.length || !timingSafeEqual(a, b)) {
    return redirect(request, "/?tiktok-connect=state-error");
  }
  if (url.searchParams.get("error")) return redirect(request, "/?tiktok-connect=cancelled");
  const code = url.searchParams.get("code");
  if (!code) return redirect(request, "/?tiktok-connect=missing-code");

  try {
    const clientKey = process.env.TIKTOK_CLIENT_KEY;
    const clientSecret = process.env.TIKTOK_CLIENT_SECRET;
    if (!clientKey || !clientSecret) throw new Error("TikTok uygulama kimlik bilgileri eksik.");

    const redirectUri = new URL("/api/auth/tiktok/callback", request.url).toString();
    const tokenResponse = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_key: clientKey,
        client_secret: clientSecret,
        code,
        grant_type: "authorization_code",
        redirect_uri: redirectUri,
      }),
      cache: "no-store",
    });
    const tokenPayload = await tokenResponse.json();
    const tokens = tokenPayload.data || tokenPayload;
    if (!tokenResponse.ok || !tokens.access_token || !tokens.open_id) {
      throw new Error(tokenPayload.error?.message || tokenPayload.message || "TikTok token işlemi başarısız.");
    }

    const fields = "open_id,display_name,avatar_url,profile_deep_link";
    const profileResponse = await fetch("https://open.tiktokapis.com/v2/user/info/?fields=" + fields, {
      headers: { Authorization: "Bearer " + tokens.access_token },
      cache: "no-store",
    });
    const profilePayload = await profileResponse.json();
    const user = profilePayload.data?.user;
    if (!profileResponse.ok || !user?.open_id) {
      throw new Error(profilePayload.error?.message || "TikTok profil bilgileri alınamadı.");
    }

    await saveOAuthConnection({
      provider: "tiktok",
      accountId: user.open_id,
      accountName: user.display_name || "TikTok hesabı",
      tokens: {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token || null,
        token_type: tokens.token_type || "Bearer",
        expiry_date: Date.now() + Number(tokens.expires_in || 86400) * 1000,
        refresh_expiry_date: Date.now() + Number(tokens.refresh_expires_in || 31536000) * 1000,
      },
      scopes: tokens.scope || url.searchParams.get("scopes") || "user.info.basic video.list",
    });
    return redirect(request, "/?tiktok-connect=success");
  } catch (error) {
    console.error("[tiktok-oauth]", error);
    return redirect(request, "/?tiktok-connect=error");
  }
}
