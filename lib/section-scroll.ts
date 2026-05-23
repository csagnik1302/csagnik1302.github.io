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

/** Scroll position that aligns a section at the top (under the nav). */
export function getTargetScrollTop(id: PortfolioSectionId): number {
  if (id === "top") {
    return 0;
  }

  const section = getSectionElement(id);
  if (!section) return 0;

  return getSectionScrollTop(section);
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
  onComplete?: () => void,
): void {
  const scrollTop = getTargetScrollTop(id);

  window.scrollTo({
    top: scrollTop,
    behavior,
  });

  const finish = () => {
    setScrollAnchor(id);
    updateSectionHash(id, behavior);
    onComplete?.();
  };

  if (behavior === "auto") {
    finish();
    return;
  }

  let completed = false;
  const completeOnce = () => {
    if (completed) return;
    completed = true;
    finish();
  };

  if (typeof window !== "undefined" && "onscrollend" in window) {
    window.addEventListener("scrollend", completeOnce, { once: true });
  }

  window.setTimeout(completeOnce, 1200);
}

export function getSectionIndex(id: PortfolioSectionId): number {
  return PORTFOLIO_SECTION_IDS.indexOf(id);
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
