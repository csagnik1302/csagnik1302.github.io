"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const sectionLinks = [
  { label: "Education", href: "#education" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

interface SectionLinksProps {
  className?: string;
}

export function SectionLinks({ className }: SectionLinksProps) {
  return (
    <nav className={cn("space-y-3", className)} aria-label="Portfolio sections">
      {sectionLinks.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="group flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
        >
          <span className="h-px w-8 bg-muted-foreground transition-all group-hover:w-16 group-hover:bg-foreground" />
          <span className="text-sm font-medium uppercase tracking-widest">
            {item.label}
          </span>
        </a>
      ))}
    </nav>
  );
}

export function FloatingSectionNav() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.65);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  return (
    <nav
      aria-label="Sticky portfolio sections"
      className={cn(
        "fixed z-40 rounded-lg border border-border/70 bg-background/80 p-2 shadow-lg shadow-black/20 backdrop-blur-md transition-all duration-300",
        "bottom-4 left-4 right-4 flex justify-center gap-1 overflow-x-auto sm:left-1/2 sm:right-auto sm:-translate-x-1/2",
        "lg:bottom-auto lg:left-[max(1rem,calc(50vw-35rem))] lg:top-1/2 lg:-translate-x-0 lg:-translate-y-1/2 lg:flex-col lg:items-stretch",
        isVisible
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none translate-y-3 opacity-0 lg:translate-y-[calc(-50%+0.75rem)]"
      )}
    >
      {sectionLinks.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="rounded-md px-3 py-2 text-xs font-medium uppercase tracking-widest text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
