export interface Skill {
  name: string
  logo?: string
}

export interface SkillCategory {
  title: string
  icon: string
  color: string
  skills: Skill[]
}

const devicon = (name: string, variant: string = "original") => 
  `https://raw.githubusercontent.com/devicons/devicon/master/icons/${name}/${name}-${variant}.svg`

const skillicon = (name: string) =>
  `https://skillicons.dev/icons?i=${name}`

export const skillMatrix: SkillCategory[] = [
  {
    title: "Programming Languages",
    icon: "code",
    color: "text-matrix-green",
    skills: [
      { name: "Python", logo: devicon("python") },
      { name: "JavaScript", logo: devicon("javascript") },
      { name: "TypeScript", logo: devicon("typescript") },
      { name: "C++", logo: devicon("cplusplus") },
      { name: "C#", logo: devicon("csharp") },
      { name: "Java", logo: devicon("java") },
      { name: "R", logo: devicon("r") },
      { name: "SQL", logo: devicon("azuresqldatabase") }
    ]
  },
  {
    title: "AI, ML & Intelligent Systems",
    icon: "brain",
    color: "text-matrix-cyan",
    skills: [
      { name: "Generative AI", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
      { name: "RAG", logo: "https://miro.medium.com/0*Vj3xryR54H9H4_TB.jpg" },
      { name: "Multi-Agent Systems", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXKxfDQZ0c6yl2WcuZ28zgOsjDRIEsi698tw&s" },
      { name: "Intent Classification", logo: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg" },
      { name: "Vector Databases", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "TensorFlow", logo: devicon("tensorflow") },
      { name: "Keras", logo: devicon("keras") },
      { name: "Scikit-learn", logo: devicon("scikitlearn") },
      { name: "OpenCV", logo: devicon("opencv") },
      { name: "Image Processing", logo: devicon("opencv") }
    ]
  },
  {
    title: "Web Development & APIs",
    icon: "globe",
    color: "text-matrix-green",
    skills: [
      { name: "React.js", logo: devicon("react") },
      { name: "Next.js", logo: devicon("nextjs") },
      { name: "Node.js", logo: devicon("nodejs") },
      { name: "Express.js", logo: devicon("express") },
      { name: "Angular", logo: devicon("angularjs") },
      { name: "FastAPI", logo: devicon("fastapi") },
      { name: "Streamlit", logo: devicon("streamlit") },
      { name: "Tailwind CSS", logo: devicon("tailwindcss") },
      { name: "HTML5", logo: devicon("html5") },
      { name: "CSS", logo: devicon("css3") }
    ]
  },
  {
    title: "Data Science & Visualization",
    icon: "line-chart",
    color: "text-matrix-yellow",
    skills: [
      { name: "NumPy", logo: devicon("numpy") },
      { name: "Pandas", logo: devicon("pandas") },
      { name: "Matplotlib", logo: devicon("matplotlib") },
      { name: "Seaborn", logo: devicon("python") },
      { name: "Apache ECharts", logo: "https://echarts.apache.org/en/images/logo.png" },
      { name: "Tableau", logo: "https://cdn.worldvectorlogo.com/logos/tableau-software.svg" }
    ]
  },
  {
    title: "Databases & Cloud Platforms",
    icon: "cloud",
    color: "text-matrix-cyan",
    skills: [
      { name: "PostgreSQL", logo: devicon("postgresql") },
      { name: "MySQL", logo: devicon("mysql") },
      { name: "MongoDB", logo: devicon("mongodb") },
      { name: "Supabase", logo: devicon("supabase") },
      { name: "Firebase", logo: devicon("firebase") },
      { name: "Pinecone", logo: "https://images.seeklogo.com/logo-png/48/1/pinecone-icon-logo-png_seeklogo-482365.png" },
      { name: "AWS", logo: devicon("amazonwebservices", "original-wordmark") },
      { name: "Google Cloud Platform", logo: devicon("googlecloud") }
    ]
  },
  {
    title: "Cybersecurity & Networking",
    icon: "shield",
    color: "text-matrix-red",
    skills: [
  { name: "Ethical Hacking", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg"},
  { name: "Web Application Security", logo: "https://e7.pngegg.com/pngimages/888/471/png-clipart-computer-security-internet-security-antivirus-software-web-application-security-computer-software-others-miscellaneous-computer-network-thumbnail.png"},
  { name: "Network Security", logo: "https://img.freepik.com/free-vector/cyber-security-shield-light-blue_78370-7843.jpg"},
  { name: "Wireshark", logo: "https://upload.wikimedia.org/wikipedia/commons/d/df/Wireshark_icon.svg"},
  { name: "Nmap", logo: "https://www.pikpng.com/pngl/m/332-3325675_site-logo-png.png"},
  { name: "Metasploit Framework", logo: "https://www.kali.org/tools/metasploit-framework/images/metasploit-framework-logo.svg"},
  { name: "Burp Suite", logo: "https://roanokeinfosec.com/wp-content/uploads/2020/02/burp_suite.png?w=300&h=174"}
]
  },
  {
    title: "Tools & Developer Ecosystem",
    icon: "settings",
    color: "text-matrix-yellow",
    skills: [
      { name: "Git & GitHub", logo: devicon("git") },
      { name: "Postman", logo: devicon("postman") },
      { name: "Linux", logo: devicon("linux") },
      { name: "VS Code", logo: devicon("vscode") },
      { name: "Google Colab", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Colaboratory_SVG_Logo.svg" },
      { name: "n8n Workflows", logo: "https://avatars.githubusercontent.com/u/45487711?s=200&v=4" }
    ]
  },
  {
    title: "Core CS Concepts",
    icon: "book",
    color: "text-matrix-green",
    skills: [
      { name: "Data Structures & Algorithms", logo: "https://cdn-icons-png.freepik.com/256/6360/6360942.png?semt=ais_white_label" },
      { name: "Object-Oriented Programming", logo: "https://content-media-cdn.codefinity.com/articles/17c18c54-6ea9-443f-8255-a7f230a415ab/computer.png" },
      { name: "DBMS", logo: "https://camo.githubusercontent.com/5a386bbaf2c23b999b6d0c3ff93251ed63957560aaebb8615e9232b63bb4c59c/68747470733a2f2f7777772e7376677265706f2e636f6d2f73686f772f3532353331312f64617461626173652e737667" },
      { name: "Distributed Computing", logo: "https://w7.pngwing.com/pngs/770/38/png-transparent-computer-icons-distribution-marketing-distribution-blue-content-marketing-symmetry-thumbnail.png" },
      { name: "Cryptography & Network Security", logo: "https://www.pikpng.com/pngl/m/510-5109202_cryptography-png-secure-network-icon-clipart.png" },
      { name: "Cyber Security", logo: "https://png.pngtree.com/png-vector/20250528/ourlarge/pngtree-cyber-security-badge-icon-png-image_16393283.png" },
      { name: "Probability & Statistics", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKbDjl3wcOMU4R5vXf2LG1ovx3yBCwDeVi-Q&s" }
    ]
  }
]
