"use client";

import { ExternalLink, FolderKanban, Github, ArrowUpRight, Sparkles } from "lucide-react";
import Image from "next/image";
import { ScrollReveal } from "@/components/portfolio/scroll-reveal";
import { SectionHeading } from "@/components/portfolio/section-heading";

interface Project {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  skills: string[];
  badge?: string;
  featured?: boolean;
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
    badge: "NLP & Deep Learning",
    featured: true,
  },
  {
    title: "AcademicLens — Citation Graph Mining",
    subtitle: "10M+ Research Papers Intelligence Graph",
    description:
      "Large-scale academic intelligence system mapping influence, collaboration, and topic trends across 10M+ research papers from OpenAlex. Designed a PySpark ETL pipeline into Neo4j with multi-hop schema (Author→Paper→Paper→Topic) and applied PageRank for influence ranking.",
    image: "/projects/academic-lens.jpg",
    githubUrl: "https://github.com/csagnik1302",
    skills: ["PySpark", "Neo4j", "Graph Analytics", "PageRank", "Big Data ETL"],
    badge: "Graph Mining & Big Data",
    featured: true,
  },
  {
    title: "Drone Delivery Route Optimization",
    subtitle: "TSP & Congestion-Aware Hill Climbing",
    description:
      "TSP variant for urban drone delivery where travel time depends on both Euclidean distance and node-level congestion. Implemented and compared Deterministic and Stochastic Hill Climbing on 120 delivery nodes; deterministic converged to shorter route (112.36 hrs) while stochastic traded quality for broader exploration.",
    image: "/projects/drone-delivery.jpg",
    githubUrl: "https://github.com/csagnik1302",
    skills: ["Python", "Optimization", "Stochastic Hill Climbing", "TSP Algorithms"],
    badge: "Algorithmic Optimization",
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="sawad-card group overflow-hidden p-6 sm:p-8 flex flex-col lg:flex-row gap-8 items-stretch">
      {/* Image Container */}
      <div className="relative w-full lg:w-5/12 aspect-[16/10] rounded-2xl overflow-hidden bg-[#1A1919] border border-white/10 shrink-0">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E0D0D]/80 via-transparent to-transparent opacity-80" />
        {project.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className="sawad-pill backdrop-blur-md">
              <Sparkles className="w-3 h-3 text-[#C5FF41]" />
              {project.badge}
            </span>
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="flex flex-col justify-between flex-1 space-y-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-[#F46C38] uppercase tracking-wider">
                {project.subtitle}
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-[#C5FF41] transition-colors mt-0.5">
                {project.title}
              </h3>
            </div>
          </div>

          <p className="text-sm text-[#A09D9A] leading-relaxed">
            {project.description}
          </p>
        </div>

        <div className="space-y-4 pt-2">
          {/* Skill Pills */}
          <div className="flex flex-wrap gap-2">
            {project.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 text-xs font-semibold text-[#E5E5E5] bg-white/[0.05] border border-white/10 rounded-full hover:border-[#C5FF41]/40 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="sawad-btn-dark group/btn py-2 px-4 text-xs"
              >
                <Github className="w-4 h-4 text-[#C5FF41]" />
                <span>View Source</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="sawad-btn-lime py-2 px-4 text-xs"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <ScrollReveal className="space-y-12">
        <SectionHeading icon={FolderKanban}>Featured Projects</SectionHeading>

        <div className="grid grid-cols-1 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
