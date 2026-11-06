import { NextResponse } from "next/server";
import { callTrackerRpc, getDashboardRpcSecret, getIstanbulDayBounds, hasDashboardSession } from "../_lib";

export const runtime = "nodejs";

export async function GET(request) {
  if (!(await hasDashboardSession())) return NextResponse.json({ error: "Oturum gerekli." }, { status: 401 });
  try {
    const params = new URL(request.url).searchParams;
    let start = null;
    let end = null;
    const day = params.get("date");
    if (day) {
      const bounds = getIstanbulDayBounds(day);
      if (!bounds) return NextResponse.json({ error: "Tarih biçimi geçersiz." }, { status: 400 });
      start = bounds.start;
      end = bounds.end;
    }
    const result = await callTrackerRpc("tracker_get_stats", {
      p_session_secret: getDashboardRpcSecret(),
      p_start: start,
      p_end: end
    });
    return NextResponse.json(result || { total: 0, players: [], keywords: [] });
  } catch (error) {
    return NextResponse.json({ error: "İstatistik alınamadı: " + (error.message || "veritabanı hatası") }, { status: 500 });
  }
}
