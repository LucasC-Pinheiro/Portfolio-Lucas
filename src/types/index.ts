import type { TranslationKey } from '../data/i18n';

export interface Skill {
  name: string;
  icon: string;
  category: 'Frontend' | 'Mobile' | 'Backend' | 'Data & State' | 'Tools';
}

export type ProjectCategory = 'ios-native' | 'react-native' | 'web';

export type ImageOrientation = 'portrait' | 'landscape' | 'square';

export interface ProjectImage {
  src: string;
  orientation: ImageOrientation;
  aspectRatio?: string;
  captionKey?: TranslationKey;
}

export interface Project {
  id: string;
  title: string;
  year: number;
  featured: boolean;
  category: ProjectCategory;
  technologies: string[];
  taglineKey: TranslationKey;
  descriptionKey: TranslationKey;
  gallery: ProjectImage[];
  githubUrl?: string;
  liveUrl?: string;
  accentColor: string;
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
