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
  location: 'Mumbai, India — open to remote',
  email: 'sudhanshu19102003@gmail.com',
}

export const ABOUT_PARAGRAPHS = [
  `I started building AI systems not because they were trendy, but because I wanted to understand
   the full stack — from a raw model forward pass to the API that a lawyer in another country
   actually uses. That curiosity is still what drives me.`,
  `At <strong>Jurisphere</strong>, I work on LLM-based agent frameworks for legal professionals —
   systems that have to be accurate, fast, and reliable. That means I think a lot about latency,
   retrieval quality, and what it actually means for a model to "understand" a document.`,
  `My IEEE paper on <strong>knowledge graph–enhanced RAG</strong> came from a frustration with
   how poorly standard retrieval handles multi-document reasoning. I wanted to prove a better path existed.`,
  `Outside of work: I like designing things from scratch. Whether it's a custom LangChain-like framework,
   an async task queue for crypto scraping, or an X-ray classifier — I find the problems I enjoy most
   are the ones where the solution shape isn't obvious yet.`,
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
    role: 'Senior Software Engineer',
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
  link: string
  linkLabel: string
  muted?: boolean
}

export const PROJECTS: ProjectItem[] = [
  {
    num: '001',
    name: 'Book Assistant',
    desc: 'An LLM-powered agent that retrieves book information via tools and delivers structured responses. Built with a LangChain state graph for dynamic data flow and vector DB for efficient storage.',
    tags: ['LangChain','Claude API','Vector DB','Agents'],
    link: 'https://github.com/sudhanshu19102003',
    linkLabel: 'GitHub',
  },
  {
    num: '002',
    name: 'Crypto Scraping API',
    desc: 'A Django REST Framework API that scrapes live cryptocurrency data from multiple sources in parallel, using Celery for async task management and real-time progress tracking.',
    tags: ['Django','Celery','Redis','Web Scraping'],
    link: 'https://github.com/sudhanshu19102003',
    linkLabel: 'GitHub',
  },
  {
    num: '003',
    name: 'X-Ray Anomaly Detector',
    desc: 'Trained InceptionNet on the MURA dataset for musculoskeletal X-ray abnormality classification. Deployed via Streamlit for accessible stakeholder use — with a live demo.',
    tags: ['InceptionNet','PyTorch','Streamlit','Computer Vision'],
    link: 'https://github.com/sudhanshu19102003',
    linkLabel: 'GitHub + Demo',
  },
  {
    num: '004',
    name: 'Shopping Assistant',
    desc: 'A recommendation system using InceptionNet for product classification, wrapped in a Streamlit UI that makes it easy for stakeholders to explore and interact with.',
    tags: ['InceptionNet','Streamlit','Classification'],
    link: 'https://github.com/sudhanshu19102003',
    linkLabel: 'GitHub',
  },
  {
    num: '005',
    name: 'Business Analytics Assistant',
    desc: 'A system combining advanced data visualization techniques with SQL databases — demonstrating how LLMs can turn raw data queries into visual, interpretable insights.',
    tags: ['SQL','Data Viz','LLM'],
    link: 'https://github.com/sudhanshu19102003',
    linkLabel: 'GitHub',
  },
  {
    num: 'More',
    name: 'Always building',
    desc: "Every project here started with a question I couldn't find a good answer to. The next one will too.",
    tags: [],
    link: 'https://github.com/sudhanshu19102003',
    linkLabel: 'See all on GitHub',
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

