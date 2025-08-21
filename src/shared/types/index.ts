export type ModalType = 'about' | 'experience' | 'projects' | 'skills' | 'contact';

export interface NavigationCardData {
  id: string;
  emoji: string;
  color: 'blue' | 'purple' | 'green' | 'red';
  hintEmoji?: string;
  hintText?: string;
  title: string;
  subtitle: string;
}

export interface HeroSectionProps {
  onProfileClick: () => void;
}

export interface LoaderProps {
  onLoadComplete: () => void;
}

export interface NavigationCardProps {
  emoji: string;
  title: string;
  subtitle: string;
  color: 'blue' | 'purple' | 'green' | 'red';
  hintText?: string;
  onClick: () => void;
  delay?: number;
}