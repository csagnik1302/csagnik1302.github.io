"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  getActiveSectionId,
  navigateToSection,
  syncNavHeightCssVar,
  type PortfolioSectionId,
} from "@/lib/section-scroll";
import { ArrowUpRight, FileText } from "lucide-react";

export const sectionLinks = [
  { label: "Home", href: "#top", id: "top" as const },
  { label: "Projects", href: "#projects", id: "projects" as const },
  { label: "Experience", href: "#experience", id: "experience" as const },
  { label: "Tools", href: "#skills", id: "skills" as const },
  { label: "Education", href: "#education", id: "education" as const },
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
        "sticky top-0 z-50 px-4 sm:px-8 transition-all duration-300",
        isScrolled
          ? "border-b border-[#262422] bg-[#151312]/90 backdrop-blur-xl shadow-xl shadow-black/50"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto max-w-5xl flex h-20 items-center justify-between gap-4">
        {/* Logo */}
        <a
          href="#top"
          onClick={(event) => handleSectionClick(event, "top")}
          className="text-lg font-extrabold tracking-tight text-white hover:text-[#C5FF41] transition-colors shrink-0"
        >
          Sagnik Chandra
        </a>

        {/* Links */}
        <nav aria-label="Portfolio sections" className="hidden md:flex items-center gap-1 sm:gap-2">
          {sectionLinks.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => handleSectionClick(event, item.id)}
                className={cn(
                  "px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all rounded-full",
                  isActive
                    ? "text-[#C5FF41] bg-[#C5FF41]/10 font-bold"
                    : "text-[#998F8F] hover:text-white hover:bg-white/5",
                )}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <a
            href="https://drive.google.com/file/d/1WQbgbyJrzaFKWTBsYNEjE1d6Af7Wl4kO/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#C5FF41] text-[#151312] font-bold text-xs hover:bg-[#d6ff66] transition-all shadow-[0_0_15px_rgba(197,255,65,0.25)]"
          >
            <span>Resume</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
}


