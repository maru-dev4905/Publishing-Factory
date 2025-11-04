# 🏗️ Publishing-Factory

> **A modular front-end framework built by maru**  
> Design, structure, and motion — all connected by lines.

---

## 🌐 Overview
**Publishing-Factory (PF)** is a personal front-end framework and design system  
built to unify maru’s workflow as a **web publisher, designer, and developer**.

It connects reusable UI components, motion systems, and visual logic  
into a single, maintainable ecosystem — making publishing faster, cleaner, and more expressive.

> “Each line connects code, design, and flow — this is my language.”

---

## ⚙️ Tech Stack
| Category | Technology |
|-----------|-------------|
| **Template Engine** | [Nunjucks](https://mozilla.github.io/nunjucks/) (Eleventy compatible) |
| **CSS Preprocessor** | SCSS |
| **JavaScript** | jQuery + ES Module |
| **Task Runner** | Gulp |
| **Animation** | GSAP |
| **Structure** | Adaptive Layout (not responsive) |

---

## 🧩 Components & Modules
| Component | Description |
|------------|-------------|
| `Tab` | Switch content with fade or slide motion |
| `Accordion` | Expand/collapse panels with accessible event delegation |
| `Modal` | Includes overlay, scroll lock, and overlay-click options |
| `Copy Button` | Copies text or target content with feedback (alert or modal) |
| `More Button` | Dynamically loads additional content (AJAX-ready) |

Each component follows a **modular pattern** and can be initialized dynamically  
through a single entry script: `wv_compo.js`

---

## 📁 Folder Structure
```text
Publishing-Factory/
├── src/
│ ├── assets/
│ │ ├── js/core/ # Core UI components (e.g. Tab, Accordion, Modal)
│ │ ├── scss/ # Variables, mixins, component styles
│ │ └── images/
│ ├── pages/ # Page templates (Nunjucks)
│ ├── partials/ # Header, footer, component snippets
│ └── utilities/ # GSAP, Swiper, and other helpers
└── dist/ # Compiled output
```

---

## 🧠 Author
**maru (이승열)**  
Web Publisher

---
