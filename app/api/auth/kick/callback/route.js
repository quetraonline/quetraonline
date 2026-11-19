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
  const headers = new Headers({
    Location: new URL(path, request.url).toString(),
    "Cache-Control": "no-store",
  });
  headers.append("Set-Cookie", "quetra_kick_oauth_state=; HttpOnly; Secure; SameSite=Lax; Path=/api/auth/kick; Max-Age=0");
  headers.append("Set-Cookie", "quetra_kick_oauth_verifier=; HttpOnly; Secure; SameSite=Lax; Path=/api/auth/kick; Max-Age=0");
  return new Response(null, { status: 302, headers });
}

export async function GET(request) {
  const url = new URL(request.url);
  const state = url.searchParams.get("state") || "";
  const savedState = cookieValue(request, "quetra_kick_oauth_state");
  const verifier = cookieValue(request, "quetra_kick_oauth_verifier");
  const a = Buffer.from(state);
  const b = Buffer.from(savedState);
  if (!state || !savedState || !verifier || a.length !== b.length || !timingSafeEqual(a, b)) {
    return redirect(request, "/?kick-connect=state-error");
  }
  if (url.searchParams.get("error")) return redirect(request, "/?kick-connect=cancelled");
  const code = url.searchParams.get("code");
  if (!code) return redirect(request, "/?kick-connect=missing-code");

  try {
    const clientId = process.env.KICK_CLIENT_ID;
    const clientSecret = process.env.KICK_CLIENT_SECRET;
    if (!clientId || !clientSecret) throw new Error("Kick uygulama kimlik bilgileri eksik.");

    const redirectUri = new URL("/api/auth/kick/callback", request.url).toString();
    const tokenResponse = await fetch("https://id.kick.com/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
        code_verifier: verifier,
      }),
      cache: "no-store",
    });
    const tokens = await tokenResponse.json();
    if (!tokenResponse.ok || !tokens.access_token) {
      throw new Error(tokens.error_description || tokens.error || "Kick token işlemi başarısız.");
    }

    const userResponse = await fetch("https://api.kick.com/public/v1/users", {
      headers: { Authorization: "Bearer " + tokens.access_token },
      cache: "no-store",
    });
    const userPayload = await userResponse.json();
    const user = userPayload.data?.[0];
    if (!userResponse.ok || !user?.user_id) {
      throw new Error(userPayload.message || "Kick hesap bilgileri alınamadı.");
    }

    await saveOAuthConnection({
      provider: "kick",
      accountId: String(user.user_id),
      accountName: user.name || "Kick hesabı",
      tokens: {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token || null,
        token_type: tokens.token_type || "bearer",
        expiry_date: Date.now() + Number(tokens.expires_in || 3600) * 1000,
      },
      scopes: tokens.scope || "user:read channel:read",
    });
    return redirect(request, "/?kick-connect=success");
  } catch (error) {
    console.error("[kick-oauth]", error);
    return redirect(request, "/?kick-connect=error");
  }
}
