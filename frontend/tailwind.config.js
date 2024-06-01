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
        'primary': '#b68bdcb1',
        'secondary': '#f87171',
      }
    },
    theme: {
      extend: {
        colors: {
          'light-pink': '#FFB1B1',
          'secondary': '#FF6347', // Assuming you meant this for bg-secondary
        },
        fontFamily: {
          'poppins': ['Poppins', 'sans-serif'],
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: 0 },
            '100%': { opacity: 1 },
          },
          slideIn: {
            '0%': { transform: 'translateX(100%)' },
            '100%': { transform: 'translateX(0)' },
          },
        },
        animation: {
          'fade-in': 'fadeIn 1s ease-out forwards',
          'slide-in': 'slideIn 1s ease-out forwards',
        },
      },
    },
  },
  plugins: [],
}