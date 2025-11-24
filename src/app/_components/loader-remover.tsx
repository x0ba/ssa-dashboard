"use client";

import { useEffect } from "react";

export function LoaderRemover() {
  useEffect(() => {
    // Use requestAnimationFrame to ensure hydration is complete
    // and we're not interfering with React's DOM operations
    requestAnimationFrame(() => {
      const loader = document.getElementById("root-loader");
      if (loader?.parentNode) {
        loader.parentNode.removeChild(loader);
      }
    });
  }, []);

  return null;
}
