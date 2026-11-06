import { NextResponse } from "next/server";
import { createSessionValue, hasDashboardSession, sessionCookie } from "../_lib";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({ authenticated: await hasDashboardSession() });
}

export async function POST(request) {
  const password = process.env.NOWA_TRACKER_DASHBOARD_PASSWORD;
  const secret = process.env.NOWA_TRACKER_SESSION_SECRET;
  if (!password || !secret) {
    return NextResponse.json({ error: "Panel şifresi ve oturum anahtarı sunucuda ayarlanmamış." }, { status: 503 });
  }
  let body;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 }); }
  if (typeof body.password !== "string" || body.password !== password) {
    return NextResponse.json({ error: "Şifre hatalı." }, { status: 401 });
  }
  const response = NextResponse.json({ authenticated: true });
  response.cookies.set(sessionCookie.name, createSessionValue(), sessionCookie.options);
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ authenticated: false });
  response.cookies.set(sessionCookie.name, "", { ...sessionCookie.options, maxAge: 0 });
  return response;
}
