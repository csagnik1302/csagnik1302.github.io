import Image from "next/image";
import { Github, Linkedin, Mail, FileText, ArrowUpRight, Sparkles, Brain, Code, Network } from "lucide-react";
import { ScrollReveal } from "@/components/portfolio/scroll-reveal";

export function Hero() {
  return (
    <section id="top" className="pt-6 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <ScrollReveal className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-12 items-start">
        {/* LEFT COLUMN: Profile Card & Bio Header */}
        <div className="sawad-card p-6 flex flex-col space-y-6">
          {/* Profile Image */}
          <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-[#22201E] border border-[#262422]">
            <Image
              src="/sagnik-profile.jpg"
              alt="Sagnik Chandra"
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Name & Subtitle */}
          <div className="space-y-2">
            <h2 className="text-xl font-extrabold text-white tracking-tight">
              Sagnik Chandra
            </h2>
            <p className="text-xs font-medium text-[#998F8F] leading-relaxed">
              A Data Scientist & ML Researcher who has developed innovative AI solutions and dataset mining pipelines.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3 pt-1">
            <a
              href="https://github.com/csagnik1302"
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-full bg-[#22201E] hover:bg-[#C5FF41] hover:text-[#151312] border border-[#262422] flex items-center justify-center transition-all text-white"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com/in/sagnik-chandra"
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-full bg-[#22201E] hover:bg-[#C5FF41] hover:text-[#151312] border border-[#262422] flex items-center justify-center transition-all text-white"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="mailto:sagnikchandra@gmail.com"
              className="h-10 w-10 rounded-full bg-[#22201E] hover:bg-[#C5FF41] hover:text-[#151312] border border-[#262422] flex items-center justify-center transition-all text-white"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: Giant Display Text, Bio & 3-Stat Counter Cards */}
        <div className="space-y-8 pt-2">
          {/* GIANT ALL-CAPS DISPLAY HERO TEXT */}
          <div className="space-y-0 leading-none tracking-tighter select-none">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white uppercase tracking-tight">
              MACHINE
            </h1>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#C5FF41] via-[#d6ff66] to-[#F46C38] uppercase tracking-tight">
              LEARNING
            </h1>
          </div>

          {/* Bio Description */}
          <p className="text-base sm:text-lg text-[#998F8F] leading-relaxed max-w-2xl font-medium">
            Passionate about creating intuitive, intelligent, and scalable data solutions. Specialize in transforming research concepts and complex datasets into robust, production-ready systems.
          </p>

          {/* Hero 3-Stat Counter Grid Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {/* Stat Card 1 */}
            <div className="sawad-card p-5 flex flex-col justify-between space-y-2 border border-[#262422] hover:border-[#C5FF41]/50 transition-all">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#C5FF41]">
                +3
              </div>
              <div className="text-[11px] font-extrabold text-[#998F8F] uppercase tracking-wider leading-tight">
                YEARS OF<br />RESEARCH & ML
              </div>
            </div>

            {/* Stat Card 2 */}
            <div className="sawad-card p-5 flex flex-col justify-between space-y-2 border border-[#262422] hover:border-[#C5FF41]/50 transition-all">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#F46C38]">
                10M+
              </div>
              <div className="text-[11px] font-extrabold text-[#998F8F] uppercase tracking-wider leading-tight">
                CITATION GRAPH<br />PAPERS MINED
              </div>
            </div>

            {/* Stat Card 3 */}
            <div className="sawad-card p-5 flex flex-col justify-between space-y-2 border border-[#262422] hover:border-[#C5FF41]/50 transition-all">
              <div className="text-3xl sm:text-4xl font-extrabold text-white">
                10+
              </div>
              <div className="text-[11px] font-extrabold text-[#998F8F] uppercase tracking-wider leading-tight">
                AI & WORKFLOW<br />INITIATIVES
              </div>
            </div>
          </div>

          {/* Marquee Ticker Bar */}
          <div className="overflow-hidden border-y border-[#262422] py-3 mt-4 bg-[#1C1A19]/60 rounded-xl">
            <div className="animate-marquee whitespace-nowrap flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-[#998F8F]">
              <span className="flex items-center gap-2"><Sparkles className="w-3.5 h-3.5 text-[#C5FF41]" /> DEEP LEARNING</span>
              <span>•</span>
              <span className="flex items-center gap-2"><Brain className="w-3.5 h-3.5 text-[#F46C38]" /> NATURAL LANGUAGE PROCESSING</span>
              <span>•</span>
              <span className="flex items-center gap-2"><Network className="w-3.5 h-3.5 text-[#C5FF41]" /> CITATION GRAPH MINING</span>
              <span>•</span>
              <span className="flex items-center gap-2"><Code className="w-3.5 h-3.5 text-[#F46C38]" /> PYTORCH & PYSPARK</span>
              <span>•</span>
              <span className="flex items-center gap-2"><Sparkles className="w-3.5 h-3.5 text-[#C5FF41]" /> DEEP LEARNING</span>
              <span>•</span>
              <span className="flex items-center gap-2"><Brain className="w-3.5 h-3.5 text-[#F46C38]" /> NATURAL LANGUAGE PROCESSING</span>
              <span>•</span>
              <span className="flex items-center gap-2"><Network className="w-3.5 h-3.5 text-[#C5FF41]" /> CITATION GRAPH MINING</span>
              <span>•</span>
              <span className="flex items-center gap-2"><Code className="w-3.5 h-3.5 text-[#F46C38]" /> PYTORCH & PYSPARK</span>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}




