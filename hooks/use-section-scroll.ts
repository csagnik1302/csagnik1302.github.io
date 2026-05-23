"use client";

import { useEffect } from "react";
import {
  getAdjacentSectionId,
  PORTFOLIO_SECTION_IDS,
  scrollToSection,
  syncNavHeightCssVar,
  type PortfolioSectionId,
} from "@/lib/section-scroll";

function isPortfolioSectionId(id: string): id is PortfolioSectionId {
  return (PORTFOLIO_SECTION_IDS as readonly string[]).includes(id);
}

const WHEEL_COOLDOWN_MS = 900;
const WHEEL_DELTA_THRESHOLD = 25;

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

    let wheelLocked = false;
    let wheelUnlockTimer: ReturnType<typeof setTimeout> | undefined;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const canUseWheelSnap = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;

    const lockWheel = () => {
      wheelLocked = true;
      clearTimeout(wheelUnlockTimer);
      wheelUnlockTimer = setTimeout(() => {
        wheelLocked = false;
      }, WHEEL_COOLDOWN_MS);
    };

    const onWheel = (event: WheelEvent) => {
      if (!canUseWheelSnap || prefersReducedMotion || wheelLocked) return;
      if (Math.abs(event.deltaY) < WHEEL_DELTA_THRESHOLD) return;

      const direction = event.deltaY > 0 ? "next" : "prev";
      const target = getAdjacentSectionId(direction);
      if (!target) return;

      event.preventDefault();
      lockWheel();
      scrollToSection(target, prefersReducedMotion ? "auto" : "smooth");
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const scrollKeys = ["ArrowDown", "ArrowUp", "PageDown", "PageUp", " "];
      if (!scrollKeys.includes(event.key)) return;

      event.preventDefault();

      const direction =
        event.key === "ArrowDown" ||
        event.key === "PageDown" ||
        event.key === " "
          ? "next"
          : "prev";

      const target = getAdjacentSectionId(direction);
      if (!target) return;

      scrollToSection(target, prefersReducedMotion ? "auto" : "smooth");
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      resizeObserver?.disconnect();
      clearTimeout(wheelUnlockTimer);
    };
  }, []);
}
