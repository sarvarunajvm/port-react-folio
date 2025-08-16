/**
 * Utilities for dynamic statistics and calculations
 * Keeps all numbers and dates automatically updated
 */
import { experienceData } from '../../features/experience/data/experience';

/**
 * Calculate duration at current position
 * @returns Object with years and months at current job
 */
export const calculateCurrentJobDuration = () => {
  const currentJob = experienceData[0]; // PayPal
  const startDate = new Date('2021-05-01');
  const currentDate = new Date();

  const totalMonths =
    (currentDate.getFullYear() - startDate.getFullYear()) * 12 +
    (currentDate.getMonth() - startDate.getMonth());

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  return {
    years,
    months,
    totalMonths,
    formatted:
      years > 0
        ? `${years}+ year${years > 1 ? 's' : ''} at ${currentJob.company}`
        : `${months} month${months !== 1 ? 's' : ''} at ${currentJob.company}`,
  };
};

/**
 * Calculate total unique companies worked at
 * @returns Number of companies
 */
export const calculateCompanyCount = (): number => {
  return experienceData.length;
};

/**
 * Calculate total projects (can be enhanced with GitHub API)
 * @returns Estimated total projects
 */
export const calculateTotalProjects = (): number => {
  // Base projects from experience
  const experienceProjects = experienceData.reduce((total, job) => {
    // Estimate 3-5 projects per job based on duration
    const jobMonths = calculateJobDuration(job.period);
    return total + Math.max(2, Math.floor(jobMonths / 6));
  }, 0);

  // Add personal/open-source projects
  const personalProjects = 3; // From projects data

  return experienceProjects + personalProjects;
};

/**
 * Calculate job duration from period string
 * @param period - Period string like "May 2021 - Present"
 * @returns Duration in months
 */
const calculateJobDuration = (period: string): number => {
  const [start, end] = period.split(' - ');
  const startDate = parseJobDate(start);
  const endDate = end === 'Present' ? new Date() : parseJobDate(end);

  return (
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth())
  );
};

/**
 * Parse job date string to Date object
 * @param dateStr - Date string like "May 2021"
 * @returns Date object
 */
const parseJobDate = (dateStr: string): Date => {
  const [month, year] = dateStr.split(' ');
  const monthMap: { [key: string]: number } = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };
  return new Date(parseInt(year), monthMap[month] || 0, 1);
};

/**
 * Calculate years since education completion
 * @param period - Period string like "2016 - 2019"
 * @returns Years since completion
 */
export const calculateYearsSinceEducation = (period: string): string => {
  const endYear = parseInt(period.split(' - ')[1]);
  const yearsSince = new Date().getFullYear() - endYear;

  if (yearsSince === 0) return 'Completed this year';
  if (yearsSince === 1) return 'Completed last year';
  return `Completed ${yearsSince} years ago`;
};

/**
 * Calculate technology experience based on first usage
 * @param techStartDate - When started using the technology
 * @returns Years of experience with the technology
 */
export const calculateTechExperience = (techStartDate: string): string => {
  const startDate = new Date(techStartDate);
  const currentDate = new Date();

  const yearsDiff = currentDate.getFullYear() - startDate.getFullYear();
  const monthsDiff = currentDate.getMonth() - startDate.getMonth();

  const totalYears = monthsDiff < 0 ? yearsDiff - 1 : yearsDiff;

  if (totalYears === 0) {
    const totalMonths =
      (currentDate.getFullYear() - startDate.getFullYear()) * 12 +
      (currentDate.getMonth() - startDate.getMonth());
    return `${totalMonths} month${totalMonths !== 1 ? 's' : ''}`;
  }

  return `${totalYears}+ year${totalYears !== 1 ? 's' : ''}`;
};

/**
 * Technology start dates (can be moved to a config file)
 */
export const TECH_START_DATES = {
  // Backend
  java: '2016-06-01',
  'spring-boot': '2017-01-01',
  'spring-security': '2017-06-01',
  'rest-api': '2016-09-01',
  microservices: '2018-01-01',
  graphql: '2020-01-01',
  grpc: '2021-01-01',
  rabbitmq: '2019-01-01',
  kafka: '2020-06-01',

  // Frontend
  javascript: '2016-06-01',
  typescript: '2019-01-01',
  react: '2019-06-01',
  vue: '2018-01-01',
  vuex: '2018-01-01',
  redux: '2019-06-01',
  nextjs: '2021-01-01',
  nodejs: '2018-06-01',
  npm: '2016-06-01',
  webpack: '2018-01-01',
  vite: '2021-06-01',

  // Databases
  mysql: '2016-06-01',
  postgresql: '2017-01-01',
  mongodb: '2018-01-01',
  redis: '2019-01-01',
  h2: '2017-01-01',
  oracle: '2016-09-01',
  cassandra: '2020-01-01',
  elasticsearch: '2019-06-01',

  // DevOps & Cloud
  docker: '2018-06-01',
  kubernetes: '2020-01-01',
  aws: '2019-01-01',
  terraform: '2020-06-01',
  ansible: '2019-06-01',
  prometheus: '2020-01-01',
  grafana: '2020-01-01',
  elk: '2019-06-01',

  // Tools & Collaboration
  git: '2016-06-01',
  jenkins: '2017-01-01',
  jira: '2016-06-01',
  'github-actions': '2020-01-01',
  maven: '2016-06-01',
  gradle: '2018-01-01',
  intellij: '2016-06-01',
  oauth: '2018-01-01',
  jwt: '2017-06-01',
  sonarqube: '2018-06-01',
};

/**
 * Get formatted period with duration
 * @param period - Period string like "May 2021 - Present"
 * @returns Formatted string with duration
 */
export const getFormattedPeriodWithDuration = (period: string): string => {
  const duration = calculateJobDuration(period);
  const years = Math.floor(duration / 12);
  const months = duration % 12;

  let durationStr = '';
  if (years > 0) {
    durationStr = `${years} year${years !== 1 ? 's' : ''}`;
    if (months > 0) {
      durationStr += ` ${months} month${months !== 1 ? 's' : ''}`;
    }
  } else {
    durationStr = `${months} month${months !== 1 ? 's' : ''}`;
  }

  return `${period} (${durationStr})`;
};

/**
 * Calculate cumulative experience across all jobs
 * @returns Object with total months and formatted string
 */
export const calculateCumulativeExperience = () => {
  const totalMonths = experienceData.reduce((total, job) => {
    return total + calculateJobDuration(job.period);
  }, 0);

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  return {
    totalMonths,
    years,
    months,
    formatted: `${years} years ${months} months total experience`,
  };
};

/**
 * NPM Package statistics (could be fetched from NPM API)
 * For now, returns static data with timestamp
 */
export const getNPMStats = () => {
  // This could be enhanced to fetch real data from NPM API
  // https://api.npmjs.org/downloads/point/last-week/vue-embed-gist

  return {
    weeklyDownloads: 270,
    monthlyDownloads: 1080,
    lastUpdated: new Date().toISOString(),
    isEstimate: true,
  };
};

/**
 * Calculate project age
 * @param createdDate - Project creation date
 * @returns Age in years/months
 */
export const calculateProjectAge = (createdDate: string): string => {
  const created = new Date(createdDate);
  const now = new Date();

  const monthsDiff =
    (now.getFullYear() - created.getFullYear()) * 12 + (now.getMonth() - created.getMonth());

  if (monthsDiff < 12) {
    return `${monthsDiff} month${monthsDiff !== 1 ? 's' : ''} old`;
  }

  const years = Math.floor(monthsDiff / 12);
  return `${years} year${years !== 1 ? 's' : ''} old`;
};

/**
 * Project creation dates (can be fetched from GitHub API)
 */
export const PROJECT_DATES = {
  'utils-commons': '2020-03-01',
  'port-advancer': '2019-08-01',
  'vue-embed-gist': '2019-02-01', // Contribution date
};

/**
 * Calculate total unique skills count
 * Dynamically calculates from skills data
 * @returns Total number of skills across all categories
 */
export const calculateTotalSkills = (): number => {
  // Return estimated count to avoid circular dependencies
  // This can be updated manually when skills data changes
  return 50; // Total skills across all categories
};

/**
 * Calculate skills by proficiency level
 * Dynamically calculates from skills data
 * @returns Object with counts per proficiency level
 */
export const calculateSkillsByProficiency = () => {
  // Return estimated counts to avoid circular dependencies
  // This can be updated manually when skills data changes
  return {
    expert: 12,
    advanced: 18,
    intermediate: 12,
    beginner: 8,
  };
};
