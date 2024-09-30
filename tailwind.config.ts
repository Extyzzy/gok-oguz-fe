import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // container: {
    //   padding: {
    //     DEFAULT: '1rem',
    //     sm: '2rem',
    //     lg: '1rem',
    //     xl: '5rem',
    //     '2xl': '6rem',
    //   },
    // },
    backgroundColor: {
      beige: '#FFF6D7',
      black: '#1E1E1E',
      burgundy: '#882727',
      white: '#FFFFFF',
    },
    backgroundSize: {
      6: '6rem',
    },
    extend: {
      flexGrow: {
        '0.7': '0.7',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
