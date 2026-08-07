"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  Brain,
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

const KNOWLEDGE_BASE = [
  {
    keywords: ["lost in the middle", "llm", "rag", "retrieval", "research", "currently working"],
    response:
      "Sagnik is currently exploring the **'Lost in the Middle'** phenomenon in Large Language Model (LLM) retrieval and RAG pipelines, examining context position bias and transformer attention weights.",
    action: { label: "📄 Open Resume PDF", url: RESUME_URL },
  },
  {
    keywords: ["resume", "cv", "experience", "document", "download"],
    response:
      "You can view and download Sagnik's latest official Resume & Experience document directly from Google Drive!",
    action: { label: "📄 Open Resume PDF", url: RESUME_URL },
  },
  {
    keywords: ["project", "projects", "style transfer", "bengali", "academiclens", "drone", "citation"],
    response:
      "Sagnik's key projects:\n1. **Neural Literary Style Transfer**: Unsupervised Bengali sentence rewriter using BiGRU & Gradient Reversal Layer.\n2. **AcademicLens — Citation Graph Mining**: Research Paper Intelligence Graph built with PySpark ETL & Neo4j PageRank.\n3. **Drone Delivery Route Optimization**: Congestion-Aware Hill Climbing optimization.",
    action: { label: "View Projects", scrollToId: "projects" },
  },
  {
    keywords: ["education", "rkmveri", "degree", "university", "math", "msc", "bsc", "calcutta"],
    response:
      "Sagnik's Academic Background:\n🎓 **M.Sc. in Data Science & AI** @ RKMVERI Belur (2025–Present)\n🎓 **B.Sc. (Hons) in Mathematics** @ University of Calcutta (2020–2023)",
    action: { label: "View Education", scrollToId: "education" },
  },
  {
    keywords: ["skills", "python", "pytorch", "pyspark", "tools", "stack", "neo4j", "langchain", "ollama", "sql"],
    response:
      "Sagnik's technical stack:\n• **Languages & Frameworks**: Python, PyTorch, TensorFlow, Keras, LangChain, C, SQL\n• **AI & Data Science**: Ollama, Hugging Face, NumPy, Pandas, Scikit-Learn\n• **Data Systems & Tools**: PySpark, Neo4j, MySQL, Git, Docker, Linux, Jupyter, Anaconda",
    action: { label: "View Stack", scrollToId: "skills" },
  },
  {
    keywords: ["contact", "email", "hire", "job", "reach", "linkedin", "github"],
    response:
      "Feel free to reach out directly:\n📬 **Email**: sagnikchandra@gmail.com\n🐙 **GitHub**: github.com/csagnik1302\n💼 **LinkedIn**: linkedin.com/in/sagnik-chandra-52b0a111a/",
    action: { label: "Get in Touch", scrollToId: "contact" },
  },
];

const SUGGESTED_CHIPS = [
  "⚡ Research on Lost in the Middle",
  "📁 What are Sagnik's top projects?",
  "🎓 Education & Degree",
  "🛠️ Technical Stack",
  "📄 View Resume",
];

export function AIChatDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "👋 Hi! I'm Sagnik's AI Assistant. Ask me anything about Sagnik's ML research on LLM retrieval, PyTorch/PySpark projects, or background!",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
      text: "Sagnik Chandra is an Aspiring Machine Learning Engineer & Researcher pursuing an M.Sc. in Data Science & AI @ RKMVERI. He works on LLM retrieval ('Lost in the Middle' research), RAG pipelines, graph mining, and deep learning.",
      action: { label: "View Resume PDF", url: RESUME_URL },
    };
  };

  const handleSend = (customQuery?: string) => {
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
    }, 400);
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
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#15171C] border border-white/15 text-white shadow-xl hover:border-blue-400 hover:scale-105 transition-all text-xs font-mono"
        aria-label="Open AI Assistant"
      >
        <Sparkles className="w-4 h-4 text-blue-400" />
        <span>Ask Sagnik AI</span>
      </button>

      {/* Slide-out Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs">
          <div
            className="w-full sm:w-[400px] h-full bg-[#0E0F12] border-l border-white/10 flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-[#15171C] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-blue-400" />
                <h3 className="text-xs font-mono font-bold text-white">Sagnik's AI Twin</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded text-[#9CA3AF] hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat History */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs font-mono">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className="space-y-1.5 max-w-[85%]">
                    <div
                      className={`p-3 rounded-xl leading-relaxed whitespace-pre-wrap ${
                        msg.sender === "user"
                          ? "bg-blue-600 text-white font-medium rounded-tr-none"
                          : "bg-[#15171C] text-[#F3F4F6] border border-white/10 rounded-tl-none"
                      }`}
                    >
                      {msg.text}
                    </div>

                    {msg.actionButton && (
                      <button
                        onClick={() => handleActionClick(msg.actionButton!)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-[11px] text-blue-400 font-semibold transition-all"
                      >
                        <span>{msg.actionButton.label}</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="text-[11px] text-[#9CA3AF] font-mono italic">Thinking...</div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Chips */}
            <div className="p-2 border-t border-white/5 bg-[#15171C]/50 overflow-x-auto flex gap-1.5 no-scrollbar">
              {SUGGESTED_CHIPS.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(chip)}
                  disabled={isTyping}
                  className="px-2.5 py-1 rounded-full bg-[#1C1E24] border border-white/10 text-[10px] font-mono text-[#9CA3AF] hover:text-white whitespace-nowrap transition-all shrink-0"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/10 bg-[#15171C]">
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
                  placeholder="Ask a question..."
                  disabled={isTyping}
                  className="flex-1 px-3 py-2 rounded-lg bg-[#0E0F12] border border-white/10 text-xs font-mono text-white placeholder-[#6B7280] focus:outline-none focus:border-blue-400"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="p-2 rounded-lg bg-blue-600 text-white disabled:opacity-40 hover:bg-blue-500 transition-all shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
