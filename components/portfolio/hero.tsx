"use client";

import Image from "next/image";
import {
  Github,
  Linkedin,
  Mail,
  FileText,
  ArrowUpRight,
  Sparkles,
  Brain,
  Code,
  Network,
  Download,
  BookOpen,
  Layers,
  Terminal as TerminalIcon,
} from "lucide-react";
import { ScrollReveal } from "@/components/portfolio/scroll-reveal";

const RESUME_URL = "https://drive.google.com/file/d/1rhio97CGMhq9xvoXZJAp88HLMmLWJHsi/view?usp=sharing";

export function Hero() {
  return (
    <section id="top" className="pt-6 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <ScrollReveal className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 lg:gap-8 items-start">
        {/* LEFT COLUMN: Profile Bento Card */}
        <div className="bento-card p-6 flex flex-col space-y-6 relative overflow-hidden group">
          {/* Ambient Glow */}
          <div className="absolute -top-12 -left-12 w-40 h-40 bg-[#C5FF41]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Profile Image */}
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#121826] border border-white/10 group-hover:border-[#C5FF41]/40 transition-colors">
            <Image
              src="/sagnik-avatar-placeholder.jpg"
              alt="Sagnik Chandra"
              fill
              priority
              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            <div className="absolute top-3 right-3 bg-[#0B0F17]/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-[10px] font-mono font-bold text-[#C5FF41]">
              Placeholder Avatar
            </div>
          </div>

          {/* Name & Bio Header */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C5FF41] animate-pulse" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#C5FF41] font-bold">
                Available for ML Roles
              </span>
            </div>

            <h1 className="text-2xl font-black text-white tracking-tight">
              Sagnik Chandra
            </h1>

            <p className="text-xs text-[#94A3B8] leading-relaxed">
              M.Sc. Data Science & AI @ RKMVERI | B.Sc. Mathematics @ Univ of Calcutta. Focusing on LLM Retrieval, Graph Analytics, and Unsupervised ML.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="space-y-2.5 pt-1">
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-[#C5FF41] text-[#0B0F17] font-extrabold text-xs hover:bg-[#d6ff66] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(197,255,65,0.2)]"
            >
              <Download className="w-4 h-4" />
              <span>Download Official Resume</span>
            </a>
          </div>

          {/* Social Links Bar */}
          <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
            <a
              href="https://github.com/csagnik1302"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-[#1E293B]/60 hover:bg-[#C5FF41] hover:text-[#0B0F17] border border-white/10 transition-all text-white"
              title="GitHub Profile"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/sagnik-chandra-52b0a111a/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-[#1E293B]/60 hover:bg-[#C5FF41] hover:text-[#0B0F17] border border-white/10 transition-all text-white"
              title="LinkedIn Profile"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="https://medium.com/@sagnikchandra-65680"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-[#1E293B]/60 hover:bg-[#C5FF41] hover:text-[#0B0F17] border border-white/10 transition-all text-white font-mono font-bold text-xs"
              title="Medium Articles"
            >
              M
            </a>
            <a
              href="mailto:sagnikchandra@gmail.com"
              className="p-2.5 rounded-xl bg-[#1E293B]/60 hover:bg-[#C5FF41] hover:text-[#0B0F17] border border-white/10 transition-all text-white"
              title="Email Direct"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: Giant Hero Text, Research Highlight & Stats Grid */}
        <div className="space-y-6 pt-1">
          {/* GIANT DISPLAY HERO TEXT */}
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E293B]/80 border border-white/10 text-xs font-mono text-[#94A3B8]">
              <Sparkles className="w-3.5 h-3.5 text-[#C5FF41]" />
              <span>AI Researcher & ML Engineer</span>
            </div>

            <div className="leading-none tracking-tighter select-none space-y-1">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight">
                MACHINE LEARNING
              </h1>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#C5FF41] via-[#38BDF8] to-[#A855F7] uppercase tracking-tight glow-text-lime">
                & AI RESEARCHER
              </h1>
            </div>
          </div>

          {/* Research Highlight Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#121826]/90 border border-[#C5FF41]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-[0_0_20px_rgba(197,255,65,0.08)]">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#C5FF41] uppercase tracking-wider">
                <BookOpen className="w-4 h-4" />
                <span>CURRENT RESEARCH FOCUS</span>
              </div>
              <p className="text-sm text-slate-200 font-medium leading-snug">
                Exploring the <strong className="text-white underline decoration-[#C5FF41]">"Lost in the Middle"</strong> phenomenon in LLM retrieval & RAG pipelines.
              </p>
            </div>
            <a
              href="#journey"
              className="px-4 py-2 rounded-xl bg-[#C5FF41]/10 hover:bg-[#C5FF41]/20 border border-[#C5FF41]/30 text-xs font-extrabold text-[#C5FF41] whitespace-nowrap transition-all shrink-0"
            >
              Learn More →
            </a>
          </div>

          {/* Bio Description */}
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed max-w-2xl font-normal">
            Passionate about transforming research concepts into high-performance production systems. Specializing in unsupervised style disentanglement, citation graph mining on 10M+ paper datasets, and custom LLM pipeline optimizations.
          </p>

          {/* Hero 3-Stat Counter Grid Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            {/* Stat Card 1 */}
            <div className="bento-card p-5 flex flex-col justify-between space-y-2">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#C5FF41]">
                +3 YRS
              </div>
              <div className="text-[11px] font-extrabold text-[#94A3B8] uppercase tracking-wider font-mono">
                ML & RESEARCH EXPERIENCE
              </div>
            </div>

            {/* Stat Card 2 */}
            <div className="bento-card p-5 flex flex-col justify-between space-y-2">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#38BDF8]">
                10M+
              </div>
              <div className="text-[11px] font-extrabold text-[#94A3B8] uppercase tracking-wider font-mono">
                GRAPH PAPERS MINED
              </div>
            </div>

            {/* Stat Card 3 */}
            <div className="bento-card p-5 flex flex-col justify-between space-y-2">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#A855F7]">
                10+
              </div>
              <div className="text-[11px] font-extrabold text-[#94A3B8] uppercase tracking-wider font-mono">
                AI & DATA INITIATIVES
              </div>
            </div>
          </div>

          {/* Marquee Ticker Bar */}
          <div className="overflow-hidden border-y border-white/10 py-3 mt-4 bg-[#121826]/60 rounded-xl backdrop-blur-md">
            <div className="animate-marquee whitespace-nowrap flex items-center gap-8 text-[11px] font-mono font-bold uppercase tracking-widest text-[#94A3B8]">
              <span className="flex items-center gap-2"><Sparkles className="w-3.5 h-3.5 text-[#C5FF41]" /> DEEP LEARNING & PYTORCH</span>
              <span>•</span>
              <span className="flex items-center gap-2"><Brain className="w-3.5 h-3.5 text-[#38BDF8]" /> RAG & LANGCHAIN</span>
              <span>•</span>
              <span className="flex items-center gap-2"><Network className="w-3.5 h-3.5 text-[#A855F7]" /> NEO4J GRAPH MINING</span>
              <span>•</span>
              <span className="flex items-center gap-2"><Code className="w-3.5 h-3.5 text-[#C5FF41]" /> PYSPARK ETL</span>
              <span>•</span>
              <span className="flex items-center gap-2"><Sparkles className="w-3.5 h-3.5 text-[#C5FF41]" /> DEEP LEARNING & PYTORCH</span>
              <span>•</span>
              <span className="flex items-center gap-2"><Brain className="w-3.5 h-3.5 text-[#38BDF8]" /> RAG & LANGCHAIN</span>
              <span>•</span>
              <span className="flex items-center gap-2"><Network className="w-3.5 h-3.5 text-[#A855F7]" /> NEO4J GRAPH MINING</span>
              <span>•</span>
              <span className="flex items-center gap-2"><Code className="w-3.5 h-3.5 text-[#C5FF41]" /> PYSPARK ETL</span>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
