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
  return new Response(null, {
    status: 302,
    headers: {
      Location: new URL(path, request.url).toString(),
      "Set-Cookie": "quetra_twitch_oauth_state=; HttpOnly; Secure; SameSite=Lax; Path=/api/auth/twitch; Max-Age=0",
      "Cache-Control": "no-store",
    },
  });
}

export async function GET(request) {
  const url = new URL(request.url);
  const state = url.searchParams.get("state") || "";
  const savedState = cookieValue(request, "quetra_twitch_oauth_state");
  const a = Buffer.from(state);
  const b = Buffer.from(savedState);
  if (!state || !savedState || a.length !== b.length || !timingSafeEqual(a, b)) {
    return redirect(request, "/?twitch-connect=state-error");
  }
  if (url.searchParams.get("error")) return redirect(request, "/?twitch-connect=cancelled");
  const code = url.searchParams.get("code");
  if (!code) return redirect(request, "/?twitch-connect=missing-code");

  try {
    const clientId = process.env.TWITCH_CLIENT_ID;
    const clientSecret = process.env.TWITCH_CLIENT_SECRET;
    if (!clientId || !clientSecret) throw new Error("Twitch uygulama kimlik bilgileri eksik.");

    const redirectUri = new URL("/api/auth/twitch/callback", request.url).toString();
    const tokenResponse = await fetch("https://id.twitch.tv/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        grant_type: "authorization_code",
        redirect_uri: redirectUri,
      }),
      cache: "no-store",
    });
    const tokens = await tokenResponse.json();
    if (!tokenResponse.ok) throw new Error(tokens.message || tokens.error || "Twitch token işlemi başarısız.");

    const validateResponse = await fetch("https://id.twitch.tv/oauth2/validate", {
      headers: { Authorization: "OAuth " + tokens.access_token },
      cache: "no-store",
    });
    const validation = await validateResponse.json();
    if (!validateResponse.ok || validation.client_id !== clientId || !validation.user_id) {
      throw new Error("Twitch erişim anahtarı doğrulanamadı.");
    }

    const userResponse = await fetch("https://api.twitch.tv/helix/users", {
      headers: { "Client-Id": clientId, Authorization: "Bearer " + tokens.access_token },
      cache: "no-store",
    });
    const userPayload = await userResponse.json();
    const user = userPayload.data?.[0];
    if (!userResponse.ok || !user?.id || user.id !== validation.user_id) {
      throw new Error("Twitch hesap bilgileri doğrulanamadı.");
    }

    await saveOAuthConnection({
      provider: "twitch",
      accountId: user.id,
      accountName: user.display_name || user.login || "Twitch hesabı",
      tokens: {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token || null,
        token_type: tokens.token_type || "bearer",
        expiry_date: Date.now() + Number(tokens.expires_in || 14400) * 1000,
      },
      scopes: tokens.scope || validation.scopes || [],
    });
    return redirect(request, "/?twitch-connect=success");
  } catch (error) {
    console.error("[twitch-oauth]", error);
    return redirect(request, "/?twitch-connect=error");
  }
}
