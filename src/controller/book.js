import axios from 'axios'
import { book } from '../api'

export default {
  // 获取书籍详情
  async getBookInfo(ctx) {
    const bookInfo = await axios.get(book.bookInfo + `/${ctx.params.id}`)
    ctx.body = bookInfo.data
  },

  // 获取书籍相关推荐
  async getRelatedRecommendedBooks(ctx) {
    const relatedBooks = await axios.get(book.relatedRecommendedBooks + `/${ctx.params.id}/recommend`)
    ctx.body = relatedBooks.data
  },

  // 获取作者名下的书籍
  async getAuthorBooks(ctx) {
    if (!ctx.query.author) {
      ctx.throw(400, new Error('you must pass author name to query like { author: xxx }'))
    }
    const bookInfo = await axios.get(book.authorBooks, {
      params: ctx.query
    })
    ctx.body = bookInfo.data
  },

  // 获取书籍章节列表
  async getBookChapters(ctx) {
    if (!ctx.params.id) {
      ctx.throw(400, new Error('book id is required'))
    }
    try {
      const bookChapters = await axios.get(`${book.bookChapters}/${ctx.params.id}`, {
        params: {
          view: 'chapters'
        }
      })
      ctx.body = bookChapters.data
    } catch (err) {
      ctx.status = err.response.status
      ctx.body = {
        msg: 'not found'
      }
    }
  },

  // 获取章节内容
  async getChapterContent(ctx) {
    const chapterContent = await axios.get(`${book.chapterContent}/${encodeURIComponent(ctx.params.link)}`)
    ctx.body = chapterContent.data
  },

  // 获取漫画章节内容
  async getPictureContent(ctx) {
    const pictureContent = await axios.get(`${book.pictureContent}/${encodeURIComponent(ctx.params.link)}`)
    ctx.body = pictureContent.data
  },

  // 书籍搜索
  async getBookSearchResults(ctx) {
    if (!ctx.query.keyword) {
      ctx.throw(400, new Error('you must provide search keyword'))
    }
    const searchResult = await axios.get(book.bookSearch, {
      params: {
        query: ctx.query.keyword
      }
    })
    ctx.body = searchResult.data
  },
  
  // 获取书籍源
  async getBookSources(ctx) {
    if (!ctx.query.book) {
      ctx.throw(400, new Error('未提供书籍id'))
    }
    const bookSources = await axios.get(book.bookSources, {
      params: {
        book: ctx.query.book,
        view: 'summary'
      }
    })
    ctx.body = bookSources.data
  }
}