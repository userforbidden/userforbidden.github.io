# Saranyan Senthivel — Personal Website

Personal academic and professional website for **Saranyan Senthivel**, Cybersecurity Researcher and Software Engineer. Live at [saranyansenthivel.com](https://saranyansenthivel.com).

---

## Overview

A lightweight, static personal website hosted on **GitHub Pages**. Built with pure HTML, CSS, and JavaScript — no frameworks, no build tools, no dependencies. The design uses a futuristic dark-mode-first aesthetic with a toggleable light theme.

---

## Pages

| Page | File | Description |
|---|---|---|
| Home | `index.html` | Hero landing with intro and CTA links |
| Research | `pages/research.html` | Core research areas (ICS/SCADA, Cybersecurity, Mobile & Platform Security, Software Systems) |
| Publications | `pages/publications.html` | Selected publications with links to PDFs and articles |
| Service | `pages/service.html` | Professional reviewing, mentoring, and advisory roles |
| Links | `pages/links.html` | External profiles (Google Scholar, ResearchGate, GitHub, LinkedIn, CV, Email) |

---

## Project Structure

```
userforbidden.github.io/
├── index.html              # Home page
├── CNAME                   # Custom domain: saranyansenthivel.com
├── LICENSE                 # Apache 2.0
├── README.md
├── css/
│   └── styles.css          # All styles — global, layout, components, themes
├── js/
│   └── main.js             # All interactivity — theme toggle, scroll, nav, animations
├── pages/
│   ├── research.html       # Research areas page
│   ├── publications.html   # Publications listing page
│   ├── service.html        # Service activities page
│   └── links.html          # External links / connect page
└── assets/                 # Static assets (images, etc.)
```

---

## Features

**Dark / Light Theme Toggle** — defaults to dark mode; preference is persisted in `localStorage` across visits.

**Smooth Scroll** — enhanced smooth scrolling with sticky header offset compensation for in-page anchor navigation.

**Keyboard Navigation** — arrow keys move focus between nav links; Enter activates focused anchors.

**Scroll-triggered Animations** — elements with `.animate-on-scroll` fade in via `IntersectionObserver` when scrolled into view.

**Lazy Image Loading** — images with `data-src` are loaded on demand using `IntersectionObserver`.

**Responsive Layout** — fluid CSS using custom properties and `min-height: 100vh` background scaling.

---

## Design System

Defined entirely through CSS custom properties in `:root` (dark) and `html[data-theme="light"]`:

| Token | Dark | Light |
|---|---|---|
| Background primary | `#0a0e27` | `#f5f8ff` |
| Accent primary | `#00d9ff` (cyan) | `#006ad6` (blue) |
| Accent secondary | `#7c3aed` (violet) | `#1f4bb8` (indigo) |
| Text primary | `#e4e6eb` | `#0f1a34` |
| Glow effects | `rgba(0,217,255,…)` | `rgba(0,106,214,…)` |

---

## Deployment

Hosted on **GitHub Pages** from the `master` branch. The custom domain `saranyansenthivel.com` is configured via the `CNAME` file.

To deploy changes, simply push to `master`:

```bash
git add .
git commit -m "your message"
git push origin master
```

GitHub Pages picks up changes automatically — no build step required.

---

## Local Development

Since the site is plain HTML/CSS/JS, any local server works:

```bash
# Python
python -m http.server 8000

# Node (npx)
npx serve .
```

Then open `http://localhost:8000` in your browser.

---

## Research Focus

- **ICS / SCADA Security** — critical infrastructure protection and control system threat analysis
- **Cybersecurity** — defense mechanisms, threat modeling, and security protocols
- **Mobile & Platform Security** — security challenges in mobile and platform ecosystems
- **Digital Forensics** — forensic methods for SCADA networks and platform-aware analysis

---

## License

[Apache License 2.0](LICENSE)
