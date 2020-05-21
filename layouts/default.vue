<template>
  <div>
    <nav
      class="navbar header has-shadow is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <a
          class="navbar-item"
        >
          <img
            src="https://pngimg.com/uploads/jam/jam_PNG93.png"
            alt="Buefy"
            height="28"
          >
        </a>
      </div>
      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <language-switcher />
          <nuxt-link
            v-for="(item, key) of items"
            :key="key"
            class="navbar-item"
            :to="localePath(item.to)"
            exact-active-class="is-active"
          >{{ item.title }}
          </nuxt-link>
        </div>
      </div>
    </nav>

    <section class="main-content columns">
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
h1, h2 {
  font-weight: bold;
  font-size: xx-large;
}
</style>
