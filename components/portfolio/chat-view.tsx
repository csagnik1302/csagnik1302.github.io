"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Smile,
  Briefcase,
  Layers,
  GraduationCap,
  Mail,
  Phone,
  Instagram,
  Send,
  CheckCircle2,
  MessageSquare,
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

// 1. Load Knowledge Base Files & Dynamic Auto-Scanner
import {
  profileKB,
  experienceKB,
  projectsKB,
  skillsKB,
  educationKB,
  interestsKB,
  contactKB,
  getDynamicKnowledgeBaseContext,
} from "@/knowledge-base/index";

const RESUME_URL = contactKB.resume;

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content?: string;
  type?: "me" | "projects" | "experience" | "skills" | "education" | "contact" | "custom";
  intentCategory?: "me" | "projects" | "experience" | "skills" | "education" | "contact";
  title?: string;
  timestamp: string;
}

// 2. Build 1st-Person Knowledge Base System Instruction
const SYSTEM_PROMPT = `
You are Sagnik Chandra speaking directly to visitors on your personal portfolio website.

[CRITICAL PERSONA & NARRATIVE RULES]
1. ALWAYS speak in FIRST PERSON ("I", "my", "me"). You ARE Sagnik Chandra. Never speak in 3rd person.
2. PERSONA: You are a chill, relaxed, authentic, and friendly guy. Keep tone natural, warm, and conversational.
3. NO FORCED SELF-PROMOTION OR INFO DUMPING: Never pitch, sell, or forcibly dump your resume, education, internships, projects, or technical background into casual greetings or idle chit-chat (like "hi", "hey", "what's up", "how's it going").
   - For idle/casual greetings ("what's up", "hey", "how are you", "yo"), respond casually and warmly like a chill friend (e.g. "Hey! Not much, just hanging out and working on some cool stuff. How's your day going?").
   - ONLY mention education, research, projects, or technical background if the visitor explicitly asks about them or if directly relevant to their prompt.
4. For technical, background, research, or project questions, ground your answers strictly in my Knowledge Base below.
5. CONCISE OUTPUT LENGTH: Keep responses brief, crisp, and to-the-point (1 to 2 short paragraphs max).

[COMPLETE KNOWLEDGE BASE REPOSITORY]
${getDynamicKnowledgeBaseContext()}
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
  
  const [reachoutName, setReachoutName] = useState("");
  const [reachoutEmail, setReachoutEmail] = useState("");
  const [reachoutMessage, setReachoutMessage] = useState("");
  const [reachoutSent, setReachoutSent] = useState(false);

  const handleReachoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reachoutMessage.trim()) return;

    const subject = encodeURIComponent(`Message from Portfolio Visitor: ${reachoutName || "Anonymous"}`);
    const body = encodeURIComponent(
      `Name: ${reachoutName || "Not provided"}\nEmail: ${reachoutEmail || "Not provided"}\n\nMessage:\n${reachoutMessage}`
    );

    window.open(`mailto:${contactKB.email}?subject=${subject}&body=${body}`, "_blank");
    setReachoutSent(true);
  };
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const responseCacheRef = useRef<Record<string, { text?: string; title: string; type: ChatMessage["type"]; intentCategory?: ChatMessage["intentCategory"] }>>({});

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setInputQuery("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }

    try {
      const savedCache = sessionStorage.getItem("sagnik_chat_cache_v6");
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

  const saveToCache = (qKey: string, text: string | undefined, title: string, type: ChatMessage["type"], intentCategory?: ChatMessage["intentCategory"]) => {
    if (type === "custom" && !text) return; // Do not cache empty custom responses
    responseCacheRef.current[qKey] = { text, title, type, intentCategory };
    try {
      sessionStorage.setItem("sagnik_chat_cache_v6", JSON.stringify(responseCacheRef.current));
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
  const generateLLMResponse = async (queryText: string): Promise<{ text?: string; title: string; type: ChatMessage["type"]; intentCategory?: ChatMessage["intentCategory"] }> => {
    const qKey = queryText.trim().toLowerCase();

    // 1. Cache Check
    if (responseCacheRef.current[qKey]) {
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
      const result = { title: pillMatch.title, type: pillMatch.type, intentCategory: pillMatch.type as ChatMessage["intentCategory"] };
      saveToCache(qKey, undefined, result.title, result.type, result.intentCategory);
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

    // Helper to detect query intent and match color theme
    const detectIntentCategory = (qStr: string): ChatMessage["intentCategory"] => {
      const q = qStr.toLowerCase();
      if (q.includes("research") || q.includes("lost in the middle") || q.includes("isi") || q.includes("experience") || q.includes("work") || q.includes("intern")) {
        return "experience";
      }
      if (q.includes("education") || q.includes("study") || q.includes("rkmveri") || q.includes("degree") || q.includes("msc") || q.includes("bsc") || q.includes("college") || q.includes("university") || q.includes("math")) {
        return "education";
      }
      if (q.includes("project") || q.includes("bengali") || q.includes("academiclens") || q.includes("drone") || q.includes("stellar") || q.includes("graph")) {
        return "projects";
      }
      if (q.includes("skill") || q.includes("stack") || q.includes("python") || q.includes("pytorch") || q.includes("pyspark") || q.includes("language") || q.includes("tool") || q.includes("framework") || q.includes("sql")) {
        return "skills";
      }
      if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("reach") || q.includes("hire") || q.includes("linkedin") || q.includes("github") || q.includes("instagram")) {
        return "contact";
      }
      return "me";
    };

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
          const cat = detectIntentCategory(queryText);
          const result = { text: data.text.trim(), title: "AI Response", type: "custom" as const, intentCategory: cat };
          saveToCache(qKey, result.text, result.title, "custom", cat);
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

    let textOut = "";
    let cat: ChatMessage["intentCategory"] = "me";

    if (isGreeting && !isResearch && !isProject && !isSkills) {
      textOut = `Hey! 👋 Not much, just chilling and working on some cool stuff. How's your day going?`;
      cat = "me";
    } else if (isResearch) {
      textOut = `At the **Indian Statistical Institute (ISI)** in Kolkata, my research focuses on the **"Lost in the Middle"** phenomenon in Large Language Models (LLMs) and RAG pipelines.\n\nI evaluate how document ordering and context placement within long prompts impact factual retrieval accuracy and attention weight distribution using datasets derived from NaturalQuestions and TREC RAG benchmarks.`;
      cat = "experience";
    } else if (isProject) {
      textOut = `Here are a few of my highlighted Machine Learning & Systems projects:\n\n1. **Neural Literary Style Transfer**: Semi-automated Bengali sentence rewriting pipeline using BiGRU encoders with Gradient Reversal Layers (GRL).\n2. **AcademicLens**: Citation graph intelligence system over 10M+ research papers built with PySpark ETL & Neo4j PageRank.\n3. **Stellar Object Classification**: Multi-class SDSS DR18 galaxy/quasar/star classifier with CatBoost & XGBoost (>99% accuracy).\n4. **Drone Delivery Route Optimisation**: Traffic congestion-aware delivery route optimization using stochastic hill climbing.`;
      cat = "projects";
    } else if (isSkills) {
      textOut = `Here is my current technical stack & framework expertise:\n\n• **Languages**: ${skillsKB.languages.join(", ")}\n• **Frameworks & ML**: ${skillsKB.frameworks.join(", ")}\n• **Tools & Platforms**: ${skillsKB.tools.join(", ")}`;
      cat = "skills";
    } else if (isEducation) {
      textOut = `My Academic Background:\n\n🎓 **M.Sc. in Data Science & Artificial Intelligence**\nRamakrishna Mission Vivekananda Educational and Research Institute (RKMVERI), Belur (2025–2027)\n*Focusing on Deep Learning, NLP, RAG Pipelines, and Distributed Systems.*\n\n🎓 **B.Sc. (Hons) in Mathematics**\nUniversity of Calcutta (2020–2023)`;
      cat = "education";
    } else if (isContact) {
      textOut = `Feel free to connect or reach out directly:\n\n📬 **Email**: sagnikchandra@gmail.com\n🐙 **GitHub**: github.com/csagnik1302\n💼 **LinkedIn**: linkedin.com/in/sagnik-chandra-52b0a111a/\n📄 **Resume**: Click the button below to view or download my official Resume PDF.`;
      cat = "contact";
    } else {
      textOut = `Hey there! 👋 I'm Sagnik. What's on your mind today?`;
      cat = "me";
    }

    const result = {
      title: `Response to "${queryText}"`,
      text: textOut,
      type: "custom" as const,
      intentCategory: cat,
    };
    saveToCache(qKey, result.text, result.title, "custom", cat);
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

    const { text, title, type, intentCategory } = await generateLLMResponse(queryText);

    setIsTyping(false); // Aspect 4: Processing symbol complete
    const assistantMsg: ChatMessage = {
      id: Date.now().toString() + "-assistant",
      role: "assistant",
      type: type,
      intentCategory: intentCategory,
      content: text,
      title: title,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, assistantMsg]);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 30);
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
      inputRef.current.focus();
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
      {/* Top Navigation Bar - Fixed Pinned to Top */}
      <header
        className="fixed top-0 inset-x-0 z-40 flex items-center justify-between px-4 sm:px-8 py-3.5 bg-[#12151E]/95 backdrop-blur-2xl border-b border-white/10 shadow-xl cursor-default"
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
        className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-24 py-6 space-y-6 pb-44 cursor-default"
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
                {(() => {
                  const activeTheme = msg.intentCategory || (msg.type !== "custom" ? msg.type : "me");
                  return (
                    <div className={`w-full max-w-4xl rounded-3xl p-5 sm:p-7 shadow-xl space-y-5 text-slate-200 transition-all border ${
                      activeTheme === "me" ? "bg-gradient-to-b from-emerald-950/25 via-[#12151E] to-[#12151E] border-emerald-500/35 shadow-[0_4px_25px_rgba(16,185,129,0.08)]" :
                      activeTheme === "experience" ? "bg-gradient-to-b from-sky-950/25 via-[#12151E] to-[#12151E] border-sky-500/35 shadow-[0_4px_25px_rgba(56,189,248,0.08)]" :
                      activeTheme === "education" ? "bg-gradient-to-b from-amber-950/25 via-[#12151E] to-[#12151E] border-amber-500/35 shadow-[0_4px_25px_rgba(245,158,11,0.08)]" :
                      activeTheme === "projects" ? "bg-gradient-to-b from-blue-950/25 via-[#12151E] to-[#12151E] border-blue-500/35 shadow-[0_4px_25px_rgba(59,130,246,0.08)]" :
                      activeTheme === "skills" ? "bg-gradient-to-b from-purple-950/25 via-[#12151E] to-[#12151E] border-purple-500/35 shadow-[0_4px_25px_rgba(168,85,247,0.08)]" :
                      activeTheme === "contact" ? "bg-gradient-to-b from-pink-950/25 via-[#12151E] to-[#12151E] border-pink-500/35 shadow-[0_4px_25px_rgba(236,72,153,0.08)]" :
                      "bg-[#12151E] border-white/10"
                    }`}>
                      {/* Visual Header Pill Badge */}
                      {msg.type !== "custom" && (
                        <div className="flex items-center justify-between border-b border-white/10 pb-4">
                          <div className="flex items-center gap-2">
                            {msg.type === "me" && (
                              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300/90 text-xs font-mono font-medium uppercase tracking-wider flex items-center gap-1.5">
                                <Smile className="w-3.5 h-3.5 text-emerald-400/80" />
                                <span>Me / Profile</span>
                              </span>
                            )}
                            {msg.type === "experience" && (
                              <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300/90 text-xs font-mono font-medium uppercase tracking-wider flex items-center gap-1.5">
                                <Code2 className="w-3.5 h-3.5 text-[#38BDF8]/80" />
                                <span>Work & Research Experience</span>
                              </span>
                            )}
                            {msg.type === "education" && (
                              <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300/90 text-xs font-mono font-medium uppercase tracking-wider flex items-center gap-1.5">
                                <GraduationCap className="w-3.5 h-3.5 text-amber-400/80" />
                                <span>Academic Education</span>
                              </span>
                            )}
                            {msg.type === "projects" && (
                              <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300/90 text-xs font-mono font-medium uppercase tracking-wider flex items-center gap-1.5">
                                <Briefcase className="w-3.5 h-3.5 text-blue-400/80" />
                                <span>Featured AI Projects</span>
                              </span>
                            )}
                            {msg.type === "skills" && (
                              <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300/90 text-xs font-mono font-medium uppercase tracking-wider flex items-center gap-1.5">
                                <Layers className="w-3.5 h-3.5 text-purple-400/80" />
                                <span>Technical Stack & Skills</span>
                              </span>
                            )}
                            {msg.type === "contact" && (
                              <span className="px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300/90 text-xs font-mono font-medium uppercase tracking-wider flex items-center gap-1.5">
                                <Mail className="w-3.5 h-3.5 text-pink-400/80" />
                                <span>Contact & Direct Reach-Out</span>
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] font-mono text-slate-400">{msg.timestamp}</span>
                        </div>
                      )}
                  {/* Aspect 3: Render 1st-Person Card Views or Text Responses */}
                  {msg.type === "me" && (
                    <div className="space-y-6">
                      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                        <div className="relative w-full max-w-[220px] sm:max-w-[260px] aspect-[4/3] rounded-3xl overflow-hidden shrink-0 border border-emerald-500/30 shadow-2xl">
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
                              {profileKB.items[0].greeting || "Hi, I am Sagnik!"}
                            </h2>
                            <p className="text-xs font-mono text-emerald-400 font-semibold pt-0.5">
                              {profileKB.items[0].role} • {profileKB.items[0].location}
                            </p>
                          </div>

                          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                            {profileKB.items[0].current_activity}
                          </p>

                          <div className="flex flex-wrap justify-center sm:justify-start gap-1.5 pt-1">
                            {profileKB.items[0].tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-mono border border-emerald-500/30"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed pt-5 border-t border-emerald-500/20">
                        {profileKB.items[0].paragraphs.map((pText, pIdx) => (
                          <p key={pIdx}>{pText}</p>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-emerald-500/20">
                        <a
                          href={RESUME_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-xs hover:bg-emerald-500 transition-all flex items-center gap-2 shadow-lg shadow-emerald-600/20"
                        >
                          <Download className="w-4 h-4" />
                          <span>View Resume / Experience PDF</span>
                        </a>
                        <a
                          href="mailto:sagnikchandra@gmail.com"
                          className="px-4 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-semibold text-xs transition-all flex items-center gap-2"
                        >
                          <Mail className="w-4 h-4 text-emerald-400" />
                          <span>Send Email</span>
                        </a>
                      </div>
                    </div>
                  )}

                  {msg.type === "experience" && (
                    <div className="space-y-5">
                      {experienceKB.items.map((exp, idx) => (
                        <div key={idx} className="p-5 rounded-2xl bg-sky-500/5 border border-sky-500/20 hover:border-sky-500/40 transition-colors space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                            <div>
                              <h4 className="font-bold text-white text-base">{exp.role}</h4>
                              <p className="text-xs font-mono text-[#38BDF8] font-semibold">{exp.company}</p>
                            </div>
                            <span className="text-xs font-mono text-sky-300/80">{exp.period}</span>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {msg.type === "projects" && (
                    <div className="space-y-4">
                      {projectsKB.items.map((proj, idx) => (
                        <div key={idx} className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/20 hover:border-blue-500/40 transition-colors space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-white">{proj.title}</h4>
                            <a
                              href={contactKB.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 shrink-0 font-medium"
                            >
                              <span>GitHub</span>
                              <ArrowUpRight className="w-3 h-3" />
                            </a>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed">{proj.description}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {msg.type === "skills" && (
                    <div className="space-y-4">
                      <div className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/20 space-y-2">
                        <h4 className="font-bold text-purple-300 text-xs font-mono uppercase tracking-wider">Languages</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {skillsKB.languages.map((s) => (
                            <span key={s} className="px-2.5 py-1 rounded-lg bg-purple-500/15 border border-purple-500/30 text-xs font-mono text-purple-200">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/20 space-y-2">
                        <h4 className="font-bold text-purple-300 text-xs font-mono uppercase tracking-wider">Frameworks & ML Libraries</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {skillsKB.frameworks.map((s) => (
                            <span key={s} className="px-2.5 py-1 rounded-lg bg-purple-500/15 border border-purple-500/30 text-xs font-mono text-purple-200">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/20 space-y-2">
                        <h4 className="font-bold text-purple-300 text-xs font-mono uppercase tracking-wider">Tools & Platforms</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {skillsKB.tools.map((s) => (
                            <span key={s} className="px-2.5 py-1 rounded-lg bg-purple-500/15 border border-purple-500/30 text-xs font-mono text-purple-200">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {msg.type === "education" && (
                    <div className="space-y-4">
                      {educationKB.items.map((edu, idx) => (
                        <div key={idx} className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 hover:border-amber-500/40 transition-colors space-y-1">
                          <div className="flex items-center justify-between text-xs text-amber-400 font-mono">
                            <span>{edu.period}</span>
                            <span className="text-amber-300/80">{edu.degree.includes("M.Sc") ? "Master's Degree" : "Bachelor's Degree"}</span>
                          </div>
                          <h4 className="font-bold text-white text-base">{edu.degree}</h4>
                          <p className="text-xs text-slate-300">{edu.institution}</p>
                          {edu.focus && <p className="text-xs text-slate-400 pt-1">{edu.focus}</p>}
                        </div>
                      ))}
                    </div>
                  )}

                  {msg.type === "contact" && (
                    <div className="space-y-6">
                      {/* Header Info Grid: Email & Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <a
                          href={`mailto:${contactKB.email}`}
                          className="p-4 rounded-2xl bg-pink-500/5 border border-pink-500/20 hover:border-pink-500/50 hover:bg-pink-500/10 transition-all group space-y-1.5"
                        >
                          <div className="flex items-center gap-2 text-xs font-mono text-pink-300 uppercase">
                            <Mail className="w-3.5 h-3.5 text-pink-400" />
                            <span>Direct Email</span>
                          </div>
                          <div className="text-sm font-mono font-semibold text-white group-hover:text-pink-300 transition-colors truncate">
                            {contactKB.email}
                          </div>
                        </a>

                        <a
                          href={`tel:${(contactKB.phone || "+91 82405 92956").replace(/\s+/g, "")}`}
                          className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all group space-y-1.5"
                        >
                          <div className="flex items-center gap-2 text-xs font-mono text-emerald-300 uppercase">
                            <Phone className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Phone Number</span>
                          </div>
                          <div className="text-sm font-mono font-semibold text-white group-hover:text-emerald-300 transition-colors">
                            {contactKB.phone || "+91 82405 92956"}
                          </div>
                        </a>
                      </div>

                      {/* Connect & Profile Badges */}
                      <div className="space-y-2">
                        <div className="text-xs font-mono text-pink-300/80 uppercase">Social & Professional Profiles</div>
                        <div className="flex flex-wrap gap-2">
                          {contactKB.linkedin && (
                            <a
                              href={contactKB.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-300 text-xs font-semibold flex items-center gap-2 transition-all active:scale-95"
                            >
                              <Linkedin className="w-4 h-4 text-blue-400" />
                              <span>LinkedIn</span>
                              <ArrowUpRight className="w-3 h-3 text-blue-400/60" />
                            </a>
                          )}
                          {contactKB.github && (
                            <a
                              href={contactKB.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-semibold flex items-center gap-2 transition-all active:scale-95"
                            >
                              <Github className="w-4 h-4 text-slate-300" />
                              <span>GitHub</span>
                              <ArrowUpRight className="w-3 h-3 text-slate-400" />
                            </a>
                          )}
                          {contactKB.instagram && (
                            <a
                              href={contactKB.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2.5 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/30 text-pink-300 text-xs font-semibold flex items-center gap-2 transition-all active:scale-95"
                            >
                              <Instagram className="w-4 h-4 text-pink-400" />
                              <span>Instagram</span>
                              <ArrowUpRight className="w-3 h-3 text-pink-400/60" />
                            </a>
                          )}
                          {RESUME_URL && (
                            <a
                              href={RESUME_URL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-lg shadow-pink-600/20 active:scale-95"
                            >
                              <Download className="w-4 h-4" />
                              <span>Official Resume PDF</span>
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Interactive Reach-Out Form */}
                      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-pink-500/10 via-pink-500/5 to-transparent border border-pink-500/20 space-y-4 shadow-xl">
                        <div className="flex items-center gap-2 border-b border-pink-500/20 pb-3">
                          <MessageSquare className="w-4 h-4 text-pink-400" />
                          <h4 className="font-bold text-white text-sm">Send a Direct Message / Reach Out</h4>
                        </div>

                        {reachoutSent ? (
                          <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs space-y-1.5 flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                            <div>
                              <div className="font-bold text-sm">Message Compiled & Opened!</div>
                              <p className="text-emerald-300/90 leading-relaxed">
                                Your message has been formatted into your default email app to send directly to Sagnik Chandra (<span className="font-mono underline">{contactKB.email}</span>).
                              </p>
                            </div>
                          </div>
                        ) : (
                          <form onSubmit={handleReachoutSubmit} className="space-y-3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[11px] font-mono text-pink-300/80 mb-1">Your Name</label>
                                <input
                                  type="text"
                                  value={reachoutName}
                                  onChange={(e) => setReachoutName(e.target.value)}
                                  placeholder="John Doe"
                                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-pink-500/20 text-xs text-white placeholder-[#6B7280] focus:outline-none focus:border-pink-500 transition-all"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] font-mono text-pink-300/80 mb-1">Your Email</label>
                                <input
                                  type="email"
                                  value={reachoutEmail}
                                  onChange={(e) => setReachoutEmail(e.target.value)}
                                  placeholder="john@example.com"
                                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-pink-500/20 text-xs text-white placeholder-[#6B7280] focus:outline-none focus:border-pink-500 transition-all"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-[11px] font-mono text-pink-300/80 mb-1">Message / Project Inquiry</label>
                              <textarea
                                rows={3}
                                value={reachoutMessage}
                                onChange={(e) => setReachoutMessage(e.target.value)}
                                placeholder="Hi Sagnik, I'd like to discuss research collaboration, a project opportunity, or connect..."
                                required
                                className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-pink-500/20 text-xs text-white placeholder-[#6B7280] focus:outline-none focus:border-pink-500 transition-all resize-none"
                              />
                            </div>
                            <button
                              type="submit"
                              className="w-full py-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-pink-600/25 active:scale-98 cursor-pointer"
                            >
                              <Send className="w-3.5 h-3.5" />
                              <span>Send Direct Message to Sagnik</span>
                            </button>
                          </form>
                        )}
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
              );
            })()}
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
              className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white flex items-center gap-1.5 shrink-0 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <Smile className="w-3.5 h-3.5 text-emerald-400" />
              <span>Me</span>
            </button>
            <button
              onClick={() => handlePillClick("experience")}
              disabled={isTyping || cooldown}
              className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white flex items-center gap-1.5 shrink-0 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <Code2 className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Experience</span>
            </button>
            <button
              onClick={() => handlePillClick("education")}
              disabled={isTyping || cooldown}
              className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white flex items-center gap-1.5 shrink-0 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
              <span>Education</span>
            </button>
            <button
              onClick={() => handlePillClick("projects")}
              disabled={isTyping || cooldown}
              className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white flex items-center gap-1.5 shrink-0 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <Briefcase className="w-3.5 h-3.5 text-blue-400" />
              <span>Projects</span>
            </button>
            <button
              onClick={() => handlePillClick("skills")}
              disabled={isTyping || cooldown}
              className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white flex items-center gap-1.5 shrink-0 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-purple-400" />
              <span>Skills</span>
            </button>
            <button
              onClick={() => handlePillClick("contact")}
              disabled={isTyping || cooldown}
              className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white flex items-center gap-1.5 shrink-0 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
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
                className="w-full border-none bg-transparent text-sm text-white placeholder-[#9CA3AF] focus:outline-none"
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
