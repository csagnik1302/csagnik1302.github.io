import profileKB from "./01_profile.json";
import experienceKB from "./02_experience.json";
import projectsKB from "./03_projects.json";
import skillsKB from "./04_skills.json";
import educationKB from "./05_education.json";
import interestsKB from "./06_interests.json";
import contactKB from "./07_contact.json";

// Dynamic scanner for Webpack / Turbopack
let allJSONFiles: any[] = [
  profileKB,
  experienceKB,
  projectsKB,
  skillsKB,
  educationKB,
  interestsKB,
  contactKB,
];

try {
  const reqContext = (require as any).context(".", false, /\.json$/);
  allJSONFiles = reqContext.keys().map((key: string) => reqContext(key));
} catch (e) {
  // Fallback to static array if context is unavailable
}

export const getDynamicKnowledgeBaseContext = () => {
  return allJSONFiles
    .map((fileData: any) => {
      const cat = fileData.category || "information";
      return `[KNOWLEDGE MODULE: ${cat.toUpperCase()}]\n${JSON.stringify(fileData, null, 2)}`;
    })
    .join("\n\n");
};

export {
  profileKB,
  experienceKB,
  projectsKB,
  skillsKB,
  educationKB,
  interestsKB,
  contactKB,
};
