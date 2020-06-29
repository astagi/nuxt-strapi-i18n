<template>
  <section class="section">
    <article v-for="post in posts" :key="post.slug" class="container is-fluid">
      <h2 class="title">{{ post.title }}</h2>
      <div>{{ $t('author') }} <b>{{ post.post.author.complete_name }}</b></div>
      <client-only>
        <div>{{ $t('published') }} <b>{{ post.post.published | dataFromTimestamp($i18n.locale) }}</b></div>
      </client-only>
      <nuxt-link :to="localePath({name: 'blog-slug', params:{slug: post.slug}})">{{ $t('readmore') }}</nuxt-link>
    </article>
  </section>
</template>

<script>
export default {
  name: 'HomePage',
  async asyncData ({ app, route, store }) {
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
<style scoped>
article {
  margin-bottom: 2rem;
}
</style>
