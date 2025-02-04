/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'xxs': '350px',
        'xs': '420px',
        'h-sm': { raw: '(max-height: 690px)' },
      },
      fontFamily: {
        'gothic': ['"OldEnglishGothicPixel"', 'sans-serif'],
        'terminal': ['"Terminal"', 'monospace'],
        'windows' : ['"Windows"', 'sans-serif'],
        'sans-serif' : ['sans-serif'],
      },
      colors: {
        'windows-primary': 'var(--windows-primary-color)',
        'windows-secondary': 'var(--windows-secondary-color)',
        'windows-tertiary': 'var(--windows-tertiary-color)',
      },
    },
  },
  plugins: [],
};
