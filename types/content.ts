import type profileJson from '@/data/profile.json'
import type experienceJson from '@/data/experience.json'
import type projectsJson from '@/data/projects.json'

export type Profile = typeof profileJson
export type Experience = (typeof experienceJson)[number]
export type Project = (typeof projectsJson)[number]
