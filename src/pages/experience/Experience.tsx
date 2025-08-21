import React, { useEffect, useState } from 'react';

import { motion } from 'framer-motion';
import {
  Container,
  Card,
  Flex,
  Grid,
  Text,
  Heading,
  Badge,
  Avatar,
  Separator,
  Box
} from '@radix-ui/themes';

import { emojiMappings, experienceData, uiContent } from '../../data';
import { AnimatedCounter } from '../../shared/components';
import { calculateYearsOfExperience } from '../../shared/utils/experience';
import { calculateCompanyCount, calculateCurrentJobDuration } from '../../shared/utils/statistics';

const getEmoji = (iconName?: string) => {
  return (
    emojiMappings.icons[iconName as keyof typeof emojiMappings.icons] ||
    emojiMappings.icons.Briefcase
  );
};

const Experience: React.FC = () => {
  const [, setIsDark] = useState(false);
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
    <Container size="4" style={{ height: '100%', overflow: 'auto' }}>
      <Flex
        direction="column"
        align="center"
        justify="center"
        style={{ minHeight: '100%', padding: 'var(--space-4)' }}
      >
        <Box style={{ width: '100%', maxWidth: '1200px' }}>
          <Grid columns={{ initial: '1', lg: '2' }} gap="6">
            {/* Summary Stats Card */}
            <Card size="3" variant="surface">
              <Flex align="center" justify="center" gap="4">
                <Flex direction="column" align="center">
                  <AnimatedCounter
                    end={totalYears}
                    suffix="+"
                    duration={2}
                    className="tomorrow-bold text-4xl md:text-5xl"
                    style={{ color: 'var(--accent-9)' }}
                  />
                  <Text size="3" weight="medium" color="gray">
                    {uiContent.experience.yearsLabel}
                  </Text>
                </Flex>
                
                <Separator orientation="vertical" size="2" />
                
                <Flex direction="column" align="center">
                  <AnimatedCounter
                    end={companyCount}
                    duration={2.5}
                    className="tomorrow-bold text-4xl md:text-5xl"
                    style={{ color: 'var(--accent-9)' }}
                  />
                  <Text size="3" weight="medium" color="gray">
                    {uiContent.experience.companiesLabel}
                  </Text>
                </Flex>
                
                <Separator orientation="vertical" size="2" />
                
                <Flex direction="column" align="center">
                  <AnimatedCounter
                    end={15}
                    suffix="+"
                    duration={3}
                    className="tomorrow-bold text-4xl md:text-5xl"
                    style={{ color: 'var(--accent-9)' }}
                  />
                  <Text size="3" weight="medium" color="gray">
                    {uiContent.experience.projectsLabel}
                  </Text>
                </Flex>
              </Flex>
            </Card>

            {/* Current Role Card */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card size="4" variant="surface" style={{ height: '100%' }}>
                <Flex gap="4" mb="4">
                  <Avatar
                    fallback="💳"
                    size="6"
                    style={{ fontSize: '2rem' }}
                  />
                  <Flex direction="column" flexGrow="1">
                    <Heading size="6" weight="bold" color="orange">
                      {currentJob.designation}
                    </Heading>
                    <Text size="4" weight="medium" color="gray">
                      {currentJob.company}
                    </Text>
                    <Flex align="center" gap="2" mt="2">
                      <Text size="2">📅</Text>
                      <Text size="2" weight="medium" color="gray">
                        {currentJob.period}
                      </Text>
                      <Badge 
                        color="green" 
                        variant="soft"
                        title={currentJobDuration.formatted}
                      >
                        {uiContent.experience.current} • {currentJobDuration.years}+ years
                      </Badge>
                    </Flex>
                  </Flex>
                </Flex>

                <Flex direction="column" gap="3" mb="4">
                  <Heading size="4" weight="bold" color="orange">
                    <Flex align="center" gap="2">
                      <Text>🎯</Text>
                      {uiContent.experience.keyAchievements}
                    </Flex>
                  </Heading>
                  
                  <Flex direction="column" gap="2">
                    {currentJob.achievements.slice(0, 6).map((achievement, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.05 }}
                      >
                        <Card variant="surface" size="1">
                          <Flex align="start" gap="3" p="2">
                            <Text color="green" size="3">✓</Text>
                            <Text size="2" style={{ lineHeight: '1.5' }}>
                              {achievement}
                            </Text>
                          </Flex>
                        </Card>
                      </motion.div>
                    ))}
                  </Flex>
                </Flex>

                <Grid columns="3" gap="2">
                  {currentJob.impact?.slice(0, 3).map((metric) => (
                    <Card key={metric.metric} variant="surface" size="2">
                      <Flex direction="column" align="center" gap="1">
                        <Flex align="center" gap="1">
                          {metric.type === 'increase' && <Text size="4">📈</Text>}
                          {metric.type === 'reduction' && <Text size="4">📉</Text>}
                          {metric.type === 'neutral' && <Text size="4">📊</Text>}
                          <Text size="5" weight="bold">{metric.value}</Text>
                        </Flex>
                        <Text size="1" color="gray" align="center">
                          {metric.metric}
                        </Text>
                      </Flex>
                    </Card>
                  ))}
                </Grid>
              </Card>
            </motion.div>

            {/* Previous Roles Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card size="4" variant="surface" style={{ height: '100%' }}>
                <Heading size="4" weight="bold" mb="4" style={{ 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.1em' 
                }}>
                  {uiContent.experience.previousRoles}
                </Heading>
                
                <Flex direction="column" gap="4" style={{ overflow: 'auto' }}>
                  {experienceData.slice(1).map((exp, index) => {
                    const emoji = getEmoji(exp.icon);

                    return (
                      <motion.div
                        key={exp.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      >
                        <Card variant="surface" size="2">
                          <Flex gap="3" align="start">
                            <Avatar
                              fallback={emoji}
                              size="4"
                              style={{ fontSize: '1.5rem' }}
                            />
                            
                            <Flex direction="column" flexGrow="1" gap="2">
                              <Flex direction="column">
                                <Heading size="4" weight="bold">
                                  {exp.designation}
                                </Heading>
                                <Text size="3" weight="medium" color="gray">
                                  {exp.company}
                                </Text>
                                <Text size="2" color="gray">
                                  {exp.period}
                                </Text>
                                <Text size="2" color="orange" weight="medium">
                                  {calculateDuration(exp.period)}
                                </Text>
                              </Flex>
                              
                              <Flex direction="column" gap="1">
                                {exp.achievements.slice(0, 2).map((achievement, i) => (
                                  <Flex key={i} align="start" gap="2">
                                    <Text color="green" size="2">•</Text>
                                    <Text size="2" style={{ lineHeight: '1.4' }}>
                                      {achievement}
                                    </Text>
                                  </Flex>
                                ))}
                              </Flex>
                            </Flex>
                          </Flex>
                        </Card>
                      </motion.div>
                    );
                  })}
                </Flex>
              </Card>
            </motion.div>
          </Grid>
        </Box>
      </Flex>
    </Container>
  );
};

export default Experience;
