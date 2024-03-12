import Notify from '@/miniprogram_npm/@vant/weapp/notify/notify'
import { searchSuggest, search, searchMultimatch } from '@/service/search'
import type { SuggestMatch, Artist, Song } from '@/service/search.d'

interface ISearchData {
  value: string
  showAction: boolean

  type: 'empty' | 'suggest' | 'result'

  suggestMatch: SuggestMatch[]
  bestResult: null | Artist
  searchResults: Song[]
  searchType: number
  hasMore: boolean
}
interface ISearchPage {
  fetchSearchSuggest: (value: string) => Promise<void>
  fetchSearch: (value: string, type: number, offset?: number) => Promise<void>
  fetchSearchMultimatch: (value: string) => Promise<void>
  handleSearch: () => void
  handleChange: () => void
  handleCancel: () => void
  handleFocus: () => void
  handleBlur: () => void
  handleClickSuggestItem: (
    e: WechatMiniprogram.BaseEvent<{}, { keyword: string; type: number }, {}>
  ) => void
  handleMore: () => Promise<void>
  gotoArtistDetail: (e:WechatMiniprogram.BaseEvent<{}, {id: number},{}>) => void
}

Page<ISearchData, ISearchPage>({
  data: {
    value: '',
    showAction: true,

    type: 'empty',

    suggestMatch: [],
    bestResult: null,
    searchResults: [],
    searchType: 1,
    hasMore: true,
  },
  async fetchSearchSuggest(value) {
    if (value === '') {
      return this.setData({ type: 'empty' })
    }
    wx.showNavigationBarLoading()
    const res = await searchSuggest({ keywords: value })
    if (res.code !== 200) {
      const { message = '网络错误' } = res
      wx.hideNavigationBarLoading()
      return Notify({ type: 'warning', message: message })
    }
    if (res.result) {
      this.setData({ suggestMatch: res.result.allMatch })
    }
    if (value === '') {
      this.setData({ type: 'empty' })
    } else {
      this.setData({ type: 'suggest' })
    }
    wx.hideNavigationBarLoading()
  },
  async fetchSearch(value, type, offset) {
    const res = await search({ keywords: value, type, offset })
    if (res.code !== 200) {
      const { message = '网络错误' } = res
      return Notify({ type: 'warning', message: message })
    }
    if (res.result) {
      const data = res.result.songs
      const songs = offset === 0 ? data : [...this.data.searchResults, ...data]
      const hasMore =
        res.result.songCount > this.data.searchResults.length ? true : false
      this.setData({ searchResults: songs, hasMore })
    }
  },
  async fetchSearchMultimatch(value) {
    const res = await searchMultimatch(value)
    if (res.code !== 200) {
      const { message = '网络错误' } = res
      this.setData({ bestResult: null })
      return Notify({ type: 'warning', message: message })
    }
    if (res.result.artist && res.result.artist.length > 0) {
      this.setData({ bestResult: res.result.artist[0] })
    } else {
      this.setData({ bestResult: null })
    }
  },
  async handleSearch() {
    const keyword = this.data.value
    if (!keyword) return
    wx.showNavigationBarLoading()
    await this.fetchSearchMultimatch(keyword)
    await this.fetchSearch(keyword, 1, 0)
    this.setData({ type: 'result', searchType: 1 })
    wx.hideNavigationBarLoading()
  },
  handleChange() {
    const value = this.data.value
    this.fetchSearchSuggest(value)
  },
  handleCancel() {
    this.fetchSearchSuggest('')
  },
  handleFocus() {
    this.setData({ showAction: true })
  },
  handleBlur() {
    if (!this.data.value) this.setData({ showAction: false })
  },
  async handleClickSuggestItem(e) {
    const keyword = e.currentTarget.dataset.keyword
    const type = e.currentTarget.dataset.type
    wx.showNavigationBarLoading()
    await this.fetchSearchMultimatch(keyword)
    await this.fetchSearch(keyword, type, 0)
    this.setData({ type: 'result', searchType: type })
    wx.hideNavigationBarLoading()
  },
  async handleMore() {
    wx.showNavigationBarLoading()
    await this.fetchSearch(
      this.data.value,
      this.data.searchType,
      this.data.searchResults.length
    )
    wx.hideNavigationBarLoading()
  },
  gotoArtistDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/artist/index?id=${id}`
    })
  }
})
