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

/** After the last wheel tick in a burst, wait before accepting a new section jump. */
const WHEEL_BURST_IDLE_MS = 650;

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

    let burstLocked = false;
    let burstIdleTimer: ReturnType<typeof setTimeout> | undefined;

    const releaseBurstLock = () => {
      burstLocked = false;
      burstIdleTimer = undefined;
    };

    const extendBurstLock = () => {
      clearTimeout(burstIdleTimer);
      burstIdleTimer = setTimeout(releaseBurstLock, WHEEL_BURST_IDLE_MS);
    };

    const startBurstLock = () => {
      burstLocked = true;
      extendBurstLock();
    };

    const navigateOnce = (direction: "next" | "prev"): void => {
      const target = getTargetSectionForDirection(direction);
      if (!target) return;
      scrollToSection(target);
    };

    const onWheel = (event: WheelEvent) => {
      const delta = normalizeWheelDelta(event);
      if (delta === 0) return;

      const direction: "next" | "prev" = delta > 0 ? "next" : "prev";

      if (burstLocked) {
        event.preventDefault();
        extendBurstLock();
        return;
      }

      if (!getTargetSectionForDirection(direction)) return;

      event.preventDefault();
      startBurstLock();
      navigateOnce(direction);
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

      if (burstLocked) return;
      if (!getTargetSectionForDirection(direction)) return;

      event.preventDefault();
      startBurstLock();
      navigateOnce(direction);
    };

    let touchStartY = 0;

    const onTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? 0;
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (burstLocked) return;

      const touch = event.changedTouches[0];
      if (!touch) return;

      const deltaY = touchStartY - touch.clientY;
      if (Math.abs(deltaY) < 40) return;

      const direction: "next" | "prev" = deltaY > 0 ? "next" : "prev";
      if (!getTargetSectionForDirection(direction)) return;

      startBurstLock();
      navigateOnce(direction);
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
      clearTimeout(burstIdleTimer);
    };
  }, []);
}
