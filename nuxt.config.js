import BlogClient from './services'
import i18nConfig from './i18n.config'

const LOCALES = [
  {
    code: 'en',
    iso: 'en-US'
  },
  {
    code: 'es',
    iso: 'es-ES'
  },
  {
    code: 'it',
    iso: 'it-IT'
  }
]
const DEFAULT_LOCALE = 'en'
const BASE_URL = process.env.NUXT_ENV_BASE_URL || 'http://localhost:3000'

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/ctx-inject.js',
    '~/plugins/filters.js'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/DreaMinder/nuxt-payload-extractor
    'nuxt-payload-extractor',
    // Doc: https://nuxt-community.github.io/nuxt-i18n/
    'nuxt-i18n',
    // Doc: https://buefy.github.io/#/documentation
    'nuxt-buefy',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/sitemap-module
    '@nuxtjs/sitemap'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  i18n: {
    baseUrl: BASE_URL,
    locales: LOCALES,
    defaultLocale: DEFAULT_LOCALE,
    parsePages: false,
    pages: i18nConfig.pages,
    encodePaths: false,
    seo: false,
    vueI18n: {
      fallbackLocale: DEFAULT_LOCALE,
      messages: i18nConfig.messages
    }
  },
  generate: {
    routes: async () => {
      const client = new BlogClient()
      let routes = []
      let postsData = []
      for (const locale of LOCALES) {
        postsData = await client.getAllPosts(locale.code)
        routes = routes.concat(postsData.data.transPosts.map((post) => {
          return {
            route: `${locale.code === DEFAULT_LOCALE ? '' : '/' + locale.code}${i18nConfig.pages['blog/_slug'][locale.code].replace(':slug', post.slug)}`,
            payload: post
          }
        }))
      }
      return routes
    }
  },
  sitemap: {
    hostname: BASE_URL,
    gzip: true,
    i18n: DEFAULT_LOCALE
  }
}
