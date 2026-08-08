# Sagnik Chandra Portfolio Knowledge Base

This directory contains modular JSON knowledge files used by your portfolio's RAG pipeline and search engine.

## Nomenclature & Naming Convention

All files follow the pattern: `<category_id>_<category_name>.json`

| File | Purpose | Example Items |
| :--- | :--- | :--- |
| `01_profile.json` | Personal bio, location, & role | Name, Title, Location, Short Bio |
| `02_experience.json` | Internships & Research positions | ISI Kolkata, DeepThought |
| `03_projects.json` | ML & Data Engineering projects | Style Transfer, AcademicLens, SDSS DR18, Drone TSP |
| `04_skills.json` | Technical stack & tools | Languages, PyTorch, PySpark, Neo4j, MCP |
| `05_education.json` | Academic degrees | RKMVERI Belur M.Sc. |
| `06_interests.json` | Passions, hobbies, & persona | History, Psychology, Chess, Gaming |
| `07_contact.json` | Email & social credentials | Email, GitHub, LinkedIn, Resume PDF |

## How to Add New Entries Manually

To add a new project, experience, or skill in the future:
1. Open the corresponding JSON file (e.g., `03_projects.json`).
2. Copy an existing item block and paste it inside the `items` array.
3. Update the `id`, `title`, `description`, and `keywords` fields.
