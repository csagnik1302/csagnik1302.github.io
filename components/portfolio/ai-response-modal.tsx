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
  GraduationCap,
  Code2,
} from "lucide-react";

const RESUME_URL = "https://drive.google.com/file/d/1rhio97CGMhq9xvoXZJAp88HLMmLWJHsi/view?usp=sharing";

export interface ModalContent {
  type: "me" | "projects" | "skills" | "education" | "contact" | "custom";
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
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">{content.title}</h3>
            <p className="text-xs text-[#9CA3AF]">Sagnik Chandra's AI Twin Response</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-[#9CA3AF] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body Based on Category */}
        <div className="space-y-6 text-sm">
          {content.type === "me" && (
            <div className="space-y-6">
              {/* Header Title & Subtitle Card */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">Sagnik Chandra</h2>
                  <p className="text-xs font-mono text-blue-400 font-semibold mt-0.5">
                    Kolkata, India
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  Hey 👋 I'm Sagnik. I'm an aspiring Machine Learning Engineer & AI Researcher pursuing my M.Sc. in Data Science & AI at RKMVERI. I'm passionate about LLM retrieval, RAG pipelines, deep learning, and mathematical problem solving.
                </p>

                {/* Tag Pills */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-slate-200 border border-white/10">
                    AI
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-slate-200 border border-white/10">
                    ML Engineer
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-slate-200 border border-white/10">
                    RKMVERI
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-slate-200 border border-white/10">
                    History & Psychology
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-slate-200 border border-white/10">
                    Gamer & Chess
                  </span>
                </div>
              </div>

              {/* Conversational Detailed Story Paragraph */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3 leading-relaxed text-xs sm:text-sm text-[#9CA3AF]">
                <p>
                  I'm Sagnik Chandra, a Machine Learning researcher and Data Science student specializing in AI at RKMVERI Belur. Driven by a deep curiosity for mathematics and intelligence systems, I love exploring how models process context and attention. Currently, I'm researching the <strong className="text-white">"Lost in the Middle"</strong> phenomenon in LLM retrieval and RAG architectures, while learning LangChain, RAG, and MCP (Model Context Protocol).
                </p>
                <p>
                  When I'm not in code or research papers, you'll find me reading books on <strong className="text-white">Modern and Medieval History</strong> and <strong className="text-white">Psychology</strong>, playing competitive <strong className="text-white">chess</strong>, or <strong className="text-white">gaming</strong>. What about you? What brings you here? 😊
                </p>
              </div>

              {/* Action Buttons */}
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

          {content.type === "projects" && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white">Neural Literary Style Transfer</h4>
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
                  Semi-automated pipeline to rewrite Bengali sentences in a target author's style without parallel corpora using BiGRU encoder & Gradient Reversal Layer (GRL).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white">AcademicLens — Citation Graph Mining</h4>
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
                  Large-scale academic intelligence graph mapping papers from OpenAlex using PySpark ETL into Neo4j with PageRank influence ranking.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white">Drone Delivery Route Optimization</h4>
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
                  TSP variant for urban drone delivery with congestion-aware Deterministic and Stochastic Hill Climbing algorithms.
                </p>
              </div>
            </div>
          )}

          {content.type === "skills" && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <h4 className="font-bold text-white text-xs font-mono uppercase">Languages & Frameworks</h4>
                <div className="flex flex-wrap gap-1.5">
                  {["Python", "PyTorch", "TensorFlow", "Keras", "LangChain", "C", "SQL"].map((s) => (
                    <span key={s} className="px-2.5 py-1 rounded-lg bg-white/10 text-xs font-mono text-slate-200">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <h4 className="font-bold text-white text-xs font-mono uppercase">AI & Data Science</h4>
                <div className="flex flex-wrap gap-1.5">
                  {["Ollama", "Hugging Face", "NumPy", "Pandas", "Scikit-Learn", "Matplotlib", "Seaborn"].map((s) => (
                    <span key={s} className="px-2.5 py-1 rounded-lg bg-white/10 text-xs font-mono text-slate-200">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <h4 className="font-bold text-white text-xs font-mono uppercase">Tools & Systems</h4>
                <div className="flex flex-wrap gap-1.5">
                  {["PySpark", "Neo4j", "MySQL", "Git", "Docker", "Linux", "Jupyter", "Anaconda", "MCP"].map((s) => (
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
                  <span>2025 — Present</span>
                  <span>Master's Degree</span>
                </div>
                <h4 className="font-bold text-white text-base">M.Sc. in Data Science & AI</h4>
                <p className="text-xs text-[#9CA3AF]">RKMVERI, Belur</p>
                <p className="text-xs text-[#9CA3AF] pt-1">
                  Focusing on Deep Learning, NLP, LLM Retrieval, RAG Pipelines, and Data Mining.
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
