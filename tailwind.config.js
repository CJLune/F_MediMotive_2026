/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './assets/**/*.js'],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#1c2e4a',
          slate: '#486966',
          primary: '#027343',
          'primary-hover': '#025f3a',
          light: '#f0fdf4',
        },
        surface: {
          off: '#f8fafc',
        },
        text: {
          DEFAULT: '#1f2937',
          secondary: '#334155',
          emphasis: '#1e293b',
          muted: '#64748b',
        },
        line: '#e2e8f0',
      },
      fontFamily: {
        sans: ['Roboto', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        container: '1120px',
      },
    },
  },
  plugins: [],
};
