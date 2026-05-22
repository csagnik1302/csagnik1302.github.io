"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const sectionLinks = [
  { label: "Education", href: "#education" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export function TopSectionNav() {
  const navRef = useRef<HTMLElement>(null);
  const [isFrozen, setIsFrozen] = useState(false);

  useEffect(() => {
    const updateNav = () => {
      const heroSection = document.getElementById("top");
      if (!heroSection) return;

      const heroRect = heroSection.getBoundingClientRect();
      const heroBottom = heroRect.bottom;

      setIsFrozen(heroBottom < 0);
    };

    updateNav();
    window.addEventListener("scroll", updateNav, { passive: true });
    window.addEventListener("resize", updateNav);

    return () => {
      window.removeEventListener("scroll", updateNav);
      window.removeEventListener("resize", updateNav);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className={cn(
        "sticky top-0 z-50 px-4 transition-all duration-300",
        isFrozen
          ? "border-b border-border/70 bg-black/95 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex min-h-16 max-w-4xl flex-col justify-center gap-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:py-0">
        <a
          href="#top"
          className={cn(
            "whitespace-nowrap text-sm font-semibold tracking-wide text-foreground hover:text-primary transition-opacity duration-300",
            isFrozen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          Sagnik Chandra
        </a>
        <div
          className="flex gap-1 overflow-x-auto pb-1 sm:justify-end sm:pb-0"
          aria-label="Portfolio sections"
        >
          {sectionLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-md px-3 py-2 text-xs font-medium uppercase tracking-widest text-muted-foreground transition-colors hover:bg-secondary/80 hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
