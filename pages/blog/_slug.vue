<template>
  <section class="section">
    <div class="is-fluid">
      <h2>{{ post.title }}</h2>
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
  }
}
</script>
