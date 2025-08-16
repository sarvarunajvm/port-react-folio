/**
 * Advanced Portfolio Type Definitions
 * Comprehensive type system with strict typing and utility types
 */
import type { ComponentType, ReactNode } from 'react';

// ============================================
// UTILITY TYPES
// ============================================
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type AsyncData<T> = {
  data: Nullable<T>;
  loading: boolean;
  error: Nullable<Error>;
};

// ============================================
// DOMAIN TYPES
// ============================================
export interface PersonalInfo {
  readonly firstname: string;
  readonly lastname: string;
  readonly nickname?: string;
  readonly email: string;
  readonly phone: string;
  readonly location: Location;
  readonly titles: readonly string[];
  readonly bio: string;
  readonly availability: Availability;
  readonly social: SocialLinks;
  readonly resume: ResumeInfo;
}

export interface Location {
  readonly city: string;
  readonly country: string;
  readonly timezone: string;
}

export interface Availability {
  readonly status: 'Available' | 'Busy' | 'Not Available';
  readonly message?: string;
}

export interface SocialLinks {
  readonly github: string;
  readonly linkedin: string;
  readonly stackoverflow?: string;
  readonly devto?: string;
  readonly twitter?: string;
  readonly medium?: string;
}

export interface ResumeInfo {
  readonly path: string;
  readonly downloadName: string;
  readonly lastUpdated?: Date;
}

// ============================================
// EXPERIENCE TYPES
// ============================================
export type ExperienceLevel = 'Junior' | 'Mid' | 'Senior' | 'Lead' | 'Principal';

export interface Experience {
  readonly id: string;
  readonly company: string;
  readonly designation: string;
  readonly level?: ExperienceLevel;
  readonly period: string;
  readonly icon: string;
  readonly current: boolean;
  readonly achievements: readonly string[];
  readonly impact?: readonly Impact[];
  readonly technologies?: readonly string[];
  readonly teamSize?: number;
}

export interface Impact {
  readonly metric: string;
  readonly value: string;
  readonly type: 'increase' | 'decrease' | 'neutral';
  readonly description?: string;
}

// ============================================
// PROJECT TYPES
// ============================================
export type ProjectStatus =
  | 'Production Ready'
  | 'Enterprise'
  | 'Open Source'
  | 'In Development'
  | 'Archived';

export interface Project {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly tech: string;
  readonly status: ProjectStatus;
  readonly metrics?: ProjectMetrics;
  readonly url?: string;
  readonly npmLink?: string;
  readonly demoLink?: string;
  readonly createdDate: string;
  readonly lastUpdated?: string;
  readonly stars?: number;
  readonly forks?: number;
  readonly contributors?: number;
}

export interface ProjectMetrics {
  readonly modules?: number;
  readonly users?: number;
  readonly weeklyDownloads?: number;
  readonly monthlyActiveUsers?: number;
  readonly coverage?: number;
  readonly performance?: number;
}

// ============================================
// SKILL TYPES
// ============================================
export type ProficiencyLevel = 'expert' | 'advanced' | 'intermediate' | 'beginner';

export interface Skill {
  readonly id: string;
  readonly name: string;
  readonly proficiency: ProficiencyLevel;
  readonly icon: string;
  readonly yearsOfExperience?: number;
  readonly lastUsed?: Date;
  readonly certifications?: readonly Certification[];
}

export interface SkillCategory {
  readonly id: string;
  readonly category: string;
  readonly title: string;
  readonly skills: readonly Skill[];
  readonly priority?: number;
}

export interface Certification {
  readonly name: string;
  readonly issuer: string;
  readonly date: string;
  readonly expiryDate?: string;
  readonly credentialId?: string;
  readonly url?: string;
}

// ============================================
// EDUCATION TYPES
// ============================================
export interface Education {
  readonly id: string;
  readonly degree: string;
  readonly field: string;
  readonly institution: string;
  readonly period: string;
  readonly grade?: string;
  readonly achievements?: readonly string[];
  readonly thesis?: string;
  readonly advisor?: string;
}

// ============================================
// UI COMPONENT TYPES
// ============================================
export type ModalType = 'about' | 'experience' | 'projects' | 'skills' | 'contact' | 'education';

export type ColorVariant = 'blue' | 'purple' | 'green' | 'red' | 'yellow' | 'orange';

export type AnimationVariant = 'fade' | 'slide' | 'scale' | 'rotate' | 'bounce';

export interface NavigationCardData {
  readonly id: ModalType;
  readonly emoji: string;
  readonly color: ColorVariant;
  readonly hintEmoji?: string;
  readonly hintText?: string;
  readonly title: string;
  readonly subtitle: string;
  readonly disabled?: boolean;
  readonly badge?: string | number;
}

// ============================================
// COMPONENT PROP TYPES
// ============================================
export interface BaseComponentProps {
  readonly className?: string;
  readonly style?: React.CSSProperties;
  readonly children?: ReactNode;
  readonly testId?: string;
}

export interface InteractiveComponentProps extends BaseComponentProps {
  readonly onClick?: (event: React.MouseEvent) => void;
  readonly onKeyDown?: (event: React.KeyboardEvent) => void;
  readonly disabled?: boolean;
  readonly ariaLabel?: string;
  readonly tabIndex?: number;
}

export interface AnimatedComponentProps extends BaseComponentProps {
  readonly animation?: AnimationVariant;
  readonly duration?: number;
  readonly delay?: number;
  readonly repeat?: boolean | number;
}

// ============================================
// HOOK RETURN TYPES
// ============================================
export interface UseModalReturn {
  readonly isOpen: boolean;
  readonly open: () => void;
  readonly close: () => void;
  readonly toggle: () => void;
}

export interface UseThemeReturn {
  readonly theme: 'light' | 'dark';
  readonly toggleTheme: () => void;
  readonly setTheme: (theme: 'light' | 'dark') => void;
  readonly isDark: boolean;
}

export interface UseAnimationReturn {
  readonly ref: React.RefObject<HTMLElement>;
  readonly isInView: boolean;
  readonly hasAnimated: boolean;
  readonly controls: unknown; // Framer Motion AnimationControls
}

// ============================================
// CONTEXT TYPES
// ============================================
export interface ThemeContextValue {
  readonly theme: 'light' | 'dark';
  readonly toggleTheme: () => void;
  readonly setTheme: (theme: 'light' | 'dark') => void;
}

export interface PortfolioContextValue {
  readonly personal: PersonalInfo;
  readonly experience: readonly Experience[];
  readonly projects: readonly Project[];
  readonly skills: readonly SkillCategory[];
  readonly education: readonly Education[];
  readonly statistics: Statistics;
}

// ============================================
// STATISTICS TYPES
// ============================================
export interface Statistics {
  readonly yearsOfExperience: number;
  readonly projectsCompleted: number;
  readonly techStackSize: number;
  readonly companiesWorked: number;
  readonly certificationsEarned?: number;
  readonly openSourceContributions?: number;
  readonly articlesPublished?: number;
}

// ============================================
// CONFIG TYPES
// ============================================
export interface PortfolioConfig {
  readonly meta: MetaConfig;
  readonly features: FeatureFlags;
  readonly performance: PerformanceConfig;
  readonly analytics?: AnalyticsConfig;
}

export interface MetaConfig {
  readonly title: string;
  readonly description: string;
  readonly keywords: readonly string[];
  readonly author: string;
  readonly image?: string;
  readonly url?: string;
}

export interface FeatureFlags {
  readonly enableAnimations: boolean;
  readonly enableAnalytics: boolean;
  readonly enablePWA: boolean;
  readonly enableSEO: boolean;
  readonly enableAccessibility: boolean;
  readonly enableDarkMode: boolean;
}

export interface PerformanceConfig {
  readonly lazyLoadImages: boolean;
  readonly enablePrefetch: boolean;
  readonly chunkSize: number;
  readonly cacheStrategy: 'none' | 'memory' | 'disk' | 'aggressive';
}

export interface AnalyticsConfig {
  readonly provider: 'google' | 'mixpanel' | 'segment' | 'custom';
  readonly trackingId: string;
  readonly events: readonly string[];
}

// ============================================
// ERROR TYPES
// ============================================
export class PortfolioError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = 'PortfolioError';
  }
}

export type ErrorCode =
  | 'NETWORK_ERROR'
  | 'VALIDATION_ERROR'
  | 'NOT_FOUND'
  | 'UNAUTHORIZED'
  | 'UNKNOWN_ERROR';

// ============================================
// API RESPONSE TYPES
// ============================================
export interface ApiResponse<T> {
  readonly success: boolean;
  readonly data?: T;
  readonly error?: ApiError;
  readonly metadata?: ResponseMetadata;
}

export interface ApiError {
  readonly code: ErrorCode;
  readonly message: string;
  readonly details?: unknown;
}

export interface ResponseMetadata {
  readonly timestamp: number;
  readonly requestId: string;
  readonly duration: number;
}

// ============================================
// FORM TYPES
// ============================================
export interface ContactFormData {
  readonly name: string;
  readonly email: string;
  readonly subject?: string;
  readonly message: string;
  readonly captcha?: string;
}

export interface FormValidation<T> {
  readonly isValid: boolean;
  readonly errors: Partial<Record<keyof T, string>>;
}

// ============================================
// EVENT TYPES
// ============================================
export type PortfolioEvent =
  | { type: 'THEME_CHANGED'; payload: { theme: 'light' | 'dark' } }
  | { type: 'MODAL_OPENED'; payload: { modal: ModalType } }
  | { type: 'MODAL_CLOSED'; payload: { modal: ModalType } }
  | { type: 'NAVIGATION'; payload: { from: string; to: string } }
  | { type: 'FORM_SUBMITTED'; payload: { form: string; data: unknown } }
  | { type: 'ERROR_OCCURRED'; payload: { error: Error } };

// ============================================
// HIGHER ORDER COMPONENT TYPES
// ============================================
export type WithLoadingProps = {
  loading?: boolean;
  error?: Error | null;
};

export type WithAuthProps = {
  isAuthenticated: boolean;
  user?: unknown;
};

export type HOC<P = Record<string, never>> = (
  Component: ComponentType<P>
) => ComponentType<P & WithLoadingProps>;
