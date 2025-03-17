import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    container: {
      center: true,
      padding: "15px",
    },
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "960px",
      xl: "1200px",
    },
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: "full",
            pre: {
              backgroundColor: theme('colors.gray.800'),
              color: theme('colors.gray.100'),
              borderRadius: theme('borderRadius.md'),
              borderWidth: '1px',
              borderColor: theme('colors.gray.700'),
              padding: theme('spacing.4'),
              boxShadow: theme('boxShadow.sm'),
            },
            code: {
              color: theme('colors.pink.500'),
              fontWeight: '600',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
        invert: {
          css: {
            pre: {
              backgroundColor: '#1e1e3f', // Dark purple background
              color: '#e2e8f0',
              borderColor: '#2d2d6c',
            },
            code: {
              color: '#f8c555', // Amber for inline code
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
