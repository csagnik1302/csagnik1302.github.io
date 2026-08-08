# 📘 Portfolio Knowledge Base Maintenance & Editing Guide

This guide explains how to manage, edit, add, or delete entries in your portfolio's **Knowledge Base** (`/knowledge-base/*.json`).

Because the portfolio is built on a **dynamic single-source-of-truth architecture**, any changes you make in these JSON files will automatically update **both**:
1. **The AI Assistant (Groq LLM / Cloudflare Worker)**: System prompt context adjusts to your new facts instantly.
2. **The Portfolio UI Cards**: The *Experience*, *Projects*, *Skills*, *Education*, and *Contact* cards re-render dynamically.

---

## 📁 Directory Structure & File Map

All knowledge base files are stored in `knowledge-base/`:

| File Path | Purpose / UI Section |
| :--- | :--- |
| **`knowledge-base/01_profile.json`** | Profile header, role, location, bio summary, and pill tags |
| **`knowledge-base/02_experience.json`** | Research fellowships, internships, and work history |
| **`knowledge-base/03_projects.json`** | Featured machine learning and systems projects |
| **`knowledge-base/04_skills.json`** | Technical skills: Languages, ML Frameworks, Tools |
| **`knowledge-base/05_education.json`** | Academic degrees, universities, dates, and focus areas |
| **`knowledge-base/06_interests.json`** | Personal hobbies, history, chess, and gaming interests |
| **`knowledge-base/07_contact.json`** | Email address, GitHub URL, LinkedIn URL & Resume link |

---

## ✍️ How to Edit, Add, or Delete Data

### 1. Adding a New Project (`03_projects.json`)
Open `knowledge-base/03_projects.json` and append a new object to the `"items"` array:

```json
{
  "id": "new-project-id",
  "title": "Your New Project Title",
  "description": "A 1-2 sentence summary of what you built and the tools used.",
  "keywords": ["tag1", "tag2"]
}
```

---

### 2. Adding or Editing Work Experience (`02_experience.json`)
Open `knowledge-base/02_experience.json` and update or append to the `"items"` array:

```json
{
  "id": "new-experience-id",
  "company": "Organization Name",
  "role": "Your Position Title",
  "period": "Start Date — End Date",
  "description": "Summary of your key contributions, research focus, or metrics achieved.",
  "keywords": ["topic1", "topic2"]
}
```

---

### 3. Adding New Technical Skills (`04_skills.json`)
Open `knowledge-base/04_skills.json` and add any string to the appropriate category array:

```json
{
  "languages": ["Python", "C", "Cypher", "R", "SQL", "Julia"],
  "frameworks": ["Scikit-learn", "PyTorch", "Pandas", "NumPy", "Matplotlib", "Seaborn", "PySpark", "LangChain", "TensorFlow"],
  "tools": ["Neo4j", "Git", "GitHub", "Jupyter Notebook", "Docker", "Linux (Ubuntu)", "MCP", "Kubernetes"]
}
```

---

### 4. Updating Resume Link or Contact Info (`07_contact.json`)
Open `knowledge-base/07_contact.json` to update your Google Drive resume link or social handles:

```json
{
  "email": "sagnikchandra@gmail.com",
  "github": "https://github.com/csagnik1302",
  "linkedin": "https://www.linkedin.com/in/sagnik-chandra-52b0a111a/",
  "resume": "https://drive.google.com/file/d/YOUR_NEW_FILE_ID/view?usp=sharing"
}
```

---

### 5. Deleting an Entry
To remove an item (e.g., an old project or past experience), simply delete its JSON object `{ ... }` from the `"items"` array in the respective JSON file.

---

## 🚀 Recommended Deployment Workflow

After making edits to any JSON file in `knowledge-base/`:

1. **Verify JSON Syntax**:
   Ensure there are no trailing commas or missing quotes in your edited JSON files.

2. **Commit and Push to GitHub**:
   Run the following standard commands in your terminal:
   ```bash
   git add knowledge-base/
   git commit -m "Update portfolio knowledge base entries"
   git push
   ```

3. **Automatic Deployment**:
   GitHub Actions will automatically build and deploy the updated site to **[https://csagnik1302.github.io](https://csagnik1302.github.io)** in ~1 minute!
