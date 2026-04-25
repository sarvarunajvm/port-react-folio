const path = require('node:path')

/** `base` keeps Tailwind’s file search anchored to this repo (avoids wrong resolution when a parent dir has a package.json). */
module.exports = {
  plugins: {
    '@tailwindcss/postcss': { base: path.resolve(__dirname) },
    autoprefixer: {},
  },
}

