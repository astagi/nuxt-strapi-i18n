import BlogClient from '~/services/'

export default ({ app }, inject) => {
  app.$blogClient = new BlogClient()
}
