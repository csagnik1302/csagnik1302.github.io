"use client";

import { Github, Linkedin, Mail, ArrowUp, Brain } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10 max-w-6xl mx-auto text-xs font-mono">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#C5FF41]/10 border border-[#C5FF41]/30 flex items-center justify-center text-[#C5FF41]">
            <Brain className="w-4 h-4" />
          </div>
          <div>
            <div className="text-sm font-black text-white">Sagnik Chandra</div>
            <p className="text-[11px] text-[#94A3B8]">M.Sc. Data Science & AI @ RKMVERI | ML Engineer & Researcher</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-[#94A3B8]">
          <a
            href="https://github.com/csagnik1302"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#C5FF41] transition-colors"
            title="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/sagnik-chandra-52b0a111a/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#C5FF41] transition-colors"
            title="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href="https://medium.com/@sagnikchandra-65680"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#C5FF41] transition-colors font-bold text-xs"
            title="Medium"
          >
            M
          </a>
          <a
            href="mailto:sagnikchandra@gmail.com"
            className="hover:text-[#C5FF41] transition-colors"
            title="Email"
          >
            <Mail className="h-4 w-4" />
          </a>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-[#121826] border border-white/10 hover:border-[#C5FF41] hover:text-[#C5FF41] transition-all ml-2"
            title="Back to Top"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-white/5 text-center text-[11px] text-[#64748B]">
        © {new Date().getFullYear()} Sagnik Chandra. Built with Next.js, Tailwind CSS, & AI Assistant.
      </div>
    </footer>
  );
}
