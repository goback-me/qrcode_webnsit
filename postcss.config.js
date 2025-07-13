// postcss.config.js
module.exports = { // Or `export default {` if you're using .mjs for this config
  plugins: {
    tailwindcss: {}, // This plugin processes your Tailwind directives
    autoprefixer: {}, // This plugin adds necessary vendor prefixes
  },
};