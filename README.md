<div align="center">

# ⚡ Hanzala Saify — Developer Portfolio

### A portfolio website with an embedded AI resume assistant

[![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Resend](https://img.shields.io/badge/Resend-Email_API-000000?style=for-the-badge&logo=resend&logoColor=white)](https://resend.com/)

<br />

[View Live Demo](https://yourportfolio.com) · [Report Bug](https://github.com/Hanzala1518/portfolio/issues) · [Request Feature](https://github.com/Hanzala1518/portfolio/issues)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [AI Resume Assistant](#-ai-resume-assistant)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Backend Setup (FastAPI + AI)](#2-backend-setup-fastapi--ai)
  - [3. Frontend Setup (Next.js)](#3-frontend-setup-nextjs)
  - [4. Resend Email Setup (Contact Form)](#4-resend-email-setup-contact-form)
  - [5. Run Everything](#5-run-everything)
- [Environment Variables Reference](#-environment-variables-reference)
- [Deployment](#-deployment)
- [Configuration](#-configuration)
- [Example AI Questions](#-example-ai-questions)
- [Screenshots](#-screenshots)
- [License](#-license)

---

## 🧭 Overview

A high-performance, cyberpunk-inspired developer portfolio built for **Hanzala Saify** — an AI Developer & Cybersecurity Enthusiast. The site features matrix rain animations, encrypted text reveals, Framer Motion transitions, a freelance contact form powered by **Resend**, and a standout **AI chat assistant** that answers recruiter questions grounded entirely in real resume data.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🤖 **AI Resume Assistant** | Floating chat widget powered by Mistral 7B via OpenRouter — answers questions about skills, projects & experience |
| 💌 **Contact Form with Email** | Freelance inquiry form with styled HTML emails delivered via **Resend** API |
| 🎨 **Cyberpunk UI** | Dark navy + coral red theme with matrix rain, scanline textures & neon glows |
| ⚡ **Framer Motion Animations** | Page transitions, scroll reveals, encrypted text decryption effect on hero |
| 📊 **Dynamic Skills Matrix** | 7 categories, 50+ skills with devicon logos, auto-fetched from config |
| 🏆 **Certifications Showcase** | Animated cards with issuer logos, credential links & verification URLs |
| 🗂️ **Project Showcase** | Featured project cards + individual detail pages with `/projects/[slug]` routing |
| 💬 **Testimonials Carousel** | Animated testimonial slider component |
| 📱 **Fully Responsive** | Optimized layouts for mobile, tablet & desktop |
| 🔍 **SEO Optimized** | Proper meta tags, Open Graph, structured data via Next.js metadata API |
| 📄 **Resume Download** | One-click PDF download from the hero section |
| 🧩 **Config-Driven Content** | All projects, skills & certifications live in TypeScript config files — zero database |

---

## 🤖 AI Resume Assistant

A persistent floating chat button (bottom-right) opens a full-featured chat window that lets visitors have a **real conversation** with an AI version of the portfolio.

### How it works

```
User types question
      ↓
Browser → Next.js /api/chat (server proxy) → Python FastAPI /api/chat
      ↓                                            ↓
      ↓                                   context_builder.py
      ↓                                   (resume_data.json → prompt)
      ↓                                            ↓
      ↓                                   openrouter_service.py
      ↓                                   (Mistral 7B via OpenRouter)
      ↓                                            ↓
      ↓                                   SQLite chat_logs.db
      ↓                                            ↓
Browser ← JSON response ←──────────────── FastAPI response
```

### Key capabilities

- **Grounded answers** — the AI only responds based on structured resume data, never hallucinating
- **Multi-turn conversations** — maintains context across messages via session ID & conversation history
- **Quick prompts** — one-click seed questions for first-time visitors
- **Cyberpunk speech bubble** — eye-catching intro tooltip appears on page load
- **Graceful degradation** — friendly error messages when the backend is offline (503/502)
- **Chat logging** — every exchange is logged to SQLite for analytics

---

## 🛠️ Tech Stack

### Frontend

| Technology | Logo | Purpose |
|---|---|---|
| **Next.js 14** | <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg" width="20" /> | App Router, server components, API proxy routes |
| **TypeScript 5** | <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" width="20" /> | End-to-end type safety |
| **React 18** | <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" width="20" /> | UI component library |
| **Tailwind CSS 3.4** | <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg" width="20" /> | Utility-first styling with custom cyberpunk theme |
| **Framer Motion** | <img src="https://user-images.githubusercontent.com/38039349/60953119-d3c6f300-a2fc-11e9-9596-4978e5d52180.png" width="20" /> | Page transitions & scroll animations |
| **Lucide React** | ✦ | Icon library (MessageSquare, Sparkles, etc.) |
| **Resend** | <img src="https://resend.com/static/brand/resend-icon-black.svg" width="20" /> | Transactional email API for the contact form |

### Backend

| Technology | Logo | Purpose |
|---|---|---|
| **Python 3.11+** | <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" width="20" /> | Runtime |
| **FastAPI** | <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/fastapi/fastapi-original.svg" width="20" /> | REST API with auto-generated OpenAPI docs |
| **Pydantic** | 📦 | Request / response validation |
| **SQLite** | <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/sqlite/sqlite-original.svg" width="20" /> | Zero-config chat logging database |
| **python-dotenv** | ⚙️ | Environment variable loading |

### AI & LLM

| Technology | Logo | Purpose |
|---|---|---|
| **OpenRouter** | 🌐 | Unified LLM gateway (free tier available) |
| **Mistral 7B Instruct** | 🧠 | Language model for AI assistant answers |

### Deployment

| Platform | Logo | Purpose |
|---|---|---|
| **Vercel** | <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/vercel/vercel-original.svg" width="20" /> | Next.js frontend hosting (auto-deploy from Git) |
| **Render** | 🚀 | Python FastAPI backend hosting |
| **Cloudflare Tunnel** | <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/cloudflare/cloudflare-original.svg" width="20" /> | Optional: expose local backend publicly |

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                     Browser (Next.js 14)                     │
│                                                              │
│  ┌──────────────┐                         ┌──────────────┐   │
│  │  ChatWidget  │ ── useChat() hook ────► │ chatService   │   │
│  │  ChatWindow  │                         │   .ts         │   │
│  │  ChatMessage │                         └──────┬───────┘   │
│  │  ChatInput   │                                │ fetch     │
│  │  QuickPrompts│                        /api/chat proxy     │
│  └──────────────┘                                │           │
│                                                  │           │
│  ┌──────────────┐                        /api/contact        │
│  │ ContactForm  │ ── fetch ──────────► Resend API ── ✉️      │
│  └──────────────┘                                            │
└─────────────────────────────────────────┬────────────────────┘
                                          │ HTTP POST
                          ┌───────────────▼─────────────────┐
                          │     Python FastAPI (backend/)    │
                          │                                 │
                          │   POST /api/chat                │
                          │        ↓                        │
                          │   context_builder.py            │
                          │   (resume_data.json → prompt)   │
                          │        ↓                        │
                          │   openrouter_service.py         │
                          │   (Mistral 7B via OpenRouter)   │
                          │        ↓                        │
                          │   SQLite chat_logs.db           │
                          └───────────────┬─────────────────┘
                                          │ HTTPS
                          ┌───────────────▼─────────────────┐
                          │        OpenRouter API           │
                          │   mistralai/mistral-7b-instruct │
                          └─────────────────────────────────┘
```

---

## 📁 Project Structure

<details>
<summary><b>Frontend</b> — <code>personal-portfolio/</code></summary>

```
personal-portfolio/
├── app/
│   ├── (main)/
│   │   ├── layout.tsx              # Global layout — Header, ChatWidget, Footer
│   │   ├── page.tsx                # Homepage (hero, skills, projects, contact…)
│   │   └── projects/
│   │       ├── page.tsx            # Projects listing grid
│   │       └── [slug]/page.tsx     # Individual project detail page
│   ├── api/
│   │   ├── chat/route.ts          # Server-side proxy → FastAPI backend
│   │   └── contact/route.ts       # Contact form → Resend email API
│   ├── globals.css
│   └── layout.tsx                  # Root layout (fonts, metadata)
│
├── components/
│   ├── ai-chat/                    # AI assistant widget (5 components)
│   │   ├── ChatWidget.tsx          # Root FAB + speech bubble + state
│   │   ├── ChatWindow.tsx          # Window shell + scroll area
│   │   ├── ChatMessage.tsx         # Individual message bubble
│   │   ├── ChatInput.tsx           # Auto-growing textarea + send
│   │   └── QuickPrompts.tsx        # Seed question buttons
│   ├── home/                       # Homepage section components
│   │   ├── HeroSection.tsx         # Matrix rain + encrypted text intro
│   │   ├── SkillsMatrix.tsx        # 7-category skill grid with logos
│   │   ├── FeaturedProjects.tsx    # Project showcase cards
│   │   ├── Certifications.tsx      # Animated certification cards
│   │   ├── Testimonials.tsx        # Testimonial carousel
│   │   ├── ContactForm.tsx         # Freelance inquiry form
│   │   ├── StatsBar.tsx            # Animated stats counter
│   │   └── MatrixRain.tsx          # Canvas matrix rain background
│   ├── shared/                     # Header, Footer, Providers, motion
│   └── ui/                         # Primitive UI components (Button, Vortex…)
│
├── config/                         # All portfolio data lives here
│   ├── site.ts                     # Author info, social links, navigation
│   ├── projects.ts                 # Project list with tech stack & links
│   ├── skills.ts                   # 7 skill categories, 50+ skills
│   ├── certifications.ts           # 8 certifications with credential URLs
│   └── resume.ts                   # Unified knowledge file for AI context
│
├── lib/
│   ├── hooks/
│   │   ├── useChat.ts              # Chat state (messages, loading, session)
│   │   ├── useInView.ts            # Intersection observer hook
│   │   └── useMediaQuery.ts        # Responsive breakpoint hook
│   └── services/
│       └── chatService.ts          # Frontend HTTP client for /api/chat
│
├── types/
│   ├── chat.ts                     # ChatRole, ChatMessage, ChatRequest/Response
│   └── project.ts                  # Project interface
│
├── styles/
│   └── animations.css              # Custom keyframe animations
│
├── tailwind.config.ts              # Cyberpunk theme (navy, coral, gold)
├── next.config.mjs
├── tsconfig.json
└── package.json
```

</details>

<details>
<summary><b>Backend</b> — <code>backend/</code></summary>

```
backend/
├── app/
│   ├── main.py                     # FastAPI entry point + CORS config
│   ├── api/
│   │   └── chat.py                 # POST /api/chat + GET /api/chat/suggestions
│   ├── services/
│   │   ├── context_builder.py      # Builds prompt from resume_data.json
│   │   └── openrouter_service.py   # OpenRouter HTTP client (ask_openrouter)
│   ├── database/
│   │   └── db.py                   # SQLite init + log_message()
│   └── data/
│       └── resume_data.json        # Structured resume knowledge base
│
├── .env.example                    # Template for environment variables
└── requirements.txt                # Python dependencies
```

</details>

---

## 🚀 Getting Started

### Prerequisites

| Requirement | Version | Link |
|---|---|---|
| **Node.js** | 18+ | [nodejs.org](https://nodejs.org/) |
| **npm** | 9+ | Comes with Node.js |
| **Python** | 3.11+ | [python.org](https://www.python.org/downloads/) |
| **Git** | Any | [git-scm.com](https://git-scm.com/) |
| **OpenRouter API Key** | Free tier | [openrouter.ai/keys](https://openrouter.ai/keys) |
| **Resend API Key** *(optional)* | Free tier | [resend.com](https://resend.com/) |

---

### 1. Clone the Repository

```bash
git clone https://github.com/Hanzala1518/portfolio.git
cd portfolio
```

---

### 2. Backend Setup (FastAPI + AI)

#### 2a. Create a Python virtual environment

```bash
cd personal-portfolio/backend

# Create virtual environment
python -m venv .venv

# Activate it
# Windows (PowerShell)
.venv\Scripts\Activate.ps1

# Windows (CMD)
.venv\Scripts\activate.bat

# macOS / Linux
source .venv/bin/activate
```

#### 2b. Install Python dependencies

```bash
pip install -r requirements.txt
```

#### 2c. Configure backend environment variables

```bash
# Copy the example env file
cp .env.example .env        # macOS/Linux
copy .env.example .env      # Windows CMD
```

Edit `backend/.env` with your values:

```env
# ─── OpenRouter (AI Assistant) ──────────────────────────────────
# Get your free API key at https://openrouter.ai/keys
OPENROUTER_API_KEY=sk-or-v1-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Model to use — mistral-7b-instruct is free tier
OPENROUTER_MODEL=mistralai/mistral-7b-instruct

# Sent as HTTP-Referer and X-Title headers to OpenRouter
SITE_URL=http://localhost:3000
SITE_NAME=Portfolio AI Assistant

# Optional tuning
OPENROUTER_TIMEOUT=30
OPENROUTER_MAX_TOKENS=512
OPENROUTER_TEMPERATURE=0.7
```

> **Note:** The SQLite database (`chat_logs.db`) is created automatically on first startup — no setup needed.

---

### 3. Frontend Setup (Next.js)

#### 3a. Install Node.js dependencies

```bash
cd personal-portfolio    # from the project root

npm install
```

#### 3b. Configure frontend environment variables

Create a `.env.local` file in the `personal-portfolio/` directory:

```env
# ─── FastAPI Backend (AI Assistant proxy) ───────────────────────
# The Next.js server-side route /api/chat proxies requests to this URL
FASTAPI_URL=http://localhost:8000

# Browser-side chat base URL (leave blank to use the /api/chat proxy — recommended)
NEXT_PUBLIC_CHAT_API=

# ─── Resend (Contact Form emails) ──────────────────────────────
# Get your API key at https://resend.com/api-keys
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Email address to receive contact form inquiries
# With Resend free tier, this must be the email you signed up with
CONTACT_EMAIL=your-email@example.com
```

---

### 4. Resend Email Setup (Contact Form)

The contact form uses [**Resend**](https://resend.com/) to deliver beautifully styled HTML emails when visitors submit freelance inquiries.

#### Step-by-step

1. **Create a free account** at [resend.com](https://resend.com/)
2. **Generate an API key** at [resend.com/api-keys](https://resend.com/api-keys)
3. **Add the key** to `personal-portfolio/.env.local`:
   ```env
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   CONTACT_EMAIL=your-email@example.com
   ```
4. **Free tier limitation:** Resend's free tier only allows sending to the email address you signed up with. Set `CONTACT_EMAIL` to that address.
5. **Optional — Custom domain:** To send from a custom domain (instead of `onboarding@resend.dev`), verify a domain in the Resend dashboard.

> **No Resend key?** The contact form still works — submissions are logged to the server console as a fallback. No emails will be sent, but no errors occur either.

---

### 5. Run Everything

You need **two terminals** — one for the backend, one for the frontend.

#### Terminal 1 — Start the FastAPI backend

```bash
cd personal-portfolio/backend

# Activate virtual environment (if not already active)
.venv\Scripts\Activate.ps1          # Windows PowerShell
source .venv/bin/activate            # macOS / Linux

# Start with hot-reload
uvicorn app.main:app --reload --port 8000
```

The backend is now running at:

| Endpoint | URL |
|---|---|
| **Base URL** | `http://localhost:8000` |
| **Chat API** | `POST http://localhost:8000/api/chat` |
| **Health check** | `GET http://localhost:8000/health` |
| **Interactive docs** | `http://localhost:8000/docs` |

#### Terminal 2 — Start the Next.js frontend

```bash
cd personal-portfolio

# Development server with hot-reload
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** — the portfolio is live!

The floating chat button appears in the bottom-right corner with a cyberpunk speech bubble. The Next.js dev server proxies all `/api/chat` requests to `FASTAPI_URL` so the frontend never exposes the backend URL to the browser.

#### Other useful commands

```bash
npm run build       # Production build
npm run start       # Serve production build locally
npm run lint        # ESLint check
npm run type-check  # TypeScript type checking
npm run format      # Prettier formatting
```

---

## 🔐 Environment Variables Reference

### Backend — `backend/.env`

| Variable | Required | Default | Description |
|---|---|---|---|
| `OPENROUTER_API_KEY` | ✅ | — | Your OpenRouter secret key ([get one free](https://openrouter.ai/keys)) |
| `OPENROUTER_MODEL` | ❌ | `mistralai/mistral-7b-instruct` | LLM model identifier |
| `SITE_URL` | ❌ | `http://localhost:3000` | Sent as `HTTP-Referer` header to OpenRouter |
| `SITE_NAME` | ❌ | `Portfolio AI Assistant` | Sent as `X-Title` header to OpenRouter |
| `OPENROUTER_TIMEOUT` | ❌ | `30` | Request timeout in seconds |
| `OPENROUTER_MAX_TOKENS` | ❌ | `512` | Maximum reply token length |
| `OPENROUTER_TEMPERATURE` | ❌ | `0.7` | Sampling temperature (0 = deterministic, 1 = creative) |

### Frontend — `personal-portfolio/.env.local`

| Variable | Required | Default | Description |
|---|---|---|---|
| `FASTAPI_URL` | ✅ | — | Backend base URL for the Next.js server-side proxy |
| `NEXT_PUBLIC_CHAT_API` | ❌ | `""` (uses `/api/chat` proxy) | Direct backend URL for client-side service |
| `RESEND_API_KEY` | ❌ | — | Resend API key for sending contact form emails ([get one free](https://resend.com/)) |
| `CONTACT_EMAIL` | ❌ | `hanzala.saify103@gmail.com` | Email address to receive freelance inquiries |

---

## 🚀 Deployment

### Frontend → Vercel

1. Push the repository to GitHub
2. Import the project at [vercel.com/new](https://vercel.com/new)
3. Set **Root Directory** to `personal-portfolio`
4. Add environment variables in the Vercel dashboard:
   | Variable | Value |
   |---|---|
   | `FASTAPI_URL` | Your Render backend URL (e.g. `https://portfolio-backend.onrender.com`) |
   | `RESEND_API_KEY` | Your Resend API key |
   | `CONTACT_EMAIL` | Your email address |
5. Deploy — Vercel builds automatically on every push

### Backend → Render

1. Create a new **Web Service** at [render.com](https://render.com)
2. Connect your GitHub repository
3. Configure:
   | Setting | Value |
   |---|---|
   | **Root Directory** | `personal-portfolio/backend` |
   | **Runtime** | Python 3.11 |
   | **Build Command** | `pip install -r requirements.txt` |
   | **Start Command** | `uvicorn app.main:app --host 0.0.0.0 --port 8000` |
4. Add environment variables:
   | Variable | Value |
   |---|---|
   | `OPENROUTER_API_KEY` | Your OpenRouter key |
   | `SITE_URL` | Your Vercel frontend URL |
   | `SITE_NAME` | `Portfolio AI Assistant` |
5. Deploy — Render provides a public HTTPS URL

> **Note:** Render's free tier spins down after 15 min of inactivity. First requests after a cold start take ~30–60 sec. Use a keep-alive cron or upgrade to a paid plan.

### Optional: Cloudflare Tunnel (expose local backend)

Useful for testing — expose your local FastAPI backend publicly without deploying:

```bash
# Install
winget install Cloudflare.cloudflared   # Windows
brew install cloudflared                # macOS

# Authenticate (one-time)
cloudflared tunnel login

# Start tunnel → http://localhost:8000
cloudflared tunnel --url http://localhost:8000
```

Use the generated `https://*.trycloudflare.com` URL as `FASTAPI_URL` in Vercel.

---

## 📝 Configuration

All portfolio content is data-driven — edit these TypeScript files to customize everything:

| File | What it controls |
|---|---|
| `config/site.ts` | Author name, email, social links, navigation items |
| `config/projects.ts` | Project cards (title, description, tech stack, links, screenshots) |
| `config/skills.ts` | 7 skill categories with 50+ individual skills & logos |
| `config/certifications.ts` | 8 certifications with issuer, year & credential URLs |
| `config/resume.ts` | Unified knowledge file consumed by the AI chat system |

> **Important:** The Python backend mirrors portfolio data in `backend/app/data/resume_data.json`. Update **both** files when adding new projects or skills so the AI assistant stays current.

---

## 💬 Example AI Questions

These appear as **quick-prompt buttons** inside the chat widget:

- *"What projects has Hanzala built?"*
- *"Explain MarketMuse AI"*
- *"What skills does Hanzala have?"*
- *"What technologies does he use?"*

Visitors can also ask free-form questions like:

- *"What certifications does Hanzala hold?"*
- *"Does he have experience with cloud platforms?"*
- *"What is his background in cybersecurity?"*
- *"How can I contact Hanzala?"*
- *"What AI/ML tools has he worked with?"*
- *"Is he available for freelance work?"*
- *"Tell me about PropertyRAG"*
- *"What databases does he know?"*

---

## 📸 Screenshots

> Replace the placeholders below with actual screenshots of your deployed portfolio.

| Section | Preview |
|---|---|
| Hero + Matrix Rain | `screenshots/hero.png` |
| Skills Matrix | `screenshots/skills.png` |
| Featured Projects | `screenshots/projects.png` |
| AI Chat (closed + bubble) | `screenshots/chat-closed.png` |
| AI Chat (open conversation) | `screenshots/chat-open.png` |
| Contact Form | `screenshots/contact.png` |
| Certifications | `screenshots/certifications.png` |

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Built with ❤️ by [**Hanzala Saify**](https://github.com/Hanzala1518)

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/hanzala-saify-11aa3a262/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Hanzala1518)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://x.com/HanzalaSaify)

</div>
