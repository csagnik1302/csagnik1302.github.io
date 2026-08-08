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
  Code2,
} from "lucide-react";
import { ModalContent } from "./ai-response-modal";

const RESUME_URL = "https://drive.google.com/file/d/1rhio97CGMhq9xvoXZJAp88HLMmLWJHsi/view?usp=sharing";

const KNOWLEDGE_RESPONSES = [
  {
    keywords: ["lost in the middle", "llm", "rag", "retrieval", "research", "currently working", "mcp", "langchain"],
    title: "Research & Learning Focus",
    text: "Sagnik is currently conducting research on the 'Lost in the Middle' phenomenon in Large Language Model (LLM) retrieval and RAG pipelines at ISI Kolkata, and currently learning LangChain, RAG, and MCP (Model Context Protocol).",
  },
  {
    keywords: ["resume", "cv", "experience", "document", "download"],
    title: "Official Resume & Credentials",
    text: "You can view and download Sagnik's latest official Resume & Experience PDF directly from Google Drive!",
  },
  {
    keywords: ["project", "projects", "style transfer", "bengali", "academiclens", "drone", "citation", "stellar"],
    title: "Featured ML & Data Projects",
    text: "Sagnik's key projects:\n• Neural Text Style Transfer with Adversarial Learning (BiGRU + GRL Discriminator)\n• AcademicLens (10M+ Research Papers Intelligence Graph in Neo4j/PySpark)\n• Stellar Object Classification (SDSS DR18 CatBoost >99% Accuracy)\n• Drone Delivery Route Optimization (TSP & Hill Climbing)",
  },
  {
    keywords: ["education", "rkmveri", "degree", "university", "math", "msc"],
    title: "Academic Background",
    text: "Sagnik's Academic Record:\n🎓 M.Sc. in Data Science & Artificial Intelligence @ RKMVERI Belur (2025–2027)",
  },
  {
    keywords: ["skills", "python", "pytorch", "pyspark", "tools", "stack", "neo4j", "langchain", "ollama", "sql", "mcp"],
    title: "Technical Stack & Frameworks",
    text: "Sagnik's Technical Stack:\n• Languages: Python, C, Cypher, R, SQL\n• Frameworks: PyTorch, Scikit-learn, Pandas, NumPy, Matplotlib, Seaborn, PySpark, LangChain\n• Tools & Platforms: Neo4j, Git, GitHub, Jupyter Notebook, Docker, Linux (Ubuntu), MCP",
  },
  {
    keywords: ["contact", "email", "hire", "job", "reach", "linkedin", "github"],
    title: "Contact Information",
    text: "Contact Sagnik Chandra:\n📬 Email: sagnikchandra@gmail.com\n🐙 GitHub: github.com/csagnik1302\n💼 LinkedIn: linkedin.com/in/sagnik-chandra-52b0a111a/",
  },
];

const CARD_PROMPTS = {
  me: "Who are you? I want to know more about you.",
  projects: "What projects have you built?",
  experience: "Tell me about your research and work experience.",
  skills: "What are your technical skills and stack?",
  education: "What is your academic background?",
  contact: "How can I contact you or view your resume?",
};

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
      "Sagnik Chandra is an Aspiring Machine Learning Engineer & AI Researcher pursuing an M.Sc. in Data Science & AI @ RKMVERI Belur and interning at ISI Kolkata. He focuses on LLM Retrieval ('Lost in the Middle' research), RAG pipelines, PyTorch, PySpark, and is currently learning LangChain, RAG, and MCP.";

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

  const triggerCardPrompt = (type: keyof typeof CARD_PROMPTS, title: string) => {
    const promptText = CARD_PROMPTS[type];
    setQuery(promptText);
    onOpenModal({
      type,
      title,
      query: promptText,
    });
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12 md:py-20 z-10 text-slate-100">
      {/* Hero Intro Header */}
      <div className="z-10 flex flex-col items-center text-center space-y-4 mb-8 md:mb-10">
        <h2 className="text-lg sm:text-2xl font-medium text-slate-300">
          Hey, I'm Sagnik 👋
        </h2>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white pt-1">
          Aspiring ML Engineer
        </h1>
      </div>

      {/* Interactive AI Question Input Bar */}
      <div className="z-10 w-full max-w-2xl space-y-6 flex flex-col items-center">
        <form onSubmit={handleSearch} className="relative w-full max-w-xl">
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

        {/* 6 Quick Action Pill Cards Grid */}
        <div className="grid w-full max-w-2xl grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 pt-2">
          {/* Card 1: Me */}
          <button
            onClick={() => triggerCardPrompt("me", "About Sagnik Chandra")}
            className="glass-pill aspect-square w-full rounded-2xl p-3 flex flex-col items-center justify-center gap-2 group cursor-pointer"
          >
            <Smile className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-white">Me</span>
          </button>

          {/* Card 2: Projects */}
          <button
            onClick={() => triggerCardPrompt("projects", "Featured ML Projects")}
            className="glass-pill aspect-square w-full rounded-2xl p-3 flex flex-col items-center justify-center gap-2 group cursor-pointer"
          >
            <Briefcase className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-[#F3F4F6]">Projects</span>
          </button>

          {/* Card 3: Experience */}
          <button
            onClick={() => triggerCardPrompt("experience", "Research & Technical Experience")}
            className="glass-pill aspect-square w-full rounded-2xl p-3 flex flex-col items-center justify-center gap-2 group cursor-pointer"
          >
            <Code2 className="w-5 h-5 text-[#38BDF8] group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-white">Experience</span>
          </button>

          {/* Card 4: Skills */}
          <button
            onClick={() => triggerCardPrompt("skills", "Technical Stack & Tools")}
            className="glass-pill aspect-square w-full rounded-2xl p-3 flex flex-col items-center justify-center gap-2 group cursor-pointer"
          >
            <Layers className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-white">Skills</span>
          </button>

          {/* Card 5: Education */}
          <button
            onClick={() => triggerCardPrompt("education", "Academic Background")}
            className="glass-pill aspect-square w-full rounded-2xl p-3 flex flex-col items-center justify-center gap-2 group cursor-pointer"
          >
            <GraduationCap className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-white">Education</span>
          </button>

          {/* Card 6: Contact */}
          <button
            onClick={() => triggerCardPrompt("contact", "Contact & Resume")}
            className="glass-pill aspect-square w-full rounded-2xl p-3 flex flex-col items-center justify-center gap-2 group cursor-pointer"
          >
            <Mail className="w-5 h-5 text-pink-400 group-hover:scale-110 transition-transform" />
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
