# Hanzala Saify - Portfolio

A modern, responsive portfolio website built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Live Demo

[View Portfolio](https://yourportfolio.com)

## ✨ Features

- **Modern Design** - Dark-themed, matrix-inspired UI with smooth animations
- **Responsive** - Optimized for all screen sizes
- **Fast Performance** - Static site generation with Next.js 14
- **Smooth Animations** - Framer Motion powered transitions
- **Interactive Sections** - Skills, Certifications, Projects, Testimonials

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React, Tabler Icons

## 📁 Project Structure

```
├── app/                  # Next.js App Router
│   ├── (main)/          # Main route group
│   └── api/             # API routes
├── components/          # React components
│   ├── home/           # Homepage sections
│   ├── shared/         # Shared components
│   └── ui/             # UI primitives
├── config/             # Site configuration
├── lib/                # Utilities & hooks
└── public/             # Static assets
```

## 🏃 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 📝 Configuration

All site data is configured in the `config/` directory:

| File | Purpose |
|------|---------|
| `site.ts` | Site metadata, author info, navigation |
| `skills.ts` | Technical skills and categories |
| `certifications.ts` | Professional certifications |
| `projects.ts` | Project showcase data |

## 📄 License

MIT License

---

Built with ❤️ by [Hanzala Saify](https://github.com/Hanzala1518)
