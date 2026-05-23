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

let currentSectionIndex = 0;

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
  rebuildSectionScrollPositions();
}

export function getSectionElement(
  id: PortfolioSectionId,
): HTMLElement | null {
  return document.getElementById(id);
}

export function getSectionIndex(id: PortfolioSectionId): number {
  return PORTFOLIO_SECTION_IDS.indexOf(id);
}

let cachedSectionTops: Partial<Record<PortfolioSectionId, number>> | null =
  null;

export function rebuildSectionScrollPositions(): void {
  const navOffset = getNavOffset();
  const tops: Partial<Record<PortfolioSectionId, number>> = { top: 0 };

  for (const id of PORTFOLIO_SECTION_IDS) {
    if (id === "top") continue;

    const section = getSectionElement(id);
    if (!section) continue;

    tops[id] = Math.max(
      0,
      section.getBoundingClientRect().top + window.scrollY - navOffset,
    );
  }

  cachedSectionTops = tops;
}

/** Stable document scroll position for a section. */
export function getTargetScrollTop(id: PortfolioSectionId): number {
  if (!cachedSectionTops) {
    rebuildSectionScrollPositions();
  }

  return cachedSectionTops?.[id] ?? 0;
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

export function getTargetSectionForDirection(
  direction: "next" | "prev",
): PortfolioSectionId | null {
  const nextIndex =
    direction === "next"
      ? currentSectionIndex + 1
      : currentSectionIndex - 1;

  if (nextIndex < 0 || nextIndex >= PORTFOLIO_SECTION_IDS.length) {
    return null;
  }

  return PORTFOLIO_SECTION_IDS[nextIndex];
}

/** Section that occupies the most space in the viewport (for nav highlighting). */
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
