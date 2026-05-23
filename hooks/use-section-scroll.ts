"use client";

import { useEffect } from "react";
import {
  getTargetSectionForDirection,
  initCurrentSection,
  normalizeWheelDelta,
  PORTFOLIO_SECTION_IDS,
  rebuildSectionScrollPositions,
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

    initCurrentSection(hashSection);

    if (hashSection) {
      requestAnimationFrame(() => scrollToSection(hashSection));
    }

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

    requestAnimationFrame(() => rebuildSectionScrollPositions());
    window.addEventListener("load", rebuildSectionScrollPositions);

    let snapLocked = false;

    const goToSection = (direction: "next" | "prev"): void => {
      if (snapLocked) return;

      const target = getTargetSectionForDirection(direction);
      if (!target) return;

      snapLocked = true;
      scrollToSection(target, () => {
        snapLocked = false;
      });
    };

    const onWheel = (event: WheelEvent) => {
      const delta = normalizeWheelDelta(event);
      if (delta === 0) return;

      const direction: "next" | "prev" = delta > 0 ? "next" : "prev";

      if (!getTargetSectionForDirection(direction)) return;

      event.preventDefault();

      if (snapLocked) return;

      goToSection(direction);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const scrollKeys = ["ArrowDown", "ArrowUp", "PageDown", "PageUp", " "];
      if (!scrollKeys.includes(event.key)) return;

      const direction =
        event.key === "ArrowDown" ||
        event.key === "PageDown" ||
        event.key === " "
          ? "next"
          : "prev";

      if (!getTargetSectionForDirection(direction)) return;

      event.preventDefault();

      if (snapLocked) return;

      goToSection(direction);
    };

    let touchStartY = 0;

    const onTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? 0;
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (snapLocked) return;

      const touch = event.changedTouches[0];
      if (!touch) return;

      const deltaY = touchStartY - touch.clientY;
      if (Math.abs(deltaY) < 40) return;

      const direction: "next" | "prev" = deltaY > 0 ? "next" : "prev";
      if (!getTargetSectionForDirection(direction)) return;

      goToSection(direction);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      resizeObserver?.disconnect();
      window.removeEventListener("load", rebuildSectionScrollPositions);
    };
  }, []);
}
