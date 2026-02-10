export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  role: string;
  image: string;
  images: string[];
  liveUrl?: string;
}

export interface Section {
  id: string;
  name: string;
}

export interface CursorState {
  isHovering: boolean;
  targetType?: 'button' | 'nav' | 'card' | 'cta' | 'link';
}

export interface MagneticTarget {
  element: HTMLElement;
  type: CursorState['targetType'];
  strength: number;
}