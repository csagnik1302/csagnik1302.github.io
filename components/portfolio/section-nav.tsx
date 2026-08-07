"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Download } from "lucide-react";

const RESUME_URL = "https://drive.google.com/file/d/1rhio97CGMhq9xvoXZJAp88HLMmLWJHsi/view?usp=sharing";

export const sectionLinks = [
  { label: "About", href: "#top" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Stack", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export function TopSectionNav() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 px-4 sm:px-8 transition-all duration-300",
        isScrolled
          ? "border-b border-white/10 bg-[#0E0F12]/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto max-w-4xl flex h-16 items-center justify-between gap-4">
        {/* Brand Logo */}
        <a
          href="#top"
          className="text-sm font-bold tracking-tight text-white hover:text-blue-400 transition-colors font-mono"
        >
          Sagnik Chandra
        </a>

        {/* Desktop Nav Links */}
        <nav aria-label="Portfolio sections" className="hidden sm:flex items-center gap-1">
          {sectionLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3 py-1.5 text-xs font-mono text-[#9CA3AF] hover:text-white hover:bg-white/5 rounded-md transition-all"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action Button */}
        <a
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-white font-mono text-xs transition-all"
        >
          <span>Resume</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </header>
  );
}
