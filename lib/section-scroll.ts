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

  updateSectionHash(id, behavior);
}

/** Section whose start is closest to the current scroll position (under the nav). */
export function getActiveSectionId(): PortfolioSectionId {
  const scrollLine = window.scrollY + getNavOffset() + 1;
  let active: PortfolioSectionId = PORTFOLIO_SECTION_IDS[0];

  for (const id of PORTFOLIO_SECTION_IDS) {
    const section = getSectionElement(id);
    if (!section) continue;

    if (getSectionScrollTop(section) <= scrollLine) {
      active = id;
    }
  }

  return active;
}

export function getSectionIndex(id: PortfolioSectionId): number {
  return PORTFOLIO_SECTION_IDS.indexOf(id);
}

export function getAdjacentSectionId(
  direction: "next" | "prev",
): PortfolioSectionId | null {
  const index = getSectionIndex(getActiveSectionId());

  if (direction === "next") {
    return PORTFOLIO_SECTION_IDS[index + 1] ?? null;
  }

  return PORTFOLIO_SECTION_IDS[index - 1] ?? null;
}

export function scrollToAdjacentSection(
  direction: "next" | "prev",
  behavior: ScrollBehavior = "smooth",
): boolean {
  const target = getAdjacentSectionId(direction);
  if (!target) return false;

  scrollToSection(target, behavior);
  return true;
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
