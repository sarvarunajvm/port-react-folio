import React from 'react';

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
  Box,
  Button,
  Link
} from '@radix-ui/themes';

import { projectsData } from '../../data';
import { AnimatedCounter } from '../../shared/components';
import { calculateProjectAge } from '../../shared/utils/statistics';

const Projects: React.FC = () => {
  return (
    <Container size="4" style={{ height: '100%', overflow: 'auto' }}>
      <Flex
        direction="column"
        align="center"
        justify="center"
        style={{ minHeight: '100%', padding: 'var(--space-4)' }}
      >
        <Box style={{ width: '100%', maxWidth: '1200px' }}>
          <Flex direction="column" gap="6">
            <Grid columns={{ initial: '1', md: '2', lg: '3' }} gap="6">
              {/* Utils Commons */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card size="4" variant="surface" style={{ height: '100%' }}>
                  <Flex direction="column" gap="3" style={{ height: '100%' }}>
                    <Flex gap="3" align="start">
                      <Avatar
                        fallback="☕"
                        size="4"
                        style={{ fontSize: '1.5rem' }}
                      />
                      <Flex direction="column" flexGrow="1">
                        <Heading size="4" weight="bold">
                          {projectsData[0].name}
                        </Heading>
                        <Flex gap="2" align="center">
                          <Badge variant="soft" color="blue">
                            {projectsData[0].tech}
                          </Badge>
                          <Badge variant="outline" color="green">
                            {projectsData[0].status}
                          </Badge>
                        </Flex>
                        <Text size="2" color="orange" weight="medium">
                          {calculateProjectAge(projectsData[0].createdDate)}
                        </Text>
                      </Flex>
                    </Flex>
                    
                    <Text size="3" style={{ lineHeight: '1.5', flexGrow: 1 }}>
                      Comprehensive utility library with 7 modules for String, Number, Date, and more operations.
                    </Text>
                    
                    <Flex direction="column" gap="3">
                      <Flex align="center" gap="2">
                        <Text size="4">🔧</Text>
                        <Flex direction="column">
                          <AnimatedCounter
                            end={7}
                            duration={1.5}
                            style={{ fontSize: '1.5rem', fontWeight: 'bold' }}
                          />
                          <Text size="2" color="gray">Utility Modules</Text>
                        </Flex>
                      </Flex>
                      
                      <Button
                        asChild
                        size="3"
                        variant="solid"
                        style={{ width: '100%' }}
                      >
                        <Link
                          href={projectsData[0].url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Text>🌿</Text>
                          GitHub
                        </Link>
                      </Button>
                    </Flex>
                  </Flex>
                </Card>
              </motion.div>

              {/* Port Advancer */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card size="4" variant="surface" style={{ height: '100%' }}>
                  <Flex direction="column" gap="3" style={{ height: '100%' }}>
                    <Flex gap="3" align="start">
                      <Avatar
                        fallback="🔌"
                        size="4"
                        style={{ fontSize: '1.5rem' }}
                      />
                      <Flex direction="column" flexGrow="1">
                        <Heading size="4" weight="bold">
                          {projectsData[1].name}
                        </Heading>
                        <Flex gap="2" align="center">
                          <Badge variant="soft" color="cyan">
                            {projectsData[1].tech}
                          </Badge>
                          <Badge variant="outline" color="purple">
                            {projectsData[1].status}
                          </Badge>
                        </Flex>
                        <Text size="2" color="orange" weight="medium">
                          {calculateProjectAge(projectsData[1].createdDate)}
                        </Text>
                      </Flex>
                    </Flex>
                    
                    <Text size="3" style={{ lineHeight: '1.5', flexGrow: 1 }}>
                      {projectsData[1].description}
                    </Text>
                    
                    <Flex direction="column" gap="3">
                      <Flex align="center" gap="2">
                        <Text size="4">👥</Text>
                        <Flex direction="column">
                          <AnimatedCounter
                            end={60}
                            suffix="+"
                            duration={1.5}
                            style={{ fontSize: '1.5rem', fontWeight: 'bold' }}
                          />
                          <Text size="2" color="gray">Active Users</Text>
                        </Flex>
                      </Flex>
                      
                      <Button
                        asChild
                        size="3"
                        variant="solid"
                        style={{ width: '100%' }}
                      >
                        <Link
                          href={projectsData[1].url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Text>🌿</Text>
                          GitHub
                        </Link>
                      </Button>
                    </Flex>
                  </Flex>
                </Card>
              </motion.div>

              {/* Vue Embed Gist */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card size="4" variant="surface" style={{ height: '100%' }}>
                  <Flex direction="column" gap="3" style={{ height: '100%' }}>
                    <Flex gap="3" align="start">
                      <Avatar
                        fallback="📦"
                        size="4"
                        style={{ fontSize: '1.5rem' }}
                      />
                      <Flex direction="column" flexGrow="1">
                        <Heading size="4" weight="bold">
                          {projectsData[2].name}
                        </Heading>
                        <Flex gap="2" align="center">
                          <Badge variant="soft" color="green">
                            {projectsData[2].tech}
                          </Badge>
                          <Badge variant="outline" color="jade">
                            {projectsData[2].status}
                          </Badge>
                        </Flex>
                        <Text size="2" color="orange" weight="medium">
                          {calculateProjectAge(projectsData[2].createdDate)}
                        </Text>
                      </Flex>
                    </Flex>
                    
                    <Text size="3" style={{ lineHeight: '1.5', flexGrow: 1 }}>
                      {projectsData[2].description}
                    </Text>
                    
                    <Flex direction="column" gap="3">
                      <Flex align="center" gap="2">
                        <Text size="4">📊</Text>
                        <Flex direction="column">
                          <AnimatedCounter
                            end={270}
                            suffix="+"
                            duration={1.5}
                            style={{ fontSize: '1.5rem', fontWeight: 'bold' }}
                          />
                          <Text size="2" color="gray">Weekly Downloads</Text>
                        </Flex>
                      </Flex>
                      
                      <Flex gap="2">
                        <Button
                          asChild
                          size="2"
                          variant="solid"
                          style={{ flex: 1 }}
                        >
                          <Link
                            href={projectsData[2].url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Text>🌿</Text>
                            PR
                          </Link>
                        </Button>
                        <Button
                          asChild
                          size="2"
                          variant="outline"
                          style={{ flex: 1 }}
                        >
                          <Link
                            href={projectsData[2].npmLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Text>📦</Text>
                            NPM
                          </Link>
                        </Button>
                      </Flex>
                    </Flex>
                  </Flex>
                </Card>
              </motion.div>
            </Grid>

            {/* Impact Summary Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card size="3" variant="surface">
                <Flex align="center" justify="center" gap="6">
                  <Flex direction="column" align="center">
                    <AnimatedCounter
                      end={3}
                      duration={2}
                      style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent-9)' }}
                    />
                    <Text size="3" weight="medium" color="gray">
                      Open Source
                    </Text>
                  </Flex>
                  
                  <Separator orientation="vertical" size="2" />
                  
                  <Flex direction="column" align="center">
                    <AnimatedCounter
                      end={270}
                      suffix="+"
                      duration={2}
                      style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent-9)' }}
                    />
                    <Text size="3" weight="medium" color="gray">
                      Downloads
                    </Text>
                  </Flex>
                  
                  <Separator orientation="vertical" size="2" />
                  
                  <Flex direction="column" align="center">
                    <AnimatedCounter
                      end={60}
                      suffix="+"
                      duration={2}
                      style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent-9)' }}
                    />
                    <Text size="3" weight="medium" color="gray">
                      Users
                    </Text>
                  </Flex>
                </Flex>
              </Card>
            </motion.div>
          </Flex>
        </Box>
      </Flex>
    </Container>
  );
};

export default Projects;
