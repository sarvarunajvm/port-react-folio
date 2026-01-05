/** @type {import('next').NextConfig} */
const isPages = process.env.GITHUB_PAGES === 'true'
const config = {
  output: 'export',
  // Use basePath/assetPrefix only when deploying to GitHub Pages
  basePath: isPages ? '/port-react-folio' : '',
  assetPrefix: isPages ? '/port-react-folio/' : undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  // Skip TypeScript errors during build (framer-motion v12 has incomplete type definitions)
  typescript: { ignoreBuildErrors: true },
}

export default config
