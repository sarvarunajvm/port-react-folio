import React, { useState } from 'react';

import { motion } from 'framer-motion';
import { Container, Flex, Card, Text, Button, Badge, Separator, TextField, Grid, TextArea, Avatar, Heading, Link, Box } from '@radix-ui/themes';

import { educationData, emojiMappings, personalInfo, uiContent } from '../../data';
import { SPRING_CONFIG, hoverVariants } from '../../shared/constants/animations';
import { calculateYearsSinceEducation } from '../../shared/utils/statistics';

const About: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
      uiContent.about.contactForm.emailSubject
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoLink;
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Container size="4" style={{ height: '100vh', padding: '1rem' }}>
      <Flex 
        direction="column" 
        align="center" 
        justify="center" 
        style={{ height: '100%', maxWidth: '1400px', margin: '0 auto' }}
      >
        {/* Optimized Bento Grid Layout */}
        <Grid columns={{ initial: '1', lg: '3' }} gap="4" width="100%">
          {/* Profile & Summary Card - Left column */}
          <Box gridColumn={{ initial: '1', lg: '1 / 3' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={hoverVariants.lift}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
            <Card size="4" style={{ height: '100%', cursor: 'pointer' }} className="group transition-all duration-300 hover:scale-[1.02]">
              <Flex direction="column" style={{ height: '100%' }}>
                {/* Profile Header */}
                <Flex align="start" gap="3" mb="4">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
                >
                  <Avatar 
                    size="5" 
                    fallback="👨‍💻"
                    style={{ fontSize: '2rem' }}
                  />
                </motion.div>
                <Flex direction="column" style={{ flex: 1 }}>
                  <Heading
                    size="8"
                    style={{ color: 'var(--accent)', lineHeight: '1' }}
                    mb="2"
                  >
                    {personalInfo.firstname} {personalInfo.lastname}
                  </Heading>
                  <Text size="6" weight="bold" color="gray" mb="3">
                    &ldquo;{personalInfo.nickname}&rdquo; • Software Engineer
                  </Text>
                  <Flex align="center" gap="2">
                    <Flex align="center" gap="1">
                      <Badge color="green" variant="soft" size="1">
                        {personalInfo.availability.status}
                      </Badge>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>

                {/* Professional Summary */}
                <Separator size="4" style={{ margin: '1rem 0' }} />
                <Text size="4" color="gray" style={{ lineHeight: '1.6' }} mb="4">
                  {personalInfo.bio}
                </Text>

                {/* Bottom Section with Contact Info and Message Form */}
                <Flex direction="column" style={{ flex: 1 }}>
                  {/* Contact Info & Message Form Combined */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    transition={{ delay: 0.4, ...SPRING_CONFIG.DEFAULT }}
                  >
                    <Card variant="surface" size="3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Contact Information */}
                        <Flex direction="column">
                          <Flex align="center" gap="2" mb="3">
                            <Text size="5">📞</Text>
                            <Heading
                              size="5"
                              style={{ color: 'var(--accent)' }}
                            >
                              {uiContent.about.sections.contact.title}
                            </Heading>
                          </Flex>
                          <Flex direction="column" gap="3">
                            <Flex align="start" gap="2">
                              <Text size="4">📧</Text>
                              <Flex direction="column" style={{ flex: 1 }}>
                                <Text size="2" color="gray" mb="1">
                                  {uiContent.about.sections.contact.emailLabel}
                                </Text>
                                <Link 
                                  href={`mailto:${personalInfo.email}`}
                                  size="3" 
                                  weight="medium"
                                  style={{ wordBreak: 'break-all' }}
                                >
                                  {personalInfo.email}
                                </Link>
                              </Flex>
                            </Flex>
                            <Flex align="start" gap="2">
                              <Text size="4">📱</Text>
                              <Flex direction="column" style={{ flex: 1 }}>
                                <Text size="2" color="gray" mb="1">
                                  {uiContent.about.sections.contact.phoneLabel}
                                </Text>
                                <Link 
                                  href={`tel:${personalInfo.phone}`}
                                  size="3" 
                                  weight="medium"
                                >
                                  {personalInfo.phone}
                                </Link>
                              </Flex>
                            </Flex>
                            <Flex align="start" gap="2">
                              <Text size="4">📍</Text>
                              <Flex direction="column" style={{ flex: 1 }}>
                                <Text size="2" color="gray" mb="1">
                                  {uiContent.about.sections.contact.locationLabel}
                                </Text>
                                <Text size="3" weight="medium">
                                  {personalInfo.location.city}, {personalInfo.location.country}
                                </Text>
                              </Flex>
                            </Flex>
                          </Flex>
                        </Flex>

                        {/* Send Message Form */}
                        <Flex direction="column">
                          <Flex align="center" gap="2" mb="3">
                            <Text size="5">💬</Text>
                            <Heading
                              size="5"
                              style={{ color: 'var(--accent)' }}
                            >
                              {uiContent.about.contactForm.title}
                            </Heading>
                          </Flex>
                          <Flex direction="column" style={{ flex: 1 }}>
                            <Text size="3" color="gray" mb="3">
                              {uiContent.about.contactForm.subtitle}
                            </Text>
                            <form onSubmit={handleSubmit}>
                              <Flex direction="column" gap="3">
                                <TextField.Root
                                  size="2"
                                  placeholder={uiContent.about.contactForm.namePlaceholder}
                                  value={formData.name}
                                  onChange={(e) => handleChange(e)}
                                  name="name"
                                  required
                                />
                                <TextField.Root
                                  size="2"
                                  type="email"
                                  placeholder={uiContent.about.contactForm.emailPlaceholder}
                                  value={formData.email}
                                  onChange={(e) => handleChange(e)}
                                  name="email"
                                  required
                                />
                                <TextArea
                                  name="message"
                                  value={formData.message}
                                  onChange={handleChange}
                                  required
                                  placeholder={uiContent.about.contactForm.messagePlaceholder}
                                  size="2"
                                  resize="none"
                                  style={{ minHeight: '80px' }}
                                />
                                <Button
                                  type="submit"
                                  size="3"
                                  style={{
                                    background: 'var(--accent)',
                                    color: 'white',
                                    width: '100%'
                                  }}
                                >
                                  <Text size="2">{emojiMappings.sections.send}</Text>
                                  {uiContent.about.contactForm.sendButton}
                                </Button>
                              </Flex>
                            </form>
                          </Flex>
                        </Flex>
                      </div>
                    </Card>
                  </motion.div>
                </Flex>
              </Flex>
            </Card>
            </motion.div>
          </Box>

          {/* Education Card - Right column */}
          <Box>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={hoverVariants.lift}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
            <Card size="4" style={{ height: '100%', cursor: 'pointer' }} className="group transition-all duration-300 hover:scale-[1.02]">
              <Flex direction="column" style={{ height: '100%' }}>
                {/* Header */}
                <Flex align="center" gap="2" mb="4">
                  <Text size="6">🎓</Text>
                  <Heading
                    size="7"
                    style={{ color: 'var(--accent)' }}
                  >
                    Education
                  </Heading>
                </Flex>

                {/* Education Timeline */}
                <Flex direction="column" style={{ flex: 1, position: 'relative' }}>
                  {/* Timeline Line */}
                  <div className="absolute left-4 md:left-5 top-8 bottom-0 w-0.5 bg-gradient-to-b from-[var(--accent)] to-transparent opacity-30"></div>

                  <Flex direction="column" gap="6">
                    {educationData.map((edu, index) => (
                      <motion.div
                        key={edu.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ x: 2 }}
                        transition={{ delay: 0.1 * index, ...SPRING_CONFIG.DEFAULT }}
                      >
                        <Flex gap="4" style={{ position: 'relative' }}>
                          {/* Timeline Node */}
                          <Flex direction="column" align="center" style={{ flexShrink: 0, position: 'relative', zIndex: 10 }}>
                            <div className="w-8 h-8 md:w-9 md:h-9 rounded-full neu-pressed-sm flex items-center justify-center border-2 border-[var(--accent)] bg-[var(--surface)]">
                              <Text size="4">🏆</Text>
                            </div>
                            {/* Timeline dot indicator */}
                            <div
                              className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                              style={{ backgroundColor: 'var(--accent)' }}
                            ></div>
                          </Flex>

                          {/* Timeline Content */}
                          <Flex direction="column" style={{ flex: 1, paddingBottom: '0.5rem' }}>
                            {/* Period Badge */}
                            <Badge color="orange" variant="soft" size="2" style={{ marginBottom: '0.5rem', alignSelf: 'flex-start' }}>
                              {edu.period} • {calculateYearsSinceEducation(edu.period)}
                            </Badge>

                            {/* Degree & College */}
                            <Text size="4" weight="bold" mb="2">{edu.degree}</Text>
                            <Text size="3" color="gray" weight="medium" mb="3">
                              {edu.institution}
                            </Text>

                            {/* Achievement Points */}
                            <Flex direction="column" gap="2">
                              {edu.achievements.map((achievement, index) => (
                                <Flex key={index} align="start" gap="2">
                                  <div
                                    className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                                    style={{ backgroundColor: 'var(--blue-9)' }}
                                  ></div>
                                  <Text size="2" color="gray" style={{ lineHeight: '1.5' }}>
                                    {achievement}
                                  </Text>
                                </Flex>
                              ))}
                            </Flex>
                          </Flex>
                        </Flex>
                      </motion.div>
                    ))}
                  </Flex>
                </Flex>
              </Flex>
            </Card>
            </motion.div>
          </Box>
        </Grid>
      </Flex>
    </Container>
  );
};

export default About;
