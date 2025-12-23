export interface Project {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  category: string
  demoUrl?: string
  githubUrl?: string
  featured?: boolean
  year?: string
}

export const projects: Project[] = [
  {
    id: "marketmuse-ai",
    title: "MarketMuse AI",
    description: "Engineered a comprehensive, multi-agent AI marketing platform using React and Supabase. Architected a sophisticated, real-time token-based billing and usage-tracking system for 10 distinct AI agents. Implemented a full-cycle campaign management dashboard with data-driven analytics and integrated n8n webhooks for complex workflow automation.",
    image: "/images/projects/marketmuse.jpg",
    technologies: ["React", "Supabase", "PostgreSQL", "n8n", "Real-time Applications", "REST APIs"],
    category: "AI & Machine Learning",
    githubUrl: "https://github.com/Hanzala1518",
    featured: true,
    year: "2025"
  },
  {
    id: "chartgenie",
    title: "ChartGenie",
    description: "Architected a full-stack, AI-powered data visualization platform to transform raw CSVs into 7+ types of interactive dashboards using React and Apache ECharts. Engineered a high-performance RAG (Retrieval-Augmented Generation) system, leveraging Groq's ultra-fast LPU and Supabase Edge Functions, to enable complex data analysis via a natural language chat interface.",
    image: "/images/projects/chartgenie.jpg",
    technologies: ["React", "Supabase", "RAG", "Groq API", "PostgreSQL", "Apache ECharts", "Tailwind CSS"],
    category: "AI & Machine Learning",
    githubUrl: "https://github.com/Hanzala1518",
    featured: true,
    year: "2025"
  },
  {
    id: "propertyrag",
    title: "PropertyRAG",
    description: "Engineered a production-grade real estate intelligence platform powered by Retrieval-Augmented Generation (RAG). Architected a sophisticated backend (FastAPI) with 9-intent classification, a deterministic analytics engine, and a hybrid search pipeline with CrossEncoder re-ranking to deliver high-confidence, multi-turn answers.",
    image: "/images/projects/propertyrag.jpg",
    technologies: ["RAG", "Google Gemini", "Pinecone", "FastAPI", "CrossEncoder", "Intent Classification", "Python"],
    category: "AI & Machine Learning",
    githubUrl: "https://github.com/Hanzala1518",
    featured: true,
    year: "2025"
  },
  {
    id: "customer-churn-prediction",
    title: "Customer Churn Retention",
    description: "Developed a machine learning model to predict customer churn using telecom industry datasets. Implemented feature engineering, model selection, and evaluation to optimize churn prediction accuracy, aiding customer retention strategies.",
    image: "/images/projects/churn-prediction.jpg",
    technologies: ["Machine Learning", "Python", "Pandas", "Scikit-learn", "Classification Models"],
    category: "Data Science",
    githubUrl: "https://github.com/Hanzala1518",
    featured: false,
    year: "2025"
  },
  {
    id: "object-detection-system",
    title: "Room-wise Object Detection",
    description: "Developed a computer vision application using YOLOv8 and Streamlit to detect and analyze unique household objects. Implemented a full-featured analytics dashboard and a batch processing module to provide comprehensive object statistics and distribution charts from multiple images.",
    image: "/images/projects/object-detection.jpg",
    technologies: ["YOLOv8", "Streamlit", "Computer Vision", "OpenCV", "Pandas", "Python"],
    category: "AI & Machine Learning",
    githubUrl: "https://github.com/Hanzala1518",
    featured: true,
    year: "2025"
  },
  {
    id: "distributed-image-pipeline",
    title: "Distributed Image Processing Pipeline",
    description: "Designed and implemented a distributed system for large-scale image processing tasks. Utilized distributed computing frameworks to parallelize image operations, enhancing processing speed and scalability for high-volume datasets.",
    image: "/images/projects/distributed-pipeline.jpg",
    technologies: ["Distributed Systems", "Parallel Computing", "Python", "Message Queues"],
    category: "Distributed Computing",
    githubUrl: "https://github.com/Hanzala1518",
    featured: false,
    year: "2025"
  }
]

export const featuredProjects = projects.filter(p => p.featured)

export const projectCategories = [
  "All",
  "AI & Machine Learning",
  "Data Science",
  "Web Development",
  "Distributed Computing",
  "Cybersecurity"
]
