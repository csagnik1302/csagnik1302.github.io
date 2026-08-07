import { Hero } from "@/components/portfolio/hero";
import { Experience } from "@/components/portfolio/experience";
import { Projects } from "@/components/portfolio/projects";
import { Skills } from "@/components/portfolio/skills";
import { Contact } from "@/components/portfolio/contact";
import { Footer } from "@/components/portfolio/footer";
import { PortfolioBackground } from "@/components/portfolio/portfolio-background";
import { TopSectionNav } from "@/components/portfolio/section-nav";
import { AIChatDrawer } from "@/components/portfolio/ai-chat-drawer";

export default function Home() {
  return (
    <main className="relative z-10 min-h-screen">
      <PortfolioBackground />
      <TopSectionNav />
      <Hero />
      <Projects />
      <Experience />
      <Skills />
      <Contact />
      <Footer />
      <AIChatDrawer />
    </main>
  );
}
