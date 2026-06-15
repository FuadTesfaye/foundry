"use client";

import { useEffect } from "react";

const UNICORN_SCRIPT =
  "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.33/dist/unicornStudio.umd.js";

function initUnicornStudio() {
  const win = window as Window & {
    UnicornStudio?: { isInitialized: boolean; init?: () => void };
  };
  if (win.UnicornStudio?.init) {
    win.UnicornStudio.init();
    win.UnicornStudio.isInitialized = true;
  }
}

function hideBranding() {
  document.querySelectorAll("[data-us-project]").forEach((projectDiv) => {
    projectDiv.querySelectorAll("*").forEach((el) => {
      const text = (el.textContent || "").toLowerCase();
      if (text.includes("made with") || text.includes("unicorn")) {
        el.remove();
      }
    });
  });
}

export function useUnicornStudio() {
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    let script: HTMLScriptElement | null = null;

    const scheduleInit = () => {
      initUnicornStudio();
      hideBranding();
      setTimeout(initUnicornStudio, 300);
      setTimeout(initUnicornStudio, 1000);
      setTimeout(hideBranding, 500);
      setTimeout(hideBranding, 2000);
    };

    const win = window as Window & {
      UnicornStudio?: { isInitialized: boolean; init?: () => void };
    };

    if (win.UnicornStudio?.init) {
      scheduleInit();
    } else {
      script = document.createElement("script");
      script.src = UNICORN_SCRIPT;
      script.async = true;
      script.onload = scheduleInit;
      document.head.appendChild(script);
    }

    interval = setInterval(hideBranding, 200);

    return () => {
      if (interval) clearInterval(interval);
      if (script?.parentNode) script.parentNode.removeChild(script);
    };
  }, []);
}

declare global {
  interface Window {
    UnicornStudio?: { isInitialized: boolean; init?: () => void };
  }
}
