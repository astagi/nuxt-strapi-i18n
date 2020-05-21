<template>
  <div>
    <nav
      class="navbar header has-shadow is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <nuxt-link
          class="navbar-item"
          :to="localePath({ name: 'index' })"
        >
          <img
            src="https://pngimg.com/uploads/jam/jam_PNG93.png"
            alt="Buefy"
            height="28"
          > <span class="blogtitle">JAMBlog</span>
        </nuxt-link>
      </div>
      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <language-switcher />
        </div>
      </div>
    </nav>

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
