import React, { useEffect, useState } from 'react';

import { motion } from 'framer-motion';

import { emojiMappings, experienceData, uiContent } from '../../../data';
import { calculateYearsOfExperience } from '../../../shared/utils/experience';
import {
  calculateCompanyCount,
  calculateCurrentJobDuration,
} from '../../../shared/utils/statistics';

const getEmoji = (iconName?: string) => {
  return (
    emojiMappings.icons[iconName as keyof typeof emojiMappings.icons] ||
    emojiMappings.icons.Briefcase
  );
};

const Experience: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const currentJob = experienceData[0]; // PayPal - current position
  const totalYears = calculateYearsOfExperience();
  const companyCount = calculateCompanyCount();
  const currentJobDuration = calculateCurrentJobDuration();

  // Helper function to calculate duration with years and months
  const calculateDuration = (period: string) => {
    const [start, end] = period.split(' - ');
    const parseDate = (dateStr: string) => {
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

    const startDate = parseDate(start);
    const endDate = end === 'Present' ? new Date() : parseDate(end);

    const totalMonths =
      (endDate.getFullYear() - startDate.getFullYear()) * 12 +
      (endDate.getMonth() - startDate.getMonth());

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    if (years > 0 && months > 0) {
      return `${years} year${years !== 1 ? 's' : ''} ${months} month${months !== 1 ? 's' : ''}`;
    } else if (years > 0) {
      return `${years} year${years !== 1 ? 's' : ''}`;
    } else {
      return `${months} month${months !== 1 ? 's' : ''}`;
    }
  };

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.getAttribute('data-theme') === 'dark');
    };
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full h-full flex items-start md:items-center justify-center p-4 md:p-8 lg:p-12 overflow-y-auto lg:overflow-y-visible">
      <div className="w-full max-w-[1200px] h-auto lg:h-auto my-auto md:my-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
          {/* Left Column - Summary Stats and Current Role */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {/* Summary Header */}
            <div
              className="rounded-xl p-4 text-center transition-all duration-500"
              style={{
                background: 'var(--surface)',
                boxShadow: isDark
                  ? 'inset 6px 6px 12px rgba(0, 0, 0, 0.65), inset -6px -6px 12px rgba(192, 192, 192, 0.08), 0 0 0 1px rgba(192, 192, 192, 0.08)'
                  : 'inset 6px 6px 12px rgba(139, 90, 43, 0.12), inset -6px -6px 12px rgba(244, 232, 225, 0.75), 0 0 0 1px rgba(184, 115, 51, 0.1)',
              }}
            >
              <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4">
                <div>
                  <p className="text-4xl md:text-5xl font-bold" style={{ color: 'var(--accent)' }}>
                    {totalYears}+
                  </p>
                  <p className="text-lg font-medium text-muted">
                    {uiContent.experience.yearsLabel}
                  </p>
                </div>
                <div className="w-px h-10 sm:h-12 md:h-14 bg-gray-300 dark:bg-gray-700"></div>
                <div>
                  <p className="text-4xl md:text-5xl font-bold" style={{ color: 'var(--accent)' }}>
                    {companyCount}
                  </p>
                  <p className="text-lg font-medium text-muted">
                    {uiContent.experience.companiesLabel}
                  </p>
                </div>
                <div className="w-px h-10 sm:h-12 md:h-14 bg-gray-300 dark:bg-gray-700"></div>
                <div>
                  <p className="text-4xl md:text-5xl font-bold" style={{ color: 'var(--accent)' }}>
                    15+
                  </p>
                  <p className="text-lg font-medium text-muted">
                    {uiContent.experience.projectsLabel}
                  </p>
                </div>
              </div>
            </div>

            {/* Current Role and Achievements */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl p-4 lg:p-5 flex-1 transition-all duration-500"
              style={{
                background: 'var(--surface)',
                boxShadow: isDark
                  ? 'inset 8px 8px 16px rgba(0, 0, 0, 0.7), inset -8px -8px 16px rgba(192, 192, 192, 0.1), 0 0 0 1px rgba(192, 192, 192, 0.08)'
                  : 'inset 8px 8px 16px rgba(139, 90, 43, 0.15), inset -8px -8px 16px rgba(244, 232, 225, 0.8), 0 0 0 1px rgba(184, 115, 51, 0.12)',
              }}
            >
              {/* Current Role Header */}
              <div className="flex items-start justify-between mb-3 lg:mb-4">
                <div className="flex items-start gap-3">
                  <div
                    className="p-2 lg:p-3 rounded-xl"
                    style={{
                      background: isDark
                        ? 'linear-gradient(135deg, rgba(192, 192, 192, 0.15), rgba(192, 192, 192, 0.08))'
                        : 'linear-gradient(135deg, rgba(184, 115, 51, 0.15), rgba(184, 115, 51, 0.08))',
                      boxShadow: isDark
                        ? '3px 3px 6px rgba(0, 0, 0, 0.5), -3px -3px 6px rgba(192, 192, 192, 0.06)'
                        : '3px 3px 6px rgba(139, 90, 43, 0.1), -3px -3px 6px rgba(244, 232, 225, 0.6)',
                    }}
                  >
                    <span className="text-4xl lg:text-5xl">💳</span>
                  </div>
                  <div>
                    <h3
                      className="text-3xl lg:text-4xl font-bold"
                      style={{ color: 'var(--accent)' }}
                    >
                      {currentJob.designation}
                    </h3>
                    <p className="text-xl lg:text-2xl font-medium text-secondary">
                      {currentJob.company}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-base">📅</span>
                      <span className="text-base font-medium text-muted">{currentJob.period}</span>
                      <span
                        className="ml-2 px-3 py-1 text-sm font-semibold rounded-full"
                        style={{
                          color: 'var(--icon-green)',
                          background: 'var(--surface)',
                          boxShadow: isDark
                            ? 'inset 2px 2px 4px rgba(0, 0, 0, 0.5), inset -2px -2px 4px rgba(192, 192, 192, 0.06)'
                            : 'inset 2px 2px 4px rgba(139, 90, 43, 0.08), inset -2px -2px 4px rgba(244, 232, 225, 0.5)',
                        }}
                        title={currentJobDuration.formatted}
                      >
                        {uiContent.experience.current} • {currentJobDuration.years}+ years
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Achievements Section */}
              <div className="mb-4">
                <h4 className="text-xl lg:text-2xl font-bold mb-3 flex items-center gap-2">
                  <span className="text-2xl">🎯</span>
                  <span style={{ color: 'var(--accent)' }}>
                    {uiContent.experience.keyAchievements}
                  </span>
                </h4>
                <div className="space-y-2">
                  {currentJob.achievements.slice(0, 6).map((achievement, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                      className="flex items-start gap-3 p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300"
                      style={{
                        background: 'var(--surface)',
                        boxShadow: isDark
                          ? 'inset 2px 2px 4px rgba(0, 0, 0, 0.3), inset -2px -2px 4px rgba(192, 192, 192, 0.04)'
                          : 'inset 2px 2px 4px rgba(139, 90, 43, 0.06), inset -2px -2px 4px rgba(244, 232, 225, 0.3)',
                      }}
                    >
                      <span className="text-lg mt-0.5" style={{ color: 'var(--icon-green)' }}>
                        ✓
                      </span>
                      <span className="text-base lg:text-lg leading-relaxed">{achievement}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Impact Metrics */}
              <div className="grid grid-cols-3 gap-2">
                {currentJob.impact?.slice(0, 3).map((metric) => (
                  <div
                    key={metric.metric}
                    className="p-3 rounded-lg text-center transition-all duration-300"
                    style={{
                      background: 'var(--surface)',
                      boxShadow: isDark
                        ? 'inset 3px 3px 6px rgba(0, 0, 0, 0.5), inset -3px -3px 6px rgba(192, 192, 192, 0.06)'
                        : 'inset 3px 3px 6px rgba(139, 90, 43, 0.1), inset -3px -3px 6px rgba(244, 232, 225, 0.6)',
                    }}
                  >
                    <div className="flex items-center justify-center gap-1 mb-1">
                      {metric.type === 'increase' && <span className="text-2xl">📈</span>}
                      {metric.type === 'reduction' && <span className="text-2xl">📉</span>}
                      {metric.type === 'neutral' && <span className="text-2xl">📊</span>}
                      <span className="font-bold text-2xl">{metric.value}</span>
                    </div>
                    <p className="text-base font-medium text-muted">{metric.metric}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Previous Experience Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-6"
          >
            {/* Previous Roles Timeline */}
            <div
              className="rounded-xl p-3 md:p-4 h-full flex flex-col transition-all duration-500"
              style={{
                background: 'var(--surface)',
                boxShadow: isDark
                  ? 'inset 6px 6px 12px rgba(0, 0, 0, 0.65), inset -6px -6px 12px rgba(192, 192, 192, 0.08), 0 0 0 1px rgba(192, 192, 192, 0.08)'
                  : 'inset 6px 6px 12px rgba(139, 90, 43, 0.12), inset -6px -6px 12px rgba(244, 232, 225, 0.75), 0 0 0 1px rgba(184, 115, 51, 0.1)',
              }}
            >
              <h4 className="text-2xl font-semibold mb-4 uppercase tracking-wider text-muted">
                {uiContent.experience.previousRoles}
              </h4>
              <div className="space-y-3 lg:space-y-3 overflow-y-auto lg:overflow-y-visible flex-1">
                {experienceData.slice(1).map((exp, index) => {
                  const emoji = getEmoji(exp.icon);

                  return (
                    <motion.div
                      key={exp.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="relative pl-8 md:pl-10 lg:pl-12 border-l-2 border-gray-300 dark:border-gray-700"
                    >
                      {/* Timeline Dot */}
                      <div
                        className="absolute -left-2 md:-left-2.5 top-2 w-4 md:w-5 h-4 md:h-5 rounded-full"
                        style={{
                          background: isDark
                            ? 'linear-gradient(135deg, #c0c0c0, #e5e5e5)'
                            : 'linear-gradient(135deg, #b87333, #cd7f32)',
                          boxShadow: isDark
                            ? '2px 2px 4px rgba(0, 0, 0, 0.5), -1px -1px 2px rgba(255, 255, 255, 0.1)'
                            : '2px 2px 4px rgba(139, 90, 43, 0.3), -1px -1px 2px rgba(255, 255, 255, 0.8)',
                        }}
                      ></div>

                      {/* Role Info */}
                      <div className="mb-2 md:mb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-2 md:gap-3">
                            <span className="text-3xl lg:text-4xl">{emoji}</span>
                            <div>
                              <h3 className="font-semibold text-xl lg:text-2xl">
                                {exp.designation}
                              </h3>
                              <p className="text-lg lg:text-xl font-medium text-secondary">
                                {exp.company}
                              </p>
                              <div className="flex flex-col gap-0.5">
                                <p className="text-base lg:text-lg font-medium text-muted">
                                  {exp.period}
                                </p>
                                <p
                                  className="text-sm lg:text-base font-medium"
                                  style={{ color: 'var(--accent)' }}
                                >
                                  {calculateDuration(exp.period)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Key Achievements */}
                      <div className="space-y-1 mb-2">
                        {exp.achievements.slice(0, 2).map((achievement, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="text-lg mt-0.5" style={{ color: 'var(--icon-green)' }}>
                              •
                            </span>
                            <span className="text-base lg:text-lg leading-relaxed">
                              {achievement}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
