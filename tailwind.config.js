/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'
import aspectRatio from '@tailwindcss/aspect-ratio'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // src 폴더 내 tsx, jsx 모두 포함
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#4F46E5',     // indigo-600
          light: '#6366F1',       // indigo-500
          dark: '#4338CA',        // indigo-700
        },
        gray: {
          100: '#f9fafb',
          200: '#f3f4f6',
          300: '#e5e7eb',
          400: '#d1d5db',
          500: '#9ca3af',
          600: '#6b7280',
          700: '#4b5563',
          800: '#374151',
          900: '#1f2937',
        },
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        card: '0 4px 12px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [
    forms,
    typography,
    aspectRatio,
  ],
}
