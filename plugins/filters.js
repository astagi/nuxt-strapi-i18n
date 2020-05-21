import Vue from 'vue'

Vue.filter(
  'dataFromTimestamp',
  val => new Date(val).toLocaleDateString()
)

Vue.filter(
  'serverAbsoluteUrl',
  url => `${process.env.NUXT_ENV_BACKEND_URL}${url}`
)
