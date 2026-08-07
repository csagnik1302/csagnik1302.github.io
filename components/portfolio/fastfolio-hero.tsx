"use client";

import React, { useState } from "react";
import {
  Smile,
  Briefcase,
  Layers,
  GraduationCap,
  Mail,
  ArrowRight,
  Sparkles,
  Download,
  Github,
  Linkedin,
} from "lucide-react";
import { ModalContent } from "./ai-response-modal";

const RESUME_URL = "https://drive.google.com/file/d/1rhio97CGMhq9xvoXZJAp88HLMmLWJHsi/view?usp=sharing";

const KNOWLEDGE_RESPONSES = [
  {
    keywords: ["lost in the middle", "llm", "rag", "retrieval", "research", "currently working", "mcp", "langchain"],
    title: "Research & Learning Focus",
    text: "Sagnik is currently conducting research on the 'Lost in the Middle' phenomenon in Large Language Model (LLM) retrieval and RAG pipelines, and currently learning LangChain, RAG, and MCP (Model Context Protocol).",
  },
  {
    keywords: ["resume", "cv", "experience", "document", "download"],
    title: "Official Resume & Credentials",
    text: "You can view and download Sagnik's latest official Resume & Experience PDF directly from Google Drive!",
  },
  {
    keywords: ["project", "projects", "style transfer", "bengali", "academiclens", "drone", "citation"],
    title: "Featured ML & Data Projects",
    text: "Sagnik's key projects:\n• Neural Literary Style Transfer (BiGRU + GRL Discriminator)\n• AcademicLens (10M+ Research Papers Intelligence Graph in Neo4j/PySpark)\n• Drone Delivery Route Optimization (TSP & Hill Climbing)",
  },
  {
    keywords: ["education", "rkmveri", "degree", "university", "math", "msc"],
    title: "Academic Background",
    text: "Sagnik's Academic Record:\n🎓 M.Sc. in Data Science & AI @ RKMVERI Belur (2025–Present)",
  },
  {
    keywords: ["skills", "python", "pytorch", "pyspark", "tools", "stack", "neo4j", "langchain", "ollama", "sql", "mcp"],
    title: "Technical Stack & Frameworks",
    text: "Sagnik's Technical Stack:\n• Languages & Frameworks: Python, PyTorch, TensorFlow, Keras, LangChain, C, SQL\n• AI & Data Science: Ollama, Hugging Face, NumPy, Pandas, Scikit-Learn\n• Tools & Systems: PySpark, Neo4j, MySQL, Git, Docker, Linux, Jupyter, Anaconda, MCP",
  },
  {
    keywords: ["contact", "email", "hire", "job", "reach", "linkedin", "github"],
    title: "Contact Information",
    text: "Contact Sagnik Chandra:\n📬 Email: sagnikchandra@gmail.com\n🐙 GitHub: github.com/csagnik1302\n💼 LinkedIn: linkedin.com/in/sagnik-chandra-52b0a111a/",
  },
];

interface FastfolioHeroProps {
  onOpenModal: (content: ModalContent) => void;
}

export function FastfolioHero({ onOpenModal }: FastfolioHeroProps) {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const q = query.toLowerCase();
    let matchedAnswer =
      "Sagnik Chandra is an Aspiring Machine Learning Engineer & AI Researcher pursuing an M.Sc. in Data Science & AI @ RKMVERI Belur. He focuses on LLM Retrieval ('Lost in the Middle' research), RAG pipelines, PyTorch, PySpark, and is currently learning LangChain, RAG, and MCP.";

    for (const item of KNOWLEDGE_RESPONSES) {
      if (item.keywords.some((kw) => q.includes(kw))) {
        matchedAnswer = item.text;
        break;
      }
    }

    onOpenModal({
      type: "custom",
      title: `Answer for "${query}"`,
      query,
      answer: matchedAnswer,
    });

    setQuery("");
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12 md:py-20 z-10 text-slate-100">
      {/* Top Floating Badge */}
      <a
        href={RESUME_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed top-6 left-6 z-40 group flex items-center gap-2 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-xl px-4 py-2 border border-white/10 shadow-lg transition-all duration-300 text-xs font-mono text-white"
      >
        <Sparkles className="w-4 h-4 text-blue-400" />
        <span>Resume PDF</span>
      </a>

      {/* Hero Intro Header */}
      <div className="z-10 flex flex-col items-center text-center space-y-2 mb-8 md:mb-10">
        <h2 className="text-lg sm:text-2xl font-medium text-slate-300">
          Hey, I'm Sagnik 👋
        </h2>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
          Aspiring ML Engineer
        </h1>
      </div>

      {/* Interactive AI Question Input Bar */}
      <div className="z-10 w-full max-w-xl space-y-6 flex flex-col items-center">
        <form onSubmit={handleSearch} className="relative w-full">
          <div className="mx-auto flex items-center rounded-full border border-white/15 bg-white/5 py-2.5 pr-2.5 pl-6 backdrop-blur-xl transition-all hover:border-white/30 focus-within:border-blue-500 shadow-2xl">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask me anything..."
              className="w-full border-none bg-transparent text-sm sm:text-base text-white placeholder-[#9CA3AF] focus:outline-none"
            />
            <button
              type="submit"
              disabled={!query.trim()}
              aria-label="Submit question"
              className="flex items-center justify-center rounded-full bg-[#0171E3] hover:bg-blue-600 p-2.5 text-white transition-all disabled:opacity-50 shrink-0"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </form>

        {/* 5 Quick Action Pill Cards Grid */}
        <div className="grid w-full max-w-xl grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
          {/* Card 1: Me */}
          <button
            onClick={() => onOpenModal({ type: "me", title: "About Sagnik Chandra" })}
            className="glass-pill aspect-square w-full rounded-2xl p-4 flex flex-col items-center justify-center gap-2 group cursor-pointer"
          >
            <Smile className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-white">Me</span>
          </button>

          {/* Card 2: Projects */}
          <button
            onClick={() => onOpenModal({ type: "projects", title: "Featured ML Projects" })}
            className="glass-pill aspect-square w-full rounded-2xl p-4 flex flex-col items-center justify-center gap-2 group cursor-pointer"
          >
            <Briefcase className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-[#F3F4F6]">Projects</span>
          </button>

          {/* Card 3: Skills */}
          <button
            onClick={() => onOpenModal({ type: "skills", title: "Technical Stack & Tools" })}
            className="glass-pill aspect-square w-full rounded-2xl p-4 flex flex-col items-center justify-center gap-2 group cursor-pointer"
          >
            <Layers className="w-6 h-6 text-purple-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-white">Skills</span>
          </button>

          {/* Card 4: Education */}
          <button
            onClick={() => onOpenModal({ type: "education", title: "Academic Background" })}
            className="glass-pill aspect-square w-full rounded-2xl p-4 flex flex-col items-center justify-center gap-2 group cursor-pointer"
          >
            <GraduationCap className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-white">Education</span>
          </button>

          {/* Card 5: Contact */}
          <button
            onClick={() => onOpenModal({ type: "contact", title: "Contact & Resume" })}
            className="glass-pill aspect-square col-span-2 sm:col-span-1 w-full rounded-2xl p-4 flex flex-col items-center justify-center gap-2 group cursor-pointer"
          >
            <Mail className="w-6 h-6 text-pink-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-white">Contact</span>
          </button>
        </div>

        {/* Footer Social Links */}
        <div className="flex items-center gap-4 text-xs font-mono text-[#9CA3AF] pt-6">
          <a
            href="https://github.com/csagnik1302"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
          <span>•</span>
          <a
            href="https://www.linkedin.com/in/sagnik-chandra-52b0a111a/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            <Linkedin className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>
          <span>•</span>
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>
        </div>
      </div>
    </div>
  );
}
