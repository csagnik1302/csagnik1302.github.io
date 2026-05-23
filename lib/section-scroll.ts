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

  if (behavior === "auto") {
    history.replaceState(null, "", `#${id}`);
  } else {
    window.setTimeout(() => {
      history.replaceState(null, "", `#${id}`);
    }, 400);
  }
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
