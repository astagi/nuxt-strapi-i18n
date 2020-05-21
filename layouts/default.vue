<template>
  <div>
    <b-navbar class="has-shadow is-primary">
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="localePath({ name: 'index' })">
          <img
            src="https://pngimg.com/uploads/jam/jam_PNG93.png"
            alt="Buefy"
            height="28"
          > <span class="blogtitle">JAMBlog</span>
        </b-navbar-item>
      </template>
      <template slot="start">
        <language-switcher />
      </template>
    </b-navbar>
    <section class="main-content">
      <div class="container column is-12">
        <nuxt />
      </div>
    </section>
  </div>
</template>

<script>

import LanguageSwitcher from '~/components/LanguageSwitcher'

export default {
  components: {
    LanguageSwitcher
  },
  data () {
    return {
      items: [
        {
          title: 'Home',
          icon: 'home',
          to: { name: 'index' }
        }
      ]
    }
  },
  head () {
    return this.$nuxtI18nSeo()
  }
}
</script>

<style>
.blogtitle {
  margin-left: 0.5rem;
}
</style>
