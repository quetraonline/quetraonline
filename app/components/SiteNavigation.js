"use client";

import { useEffect, useRef, useState } from "react";

export default function SiteNavigation({ active = "home" }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handlePointerDown(event) {
      if (!menuRef.current?.contains(event.target)) setOpen(false);
    }
    function handleKeyDown(event) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className="site-header">
      <div className="site-menu" ref={menuRef}>
        <button
          className="site-menu-trigger"
          type="button"
          aria-expanded={open}
          aria-haspopup="true"
          aria-controls="site-navigation-links"
          onClick={() => setOpen((value) => !value)}
        >
          <img src="/quetra-logo.svg?v=20261108" alt="QuetraOnline menüsünü aç" />
        </button>
        <nav
          id="site-navigation-links"
          className={`site-menu-dropdown${open ? " is-open" : ""}`}
          aria-label="Ana menü"
        >
          <a className={active === "home" ? "active" : ""} href="/" onClick={() => setOpen(false)}>Ana Sayfa</a>
          <a className={active === "contact" ? "active" : ""} href="/iletisim" onClick={() => setOpen(false)}>İletişim</a>
        </nav>
      </div>
    </header>
  );
}
