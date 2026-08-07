"use client";

import { Wrench, Terminal, Cpu, Database, Network, Code2 } from "lucide-react";
import { ScrollReveal } from "@/components/portfolio/scroll-reveal";
import { SectionHeading } from "@/components/portfolio/section-heading";

interface SkillCategory {
  title: string;
  icon: any;
  skills: string[];
  accent: "lime" | "orange" | "cyan";
}

const skillCategories: SkillCategory[] = [
  {
    title: "Primary Domains",
    icon: Cpu,
    skills: ["Deep Learning & NLP", "Machine Learning", "Graph Analytics", "Distributed Computing"],
    accent: "lime",
  },
  {
    title: "ML & AI Frameworks",
    icon: Network,
    skills: ["PyTorch", "Scikit-learn", "NumPy", "Pandas"],
    accent: "orange",
  },
  {
    title: "Big Data & Graph DBs",
    icon: Database,
    skills: ["PySpark", "Neo4j", "Graph Analytics", "ETL Pipelines"],
    accent: "cyan",
  },
  {
    title: "Languages",
    icon: Code2,
    skills: ["Python", "C", "Java", "SQL"],
    accent: "lime",
  },
  {
    title: "DevOps & Tools",
    icon: Terminal,
    skills: ["Git", "Jupyter", "Linux", "Docker"],
    accent: "orange",
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <ScrollReveal className="space-y-12">
        <SectionHeading icon={Wrench}>Skills & Technical Stack</SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div key={index} className="sawad-card p-6 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg ${
                      category.accent === 'lime' ? 'bg-[#C5FF41]/10 text-[#C5FF41]' :
                      category.accent === 'orange' ? 'bg-[#F46C38]/10 text-[#F46C38]' :
                      'bg-[#38BDF8]/10 text-[#38BDF8]'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-base font-extrabold text-white">{category.title}</h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className={`px-3 py-1 text-xs font-semibold rounded-full border transition-colors ${
                          category.accent === 'lime'
                            ? 'bg-[#C5FF41]/5 text-[#C5FF41] border-[#C5FF41]/20 hover:bg-[#C5FF41]/15'
                            : category.accent === 'orange'
                            ? 'bg-[#F46C38]/5 text-[#F46C38] border-[#F46C38]/20 hover:bg-[#F46C38]/15'
                            : 'bg-[#38BDF8]/5 text-[#38BDF8] border-[#38BDF8]/20 hover:bg-[#38BDF8]/15'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollReveal>
    </section>
  );
}
