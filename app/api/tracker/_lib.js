import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";

const COOKIE_NAME = "nowa_tracker_session";
const SESSION_SECONDS = 60 * 60 * 12;

export function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase sunucu ortam değişkenleri eksik.");
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

function sign(value) {
  return createHmac("sha256", process.env.NOWA_TRACKER_SESSION_SECRET || "")
    .update(value)
    .digest("hex");
}

export async function hasDashboardSession() {
  const secret = process.env.NOWA_TRACKER_SESSION_SECRET;
  if (!secret) return false;
  const store = await cookies();
  const raw = store.get(COOKIE_NAME)?.value || "";
  const parts = raw.split(".");
  if (parts.length !== 2) return false;
  const timestamp = Number(parts[0]);
  if (!Number.isFinite(timestamp) || Date.now() - timestamp > SESSION_SECONDS * 1000 || timestamp > Date.now()) return false;
  const expected = Buffer.from(sign(parts[0]), "hex");
  const received = Buffer.from(parts[1], "hex");
  return expected.length === received.length && timingSafeEqual(expected, received);
}

export function createSessionValue() {
  const timestamp = String(Date.now());
  return timestamp + "." + sign(timestamp);
}

export const sessionCookie = {
  name: COOKIE_NAME,
  options: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_SECONDS
  }
};

export function getIstanbulDayBounds(day) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day || "")) return null;
  const [year, month, date] = day.split("-").map(Number);
  const parsed = new Date(Date.UTC(year, month - 1, date));
  if (parsed.getUTCFullYear() !== year || parsed.getUTCMonth() !== month - 1 || parsed.getUTCDate() !== date) return null;
  const start = new Date(parsed.getTime() - 3 * 60 * 60 * 1000);
  const nextDay = new Date(Date.UTC(year, month - 1, date + 1));
  const end = new Date(nextDay.getTime() - 3 * 60 * 60 * 1000);
  return { start: start.toISOString(), end: end.toISOString() };
}
