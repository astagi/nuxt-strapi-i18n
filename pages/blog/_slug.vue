<template>
  <section class="section">
    <div class="is-mobile">
      <h2>{{ post.title }}</h2>
      <p>{{ post.content }}</p>
    </div>
  </section>
</template>

<script>

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
