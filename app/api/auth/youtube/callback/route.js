import { createCipheriv, createHash, randomBytes, timingSafeEqual } from "node:crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function encryptTokens(value) {
  const secret = process.env.OAUTH_TOKEN_ENCRYPTION_KEY;
  if (!secret) throw new Error("OAUTH_TOKEN_ENCRYPTION_KEY ortam değişkeni eksik.");
  const key = Buffer.from(secret, "base64");
  if (key.length !== 32) throw new Error("OAUTH_TOKEN_ENCRYPTION_KEY 32 byte Base64 anahtar olmalı.");
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([cipher.update(JSON.stringify(value), "utf8"), cipher.final()]);
  return [iv.toString("base64"), cipher.getAuthTag().toString("base64"), encrypted.toString("base64")].join(".");
}

function cookieValue(request, name) {
  const raw = request.headers.get("cookie") || "";
  const match = raw.split(";").map((part) => part.trim()).find((part) => part.startsWith(name + "="));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : "";
}

function redirect(request, path) {
  const response = Response.redirect(new URL(path, request.url));
  response.headers.append("Set-Cookie", "quetra_youtube_oauth_state=; HttpOnly; Secure; SameSite=Lax; Path=/api/auth/youtube; Max-Age=0");
  return response;
}

export async function GET(request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state") || "";
  const savedState = cookieValue(request, "quetra_youtube_oauth_state");
  const a = Buffer.from(state);
  const b = Buffer.from(savedState);
  if (!state || !savedState || a.length !== b.length || !timingSafeEqual(a, b)) {
    return redirect(request, "/?youtube-connect=state-error");
  }
  if (url.searchParams.get("error")) return redirect(request, "/?youtube-connect=cancelled");
  if (!code) return redirect(request, "/?youtube-connect=missing-code");

  try {
    const clientId = process.env.YOUTUBE_OAUTH_CLIENT_ID;
    const clientSecret = process.env.YOUTUBE_OAUTH_CLIENT_SECRET;
    const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!clientId || !clientSecret || !supabaseUrl || !serviceKey) {
      throw new Error("YouTube veya Supabase sunucu ortam değişkenleri eksik.");
    }

    const redirectUri = new URL("/api/auth/youtube/callback", request.url).toString();
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
      cache: "no-store",
    });
    const tokens = await tokenResponse.json();
    if (!tokenResponse.ok) throw new Error(tokens.error_description || tokens.error || "Google token işlemi başarısız.");

    const channelResponse = await fetch("https://www.googleapis.com/youtube/v3/channels?part=id,snippet&mine=true", {
      headers: { Authorization: "Bearer " + tokens.access_token },
      cache: "no-store",
    });
    const channelPayload = await channelResponse.json();
    if (!channelResponse.ok || !channelPayload.items?.length) {
      throw new Error("Google hesabında erişilebilir bir YouTube kanalı bulunamadı.");
    }

    const channel = channelPayload.items[0];
    const existingResponse = await fetch(
      supabaseUrl + "/rest/v1/quetra_oauth_connections?provider=eq.youtube&account_id=eq." + encodeURIComponent(channel.id) + "&select=encrypted_tokens",
      { headers: { apikey: serviceKey, Authorization: "Bearer " + serviceKey }, cache: "no-store" }
    );
    const existing = existingResponse.ok ? await existingResponse.json() : [];
    const previousRefreshToken = existing[0]?.encrypted_tokens ? null : null;
    const storedTokens = {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token || previousRefreshToken,
      token_type: tokens.token_type,
      expiry_date: Date.now() + Number(tokens.expires_in || 3600) * 1000,
    };

    const saveResponse = await fetch(supabaseUrl + "/rest/v1/quetra_oauth_connections?on_conflict=provider,account_id", {
      method: "POST",
      headers: {
        apikey: serviceKey,
        Authorization: "Bearer " + serviceKey,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates,return=minimal",
      },
      body: JSON.stringify([{
        provider: "youtube",
        account_id: channel.id,
        account_name: channel.snippet?.title || "YouTube Kanalı",
        encrypted_tokens: encryptTokens(storedTokens),
        scopes: (tokens.scope || "").split(" ").filter(Boolean),
        updated_at: new Date().toISOString(),
      }]),
      cache: "no-store",
    });
    if (!saveResponse.ok) throw new Error("YouTube bağlantısı veritabanına kaydedilemedi: " + await saveResponse.text());
    return redirect(request, "/?youtube-connect=success");
  } catch (error) {
    console.error("[youtube-oauth]", error);
    return redirect(request, "/?youtube-connect=error");
  }
}
