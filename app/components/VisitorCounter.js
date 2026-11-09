"use client";

import { useEffect, useState } from "react";

const SESSION_KEY = "quetraonline-visitor-counted-v1";
const COUNTER_URL = "https://hfmosadynxpwkscvpard.supabase.co/functions/v1/site-visitor-counter";

export default function VisitorCounter() {
  const [total, setTotal] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    try {
      const saved = window.sessionStorage.getItem(SESSION_KEY);
      if (saved && saved !== "pending") {
        const parsed = Number(saved);
        if (Number.isFinite(parsed) && parsed >= 0) setTotal(parsed);
        return;
      }
      if (saved === "pending") return;
      window.sessionStorage.setItem(SESSION_KEY, "pending");
    } catch {}

    fetch(COUNTER_URL, { method: "POST" })
      .then(async (response) => {
        if (!response.ok) throw new Error("Sayaç yanıt vermedi");
        const data = await response.json();
        const count = Number(data.total);
        if (!Number.isFinite(count) || count < 0) throw new Error("Sayaç verisi geçersiz");
        setTotal(count);
        try {
          window.sessionStorage.setItem(SESSION_KEY, String(count));
        } catch {}
      })
      .catch((error) => {
        console.error("Ziyaretçi sayacı yüklenemedi:", error);
        setFailed(true);
        try {
          window.sessionStorage.removeItem(SESSION_KEY);
        } catch {}
      });
  }, []);

  return (
    <div className="visitor-counter" aria-live="polite">
      <span className="visitor-counter-icon" aria-hidden="true">👁</span>
      {total !== null
        ? <span>Bu siteyi <strong>{new Intl.NumberFormat("tr-TR").format(total)}</strong> kişi ziyaret etti.</span>
        : failed
          ? <span>Ziyaretçi sayacı şu anda yüklenemedi.</span>
          : <span>Ziyaretçi sayısı yükleniyor…</span>}
    </div>
  );
}
