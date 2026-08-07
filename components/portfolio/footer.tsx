"use client";

import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-10 px-4 sm:px-6 lg:px-8 border-t border-[#262422] max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs font-bold text-[#998F8F]">
          © {new Date().getFullYear()} Sagnik Chandra — Machine Learning & AI Researcher.
        </p>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/csagnik1302"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#998F8F] hover:text-[#C5FF41] transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="https://linkedin.com/in/sagnik-chandra"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#998F8F] hover:text-[#C5FF41] transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href="mailto:sagnikchandra@gmail.com"
            className="text-[#998F8F] hover:text-[#C5FF41] transition-colors"
            aria-label="Email"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}


