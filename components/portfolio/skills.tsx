"use client";

import {
  Cpu,
  Database,
  Network,
  Terminal,
  Code2,
  Box,
  Brain,
  Sparkles,
  Flame,
  Wrench,
  Layers,
  Search,
} from "lucide-react";
import { ScrollReveal } from "@/components/portfolio/scroll-reveal";

interface SkillCategory {
  title: string;
  subtitle: string;
  icon: any;
  color: string;
  skills: string[];
}

const categories: SkillCategory[] = [
  {
    title: "Deep Learning & GenAI",
    subtitle: "Neural Architectures & LLM Pipelines",
    icon: Brain,
    color: "#C5FF41",
    skills: ["PyTorch", "TensorFlow", "Keras", "LangChain", "Ollama", "HuggingFace", "RAG Pipelines"],
  },
  {
    title: "Graph & Big Data Systems",
    subtitle: "Distributed ETL & Graph Mining",
    icon: Network,
    color: "#38BDF8",
    skills: ["PySpark", "Neo4j", "MySQL", "Pandas", "NumPy", "Scikit-Learn"],
  },
  {
    title: "Core Languages & Foundations",
    subtitle: "Algorithms, Linear Algebra & Math",
    icon: Code2,
    color: "#A855F7",
    skills: ["Python", "C", "SQL", "Matrix Analysis", "Probability & Statistics", "Optimization"],
  },
  {
    title: "Tools, OS & Workflows",
    subtitle: "Development & MLOps Environment",
    icon: Terminal,
    color: "#F46C38",
    skills: ["Docker", "Git", "Linux", "Jupyter", "Anaconda", "Zoho & HubSpot Automation"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <ScrollReveal className="space-y-10">
        {/* Section Header */}
        <div className="space-y-2 border-b border-white/10 pb-6">
          <span className="text-xs font-mono font-bold text-[#C5FF41] uppercase tracking-widest">
            TECHNICAL MATRIX
          </span>
          <h2 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight leading-none">
            STACK &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5FF41] via-[#38BDF8] to-[#A855F7]">
              COMPETENCIES
            </span>
          </h2>
        </div>

        {/* Categorized Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className="bento-card p-6 flex flex-col justify-between space-y-6 hover:border-white/20 transition-all group"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform"
                      style={{
                        backgroundColor: `${cat.color}15`,
                        color: cat.color,
                        borderColor: `${cat.color}40`,
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-white group-hover:text-[#C5FF41] transition-colors">
                        {cat.title}
                      </h3>
                      <p className="text-xs text-[#94A3B8] font-mono">{cat.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 rounded-xl bg-[#0B0F17] border border-white/10 text-xs font-mono font-bold text-slate-200 hover:border-[#C5FF41]/40 hover:text-[#C5FF41] transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollReveal>
    </section>
  );
}
