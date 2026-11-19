import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";

function encryptionKey() {
  const value = process.env.OAUTH_TOKEN_ENCRYPTION_KEY;
  if (!value) throw new Error("OAUTH_TOKEN_ENCRYPTION_KEY is missing.");
  const key = Buffer.from(value, "base64");
  if (key.length !== 32) throw new Error("OAUTH_TOKEN_ENCRYPTION_KEY must decode to 32 bytes.");
  return key;
}

export function encryptOAuthTokens(tokens) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", encryptionKey(), iv);
  const ciphertext = Buffer.concat([cipher.update(JSON.stringify(tokens), "utf8"), cipher.final()]);
  return [iv.toString("base64"), cipher.getAuthTag().toString("base64"), ciphertext.toString("base64")].join(".");
}

export function decryptOAuthTokens(value) {
  const [iv, tag, ciphertext] = String(value || "").split(".");
  if (!iv || !tag || !ciphertext) throw new Error("Stored OAuth token payload is invalid.");
  const decipher = createDecipheriv("aes-256-gcm", encryptionKey(), Buffer.from(iv, "base64"));
  decipher.setAuthTag(Buffer.from(tag, "base64"));
  return JSON.parse(Buffer.concat([
    decipher.update(Buffer.from(ciphertext, "base64")),
    decipher.final(),
  ]).toString("utf8"));
}

export async function saveOAuthConnection({ provider, accountId, accountName, tokens, scopes = [] }) {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) throw new Error("Supabase server environment variables are missing.");
  if (!provider || !accountId || !tokens?.access_token) throw new Error("OAuth connection data is incomplete.");

  const baseUrl = supabaseUrl.replace(/\/$/, "");
  const query = new URLSearchParams({
    provider: "eq." + provider,
    account_id: "eq." + String(accountId),
    select: "encrypted_tokens",
  });
  const existingResponse = await fetch(baseUrl + "/rest/v1/quetra_oauth_connections?" + query.toString(), {
    headers: { apikey: serviceKey, Authorization: "Bearer " + serviceKey },
    cache: "no-store",
  });
  if (!existingResponse.ok) throw new Error("Could not read existing OAuth connection.");
  const existing = await existingResponse.json();
  const previous = existing[0]?.encrypted_tokens ? decryptOAuthTokens(existing[0].encrypted_tokens) : {};

  const mergedTokens = {
    ...tokens,
    refresh_token: tokens.refresh_token || previous.refresh_token || null,
  };
  const response = await fetch(baseUrl + "/rest/v1/quetra_oauth_connections?on_conflict=provider,account_id", {
    method: "POST",
    headers: {
      apikey: serviceKey,
      Authorization: "Bearer " + serviceKey,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify([{
      provider,
      account_id: String(accountId),
      account_name: accountName || provider,
      encrypted_tokens: encryptOAuthTokens(mergedTokens),
      scopes: Array.isArray(scopes) ? scopes : String(scopes || "").split(/[ ,]+/).filter(Boolean),
      updated_at: new Date().toISOString(),
    }]),
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Could not save OAuth connection: " + response.status);
}
