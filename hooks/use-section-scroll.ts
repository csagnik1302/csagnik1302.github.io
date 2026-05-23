"use client";

import { useEffect } from "react";
import {
  getAdjacentSectionId,
  normalizeWheelDelta,
  PORTFOLIO_SECTION_IDS,
  scrollToAdjacentSection,
  scrollToSection,
  syncNavHeightCssVar,
  type PortfolioSectionId,
} from "@/lib/section-scroll";

function isPortfolioSectionId(id: string): id is PortfolioSectionId {
  return (PORTFOLIO_SECTION_IDS as readonly string[]).includes(id);
}

/** One scroll burst (single or many wheel ticks) = one section change. */
const SNAP_LOCK_MS = 850;

export function useSectionScroll() {
  useEffect(() => {
    syncNavHeightCssVar();

    const hash = window.location.hash.replace("#", "");
    if (isPortfolioSectionId(hash)) {
      requestAnimationFrame(() => scrollToSection(hash, "auto"));
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

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const scrollBehavior: ScrollBehavior = prefersReducedMotion
      ? "auto"
      : "smooth";

    let snapLocked = false;
    let snapUnlockTimer: ReturnType<typeof setTimeout> | undefined;

    const lockSnap = () => {
      snapLocked = true;
      clearTimeout(snapUnlockTimer);
      snapUnlockTimer = setTimeout(() => {
        snapLocked = false;
      }, SNAP_LOCK_MS);
    };

    const goToSection = (direction: "next" | "prev"): void => {
      if (snapLocked) return;
      if (!getAdjacentSectionId(direction)) return;

      lockSnap();
      scrollToAdjacentSection(direction, scrollBehavior);
    };

    const onWheel = (event: WheelEvent) => {
      if (prefersReducedMotion) return;

      const delta = normalizeWheelDelta(event);
      if (delta === 0) return;

      const direction: "next" | "prev" = delta > 0 ? "next" : "prev";

      if (!getAdjacentSectionId(direction)) return;

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

      if (!getAdjacentSectionId(direction)) return;

      event.preventDefault();
      goToSection(direction);
    };

    let touchStartY = 0;

    const onTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? 0;
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (prefersReducedMotion || snapLocked) return;

      const touch = event.changedTouches[0];
      if (!touch) return;

      const deltaY = touchStartY - touch.clientY;
      if (Math.abs(deltaY) < 40) return;

      const direction: "next" | "prev" = deltaY > 0 ? "next" : "prev";
      if (!getAdjacentSectionId(direction)) return;

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
      clearTimeout(snapUnlockTimer);
    };
  }, []);
}
