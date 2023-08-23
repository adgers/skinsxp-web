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
    },
  },
  plugins: [require('daisyui'), require('@tailwindcss/typography')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#FFFC01',
          secondary: '#25CBD6',
          accent: '#B5C4FF',
          neutral: '#1a1b2b',
          'base-100': '#131314',
          'base-content': '#FAFAFF',
          info: '#285ef0',
          success: '#3BF659',
          warning: '#fac31e',
          error: '#F63B3B',
        },
      },
    ],
  },
};
