import { Github, Linkedin, Mail, FileText, ArrowUpRight, Sparkles, Brain, Code, Network } from "lucide-react";
import { ScrollReveal } from "@/components/portfolio/scroll-reveal";

export function Hero() {
  return (
    <section id="top" className="pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col justify-center">
      <ScrollReveal className="space-y-10">
        {/* Name Tag & Headline */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5FF41]/10 border border-[#C5FF41]/30">
            <span className="h-2 w-2 rounded-full bg-[#C5FF41] animate-pulse shadow-[0_0_8px_#C5FF41]" />
            <span className="text-xs font-bold text-[#C5FF41] uppercase tracking-wider">
              Sagnik Chandra
            </span>
          </div>

          <p className="text-base sm:text-lg font-medium text-[#998F8F] max-w-2xl pt-1">
            A Data Scientist & Machine Learning Engineer who has developed innovative AI solutions and massive dataset mining pipelines.
          </p>
        </div>

        {/* GIANT ALL-CAPS DISPLAY HERO TEXT */}
        <div className="space-y-0 leading-none tracking-tighter select-none py-2">
          <h1 className="text-5xl sm:text-7xl lg:text-9xl font-extrabold text-white uppercase tracking-tight">
            MACHINE
          </h1>
          <h1 className="text-5xl sm:text-7xl lg:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#C5FF41] via-[#d6ff66] to-[#F46C38] uppercase tracking-tight">
            LEARNING
          </h1>
        </div>

        {/* Bio Paragraph */}
        <p className="text-base sm:text-xl text-[#998F8F] leading-relaxed max-w-3xl font-normal">
          Passionate about understanding how language, information, and structure emerge at scale. Specialize in transforming raw data and research paper concepts into robust, production-grade AI systems.
        </p>

        {/* Hero 3-Stat Counter Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          {/* Stat Card 1 */}
          <div className="sawad-card p-6 flex flex-col justify-between space-y-2 border border-[#262422] hover:border-[#C5FF41]/50 transition-all">
            <div className="text-4xl sm:text-5xl font-extrabold text-[#C5FF41]">
              +3
            </div>
            <div className="text-xs font-extrabold text-[#998F8F] uppercase tracking-wider leading-tight">
              YEARS OF<br />RESEARCH & ML
            </div>
          </div>

          {/* Stat Card 2 */}
          <div className="sawad-card p-6 flex flex-col justify-between space-y-2 border border-[#262422] hover:border-[#C5FF41]/50 transition-all">
            <div className="text-4xl sm:text-5xl font-extrabold text-[#F46C38]">
              10M+
            </div>
            <div className="text-xs font-extrabold text-[#998F8F] uppercase tracking-wider leading-tight">
              CITATION GRAPH<br />PAPERS MINED
            </div>
          </div>

          {/* Stat Card 3 */}
          <div className="sawad-card p-6 flex flex-col justify-between space-y-2 border border-[#262422] hover:border-[#C5FF41]/50 transition-all">
            <div className="text-4xl sm:text-5xl font-extrabold text-white">
              10+
            </div>
            <div className="text-xs font-extrabold text-[#998F8F] uppercase tracking-wider leading-tight">
              AI & WORKFLOW<br />INITIATIVES
            </div>
          </div>
        </div>

        {/* Marquee Ticker Bar */}
        <div className="overflow-hidden border-y border-[#262422] py-3.5 mt-6 bg-[#1C1A19]/50 rounded-xl">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-[#998F8F]">
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
      </ScrollReveal>
    </section>
  );
}



