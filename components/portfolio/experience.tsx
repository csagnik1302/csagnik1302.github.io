"use client";

import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  companyUrl?: string;
  description: string;
  skills: string[];
}

const experiences: ExperienceItem[] = [
  {
    period: "Jan — May 2026",
    role: "Data Science Intern",
    company: "Analytics Corp",
    companyUrl: "#",
    description:
      "Built predictive models for customer churn analysis achieving 87% accuracy. Developed automated ETL pipelines processing 2M+ records daily. Created interactive Tableau dashboards for executive reporting, reducing manual reporting time by 60%.",
    skills: ["Python", "Scikit-learn", "SQL", "Tableau", "AWS S3"],
  },
  {
    period: "May — Aug 2025",
    role: "Machine Learning Intern",
    company: "TechStart AI",
    companyUrl: "#",
    description:
      "Developed NLP models for sentiment analysis on customer feedback data. Fine-tuned transformer models achieving 92% F1 score. Collaborated with the engineering team to deploy models using FastAPI and Docker containers.",
    skills: ["TensorFlow", "Hugging Face", "NLP", "FastAPI", "Docker"],
  },
  {
    period: "Dec 2024 — Feb 2025",
    role: "Data Analyst Intern",
    company: "FinServe Solutions",
    companyUrl: "#",
    description:
      "Performed exploratory data analysis on financial datasets to identify fraud patterns. Built SQL queries and Python scripts for data extraction and cleaning. Presented weekly insights to stakeholders, influencing risk assessment strategies.",
    skills: ["Python", "Pandas", "SQL", "Power BI", "Excel"],
  },
  {
    period: "Summer 2024",
    role: "Research Intern",
    company: "University ML Lab",
    companyUrl: "#",
    description:
      "Assisted in research on computer vision applications for medical imaging. Implemented data augmentation pipelines that improved model accuracy by 15%. Co-authored a paper submitted to an international conference.",
    skills: ["PyTorch", "OpenCV", "Computer Vision", "Research"],
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-20 px-6 lg:px-0">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-12 font-medium">
          Experience
        </h2>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="group grid lg:grid-cols-[150px_1fr] gap-4 lg:gap-8"
            >
              <div className="text-sm text-muted-foreground font-mono">
                {exp.period}
              </div>

              <div className="space-y-3">
                <div>
                  <h3 className="text-foreground font-medium group-hover:text-primary transition-colors">
                    {exp.role} ·{" "}
                    {exp.companyUrl ? (
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-primary hover:underline"
                      >
                        {exp.company}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      <span className="text-primary">{exp.company}</span>
                    )}
                  </h3>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {exp.skills.map((skill) => (
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
