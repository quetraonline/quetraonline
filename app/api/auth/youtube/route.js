import { randomBytes } from "node:crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request) {
  const clientId = process.env.YOUTUBE_OAUTH_CLIENT_ID;
  if (!clientId) {
    return Response.json({ error: "YOUTUBE_OAUTH_CLIENT_ID ortam değişkeni eksik." }, { status: 500 });
  }

  const state = randomBytes(32).toString("hex");
  const redirectUri = new URL("/api/auth/youtube/callback", request.url).toString();
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "https://www.googleapis.com/auth/youtube.readonly",
    access_type: "offline",
    prompt: "consent",
    state,
  });
  const response = Response.redirect("https://accounts.google.com/o/oauth2/v2/auth?" + params.toString());
  response.headers.append("Set-Cookie", `quetra_youtube_oauth_state=${state}; HttpOnly; Secure; SameSite=Lax; Path=/api/auth/youtube; Max-Age=600`);
  return response;
}
