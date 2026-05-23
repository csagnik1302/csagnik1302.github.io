"use client";

import { useEffect } from "react";
import {
  canSnapToAdjacentSection,
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

const SNAP_COOLDOWN_MS = 1000;
const WHEEL_SNAP_ACCUM_THRESHOLD = 36;
const WHEEL_SNAP_INSTANT_DELTA = 48;
const TOUCH_SNAP_THRESHOLD_PX = 45;
const WHEEL_ACCUM_RESET_MS = 140;

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
      }, SNAP_COOLDOWN_MS);
    };

    const trySnap = (direction: "next" | "prev"): boolean => {
      if (snapLocked || !canSnapToAdjacentSection(direction)) return false;
      const didSnap = scrollToAdjacentSection(direction, scrollBehavior);
      if (didSnap) lockSnap();
      return didSnap;
    };

    let wheelAccum = 0;
    let wheelAccumDirection: "next" | "prev" | null = null;
    let wheelAccumResetTimer: ReturnType<typeof setTimeout> | undefined;

    const resetWheelAccum = () => {
      wheelAccum = 0;
      wheelAccumDirection = null;
      clearTimeout(wheelAccumResetTimer);
    };

    const onWheel = (event: WheelEvent) => {
      if (prefersReducedMotion) return;

      if (snapLocked) {
        event.preventDefault();
        return;
      }

      const delta = normalizeWheelDelta(event);
      if (delta === 0) return;

      const direction: "next" | "prev" = delta > 0 ? "next" : "prev";

      if (!canSnapToAdjacentSection(direction)) {
        resetWheelAccum();
        return;
      }

      event.preventDefault();

      if (wheelAccumDirection !== direction) {
        wheelAccumDirection = direction;
        wheelAccum = 0;
      }

      wheelAccum += delta;

      clearTimeout(wheelAccumResetTimer);
      wheelAccumResetTimer = setTimeout(resetWheelAccum, WHEEL_ACCUM_RESET_MS);

      const shouldSnap =
        Math.abs(wheelAccum) >= WHEEL_SNAP_ACCUM_THRESHOLD ||
        Math.abs(delta) >= WHEEL_SNAP_INSTANT_DELTA;

      if (shouldSnap && trySnap(direction)) {
        resetWheelAccum();
      }
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

      if (!canSnapToAdjacentSection(direction)) return;

      event.preventDefault();
      trySnap(direction);
    };

    let touchBoundaryDelta = 0;
    let touchDirection: "next" | "prev" | null = null;
    let lastTouchY: number | null = null;

    const resetTouchSnap = () => {
      touchBoundaryDelta = 0;
      touchDirection = null;
    };

    const onTouchStart = (event: TouchEvent) => {
      resetTouchSnap();
      lastTouchY = event.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (snapLocked) {
        event.preventDefault();
        return;
      }

      if (
        prefersReducedMotion ||
        event.touches.length !== 1 ||
        lastTouchY === null
      ) {
        return;
      }

      const touchY = event.touches[0].clientY;
      const deltaY = lastTouchY - touchY;
      lastTouchY = touchY;

      if (Math.abs(deltaY) < 1) return;

      const direction: "next" | "prev" = deltaY > 0 ? "next" : "prev";

      if (!canSnapToAdjacentSection(direction)) {
        resetTouchSnap();
        return;
      }

      if (touchDirection !== direction) {
        touchDirection = direction;
        touchBoundaryDelta = 0;
      }

      touchBoundaryDelta += deltaY;

      if (Math.abs(touchBoundaryDelta) >= TOUCH_SNAP_THRESHOLD_PX) {
        event.preventDefault();
        if (trySnap(direction)) {
          resetTouchSnap();
        }
      } else if (Math.abs(touchBoundaryDelta) > 8) {
        event.preventDefault();
      }
    };

    const onTouchEnd = () => {
      lastTouchY = null;
      resetTouchSnap();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
      resizeObserver?.disconnect();
      clearTimeout(snapUnlockTimer);
      clearTimeout(wheelAccumResetTimer);
    };
  }, []);
}
