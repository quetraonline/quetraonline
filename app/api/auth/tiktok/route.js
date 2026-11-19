import { randomBytes } from "node:crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request) {
  const clientKey = process.env.TIKTOK_CLIENT_KEY;
  if (!clientKey) {
    return Response.json({ error: "TIKTOK_CLIENT_KEY ortam değişkeni eksik." }, { status: 500 });
  }

  const state = randomBytes(32).toString("hex");
  const redirectUri = new URL("/api/auth/tiktok/callback", request.url).toString();
  const params = new URLSearchParams({
    client_key: clientKey,
    response_type: "code",
    scope: "user.info.basic,video.list",
    redirect_uri: redirectUri,
    state,
    disable_auto_auth: "1",
  });
  return new Response(null, {
    status: 302,
    headers: {
      Location: "https://www.tiktok.com/v2/auth/authorize/?" + params.toString(),
      "Set-Cookie": `quetra_tiktok_oauth_state=${state}; HttpOnly; Secure; SameSite=Lax; Path=/api/auth/tiktok; Max-Age=600`,
      "Cache-Control": "no-store",
    },
  });
}
