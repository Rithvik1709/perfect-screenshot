/**
 * Minimal Tailwind config to ensure production builds include classes from the app
 * and components directories (Next.js `app/` layout). Also includes a small safelist
 * to prevent dynamic utility classes from being purged.
 */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './hooks/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // Safelist common utility patterns that may be constructed dynamically
  safelist: [
    'container',
    { pattern: /^max-w-/, variants: ['sm','md','lg','xl'] },
    { pattern: /^w-/, variants: ['sm','md','lg'] },
  ],
}
