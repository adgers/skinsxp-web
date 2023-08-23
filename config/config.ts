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
        'viewport-fit=cover, width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no',
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
          redirect: '/home',
        },
        {
          path: 'home',
          component: 'home',
        },
        {
          path: 'case/:id',
          component: 'box',
        },
        {
          path: 'roll',
          component: 'roll',
        },
        {
          path: 'roll/:id',
          component: 'roll/room',
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
          path: 'mall',
          component: 'mall',
        },
        {
          path: 'dream',
          component: 'dream',
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
          path: 'user',
          component: 'user',
          routes: [
            {
              path: '/user',
              redirect: '/user/info',
            },
            {
              path: '/user/info',
              component: 'user/info',
            },
            {
              path: '/user/bag',
              component: 'user/bag',
            },
            {
              path: '/user/record',
              component: 'user/record',
              routes: [
                {
                  path: '/user/record',
                  redirect: '/user/record/game',
                },
                {
                  path: '/user/record/game',
                  component: 'user/record/game',
                },
                {
                  path: '/user/record/take',
                  component: 'user/record/take',
                },
                {
                  path: '/user/record/flow',
                  component: 'user/record/flow',
                },
              ],
            },
            {
              path: '/user/provably-fair',
              component: 'user/provablyFair',
              routes: [
                {
                  path: '/user/provably-fair',
                  redirect: '/user/provably-fair/config',
                },
                {
                  path: '/user/provably-fair/config',
                  component: 'user/provablyFair/config',
                },
                {
                  path: '/user/provably-fair/verify',
                  component: 'user/provablyFair/verify',
                },
                {
                  path: '/user/provably-fair/verify/:id',
                  component: 'user/provablyFair/verify',
                },
              ],
            },
            {
              path: '/user/docs',
              component: 'user/docs',
              routes: [
                {
                  path: '/user/docs',
                  redirect: '/user/docs/help',
                },
                {
                  path: '/user/docs/help',
                  component: 'user/docs/help',
                },
                {
                  path: '/user/docs/help/:id',
                  component: 'user/docs/help',
                },
                {
                  path: '/user/docs/support',
                  component: 'user/docs/support',
                },
                {
                  path: '/user/docs/support/:id',
                  component: 'user/docs/support',
                },
              ],
            },
            {
              path: '/user/vip',
              component: 'user/vip',
            },
            {
              path: '/user/promote',
              component: 'user/promote',
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
