import { getTopMV, getPersonalizedMV } from '@/service/video'
import type { MVItem } from '@/service/video'

interface IMovieData {
  tabs: {
    key: string
    name: string
  }[]
  active: string

  savePersonalizedScrollTop: number
  saveMVScrollTop: number
  scrollTop: number

  personalizedMV: MVItem[]
  topMVs: MVItem[]
  hasMore: boolean
}
interface IMoviePage {
  fetchTopMV: (offset: number) => Promise<void>
  fetchPersonalizedMV: () => Promise<void>
  onScrollBottom: () => Promise<void>
  handleTabChange: (data: { detail: { name: string; title: string } }) => void
  handleBeforeTabChange: (data: { detail: { name: string; title: string; callback: (flag: boolean) => void } }) => void
}

Page<IMovieData, IMoviePage>({
  data: {
    tabs: [
      { key: 'personalized', name: '推荐' },
      { key: 'mv', name: 'MV' },
    ],
    active: 'personalized',

    savePersonalizedScrollTop: 0,
    saveMVScrollTop: 0,
    scrollTop: 0,

    personalizedMV: [],
    topMVs: [],
    hasMore: true,
  },

  onReady() {
    this.fetchPersonalizedMV()
  },

  onLoad() {
    this.fetchTopMV(0)
  },

  async fetchTopMV(offset: number) {
    if (!this.data.hasMore) return
    wx.showNavigationBarLoading()
    const { data = [], hasMore = false } = await getTopMV(offset)
    const topMVs = offset === 0 ? data : [...this.data.topMVs, ...data]
    this.setData({ topMVs, hasMore })
    wx.hideNavigationBarLoading()
  },

  async fetchPersonalizedMV() {
    if (!this.data.hasMore) return
    wx.showNavigationBarLoading()
    const { data = [] } = await getPersonalizedMV()
    const personalizedMV = data
    this.setData({ personalizedMV })
    wx.hideNavigationBarLoading()
  },

  handleBeforeTabChange(e) {
    const query = wx.createSelectorQuery()
    query.select('#scroller').scrollOffset()
    query.exec((res) => {
      if (res.length > 0 && res[0].id === 'scroller') {
        const name = e.detail.name
        if (name === 'mv') {
          const savePersonalizedScrollTop = res[0].scrollTop
          this.setData({ savePersonalizedScrollTop })
        } else {
          const saveMVScrollTop = res[0].scrollTop
          this.setData({ saveMVScrollTop })
        }
      }
    })
    e.detail.callback(true)
  },

  handleTabChange(e) {
    const name = e.detail.name
    this.setData({ active: name })
    if (name === 'mv') {
      this.setData({ scrollTop: this.data.saveMVScrollTop })
    } else {
      this.setData({ scrollTop: this.data.savePersonalizedScrollTop })
    }
  },

  async onScrollBottom() {
    if (this.data.active === 'personalized') return
    await this.fetchTopMV(this.data.topMVs.length)
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setActive()
    }
  },
})
