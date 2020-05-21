import Vue from 'vue'

Vue.filter(
  'dataFromTimestamp',
  val => new Date(val).toLocaleDateString()
)
