/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        fantasy: {
          gold: '#ffd700',
          silver: '#c0c0c0',
          bronze: '#cd7f32',
          magic: '#8a2be2',
          fire: '#ff4500',
          ice: '#00bfff',
          nature: '#228b22',
        }
      },
      fontFamily: {
        fantasy: ['Cinzel', 'serif'],
        game: ['Orbitron', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #ffd700, 0 0 10px #ffd700, 0 0 15px #ffd700' },
          '100%': { boxShadow: '0 0 10px #ffd700, 0 0 20px #ffd700, 0 0 30px #ffd700' },
        }
      }
    },
  },
  plugins: [],
} 