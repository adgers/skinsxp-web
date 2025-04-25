import { defineConfig } from '@umijs/max';
import { join } from 'path';
import postcssGapProperties from 'postcss-gap-properties';

export default defineConfig({
  title: 'CS:GO Cases | Best drop | skinsxp.com',
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
  links: [
    {
      rel: 'preconnect dns-prefetch',
      href: '//img.wgskins.com',
    },
    {
      rel: 'preconnect dns-prefetch',
      href: '//api.wgskins.com',
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
          path: 'market',
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
          path: '/login/steamCallback',
          component: 'login/callback',
        },
        {
          path: '/login/googleCallback',
          component: 'login/googleCallback',
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
        { path: '/upgrade', component: 'upgrade' },
        // { path: '/event', component: 'event' },
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
        window.CRISP_WEBSITE_ID = '64854b17-ea32-4825-b545-51357071e729';`,
    },
//     {
//       content: `!function(f,b,e,v,n,t,s)
//     {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
//     n.callMethod.apply(n,arguments):n.queue.push(arguments)};
//     if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
//     n.queue=[];t=b.createElement(e);t.async=!0;
//     t.src=v;s=b.getElementsByTagName(e)[0];
//     s.parentNode.insertBefore(t,s)}(window, document,'script',
//     'https://connect.facebook.net/en_US/fbevents.js');
//     fbq('init', '1024868335308144');
//     fbq('track', 'PageView');
// `,
//     },
//     {
//       content: `!function(f,b,e,v,n,t,s)
//     {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
//     n.callMethod.apply(n,arguments):n.queue.push(arguments)};
//     if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
//     n.queue=[];t=b.createElement(e);t.async=!0;
//     t.src=v;s=b.getElementsByTagName(e)[0];
//     s.parentNode.insertBefore(t,s)}(window, document,'script',
//     'https://connect.facebook.net/en_US/fbevents.js');
//     fbq('init', '24009822518665817');
//     fbq('track', 'PageView');
// `,
//     },
//     {
//       content: `!function(f,b,e,v,n,t,s)
//     {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
//     n.callMethod.apply(n,arguments):n.queue.push(arguments)};
//     if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
//     n.queue=[];t=b.createElement(e);t.async=!0;
//     t.src=v;s=b.getElementsByTagName(e)[0];
//     s.parentNode.insertBefore(t,s)}(window, document,'script',
//     'https://connect.facebook.net/en_US/fbevents.js');
//     fbq('init', '328518876380399');
//     fbq('track', 'PageView');
// `,
//     },

    {
      content: `!function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '1315380846220735');
        fbq('track', 'PageView');`
    },

    {
      src: 'https://www.googletagmanager.com/gtag/js?id=G-BLNBZ320RJ',
      async: true,
    },
    // {
    //   src: 'https://www.googletagmanager.com/gtag/js?id=AW-11334119378',
    //   async: true,
    // },
    // gtag('config', 'G-6LDWG1BWSC');
      // gtag('config', 'AW-11366921880');
      // gtag('config', 'AW-11345409756');
      // gtag('config', 'AW-11366618499');
      // gtag('config', 'AW-11379374504',{'allow_enhanced_conversions':true});
      // gtag('config', 'AW-11379263638');
      // gtag('config', 'AW-11394247259');
      // gtag('config', 'AW-11396650696');
      // gtag('config', 'AW-11397467093');
      // gtag('config', 'G-Y7T3FTBJYT');
       // gtag('config', 'AW-11334119378');
    {
      content: `window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
      
        gtag('config', 'G-BLNBZ320RJ');
      `,
    },
    {
      content: `!function (w, d, t) {
        w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++
  )ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=i+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
      
        ttq.load('CKVHRVBC77U0CK807UH0');
        ttq.page();
      }(window, document, 'ttq');
  `,
    },
    // {
    //   src: 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit',
    // },
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
