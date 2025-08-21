import React from 'react';
import { motion } from 'framer-motion';
import {
  Container,
  Card,
  Text,
  Heading,
  Badge,
  Flex,
  Grid,
  Box,
  Separator,
  Avatar
} from '@radix-ui/themes';
import { skillsData } from '../../data';
import { AnimatedCounter } from '../../shared/components';

const Skills: React.FC = () => {

  const getEmoji = (iconName?: string) => {
    const emojiMap: { [key: string]: string } = {
      Coffee: '☕',
      Leaf: '🍃',
      Shield: '🛡️',
      Api: '🔗',
      Code: '💻',
      Database: '🗄️',
      Package: '📦',
      TestTube: '🧪',
      Cloud: '☁️',
      Workflow: '🔄',
      Github: '🐙',
      Container: '📦',
      Activity: '📈',
      GitBranch: '🌿',
      Kanban: '📋',
      BookOpen: '📖',
      FileText: '📄',
      MessageSquare: '💬',
      Key: '🗝️',
      Lock: '🔒',
      ScanLine: '🔍',
    };
    return emojiMap[iconName || ''] || '🔧';
  };

  const getProficiencyColor = (proficiency: string) => {
    switch (proficiency) {
      case 'expert': return 'green';
      case 'advanced': return 'blue';
      case 'intermediate': return 'orange';
      case 'beginner': return 'purple';
      default: return 'gray';
    }
  };

  return (
    <Container size="4" style={{ height: '100%', overflow: 'auto' }}>
      <Flex
        direction="column"
        align="center"
        justify="center"
        style={{ minHeight: '100%', padding: 'var(--space-4)' }}
      >
        <Box style={{ width: '100%', maxWidth: '1200px' }}>
          <Grid columns={{ initial: '1', md: '2' }} gap="6">
            {skillsData.map((category, categoryIndex) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                <Card size="4" variant="surface" style={{ height: '100%' }}>
                  <Flex direction="column" gap="4">
                    <Heading size="5" weight="bold" color="orange">
                      {category.title}
                    </Heading>
                    
                    <Flex direction="column" gap="3">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                        >
                          <Card variant="surface" size="1">
                            <Flex align="center" justify="between" p="2">
                              <Flex align="center" gap="3">
                                <Avatar
                                  fallback={getEmoji(skill.icon)}
                                  size="2"
                                  style={{ fontSize: '1rem' }}
                                />
                                <Text size="3" weight="medium">
                                  {skill.name}
                                </Text>
                              </Flex>
                              <Badge 
                                color={getProficiencyColor(skill.proficiency) as any}
                                variant="soft"
                                size="2"
                              >
                                {skill.proficiency}
                              </Badge>
                            </Flex>
                          </Card>
                        </motion.div>
                      ))}
                    </Flex>
                  </Flex>
                </Card>
              </motion.div>
            ))}
          </Grid>

          {/* Skills Summary */}
          <Box mt="6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card size="3" variant="surface">
                <Flex align="center" justify="center" gap="6">
                  <Flex direction="column" align="center">
                    <AnimatedCounter
                      end={skillsData.reduce((total, cat) => total + cat.skills.length, 0)}
                      duration={2}
                      style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent-9)' }}
                    />
                    <Text size="3" weight="medium" color="gray">
                      Total Skills
                    </Text>
                  </Flex>
                  
                  <Separator orientation="vertical" size="2" />
                  
                  <Flex direction="column" align="center">
                    <AnimatedCounter
                      end={skillsData.length}
                      duration={2}
                      style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent-9)' }}
                    />
                    <Text size="3" weight="medium" color="gray">
                      Categories
                    </Text>
                  </Flex>
                  
                  <Separator orientation="vertical" size="2" />
                  
                  <Flex direction="column" align="center">
                    <AnimatedCounter
                      end={skillsData.reduce((total, cat) => {
                        const expertSkills = cat.skills.filter(skill => skill.proficiency === 'expert');
                        return total + expertSkills.length;
                      }, 0)}
                      duration={2}
                      style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent-9)' }}
                    />
                    <Text size="3" weight="medium" color="gray">
                      Expert Level
                    </Text>
                  </Flex>
                </Flex>
              </Card>
            </motion.div>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
};

export default Skills;