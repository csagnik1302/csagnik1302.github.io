"use client";

import React from "react";
import {
  X,
  Download,
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  Sparkles,
  BookOpen,
  Code2,
  Briefcase,
  Award,
} from "lucide-react";

const RESUME_URL = "https://drive.google.com/file/d/1rhio97CGMhq9xvoXZJAp88HLMmLWJHsi/view?usp=sharing";

export interface ModalContent {
  type: "me" | "projects" | "experience" | "skills" | "education" | "contact" | "custom";
  title: string;
  query?: string;
  answer?: string;
}

interface AIResponseModalProps {
  content: ModalContent | null;
  onClose: () => void;
}

export function AIResponseModal({ content, onClose }: AIResponseModalProps) {
  if (!content) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[85vh] bg-[#12151E] border border-white/10 rounded-3xl p-6 sm:p-8 overflow-y-auto shadow-2xl space-y-6 text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h3 className="text-lg font-bold text-white tracking-tight">{content.title}</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-[#9CA3AF] hover:text-white transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body Based on Category */}
        <div className="space-y-6 text-sm">
          {content.type === "me" && (
            <div className="space-y-5">
              {/* Header Title Card */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xl font-bold text-white">Sagnik Chandra</h4>
                  <span className="text-xs font-mono text-blue-400 font-semibold">Kolkata, India</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed pt-1">
                  👋 Hey there! I'm Sagnik Chandra, an aspiring Machine Learning Engineer & AI Researcher. I have a passion for turning complex AI research concepts into reliable, production-ready systems.
                </p>
              </div>

              {/* Research Focus Card */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#A855F7] uppercase">
                  <BookOpen className="w-4 h-4" />
                  <span>Current Research Focus</span>
                </div>
                <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed">
                  Investigating the <strong className="text-white">"Lost in the Middle"</strong> phenomenon in LLM retrieval and RAG architectures at Indian Statistical Institute (ISI), exploring context positioning and attention degradation.
                </p>
              </div>

              {/* Currently Learning Section */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3 text-xs">
                <div className="flex items-center gap-2 font-mono font-bold text-slate-300 uppercase">
                  <Code2 className="w-4 h-4 text-emerald-400" />
                  <span>Currently Learning</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 rounded-lg bg-white/10 text-xs font-mono text-white border border-white/10">
                    LangChain
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-white/10 text-xs font-mono text-white border border-white/10">
                    RAG
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-white/10 text-xs font-mono text-white border border-white/10">
                    MCP (Model Context Protocol)
                  </span>
                </div>
              </div>

              {/* Personal Passions & Hobbies Card */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="text-xs font-mono font-semibold text-amber-400 uppercase">
                  Beyond Coding & Research
                </div>
                <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed">
                  When I'm not in code or research papers, I love reading books on <strong className="text-white">Modern & Medieval History</strong> and <strong className="text-white">Psychology</strong>, playing competitive <strong className="text-white">chess</strong>, or <strong className="text-white">gaming</strong>. What about you? What brings you here? 😊
                </p>
              </div>

              {/* Action CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-500 transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20"
                >
                  <Download className="w-4 h-4" />
                  <span>View Resume / Experience PDF</span>
                </a>
                <a
                  href="mailto:sagnikchandra@gmail.com"
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-all flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-[#9CA3AF]" />
                  <span>Send Email</span>
                </a>
              </div>
            </div>
          )}

          {content.type === "experience" && (
            <div className="space-y-5">
              {/* Experience 1: ISI */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h4 className="font-bold text-white text-base">Research Intern</h4>
                    <p className="text-xs font-mono text-blue-400 font-semibold">
                      Indian Statistical Institute (ISI)
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[#9CA3AF]">May 2026 — Ongoing</span>
                </div>

                <ul className="space-y-2 text-xs sm:text-sm text-[#9CA3AF] list-disc list-inside leading-relaxed">
                  <li>
                    Analyzed the existence of the <strong className="text-white">"Lost in the Middle"</strong> phenomenon in LLMs on factoid texts as defined in source publications, using custom datasets defined from NaturalQuestions with Llama 3.1 8B Instruct.
                  </li>
                  <li>
                    Currently working on defining an extended experimental validation of the Lost in the Middle phenomenon on complete RAG pipelines on non-factoid texts using a modified MS MARCO 2.1 dataset from the TREC RAG 2024 benchmark.
                  </li>
                </ul>
              </div>

              {/* Experience 2: DeepThought */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h4 className="font-bold text-white text-base">Data Science Intern</h4>
                    <p className="text-xs font-mono text-blue-400 font-semibold">
                      DeepThought CultureTech Ventures
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[#9CA3AF]">Oct 2024 — Jul 2025</span>
                </div>

                <ul className="space-y-2 text-xs sm:text-sm text-[#9CA3AF] list-disc list-inside leading-relaxed">
                  <li>
                    Led and contributed to 10+ cross-functional initiatives spanning AI automation, CRM optimization, data operations, recruitment, UX research, and business growth.
                  </li>
                  <li>
                    Built AI-powered workflows and redesigned CRM/KPI reporting systems, reducing manual effort by 1–4 hours daily, cutting turnaround time from 3 days to 1 day, and improving process efficiency by 60% for 30+ stakeholders.
                  </li>
                </ul>
              </div>
            </div>
          )}

          {content.type === "projects" && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white">Neural Text Style Transfer with Adversarial Learning</h4>
                  <a
                    href="https://github.com/csagnik1302"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:underline flex items-center gap-1"
                  >
                    <span>GitHub</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-xs text-[#9CA3AF] leading-relaxed">
                  Built semi-automated pipeline to rewrite Bengali sentences in the style of five authors without parallel corpora using BiGRU encoder with Gradient Reversal Layer (GRL) and style-conditioned GRU decoder.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white">AcademicLens — Citation Graph Mining at Scale</h4>
                  <a
                    href="https://github.com/csagnik1302"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:underline flex items-center gap-1"
                  >
                    <span>GitHub</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-xs text-[#9CA3AF] leading-relaxed">
                  Built large-scale academic intelligence system over 10M+ OpenAlex research papers using PySpark & Neo4j with distributed Author–Paper–Citation–Topic graph and PageRank influence ranking.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white">Stellar Object Classification (SDSS DR18)</h4>
                  <a
                    href="https://github.com/csagnik1302"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:underline flex items-center gap-1"
                  >
                    <span>GitHub</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-xs text-[#9CA3AF] leading-relaxed">
                  Supervised multi-class classification system classifying galaxies, quasars, and stars using CatBoost & XGBoost with Optuna Bayesian hyperparameter tuning, achieving &gt;99% test accuracy.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white">Traffic-Aware Single-Drone Delivery Route Optimisation</h4>
                  <a
                    href="https://github.com/csagnik1302"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:underline flex items-center gap-1"
                  >
                    <span>GitHub</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-xs text-[#9CA3AF] leading-relaxed">
                  Evaluated deterministic and stochastic hill climbing algorithms for drone delivery route optimization across 120 delivery locations with node-level congestion modeling.
                </p>
              </div>
            </div>
          )}

          {content.type === "skills" && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <h4 className="font-bold text-white text-xs font-mono uppercase">Languages</h4>
                <div className="flex flex-wrap gap-1.5">
                  {["Python", "C", "Cypher", "R", "SQL"].map((s) => (
                    <span key={s} className="px-2.5 py-1 rounded-lg bg-white/10 text-xs font-mono text-slate-200">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <h4 className="font-bold text-white text-xs font-mono uppercase">Frameworks & ML Libraries</h4>
                <div className="flex flex-wrap gap-1.5">
                  {["Scikit-learn", "PyTorch", "Pandas", "NumPy", "Matplotlib", "Seaborn", "PySpark", "LangChain"].map((s) => (
                    <span key={s} className="px-2.5 py-1 rounded-lg bg-white/10 text-xs font-mono text-slate-200">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <h4 className="font-bold text-white text-xs font-mono uppercase">Tools & Platforms</h4>
                <div className="flex flex-wrap gap-1.5">
                  {["Neo4j", "Git", "GitHub", "Jupyter Notebook", "Docker", "Linux (Ubuntu)", "MCP"].map((s) => (
                    <span key={s} className="px-2.5 py-1 rounded-lg bg-white/10 text-xs font-mono text-slate-200">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {content.type === "education" && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <div className="flex items-center justify-between text-xs text-blue-400 font-mono">
                  <span>2025 — 2027</span>
                  <span>Master's Degree</span>
                </div>
                <h4 className="font-bold text-white text-base">M.Sc. in Data Science & Artificial Intelligence</h4>
                <p className="text-xs text-[#9CA3AF]">Ramakrishna Mission Vivekananda Educational and Research Institute (RKMVERI), Belur</p>
                <p className="text-xs text-[#9CA3AF] pt-1">
                  Focusing on Deep Learning, NLP, LLM Retrieval, RAG Pipelines, and Distributed Data Processing.
                </p>
              </div>
            </div>
          )}

          {content.type === "contact" && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <div className="text-xs font-semibold text-[#9CA3AF] uppercase font-mono">Direct Email</div>
                <div className="text-sm font-mono text-white">sagnikchandra@gmail.com</div>
              </div>

              <div className="flex flex-wrap gap-2">
                <a
                  href="https://github.com/csagnik1302"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/sagnik-chandra-52b0a111a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>Resume PDF</span>
                </a>
              </div>
            </div>
          )}

          {content.type === "custom" && (
            <div className="space-y-4">
              <p className="text-sm text-[#F3F4F6] leading-relaxed whitespace-pre-wrap">
                {content.answer}
              </p>
              <div className="pt-2">
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold text-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>View Official Resume</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
