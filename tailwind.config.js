/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Space theme - sophisticated dark palette
        'space': {
          '900': '#0a0e27',
          '800': '#0f1535',
          '700': '#141e3d',
          '600': '#1a2855',
          '500': '#2a3f6f',
          '400': '#3a5a9f',
          'accent': '#00d4ff',
          'accent-purple': '#b366ff',
          'accent-pink': '#ff00ff',
          'accent-cyan': '#00ffff',
        },
        'neon': {
          'cyan': '#00d4ff',
          'purple': '#b366ff',
          'pink': '#ff00ff',
          'blue': '#3b82ff',
          'green': '#00ff88',
        }
      },
      fontFamily: {
        'display': ['Space Grotesk', 'sans-serif'],
        'mono': ['Fira Code', 'monospace'],
        'sans': ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'orbit': 'orbit 20s linear infinite',
        'star-twinkle': 'star-twinkle 4s ease-in-out infinite',
        'scan-line': 'scan-line 2s linear infinite',
        'data-flow': 'data-flow 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(20px)' }
        },
        'glow-pulse': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(0, 212, 255, 0.5)',
            opacity: '0.8'
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(0, 212, 255, 0.8)',
            opacity: '1'
          }
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(100px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(100px) rotate(-360deg)' }
        },
        'star-twinkle': {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' }
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' }
        },
        'data-flow': {
          '0%': { 
            backgroundPosition: '0% 50%',
            opacity: '0.5'
          },
          '50%': { 
            opacity: '1'
          },
          '100%': { 
            backgroundPosition: '100% 50%',
            opacity: '0.5'
          }
        }
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '12px',
        'lg': '20px',
        'xl': '40px',
      },
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(0, 212, 255, 0.6), inset 0 0 20px rgba(0, 212, 255, 0.1)',
        'neon-purple': '0 0 20px rgba(179, 102, 255, 0.6), inset 0 0 20px rgba(179, 102, 255, 0.1)',
        'neon-pink': '0 0 20px rgba(255, 0, 255, 0.6), inset 0 0 20px rgba(255, 0, 255, 0.1)',
        'glow': '0 0 40px rgba(0, 212, 255, 0.4)',
      },
      opacity: {
        '15': '0.15',
        '25': '0.25',
      }
    },
  },
  plugins: [],
}