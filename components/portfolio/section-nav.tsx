"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Sparkles, Brain, Download } from "lucide-react";

const RESUME_URL = "https://drive.google.com/file/d/1rhio97CGMhq9xvoXZJAp88HLMmLWJHsi/view?usp=sharing";

export const sectionLinks = [
  { label: "Home", href: "#top", id: "top" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Journey", href: "#journey", id: "journey" },
  { label: "Stack", href: "#skills", id: "skills" },
  { label: "CLI Terminal", href: "#terminal", id: "terminal" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export function TopSectionNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("top");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const sections = sectionLinks.map((item) => item.id);
      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sec);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 px-4 sm:px-8 transition-all duration-300",
        isScrolled
          ? "border-b border-white/10 bg-[#0B0F17]/85 backdrop-blur-xl shadow-2xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto max-w-6xl flex h-16 sm:h-20 items-center justify-between gap-4">
        {/* Brand Logo */}
        <a
          href="#top"
          className="flex items-center gap-2 font-mono text-base font-black tracking-tight text-white hover:text-[#C5FF41] transition-colors"
        >
          <div className="w-7 h-7 rounded-lg bg-[#C5FF41]/10 border border-[#C5FF41]/30 flex items-center justify-center text-[#C5FF41]">
            <Brain className="w-4 h-4" />
          </div>
          <span>Sagnik.ai</span>
        </a>

        {/* Desktop Nav Links */}
        <nav aria-label="Portfolio sections" className="hidden md:flex items-center gap-1">
          {sectionLinks.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3.5 py-1.5 text-xs font-mono font-bold uppercase tracking-wider transition-all rounded-full",
                  isActive
                    ? "text-[#C5FF41] bg-[#C5FF41]/15 border border-[#C5FF41]/30 shadow-[0_0_10px_rgba(197,255,65,0.15)]"
                    : "text-[#94A3B8] hover:text-white hover:bg-white/5"
                )}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#C5FF41] text-[#0B0F17] font-mono font-black text-xs hover:bg-[#d6ff66] transition-all shadow-[0_0_15px_rgba(197,255,65,0.25)]"
          >
            <span>Resume</span>
            <Download className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
}
