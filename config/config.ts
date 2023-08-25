import { defineConfig } from '@umijs/max';
import { join } from 'path';
import postcssGapProperties from 'postcss-gap-properties';

export default defineConfig({
  model: {},
  initialState: {},
  request: {},
  hash: true,
  history: {
    type: 'browser',
  },
  locale: {
    default: 'en-US',
    baseSeparator: '-',
  },
  metas: [
    {
      name: 'viewport',
      content:
        'viewport-fit=cover, width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, profile-scalable=no',
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
          path: 'battle/:id',
          component: 'battle/room',
        },
        {
          path: 'shop',
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
                  redirect: '/profile/record/game',
                },
                {
                  path: '/profile/record/game',
                  component: 'profile/record/game',
                },
                {
                  path: '/profile/record/take',
                  component: 'profile/record/take',
                },
                {
                  path: '/profile/record/flow',
                  component: 'profile/record/flow',
                },
              ],
            },
            {
              path: '/profile/provably-fair',
              component: 'profile/provablyFair',
              routes: [
                {
                  path: '/profile/provably-fair',
                  redirect: '/profile/provably-fair/config',
                },
                {
                  path: '/profile/provably-fair/config',
                  component: 'profile/provablyFair/config',
                },
                {
                  path: '/profile/provably-fair/verify',
                  component: 'profile/provablyFair/verify',
                },
                {
                  path: '/profile/provably-fair/verify/:id',
                  component: 'profile/provablyFair/verify',
                },
              ],
            },
            {
              path: '/profile/promote',
              component: 'profile/promote',
            },
          ],
        },
        {
          path: '/docs',
          component: 'docs',
          routes: [
            {
              path: '/docs',
              redirect: 'docs/help',
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
        { path: '/*', component: '@/pages/404' },
      ],
    },
  ],
  npmClient: 'yarn',
  esbuildMinifyIIFE: true,
  headScripts: [
    // 解决首次加载时白屏的问题
    { src: '/scripts/loading.js', async: true },
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
