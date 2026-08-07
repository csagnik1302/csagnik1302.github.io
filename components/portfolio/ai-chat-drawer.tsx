"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  ExternalLink,
  Key,
  RefreshCw,
  FileText,
  Brain,
  Code,
  Check,
  ChevronRight,
} from "lucide-react";

interface Message {
  id: string;
  sender: "ai" | "user";
  text: string;
  timestamp: string;
  actionButton?: {
    label: string;
    url?: string;
    scrollToId?: string;
  };
}

const RESUME_URL = "https://drive.google.com/file/d/1rhio97CGMhq9xvoXZJAp88HLMmLWJHsi/view?usp=sharing";

// Pre-built Knowledge Base for static fast client-side RAG fallback
const KNOWLEDGE_BASE = [
  {
    keywords: ["lost in the middle", "llm", "rag", "retrieval", "research", "currently working"],
    response:
      "Sagnik is currently conducting research on the **'Lost in the Middle'** phenomenon in Large Language Model (LLM) retrieval and RAG (Retrieval-Augmented Generation) pipelines. His focus is on analyzing how context position affects LLM attention weights and token generation quality.",
    action: { label: "Explore Research Journey", scrollToId: "journey" },
  },
  {
    keywords: ["resume", "cv", "experience", "document", "download"],
    response:
      "You can view and download Sagnik's latest official Resume & Experience document directly from Google Drive! It includes his academic record at RKMVERI, work at DeepThought, and full project history.",
    action: { label: "📄 Open Resume PDF", url: RESUME_URL },
  },
  {
    keywords: ["project", "projects", "style transfer", "bengali", "academiclens", "drone", "citation"],
    response:
      "Sagnik has built several high-impact ML systems:\n1. **Neural Literary Style Transfer**: Unsupervised Bengali sentence rewriter with BiGRU & Gradient Reversal Layer.\n2. **AcademicLens**: 10M+ paper citation intelligence graph using PySpark ETL and Neo4j.\n3. **Drone Delivery Optimization**: Congestion-aware Stochastic & Deterministic Hill Climbing for 120 delivery nodes.",
    action: { label: "View Projects Showcase", scrollToId: "projects" },
  },
  {
    keywords: ["education", "rkmveri", "degree", "university", "math", "msc", "bsc", "calcutta"],
    response:
      "Sagnik's Academic Background:\n🎓 **M.Sc. in Data Science & AI** @ RKMVERI Belur (2025–Present) — Focusing on Deep Learning, NLP, and Distributed Computing.\n🎓 **B.Sc. (Hons) in Mathematics** @ University of Calcutta (2020–2023) — Foundation in Linear Algebra, Probability, & Optimization.",
    action: { label: "View Academic Timeline", scrollToId: "journey" },
  },
  {
    keywords: ["skills", "python", "pytorch", "pyspark", "tools", "stack", "neo4j", "langchain", "ollama"],
    response:
      "Sagnik's core technical stack includes:\n• **Languages & Frameworks**: Python, PyTorch, PySpark, TensorFlow, Keras, C, SQL\n• **GenAI & NLP**: LangChain, Ollama, HuggingFace Transformers, RAG Pipelines\n• **Data & Graph Systems**: Neo4j Graph DB, MySQL, Pandas, NumPy, Scikit-Learn\n• **Tools**: Docker, Git, Linux, Jupyter, Anaconda",
    action: { label: "View Technical Matrix", scrollToId: "skills" },
  },
  {
    keywords: ["contact", "email", "hire", "job", "opportunity", "reach", "linkedin", "github"],
    response:
      "Sagnik is open for Full-Time Machine Learning, AI Research, and Data Engineering roles!\n📬 **Email**: sagnikchandra@gmail.com\n🐙 **GitHub**: github.com/csagnik1302\n💼 **LinkedIn**: linkedin.com/in/sagnik-chandra-52b0a111a/",
    action: { label: "Send a Message", scrollToId: "contact" },
  },
  {
    keywords: ["deepthought", "intern", "experience", "work", "crm", "zoho"],
    response:
      "During his Data Science Internship at DeepThought CultureTech Ventures (Oct 2024–Jul 2025), Sagnik led 10+ AI workflow automation & CRM optimization initiatives, saving 1–4 hours daily for team members and boosting process efficiency by ~60%.",
    action: { label: "View Career History", scrollToId: "journey" },
  },
];

const SUGGESTED_CHIPS = [
  "⚡ Research on Lost in the Middle",
  "📁 What are Sagnik's top ML projects?",
  "🛠️ What is Sagnik's technical stack?",
  "📄 Can I view Sagnik's Resume?",
  "📬 How can I contact Sagnik?",
];

export function AIChatDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "👋 Hi! I'm Sagnik's AI Assistant. Ask me anything about Sagnik's ML research on LLM retrieval, PyTorch/PySpark projects, work experience, or resume!",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const getKnowledgeResponse = (userQuery: string): { text: string; action?: any } => {
    const q = userQuery.toLowerCase();
    for (const kb of KNOWLEDGE_BASE) {
      if (kb.keywords.some((kw) => q.includes(kw))) {
        return { text: kb.response, action: kb.action };
      }
    }
    return {
      text: "Sagnik is an AI Researcher & ML Engineer with an M.Sc. in Data Science & AI from RKMVERI and a B.Sc. in Mathematics from Calcutta University. He specializes in Deep Learning, RAG pipelines ('Lost in the Middle' research), PySpark graph analytics, and AI workflow automation. Feel free to explore his projects or download his resume!",
      action: { label: "View Resume PDF", url: RESUME_URL },
    };
  };

  const handleSend = async (customQuery?: string) => {
    const query = customQuery || input;
    if (!query.trim() || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customQuery) setInput("");
    setIsTyping(true);

    // If Gemini API Key is set, try calling live Gemini API; otherwise use instant static Knowledge RAG Engine
    if (apiKey.trim()) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [
                    {
                      text: `You are Sagnik Chandra's AI Assistant for his portfolio site. Sagnik is an ML Engineer & AI Researcher (MSc Data Science & AI @ RKMVERI, BSc Math @ Calcutta Univ). He works on LLM retrieval ('Lost in the Middle' research), Neural Literary Style Transfer, AcademicLens (10M+ citation graph on Neo4j/PySpark), and drone optimization. Resume link: ${RESUME_URL}. Answer concisely and helpfully in markdown. Question: ${query}`,
                    },
                  ],
                },
              ],
            }),
          }
        );
        const data = await response.json();
        const aiText =
          data.candidates?.[0]?.content?.parts?.[0]?.text ||
          "Thank you for asking! Sagnik specializes in ML, LLM retrieval research, and Graph mining.";

        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "ai",
            text: aiText,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            actionButton: { label: "Download Resume", url: RESUME_URL },
          },
        ]);
        setIsTyping(false);
        return;
      } catch (err) {
        console.warn("Gemini API call failed, falling back to Knowledge Engine", err);
      }
    }

    // Static RAG Fallback response with slight natural typing delay
    setTimeout(() => {
      const kbMatch = getKnowledgeResponse(query);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "ai",
          text: kbMatch.text,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          actionButton: kbMatch.action,
        },
      ]);
      setIsTyping(false);
    }, 500);
  };

  const handleActionClick = (action: { label: string; url?: string; scrollToId?: string }) => {
    if (action.url) {
      window.open(action.url, "_blank");
    } else if (action.scrollToId) {
      setIsOpen(false);
      const element = document.getElementById(action.scrollToId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-full bg-[#0B0F17] border border-[#C5FF41]/40 text-white shadow-[0_0_25px_rgba(197,255,65,0.25)] hover:border-[#C5FF41] hover:shadow-[0_0_35px_rgba(197,255,65,0.4)] hover:scale-105 transition-all duration-300 group"
        aria-label="Open AI Assistant"
      >
        <div className="relative">
          <Sparkles className="w-5 h-5 text-[#C5FF41] group-hover:rotate-12 transition-transform duration-300" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#C5FF41] animate-ping" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#C5FF41]" />
        </div>
        <span className="text-xs font-extrabold tracking-wider text-white uppercase font-mono">
          Ask Sagnik AI
        </span>
      </button>

      {/* Slide-out Backdrop & Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
          <div
            className="w-full sm:w-[440px] h-full bg-[#0F1523] border-l border-white/10 flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="p-4 sm:p-5 border-b border-white/10 bg-[#121826]/80 backdrop-blur-md flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#C5FF41]/10 border border-[#C5FF41]/30 flex items-center justify-center text-[#C5FF41]">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white tracking-tight">Sagnik's AI Twin</h3>
                    <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-full bg-[#C5FF41]/15 text-[#C5FF41] border border-[#C5FF41]/30">
                      Active
                    </span>
                  </div>
                  <p className="text-[11px] text-[#94A3B8]">ML & Research Knowledge Assistant</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowKeyInput(!showKeyInput)}
                  className="p-2 rounded-lg text-[#94A3B8] hover:text-[#C5FF41] hover:bg-white/5 transition-colors"
                  title="Toggle Gemini API Key Input"
                >
                  <Key className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors"
                  aria-label="Close Drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Optional Gemini API Key Banner */}
            {showKeyInput && (
              <div className="p-3 bg-[#161F33] border-b border-white/10 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-[#94A3B8]">
                  <span>Optional: Live Gemini API Key</span>
                  <span className="text-[#C5FF41]">Runs Client-Side</span>
                </div>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Paste API Key for live Gemini LLM generation"
                  className="w-full px-3 py-1.5 rounded-lg bg-[#0B0F17] border border-white/10 text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#C5FF41]"
                />
              </div>
            )}

            {/* Chat Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 font-sans text-xs sm:text-sm">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender === "ai" && (
                    <div className="w-7 h-7 rounded-lg bg-[#C5FF41]/10 border border-[#C5FF41]/30 flex items-center justify-center shrink-0 text-[#C5FF41] mt-0.5">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div className="space-y-2 max-w-[85%]">
                    <div
                      className={`p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                        msg.sender === "user"
                          ? "bg-[#C5FF41] text-[#0B0F17] font-medium rounded-tr-none shadow-[0_0_15px_rgba(197,255,65,0.15)]"
                          : "bg-[#1E293B]/80 text-[#E2E8F0] border border-white/10 rounded-tl-none"
                      }`}
                    >
                      {msg.text}
                    </div>

                    {msg.actionButton && (
                      <button
                        onClick={() => handleActionClick(msg.actionButton!)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C5FF41]/10 hover:bg-[#C5FF41]/20 border border-[#C5FF41]/30 text-xs font-bold text-[#C5FF41] transition-all"
                      >
                        <span>{msg.actionButton.label}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <div
                      className={`text-[10px] text-[#64748B] ${
                        msg.sender === "user" ? "text-right" : "text-left"
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>

                  {msg.sender === "user" && (
                    <div className="w-7 h-7 rounded-lg bg-[#1E293B] border border-white/10 flex items-center justify-center shrink-0 text-white mt-0.5">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 justify-start items-center">
                  <div className="w-7 h-7 rounded-lg bg-[#C5FF41]/10 border border-[#C5FF41]/30 flex items-center justify-center text-[#C5FF41]">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="px-4 py-2.5 rounded-2xl bg-[#1E293B]/80 text-[#94A3B8] border border-white/10 flex items-center gap-1.5 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5FF41] animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5FF41] animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5FF41] animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Question Chips */}
            <div className="p-3 border-t border-white/5 bg-[#0B0F17]/50 overflow-x-auto flex items-center gap-2">
              {SUGGESTED_CHIPS.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(chip)}
                  disabled={isTyping}
                  className="px-3 py-1.5 rounded-full bg-[#1E293B]/60 hover:bg-[#C5FF41]/15 hover:border-[#C5FF41]/40 border border-white/10 text-[11px] text-[#94A3B8] hover:text-[#C5FF41] whitespace-nowrap transition-all shrink-0"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input Box Footer */}
            <div className="p-3 sm:p-4 border-t border-white/10 bg-[#121826]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Sagnik's AI Assistant..."
                  disabled={isTyping}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#0B0F17] border border-white/10 text-xs sm:text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#C5FF41] transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="h-10 w-10 rounded-xl bg-[#C5FF41] text-[#0B0F17] flex items-center justify-center font-bold hover:bg-[#d6ff66] disabled:opacity-40 transition-all shrink-0"
                  aria-label="Send Message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
