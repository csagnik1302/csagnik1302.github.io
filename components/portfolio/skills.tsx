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
    title: "Big Data & Databases",
    skills: ["PySpark", "Neo4j", "Graph Databases", "ETL Pipelines"],
  },
  {
    title: "Tools & Environments",
    skills: ["Git", "Jupyter", "Linux", "Docker"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-16 sm:py-20 px-6 lg:px-0 max-w-4xl mx-auto">
      <ScrollReveal className="space-y-8">
        <SectionHeading icon={Wrench}>Skills</SectionHeading>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="space-y-3 p-5 rounded-xl bg-[#1C1A19] border border-[#262422]">
              <h3 className="text-white font-bold text-sm">{category.title}</h3>
              <div className="flex flex-wrap gap-2 pt-1">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 text-xs font-semibold text-[#D1CCCC] bg-[#22201E] rounded-md border border-[#2B2826] hover:text-white transition-colors"
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

