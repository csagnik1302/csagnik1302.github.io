"use client";

import { Github, ArrowUpRight, FolderGit2 } from "lucide-react";
import { ScrollReveal } from "@/components/portfolio/scroll-reveal";

interface Project {
  title: string;
  category: string;
  description: string;
  githubUrl?: string;
  tags: string[];
}

const projectList: Project[] = [
  {
    title: "Neural Literary Style Transfer",
    category: "Deep Learning & NLP",
    description:
      "Semi-automated pipeline to rewrite Bengali sentences in a target author's style without parallel corpora. Built a BiGRU encoder with Gradient Reversal Layer (GRL) for author-invariant representations and a style-conditioned decoder.",
    githubUrl: "https://github.com/csagnik1302",
    tags: ["PyTorch", "BiGRU", "NLP", "Style Disentanglement", "OCR"],
  },
  {
    title: "AcademicLens — Citation Graph Mining",
    category: "Graph Mining & Big Data",
    description:
      "Large-scale academic intelligence system mapping influence, collaboration, and topic trends across research papers from OpenAlex. Designed a PySpark ETL pipeline into Neo4j with multi-hop schema and PageRank influence ranking.",
    githubUrl: "https://github.com/csagnik1302",
    tags: ["PySpark", "Neo4j", "Graph Analytics", "PageRank", "ETL"],
  },
  {
    title: "Drone Delivery Route Optimization",
    category: "Algorithms & Optimization",
    description:
      "TSP variant for urban drone delivery where travel time depends on Euclidean distance and node-level congestion. Implemented and compared Deterministic and Stochastic Hill Climbing algorithms.",
    githubUrl: "https://github.com/csagnik1302",
    tags: ["Python", "Optimization", "Hill Climbing", "TSP"],
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <ScrollReveal className="space-y-8">
        {/* Section Header */}
        <div className="border-b border-white/10 pb-4 space-y-1">
          <span className="text-xs font-mono text-blue-400 font-semibold uppercase tracking-wider">
            Selected Work
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Featured Projects
          </h2>
        </div>

        {/* Project List */}
        <div className="space-y-4">
          {projectList.map((project, idx) => (
            <div
              key={idx}
              className="framer-card p-6 flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-mono text-blue-400 font-semibold">
                    {project.category}
                  </span>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#9CA3AF] hover:text-white transition-colors"
                      title="View GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-md bg-[#1C1E24] text-[11px] font-mono text-slate-300 border border-white/5"
                  >
                    {tag}
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
