/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        grafana: {
          bg: '#111217',
          panel: '#181b1f',
          border: '#2c3235',
          text: '#d8d9da',
          muted: '#8e8e8e',
          green: '#73bf69',
          red: '#f2495c',
          orange: '#ff9830',
          yellow: '#fade2a',
          blue: '#5794f2',
          purple: '#b877d9',
          cyan: '#8ab8ff',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
