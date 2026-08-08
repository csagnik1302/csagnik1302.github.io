"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Smile,
  Briefcase,
  Layers,
  GraduationCap,
  Mail,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Download,
  Github,
  Linkedin,
  Code2,
  ArrowUpRight,
  RotateCcw,
} from "lucide-react";

const RESUME_URL = "https://drive.google.com/file/d/1rhio97CGMhq9xvoXZJAp88HLMmLWJHsi/view?usp=sharing";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content?: string;
  type?: "me" | "projects" | "experience" | "skills" | "education" | "contact" | "custom";
  title?: string;
  timestamp: string;
}

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

const CARD_PROMPTS: Record<string, { prompt: string; type: ChatMessage["type"]; title: string }> = {
  me: {
    prompt: "Who are you? I want to know more about you.",
    type: "me",
    title: "About Sagnik Chandra",
  },
  projects: {
    prompt: "What projects have you built?",
    type: "projects",
    title: "Featured ML Projects",
  },
  experience: {
    prompt: "Tell me about your research and work experience.",
    type: "experience",
    title: "Research & Technical Experience",
  },
  skills: {
    prompt: "What are your technical skills and stack?",
    type: "skills",
    title: "Technical Stack & Tools",
  },
  education: {
    prompt: "What is your academic background?",
    type: "education",
    title: "Academic Background",
  },
  contact: {
    prompt: "How can I contact you or view your resume?",
    type: "contact",
    title: "Contact & Credentials",
  },
};

interface ChatViewProps {
  initialPrompt?: {
    type: keyof typeof CARD_PROMPTS | "custom";
    query?: string;
  };
  onBackToHome: () => void;
}

export function ChatView({ initialPrompt, onBackToHome }: ChatViewProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputQuery, setInputQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (initialPrompt) {
      if (initialPrompt.type in CARD_PROMPTS) {
        const item = CARD_PROMPTS[initialPrompt.type];
        triggerAnimatedStream(item.prompt, item.type, item.title);
      } else if (initialPrompt.query) {
        triggerAnimatedCustomSearch(initialPrompt.query);
      }
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const triggerAnimatedStream = (userPrompt: string, responseType: ChatMessage["type"], title?: string) => {
    // 1. Pop out prompt bubble from bottom input dock onto the left side of stream
    const userMsg: ChatMessage = {
      id: Date.now().toString() + "-user",
      role: "user",
      content: userPrompt,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // 2. Response card slides in after brief generating delay
    setTimeout(() => {
      setIsTyping(false);
      const assistantMsg: ChatMessage = {
        id: Date.now().toString() + "-assistant",
        role: "assistant",
        type: responseType,
        title: title || "Response",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    }, 450);
  };

  const triggerAnimatedCustomSearch = (queryText: string) => {
    const q = queryText.toLowerCase();
    let matchedAnswer =
      "Sagnik Chandra is an Aspiring Machine Learning Engineer & AI Researcher pursuing an M.Sc. in Data Science & AI @ RKMVERI Belur and interning at ISI Kolkata. He focuses on LLM Retrieval ('Lost in the Middle' research), RAG pipelines, PyTorch, PySpark, and is currently learning LangChain, RAG, and MCP.";

    for (const item of KNOWLEDGE_RESPONSES) {
      if (item.keywords.some((kw) => q.includes(kw))) {
        matchedAnswer = item.text;
        break;
      }
    }

    const userMsg: ChatMessage = {
      id: Date.now().toString() + "-user",
      role: "user",
      content: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const assistantMsg: ChatMessage = {
        id: Date.now().toString() + "-assistant",
        role: "assistant",
        type: "custom",
        content: matchedAnswer,
        title: `Answer for "${queryText}"`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    }, 450);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim() || isTyping) return;

    triggerAnimatedCustomSearch(inputQuery);
    setInputQuery("");
  };

  const handlePillClick = (cardKey: keyof typeof CARD_PROMPTS) => {
    if (isTyping) return;
    const item = CARD_PROMPTS[cardKey];
    
    // Type out prompt text in bottom search bar then pop out prompt bubble
    let i = 0;
    const fullText = item.prompt;
    setInputQuery("");
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setInputQuery(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          triggerAnimatedStream(item.prompt, item.type, item.title);
          setInputQuery("");
        }, 100);
      }
    }, 10);
  };

  return (
    <div
      className="flex flex-col min-h-screen bg-[#0B0D12] text-slate-100 font-sans cursor-pointer"
      onClick={onBackToHome}
    >
      {/* Top Navigation Bar */}
      <header
        className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-8 py-4 bg-[#12151E]/90 backdrop-blur-xl border-b border-white/10 shadow-lg cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-mono"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Home</span>
          </button>
        </div>

        <button
          onClick={() => setMessages([])}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#9CA3AF] hover:text-white transition-colors flex items-center gap-1.5 text-xs font-mono"
          title="Clear Conversation"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">New Chat</span>
        </button>
      </header>

      {/* Main Conversation Stream */}
      <main
        className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6 pb-36 cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {messages.length === 0 && !isTyping && (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-3">
            <Sparkles className="w-10 h-10 text-blue-400 animate-pulse" />
            <h2 className="text-2xl font-bold text-white">Ask Away !</h2>
            <p className="text-xs sm:text-sm text-[#9CA3AF] max-w-md">
              Select a quick prompt below or type your question in the chat bar to explore Sagnik's background, research, projects, and skills.
            </p>
          </div>
        )}

        {messages.map((msg) => (
          <React.Fragment key={msg.id}>
            {/* FIRST: User Prompt on the LEFT side */}
            {msg.role === "user" && (
              <div className="flex justify-start animate-slide-in-left pt-2">
                <div className="bg-white/10 text-white border border-white/15 px-5 py-3 rounded-3xl rounded-tl-sm text-sm max-w-[85%] sm:max-w-[75%] shadow-lg flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0171E3] shrink-0" />
                  <span className="font-medium text-slate-100">{msg.content}</span>
                </div>
              </div>
            )}

            {/* SECOND: Page Output Card Centered */}
            {msg.role === "assistant" && (
              <div className="flex justify-center w-full animate-slide-in-right">
                <div className="w-full max-w-4xl bg-[#12151E] border border-white/10 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-5 text-slate-200">
                  {/* Assistant Header Badge */}
                  <div className="flex items-center gap-2 text-xs font-mono text-blue-400 pb-2 border-b border-white/10">
                    <Sparkles className="w-4 h-4" />
                    <span>{msg.title || "Response"}</span>
                  </div>

                  {/* Render Response Content Based on Type */}
                  {msg.type === "me" && (
                    <div className="space-y-6">
                      {/* Top Profile Block - Raphaël Giraud Layout Reference */}
                      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                        <div className="relative w-full max-w-[220px] sm:max-w-[260px] aspect-[4/3] rounded-3xl overflow-hidden shrink-0 border border-white/15 shadow-2xl">
                          <Image
                            src="/sagnik-profile.jpeg"
                            alt="Sagnik Chandra"
                            fill
                            className="object-cover object-center"
                            priority
                          />
                        </div>

                        <div className="space-y-3 text-center sm:text-left flex-1">
                          <div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                              Sagnik Chandra
                            </h2>
                            <p className="text-xs font-mono text-slate-400 font-medium pt-0.5">
                              Kolkata, India
                            </p>
                          </div>

                          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                            Hey 👋 I'm Sagnik. I'm an aspiring Machine Learning Engineer & AI Researcher pursuing my M.Sc. in Data Science & AI at RKMVERI. I'm currently interning at ISI Kolkata researching LLM retrieval.
                          </p>

                          {/* Tag Badges */}
                          <div className="flex flex-wrap justify-center sm:justify-start gap-1.5 pt-1">
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
                              ISI Intern
                            </span>
                            <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-slate-200 border border-white/10">
                              History & Psychology
                            </span>
                            <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-slate-200 border border-white/10">
                              Gamer & Chess
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Conversational Story Paragraph */}
                      <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed pt-4 border-t border-white/10">
                        <p>
                          I'm Sagnik Chandra, an AI researcher and Data Science student specializing in Machine Learning at RKMVERI Belur. Driven by a deep curiosity for mathematics and intelligence systems, I love exploring how models process context and attention. Currently, I'm at the <strong className="text-white font-semibold">Indian Statistical Institute (ISI)</strong> researching the <strong className="text-white font-semibold">"Lost in the Middle"</strong> phenomenon in LLM retrieval and RAG architectures, while learning LangChain, RAG, and MCP (Model Context Protocol).
                        </p>

                        <p>
                          When I'm not in code or research papers, you'll find me reading books on <strong className="text-white font-semibold">Modern and Medieval History</strong> and <strong className="text-white font-semibold">Psychology</strong>, playing competitive <strong className="text-white font-semibold">chess</strong>, or <strong className="text-white font-semibold">gaming</strong>. Voilà! What about you? What brings you here? 😊
                        </p>
                      </div>

                      {/* Action CTAs */}
                      <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-white/10">
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

                  {msg.type === "experience" && (
                    <div className="space-y-5">
                      {/* ISI */}
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

                      {/* DeepThought */}
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

                  {msg.type === "projects" && (
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

                  {msg.type === "skills" && (
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

                  {msg.type === "education" && (
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

                  {msg.type === "contact" && (
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

                  {msg.type === "custom" && (
                    <div className="space-y-4">
                      <p className="text-sm text-[#F3F4F6] leading-relaxed whitespace-pre-wrap">
                        {msg.content}
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
            )}
          </React.Fragment>
        ))}

        {/* Animated Response Typing Indicator */}
        {isTyping && (
          <div className="flex justify-center animate-fade-in pt-2">
            <div className="flex items-center gap-3 text-xs font-mono text-[#9CA3AF] bg-white/5 border border-white/10 px-4 py-2 rounded-2xl">
              <Sparkles className="w-4 h-4 text-blue-400 animate-spin" />
              <span>Generating response...</span>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </main>

      {/* Floating Bottom ChatGPT / Gemini Input Dock */}
      <footer
        className="fixed bottom-0 inset-x-0 z-30 p-4 bg-gradient-to-t from-[#0B0D12] via-[#0B0D12]/95 to-transparent backdrop-blur-xl cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full max-w-2xl mx-auto space-y-3">
          {/* Quick Action Pill Buttons Grid */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto py-1 no-scrollbar">
            <button
              onClick={() => handlePillClick("me")}
              disabled={isTyping}
              className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white flex items-center gap-1.5 shrink-0 transition-all active:scale-95 disabled:opacity-50"
            >
              <Smile className="w-3.5 h-3.5 text-emerald-400" />
              <span>Me</span>
            </button>
            <button
              onClick={() => handlePillClick("projects")}
              disabled={isTyping}
              className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white flex items-center gap-1.5 shrink-0 transition-all active:scale-95 disabled:opacity-50"
            >
              <Briefcase className="w-3.5 h-3.5 text-blue-400" />
              <span>Projects</span>
            </button>
            <button
              onClick={() => handlePillClick("experience")}
              disabled={isTyping}
              className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white flex items-center gap-1.5 shrink-0 transition-all active:scale-95 disabled:opacity-50"
            >
              <Code2 className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Experience</span>
            </button>
            <button
              onClick={() => handlePillClick("skills")}
              disabled={isTyping}
              className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white flex items-center gap-1.5 shrink-0 transition-all active:scale-95 disabled:opacity-50"
            >
              <Layers className="w-3.5 h-3.5 text-purple-400" />
              <span>Skills</span>
            </button>
            <button
              onClick={() => handlePillClick("education")}
              disabled={isTyping}
              className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white flex items-center gap-1.5 shrink-0 transition-all active:scale-95 disabled:opacity-50"
            >
              <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
              <span>Education</span>
            </button>
            <button
              onClick={() => handlePillClick("contact")}
              disabled={isTyping}
              className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white flex items-center gap-1.5 shrink-0 transition-all active:scale-95 disabled:opacity-50"
            >
              <Mail className="w-3.5 h-3.5 text-pink-400" />
              <span>Contact</span>
            </button>
          </div>

          {/* Search Input Bar */}
          <form onSubmit={handleSubmit} className="relative w-full">
            <div className="mx-auto flex items-center rounded-full border border-white/15 bg-white/10 py-2.5 pr-2.5 pl-6 backdrop-blur-2xl transition-all hover:border-white/30 focus-within:border-blue-500 shadow-2xl">
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Ask me anything..."
                className="w-full border-none bg-transparent text-sm text-white placeholder-[#9CA3AF] focus:outline-none"
              />
              <button
                type="submit"
                disabled={!inputQuery.trim() || isTyping}
                aria-label="Submit question"
                className="flex items-center justify-center rounded-full bg-[#0171E3] hover:bg-blue-600 p-2.5 text-white transition-all disabled:opacity-50 shrink-0"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </footer>
    </div>
  );
}
