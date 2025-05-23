/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        tichi: {
          yellow: '#FBAF1A',
          purple: '#9E2B90',
          pink: '#ED0B7C',
        },
      },
      boxShadow: {
        '3d': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1), 0 -2px 6px -2px rgba(255, 255, 255, 0.2)',
        'card': '0 15px 25px -4px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'input': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      },
      backgroundImage: {
        'tichi-people': 'linear-gradient(135deg, #ED0B7C, #FBAF1A)',
        'tichi-opportunity': 'linear-gradient(135deg, #9E2B90, #FBAF1A)',
        'people-opportunity': 'linear-gradient(135deg, #ED0B7C, #9E2B90)',
        'tichi-all': 'linear-gradient(to right, #ED0B7C, #FBAF1A, #9E2B90)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulse: 'pulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};