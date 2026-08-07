import { Github, Linkedin, Mail, FileText, ArrowUpRight, Sparkles, Brain, Cpu, Database, Network } from "lucide-react";
import { ScrollReveal } from "@/components/portfolio/scroll-reveal";

export function Hero() {
  return (
    <section id="top" className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto min-h-screen flex flex-col justify-center">
      <ScrollReveal className="space-y-8">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#C5FF41]/10 border border-[#C5FF41]/30 backdrop-blur-md">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5FF41] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#C5FF41]"></span>
          </span>
          <span className="text-xs font-bold text-[#C5FF41] uppercase tracking-wider">
            Available for Full-time Roles & Collaborations
          </span>
        </div>

        {/* Hero Title */}
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
            Sagnik <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5FF41] via-[#d6ff66] to-[#F46C38]">Chandra</span>
          </h1>
          <p className="text-xl sm:text-2xl font-semibold text-[#A09D9A] max-w-2xl">
            Machine Learning, NLP & Massive Data Systems Researcher
          </p>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2 pt-1">
          <span className="sawad-pill">
            <Brain className="w-3.5 h-3.5" /> Deep Learning & NLP
          </span>
          <span className="sawad-pill-orange">
            <Network className="w-3.5 h-3.5" /> Citation Graph Mining
          </span>
          <span className="sawad-pill-cyan">
            <Database className="w-3.5 h-3.5" /> PySpark & Big Data
          </span>
          <span className="sawad-pill">
            <Cpu className="w-3.5 h-3.5" /> PyTorch Architecture
          </span>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
          {/* Card 1: Bio (Spans 2 cols) */}
          <div className="md:col-span-2 sawad-card p-6 sm:p-8 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <span className="text-xs font-bold text-[#F46C38] uppercase tracking-widest">About Me</span>
              <p className="text-base sm:text-lg text-[#E5E5E5] leading-relaxed font-normal">
                Hello! I&apos;m Sagnik. I specialize in <strong className="text-white font-semibold">Machine Learning</strong>, <strong className="text-white font-semibold">NLP</strong>, and mining massive datasets to extract structure and intelligence at scale.
              </p>
              <p className="text-sm text-[#A09D9A] leading-relaxed">
                Most of my work revolves around building models from scratch, reading research papers, and exploring how information emerges in complex graphs. When off the screen, I delve into philosophy, psychology, and non-fiction.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://drive.google.com/file/d/1WQbgbyJrzaFKWTBsYNEjE1d6Af7Wl4kO/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="sawad-btn-lime group"
              >
                <FileText className="w-4 h-4" />
                <span>View Resume</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="mailto:sagnikchandra@gmail.com"
                className="sawad-btn-dark"
              >
                <Mail className="w-4 h-4" />
                <span>Contact</span>
              </a>
            </div>
          </div>

          {/* Card 2: Quick Highlights & Socials */}
          <div className="sawad-card p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-bold text-[#C5FF41] uppercase tracking-widest">Current Focus</span>
              <div className="mt-3 space-y-3">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="text-xs text-[#A09D9A]">Degree</div>
                  <div className="text-sm font-bold text-white mt-0.5">M.Sc. Data Science & AI</div>
                  <div className="text-xs text-[#C5FF41] mt-0.5">RKMVERI, Belur</div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="text-xs text-[#A09D9A]">Key Metric</div>
                  <div className="text-sm font-bold text-white mt-0.5">10M+ Papers Graph</div>
                  <div className="text-xs text-[#F46C38] mt-0.5">Citation Analytics</div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <div className="text-xs font-semibold text-[#A09D9A] mb-3">Connect With Me</div>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/csagnik1302"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full bg-white/5 hover:bg-[#C5FF41] hover:text-[#0E0D0D] border border-white/10 flex items-center justify-center transition-all duration-300 text-white"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com/in/sagnik-chandra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full bg-white/5 hover:bg-[#C5FF41] hover:text-[#0E0D0D] border border-white/10 flex items-center justify-center transition-all duration-300 text-white"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="mailto:sagnikchandra@gmail.com"
                  className="h-10 w-10 rounded-full bg-white/5 hover:bg-[#C5FF41] hover:text-[#0E0D0D] border border-white/10 flex items-center justify-center transition-all duration-300 text-white"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

