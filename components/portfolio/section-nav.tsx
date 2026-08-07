"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  getActiveSectionId,
  navigateToSection,
  syncNavHeightCssVar,
  type PortfolioSectionId,
} from "@/lib/section-scroll";
import { Sparkles } from "lucide-react";

export const sectionLinks = [
  { label: "About", href: "#top", id: "top" as const },
  { label: "Projects", href: "#projects", id: "projects" as const },
  { label: "Experience", href: "#experience", id: "experience" as const },
  { label: "Skills", href: "#skills", id: "skills" as const },
  { label: "Education", href: "#education", id: "education" as const },
  { label: "Contact", href: "#contact", id: "contact" as const },
];

export function TopSectionNav() {
  const navRef = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState<PortfolioSectionId>("top");

  useEffect(() => {
    const updateNav = () => {
      syncNavHeightCssVar();
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
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav
        ref={navRef}
        data-section-nav
        className="pointer-events-auto flex items-center justify-between gap-3 sm:gap-6 rounded-full bg-[#151414]/85 backdrop-blur-xl border border-white/10 px-4 py-2 sm:px-6 sm:py-2.5 shadow-2xl shadow-black/80 max-w-4xl w-full"
      >
        {/* Brand/Logo */}
        <a
          href="#top"
          onClick={(event) => handleSectionClick(event, "top")}
          className="flex items-center gap-2 group text-sm font-extrabold tracking-tight text-white shrink-0"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-[#C5FF41] animate-pulse shadow-[0_0_10px_#C5FF41]" />
          <span className="hidden sm:inline group-hover:text-[#C5FF41] transition-colors">Sagnik Chandra</span>
          <span className="sm:hidden group-hover:text-[#C5FF41] transition-colors">Sagnik</span>
        </a>

        {/* Links */}
        <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar py-0.5" aria-label="Portfolio sections">
          {sectionLinks.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => handleSectionClick(event, item.id)}
                className={cn(
                  "shrink-0 rounded-full px-3 py-1 text-xs font-semibold transition-all duration-300",
                  isActive
                    ? "bg-[#C5FF41] text-[#0E0D0D] shadow-[0_0_15px_rgba(197,255,65,0.4)] font-bold scale-105"
                    : "text-[#A09D9A] hover:text-white hover:bg-white/5",
                )}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Status Tag */}
        <div className="hidden md:flex items-center gap-1.5 shrink-0 text-[11px] font-semibold text-[#C5FF41] bg-[#C5FF41]/10 border border-[#C5FF41]/20 rounded-full px-3 py-1">
          <Sparkles className="w-3 h-3 text-[#C5FF41]" />
          <span>Open to Roles</span>
        </div>
      </nav>
    </header>
  );
}
