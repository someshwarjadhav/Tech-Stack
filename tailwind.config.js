/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f2f0ff',
          100: '#e6e1ff',
          200: '#cfc4ff',
          300: '#ac97ff',
          400: '#8a67ff',
          500: '#6d3bf5',
          600: '#5b23e0',
          700: '#4c1abd',
          800: '#3f189a',
          900: '#35187c',
        },
        ink: {
          50: '#f6f7f9',
          100: '#eceef2',
          200: '#d5d9e2',
          300: '#aeb5c4',
          400: '#818aa0',
          500: '#616a82',
          600: '#4c5369',
          700: '#3e4356',
          800: '#2c2f3d',
          900: '#1b1d27',
        },
        node: {
          purple: '#7c5cff',
          pink: '#ec4d92',
          green: '#12b886',
          orange: '#f5a623',
          blue: '#3b82f6',
          teal: '#14b8a6',
          slate: '#64748b',
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'panel': '0 1px 2px rgba(16,24,40,0.04), 0 1px 3px rgba(16,24,40,0.06)',
        'popover': '0 8px 24px rgba(16,24,40,0.12), 0 2px 6px rgba(16,24,40,0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.25s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'dash': 'dash 1.5s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(4px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        dash: {
          to: { strokeDashoffset: -20 },
        }
      }
    },
  },
  plugins: [],
}
