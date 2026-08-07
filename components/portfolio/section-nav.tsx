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
  const [activeSection, setActiveSection] = useState<PortfolioSectionId>("top");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateNav = () => {
      syncNavHeightCssVar();
      setIsScrolled(window.scrollY > 20);
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
    <header
      ref={navRef}
      data-section-nav
      className={cn(
        "sticky top-0 z-50 px-6 lg:px-0 transition-all duration-300",
        isScrolled
          ? "border-b border-[#262422] bg-[#151312]/95 backdrop-blur-md shadow-lg shadow-black/40"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto max-w-4xl flex h-16 items-center justify-between">
        <a
          href="#top"
          onClick={(event) => handleSectionClick(event, "top")}
          className="text-base font-bold tracking-tight text-white hover:text-[#C5FF41] transition-colors"
        >
          Sagnik Chandra
        </a>

        <nav aria-label="Portfolio sections" className="flex items-center gap-1 sm:gap-2">
          {sectionLinks.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => handleSectionClick(event, item.id)}
                className={cn(
                  "px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors rounded-md",
                  isActive
                    ? "text-[#C5FF41] font-bold"
                    : "text-[#998F8F] hover:text-white",
                )}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

