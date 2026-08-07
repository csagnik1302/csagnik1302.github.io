"use client";

import { Github, Linkedin, Mail, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-10 px-4 sm:px-6 lg:px-8 border-t border-white/10 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs font-semibold text-[#A09D9A]">
          © {new Date().getFullYear()} Sagnik Chandra. Designed with <span className="text-[#C5FF41]">Sawad</span> aesthetics.
        </p>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/csagnik1302"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#A09D9A] hover:text-[#C5FF41] transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="https://linkedin.com/in/sagnik-chandra"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#A09D9A] hover:text-[#C5FF41] transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href="mailto:sagnikchandra@gmail.com"
            className="text-[#A09D9A] hover:text-[#C5FF41] transition-colors"
            aria-label="Email"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}

