# Personal Portfolio Website

A modern, static portfolio website built with Next.js 14, TypeScript, and Tailwind CSS featuring a cyberpunk-inspired design theme.

## Features

- 🎨 **Modern Design**: Dark-themed, matrix-inspired UI with smooth animations
- 📱 **Responsive**: Fully responsive design that works on all devices
- ⚡ **Fast**: Static site generation for optimal performance
- 🎯 **Sections**:
  - Hero section with typewriter effect
  - Skills matrix showcasing your technical expertise
  - Certifications display
  - Featured and all projects showcase
  - Contact information

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Install Dependencies**

```bash
npm install
```

2. **Configure Your Information**

Edit the following configuration files with your personal information:

#### `config/site.ts`
```typescript
- Update name, email, social links
- Customize site description and metadata
```

#### `config/skills.ts`
```typescript
- Add/modify your skill categories
- Update skills for each category
```

#### `config/certifications.ts`
```typescript
- Add your certifications
- Include credential IDs and verification links
- Add badge images (place in public/images/certifications/)
```

#### `config/projects.ts`
```typescript
- Add your projects
- Include descriptions, technologies, and links
- Mark featured projects
```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Customization Guide

### Adding a New Project

1. Open `config/projects.ts`
2. Add a new project object to the `projects` array:

```typescript
{
  id: "unique-id",
  title: "Project Name",
  description: "Brief description",
  image: "/images/projects/project-name.jpg",
  technologies: ["Next.js", "TypeScript", "etc"],
  category: "Web Development", // Must match projectCategories
  demoUrl: "https://demo.com",
  githubUrl: "https://github.com/...",
  featured: true // Optional: shows on homepage
}
```

### Adding a New Certification

1. Open `config/certifications.ts`
2. Add a new certification:

```typescript
{
  id: "cert-id",
  name: "Certification Name",
  issuer: "Issuing Organization",
  issueDate: "2024",
  credentialId: "CRED123",
  credentialUrl: "https://verify.url",
  badgeImage: "/images/certifications/badge.png",
  description: "Brief description"
}
```

### Modifying Skills

1. Open `config/skills.ts`
2. Edit the `skillMatrix` array
3. Available icons: `code`, `globe`, `shield`, `line-chart`, `cloud`, `users`, `brain`

### Changing Colors

The color scheme is defined in `tailwind.config.ts`:

```typescript
colors: {
  matrix: {
    black: "#0A0E14",    // Background
    dark: "#13171E",     // Darker background
    darker: "#0D1117",   // Darkest background
    green: "#00FF41",    // Primary accent
    cyan: "#00FFFF",     // Secondary accent
    grey: "#8B949E",     // Text
    white: "#E6EDF3",    // Headings
    red: "#FF0055",      // Error/warning
    yellow: "#FFD700"    // Highlights
  }
}
```

## Project Structure

```
cyber-matrix-portfolio/
├── app/
│   ├── (main)/
│   │   ├── page.tsx          # Homepage
│   │   ├── projects/
│   │   │   └── page.tsx      # All projects page
│   │   └── layout.tsx        # Main layout with header/footer
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── SkillsMatrix.tsx
│   │   ├── Certifications.tsx
│   │   ├── FeaturedProjects.tsx
│   │   └── ...
│   ├── shared/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── ...
│   └── ui/                   # Reusable UI components
├── config/
│   ├── site.ts               # Site configuration
│   ├── skills.ts             # Skills data
│   ├── certifications.ts     # Certifications data
│   └── projects.ts           # Projects data
├── public/
│   ├── images/
│   │   ├── projects/         # Project images
│   │   └── certifications/   # Certification badges
│   └── resume.pdf            # Your resume (optional)
└── styles/
    └── animations.css        # Custom animations
```

## Adding Images

### Project Images
1. Create images (recommended: 1200x630px)
2. Place in `public/images/projects/`
3. Reference in `config/projects.ts` as `/images/projects/filename.jpg`

### Certification Badges
1. Download badge images from certification providers
2. Place in `public/images/certifications/`
3. Reference in `config/certifications.ts` as `/images/certifications/filename.png`

### Resume
1. Export your resume as PDF
2. Place in `public/` folder as `resume.pdf`
3. The download button in hero section will link to it

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Netlify

1. Build the project: `npm run build`
2. Deploy the `.next` folder

### Other Platforms

This is a standard Next.js app and can be deployed to any platform that supports Next.js.

## Tips

- **Keep it Updated**: Regularly update your projects and skills
- **Optimize Images**: Compress images before adding them
- **Test Responsiveness**: Check on different screen sizes
- **SEO**: Update metadata in config files for better search visibility
- **Analytics**: Consider adding analytics (Google Analytics, Plausible, etc.)

## Troubleshooting

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

### Image Issues
- Ensure images are in the `public` folder
- Use correct paths (starting with `/`)
- Check image file extensions match config

### Styling Issues
- Run `npm run dev` to see changes in real-time
- Check Tailwind classes are valid
- Verify custom colors are defined in `tailwind.config.ts`

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please open an issue on GitHub or contact via email.

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
