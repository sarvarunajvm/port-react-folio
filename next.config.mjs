import path from 'node:path'
import { fileURLToPath } from 'node:url'

/** @type {import('next').NextConfig} */
const isPages = process.env.GITHUB_PAGES === 'true'
const projectRoot = path.dirname(fileURLToPath(import.meta.url))

const config = {
  output: 'export',
  basePath: isPages ? '/port-react-folio' : '',
  assetPrefix: isPages ? '/port-react-folio/' : undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: isPages ? '/port-react-folio' : '',
  },
  // Prefer this repo when another lockfile exists higher in the tree (silences Turbopack root warning)
  turbopack: {
    root: projectRoot,
  },
}

export default config
