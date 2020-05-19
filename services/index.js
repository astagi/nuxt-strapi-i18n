import { createApolloFetch } from 'apollo-fetch'

export default class BlogClient {
  constructor () {
    this.apolloFetch = createApolloFetch({ uri: process.env.NUXT_ENV_BACKEND_URL })
  }

  getAllPostsHead (lang) {
    const allPostsQuery = `
      query AllPosts($lang: String!) {
        transPosts(where: {lang: $lang}) {
          slug
          title
        }
      }
    `
    return this.apolloFetch({
      query: allPostsQuery,
      variables: {
        lang
      }
    })
  }

  getAllPosts (lang) {
    const allPostsQuery = `
      query AllPosts($lang: String!) {
        transPosts(where: {lang: $lang}) {
          slug
          title
          content
          post {
            published
            transPosts(where: {lang_ne: $lang}) {
              slug
              lang
            }
          }
        }
      }
    `
    return this.apolloFetch({
      query: allPostsQuery,
      variables: {
        lang
      }
    })
  }

  getSinglePost (slug, lang) {
    const simplePostQuery = `
      query Post($slug: String!, $lang: String!) {
        transPosts(where: {slug : $slug, lang: $lang}) {
          slug
          title
          content
          post {
            published
            transPosts(where: {lang_ne: $lang}) {
              slug
              lang
            }
          }
        }
      }
    `
    return this.apolloFetch({
      query: simplePostQuery,
      variables: {
        slug,
        lang
      }
    })
  }
}
