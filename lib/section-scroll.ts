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

/** Section used as the origin for wheel / keyboard section jumps. */
let scrollAnchor: PortfolioSectionId = "top";

export function getScrollAnchor(): PortfolioSectionId {
  return scrollAnchor;
}

export function setScrollAnchor(id: PortfolioSectionId): void {
  scrollAnchor = id;
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

export function getSectionScrollTop(section: HTMLElement): number {
  const top = window.scrollY + section.getBoundingClientRect().top;
  return Math.max(0, top - getNavOffset());
}

function updateSectionHash(
  id: PortfolioSectionId,
  behavior: ScrollBehavior,
): void {
  if (behavior === "auto") {
    history.replaceState(null, "", `#${id}`);
  } else {
    window.setTimeout(() => {
      history.replaceState(null, "", `#${id}`);
    }, 400);
  }
}

export function scrollToSection(
  id: PortfolioSectionId,
  behavior: ScrollBehavior = "smooth",
): void {
  const section = getSectionElement(id);
  if (!section) return;

  window.scrollTo({
    top: getSectionScrollTop(section),
    behavior,
  });

  setScrollAnchor(id);
  updateSectionHash(id, behavior);
}

export function getSectionIndex(id: PortfolioSectionId): number {
  return PORTFOLIO_SECTION_IDS.indexOf(id);
}

/**
 * Fallback when no anchor is set — biased by scroll direction so
 * education → introduction is detected reliably when scrolling up.
 */
export function detectSectionForDirection(
  direction: "next" | "prev",
): PortfolioSectionId {
  const navOffset = getNavOffset();
  const contentHeight = window.innerHeight - navOffset;
  const bias = direction === "prev" ? 0.12 : 0.45;
  const referenceLine = window.scrollY + navOffset + contentHeight * bias;

  let index = 0;

  for (let i = 0; i < PORTFOLIO_SECTION_IDS.length; i++) {
    const id = PORTFOLIO_SECTION_IDS[i];
    const section = getSectionElement(id);
    if (!section) continue;

    if (getSectionScrollTop(section) <= referenceLine + 6) {
      index = i;
    }
  }

  return PORTFOLIO_SECTION_IDS[index];
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

export function getAdjacentSectionId(
  direction: "next" | "prev",
  fromSection: PortfolioSectionId = scrollAnchor,
): PortfolioSectionId | null {
  const index = getSectionIndex(fromSection);

  if (direction === "next") {
    return PORTFOLIO_SECTION_IDS[index + 1] ?? null;
  }

  return PORTFOLIO_SECTION_IDS[index - 1] ?? null;
}

export function scrollToAdjacentSection(
  direction: "next" | "prev",
  behavior: ScrollBehavior = "smooth",
  fromSection: PortfolioSectionId = scrollAnchor,
): boolean {
  const target = getAdjacentSectionId(direction, fromSection);
  if (!target) return false;

  scrollToSection(target, behavior);
  return true;
}

export function initScrollAnchor(preferred?: PortfolioSectionId): void {
  if (preferred) {
    setScrollAnchor(preferred);
    return;
  }

  setScrollAnchor(getActiveSectionId());
}

export function navigateToSection(
  id: PortfolioSectionId,
  event?: { preventDefault: () => void },
): void {
  event?.preventDefault();
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  scrollToSection(id, prefersReducedMotion ? "auto" : "smooth");
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
