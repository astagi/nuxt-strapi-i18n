<template>
  <b-navbar-dropdown :label="$i18n.locale">
    <nuxt-link v-for="locale in availableLocales" :key="locale.code" class="navbar-item" :to="switchLocalePath(locale.code)">
      {{ locale.code }}
    </nuxt-link>
  </b-navbar-dropdown>
</template>

<script>
export default {
  computed: {
    availableLocales () {
      return this.$i18n.locales.filter(locale => locale.code !== this.$i18n.locale.code)
    }
  }
}
</script>
