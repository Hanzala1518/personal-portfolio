# Quick Setup Guide

Follow these steps to get your portfolio up and running:

## Step 1: Install Dependencies

```bash
cd cyber-matrix-portfolio
npm install
```

## Step 2: Update Your Personal Information

### Edit `config/site.ts`

Replace placeholder information with yours:

```typescript
author: {
  name: "Your Full Name",
  handle: "@yourhandle",
  email: "your.email@example.com",
  social: [
    "https://linkedin.com/in/yourprofile",
    "https://github.com/yourusername",
    "https://twitter.com/yourhandle"
  ]
}
```

### Edit `config/skills.ts`

Update the skills to match your expertise:

```typescript
{
  title: "Programming Languages",
  icon: "code",
  color: "text-matrix-green",
  skills: ["JavaScript", "Python", "Java", ...]
}
```

### Edit `config/certifications.ts`

Add your actual certifications:

```typescript
{
  id: "cert-1",
  name: "Your Certification Name",
  issuer: "Issuing Organization",
  issueDate: "2024",
  credentialId: "YOUR_ID",
  credentialUrl: "https://verify-url.com",
  badgeImage: "/images/certifications/your-badge.png",
  description: "Brief description"
}
```

### Edit `config/projects.ts`

Add your real projects:

```typescript
{
  id: "project-1",
  title: "Your Project Title",
  description: "What this project does...",
  image: "/images/projects/project1.jpg",
  technologies: ["React", "Node.js", ...],
  category: "Web Development",
  demoUrl: "https://demo.com",
  githubUrl: "https://github.com/you/project",
  featured: true
}
```

## Step 3: Add Images

1. **Create folders** (if they don't exist):
   - `public/images/projects/`
   - `public/images/certifications/`

2. **Add project images**:
   - Recommended size: 1200x630px
   - Format: JPG or PNG
   - Name them matching your config

3. **Add certification badges**:
   - Download from certification providers
   - Format: PNG (with transparency)
   - Name them matching your config

4. **Add your resume** (optional):
   - Place `resume.pdf` in `public/` folder

## Step 4: Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000 to see your portfolio!

## Step 5: Customize (Optional)

### Change Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  matrix: {
    green: "#00FF41",  // Your primary color
    cyan: "#00FFFF",   // Your secondary color
    // ... other colors
  }
}
```

### Update Hero Message

Edit `components/home/HeroSection.tsx`:

```typescript
const heroLines = [
  "> Initializing...",
  `> Hello. I'm ${siteConfig.author.name}`,
  "> Your Custom Tagline Here"
]
```

## Step 6: Build for Production

```bash
npm run build
npm start
```

## Step 7: Deploy

### Option 1: Vercel (Easiest)

1. Push code to GitHub
2. Go to https://vercel.com
3. Import your repository
4. Deploy!

### Option 2: Netlify

1. Build: `npm run build`
2. Upload `.next` folder to Netlify
3. Configure build settings

## Common Issues

**Q: Images not showing?**
- Make sure images are in `public/images/` folder
- Use paths starting with `/` (e.g., `/images/projects/image.jpg`)

**Q: Build fails?**
- Run `npm install` again
- Check for TypeScript errors
- Ensure all required fields in config files are filled

**Q: Styles not working?**
- Make sure Tailwind classes are correct
- Check `tailwind.config.ts` for custom colors
- Run `npm run dev` to see live changes

## Need Help?

Check the full README.md for detailed documentation.

## Checklist

- [ ] Installed dependencies
- [ ] Updated site.ts with personal info
- [ ] Updated skills.ts with your skills
- [ ] Added certifications to certifications.ts
- [ ] Added projects to projects.ts
- [ ] Added project images
- [ ] Added certification badges
- [ ] Added resume.pdf (optional)
- [ ] Tested locally with `npm run dev`
- [ ] Built for production `npm run build`
- [ ] Deployed to hosting platform

---

You're ready to go! 🚀
