/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import aspectRatio from '@tailwindcss/aspect-ratio';

export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#4F46E5',
          light: '#6366F1',
          dark: '#4338CA',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        success: {
          DEFAULT: '#10B981',
          dark: '#059669',
        },
        warning: {
          DEFAULT: '#F59E0B',
          dark: '#D97706',
        },
        error: {
          DEFAULT: '#EF4444',
          dark: '#B91C1C',
        },
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        sm: '0.375rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        full: '9999px',
      },
      boxShadow: {
        card: '0 4px 12px rgba(0, 0, 0, 0.06)',
        soft: '0 1px 3px rgba(0, 0, 0, 0.05)',
        focus: '0 0 0 4px rgba(99, 102, 241, 0.5)',
        popover: '0 10px 30px rgba(0, 0, 0, 0.1)',
      },
      ringColor: {
        primary: '#6366F1',
        success: '#10B981',
        error: '#EF4444',
      },
      zIndex: {
        0: '0',
        10: '10',
        50: '50',
        60: '60',
        70: '70',
        80: '80',
        90: '90',
        100: '100',
        999: '999',
        9999: '9999',
      },
      transitionProperty: {
        height: 'height',
        spacing: 'margin, padding',
        width: 'width',
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out forwards',
        slideDown: 'slideDown 0.3s ease-out',
        bounceSlow: 'bounceSlow 1.5s infinite ease-in-out',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideDown: {
          '0%': { opacity: 0, transform: 'translateY(-8px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        bounceSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5%)' },
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.800'),
            a: {
              color: theme('colors.primary.DEFAULT'),
              '&:hover': {
                color: theme('colors.primary.dark'),
              },
            },
            strong: { color: theme('colors.gray.900') },
            code: { color: theme('colors.primary.DEFAULT') },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
            a: { color: theme('colors.primary.light') },
            strong: { color: theme('colors.gray.100') },
            code: { color: theme('colors.primary.light') },
          },
        },
        invert: {
          css: {
            color: theme('colors.gray.100'),
            strong: { color: theme('colors.white') },
            a: {
              color: theme('colors.primary.light'),
              '&:hover': { color: theme('colors.primary.DEFAULT') },
            },
            code: { color: theme('colors.primary.light') },
          },
        },
      }),
    },
  },
  plugins: [forms, typography, aspectRatio],
};
