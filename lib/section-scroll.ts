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

/** One physical wheel gesture = at most one section change. */
const WHEEL_BURST_IDLE_MS = 1400;

let currentSectionIndex = 0;
let wheelBurstActive = false;
let wheelBurstTimer: ReturnType<typeof setTimeout> | null = null;

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

/** Update nav height CSS variable only (safe to call on scroll). */
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

/** Live scroll position for a section (always read from current layout). */
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

/** Fixed-duration lock — do not extend on every wheel tick (trackpad momentum never ends). */
function startWheelBurstLock(): void {
  if (wheelBurstTimer) {
    clearTimeout(wheelBurstTimer);
  }

  wheelBurstActive = true;

  wheelBurstTimer = setTimeout(() => {
    wheelBurstActive = false;
    wheelBurstTimer = null;
  }, WHEEL_BURST_IDLE_MS);
}

/**
 * Section that occupies the most space in the viewport (for nav + navigation).
 */
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

export function runOncePerWheelBurst(action: () => void): void {
  if (wheelBurstActive) {
    return;
  }

  startWheelBurstLock();
  action();
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
  startWheelBurstLock();
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

  const direction: "next" | "prev" = delta > 0 ? "next" : "prev";

  if (wheelBurstActive) {
    event.preventDefault();
    return;
  }

  if (!canNavigateInDirection(direction)) {
    return;
  }

  event.preventDefault();

  runOncePerWheelBurst(() => {
    navigateInDirection(direction);
  });
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
    if (wheelBurstTimer) {
      clearTimeout(wheelBurstTimer);
      wheelBurstTimer = null;
    }
    wheelBurstActive = false;
  };
}
