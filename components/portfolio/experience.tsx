"use client";

import { GraduationCap, ArrowUpRight, BookOpen, Layers } from "lucide-react";
import { ScrollReveal } from "@/components/portfolio/scroll-reveal";

const RESUME_URL = "https://drive.google.com/file/d/1rhio97CGMhq9xvoXZJAp88HLMmLWJHsi/view?usp=sharing";

interface EducationItem {
  period: string;
  degree: string;
  institution: string;
  details: string;
}

const educationList: EducationItem[] = [
  {
    period: "2025 — Present",
    degree: "M.Sc. in Data Science & AI",
    institution: "RKMVERI, Belur",
    details:
      "Focusing on Deep Learning, Natural Language Processing, LLM Retrieval, RAG Pipelines, and Data Mining.",
  },
  {
    period: "2020 — 2023",
    degree: "B.Sc. (Hons) in Mathematics",
    institution: "University of Calcutta",
    details:
      "Rigorous foundation in Linear Algebra, Real Analysis, Probability Theory, Optimization, and Numerical Methods.",
  },
];

export function Experience() {
  return (
    <section id="education" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <ScrollReveal className="space-y-8">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-mono text-blue-400 font-semibold uppercase tracking-wider">
              Academic Background
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Education & Background
            </h2>
          </div>

          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono font-semibold text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>Full Resume PDF</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Education List Cards */}
        <div className="space-y-4">
          {educationList.map((edu, idx) => (
            <div key={idx} className="framer-card p-6 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h3 className="text-lg font-bold text-white">{edu.degree}</h3>
                <span className="text-xs font-mono text-[#9CA3AF]">{edu.period}</span>
              </div>

              <div className="text-xs font-mono font-semibold text-blue-400">
                {edu.institution}
              </div>

              <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed">
                {edu.details}
              </p>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
