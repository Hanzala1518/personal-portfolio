export interface BlogPostFrontmatter {
  title: string
  slug: string
  excerpt: string
  category: "TUTORIALS" | "ANALYSIS" | "CTF-WRITEUPS" | "RESEARCH"
  tags: string[]
  publishedAt: string
  readingTime: string
  featuredImage?: string
}
