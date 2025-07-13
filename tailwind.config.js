// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"], // If you plan to support dark mode
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',      // For the traditional /pages directory (if used)
    './components/**/*.{js,ts,jsx,tsx,mdx}', // For your reusable components
    './app/**/*.{js,ts,jsx,tsx,mdx}',        // Essential for Next.js App Router components and pages
    './src/**/*.{js,ts,jsx,tsx,mdx}',        // Covers all files within your src/ directory (e.g., src/app, src/components, src/lib)
  ],
  theme: {
    extend: {
      // You can extend Tailwind's default theme here, e.g., custom colors, fonts, etc.
      // For example, if you had custom colors in your old config:
      // colors: {
      //   'custom-blue': '#1a2b3c',
      // },
    },
  },
  plugins: [
    // Add any Tailwind plugins you're using, like @tailwindcss/typography or tailwindcss-animate
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
};