import { Github, Linkedin, Mail, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 py-20 lg:px-0">
      <div className="max-w-4xl mx-auto w-full">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
          {/* Left Column - Name and Navigation */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
                Sagnik Chandra
              </h1>
            </div>

            {/* Navigation */}
            <nav className="space-y-3">
              {[
                { label: "About", href: "#about" },
                { label: "Education", href: "#education" },
                { label: "Experience", href: "#experience" },
                { label: "Projects", href: "#projects" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="h-px w-8 bg-muted-foreground group-hover:w-16 group-hover:bg-foreground transition-all" />
                  <span className="text-sm uppercase tracking-widest font-medium">
                    {item.label}
                  </span>
                </a>
              ))}
            </nav>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-4">
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
            </div>
          </div>

          {/* Right Column - Bio */}
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p className="text-foreground font-medium">Welcome, Fellow Reader.</p>
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
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  <FileText className="mr-2 h-4 w-4" />
                  View Resume
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
