"use client";

import { useEffect } from "react";

export default function ImageProtection() {
  useEffect(() => {
    const isProtectedImage = (target) => {
      if (!(target instanceof Element)) return false;
      return Boolean(target.closest("img, picture, svg, canvas, video, [role='img']"));
    };

    const blockImageContextMenu = (event) => {
      if (!isProtectedImage(event.target)) return;
      event.preventDefault();
      event.stopPropagation();
    };

    const blockImageDrag = (event) => {
      if (!isProtectedImage(event.target)) return;
      event.preventDefault();
    };

    document.addEventListener("contextmenu", blockImageContextMenu, true);
    document.addEventListener("dragstart", blockImageDrag, true);

    return () => {
      document.removeEventListener("contextmenu", blockImageContextMenu, true);
      document.removeEventListener("dragstart", blockImageDrag, true);
    };
  }, []);

  return null;
}
