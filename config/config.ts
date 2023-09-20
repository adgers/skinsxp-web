import { defineConfig } from '@umijs/max';
import { join } from 'path';
import postcssGapProperties from 'postcss-gap-properties';

export default defineConfig({
  title: 'Wgskins-Open Case, Win Skins',
  favicons: ['/favicon.ico'],
  model: {},
  initialState: {},
  request: {},
  hash: true,
  history: {
    type: 'browser',
  },
  locale: {
    default: 'en-US',
    antd: true,
    baseNavigator: false,
    baseSeparator: '-',
  },
  metas: [
    {
      name: 'viewport',
      content:
        'viewport-fit=cover, width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1',
    },
    {
      name: 'description',
      content: 'Faster collecting,Lower price,High drop,Fairer,More Rewarding',
    },
    {
      name: 'facebook-domain-verification',
      content: 'jcqton9h0hgwlsuhbcq29ocqoxjzk5',
    },
  ],
  routes: [
    {
      path: '/',
      component: '@/layout/index',
      layout: false,
      routes: [
        {
          path: '/',
          redirect: '/case',
        },
        {
          path: 'case',
          component: 'case',
        },
        {
          path: 'case/:id',
          component: 'case-detail',
        },
        {
          path: 'giveaways',
          component: 'giveaways',
        },
        {
          path: 'giveaways/:id',
          component: 'giveaways/room',
        },
        {
          path: 'battle',
          component: 'battle',
        },
        {
          path: 'battle/create',
          component: 'battle/create',
        },
        {
          path: 'battle/create/:id',
          component: 'battle/create',
        },
        {
          path: 'battle/:id',
          component: 'battle/room',
        },
        {
          path: 'store',
          component: 'shop',
        },
        {
          path: '/deposit',
          component: 'deposit',
        },
        {
          path: '/login',
          component: 'login',
        },
        {
          path: '/login/callback',
          component: 'login/callback',
        },
        {
          path: 'profile',
          component: 'profile',
          routes: [
            {
              path: '/profile',
              redirect: '/profile/bag',
            },
            {
              path: '/profile/bag',
              component: 'profile/bag',
            },
            {
              path: '/profile/record',
              component: 'profile/record',
              routes: [
                {
                  path: '/profile/record',
                  redirect: '/profile/record/flow',
                },
                {
                  path: '/profile/record/flow',
                  component: 'profile/record/flow',
                },
              ],
            },
            {
              path: '/profile/partner',
              component: 'profile/partner',
            },
          ],
        },
        {
          path: '/provably-fair',
          component: 'provablyFair',
          routes: [
            {
              path: '/provably-fair',
              redirect: '/provably-fair/config',
            },
            {
              path: '/provably-fair/config',
              component: 'provablyFair/config',
            },
            {
              path: '/provably-fair/verify',
              component: 'provablyFair/verify',
            },
            {
              path: '/provably-fair/verify/:id',
              component: 'provablyFair/verify',
            },
          ],
        },
        {
          path: '/docs',
          component: 'docs',
          routes: [
            {
              path: '/docs',
              redirect: '/docs/help',
            },
            {
              path: '/docs/help',
              component: 'docs/help',
            },
            {
              path: '/docs/help/:id',
              component: 'docs/help',
            },
            {
              path: '/docs/support',
              component: 'docs/support',
            },
            {
              path: '/docs/support/:id',
              component: 'docs/support',
            },
          ],
        },
        // { path: '/dream', component: 'dream' },
        { path: '/*', component: '@/pages/404' },
      ],
    },
  ],
  npmClient: 'yarn',
  esbuildMinifyIIFE: true,
  headScripts: [
    // 解决首次加载时白屏的问题
    { src: '/scripts/loading.js', async: true },
    { src: 'https://client.crisp.chat/l.js', defer: true, async: true },
    {
      content: `window.$crisp = [];
    window.CRISP_WEBSITE_ID = '341c8e90-8633-4cb8-a31b-37b6a95ddb05';`,
    },
    {
      content: `!function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '1024868335308144');
    fbq('track', 'PageView');
`,
    },
    {
      src: 'https://www.googletagmanager.com/gtag/js?id=G-6LDWG1BWSC',
      async: true,
    },
    {
      content: `window.dataLayer =window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);};
      gtag('js', new Date());
      gtag('config', 'G-6LDWG1BWSC');
      `,
    },
  ],
  presets: ['umi-presets-pro'],
  openAPI: [
    {
      requestLibPath: "import { request } from '@umijs/max'",
      schemaPath: join(__dirname, 'common-api.json'),
      projectName: 'common',
    },
    {
      requestLibPath: "import { request } from '@umijs/max'",
      schemaPath: join(__dirname, 'front-api.json'),
      projectName: 'front',
    },
  ],
  tailwindcss: {},
  extraPostCSSPlugins: [
    postcssGapProperties(),
    require('postcss-import'),
    require('@tailwindcss/nesting')(require('postcss-nesting')),
    require('autoprefixer'),
  ],
});
