/** Prefix for `public/` assets when using Next `basePath` (e.g. GitHub Pages). Set `NEXT_PUBLIC_BASE_PATH=/repo-name` at build time if needed. */
export function publicUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
  const p = path.startsWith('/') ? path : `/${path}`
  if (!base) return p
  return `${base.replace(/\/$/, '')}${p}`
}
