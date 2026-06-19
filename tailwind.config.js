/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Modern light fintech palette (Fondo Flanco)
        canvas: '#F6F7FB', // page base (cool near-white)
        surface: '#FFFFFF', // card surface
        mist: '#F1F3F9', // inset / elevated alt
        line: '#E6E9F2', // hairline borders
        ink: '#0B0F1A', // primary text (near-black)
        slate: '#3F4656', // secondary text
        muted: '#8A92A6', // muted text
        accent: {
          DEFAULT: '#5B5BF6', // electric indigo (signature)
          soft: '#7C77FF',
          light: '#A99CFF',
          deep: '#4B3FD6',
          violet: '#8B5CF6',
          purple: '#A855F7',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(16,24,40,0.04), 0 12px 32px -16px rgba(16,24,40,0.18)',
        lift: '0 28px 70px -34px rgba(40,40,120,0.35)',
        accent: '0 14px 34px -12px rgba(91,91,246,0.55)',
        ring: '0 0 0 1px rgba(91,91,246,0.35), 0 18px 44px -20px rgba(91,91,246,0.5)',
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #A855F7 100%)',
        'accent-line': 'linear-gradient(90deg, transparent, #8B5CF6 50%, transparent)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        drift: {
          '0%,100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(0,-22px,0)' },
        },
        floaty: {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(0,18px,0) scale(1.04)' },
        },
        pulseAccent: {
          '0%,100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        shimmer: 'shimmer 3.5s linear infinite',
        drift: 'drift 11s ease-in-out infinite',
        floaty: 'floaty 13s ease-in-out infinite',
        pulseAccent: 'pulseAccent 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
