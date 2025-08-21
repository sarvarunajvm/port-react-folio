import type { AnimationConfig } from './types';

export const ANIMATION_CONFIG: AnimationConfig = {
  beanDropDuration: 1500,
  grindDuration: 1200,
  brewDuration: 1500,
  steamDuration: 1800,
  totalDuration: 6000,
};

export const COFFEE_BEANS_COUNT = 5;

export const CODE_SYMBOLS = ['{}', '<>', '()', '[]', ';', '//'] as const;

export const JAVA_KEYWORDS = ['class', 'public', 'void', 'static', 'final'] as const;

export const STEAM_PARTICLES_COUNT = 6;

export const PHASE_THRESHOLDS = {
  dropping: 0,
  grinding: 25,
  brewing: 50,
  steaming: 75,
  complete: 100,
} as const;

export const THEME_COLORS = {
  light: {
    bean: 'from-orange-700 to-orange-900',
    cup: 'from-orange-600 to-orange-700',
    steam: 'from-orange-400/20 to-orange-500/10',
    particle: 'text-orange-700',
  },
  dark: {
    bean: 'from-gray-600 to-gray-800',
    cup: 'from-gray-400 to-gray-300',
    steam: 'from-gray-300/20 to-gray-400/10',
    particle: 'text-gray-400',
  },
} as const;
