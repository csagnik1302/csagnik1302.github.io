"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  getActiveSectionId,
  navigateToSection,
  syncNavHeightCssVar,
  type PortfolioSectionId,
} from "@/lib/section-scroll";

export const sectionLinks = [
  { label: "Education", href: "#education", id: "education" as const },
  { label: "Experience", href: "#experience", id: "experience" as const },
  { label: "Projects", href: "#projects", id: "projects" as const },
  { label: "Skills", href: "#skills", id: "skills" as const },
  { label: "Contact", href: "#contact", id: "contact" as const },
];

export function TopSectionNav() {
  const navRef = useRef<HTMLElement>(null);
  const [isFrozen, setIsFrozen] = useState(false);
  const [activeSection, setActiveSection] =
    useState<PortfolioSectionId>("top");

  useEffect(() => {
    const updateNav = () => {
      const heroSection = document.getElementById("top");
      if (!heroSection) return;

      syncNavHeightCssVar();
      setIsFrozen(heroSection.getBoundingClientRect().top <= 0);
      setActiveSection(getActiveSectionId());
    };

    updateNav();

    let rafId = 0;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateNav);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateNav);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateNav);
    };
  }, []);

  const handleSectionClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: PortfolioSectionId,
  ) => {
    navigateToSection(id, event);
  };

  return (
    <nav
      ref={navRef}
      data-section-nav
      className={cn(
        "sticky top-0 z-50 px-4 transition-all duration-300",
        isFrozen
          ? "border-b border-border/70 bg-black/95 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto max-w-4xl">
        <div className="flex min-h-16 flex-col justify-center gap-2 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:py-0">
          <a
            href="#top"
            onClick={(event) => handleSectionClick(event, "top")}
            className={cn(
              "hidden sm:block whitespace-nowrap text-sm font-semibold tracking-wide text-foreground hover:text-primary transition-opacity duration-300",
              isFrozen ? "opacity-100" : "opacity-0 pointer-events-none",
            )}
          >
            Sagnik Chandra
          </a>
          <div
            className="flex gap-1 sm:gap-2 justify-center sm:justify-end min-w-0"
            aria-label="Portfolio sections"
          >
            {sectionLinks.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(event) => handleSectionClick(event, item.id)}
                  className={cn(
                    "flex-shrink-0 whitespace-nowrap rounded-md px-1 py-0.5 sm:px-3 sm:py-2 text-[0.7rem] sm:text-xs font-medium uppercase tracking-wider sm:tracking-widest transition-colors hover:bg-secondary/80 hover:text-foreground",
                    isActive
                      ? "font-bold text-foreground underline decoration-2 underline-offset-4"
                      : "text-muted-foreground",
                  )}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
