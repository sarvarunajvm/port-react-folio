import React, { useEffect, useState } from 'react';

import { motion } from 'framer-motion';
import { Card, Flex, Text, Heading, Avatar, IconButton, Badge, Box, Link, Grid, HoverCard, Tooltip } from '@radix-ui/themes';

import { personalInfo, statistics, uiContent } from '../../data';
import { AnimatedCounter } from './index';

interface HeroSectionProps {
  onProfileClick: () => void;
}
import TypewriterText from './TypewriterText';

const HeroSection: React.FC<HeroSectionProps> = ({ onProfileClick }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if dark mode is active
    const checkDarkMode = () => {
      setIsDark(document.documentElement.getAttribute('data-theme') === 'dark');
    };

    checkDarkMode();

    // Listen for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <Card
        size="4"
        variant="surface"
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--surface)',
          boxShadow: isDark
            ? 'inset 10px 10px 20px rgba(0, 0, 0, 0.35), inset -10px -10px 20px rgba(255, 255, 255, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.12)'
            : 'inset 10px 10px 20px rgba(139, 90, 43, 0.15), inset -10px -10px 20px rgba(244, 232, 225, 0.8), 0 0 0 1px rgba(184, 115, 51, 0.12)',
        }}
      >
        {/* Animated background gradient */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0,
            background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(147, 51, 234, 0.05) 0%, transparent 50%)',
            transition: 'opacity 0.5s',
          }}
          whileHover={{ opacity: 1 }}
        />

        <Box style={{ position: 'relative', zIndex: 10 }}>
          <Grid columns={{ initial: '1', md: '3' }} gap={{ initial: '4', md: '6', lg: '8' }} align="center">
            {/* Left Column - Photo */}
            <Flex direction="column" align="center" justify={{ initial: 'center', md: 'start' }}>
              <motion.div
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  transition: { type: 'spring', stiffness: 300, damping: 20 },
                }}
                whileTap={{ scale: 0.95 }}
                onClick={onProfileClick}
                style={{ cursor: 'pointer', position: 'relative', display: 'inline-block' }}
              >
                <Box style={{ position: 'relative' }}>
                  <Avatar
                    src={`${import.meta.env.BASE_URL}photo.png`}
                    fallback="📸"
                    size="9"
                    style={{
                      width: 'clamp(120px, 15vw, 240px)',
                      height: 'clamp(120px, 15vw, 240px)',
                      borderRadius: '16px',
                      transition: 'all 0.5s ease',
                      background: 'var(--surface)',
                      boxShadow: isDark
                        ? '6px 6px 12px rgba(0, 0, 0, 0.4), -6px -6px 12px rgba(255, 255, 255, 0.12)'
                        : '6px 6px 12px rgba(139, 90, 43, 0.12), -6px -6px 12px rgba(244, 232, 225, 0.7)',
                    }}
                  />
                  
                  {/* Animated gradient background */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(45deg, rgba(147, 51, 234, 0.2), rgba(219, 39, 119, 0.2), rgba(59, 130, 246, 0.2))',
                      opacity: 0.2,
                      borderRadius: '16px',
                      backgroundSize: '200% 200%',
                      transition: 'opacity 0.3s',
                    }}
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                    whileHover={{ opacity: 0.3 }}
                  />

                  {/* Subtle hover gradient overlay */}
                  <Box
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(0, 0, 0, 0.2), transparent)',
                      opacity: 0,
                      borderRadius: '16px',
                      zIndex: 20,
                      transition: 'opacity 0.3s',
                    }}
                  />
                </Box>

                {/* Unified Click Hint - Chevron Badge */}
                <Box style={{ position: 'absolute', top: '-4px', right: '-4px', zIndex: 30 }}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.3 }}
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 0.5,
                      }}
                    >
                      <IconButton
                        variant="solid"
                        size="2"
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          background: isDark
                            ? 'linear-gradient(135deg, #c0c0c0, #e5e5e5)'
                            : 'linear-gradient(135deg, #b87333, #cd7f32)',
                          boxShadow: isDark
                            ? '2px 2px 4px rgba(0, 0, 0, 0.5), -1px -1px 2px rgba(255, 255, 255, 0.1)'
                            : '2px 2px 4px rgba(139, 90, 43, 0.3), -1px -1px 2px rgba(255, 255, 255, 0.8)',
                          cursor: 'default',
                          pointerEvents: 'none',
                        }}
                      >
                        👉
                      </IconButton>
                      <motion.div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'var(--accent)',
                          borderRadius: '50%',
                          pointerEvents: 'none',
                        }}
                        animate={{
                          scale: [1, 1.5, 1.5],
                          opacity: [0.7, 0, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: 0.5,
                        }}
                      />
                    </motion.div>
                  </motion.div>
                </Box>

              </motion.div>

              {/* Desktop Hint - Below avatar */}
              <Box display={{ initial: 'none', md: 'block' }} mt="4">
                <Flex justify="center">
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.3 }}
                >
                  <Badge
                    variant="solid"
                    size="2"
                    style={{
                      background: isDark
                        ? 'linear-gradient(to right, #64748b, #71717a)'
                        : 'linear-gradient(to right, #ea580c, #c2410c)',
                      border: isDark
                        ? '2px solid rgba(148, 163, 184, 0.5)'
                        : '2px solid rgba(234, 88, 12, 0.5)',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    }}
                  >
                    <Flex align="center" gap="1" px="2" py="1">
                      <Text size="2">👆</Text>
                      <Text size="2" weight="bold" style={{ whiteSpace: 'nowrap' }}>
                        {uiContent.navigation.profileHint || 'Click to view profile'}
                      </Text>
                    </Flex>
                  </Badge>
                </motion.div>
                </Flex>
              </Box>

              {/* Mobile Hint - Below image */}
              <Box display={{ initial: 'block', md: 'none' }} mt="3">
                <Flex justify="center">
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.3 }}
                >
                  <Badge
                    variant="solid"
                    size="2"
                    style={{
                      background: isDark
                        ? 'linear-gradient(to right, #64748b, #71717a)'
                        : 'linear-gradient(to right, #ea580c, #c2410c)',
                       border: isDark
                        ? '2px solid rgba(148, 163, 184, 0.5)'
                        : '2px solid rgba(234, 88, 12, 0.5)',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    }}
                  >
                    <Flex align="center" gap="1" px="2" py="1">
                      <Text size="2">👆</Text>
                      <Text size="2" weight="bold" style={{ whiteSpace: 'nowrap' }}>
                        View my profile
                      </Text>
                    </Flex>
                  </Badge>
                </motion.div>
                </Flex>
              </Box>
            </Flex>

            {/* Middle Column - Name and Title */}
            <Flex direction="column" align={{ initial: 'center', md: 'start' }}>
              {/* Animated name with gradient */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Heading
                  size={{ initial: '7', sm: '8', md: '9' }}
                  weight="bold"
                  style={{
                    lineHeight: 'tight',
                    marginBottom: 'var(--space-3)',
                    color: 'var(--text-primary)',
                    textAlign: 'center',
                    fontWeight: '900',
                  }}
                  className="md:text-left"
                >
                  <Box display={{ initial: 'block', md: 'none' }}>
                    {personalInfo.firstname}
                    <br />
                    {personalInfo.lastname}
                  </Box>
                  <Box display={{ initial: 'none', md: 'inline' }}>
                    {personalInfo.firstname} {personalInfo.lastname}
                  </Box>
                </Heading>
              </motion.div>

              <Box style={{ height: 'clamp(32px, 5vw, 48px)', marginBottom: 'var(--space-3)' }}>
                <TypewriterText
                  texts={personalInfo.titles}
                  className="tomorrow-bold text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-transparent bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] bg-clip-text"
                  typingSpeed={100}
                  deletingSpeed={50}
                  pauseTime={2000}
                />
              </Box>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.3 }}
              >
                <Flex align="center" justify={{ initial: 'center', md: 'start' }} gap="3" mb="3">
                  <HoverCard.Root>
                    <HoverCard.Trigger>
                      <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.9 }}>
                        <Link href={personalInfo.social.github} target="_blank">
                          <Tooltip content="GitHub Profile">
                            <IconButton
                              variant="surface"
                              size="3"
                              style={{
                                background: 'var(--surface)',
                                boxShadow: isDark
                                  ? '4px 4px 8px rgba(0, 0, 0, 0.6), -4px -4px 8px rgba(192, 192, 192, 0.08)'
                                  : '4px 4px 8px rgba(139, 90, 43, 0.12), -4px -4px 8px rgba(244, 232, 225, 0.7)',
                                borderRadius: '12px',
                                transition: 'all 0.3s ease',
                              }}
                            >
                              <Text size="4" style={{ color: 'var(--icon-purple)' }}>🐙</Text>
                            </IconButton>
                          </Tooltip>
                        </Link>
                      </motion.div>
                    </HoverCard.Trigger>
                    <HoverCard.Content size="2">
                      <Flex gap="3">
                        <Avatar fallback="🐙" size="2" />
                        <Box>
                          <Heading size="3">GitHub</Heading>
                          <Text as="div" size="2" color="gray">
                            View my open source contributions
                          </Text>
                        </Box>
                      </Flex>
                    </HoverCard.Content>
                  </HoverCard.Root>
                  <HoverCard.Root>
                    <HoverCard.Trigger>
                      <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.9 }}>
                        <Link href={personalInfo.social.linkedin} target="_blank">
                          <Tooltip content="LinkedIn Profile">
                            <IconButton
                              variant="surface"
                              size="3"
                              style={{
                                background: 'var(--surface)',
                                boxShadow: isDark
                                  ? '4px 4px 8px rgba(0, 0, 0, 0.6), -4px -4px 8px rgba(192, 192, 192, 0.08)'
                                  : '4px 4px 8px rgba(139, 90, 43, 0.12), -4px -4px 8px rgba(244, 232, 225, 0.7)',
                                borderRadius: '12px',
                                transition: 'all 0.3s ease',
                              }}
                            >
                              <Text size="4" style={{ color: 'var(--icon-blue)' }}>💼</Text>
                            </IconButton>
                          </Tooltip>
                        </Link>
                      </motion.div>
                    </HoverCard.Trigger>
                    <HoverCard.Content size="2">
                      <Flex gap="3">
                        <Avatar fallback="💼" size="2" />
                        <Box>
                          <Heading size="3">LinkedIn</Heading>
                          <Text as="div" size="2" color="gray">
                            Connect with me professionally
                          </Text>
                        </Box>
                      </Flex>
                    </HoverCard.Content>
                  </HoverCard.Root>
                  
                  <HoverCard.Root>
                    <HoverCard.Trigger>
                      <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.9 }}>
                        <Link href={personalInfo.social.stackoverflow} target="_blank">
                          <Tooltip content="Stack Overflow">
                            <IconButton
                              variant="surface"
                              size="3"
                              style={{
                                background: 'var(--surface)',
                                boxShadow: isDark
                                  ? '4px 4px 8px rgba(0, 0, 0, 0.6), -4px -4px 8px rgba(192, 192, 192, 0.08)'
                                  : '4px 4px 8px rgba(139, 90, 43, 0.12), -4px -4px 8px rgba(244, 232, 225, 0.7)',
                                borderRadius: '12px',
                                transition: 'all 0.3s ease',
                              }}
                            >
                              <Text size="4" style={{ color: 'var(--icon-red)' }}>📚</Text>
                            </IconButton>
                          </Tooltip>
                        </Link>
                      </motion.div>
                    </HoverCard.Trigger>
                    <HoverCard.Content size="2">
                      <Flex gap="3">
                        <Avatar fallback="📚" size="2" />
                        <Box>
                          <Heading size="3">Stack Overflow</Heading>
                          <Text as="div" size="2" color="gray">
                            See my technical Q&A contributions
                          </Text>
                        </Box>
                      </Flex>
                    </HoverCard.Content>
                  </HoverCard.Root>
                  
                  <HoverCard.Root>
                    <HoverCard.Trigger>
                      <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.9 }}>
                        <Link href={personalInfo.social.devto} target="_blank">
                          <Tooltip content="DEV Community">
                            <IconButton
                              variant="surface"
                              size="3"
                              style={{
                                background: 'var(--surface)',
                                boxShadow: isDark
                                  ? '4px 4px 8px rgba(0, 0, 0, 0.6), -4px -4px 8px rgba(192, 192, 192, 0.08)'
                                  : '4px 4px 8px rgba(139, 90, 43, 0.12), -4px -4px 8px rgba(244, 232, 225, 0.7)',
                                borderRadius: '12px',
                                transition: 'all 0.3s ease',
                              }}
                            >
                              <Text size="4" style={{ color: 'var(--icon-red)' }}>≠</Text>
                            </IconButton>
                          </Tooltip>
                        </Link>
                      </motion.div>
                    </HoverCard.Trigger>
                    <HoverCard.Content size="2">
                      <Flex gap="3">
                        <Avatar fallback="≠" size="2" />
                        <Box>
                          <Heading size="3">DEV.to</Heading>
                          <Text as="div" size="2" color="gray">
                            Read my technical articles and tutorials
                          </Text>
                        </Box>
                      </Flex>
                    </HoverCard.Content>
                  </HoverCard.Root>
                </Flex>
              </motion.div>

              {/* Mobile Stats - Compact inline layout */}
              <Box display={{ initial: 'block', md: 'none' }} mt="3">
                <Flex gap="2" justify="center" align="center">
                <Flex align="center" gap="1">
                  <AnimatedCounter
                    end={statistics.yearsOfExperience}
                    suffix="+"
                    duration={2}
                    className="tomorrow-black text-[var(--icon-blue)]"
                  />
                  <Text size="1" color="gray">Years</Text>
                </Flex>
                <Text size="1" color="gray">•</Text>
                <Flex align="center" gap="1">
                  <AnimatedCounter
                    end={statistics.projectsCompleted}
                    suffix="+"
                    duration={2.5}
                    className="tomorrow-black text-[var(--icon-purple)]"
                  />
                  <Text size="1" color="gray">Projects</Text>
                </Flex>
                <Text size="1" color="gray">•</Text>
                <Flex align="center" gap="1">
                  <AnimatedCounter
                    end={statistics.techStackSize}
                    suffix="+"
                    duration={3}
                    className="tomorrow-black text-[var(--icon-green)]"
                  />
                  <Text size="1" color="gray">Tech</Text>
                </Flex>
                </Flex>
              </Box>
            </Flex>

            {/* Right Column - Stats (Desktop only) */}
            <Box display={{ initial: 'none', md: 'block' }}>
              <Flex direction="column" gap={{ initial: '3', lg: '4' }} align={{ initial: 'center', md: 'end' }} justify="center">
              <motion.div
                whileHover={{
                  scale: 1.05,
                }}
              >
                <Card
                  variant="surface"
                  size="2"
                  style={{
                    background: 'var(--surface)',
                    boxShadow: isDark
                      ? 'inset 3px 3px 6px rgba(0, 0, 0, 0.5), inset -3px -3px 6px rgba(192, 192, 192, 0.06)'
                      : 'inset 3px 3px 6px rgba(139, 90, 43, 0.1), inset -3px -3px 6px rgba(244, 232, 225, 0.6)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <Flex align="center" gap="2" px={{ initial: '3', lg: '4' }} py={{ initial: '2', lg: '3' }}>
                    <AnimatedCounter
                      end={statistics.yearsOfExperience}
                      suffix="+"
                      duration={2}
                      className="tomorrow-black text-2xl lg:text-3xl xl:text-4xl text-[var(--icon-blue)]"
                    />
                    <Flex direction="column">
                      <Text size={{ initial: '1', lg: '2' }} color="gray" weight="medium">
                        Years
                      </Text>
                      <Text size={{ initial: '1', lg: '2' }} color="gray" weight="medium">
                        Experience
                      </Text>
                    </Flex>
                  </Flex>
                </Card>
              </motion.div>

              <motion.div
                whileHover={{
                  scale: 1.05,
                }}
              >
                <Card
                  variant="surface"
                  size="2"
                  style={{
                    background: 'var(--surface)',
                    boxShadow: isDark
                      ? 'inset 3px 3px 6px rgba(0, 0, 0, 0.5), inset -3px -3px 6px rgba(192, 192, 192, 0.06)'
                      : 'inset 3px 3px 6px rgba(139, 90, 43, 0.1), inset -3px -3px 6px rgba(244, 232, 225, 0.6)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <Flex align="center" gap="2" px={{ initial: '3', lg: '4' }} py={{ initial: '2', lg: '3' }}>
                    <AnimatedCounter
                      end={statistics.projectsCompleted}
                      suffix="+"
                      duration={2.5}
                      className="tomorrow-black text-2xl lg:text-3xl xl:text-4xl text-[var(--icon-purple)]"
                    />
                    <Flex direction="column">
                      <Text size={{ initial: '1', lg: '2' }} color="gray" weight="medium">
                        Completed
                      </Text>
                      <Text size={{ initial: '1', lg: '2' }} color="gray" weight="medium">
                        Projects
                      </Text>
                    </Flex>
                  </Flex>
                </Card>
              </motion.div>

              <motion.div
                whileHover={{
                  scale: 1.05,
                }}
              >
                <Card
                  variant="surface"
                  size="2"
                  style={{
                    background: 'var(--surface)',
                    boxShadow: isDark
                      ? 'inset 3px 3px 6px rgba(0, 0, 0, 0.5), inset -3px -3px 6px rgba(192, 192, 192, 0.06)'
                      : 'inset 3px 3px 6px rgba(139, 90, 43, 0.1), inset -3px -3px 6px rgba(244, 232, 225, 0.6)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <Flex align="center" gap="2" px={{ initial: '3', lg: '4' }} py={{ initial: '2', lg: '3' }}>
                    <AnimatedCounter
                      end={statistics.techStackSize}
                      suffix="+"
                      duration={3}
                      className="tomorrow-black text-2xl lg:text-3xl xl:text-4xl text-[var(--icon-green)]"
                    />
                    <Flex direction="column">
                      <Text size={{ initial: '1', lg: '2' }} color="gray" weight="medium">
                        Tech
                      </Text>
                      <Text size={{ initial: '1', lg: '2' }} color="gray" weight="medium">
                        Stack
                      </Text>
                    </Flex>
                  </Flex>
                </Card>
              </motion.div>
              </Flex>
            </Box>
          </Grid>
        </Box>
      </Card>
    </motion.div>
  );
};

export default HeroSection;
