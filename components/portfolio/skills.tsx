"use client";

import { Wrench, Cpu, Database, Network, Terminal, Code2, Layers, Server, Box } from "lucide-react";
import { ScrollReveal } from "@/components/portfolio/scroll-reveal";
import { SectionHeading } from "@/components/portfolio/section-heading";

interface ToolItem {
  name: string;
  category: string;
  icon: any;
  accent?: string;
}

const tools: ToolItem[] = [
  {
    name: "PyTorch",
    category: "Deep Learning & NLP",
    icon: Cpu,
    accent: "#C5FF41",
  },
  {
    name: "PySpark",
    category: "Distributed Big Data Engine",
    icon: Database,
    accent: "#F46C38",
  },
  {
    name: "Neo4j",
    category: "Graph Analytics Database",
    icon: Network,
    accent: "#C5FF41",
  },
  {
    name: "Python",
    category: "Primary ML & Data Language",
    icon: Code2,
    accent: "#F46C38",
  },
  {
    name: "Docker",
    category: "Containerization & Deployment",
    icon: Box,
    accent: "#C5FF41",
  },
  {
    name: "Git & Linux",
    category: "Version Control & OS Systems",
    icon: Terminal,
    accent: "#F46C38",
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <ScrollReveal className="space-y-8">
        <div className="space-y-1">
          <span className="text-xs font-extrabold text-[#C5FF41] uppercase tracking-widest">
            TECHNICAL STACK
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
            PREMIUM TOOLS
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <div
                key={index}
                className="sawad-card p-6 flex items-center gap-4 hover:border-[#C5FF41]/50 transition-all group"
              >
                <div
                  className="h-12 w-12 rounded-xl flex items-center justify-center border border-[#262422] group-hover:scale-110 transition-transform"
                  style={{
                    backgroundColor: tool.accent === '#C5FF41' ? 'rgba(197, 255, 65, 0.1)' : 'rgba(244, 108, 56, 0.1)',
                    color: tool.accent || '#C5FF41',
                  }}
                >
                  <Icon className="h-6 w-6" />
                </div>

                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-[#C5FF41] transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-[#998F8F] font-medium mt-0.5">
                    {tool.category}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollReveal>
    </section>
  );
}


