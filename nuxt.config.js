module.exports = {
  /*
  ** nuxtのモード設定
  */
  mode: 'universal',
  /*
  ** ヘッダー設定
  */
  head: {
    title: 'TravelWithUs',
    titleTemplate: '%s | TravelWithUs',
    htmlAttrs: {
      prefix: 'og: http://ogp.me/ns#'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', 
        content: 'TravelWithUs is a local-specific SNS that provides a more fulfilling Kanazawa life for travelers visiting Kanazawa.' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'TravelWithUs' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'http://travelwithus.sodeproject.com/' },
      { hid: 'og:title', property: 'og:title', content: 'TravelWithUs' },
      { hid: 'og:description', property: 'og:description', 
        content: 'TravelWithUs is a local-specific SNS that provides a more fulfilling Kanazawa life for travelers visiting Kanazawa.' },
      { hid: 'og:image', property: 'og:image', content: 'http://travelwithus.sodeproject.com/images/ogimg.png' },
      { name: 'google', content: 'notranslate' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: "stylesheet", href: "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" },
    ]
  },
  /*
  ** サーバーのポート設定
  */
  //server: {
  //  port: 3000,
  //  host: '0.0.0.0'
  //},
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  /*
  ** モジュール設定
  */
  modules: [
    [
      'nuxt-i18n',
      {
        locales: [
          { code: 'ja', 
            iso: 'ja_JP',
            name: '日本語'
          },
          { 
            code: 'en', 
            iso: 'en-US',
            name: 'English'
          },
        ],
        defaultLocale: 'en',
        vueI18nLoader: true,
        seo: false,
        strategy: "prefix_and_default",
      }
    ],
    ['nuxt-buefy', {
      css: false,
    }],
    '@nuxtjs/device',
    '@nuxtjs/pwa',
    '@nuxtjs/axios',
    '@nuxtjs/markdownit',
    '@nuxtjs/sitemap',
  ],
  serverMiddleware: [
    '~/server',
  ],
  /*
  ** CSS設定
  */
  css: [
    '~/assets/css/buefy.scss',
  ],
  /*
  ** プラグイン設定
  */
  plugins: [
    { src: '~plugins/vue-lazyload', ssr: false },
    '~/plugins/vue-scrollto'
  ],
  axios: {
  },
  manifest: {
    name: 'TravelWithUs',
    lang: 'en',
    short_name: 'TravelWithUs',
    title: 'TravelWithUs',
    'og:title': 'TravelWithUs',
    description: 'TravelWithUs is a local-specific SNS that provides a more fulfilling Kanazawa life for travelers visiting Kanazawa.',
    'og:description': 'TravelWithUs is a local-specific SNS that provides a more fulfilling Kanazawa life for travelers visiting Kanazawa.',
    theme_color: '#ffffff',
    background_color: '#ffffff',
  },
  workbox: {
    // dev: true, // devモードでPWAを使えるようにする
  },
  markdownit: {
    preset: 'default',
    linkify: true,
    breaks: true,
    use: [
      'markdown-it-div',
      'markdown-it-attrs'
    ]
  },
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000/'
  }
}

