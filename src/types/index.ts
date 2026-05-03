export interface Skill {
  name: string;
  icon: string;
  category: 'Frontend' | 'Mobile' | 'Backend' | 'Data & State' | 'Tools';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  gallery: string[];
  githubUrl: string;
  technologies: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface PortfolioData {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  socialLinks: SocialLink[];
  skills: Skill[];
  projects: Project[];
  tagline: string;
}
