import { randomBytes } from "node:crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request) {
  const clientId = process.env.TWITCH_CLIENT_ID;
  if (!clientId) {
    return Response.json({ error: "TWITCH_CLIENT_ID ortam değişkeni eksik." }, { status: 500 });
  }

  const state = randomBytes(32).toString("hex");
  const redirectUri = new URL("/api/auth/twitch/callback", request.url).toString();
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "user:read:email",
    force_verify: "true",
    state,
  });
  return new Response(null, {
    status: 302,
    headers: {
      Location: "https://id.twitch.tv/oauth2/authorize?" + params.toString(),
      "Set-Cookie": `quetra_twitch_oauth_state=${state}; HttpOnly; Secure; SameSite=Lax; Path=/api/auth/twitch; Max-Age=600`,
      "Cache-Control": "no-store",
    },
  });
}
