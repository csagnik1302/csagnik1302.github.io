"use client";

import { useState } from "react";
import { ExternalLink, Github, ArrowUpRight, Sparkles, Filter, Database, Brain, Cpu, Layers } from "lucide-react";
import Image from "next/image";
import { ScrollReveal } from "@/components/portfolio/scroll-reveal";

interface Project {
  id: string;
  title: string;
  category: "nlp" | "graph" | "optimization" | "automation";
  categoryLabel: string;
  subtitle: string;
  metric: string;
  description: string;
  architecture: string;
  image: string;
  githubUrl?: string;
  skills: string[];
}

const projects: Project[] = [
  {
    id: "style-transfer",
    title: "Neural Literary Style Transfer",
    category: "nlp",
    categoryLabel: "Deep Learning & NLP",
    subtitle: "Bengali Unsupervised Style Transfer Model",
    metric: "Discriminator Accuracy reduced to ~20%",
    description:
      "Semi-automated pipeline to rewrite Bengali sentences in a target author's style without parallel corpora. Built a BiGRU encoder with Gradient Reversal Layer (GRL) for author-invariant representations and a style-conditioned GRU decoder.",
    architecture: "BiGRU Encoder + GRL Discriminator + Style-Conditioned GRU Decoder + Tesseract OCR",
    image: "/projects/style-transfer.jpg",
    githubUrl: "https://github.com/csagnik1302",
    skills: ["PyTorch", "BiGRU", "Gradient Reversal Layer", "NLP", "Style Disentanglement"],
  },
  {
    id: "academic-lens",
    title: "AcademicLens — Citation Graph Mining",
    category: "graph",
    categoryLabel: "Graph Analytics & Big Data",
    subtitle: "10M+ Research Papers Intelligence Graph",
    metric: "10M+ OpenAlex Papers Ingested into Neo4j",
    description:
      "Large-scale academic intelligence system mapping influence, collaboration, and topic trends across 10M+ research papers from OpenAlex. Designed a PySpark ETL pipeline into Neo4j with multi-hop schema (Author→Paper→Paper→Topic) and applied PageRank for influence ranking.",
    architecture: "PySpark ETL → Neo4j Cypher Schema → Distributed PageRank Algorithm",
    image: "/projects/academic-lens.jpg",
    githubUrl: "https://github.com/csagnik1302",
    skills: ["PySpark", "Neo4j", "Graph Analytics", "PageRank", "Big Data ETL"],
  },
  {
    id: "drone-optimization",
    title: "Drone Delivery Route Optimization",
    category: "optimization",
    categoryLabel: "Algorithmic Optimization",
    subtitle: "TSP & Congestion-Aware Hill Climbing",
    metric: "112.36 Hours Optimal Converged Route",
    description:
      "TSP variant for urban drone delivery where travel time depends on both Euclidean distance and node-level congestion. Implemented and compared Deterministic and Stochastic Hill Climbing on 120 delivery nodes; deterministic converged to shorter route while stochastic traded quality for broader exploration.",
    architecture: "Stochastic & Deterministic Hill Climbing + Congestion Matrix Cost Function",
    image: "/projects/drone-delivery.jpg",
    githubUrl: "https://github.com/csagnik1302",
    skills: ["Python", "Optimization", "Stochastic Hill Climbing", "TSP Algorithms"],
  },
  {
    id: "ai-workflows",
    title: "Enterprise AI Workflow & Data Engine",
    category: "automation",
    categoryLabel: "AI Workflows & Automation",
    subtitle: "Internal LLM Wrappers & CRM Efficiency Engine",
    metric: "Saved 1–4 Hours Daily per Stakeholder",
    description:
      "Engineered automated data pipelines and AI wrappers connecting CRM, recruitment tracking, and decision dashboards at DeepThought CultureTech. Reduced turnaround time from 3 days to 1 day and boosted coordination efficiency by ~90%.",
    architecture: "Python Automation + Gemini AI API + Zoho/HubSpot Integration + Centralized Analytics",
    image: "/projects/style-transfer.jpg",
    githubUrl: "https://github.com/csagnik1302",
    skills: ["Python", "Gemini API", "Data Automation", "LLM Integration", "CRM Optimization"],
  },
];

const CATEGORIES = [
  { id: "all", label: "All Projects" },
  { id: "nlp", label: "NLP & GenAI" },
  { id: "graph", label: "Graph & Big Data" },
  { id: "optimization", label: "Optimization" },
  { id: "automation", label: "AI Automation" },
];

export function Projects() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <ScrollReveal className="space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-[#C5FF41] uppercase tracking-widest">
              PROJECTS LABORATORY
            </span>
            <h2 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight leading-none">
              FEATURED{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5FF41] to-[#38BDF8]">
                SYSTEMS
              </span>
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all ${
                  activeCategory === cat.id
                    ? "bg-[#C5FF41] text-[#0B0F17] shadow-[0_0_15px_rgba(197,255,65,0.25)]"
                    : "bg-[#121826] text-[#94A3B8] hover:text-white border border-white/10 hover:border-white/20"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bento-card p-6 flex flex-col justify-between space-y-6 group hover:border-[#C5FF41]/40 transition-all"
            >
              {/* Card Header & Metric Tag */}
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/20">
                    {project.categoryLabel}
                  </span>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-[#1E293B] hover:bg-[#C5FF41] hover:text-[#0B0F17] border border-white/10 transition-all text-[#94A3B8]"
                      title="View GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-[#C5FF41] transition-colors">
                    {project.title}
                  </h3>
                  <div className="text-xs font-mono font-bold text-[#C5FF41]">
                    Key Metric: {project.metric}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  {project.description}
                </p>

                {/* Architecture Snippet */}
                <div className="p-3 rounded-xl bg-[#0B0F17] border border-white/5 font-mono text-[11px] text-[#94A3B8]">
                  <span className="text-[#38BDF8] font-bold">Arch:</span> {project.architecture}
                </div>
              </div>

              {/* Skills Footer */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
                {project.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 text-[11px] font-mono font-bold text-[#C5FF41] bg-[#C5FF41]/10 border border-[#C5FF41]/20 rounded-lg uppercase"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
