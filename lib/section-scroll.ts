export const PORTFOLIO_SECTION_IDS = [
  "top",
  "education",
  "experience",
  "projects",
  "skills",
  "contact",
] as const;

export type PortfolioSectionId = (typeof PORTFOLIO_SECTION_IDS)[number];

const NAV_SELECTOR = "[data-section-nav]";

/**
 * Wheel events closer than this are one physical gesture (one section change).
 * A pause longer than this allows the next gesture immediately.
 * Different values for trackpad vs mouse wheel.
 */
const WHEEL_BURST_GAP_MS_MOUSE = 120;
const WHEEL_BURST_GAP_MS_TRACKPAD = 50;

/**
 * Simple debounce time for trackpad - ignore all events for this duration after navigation
 * Increased to 800ms to ensure even large swipes only trigger one section change
 */
const TRACKPAD_DEBOUNCE_MS = 1500;

let currentSectionIndex = 0;
let lastWheelTimestamp = 0;
let navigatedInCurrentBurst = false;
let lastTrackpadNavTimestamp = 0;

export function getCurrentSectionIndex(): number {
  return currentSectionIndex;
}

export function getCurrentSectionId(): PortfolioSectionId {
  return PORTFOLIO_SECTION_IDS[currentSectionIndex];
}

export function setCurrentSectionIndex(index: number): void {
  const clamped = Math.max(
    0,
    Math.min(index, PORTFOLIO_SECTION_IDS.length - 1),
  );
  currentSectionIndex = clamped;
}

export function setCurrentSectionId(id: PortfolioSectionId): void {
  setCurrentSectionIndex(PORTFOLIO_SECTION_IDS.indexOf(id));
}

export function getNavOffset(): number {
  const nav = document.querySelector<HTMLElement>(NAV_SELECTOR);
  return nav?.getBoundingClientRect().height ?? 104;
}

export function syncNavHeightCssVar(): void {
  document.documentElement.style.setProperty(
    "--nav-height",
    `${getNavOffset()}px`,
  );
}

export function getSectionElement(
  id: PortfolioSectionId,
): HTMLElement | null {
  return document.getElementById(id);
}

export function getSectionIndex(id: PortfolioSectionId): number {
  return PORTFOLIO_SECTION_IDS.indexOf(id);
}

export function getTargetScrollTop(id: PortfolioSectionId): number {
  if (id === "top") {
    return 0;
  }

  const section = getSectionElement(id);
  if (!section) return 0;

  const navOffset = getNavOffset();
  return Math.max(
    0,
    section.getBoundingClientRect().top + window.scrollY - navOffset,
  );
}

function updateSectionHash(id: PortfolioSectionId): void {
  history.replaceState(null, "", `#${id}`);
}

function applyScrollPosition(top: number): void {
  window.scrollTo({ top, left: 0, behavior: "auto" });
  document.documentElement.scrollTop = top;
  document.body.scrollTop = top;
}

function waitUntilScrollSettles(
  targetTop: number,
  onSettled: () => void,
): void {
  const deadline = Date.now() + 1800;

  const tick = () => {
    const delta = Math.abs(window.scrollY - targetTop);

    if (delta <= 2 || Date.now() >= deadline) {
      if (delta > 2) {
        applyScrollPosition(targetTop);
      }
      onSettled();
      return;
    }

    requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}

export function scrollToSection(
  id: PortfolioSectionId,
  onComplete?: () => void,
): void {
  const index = getSectionIndex(id);
  const targetTop = getTargetScrollTop(id);

  applyScrollPosition(targetTop);

  waitUntilScrollSettles(targetTop, () => {
    applyScrollPosition(targetTop);
    setCurrentSectionIndex(index);
    updateSectionHash(id);
    onComplete?.();
  });
}

function resetWheelBurst(): void {
  navigatedInCurrentBurst = false;
}

export function getActiveSectionId(): PortfolioSectionId {
  const navOffset = getNavOffset();
  const viewportBottom = window.innerHeight;

  let active: PortfolioSectionId = PORTFOLIO_SECTION_IDS[0];
  let largestVisibleArea = -1;

  for (const id of PORTFOLIO_SECTION_IDS) {
    const section = getSectionElement(id);
    if (!section) continue;

    const rect = section.getBoundingClientRect();
    const visibleTop = Math.max(rect.top, navOffset);
    const visibleBottom = Math.min(rect.bottom, viewportBottom);
    const visibleArea = Math.max(0, visibleBottom - visibleTop);

    const index = getSectionIndex(id);
    const activeIndex = getSectionIndex(active);

    if (
      visibleArea > largestVisibleArea ||
      (visibleArea === largestVisibleArea &&
        visibleArea > 0 &&
        index > activeIndex)
    ) {
      largestVisibleArea = visibleArea;
      active = id;
    }
  }

  return active;
}

export function canNavigateInDirection(direction: "next" | "prev"): boolean {
  const nextIndex =
    direction === "next"
      ? currentSectionIndex + 1
      : currentSectionIndex - 1;

  return nextIndex >= 0 && nextIndex < PORTFOLIO_SECTION_IDS.length;
}

export function navigateInDirection(direction: "next" | "prev"): boolean {
  const nextIndex =
    direction === "next"
      ? currentSectionIndex + 1
      : currentSectionIndex - 1;

  if (nextIndex < 0 || nextIndex >= PORTFOLIO_SECTION_IDS.length) {
    return false;
  }

  const targetId = PORTFOLIO_SECTION_IDS[nextIndex];
  setCurrentSectionIndex(nextIndex);
  scrollToSection(targetId);
  return true;
}

export function initCurrentSection(preferred?: PortfolioSectionId): void {
  if (preferred) {
    setCurrentSectionId(preferred);
    return;
  }

  setCurrentSectionId(getActiveSectionId());
}

export function navigateToSection(
  id: PortfolioSectionId,
  event?: { preventDefault: () => void },
): void {
  event?.preventDefault();
  resetWheelBurst();
  lastWheelTimestamp = Date.now();
  setCurrentSectionId(id);
  scrollToSection(id);
}

export function normalizeWheelDelta(event: WheelEvent): number {
  if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) {
    return event.deltaY * 16;
  }
  if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
    return event.deltaY * window.innerHeight;
  }
  return event.deltaY;
}

function onDocumentWheel(event: WheelEvent): void {
  const delta = normalizeWheelDelta(event);
  if (delta === 0) return;

  // Detect trackpad vs mouse wheel based on deltaMode and delta magnitude
  // Trackpads typically use DOM_DELTA_PIXEL (0) and have smaller deltas
  // Mouse wheels typically use DOM_DELTA_LINE (1) and have larger deltas
  const isTrackpadMode = event.deltaMode === WheelEvent.DOM_DELTA_PIXEL;
  const isSmallDelta = Math.abs(delta) < 15;
  const isTrackpad = isTrackpadMode || isSmallDelta;

  // For trackpad, use simple debounce-only approach
  if (isTrackpad) {
    const now = Date.now();
    const timeSinceLastNav = now - lastTrackpadNavTimestamp;

    if (timeSinceLastNav < TRACKPAD_DEBOUNCE_MS) {
      return;
    }

    const direction: "next" | "prev" = delta > 0 ? "next" : "prev";

    if (!canNavigateInDirection(direction)) {
      return;
    }

    event.preventDefault();
    lastTrackpadNavTimestamp = now;
    navigateInDirection(direction);
    return;
  }

  // Mouse wheel logic with burst detection
  const burstGapMs = WHEEL_BURST_GAP_MS_MOUSE;
  const minDelta = 10;

  if (Math.abs(delta) < minDelta) return;

  const direction: "next" | "prev" = delta > 0 ? "next" : "prev";
  const now = Date.now();
  const isNewBurst = now - lastWheelTimestamp > burstGapMs;

  lastWheelTimestamp = now;

  if (isNewBurst) {
    resetWheelBurst();
  }

  if (!canNavigateInDirection(direction)) {
    return;
  }

  event.preventDefault();

  if (navigatedInCurrentBurst) {
    return;
  }

  navigatedInCurrentBurst = true;
  navigateInDirection(direction);
}

export function attachSectionWheelHandler(): () => void {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  window.addEventListener("wheel", onDocumentWheel, {
    passive: false,
    capture: true,
  });

  return () => {
    window.removeEventListener("wheel", onDocumentWheel, { capture: true });
    resetWheelBurst();
    lastWheelTimestamp = 0;
  };
}
