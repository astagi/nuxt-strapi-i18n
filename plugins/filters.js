import Vue from 'vue'

Vue.filter(
  'dataFromTimestamp',
  (val, locale) => new Date(val).toLocaleDateString(locale)
)

Vue.filter(
  'serverAbsoluteUrl',
  url => `${process.env.NUXT_ENV_BACKEND_URL}${url}`
)
