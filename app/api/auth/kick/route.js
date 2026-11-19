import { createHash, randomBytes } from "node:crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request) {
  const clientId = process.env.KICK_CLIENT_ID;
  if (!clientId) {
    return Response.json({ error: "KICK_CLIENT_ID ortam değişkeni eksik." }, { status: 500 });
  }

  const state = randomBytes(32).toString("hex");
  const verifier = randomBytes(32).toString("base64url");
  const challenge = createHash("sha256").update(verifier).digest("base64url");
  const redirectUri = new URL("/api/auth/kick/callback", request.url).toString();
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "user:read channel:read",
    code_challenge: challenge,
    code_challenge_method: "S256",
    state,
  });
  return new Response(null, {
    status: 302,
    headers: {
      Location: "https://id.kick.com/oauth/authorize?" + params.toString(),
      "Set-Cookie": [
        `quetra_kick_oauth_state=${state}; HttpOnly; Secure; SameSite=Lax; Path=/api/auth/kick; Max-Age=600`,
        `quetra_kick_oauth_verifier=${verifier}; HttpOnly; Secure; SameSite=Lax; Path=/api/auth/kick; Max-Age=600`,
      ].join(", "),
      "Cache-Control": "no-store",
    },
  });
}
