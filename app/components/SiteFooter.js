"use client";

import VisitorCounter from "./VisitorCounter";

export default function SiteFooter() {
  return (
    <footer className="site-footer" id="contact">
      <img className="footer-logo" src="/quetra-logo.svg?v=20261108" alt="QuetraOnline" />
      <VisitorCounter />
      <p>© 2026 QuetraOnline.com - Tüm hakları saklıdır.</p>
      <p>Sorun ve şikayetleriniz için <a href="/iletisim">İletişim</a> sayfasından bana ulaşın.</p>
    </footer>
  );
}
