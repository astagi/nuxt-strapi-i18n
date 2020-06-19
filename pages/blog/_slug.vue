<template>
  <section class="section">
    <div class="is-fluid">
      <h2 class="title">{{ post.title }}</h2>
      <h3>{{ post.subtitle }}</h3>

      <img :src="post.cover.url | serverAbsoluteUrl" loading="lazy" alt="..." class="cover">

      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img class="is-rounded" :src="post.post.author.image.url | serverAbsoluteUrl">
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">{{ $t('author') }}: <b>{{ post.post.author.complete_name }}</b></p>
          <p class="subtitle is-6">{{ $t('published') }} <b>{{ post.post.published | dataFromTimestamp }}</b></p>
        </div>
      </div>
      <section class="container content">
        <vue-markdown>{{ post.content }}</vue-markdown>
      </section>
    </div>
  </section>
</template>

<script>

import VueMarkdown from 'vue-markdown'

const getSinglePostFromContext = async ({ app, route, store, payload }) => {
  if (payload) {
    return payload
  }
  const postsData = await app.$blogClient.getSinglePost(
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
<style scoped>
.cover {
  margin-top: 2rem;
  margin-bottom: 2rem;
}
.content {
  margin-top: 2rem;
}
</style>
