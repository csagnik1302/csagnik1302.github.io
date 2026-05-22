"use client";

import { Mail, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/portfolio/scroll-reveal";

export function Contact() {
  return (
    <section id="contact" className="py-20 px-6 lg:px-0">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-12 font-medium">
            Contact
          </h2>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12">
          <ScrollReveal className="space-y-6">
            <p className="text-2xl lg:text-3xl font-medium text-foreground leading-relaxed text-pretty">
              If you would like to discuss a project or just say hi, I&apos;m always down to chat.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-5 w-5 text-primary" />
                <a
                  href="mailto:sagnikchandra@gmail.com"
                  className="hover:text-foreground transition-colors"
                >
                  sagnikchandra@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Kolkata, India</span>
              </div>
            </div>

            <Button
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90 mt-4"
            >
              <a href="mailto:sagnikchandra@gmail.com">
                <Send className="mr-2 h-4 w-4" />
                Get in Touch
              </a>
            </Button>
          </ScrollReveal>

          <ScrollReveal className="bg-card border border-border rounded-lg p-6 space-y-4" delay={120}>
            <h3 className="text-foreground font-medium">Open for Opportunities</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              I&apos;m actively looking for full-time roles in ML engineering, data engineering, or applied AI. If you have an exciting opportunity, I&apos;d love to hear about it.
            </p>
            <div className="pt-2 space-y-2 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                Available for full-time roles
              </p>
              <p className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Open to relocation
              </p>
              <p className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Remote-friendly
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
