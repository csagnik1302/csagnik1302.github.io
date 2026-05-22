"use client";

import { Wrench } from "lucide-react";
import { ScrollReveal } from "@/components/portfolio/scroll-reveal";
import { SectionHeading } from "@/components/portfolio/section-heading";

interface SkillCategory {
  title: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Primary Areas",
    skills: ["Deep Learning & NLP", "Machine Learning", "Graph Analytics", "Distributed Computing"],
  },
  {
    title: "Languages",
    skills: ["Python", "C", "Java", "SQL"],
  },
  {
    title: "ML Frameworks",
    skills: ["PyTorch", "Scikit-learn", "NumPy", "Pandas"],
  },
  {
    title: "Big Data",
    skills: ["PySpark", "Neo4j", "Graph Databases"],
  },
  {
    title: "Tools",
    skills: ["Git", "Jupyter", "Linux", "Docker"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-20 px-6 lg:px-0">
      <ScrollReveal className="max-w-4xl mx-auto">
        <SectionHeading icon={Wrench}>Skills</SectionHeading>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-foreground font-medium">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-sm text-muted-foreground bg-secondary rounded-md hover:text-foreground hover:bg-secondary/80 transition-colors"
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
