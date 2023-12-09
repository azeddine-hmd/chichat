/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      width: {
        '11': '2.8125rem', /* 45px */
      },
      borderColor: {
        separator: {
          xlight: '#3e4047',
          light: '#27292d',
          dark: '#1f2124',
        },
      },
      textColor: { //#1f2124
        icon: '#80848e',
        muted: {
          DEFAULT: '#b5bac1',
          hover: '#fafafa',
          field: '#949BA4',
        },
        foreground: '#dbdee1',
      },
      fill: {
        muted: {
          DEFAULT: '#b5bac1',
          hover: '#fafafa',
          field: '#949BA4',
        },
        foreground: '#dbdee1',
      },
      colors: {
        primary: {
          // DEFAULT: '#5865f2',
          DEFAULT: '#CC5500',
        },
        accent: '#248046',
        secondary: '#313338',
        link: '#00a8fc',
        hover: '#a4a8ac',
        gray: {
          900: '#1e1f22',
          850: '#1f2124',
          800: '#232428',
          700: '#2b2d31',
          600: '#313338',
          500: '#35373c',
        },
        red: {
          500: '#f23f42',
        },
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
      },
    },
  },
  plugins: [],
}
