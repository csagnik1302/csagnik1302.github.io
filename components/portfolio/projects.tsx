"use client";

import { ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface Project {
  title: string;
  description: string;
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  skills: string[];
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: "Neural Literary Style Transfer",
    description:
      "Semi-automated pipeline to rewrite Bengali sentences in a target author's style without parallel corpora. Built a BiGRU encoder with Gradient Reversal Layer for author-invariant representations and a style-conditioned GRU decoder. GRL reduces discriminator accuracy from ~65% to near-chance (~20%), confirming style disentanglement.",
    image: "/projects/style-transfer.jpg",
    liveUrl: "https://huggingface.co/datasets/sagnik1302/bengali-authors-corpus",
    githubUrl: "https://github.com/csagnik1302",
    skills: ["PyTorch", "BiGRU", "NLP", "Tesseract OCR", "pdfplumber"],
    featured: true,
  },
  {
    title: "AcademicLens - Citation Graph Mining",
    description:
      "Large-scale academic intelligence system mapping influence, collaboration, and topic trends across 10M+ research papers from OpenAlex. Designed a PySpark ETL pipeline into Neo4j with multi-hop schema (Author→Paper→Paper→Topic) and applied PageRank for influence ranking.",
    image: "/projects/academic-lens.jpg",
    githubUrl: "https://github.com/csagnik1302",
    skills: ["PySpark", "Neo4j", "Graph Analytics", "PageRank", "ETL"],
    featured: true,
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

export function Projects() {
  return (
    <section id="projects" className="py-20 px-6 lg:px-0">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-12 font-medium">
          Projects
        </h2>

        <div className="space-y-16">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group grid lg:grid-cols-[200px_1fr] gap-6 lg:gap-8"
            >
              <div className="relative aspect-video lg:aspect-[4/3] rounded-lg overflow-hidden bg-secondary">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/5 transition-colors" />
              </div>

              <div className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-foreground font-medium text-lg group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  <div className="flex items-center gap-3 shrink-0">

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
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
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="View live site"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {project.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="bg-primary/10 text-primary hover:bg-primary/20 border-0 text-xs"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
