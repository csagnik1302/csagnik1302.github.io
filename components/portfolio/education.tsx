"use client";

import { GraduationCap, Award, Calendar } from "lucide-react";
import { ScrollReveal } from "@/components/portfolio/scroll-reveal";

interface EducationItem {
  period: string;
  degree: string;
  institution: string;
  details: string;
}

const education: EducationItem[] = [
  {
    period: "2025 — Present",
    degree: "M.Sc. in Data Science & AI",
    institution: "RKMVERI, Belur",
    details: "Focusing on Deep Learning, Advanced Machine Learning, Natural Language Processing, and Distributed Computing.",
  },
  {
    period: "2020 — 2023",
    degree: "B.Sc. (Hons) in Mathematics",
    institution: "University of Calcutta",
    details: "Rigorous foundation in Linear Algebra, Real Analysis, Probability Theory, Optimization, and Numerical Analysis.",
  },
  {
    period: "2018 — 2020",
    degree: "Higher Secondary (CBSE)",
    institution: "Kendriya Vidyalaya Cossipore",
    details: "Completed Higher Secondary education with specialization in Science, Mathematics, and Computer Science.",
  },
];

export function Education() {
  return (
    <section id="education" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <ScrollReveal className="space-y-10">
        {/* Section Header */}
        <div className="space-y-1">
          <span className="text-xs font-extrabold text-[#C5FF41] uppercase tracking-widest">
            ACADEMIC BACKGROUND
          </span>
          <h2 className="text-4xl sm:text-6xl font-extrabold text-white uppercase tracking-tight leading-none">
            EDUCATION &<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5FF41] to-[#F46C38]">
              CREDENTIALS
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {education.map((edu, index) => (
            <div
              key={index}
              className="sawad-card p-6 flex flex-col justify-between space-y-4 hover:border-[#C5FF41]/40 transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#C5FF41]">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{edu.period}</span>
                </div>

                <h3 className="text-lg font-extrabold text-white group-hover:text-[#C5FF41] transition-colors leading-snug">
                  {edu.degree}
                </h3>

                <p className="text-xs font-bold text-[#F46C38]">
                  {edu.institution}
                </p>

                <p className="text-xs text-[#998F8F] leading-relaxed pt-1">
                  {edu.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}


