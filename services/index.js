import { createApolloFetch } from 'apollo-fetch'

export default class BlogClient {
  constructor () {
    this.apolloFetch = createApolloFetch({ uri: `${process.env.NUXT_ENV_BACKEND_URL}/graphql` })
  }

  getAllPostsHead (lang) {
    const allPostsQuery = `
      query AllPosts($lang: String!) {
        transPosts(where: {lang: $lang}) {
          slug
          title,
          post {
            published
            author {
              complete_name
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

  getAllPosts (lang) {
    const allPostsQuery = `
      query AllPosts($lang: String!) {
        transPosts(where: {lang: $lang}) {
          slug
          title
          subtitle
          content
          cover {
            url
          }
          post {
            published
            author {
              complete_name
              image {
                url
              }
            }
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
          subtitle
          content
          cover {
            url
          }
          post {
            published
            author {
              complete_name,
              image {
                url
              }
            }
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
