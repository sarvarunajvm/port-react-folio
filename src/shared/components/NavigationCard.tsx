import { memo, useEffect, useState } from 'react';

import { motion } from 'framer-motion';
import { Card, Text, Flex, Avatar, Button, Box, Heading, IconButton } from '@radix-ui/themes';

import { ANIMATION_DURATION, cardVariants } from '../constants/animations';

interface NavigationCardProps {
  emoji: string;
  title: string;
  subtitle: string;
  color: 'blue' | 'purple' | 'green' | 'red';
  hintText?: string;
  onClick: () => void;
  delay?: number;
}

const NavigationCard = memo<NavigationCardProps>(
  ({ emoji, title, subtitle, color, hintText, onClick, delay = 0 }) => {
    const [isDark, setIsDark] = useState(false);

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
      <Box style={{ position: 'relative' }}>
        <motion.div
          variants={cardVariants}
          whileHover={{
            scale: 1.05,
            y: -8,
          }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="ghost"
            size="4"
            onClick={onClick}
            style={{
              padding: 0,
              height: 'auto',
              width: '100%',
              cursor: 'pointer',
            }}
          >
            <Card
              size="4"
              variant="surface"
              style={{
                position: 'relative',
                overflow: 'visible',
                aspectRatio: '1',
                width: '100%',
                background: 'var(--surface)',
                boxShadow: isDark
                  ? 'inset 6px 6px 12px rgba(0, 0, 0, 0.65), inset -6px -6px 12px rgba(192, 192, 192, 0.08), 0 0 0 1px rgba(192, 192, 192, 0.08)'
                  : 'inset 6px 6px 12px rgba(139, 90, 43, 0.12), inset -6px -6px 12px rgba(244, 232, 225, 0.75), 0 0 0 1px rgba(184, 115, 51, 0.1)',
              }}
            >
              <Flex direction="column" align="center" justify="center" style={{ height: '100%' }} gap="3" p="4">
                <motion.div
                  whileHover={{
                    rotate: 10,
                    scale: 1.1,
                  }}
                  transition={{ duration: ANIMATION_DURATION.NORMAL }}
                >
                  <Avatar
                    fallback={emoji}
                    size="6"
                    style={{
                      background: 'var(--surface)',
                      boxShadow: isDark
                        ? '3px 3px 6px rgba(0, 0, 0, 0.5), -3px -3px 6px rgba(192, 192, 192, 0.06)'
                        : '3px 3px 6px rgba(139, 90, 43, 0.1), -3px -3px 6px rgba(244, 232, 225, 0.6)',
                      border: 'none',
                      fontSize: '2rem',
                    }}
                  />
                </motion.div>

                <Flex direction="column" align="center" gap="1">
                  <Heading
                    size={{ initial: '3', md: '4', lg: '5' }}
                    weight="bold"
                    style={{ color: 'var(--text-primary)', textAlign: 'center' }}
                  >
                    {title}
                  </Heading>
                  <Text
                    size={{ initial: '1', md: '2', lg: '3' }}
                    color="gray"
                    style={{ textAlign: 'center' }}
                  >
                    {subtitle}
                  </Text>
                </Flex>
              </Flex>
            </Card>
          </Button>
        </motion.div>

        <UnifiedClickHint
          color={color}
          delay={delay}
          hintText={hintText}
          isDark={isDark}
        />
      </Box>
    );
  }
);

const UnifiedClickHint = memo<{
  color: string;
  delay: number;
  hintText?: string;
  isDark: boolean;
}>(({ color, delay, hintText, isDark }) => {
  const badgeColor = {
    blue: 'blue',
    purple: 'purple', 
    green: 'green',
    red: 'red',
  }[color] || 'blue' as 'blue' | 'purple' | 'green' | 'red';

  return (
    <>
      <Box
        style={{
          position: 'absolute',
          top: '-8px',
          right: '-8px',
          zIndex: 10,
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay + 0.5, duration: 0.3 }}
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: delay,
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
                borderRadius: '50%',
                background: `var(--${badgeColor}-9)`,
                pointerEvents: 'none',
              }}
              animate={{
                scale: [1, 1.5, 1.5],
                opacity: [0.7, 0, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: delay,
              }}
            />
          </motion.div>
        </motion.div>
      </Box>

      <Box
        style={{
          position: 'absolute',
          bottom: '-12px',
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + 0.7, duration: 0.3 }}
        >
          <Card
            variant="surface"
            size="1"
            style={{
              background: isDark
                ? 'linear-gradient(to right, #64748b, #71717a)'
                : 'linear-gradient(to right, #ea580c, #c2410c)',
              border: isDark
                ? '2px solid rgba(148, 163, 184, 0.5)'
                : '2px solid rgba(234, 88, 12, 0.5)',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              borderRadius: '12px',
            }}
          >
            <Flex align="center" gap="1" px="2" py="1">
              <Text size="1" style={{ fontSize: '0.75rem' }}>👆</Text>
              <Text size="1" weight="bold" style={{ whiteSpace: 'nowrap', fontSize: '0.75rem' }}>
                {hintText}
              </Text>
            </Flex>
          </Card>
        </motion.div>
      </Box>
    </>
  );
});

NavigationCard.displayName = 'NavigationCard';
UnifiedClickHint.displayName = 'UnifiedClickHint';

export default NavigationCard;
