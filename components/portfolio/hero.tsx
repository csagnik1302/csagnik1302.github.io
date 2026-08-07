import { Github, Linkedin, Mail, FileText, ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/portfolio/scroll-reveal";

export function Hero() {
  return (
    <section id="top" className="py-16 sm:py-24 px-6 lg:px-0 max-w-4xl mx-auto min-h-[calc(100vh-4rem)] flex flex-col justify-center">
      <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16 items-start">
        {/* Left Column - Name and Social Links */}
        <ScrollReveal className="space-y-6">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Sagnik Chandra
            </h1>
            <p className="text-sm font-semibold text-[#C5FF41] mt-2">
              ML & AI Researcher
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4 pt-2">
            <a
              href="https://github.com/csagnik1302"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#998F8F] hover:text-[#C5FF41] transition-colors p-1"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/sagnik-chandra"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#998F8F] hover:text-[#C5FF41] transition-colors p-1"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:sagnikchandra@gmail.com"
              className="text-[#998F8F] hover:text-[#C5FF41] transition-colors p-1"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </ScrollReveal>

        {/* Right Column - Bio Paragraphs */}
        <ScrollReveal className="space-y-6 text-[#998F8F] leading-relaxed text-base sm:text-lg" delay={150}>
          <p className="text-white font-semibold text-xl">
            Hello
          </p>
          <p>
            I&apos;m Sagnik. I&apos;m interested in Machine Learning, NLP, and Mining various forms of Massive Datasets to extract relevant information.
          </p>
          <p>
            Much of my work revolves around understanding how information, language, and structure emerge at scale, through research, experimentation, and building systems from scratch.
          </p>
          <p className="text-sm text-[#877E7E]">
            Most of my days are split between coding, reading papers, and getting lost in books on philosophy, psychology, and non-fiction.
          </p>

          <div className="pt-4 flex items-center gap-4">
            <a
              href="https://drive.google.com/file/d/1WQbgbyJrzaFKWTBsYNEjE1d6Af7Wl4kO/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#C5FF41] text-[#C5FF41] font-semibold text-sm hover:bg-[#C5FF41] hover:text-[#151312] transition-all duration-200"
            >
              <FileText className="h-4 w-4" />
              <span>View Resume</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}


