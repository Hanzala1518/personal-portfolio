export interface Certification {
  id: string
  name: string
  issuer: string
  issueDate: string
  credentialId?: string
  credentialUrl?: string
  description: string
}

export const certifications: Certification[] = [
  {
    "id": "cert-1",
    "name": "AWS Academy Graduate – Cloud Architecting",
    "issuer": "AWS Academy",
    "issueDate": "2025",
    "credentialId": "8563b402-0ad9-4730-8e0d-7be5c02f8202",
    "credentialUrl": "https://www.credly.com/badges/8563b402-0ad9-4730-8e0d-7be5c02f8202/public_url",
    "description": "Comprehensive training in designing scalable and secure cloud architectures on AWS."
  },
  {
    "id": "cert-2",
    "name": "Data Analyst in Python, Tableau & SQL",
    "issuer": "Udemy",
    "issueDate": "2025",
    "credentialId": "DATA-UDMY-2025",
    "credentialUrl": "https://www.udemy.com/certificate",
    "description": "Data cleaning, visualization, and analysis using Python, SQL, and Tableau."
  },
  {
    "id": "cert-3",
    "name": "Ethical Hacking From Scratch",
    "issuer": "Udemy",
    "issueDate": "2025",
    "credentialId": "EH-UDMY-2025",
    "credentialUrl": "https://www.udemy.com/certificate",
    "description": "Practical ethical hacking and penetration testing techniques including WiFi hacking, MITM attacks, and exploitation."
  },
  {
    "id": "cert-4",
    "name": "Python GUI Development with Tkinter",
    "issuer": "Udemy",
    "issueDate": "2025",
    "credentialId": "TKINTER-2025",
    "credentialUrl": "https://www.udemy.com/certificate",
    "description": "Building desktop GUI applications with Python and Tkinter."
  },
  {
    "id": "cert-5",
    "name": "MERN Stack Development – 30 Days of Code",
    "issuer": "30DC",
    "issueDate": "2024",
    "credentialId": "30DC-MERN-2024",
    "credentialUrl": "https://30daysofcode.xyz",
    "description": "Full-stack web development using MongoDB, Express, React, and Node.js."
  },
  {
    "id": "cert-6",
    "name": "Google Cybersecurity Professional Certificate",
    "issuer": "Google / Coursera",
    "issueDate": "2024",
    "credentialId": "9BJTMLUCVP4X",
    "credentialUrl": "https://coursera.org/verify/professional-cert/9BJTMLUCVP4X",
    "description": "Hands-on cybersecurity training covering network security, SOC, SIEM, incidents, vulnerabilities, and risk management."
  },
  {
    "id": "cert-7",
    "name": "Google Cloud Fundamentals",
    "issuer": "Google Cloud Study Jams",
    "issueDate": "2023",
    "credentialId": "GCP-FUND-2023",
    "credentialUrl": "https://cloud.google.com/learn/certification",
    "description": "Foundational training in Google Cloud services, networking, compute, IAM, and cloud deployments."
  }
]

