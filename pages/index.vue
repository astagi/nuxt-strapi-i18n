<template>
  <section class="section">
    <div class="is-fluid">
      <div v-for="post in posts" :key="post.slug">
        <h1>{{ post.title }}</h1>
        <nuxt-link :to="localePath({name: 'blog-slug', params:{slug: post.slug}})">{{ $t('readmore') }}</nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HomePage',
  async asyncData ({ $axios, $payloadURL, app, route, store }) {
    if (process.static && process.client && $payloadURL) {
      return await $axios.$get($payloadURL(route))
    }
    const postsData = await app.$blogClient.getAllPostsHead(
      store.$i18n.locale
    )
    return { posts: postsData.data.transPosts }
  },
  data () {
    return {
      posts: []
    }
  }
}
</script>
