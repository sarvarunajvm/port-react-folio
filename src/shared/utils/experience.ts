/**
 * Calculates years of experience from career start date
 * Career started: June 2016
 */
export const calculateYearsOfExperience = (): number => {
  const CAREER_START_DATE = new Date('2016-06-01');
  const currentDate = new Date();

  const yearsDiff = currentDate.getFullYear() - CAREER_START_DATE.getFullYear();
  const monthsDiff = currentDate.getMonth() - CAREER_START_DATE.getMonth();

  // If we haven't reached June yet in the current year, subtract 1
  return monthsDiff < 0 ? yearsDiff - 1 : yearsDiff;
};

/**
 * Formats years of experience for display
 * @param years - Number of years
 * @returns Formatted string (e.g., "8+")
 */
export const formatYearsOfExperience = (years?: number): string => {
  const yearsCount = years ?? calculateYearsOfExperience();
  return `${yearsCount}+`;
};
