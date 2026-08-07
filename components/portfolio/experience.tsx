"use client";

import { Briefcase, ArrowUpRight, Sparkles, GraduationCap, Calendar, Award, CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "@/components/portfolio/scroll-reveal";

const RESUME_URL = "https://drive.google.com/file/d/1rhio97CGMhq9xvoXZJAp88HLMmLWJHsi/view?usp=sharing";

interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  companyUrl?: string;
  highlights: string[];
  skills: string[];
}

const experiences: ExperienceItem[] = [
  {
    period: "Oct 2024 — Jul 2025",
    role: "Data Science Intern",
    company: "DeepThought CultureTech Ventures",
    companyUrl: "https://www.deepthought.education/",
    highlights: [
      "Led 10+ cross-functional initiatives across AI workflow automation, CRM optimization, and recruitment analytics.",
      "Built internal LLM wrappers and automated data pipelines that saved 1–4 hours of manual work daily for team members.",
      "Redesigned CRM tracking systems, cutting operational turnaround time from 3 days to 1 day (~60% efficiency gain).",
      "Increased inter-departmental coordination by ~90% and developed centralized KPI tracking dashboards for 30+ stakeholders.",
    ],
    skills: ["Python", "Gemini AI", "Data Automation", "Zoho CRM & Flow", "Hubspot", "Workflow Optimization"],
  },
];

interface EducationItem {
  period: string;
  degree: string;
  institution: string;
  details: string;
  badge?: string;
}

const education: EducationItem[] = [
  {
    period: "2025 — Present",
    degree: "M.Sc. in Data Science & AI",
    institution: "RKMVERI, Belur",
    details: "Specializing in Deep Learning, NLP, Distributed Computing, and LLM Retrieval Research ('Lost in the Middle').",
    badge: "Current Master's",
  },
  {
    period: "2020 — 2023",
    degree: "B.Sc. (Hons) in Mathematics",
    institution: "University of Calcutta",
    details: "Rigorous foundation in Linear Algebra, Real Analysis, Probability Theory, Matrix Analysis, and Numerical Optimization.",
    badge: "Bachelor's Degree",
  },
  {
    period: "2018 — 2020",
    degree: "Higher Secondary (CBSE)",
    institution: "Kendriya Vidyalaya Cossipore",
    details: "Completed Higher Secondary education with specialization in Science, Higher Mathematics, and Computer Science.",
    badge: "High School",
  },
];

export function Experience() {
  return (
    <section id="journey" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <ScrollReveal className="space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-[#C5FF41] uppercase tracking-widest">
              CAREER & ACADEMIC PATH
            </span>
            <h2 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight leading-none">
              JOURNEY &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5FF41] via-[#38BDF8] to-[#A855F7]">
                CREDENTIALS
              </span>
            </h2>
          </div>

          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#121826] border border-[#C5FF41]/30 hover:border-[#C5FF41] text-xs font-mono font-bold text-[#C5FF41] transition-all"
          >
            <span>View Full Resume PDF</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Dual Grid: Industry Experience & Education */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Industry Experience Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-[#38BDF8] font-mono font-bold text-sm">
              <Briefcase className="w-5 h-5" />
              <span>INDUSTRY EXPERIENCE</span>
            </div>

            {experiences.map((exp, idx) => (
              <div
                key={idx}
                className="bento-card p-6 space-y-6 hover:border-[#38BDF8]/40 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                  <div>
                    <h3 className="text-xl font-extrabold text-white">{exp.role}</h3>
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono font-bold text-[#38BDF8] inline-flex items-center gap-1 hover:underline mt-0.5"
                    >
                      {exp.company}
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/20 text-[11px] font-mono font-bold self-start sm:self-auto">
                    {exp.period}
                  </span>
                </div>

                <ul className="space-y-2.5 text-xs sm:text-sm text-[#94A3B8]">
                  {exp.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#C5FF41] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 text-[10px] font-mono font-bold text-[#38BDF8] bg-[#38BDF8]/10 border border-[#38BDF8]/20 rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Academic Background Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-[#C5FF41] font-mono font-bold text-sm">
              <GraduationCap className="w-5 h-5" />
              <span>ACADEMIC BACKGROUND</span>
            </div>

            <div className="space-y-4">
              {education.map((edu, idx) => (
                <div
                  key={idx}
                  className="bento-card p-5 space-y-3 hover:border-[#C5FF41]/40 transition-all"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono font-bold text-[#C5FF41]">
                      {edu.period}
                    </span>
                    {edu.badge && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#C5FF41]/10 border border-[#C5FF41]/20 text-[10px] font-mono font-bold text-[#C5FF41]">
                        {edu.badge}
                      </span>
                    )}
                  </div>

                  <div>
                    <h4 className="text-lg font-black text-white">{edu.degree}</h4>
                    <p className="text-xs font-mono font-bold text-[#38BDF8]">{edu.institution}</p>
                  </div>

                  <p className="text-xs text-[#94A3B8] leading-relaxed">{edu.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
