"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal, Sparkles, CornerDownLeft, Circle } from "lucide-react";
import { ScrollReveal } from "@/components/portfolio/scroll-reveal";

interface TerminalLine {
  id: string;
  type: "input" | "output";
  text: string;
}

const RESUME_URL = "https://drive.google.com/file/d/1rhio97CGMhq9xvoXZJAp88HLMmLWJHsi/view?usp=sharing";

export function InteractiveTerminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalLine[]>([
    {
      id: "1",
      type: "output",
      text: "⚡ Welcome to sagnik-cli v2.0 [Machine Learning & AI Engine]\nType 'help' to see available commands or 'research' to view current LLM retrieval work.",
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmdStr: string) => {
    const cmd = cmdStr.trim().toLowerCase();
    if (!cmd) return;

    const newHistory: TerminalLine[] = [
      ...history,
      { id: Date.now().toString(), type: "input", text: `$ ${cmdStr}` },
    ];

    let outputText = "";

    switch (cmd) {
      case "help":
        outputText =
          "Available Commands:\n  whoami / bio   - Overview of Sagnik Chandra\n  research       - Current LLM retrieval & 'Lost in the Middle' research\n  projects       - Highlighted ML & Data Mining projects\n  skills         - Technical stack & framework competencies\n  resume         - Download / view official resume PDF\n  contact        - Direct email & social handles\n  clear          - Clear terminal history";
        break;
      case "whoami":
      case "bio":
        outputText =
          "Sagnik Chandra | Machine Learning Engineer & AI Researcher\n• M.Sc. in Data Science & AI @ RKMVERI Belur (2025–Present)\n• B.Sc. (Hons) in Mathematics @ University of Calcutta (2020–2023)\n• Data Science Intern @ DeepThought CultureTech Ventures (2024–2025)\n• Open for Full-Time Roles in ML, GenAI, and Data Systems.";
        break;
      case "research":
        outputText =
          "🔬 Current Research Topic:\n'Lost in the Middle' phenomenon in LLM Retrieval & RAG Pipelines.\nInvestigating how context positioning in long prompts influences attention degradation and retrieval accuracy in open-source LLMs.";
        break;
      case "projects":
        outputText =
          "📁 Featured ML Projects:\n1. Neural Literary Style Transfer (BiGRU + GRL for Unsupervised Bengali rewrite)\n2. AcademicLens (10M+ paper citation intelligence graph in Neo4j & PySpark)\n3. Drone Delivery Route Optimization (Stochastic & Deterministic Hill Climbing)";
        break;
      case "skills":
        outputText =
          "🛠️ Core Technical Stack:\n• Deep Learning & GenAI: PyTorch, TensorFlow, Keras, LangChain, Ollama, HuggingFace\n• Big Data & Graph: PySpark, Neo4j, MySQL, Pandas, NumPy, Scikit-Learn\n• Languages & OS: Python, C, SQL, Linux, Git, Docker";
        break;
      case "resume":
        outputText = `📄 Opening Resume PDF in new tab...\nURL: ${RESUME_URL}`;
        window.open(RESUME_URL, "_blank");
        break;
      case "contact":
        outputText =
          "📬 Contact Details:\n• Email: sagnikchandra@gmail.com\n• GitHub: https://github.com/csagnik1302\n• LinkedIn: https://www.linkedin.com/in/sagnik-chandra-52b0a111a/\n• Medium: https://medium.com/@sagnikchandra-65680";
        break;
      case "clear":
        setHistory([]);
        return;
      default:
        outputText = `command not found: '${cmd}'. Type 'help' for available commands.`;
        break;
    }

    newHistory.push({
      id: (Date.now() + 1).toString(),
      type: "output",
      text: outputText,
    });

    setHistory(newHistory);
    setInput("");
  };

  return (
    <section id="terminal" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <ScrollReveal className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-extrabold text-[#C5FF41] uppercase tracking-widest font-mono">
              INTERACTIVE CLI PREVIEW
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
              TRY SAGNIK-CLI
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#94A3B8] bg-[#121826] px-3 py-1.5 rounded-lg border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-[#C5FF41]" />
            <span>Type 'help' for options</span>
          </div>
        </div>

        {/* Terminal Window Box */}
        <div className="rounded-2xl bg-[#0B0F17] border border-white/10 overflow-hidden shadow-2xl font-mono text-xs sm:text-sm">
          {/* Header Bar */}
          <div className="px-4 py-3 bg-[#121826] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
              <span className="text-xs text-[#94A3B8] ml-2 font-medium">sagnik@rkmveri: ~/portfolio</span>
            </div>
            <div className="text-[11px] text-[#C5FF41] font-bold">bash v5.2</div>
          </div>

          {/* Terminal Screen Content */}
          <div className="p-4 sm:p-6 min-h-[260px] max-h-[360px] overflow-y-auto space-y-3 bg-[#0B0F17]/90 text-slate-200">
            {history.map((line) => (
              <div key={line.id} className="leading-relaxed">
                {line.type === "input" ? (
                  <div className="text-[#C5FF41] font-bold flex items-center gap-2">
                    <span>{line.text}</span>
                  </div>
                ) : (
                  <div className="text-[#94A3B8] whitespace-pre-wrap pl-2 border-l-2 border-white/10">
                    {line.text}
                  </div>
                )}
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Command Prompt Line */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCommand(input);
            }}
            className="p-3 sm:p-4 bg-[#121826]/90 border-t border-white/10 flex items-center gap-2 text-[#C5FF41]"
          >
            <span className="font-bold shrink-0">$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="type 'help', 'research', 'projects', 'skills', or 'resume'..."
              className="flex-1 bg-transparent border-none text-white text-xs sm:text-sm font-mono focus:outline-none placeholder-[#64748B]"
            />
            <button
              type="submit"
              className="p-1.5 rounded-lg bg-[#C5FF41]/10 text-[#C5FF41] hover:bg-[#C5FF41]/20 transition-colors"
              aria-label="Execute Command"
            >
              <CornerDownLeft className="w-4 h-4" />
            </button>
          </form>
        </div>
      </ScrollReveal>
    </section>
  );
}
