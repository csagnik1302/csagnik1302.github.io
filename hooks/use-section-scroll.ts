"use client";

import { useEffect } from "react";
import {
  attachSectionWheelHandler,
  canNavigateInDirection,
  initCurrentSection,
  navigateInDirection,
  PORTFOLIO_SECTION_IDS,
  scrollToSection,
  syncNavHeightCssVar,
  type PortfolioSectionId,
} from "@/lib/section-scroll";

function isPortfolioSectionId(id: string): id is PortfolioSectionId {
  return (PORTFOLIO_SECTION_IDS as readonly string[]).includes(id);
}

export function useSectionScroll() {
  useEffect(() => {
    syncNavHeightCssVar();

    const hash = window.location.hash.replace("#", "");
    const hashSection = isPortfolioSectionId(hash) ? hash : undefined;

    // Always scroll to top on page load, unless there's an explicit hash
    if (hashSection) {
      initCurrentSection(hashSection);
      requestAnimationFrame(() => scrollToSection(hashSection));
    } else {
      initCurrentSection("top");
      requestAnimationFrame(() => scrollToSection("top"));
    }

    const detachWheel = attachSectionWheelHandler();

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => syncNavHeightCssVar())
        : null;

    const nav = document.querySelector("[data-section-nav]");
    if (nav && resizeObserver) {
      resizeObserver.observe(nav);
    }

    const onResize = () => syncNavHeightCssVar();
    window.addEventListener("resize", onResize);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) return;

      const scrollKeys = ["ArrowDown", "ArrowUp", "PageDown", "PageUp", " "];
      if (!scrollKeys.includes(event.key)) return;

      const direction =
        event.key === "ArrowDown" ||
        event.key === "PageDown" ||
        event.key === " "
          ? "next"
          : "prev";

      if (!canNavigateInDirection(direction)) return;

      event.preventDefault();
      navigateInDirection(direction);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      detachWheel();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKeyDown);
      resizeObserver?.disconnect();
    };
  }, []);
}
