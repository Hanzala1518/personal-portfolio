export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  image: string
  technologies: string[]
  category: string
  demoUrl?: string
  githubUrl?: string
  liveUrl?: string
  featured?: boolean
  year?: string
  features?: string[]
  screenshots?: string[]
}

export const projects: Project[] = [
  {
    id: "fourbyte-chatapp",
    title: "Fourbyte ChatApp",
    description: "Anonymous, real-time room-based chat application. No login, no database—just pure, ephemeral conversation with 4-digit room codes and WebSocket-powered messaging.",
    longDescription: "FOURBYTE is a minimalist, privacy-first chat application where conversations happen in real-time within ephemeral rooms. No account creation, no data persistence—just instant, anonymous communication. Built with Angular 21 frontend and Node.js/Express backend, featuring a distinctive 'Terminal Noir' design aesthetic.",
    image: "/images/projects/fourbyte.jpg",
    technologies: ["Angular", "TypeScript", "Node.js", "Express", "Socket.io", "RxJS", "Vercel", "Railway"],
    category: "Web Development",
    githubUrl: "https://github.com/Hanzala1518/fourbyte",
    liveUrl: "https://fourbyte.vercel.app",
    featured: true,
    year: "2025",
    features: [
      "🎭 Fully Anonymous - No registration, no tracking, no data storage",
      "🔢 4-Digit Room Codes - Simple, memorable room identifiers",
      "⚡ Real-Time Messaging - Powered by WebSocket technology",
      "🎨 Terminal Noir Design - Distinctive, typography-first interface",
      "🔄 Auto-Reconnection - Seamless recovery from network issues",
      "🛡️ Rate Limiting - Built-in spam protection",
      "📱 Responsive Design - Works on all devices",
      "💨 Ephemeral Rooms - Auto-cleanup when empty"
    ],
    screenshots: [
      "/images/projects/fourbyte/landing.png",
      "/images/projects/fourbyte/chat.png",
      "/images/projects/fourbyte/room.png"
    ]
  },
  {
    id: "marketmuse-ai",
    title: "MarketMuse AI",
    description: "Engineered a comprehensive, multi-agent AI marketing platform using React and Supabase. Architected a sophisticated, real-time token-based billing and usage-tracking system for 10 distinct AI agents. Implemented a full-cycle campaign management dashboard with data-driven analytics and integrated n8n webhooks for complex workflow automation.",
    longDescription: "MarketMuse AI is a comprehensive multi-agent AI marketing platform that revolutionizes digital marketing workflows. The platform features 10 distinct AI agents, each specialized for different marketing tasks, with a sophisticated real-time token-based billing system. The campaign management dashboard provides data-driven analytics and integrates with n8n webhooks for complex workflow automation.",
    image: "/images/projects/marketmuse.jpg",
    technologies: ["React", "Supabase", "PostgreSQL", "n8n", "Real-time Applications", "REST APIs"],
    category: "AI & Machine Learning",
    githubUrl: "https://github.com/Hanzala1518/MarketMuseAI",
    liveUrl: "https://capstone-ai-marketplace.vercel.app",
    featured: true,
    year: "2025",
    features: [
      "🤖 10 Distinct AI Agents for specialized marketing tasks",
      "💰 Real-time token-based billing and usage tracking",
      "📊 Campaign management dashboard with analytics",
      "🔗 n8n webhook integration for workflow automation",
      "⚡ Real-time updates using Supabase subscriptions"
    ]
  },
  {
    id: "chartgenie",
    title: "ChartGenie",
    description: "Architected a full-stack, AI-powered data visualization platform to transform raw CSVs into 7+ types of interactive dashboards using React and Apache ECharts. Engineered a high-performance RAG (Retrieval-Augmented Generation) system, leveraging Groq's ultra-fast LPU and Supabase Edge Functions, to enable complex data analysis via a natural language chat interface.",
    longDescription: "ChartGenie is a full-stack AI-powered data visualization platform that transforms raw CSV data into beautiful, interactive dashboards. Using React and Apache ECharts, it supports 7+ chart types. The platform features a high-performance RAG system powered by Groq's ultra-fast LPU inference, enabling users to analyze their data through natural language conversations.",
    image: "/images/projects/chartgenie.jpg",
    technologies: ["React", "Supabase", "RAG", "Groq API", "PostgreSQL", "Apache ECharts", "Tailwind CSS"],
    category: "AI & Machine Learning",
    githubUrl: "https://github.com/Hanzala1518/ChartGenie",
    featured: true,
    year: "2025",
    features: [
      "📈 7+ Interactive chart types with Apache ECharts",
      "🧠 RAG-powered natural language data analysis",
      "⚡ Ultra-fast inference with Groq LPU",
      "📁 CSV to dashboard transformation",
      "💬 Chat interface for data exploration"
    ]
  },
  {
    id: "propertyrag",
    title: "PropertyRAG",
    description: "Engineered a production-grade real estate intelligence platform powered by Retrieval-Augmented Generation (RAG). Architected a sophisticated backend (FastAPI) with 9-intent classification, a deterministic analytics engine, and a hybrid search pipeline with CrossEncoder re-ranking to deliver high-confidence, multi-turn answers.",
    longDescription: "PropertyRAG is a production-grade real estate intelligence platform that leverages RAG technology to provide accurate, context-aware answers about properties. The FastAPI backend features 9-intent classification for understanding user queries, a deterministic analytics engine, and a hybrid search pipeline with CrossEncoder re-ranking for high-confidence results.",
    image: "/images/projects/propertyrag.jpg",
    technologies: ["RAG", "Google Gemini", "Pinecone", "FastAPI", "CrossEncoder", "Intent Classification", "Python"],
    category: "AI & Machine Learning",
    githubUrl: "https://github.com/Hanzala1518/PropertyRAG",
    featured: true,
    year: "2025",
    features: [
      "🏠 Real estate intelligence with RAG",
      "🎯 9-intent classification system",
      "🔍 Hybrid search with CrossEncoder re-ranking",
      "💬 Multi-turn conversation support",
      "📊 Deterministic analytics engine"
    ]
  },
  {
    id: "customer-churn-prediction",
    title: "Customer Churn Retention",
    description: "Developed a machine learning model to predict customer churn using telecom industry datasets. Implemented feature engineering, model selection, and evaluation to optimize churn prediction accuracy, aiding customer retention strategies.",
    longDescription: "A comprehensive machine learning solution for predicting customer churn in the telecom industry. The project involves extensive feature engineering, model selection, and evaluation to achieve optimal prediction accuracy, helping businesses implement effective customer retention strategies.",
    image: "/images/projects/churn-prediction.jpg",
    technologies: ["Machine Learning", "Python", "Pandas", "Scikit-learn", "Classification Models"],
    category: "Data Science",
    githubUrl: "https://github.com/Hanzala1518",
    featured: false,
    year: "2025",
    features: [
      "📊 Telecom customer churn prediction",
      "🔧 Extensive feature engineering",
      "🎯 Multiple classification models comparison",
      "📈 Model performance optimization"
    ]
  },
  {
    id: "object-detection-system",
    title: "Room-wise Object Detection",
    description: "Developed a computer vision application using YOLOv8 and Streamlit to detect and analyze unique household objects. Implemented a full-featured analytics dashboard and a batch processing module to provide comprehensive object statistics and distribution charts from multiple images.",
    longDescription: "A computer vision application that uses YOLOv8 for detecting and analyzing household objects. Built with Streamlit, it features a comprehensive analytics dashboard and batch processing capabilities for analyzing multiple images, providing detailed object statistics and distribution visualizations.",
    image: "/images/projects/object-detection.jpg",
    technologies: ["YOLOv8", "Streamlit", "Computer Vision", "OpenCV", "Pandas", "Python"],
    category: "AI & Machine Learning",
    githubUrl: "https://github.com/Hanzala1518/Room-wise-Object-Detection-System",
    featured: true,
    year: "2025",
    features: [
      "👁️ YOLOv8-powered object detection",
      "📊 Analytics dashboard with statistics",
      "📦 Batch image processing",
      "📈 Object distribution charts"
    ]
  },
  {
    id: "distributed-image-pipeline",
    title: "Distributed Image Processing Pipeline",
    description: "Designed and implemented a distributed system for large-scale image processing tasks. Utilized distributed computing frameworks to parallelize image operations, enhancing processing speed and scalability for high-volume datasets.",
    longDescription: "A distributed system designed for large-scale image processing, utilizing parallel computing frameworks to handle high-volume image datasets efficiently. The system distributes image operations across multiple nodes for enhanced processing speed and scalability.",
    image: "/images/projects/distributed-pipeline.jpg",
    technologies: ["Distributed Systems", "Parallel Computing", "Python", "Message Queues"],
    category: "Distributed Computing",
    githubUrl: "https://github.com/Hanzala1518",
    featured: false,
    year: "2025",
    features: [
      "🖼️ Large-scale image processing",
      "⚡ Parallel computing for speed",
      "📊 High-volume dataset handling",
      "🔄 Message queue integration"
    ]
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
