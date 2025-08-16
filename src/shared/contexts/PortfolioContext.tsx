/**
 * Portfolio Context Provider
 * Centralized portfolio data management with performance optimizations
 */
import React, { ReactNode, createContext, useContext, useMemo } from 'react';

import { portfolioData } from '../../data/portfolio.data';
import type {
  Education,
  Experience,
  PersonalInfo,
  PortfolioContextValue,
  Project,
  SkillCategory,
  Statistics,
} from '../types/portfolio.types';

const PortfolioContext = createContext<PortfolioContextValue | undefined>(undefined);

interface PortfolioProviderProps {
  children: ReactNode;
  overrides?: Partial<PortfolioContextValue>;
}

export const PortfolioProvider: React.FC<PortfolioProviderProps> = ({ children, overrides }) => {
  const value = useMemo<PortfolioContextValue>(
    () => ({
      personal: (overrides?.personal || portfolioData.personal) as PersonalInfo,
      experience: (overrides?.experience || portfolioData.experience) as readonly Experience[],
      projects: (overrides?.projects || portfolioData.projects) as readonly Project[],
      skills: (overrides?.skills || portfolioData.skills) as readonly SkillCategory[],
      education: (overrides?.education || portfolioData.education) as readonly Education[],
      statistics: (overrides?.statistics || portfolioData.stats) as Statistics,
    }),
    [overrides]
  );

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
};

// Custom hook to use portfolio context
export const usePortfolio = () => {
  const context = useContext(PortfolioContext);

  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }

  return context;
};

// Selective hooks for specific data
export const usePersonalInfo = () => {
  const { personal } = usePortfolio();
  return personal;
};

export const useExperience = () => {
  const { experience } = usePortfolio();
  return experience;
};

export const useProjects = () => {
  const { projects } = usePortfolio();
  return projects;
};

export const useSkills = () => {
  const { skills } = usePortfolio();
  return skills;
};

export const useEducation = () => {
  const { education } = usePortfolio();
  return education;
};

export const useStatistics = () => {
  const { statistics } = usePortfolio();
  return statistics;
};

// Utility functions for portfolio data
export const portfolioUtils = {
  getTotalExperience: (experiences: readonly Experience[]): number => {
    return experiences.reduce((total, exp) => {
      const years = parseInt(exp.period.match(/\d+/)?.[0] || '0');
      return total + years;
    }, 0);
  },

  getLatestExperience: (experiences: readonly Experience[]): Experience | null => {
    return experiences.find((exp) => exp.current) || experiences[0] || null;
  },

  getProjectsByStatus: (projects: readonly Project[], status: string) => {
    return projects.filter((project) => project.status === status);
  },

  getSkillsByProficiency: (skills: readonly SkillCategory[], proficiency: string) => {
    return skills.flatMap((category) =>
      category.skills.filter((skill) => skill.proficiency === proficiency)
    );
  },

  calculateSkillExperience: (_skillId: string, startDate: string): number => {
    const start = new Date(startDate);
    const now = new Date();
    const years = (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365);
    return Math.round(years * 10) / 10;
  },
};
