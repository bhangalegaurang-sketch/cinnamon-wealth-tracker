/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Natural, warm terracotta cinnamon
        cinnamon: {
          50: '#FDF8F5',
          100: '#FBF1EB',
          200: '#F5DECE',
          300: '#EBC4AA',
          400: '#DC9F78',
          500: '#C77949',
          600: '#B25D2E',
          700: '#944820',
          800: '#763717',
          900: '#5A280F',
          DEFAULT: '#B25D2E',
        },
        // Warm paper & stone tones
        stone: {
          50: '#FAFAF9',
          100: '#F5F5F4',
          150: '#EFEFEA',
          200: '#E7E5E4',
          300: '#D6D3D1',
          400: '#A8A29E',
          500: '#78716C',
          600: '#57534E',
          700: '#44403C',
          800: '#292524',
          900: '#1C1917',
          950: '#0C0A09',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['Newsreader', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)',
        'float': '0 10px 30px -5px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
        'modal': '0 20px 40px -10px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
}
