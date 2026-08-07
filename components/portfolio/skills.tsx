"use client";

import { ScrollReveal } from "@/components/portfolio/scroll-reveal";

const skillCategories = [
  {
    category: "Languages & Frameworks",
    skills: ["Python", "PyTorch", "TensorFlow", "Keras", "LangChain", "C", "SQL"],
  },
  {
    category: "AI & Data Science",
    skills: ["Ollama", "Hugging Face", "NumPy", "Pandas", "Scikit-Learn", "Matplotlib", "Seaborn"],
  },
  {
    category: "Data Systems & Tools",
    skills: ["PySpark", "Neo4j", "MySQL", "Git", "Docker", "Linux", "Jupyter", "Anaconda"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <ScrollReveal className="space-y-8">
        {/* Section Header */}
        <div className="border-b border-white/10 pb-4 space-y-1">
          <span className="text-xs font-mono text-blue-400 font-semibold uppercase tracking-wider">
            Toolbox
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Languages & Technologies
          </h2>
        </div>

        {/* Minimalist Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillCategories.map((item, idx) => (
            <div key={idx} className="framer-card p-6 space-y-3">
              <h3 className="text-sm font-semibold text-white font-mono">
                {item.category}
              </h3>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {item.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-md bg-[#1C1E24] text-xs text-[#9CA3AF] border border-white/5 font-mono"
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
