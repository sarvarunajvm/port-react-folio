import profile from '@/data/profile.json'

export const siteTitle = `${profile.name} | ${profile.title}`
export const siteDescription =
  profile.bio.length > 155 ? `${profile.bio.slice(0, 152)}…` : profile.bio
