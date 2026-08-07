"use client";

import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-10 px-4 sm:px-6 lg:px-8 border-t border-white/10 max-w-4xl mx-auto text-xs font-mono">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-[#9CA3AF]">
          © {new Date().getFullYear()} Sagnik Chandra. M.Sc. Data Science & AI @ RKMVERI.
        </div>

        <div className="flex items-center gap-4 text-[#9CA3AF]">
          <a
            href="https://github.com/csagnik1302"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/sagnik-chandra-52b0a111a/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://medium.com/@sagnikchandra-65680"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Medium
          </a>
          <button
            onClick={scrollToTop}
            className="p-1.5 rounded bg-[#1C1E24] border border-white/10 hover:text-white text-[#9CA3AF] transition-all ml-2"
            title="Back to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
