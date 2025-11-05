/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cyan: '#00E5FF',
        orange: '#FF6B35',
        yellow: '#FFD93D',
        navy: '#1A2F3D',
        deepBg: '#0D1B24',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #00E5FF 0%, #FF6B35 100%)',
        'gradient-energy': 'linear-gradient(90deg, #FFD93D 0%, #FF6B35 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0D1B24 0%, #1A2F3D 100%)',
      },
      boxShadow: {
        'cyan-glow': '0 0 20px rgba(0, 229, 255, 0.3)',
        'orange-glow': '0 0 20px rgba(255, 107, 53, 0.4)',
        'cyan-glow-lg': '0 0 40px rgba(0, 229, 255, 0.5)',
        'orange-glow-lg': '0 0 40px rgba(255, 107, 53, 0.6)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
        'slide-in-left': 'slide-in-left 0.3s ease-out',
        'fade-in-up': 'fade-in-up 0.6s ease-out',
        'scroll-reveal': 'fade-in-up 0.8s ease-out',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 107, 53, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 107, 53, 0.8)' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-in-left': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'fade-in-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
      },
      transitionDuration: {
        '300': '300ms',
      },
      transitionTimingFunction: {
        'ease': 'ease-in-out',
      },
    },
  },
  plugins: [],
};
