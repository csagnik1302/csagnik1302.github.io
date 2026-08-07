"use client";

import { ExternalLink, FolderKanban, Github, ArrowUpRight, Sparkles } from "lucide-react";
import Image from "next/image";
import { ScrollReveal } from "@/components/portfolio/scroll-reveal";

interface Project {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  skills: string[];
}

const projects: Project[] = [
  {
    title: "Neural Literary Style Transfer",
    subtitle: "Bengali Unsupervised Style Transfer Model",
    description:
      "Semi-automated pipeline to rewrite Bengali sentences in a target author's style without parallel corpora. Built a BiGRU encoder with Gradient Reversal Layer for author-invariant representations and a style-conditioned GRU decoder. GRL reduces discriminator accuracy from ~65% to near-chance (~20%), confirming style disentanglement.",
    image: "/projects/style-transfer.jpg",
    githubUrl: "https://github.com/csagnik1302",
    skills: ["PyTorch", "BiGRU", "NLP", "Style Disentanglement", "Tesseract OCR"],
  },
  {
    title: "AcademicLens — Citation Graph Mining",
    subtitle: "10M+ Research Papers Intelligence Graph",
    description:
      "Large-scale academic intelligence system mapping influence, collaboration, and topic trends across 10M+ research papers from OpenAlex. Designed a PySpark ETL pipeline into Neo4j with multi-hop schema (Author→Paper→Paper→Topic) and applied PageRank for influence ranking.",
    image: "/projects/academic-lens.jpg",
    githubUrl: "https://github.com/csagnik1302",
    skills: ["PySpark", "Neo4j", "Graph Analytics", "PageRank", "Big Data ETL"],
  },
  {
    title: "Drone Delivery Route Optimization",
    subtitle: "TSP & Congestion-Aware Hill Climbing",
    description:
      "TSP variant for urban drone delivery where travel time depends on both Euclidean distance and node-level congestion. Implemented and compared Deterministic and Stochastic Hill Climbing on 120 delivery nodes; deterministic converged to shorter route (112.36 hrs) while stochastic traded quality for broader exploration.",
    image: "/projects/drone-delivery.jpg",
    githubUrl: "https://github.com/csagnik1302",
    skills: ["Python", "Optimization", "Stochastic Hill Climbing", "TSP Algorithms"],
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="sawad-card p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8 items-start hover:border-[#C5FF41]/40 transition-all group">
      {/* Image Preview */}
      <div className="relative aspect-video lg:aspect-[4/3] w-full rounded-xl overflow-hidden bg-[#22201E] border border-[#262422]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
      </div>

      {/* Details */}
      <div className="space-y-4 flex flex-col justify-between h-full">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs font-bold text-[#F46C38] uppercase tracking-wider">
              {project.subtitle}
            </span>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 rounded-full bg-[#22201E] hover:bg-[#C5FF41] hover:text-[#151312] border border-[#262422] flex items-center justify-center transition-all text-[#998F8F]"
                aria-label="View on GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
            )}
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-[#C5FF41] transition-colors">
            {project.title}
          </h3>

          <p className="text-sm text-[#998F8F] leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Skill Pills */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 text-xs font-bold text-[#C5FF41] bg-[#C5FF41]/10 border border-[#C5FF41]/20 rounded-full uppercase tracking-wider"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <ScrollReveal className="space-y-10">
        {/* Section Header */}
        <div className="space-y-1">
          <span className="text-xs font-extrabold text-[#C5FF41] uppercase tracking-widest">
            PORTFOLIO SHOWCASE
          </span>
          <h2 className="text-4xl sm:text-6xl font-extrabold text-white uppercase tracking-tight leading-none">
            RECENT<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5FF41] to-[#F46C38]">
              PROJECTS
            </span>
          </h2>
        </div>

        <div className="space-y-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}


