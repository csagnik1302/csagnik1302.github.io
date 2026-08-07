"use client";

import { ExternalLink, FolderKanban, Github } from "lucide-react";
import Image from "next/image";
import { ScrollReveal } from "@/components/portfolio/scroll-reveal";
import { SectionHeading } from "@/components/portfolio/section-heading";

interface Project {
  title: string;
  description: string;
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  skills: string[];
}

const projects: Project[] = [
  {
    title: "Neural Literary Style Transfer",
    description:
      "Semi-automated pipeline to rewrite Bengali sentences in a target author's style without parallel corpora. Built a BiGRU encoder with Gradient Reversal Layer for author-invariant representations and a style-conditioned GRU decoder. GRL reduces discriminator accuracy from ~65% to near-chance (~20%), confirming style disentanglement.",
    image: "/projects/style-transfer.jpg",
    githubUrl: "https://github.com/csagnik1302",
    skills: ["PyTorch", "BiGRU", "NLP", "Style Transfer", "Tesseract OCR"],
  },
  {
    title: "AcademicLens — Citation Graph Mining",
    description:
      "Large-scale academic intelligence system mapping influence, collaboration, and topic trends across 10M+ research papers from OpenAlex. Designed a PySpark ETL pipeline into Neo4j with multi-hop schema (Author→Paper→Paper→Topic) and applied PageRank for influence ranking.",
    image: "/projects/academic-lens.jpg",
    githubUrl: "https://github.com/csagnik1302",
    skills: ["PySpark", "Neo4j", "Graph Analytics", "PageRank", "ETL"],
  },
  {
    title: "Drone Delivery Route Optimization",
    description:
      "TSP variant for urban drone delivery where travel time depends on both Euclidean distance and node-level congestion. Implemented and compared Deterministic and Stochastic Hill Climbing on 120 delivery nodes; deterministic converged to shorter route (112.36 hrs) while stochastic traded quality for broader exploration.",
    image: "/projects/drone-delivery.jpg",
    githubUrl: "https://github.com/csagnik1302",
    skills: ["Python", "Optimization", "Hill Climbing", "TSP", "Algorithms"],
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group grid lg:grid-cols-[220px_1fr] gap-6 lg:gap-8 items-start p-6 rounded-xl bg-[#1C1A19] border border-[#262422] hover:border-[#C5FF41]/30 transition-all duration-300">
      {/* Image Preview */}
      <div className="relative aspect-video lg:aspect-[4/3] w-full rounded-lg overflow-hidden bg-[#22201E] border border-[#262422]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
      </div>

      {/* Content */}
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-white font-bold text-lg lg:text-xl group-hover:text-[#C5FF41] transition-colors">
            {project.title}
          </h3>

          <div className="flex items-center gap-3 shrink-0 pt-0.5">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#998F8F] hover:text-white transition-colors"
                aria-label="View on GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#998F8F] hover:text-white transition-colors"
                aria-label="View live site"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>

        <p className="text-[#998F8F] text-sm leading-relaxed">
          {project.description}
        </p>

        {/* Skill Badges */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.skills.map((skill) => (
            <span
              key={skill}
              className="px-2.5 py-1 text-xs font-semibold text-[#C5FF41] bg-[#C5FF41]/10 border border-[#C5FF41]/20 rounded-md"
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
    <section id="projects" className="py-16 sm:py-20 px-6 lg:px-0 max-w-4xl mx-auto">
      <ScrollReveal className="space-y-8">
        <SectionHeading icon={FolderKanban}>Projects</SectionHeading>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}

