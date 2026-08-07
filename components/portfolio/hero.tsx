"use client";

import {
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  Sparkles,
  Download,
  BookOpen,
  Code2,
  Brain,
  Search,
} from "lucide-react";
import { ScrollReveal } from "@/components/portfolio/scroll-reveal";

const RESUME_URL = "https://drive.google.com/file/d/1rhio97CGMhq9xvoXZJAp88HLMmLWJHsi/view?usp=sharing";

export function Hero() {
  return (
    <section id="top" className="pt-12 sm:pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <ScrollReveal className="space-y-8">
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#15171C] border border-white/10 text-xs font-mono text-[#9CA3AF]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>M.Sc. Data Science & AI @ RKMVERI</span>
        </div>

        {/* Clean Typographic Title */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
            Hi, I'm Sagnik Chandra. <br />
            <span className="text-[#9CA3AF] font-normal">
              Aspiring Machine Learning Engineer & Researcher.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#9CA3AF] leading-relaxed max-w-2xl">
            Focusing on Deep Learning, RAG pipelines, LLM retrieval, and Data Mining. Currently conducting research on context positioning in LLM attention.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-white text-[#0E0F12] font-semibold text-xs sm:text-sm hover:bg-slate-200 transition-all flex items-center gap-2 shadow-lg shadow-white/5"
          >
            <Download className="w-4 h-4" />
            <span>View Resume / Experience</span>
          </a>

          <a
            href="#contact"
            className="px-5 py-2.5 rounded-xl bg-[#15171C] hover:bg-[#1C1E24] border border-white/10 text-xs sm:text-sm font-semibold text-white transition-all flex items-center gap-2"
          >
            <Mail className="w-4 h-4 text-[#9CA3AF]" />
            <span>Get in Touch</span>
          </a>
        </div>

        {/* Social Links Bar */}
        <div className="flex items-center gap-4 pt-4 border-t border-white/10 text-xs font-mono text-[#9CA3AF]">
          <span className="text-[#6B7280]">Connect:</span>
          <a
            href="https://github.com/csagnik1302"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/sagnik-chandra-52b0a111a/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            <Linkedin className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://medium.com/@sagnikchandra-65680"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Medium
          </a>
          <a
            href="https://leetcode.com/u/csagnik2003/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            LeetCode
          </a>
        </div>

        {/* Research Callout Card */}
        <div className="framer-card p-6 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-blue-400 font-semibold uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Current Research & Focus</span>
          </div>

          <h3 className="text-lg font-semibold text-white">
            Exploring the "Lost in the Middle" phenomenon in LLM retrieval
          </h3>

          <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed">
            Investigating context position bias in RAG pipelines and transformer attention weights. Learning LangChain & SQL, and building custom LLM pipelines.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            <span className="px-2.5 py-1 rounded-md bg-[#1C1E24] border border-white/10 text-[11px] font-mono text-slate-300">
              RAG Pipelines
            </span>
            <span className="px-2.5 py-1 rounded-md bg-[#1C1E24] border border-white/10 text-[11px] font-mono text-slate-300">
              LLM Retrieval
            </span>
            <span className="px-2.5 py-1 rounded-md bg-[#1C1E24] border border-white/10 text-[11px] font-mono text-slate-300">
              LangChain
            </span>
            <span className="px-2.5 py-1 rounded-md bg-[#1C1E24] border border-white/10 text-[11px] font-mono text-slate-300">
              Data Mining
            </span>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
