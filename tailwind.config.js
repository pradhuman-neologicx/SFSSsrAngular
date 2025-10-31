module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: '#f5f5f5',
        foreground: '#333333',
        card: {
          DEFAULT: '#ffffff',
          foreground: '#333333',
        },
        popover: {
          DEFAULT: '#ffffff',
          foreground: '#333333',
        },
        primary: {
          DEFAULT: '#333333',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#f5f5f5',
          foreground: '#333333',
        },
        muted: {
          DEFAULT: '#f0f0f0',
          foreground: '#666666',
        },
        accent: {
          DEFAULT: '#ffffff',
          foreground: '#000000',
        },
        destructive: {
          DEFAULT: '#666666',
          foreground: '#ffffff',
        },
        border: '#e5e5e5',
        input: '#ffffff',
        ring: '#333333',
        chart: {
          1: '#333333',
          2: '#666666',
          3: '#999999',
          4: '#cccccc',
          5: '#f0f0f0',
        },
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}