# Cleanup Guide

This document lists unnecessary files/folders that can be safely deleted to keep your project clean.

## Files/Folders You Can Delete

### Unnecessary Route Folders
```
app/(main)/lab/          - ML demos and CTF challenges
app/(main)/intel/        - Blog/intel content
app/(main)/contact/      - Contact form page
app/(main)/projects/[slug]/  - Individual project detail pages
app/(main)/intel/[slug]/ - Individual blog post pages
```

### Unnecessary Components
```
components/lab/          - All ML demo components
  - CTFChallenge.tsx
  - MNISTDemo.tsx
  - PhishingClassifier.tsx
  - ThreatMap.tsx
  - ThreatMapClient.tsx

components/projects/     - Complex project components
  - CaseStudyTabs.tsx
  - InteractiveDemo.tsx
  - ProjectCard.tsx (if exists)
  - ProjectFilter.tsx (if exists)
  - ProjectGrid.tsx (if exists)

components/terminal/     - Terminal emulator
  - Terminal.tsx
  - TerminalCommand.tsx
  - TerminalHistory.tsx

components/home/         - Unused home components
  - QuickLinks.tsx (replaced with FeaturedProjects.tsx)
```

### Unnecessary Content Files
```
content/blog/           - Blog MDX files
  - post-1.mdx
  - post-2.mdx

content/projects/       - Project MDX files (using config instead)
  - project-1.mdx
  - project-2.mdx
```

### Unnecessary Library Files
```
lib/mdx.ts             - MDX processing (not needed for static data)
lib/hooks/
  - useTerminal.ts     - Terminal hook
  - useTerminal.tsx    - Duplicate terminal hook
```

### Unnecessary Type Files
```
types/blog.ts          - Blog types (no blog section)
types/ml.ts            - Machine learning types
types/project.ts       - Old complex project types (simplified in config)
```

### Unnecessary Styles
```
styles/terminal.css    - Terminal-specific styles
```

## Commands to Clean Up

**WARNING**: Make sure you have a backup before running these commands!

### On Windows PowerShell:
```powershell
# Remove unnecessary routes
Remove-Item -Recurse -Force "app\(main)\lab"
Remove-Item -Recurse -Force "app\(main)\intel"
Remove-Item -Recurse -Force "app\(main)\contact"
Remove-Item -Recurse -Force "app\(main)\projects\[slug]"

# Remove unnecessary components
Remove-Item -Recurse -Force "components\lab"
Remove-Item -Recurse -Force "components\terminal"
Remove-Item "components\home\QuickLinks.tsx" -ErrorAction SilentlyContinue
Remove-Item "components\projects\CaseStudyTabs.tsx" -ErrorAction SilentlyContinue
Remove-Item "components\projects\InteractiveDemo.tsx" -ErrorAction SilentlyContinue
Remove-Item "components\projects\ProjectCard.tsx" -ErrorAction SilentlyContinue
Remove-Item "components\projects\ProjectFilter.tsx" -ErrorAction SilentlyContinue
Remove-Item "components\projects\ProjectGrid.tsx" -ErrorAction SilentlyContinue

# Remove content folders
Remove-Item -Recurse -Force "content\blog" -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force "content\projects" -ErrorAction SilentlyContinue

# Remove unnecessary lib files
Remove-Item "lib\mdx.ts" -ErrorAction SilentlyContinue
Remove-Item "lib\hooks\useTerminal.ts" -ErrorAction SilentlyContinue
Remove-Item "lib\hooks\useTerminal.tsx" -ErrorAction SilentlyContinue

# Remove unnecessary type files
Remove-Item "types\blog.ts" -ErrorAction SilentlyContinue
Remove-Item "types\ml.ts" -ErrorAction SilentlyContinue
Remove-Item "types\project.ts" -ErrorAction SilentlyContinue

# Remove unnecessary styles
Remove-Item "styles\terminal.css" -ErrorAction SilentlyContinue
```

### On macOS/Linux:
```bash
# Remove unnecessary routes
rm -rf app/\(main\)/lab
rm -rf app/\(main\)/intel
rm -rf app/\(main\)/contact
rm -rf app/\(main\)/projects/\[slug\]

# Remove unnecessary components
rm -rf components/lab
rm -rf components/terminal
rm -f components/home/QuickLinks.tsx
rm -rf components/projects

# Remove content folders
rm -rf content/blog
rm -rf content/projects

# Remove unnecessary lib files
rm -f lib/mdx.ts
rm -f lib/hooks/useTerminal.ts
rm -f lib/hooks/useTerminal.tsx

# Remove unnecessary type files
rm -f types/blog.ts
rm -f types/ml.ts
rm -f types/project.ts

# Remove unnecessary styles
rm -f styles/terminal.css
```

## What to Keep

### Essential Files
- `app/layout.tsx` - Root layout
- `app/(main)/layout.tsx` - Main layout with header/footer
- `app/(main)/page.tsx` - Homepage
- `app/(main)/projects/page.tsx` - Projects listing page
- `components/home/*` - All home section components (except QuickLinks.tsx)
- `components/shared/*` - Header, Footer, Providers, motion helpers
- `components/ui/*` - Reusable UI components
- `config/*` - All configuration files
- `lib/hooks/useInView.ts` - Animation hook
- `lib/hooks/useMediaQuery.ts` - Responsive hook
- `lib/hooks/useTypewriter.ts` - Typewriter effect
- `lib/utils/cn.ts` - Utility function
- `styles/animations.css` - Animation styles

## After Cleanup

1. **Verify the app still works**:
   ```bash
   npm run dev
   ```

2. **Check for any import errors** in the browser console

3. **Test all pages**:
   - Home page (/)
   - Projects page (/projects)

4. **Run build** to ensure no errors:
   ```bash
   npm run build
   ```

## Optional: Git Cleanup

If you're using Git, commit the deletions:

```bash
git add .
git commit -m "Remove unnecessary files and simplify portfolio structure"
```

## Note

You don't have to delete these files immediately. They won't affect the functionality of your portfolio. However, removing them will:
- Reduce project size
- Make the codebase cleaner
- Improve build times slightly
- Make it easier to understand the project structure

Keep this file for reference in case you need to restore any functionality later.
