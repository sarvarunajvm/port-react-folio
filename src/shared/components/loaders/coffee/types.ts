export interface CoffeeLoaderProps {
  progress: number;
  isDark: boolean;
}

export interface CoffeeBeanProps {
  id: string;
  delay: number;
  isDark: boolean;
  onAnimationComplete?: () => void;
}

export interface SteamParticleProps {
  id: string;
  delay: number;
  isDark: boolean;
}

export interface CoffeeCupProps {
  progress: number;
  isDark: boolean;
  isGrinding: boolean;
  isBrewing: boolean;
}

export type LoadingPhase = 'dropping' | 'grinding' | 'brewing' | 'steaming' | 'complete';

export interface AnimationConfig {
  beanDropDuration: number;
  grindDuration: number;
  brewDuration: number;
  steamDuration: number;
  totalDuration: number;
}
