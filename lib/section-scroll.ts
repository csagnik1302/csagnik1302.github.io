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
const BOUNDARY_THRESHOLD_PX = 16;

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

/** Maximum scrollY while keeping the section top aligned under the nav. */
export function getSectionScrollBottom(section: HTMLElement): number {
  const top = getSectionScrollTop(section);
  const maxScroll = top + section.offsetHeight - window.innerHeight;
  return Math.max(top, maxScroll);
}

export function isSectionTopAligned(
  section: HTMLElement,
  threshold = BOUNDARY_THRESHOLD_PX,
): boolean {
  const navOffset = getNavOffset();
  const { top } = section.getBoundingClientRect();
  return top >= navOffset - threshold && top <= navOffset + threshold;
}

export function isSectionBottomAligned(
  section: HTMLElement,
  threshold = BOUNDARY_THRESHOLD_PX,
): boolean {
  const { bottom } = section.getBoundingClientRect();
  const viewportBottom = window.innerHeight;
  return (
    bottom >= viewportBottom - threshold &&
    bottom <= viewportBottom + threshold
  );
}

/** Section whose top/bottom edge is aligned with the viewport snap line. */
export function getSectionAtBoundary(
  direction: "next" | "prev",
): PortfolioSectionId | null {
  for (const id of PORTFOLIO_SECTION_IDS) {
    const section = getSectionElement(id);
    if (!section) continue;

    const aligned =
      direction === "next"
        ? isSectionBottomAligned(section)
        : isSectionTopAligned(section);

    if (aligned) return id;
  }

  return null;
}

export function canSnapToAdjacentSection(
  direction: "next" | "prev",
): boolean {
  const atBoundary = getSectionAtBoundary(direction);
  if (!atBoundary) return false;

  const index = getSectionIndex(atBoundary);
  return direction === "next"
    ? index < PORTFOLIO_SECTION_IDS.length - 1
    : index > 0;
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

export function scrollToSectionBottom(
  id: PortfolioSectionId,
  behavior: ScrollBehavior = "smooth",
): void {
  const section = getSectionElement(id);
  if (!section) return;

  window.scrollTo({
    top: getSectionScrollBottom(section),
    behavior,
  });

  updateSectionHash(id, behavior);
}

export function scrollToAdjacentSection(
  direction: "next" | "prev",
  behavior: ScrollBehavior = "smooth",
): boolean {
  const fromSection = getSectionAtBoundary(direction);
  if (!fromSection) return false;

  const fromIndex = getSectionIndex(fromSection);
  const targetIndex = direction === "next" ? fromIndex + 1 : fromIndex - 1;
  const target = PORTFOLIO_SECTION_IDS[targetIndex];
  if (!target) return false;

  if (direction === "next") {
    scrollToSection(target, behavior);
  } else {
    scrollToSectionBottom(target, behavior);
  }

  return true;
}

export function getActiveSectionId(): PortfolioSectionId {
  const marker = window.scrollY + getNavOffset() + 8;
  let active: PortfolioSectionId = PORTFOLIO_SECTION_IDS[0];

  for (const id of PORTFOLIO_SECTION_IDS) {
    const section = getSectionElement(id);
    if (!section) continue;

    const sectionTop =
      window.scrollY + section.getBoundingClientRect().top;
    if (sectionTop <= marker) {
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
  const current = getActiveSectionId();
  const index = getSectionIndex(current);

  if (direction === "next") {
    return PORTFOLIO_SECTION_IDS[index + 1] ?? null;
  }

  return PORTFOLIO_SECTION_IDS[index - 1] ?? null;
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
