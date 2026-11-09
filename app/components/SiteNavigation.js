"use client";

import { useState } from "react";

export default function SiteNavigation({ active = "home" }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <button
        className="mobile-menu-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="site-navigation-links"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="hamburger-icon" aria-hidden="true">
          <i /><i /><i />
        </span>
        <span>KLAN MENÜSÜ</span>
      </button>
      <nav id="site-navigation-links" className={open ? "is-open" : ""} aria-label="Ana menü">
        <a className={active === "home" ? "active" : ""} href="/" onClick={() => setOpen(false)}>⌂ <span>Ana Sayfa</span></a>
        <a className={active === "contact" ? "active" : ""} href="/iletisim" onClick={() => setOpen(false)}>✉ <span>İletişim</span></a>
      </nav>
    </header>
  );
}
