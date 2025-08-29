/** @type {import('next').NextConfig} */
const isPages = process.env.GITHUB_PAGES === 'true'
const config = {
  output: 'export',
  // Use basePath/assetPrefix only when deploying to GitHub Pages
  basePath: isPages ? '/port-react-folio' : '',
  assetPrefix: isPages ? '/port-react-folio/' : undefined,
  trailingSlash: true,
  images: { unoptimized: true },
}

export default config
