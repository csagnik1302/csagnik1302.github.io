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

// 1. Load Knowledge Base JSON Files
import profileKB from "@/knowledge-base/01_profile.json";
import experienceKB from "@/knowledge-base/02_experience.json";
import projectsKB from "@/knowledge-base/03_projects.json";
import skillsKB from "@/knowledge-base/04_skills.json";
import educationKB from "@/knowledge-base/05_education.json";
import interestsKB from "@/knowledge-base/06_interests.json";
import contactKB from "@/knowledge-base/07_contact.json";

const RESUME_URL = contactKB.resume;

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content?: string;
  type?: "me" | "projects" | "experience" | "skills" | "education" | "contact" | "custom";
  title?: string;
  timestamp: string;
}

// 2. Build 1st-Person Knowledge Base System Instruction
const SYSTEM_PROMPT = `
You are Sagnik Chandra speaking directly to visitors on your personal portfolio website.

[CRITICAL NARRATIVE RULES]
1. ALWAYS speak in FIRST PERSON ("I", "my", "me"). You ARE Sagnik Chandra. Never speak in 3rd person.
2. Be humble, warm, natural, and conversational.
3. For simple greetings or casual small-talk ("hi", "hello", "hey", "how are you", "what's up"), respond warmly and naturally like a friendly person (e.g. "Hey there! 👋 Welcome to my website. How's your day going?"). DO NOT forcibly dump your internship, resume, or background into simple greetings unless specifically asked.
4. For technical, background, research, or project questions, ground your answers in my Knowledge Base below.

[MY KNOWLEDGE BASE]
• Profile: Sagnik Chandra | ${profileKB.items[0].role} | ${profileKB.items[0].location}
• Education: ${educationKB.items[0].degree} (${educationKB.items[0].period}) @ ${educationKB.items[0].institution}
• Research Internship 1: ${experienceKB.items[0].role} @ ${experienceKB.items[0].company} (${experienceKB.items[0].period}) — ${experienceKB.items[0].description}
• Internship 2: ${experienceKB.items[1].role} @ ${experienceKB.items[1].company} (${experienceKB.items[1].period}) — ${experienceKB.items[1].description}
• Featured ML Projects:
  1. ${projectsKB.items[0].title}: ${projectsKB.items[0].description}
  2. ${projectsKB.items[1].title}: ${projectsKB.items[1].description}
  3. ${projectsKB.items[2].title}: ${projectsKB.items[2].description}
  4. ${projectsKB.items[3].title}: ${projectsKB.items[3].description}
• Technical Stack:
  - Languages: ${skillsKB.languages.join(", ")}
  - Frameworks: ${skillsKB.frameworks.join(", ")}
  - Tools: ${skillsKB.tools.join(", ")}
• Personal Interests: ${interestsKB.items[0].description}
`;

// 3. Pill Card Prompts Mapping
const CARD_PROMPTS: Record<string, { prompt: string; type: ChatMessage["type"]; title: string }> = {
  me: {
    prompt: "Who are you? I want to know more about you.",
    type: "me",
    title: "About Me — Sagnik Chandra",
  },
  projects: {
    prompt: "What projects have you built?",
    type: "projects",
    title: "My Featured ML Projects",
  },
  experience: {
    prompt: "Tell me about your research and work experience.",
    type: "experience",
    title: "My Research & Work Experience",
  },
  skills: {
    prompt: "What are your technical skills and stack?",
    type: "skills",
    title: "My Technical Stack & Tools",
  },
  education: {
    prompt: "What is your academic background?",
    type: "education",
    title: "My Academic Background",
  },
  contact: {
    prompt: "How can I contact you or view your resume?",
    type: "contact",
    title: "Contact Me & Resume",
  },
};

// 4. Vector Space Engine for Pill Card Similarity Detection
function textToVector(text: string): Record<string, number> {
  const words = text.toLowerCase().replace(/[^\w\s]/g, "").split(/\s+/).filter(Boolean);
  const vec: Record<string, number> = {};
  for (const w of words) {
    vec[w] = (vec[w] || 0) + 2.0;
    if (w.length >= 3) {
      for (let i = 0; i < w.length - 2; i++) {
        const tri = w.substring(i, i + 3);
        vec[tri] = (vec[tri] || 0) + 0.5;
      }
    }
  }
  let norm = 0;
  for (const k in vec) norm += vec[k] * vec[k];
  norm = Math.sqrt(norm);
  if (norm > 0) {
    for (const k in vec) vec[k] /= norm;
  }
  return vec;
}

function cosineSimilarity(vecA: Record<string, number>, vecB: Record<string, number>): number {
  let dot = 0;
  for (const k in vecA) {
    if (vecB[k]) dot += vecA[k] * vecB[k];
  }
  return dot;
}

const PILL_VECTORS = Object.entries(CARD_PROMPTS).map(([key, item]) => ({
  type: item.type,
  title: item.title,
  vector: textToVector(item.prompt + " " + key + " " + item.title),
}));

const PILL_MATCH_THRESHOLD = 0.70;

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
  const [cooldown, setCooldown] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const responseCacheRef = useRef<Record<string, { text?: string; title: string; type: ChatMessage["type"] }>>({});

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setInputQuery("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }

    try {
      const savedCache = sessionStorage.getItem("sagnik_chat_cache_v3");
      if (savedCache) responseCacheRef.current = JSON.parse(savedCache);
    } catch {}

    if (initialPrompt) {
      if (initialPrompt.type in CARD_PROMPTS) {
        const item = CARD_PROMPTS[initialPrompt.type];
        triggerAnimatedStream(item.prompt, item.type, item.title);
      } else if (initialPrompt.query) {
        processUserQuery(initialPrompt.query);
      }
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
    if (!isTyping) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [messages, isTyping]);

  const saveToCache = (qKey: string, text: string | undefined, title: string, type: ChatMessage["type"]) => {
    if (type === "custom" && !text) return; // Do not cache empty custom responses
    responseCacheRef.current[qKey] = { text, title, type };
    try {
      sessionStorage.setItem("sagnik_chat_cache_v3", JSON.stringify(responseCacheRef.current));
    } catch {}
  };

  const triggerAnimatedStream = (userPrompt: string, responseType: ChatMessage["type"], title?: string) => {
    const userMsg: ChatMessage = {
      id: Date.now().toString() + "-user",
      role: "user",
      content: userPrompt,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

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

  // Secure Cloudflare Worker Proxy LLM Engine (Zero Key Exposure, Blazing Fast ~300ms)
  const generateLLMResponse = async (queryText: string): Promise<{ text?: string; title: string; type: ChatMessage["type"] }> => {
    const qKey = queryText.trim().toLowerCase();

    // 1. Cache Check
    if (responseCacheRef.current[qKey] && responseCacheRef.current[qKey].text) {
      return responseCacheRef.current[qKey];
    }

    // 2. Semantic Pill Card Matching (Strict Threshold 0.70 for exact card triggers)
    const userVec = textToVector(queryText);
    let maxSim = 0;
    let pillMatch: { type: ChatMessage["type"]; title: string } | null = null;

    for (const pill of PILL_VECTORS) {
      const sim = cosineSimilarity(userVec, pill.vector);
      if (sim > maxSim) {
        maxSim = sim;
        pillMatch = pill;
      }
    }

    if (pillMatch && maxSim >= PILL_MATCH_THRESHOLD) {
      const result = { title: pillMatch.title, type: pillMatch.type };
      saveToCache(qKey, undefined, result.title, result.type);
      return result;
    }

    // Helper timeout wrapper
    const fetchWithTimeout = async (url: string, options: RequestInit, timeoutMs = 8000) => {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeoutMs);
      try {
        const res = await fetch(url, { ...options, signal: controller.signal });
        clearTimeout(id);
        return res;
      } catch (e) {
        clearTimeout(id);
        throw e;
      }
    };

    // 3. Cloudflare Worker LLM Proxy Call (Groq Llama 3.1 8B Instant)
    const WORKER_URL = "https://sagnik-portfolio-ai.sagnikchandra.workers.dev/";

    try {
      const res = await fetchWithTimeout(
        WORKER_URL,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: queryText,
            systemPrompt: SYSTEM_PROMPT,
          }),
        },
        8000
      );

      if (res.ok) {
        const data = await res.json();
          if (data && data.text && data.text.trim()) {
            const result = { text: data.text.trim(), title: "AI Response", type: "custom" as const };
            saveToCache(qKey, result.text, result.title, "custom");
            return result;
          }
      }
    } catch (err) {
      console.warn("Cloudflare Worker LLM Proxy call failed:", err);
    }

    // 4. Smart Intent RAG Engine Fallback
    const words = qKey.replace(/[^\w\s]/g, "").split(/\s+/).filter(Boolean);

    const isGreeting = words.some(w => ["hi", "hii", "hiii", "hey", "heyy", "hello", "yo", "sup", "greetings", "weather", "nice", "good", "morning", "afternoon", "evening"].includes(w)) || qKey.includes("whats up") || qKey.includes("how are you");
    const isResearch = qKey.includes("research") || qKey.includes("lost in the middle") || qKey.includes("isi") || qKey.includes("kolkata") || qKey.includes("rag") || qKey.includes("retrieval");
    const isProject = qKey.includes("project") || qKey.includes("style transfer") || qKey.includes("bengali") || qKey.includes("academiclens") || qKey.includes("drone") || qKey.includes("stellar") || qKey.includes("graph");
    const isSkills = qKey.includes("skill") || qKey.includes("stack") || qKey.includes("python") || qKey.includes("pytorch") || qKey.includes("pyspark") || qKey.includes("language") || qKey.includes("tool") || qKey.includes("framework") || words.includes("c") || words.includes("r") || qKey.includes("sql");
    const isEducation = qKey.includes("education") || qKey.includes("study") || qKey.includes("rkmveri") || qKey.includes("degree") || qKey.includes("msc") || qKey.includes("bsc") || qKey.includes("college") || qKey.includes("university") || qKey.includes("math");
    const isContact = qKey.includes("contact") || qKey.includes("email") || qKey.includes("resume") || qKey.includes("reach") || qKey.includes("hire") || qKey.includes("linkedin") || qKey.includes("github");
    const isBio = qKey.includes("who are you") || qKey.includes("about") || qKey.includes("bio") || qKey.includes("background") || qKey.includes("sagnik");

    let textOut = "";

    if (isGreeting && !isResearch && !isProject && !isSkills) {
      textOut = `Hey there! 👋 Welcome to my portfolio website. How's your day going? Feel free to ask me about my research, projects, or background!`;
    } else if (isResearch) {
      textOut = `At the **Indian Statistical Institute (ISI)** in Kolkata, my research focuses on the **"Lost in the Middle"** phenomenon in Large Language Models (LLMs) and RAG pipelines.\n\nI evaluate how document ordering and context placement within long prompts impact factual retrieval accuracy and attention weight distribution using datasets derived from NaturalQuestions and TREC RAG benchmarks.`;
    } else if (isProject) {
      textOut = `Here are a few of my highlighted Machine Learning & Systems projects:\n\n1. **Neural Literary Style Transfer**: Semi-automated Bengali sentence rewriting pipeline using BiGRU encoders with Gradient Reversal Layers (GRL).\n2. **AcademicLens**: Citation graph intelligence system over 10M+ research papers built with PySpark ETL & Neo4j PageRank.\n3. **Stellar Object Classification**: Multi-class SDSS DR18 galaxy/quasar/star classifier with CatBoost & XGBoost (>99% accuracy).\n4. **Drone Delivery Route Optimisation**: Traffic congestion-aware delivery route optimization using stochastic hill climbing.`;
    } else if (isSkills) {
      textOut = `Here is my current technical stack & framework expertise:\n\n• **Languages**: ${skillsKB.languages.join(", ")}\n• **Frameworks & ML**: ${skillsKB.frameworks.join(", ")}\n• **Tools & Platforms**: ${skillsKB.tools.join(", ")}`;
    } else if (isEducation) {
      textOut = `My Academic Background:\n\n🎓 **M.Sc. in Data Science & Artificial Intelligence**\nRamakrishna Mission Vivekananda Educational and Research Institute (RKMVERI), Belur (2025–2027)\n*Focusing on Deep Learning, NLP, RAG Pipelines, and Distributed Systems.*\n\n🎓 **B.Sc. (Hons) in Mathematics**\nUniversity of Calcutta (2020–2023)`;
    } else if (isContact) {
      textOut = `Feel free to connect or reach out directly:\n\n📬 **Email**: sagnikchandra@gmail.com\n🐙 **GitHub**: github.com/csagnik1302\n💼 **LinkedIn**: linkedin.com/in/sagnik-chandra-52b0a111a/\n📄 **Resume**: Click the button below to view or download my official Resume PDF.`;
    } else if (isBio) {
      textOut = `I'm Sagnik Chandra, a Machine Learning Engineer & AI Researcher based in Kolkata, India. Driven by deep learning and mathematical rigor, I research LLM retrieval at ISI Kolkata and build distributed ML systems. In my free time, I enjoy reading medieval history, psychology, competitive chess, and gaming!`;
    } else {
      textOut = `I'm Sagnik Chandra, an AI researcher interning at ISI Kolkata and pursuing an M.Sc. in Data Science & AI at RKMVERI Belur. I specialize in LLM retrieval, PyTorch/PySpark engineering, and graph mining. How can I assist you with my research, projects, or background?`;
    }

    const result = {
      title: `Response to "${queryText}"`,
      text: textOut,
      type: "custom" as const,
    };
    saveToCache(qKey, result.text, result.title, "custom");
    return result;
  };

  const processUserQuery = async (queryText: string) => {
    const userMsg: ChatMessage = {
      id: Date.now().toString() + "-user",
      role: "user",
      content: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true); // Aspect 4: Processing symbol active

    const { text, title, type } = await generateLLMResponse(queryText);

    setIsTyping(false); // Aspect 4: Processing symbol complete
    const assistantMsg: ChatMessage = {
      id: Date.now().toString() + "-assistant",
      role: "assistant",
      type: type,
      content: text,
      title: title,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, assistantMsg]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const queryToSubmit = inputQuery.trim() || inputRef.current?.value.trim() || "";
    if (!queryToSubmit || isTyping || cooldown) return;

    setCooldown(true);
    setTimeout(() => setCooldown(false), 1000);

    processUserQuery(queryToSubmit);
    
    setInputQuery("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handlePillClick = (cardKey: keyof typeof CARD_PROMPTS) => {
    if (isTyping || cooldown) return;
    const item = CARD_PROMPTS[cardKey];

    setCooldown(true);
    setTimeout(() => setCooldown(false), 1000);
    
    let i = 0;
    const fullText = item.prompt;
    setInputQuery("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }

    const interval = setInterval(() => {
      if (i < fullText.length) {
        const partial = fullText.substring(0, i + 1);
        setInputQuery(partial);
        if (inputRef.current) {
          inputRef.current.value = partial;
        }
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          triggerAnimatedStream(item.prompt, item.type, item.title);
          setInputQuery("");
          if (inputRef.current) {
            inputRef.current.value = "";
          }
        }, 100);
      }
    }, 10);
  };

  const isSubmitDisabled = isTyping || cooldown || (!inputQuery.trim() && !inputRef.current?.value.trim());

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
          onClick={() => {
            setMessages([]);
            setInputQuery("");
            if (inputRef.current) inputRef.current.value = "";
          }}
          className="p-2 rounded-xl bg-[#0B0D12] hover:bg-white/10 text-[#9CA3AF] hover:text-white transition-colors flex items-center gap-1.5 text-xs font-mono"
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
              Select a quick prompt below or type your question in the chat bar to explore my background, research, projects, and skills.
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

            {/* SECOND: Assistant Output Card Centered */}
            {msg.role === "assistant" && (
              <div className="flex justify-center w-full animate-slide-in-right">
                <div className="w-full max-w-4xl bg-[#12151E] border border-white/10 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-5 text-slate-200">
                  {/* Aspect 3: Render 1st-Person Card Views or Text Responses */}
                  {msg.type === "me" && (
                    <div className="space-y-6">
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
                            <p className="text-xs font-mono text-blue-400 font-semibold pt-0.5">
                              Machine Learning & AI Researcher
                            </p>
                          </div>

                          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                            Driven by deep learning and intelligent retrieval systems. Currently advancing LLM research at ISI Kolkata and pursuing an M.Sc. in Data Science & AI at RKMVERI.
                          </p>

                          <div className="flex flex-wrap justify-center sm:justify-start gap-1.5 pt-1">
                            <span className="px-2.5 py-1 rounded-full bg-blue-500/15 text-blue-300 text-xs font-mono border border-blue-500/30">
                              Kolkata
                            </span>
                            <span className="px-2.5 py-1 rounded-full bg-white/10 text-slate-200 text-xs font-mono border border-white/10">
                              MLE
                            </span>
                            <span className="px-2.5 py-1 rounded-full bg-white/10 text-slate-200 text-xs font-mono border border-white/10">
                              NLP
                            </span>
                            <span className="px-2.5 py-1 rounded-full bg-white/10 text-slate-200 text-xs font-mono border border-white/10">
                              LLMs
                            </span>
                            <span className="px-2.5 py-1 rounded-full bg-white/10 text-slate-200 text-xs font-mono border border-white/10">
                              RAG
                            </span>
                            <span className="px-2.5 py-1 rounded-full bg-white/10 text-slate-200 text-xs font-mono border border-white/10">
                              MCP
                            </span>
                            <span className="px-2.5 py-1 rounded-full bg-white/10 text-slate-200 text-xs font-mono border border-white/10">
                              ISI
                            </span>
                            <span className="px-2.5 py-1 rounded-full bg-white/10 text-slate-200 text-xs font-mono border border-white/10">
                              RKMVERI
                            </span>
                            <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-mono border border-emerald-500/30">
                              Gamer
                            </span>
                            <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-mono border border-emerald-500/30">
                              Chessist
                            </span>
                            <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-mono border border-emerald-500/30">
                              Historian
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed pt-5 border-t border-white/10">
                        <p>
                          My focus in Artificial Intelligence stems from a deep curiosity about how neural networks process context and attention. At the <strong className="text-white font-semibold">Indian Statistical Institute (ISI)</strong>, I investigate the <strong className="text-white font-semibold font-mono text-blue-300">"Lost in the Middle"</strong> phenomenon in Large Language Models — evaluating how document order and context placement affect factual retrieval in multi-document RAG architectures using NaturalQuestions and TREC RAG benchmarks.
                        </p>

                        <p>
                          Beyond core model evaluation, I actively build with modern AI paradigms including <strong className="text-white font-semibold">Model Context Protocol (MCP)</strong>, <strong className="text-white font-semibold">LangChain</strong>, <strong className="text-white font-semibold">PyTorch</strong>, and distributed PySpark & Neo4j graph pipelines. I love bridging theoretical mathematical concepts with high-throughput production systems.
                        </p>

                        <p>
                          Outside of research papers and terminal windows, I am a passionate reader of <strong className="text-white font-semibold">Modern & Medieval History</strong> and behavioral <strong className="text-white font-semibold">Psychology</strong>. I am also a competitive <strong className="text-white font-semibold">chess player</strong> and dedicated <strong className="text-white font-semibold">gamer</strong> — passions that continuously sharpen my strategic problem-solving mindset.
                        </p>
                      </div>

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
                    </div>
                  )}
                </div>
              </div>
            )}
          </React.Fragment>
        ))}

        {/* Aspect 4: Animated Processing Symbol (Typing dots) */}
        {isTyping && (
          <div className="flex justify-center animate-fade-in pt-2">
            <div className="flex items-center gap-3 text-xs font-mono text-[#9CA3AF] bg-white/5 border border-white/10 px-4 py-2 rounded-2xl">
              <Sparkles className="w-4 h-4 text-blue-400 animate-spin" />
              <span>Thinking...</span>
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

      {/* Floating Bottom Input Dock */}
      <footer
        className="fixed bottom-0 inset-x-0 z-30 p-4 bg-gradient-to-t from-[#0B0D12] via-[#0B0D12]/95 to-transparent backdrop-blur-xl cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full max-w-2xl mx-auto space-y-3">
          {/* Quick Action Pill Buttons Grid */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto py-1 no-scrollbar">
            <button
              onClick={() => handlePillClick("me")}
              disabled={isTyping || cooldown}
              className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white flex items-center gap-1.5 shrink-0 transition-all active:scale-95 disabled:opacity-50"
            >
              <Smile className="w-3.5 h-3.5 text-emerald-400" />
              <span>Me</span>
            </button>
            <button
              onClick={() => handlePillClick("projects")}
              disabled={isTyping || cooldown}
              className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white flex items-center gap-1.5 shrink-0 transition-all active:scale-95 disabled:opacity-50"
            >
              <Briefcase className="w-3.5 h-3.5 text-blue-400" />
              <span>Projects</span>
            </button>
            <button
              onClick={() => handlePillClick("experience")}
              disabled={isTyping || cooldown}
              className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white flex items-center gap-1.5 shrink-0 transition-all active:scale-95 disabled:opacity-50"
            >
              <Code2 className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Experience</span>
            </button>
            <button
              onClick={() => handlePillClick("skills")}
              disabled={isTyping || cooldown}
              className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white flex items-center gap-1.5 shrink-0 transition-all active:scale-95 disabled:opacity-50"
            >
              <Layers className="w-3.5 h-3.5 text-purple-400" />
              <span>Skills</span>
            </button>
            <button
              onClick={() => handlePillClick("education")}
              disabled={isTyping || cooldown}
              className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white flex items-center gap-1.5 shrink-0 transition-all active:scale-95 disabled:opacity-50"
            >
              <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
              <span>Education</span>
            </button>
            <button
              onClick={() => handlePillClick("contact")}
              disabled={isTyping || cooldown}
              className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white flex items-center gap-1.5 shrink-0 transition-all active:scale-95 disabled:opacity-50"
            >
              <Mail className="w-3.5 h-3.5 text-pink-400" />
              <span>Contact</span>
            </button>
          </div>

          {/* Search Input Bar */}
          <form onSubmit={handleSubmit} className="relative w-full">
            <div className="mx-auto flex items-center rounded-full border border-white/15 bg-[#12151E]/90 py-2.5 pr-2.5 pl-6 backdrop-blur-2xl transition-all hover:border-white/30 focus-within:border-blue-500 shadow-2xl">
              <input
                ref={inputRef}
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Ask me anything..."
                autoComplete="off"
                autoFocus
                disabled={isTyping || cooldown}
                className="w-full border-none bg-transparent text-sm text-white placeholder-[#9CA3AF] focus:outline-none disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isSubmitDisabled}
                aria-label="Submit question"
                className="flex items-center justify-center rounded-full bg-[#0171E3] hover:bg-blue-600 p-2.5 text-white transition-all disabled:opacity-50 shrink-0 cursor-pointer"
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
