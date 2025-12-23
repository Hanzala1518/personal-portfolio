export interface SkillCategory {
  title: string
  icon: string
  color: string
  skills: string[]
}

export const skillMatrix: SkillCategory[] = [
  {
    title: "Programming Languages",
    icon: "code",
    color: "text-matrix-green",
    skills: ["Python", "JavaScript", "TypeScript", "C++", "C#", "Java", "R", "SQL"]
  },
  {
    title: "AI, ML & Intelligent Systems",
    icon: "brain",
    color: "text-matrix-cyan",
    skills: ["Generative AI", "RAG", "Multi-Agent Systems", "Intent Classification", "Vector Databases", "TensorFlow", "Keras", "Scikit-learn", "OpenCV", "Image Processing"]
  },
  {
    title: "Web Development & APIs",
    icon: "globe",
    color: "text-matrix-green",
    skills: ["React.js", "Next.js", "Node.js", "Express.js", "FastAPI", "Streamlit", "Tailwind CSS", "HTML5", "CSS"]
  },
  {
    title: "Data Science & Visualization",
    icon: "line-chart",
    color: "text-matrix-yellow",
    skills: ["NumPy", "Pandas", "Matplotlib", "Seaborn", "Apache ECharts", "Tableau"]
  },
  {
    title: "Databases & Cloud Platforms",
    icon: "cloud",
    color: "text-matrix-cyan",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Supabase", "Firebase", "Pinecone", "AWS Cloud Architecting", "Google Cloud Platform"]
  },
  {
    title: "Cybersecurity & Networking",
    icon: "shield",
    color: "text-matrix-red",
    skills: ["Ethical Hacking", "Network Security", "Computer Networks", "Security Analysis", "Wireshark"]
  },
  {
    title: "Tools & Developer Ecosystem",
    icon: "settings",
    color: "text-matrix-yellow",
    skills: ["Git & GitHub", "Postman", "Linux", "VS Code", "Google Colab", "n8n Workflows"]
  },
  {
    title: "Core CS Concepts",
    icon: "book",
    color: "text-matrix-green",
    skills: ["Data Structures & Algorithms", "Object-Oriented Programming", "DBMS", "Distributed Computing", "System Design", "Probability & Statistics"]
  }
]
