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
        '8xl': '1800px',
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
        dark: '#161616',
        light: '#636363',
        grey: '#A4A4A4',
        black: '#322D36',
        purple: '#AB6AFC',
      },
    },
  },
  plugins: [require('daisyui'), require('@tailwindcss/typography')],
  daisyui: {
    themes: false,
    styled: false,
  },
};
