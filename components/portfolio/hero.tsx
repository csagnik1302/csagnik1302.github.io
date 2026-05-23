import { Github, Linkedin, Mail, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/portfolio/scroll-reveal";

export function Hero() {
  return (
    <section id="top" className="px-6 py-20 lg:px-0">
      <div className="max-w-4xl mx-auto w-full">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
          {/* Left Column - Name and Navigation */}
          <ScrollReveal className="space-y-8">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
                Sagnik Chandra
              </h1>
            </div>

            {/* Social Links */}
            <ScrollReveal className="flex items-center gap-4" delay={300}>
              <a
                href="https://github.com/csagnik1302"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/in/sagnik-chandra"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:sagnikchandra@gmail.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </ScrollReveal>
          </ScrollReveal>

          {/* Right Column - Bio */}
          <ScrollReveal className="readable-muted space-y-6 leading-relaxed" delay={150}>
            <p className="text-foreground font-medium">Hello</p>
            <p>
              I&apos;m Sagnik. I&apos;m interested in Machine Learning, NLP, and Mining various forms of Massive Datasets to extract relevant information.
            </p>
            <p>
              Much of my work revolves around understanding how information, language, and structure emerge at scale, through research, experimentation, and building systems from scratch.
            </p>
            <p>
              Most of my days are split between coding, reading papers, and getting lost in books on philosophy, psychology, and non-fiction.
            </p>

            <div className="pt-4">
              <Button
                asChild
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <a href="https://drive.google.com/file/d/1WQbgbyJrzaFKWTBsYNEjE1d6Af7Wl4kO/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                  <FileText className="mr-2 h-4 w-4" />
                  View Resume
                </a>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
