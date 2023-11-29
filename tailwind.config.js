module.exports = {
  content: [
    './src/pages/**/*.tsx',
    './src/components/**/*.tsx',
    './src/layout/**/*.tsx',
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js',
  ],
  theme: {
    extend: {
      maxWidth: {
        '8xl': '1680px',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      colors: {
        green: '#35F05E',
        purple: '#AB6AFC',
        red: '#ED3838',
        yellow: '#FFEE51',
        blue: '#6DA1AC',
        dark: '#252228',
        light: '#636363',
        gray: '#A4A4A4',
        black: '#161616',
      },
    },
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }
      '2xl': '1536px',
      '1080p': '1920px',
      '2k': '2400px',
      '4k': '3820px',
    },
  },
  plugins: [require('daisyui'), require('@tailwindcss/typography')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#35F05E',
          secondary: '#AB6AFC',
          accent: '#636363',
          neutral: '#161616',
          'base-100': '#252228',
          'base-content': '#ffffff',
          success: '#35F05E',
          error: '#ED3838',
        },
      },
    ],
    styled: true,
  },
};
