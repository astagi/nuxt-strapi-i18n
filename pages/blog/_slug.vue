<template>
  <section class="section">
    <div class="is-fluid">
      <h2>{{ post.title }}</h2>
      <h3>{{ post.subtitle }}</h3>
      <img :src="absoluteCoverImage">
      <div>{{ $t('author') }} <b>{{ post.post.author.complete_name }}</b> {{ $t('published') }} <b>{{ post.post.published | dataFromTimestamp }}</b></div>
      <vue-markdown>{{ post.content }}</vue-markdown>
    </div>
  </section>
</template>

<script>

import VueMarkdown from 'vue-markdown'

const getSinglePostFromContext = async ({ $axios, $payloadURL, app, route, store, payload }) => {
  if (payload) {
    return payload
  }
  let postsData = null
  if (process.static && process.client && $payloadURL) {
    postsData = await $axios.$get($payloadURL(route))
    return postsData.post
  }
  postsData = await app.$blogClient.getSinglePost(
    route.params.slug, store.$i18n.locale
  )
  return postsData.data.transPosts[0]
}

export default {
  name: 'BlogPost',
  components: {
    'vue-markdown': VueMarkdown
  },
  async asyncData (context) {
    const singlePost = await getSinglePostFromContext(context)
    await context.store.dispatch(
      'i18n/setRouteParams',
      Object.fromEntries(singlePost.post.transPosts.map(
        el => [el.lang, { slug: el.slug }])
      )
    )
    return { post: singlePost }
  },
  data () {
    return {
      post: null
    }
  },
  computed: {
    absoluteCoverImage () {
      if (this.post.cover) {
        return `${process.env.NUXT_ENV_BACKEND_URL}${this.post.cover.url}`
      } else {
        return 'https://loremflickr.com/1280/720/computer'
      }
    }
  },
  head () {
    return {
      title: this.post.title,
      meta: [
        { hid: 'og:title', name: 'og:title', content: this.post.title },
        { hid: 'og:image', name: 'og:image', content: this.absoluteCoverImage }
      ]
    }
  }
}
</script>
