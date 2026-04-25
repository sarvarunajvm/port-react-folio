import type profileJson from '@/data/profile.json'
import type homeJson from '@/data/home.json'
import type skillsGraphJson from '@/data/skills-graph.json'
import type experienceJson from '@/data/experience.json'
import type projectsJson from '@/data/projects.json'
export type Profile = typeof profileJson
export type HomeConfig = typeof homeJson
export type SkillsGraph = typeof skillsGraphJson
export type Experience = (typeof experienceJson)[number]
export type Project = (typeof projectsJson)[number]
