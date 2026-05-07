export const NAV_LINKS = [
  { label: 'About',      href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Research',   href: '#research' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Contact',    href: '#contact' },
]

export const HERO = {
  tag: 'AI & Systems Engineer',
  name: ['Sudhanshu', 'Suryawanshi'] as [string, string],
  desc: `I build end-to-end AI systems — from LLM agent frameworks and RAG pipelines
to production backends and cloud infrastructure. I care about how systems
think, not just how they run.`,
  location: 'Bengaluru, India — open to remote',
  email: 'sudhanshu19102003@gmail.com',
}

export const ABOUT_PARAGRAPHS = [
  `I started building AI systems to understand them end-to-end — from model internals to orchestration and tooling that extends model capability while addressing their limitations.`,
  `That curiosity led to my <em>IEEE research on knowledge graph–enhanced RAG</em>, where I explored architectures for better multi-document reasoning beyond traditional retrieval pipelines.`,
  `Today, at <a href="https://jurisphere.ai" target="_blank"><strong><u><em>Jurisphere</em></u></strong></a>, I build LLM systems for legal professionals, focusing on retrieval, latency, and agent design to improve reliability and reasoning across large document sets.`,
  `Across all of this, I’m most drawn to building systems from first principles — especially problems where strong engineering matters as much as the model itself.`,
]

export const SKILLS = [
  {
    category: 'AI & ML',
    tags: ['LLMs','LangChain','LlamaIndex','PEFT','RAG','PyTorch','TensorFlow','Transformers','MCP'],
  },
  {
    category: 'Backend & Data',
    tags: ['Python','FastAPI','SQL','Celery','Redis','REST'],
  },
  {
    category: 'Frontend',
    tags: ['TypeScript','Next.js'],
  },
  {
    category: 'Infrastructure',
    tags: ['Kubernetes','Docker','Jenkins','GCP','AWS','CI/CD'],
  },
  {
    category: 'Vision & OCR',
    tags: ['OpenCV','Tesseract','InceptionNet'],
  },
]

export interface ExperienceItem {
  period: string
  company: string
  role: string
  points: string[]
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    period: 'Jun 2025 — Present',
    company: 'jurisphere.ai',
    role: 'Software Developer',
    points: [
      'Built AI-powered admin dashboards for automated data visualization and exploration.',
      'Overhauled backend by replacing legacy APIs with secure, high-performance ORM-based services.',
      'Implemented CI/CD pipelines, deployment workflows, and environment configurations for production.',
      'Integrated low-latency, streaming Google Text-to-Speech for assistant responses.',
      'Developed responsive, region-aware UIs with improved authentication and accessibility.',
    ],
  },
  {
    period: 'Jul 2024 — Jun 2025',
    company: 'softnerve.com',
    role: 'R&D Intern',
    points: [
      'Designed a custom agent orchestration framework (LangChain-like) for LLM-based automation pipelines.',
      'Exposed services through FastAPI REST interfaces with clean separation of concerns.',
      'Fine-tuned and quantized models for improved inference efficiency at scale.',
      'Deployed optimized models on Runpod for large-scale production use.',
      'Set up CI/CD pipelines using Jenkins and GitHub Actions.',
    ],
  },
]

export interface ProjectItem {
  num: string
  name: string
  desc: string
  tags: string[]
  github: string
  streamlit?: string
  video?: string
  images?: string[]
  muted?: boolean
}

export const PROJECTS: ProjectItem[] = [
  {
    num: '001',
    name: 'Steam Recommendations',
    desc: 'A game recommendation system combining Collaborative Filtering (SVD) and Content-Based Filtering (FAISS) to suggest Steam games. Pulls live game details and artwork from the Steam API.',
    tags: ['SVD','FAISS','Steam API','Streamlit'],
    github: 'https://github.com/sudhanshu19102003/steam_recommendations_system',
    streamlit: 'https://steam-recommendations.streamlit.app/',
    video: 'https://github.com/user-attachments/assets/840a95d9-32c3-4e27-9cfb-c59d7ac935dc',
  },
  {
    num: '002',
    name: 'Book Assistant',
    desc: 'An LLM-powered agent that retrieves book information via tools and delivers structured responses. Built with a LangChain state graph for dynamic data flow and ChromaDB for efficient semantic search.',
    tags: ['LangChain','Claude API','ChromaDB','Agents'],
    github: 'https://github.com/sudhanshu19102003/Book_Assistant',
    streamlit: 'https://book-assistant.streamlit.app/',
    video: 'https://github.com/sudhanshu19102003/LLM_agent_books/assets/78022236/a001d579-1c09-4830-964b-e719b200782e',
  },
  {
    num: '003',
    name: 'X-Ray Anomaly Detector',
    desc: 'Trained InceptionNet on the MURA dataset for musculoskeletal X-ray abnormality classification. Deployed via Streamlit for accessible stakeholder use — with a live demo.',
    tags: ['InceptionNet','PyTorch','Streamlit','Computer Vision'],
    github: 'https://github.com/sudhanshu19102003/x-ray-analyzer-streamlit',
    streamlit: 'https://x-ray-analyzer.streamlit.app/',
    images: [
      'https://github.com/user-attachments/assets/916a533f-2d11-4e46-bdc1-0d5b9bb8ee17',
      'https://github.com/user-attachments/assets/d53fd941-955a-43d8-a54e-be59e304e828',
    ],
  },
  {
    num: '004',
    name: 'ShopSense',
    desc: 'A Chrome extension that scans e-commerce pages to detect fraudulent reviews and surfaces an AI-powered product chatbot — powered by Flask and Llama on the backend.',
    tags: ['Chrome Extension','Flask','LLM','NLP'],
    github: 'https://github.com/sudhanshu19102003/ShopSense',
    video: 'https://github.com/sudhanshu19102003/ShopSense/assets/78022236/a9e6c507-26a2-4fcb-80c3-471ab9bc6481',
  },
  {
    num: '005',
    name: 'Crypto Scraping API',
    desc: 'A Django REST Framework API that scrapes live cryptocurrency data from multiple sources in parallel, using Celery for async task management and real-time progress tracking.',
    tags: ['Django','Celery','Redis','Web Scraping'],
    github: 'https://github.com/sudhanshu19102003/CoinMarketCap_scraper',
    images: [
      'https://github.com/sudhanshu19102003/CoinMarketCap_scraper/assets/78022236/d315835e-812b-4648-9148-33084d7745ef',
      'https://github.com/sudhanshu19102003/CoinMarketCap_scraper/assets/78022236/7a5ea769-ece2-4d2c-be87-828f2471c6d1',
    ],
  },
  {
    num: '006',
    name: 'Business Analytics Assistant',
    desc: 'A system combining advanced data visualization techniques with SQL databases — demonstrating how LLMs can turn raw data queries into visual, interpretable insights.',
    tags: ['SQL','Data Viz','LLM'],
    github: 'https://github.com/sudhanshu19102003/Business_Analytics_Assistant',
  },
  {
    num: 'More',
    name: 'Always building',
    desc: "Every project here started with a question I couldn't find a good answer to. The next one will too.",
    tags: [],
    github: 'https://github.com/sudhanshu19102003',
    muted: true,
  },
]

export const RESEARCH = {
  label: 'IEEE ICPCSN — May 2025',
  title: 'A Knowledge Graph-based RAG for Cross-Document Information Extraction',
  venue: 'Published at IEEE ICPCSN 2025',
  desc: `Standard RAG systems struggle when the answer to a question spans multiple documents.
This paper proposes a system where a knowledge graph sits alongside a vector index —
combining graph traversal with semantic retrieval for richer, more accurate cross-document reasoning.
Outperforms traditional methods on multi-document and long-context benchmarks.`,
  badge: { text: 'IEEE', sub: 'Peer reviewed', year: '2025' },
  doi: '10.1109/ICPCSN65854.2025.11035854',
  url: 'https://ieeexplore.ieee.org/document/11035854',
}

export interface ContactLink {
  label: string
  value: string
  href: string
}

export const CONTACT_LINKS: ContactLink[] = [
  { label: 'Email',    value: 'sudhanshu19102003@gmail.com', href: 'mailto:sudhanshu19102003@gmail.com' },
  { label: 'Phone',    value: '+91 8356 095913',             href: 'tel:+918356095913' },
  { label: 'GitHub',   value: 'github.com/sudhanshu19102003', href: 'https://github.com/sudhanshu19102003' },
  { label: 'LinkedIn', value: 'Sudhanshu Suryawanshi',       href: 'https://linkedin.com' },
]

export interface CertItem {
  title: string
  issuer: string
  id: string
  light?: boolean
}

export const CERTS: CertItem[] = [
  {
    title: 'Machine Learning Specialization',
    issuer: 'DeepLearning.AI × Stanford University',
    id: 'ID: F72CZKSM9VSQ',
  },
  {
    title: 'Generative AI with Large Language Models',
    issuer: 'DeepLearning.AI × Amazon Web Services',
    id: 'ID: QSV8RLRAYYK9',
  },
  {
    title: 'BE in Artificial Intelligence & Data Science',
    issuer: 'University of Mumbai — New Horizon Institute',
    id: '2021 — 2025',
    light: true,
  },
]

