import { getMovieDetail, getMovieUrl, getRelatedVideos } from '@/service/video-detail'
import type { MVDetail, MVUrl, MVItem } from '@/service/video-detail'

interface IMovieDetailData {
  info: null | MVDetail
  mvUrlInfo: null | MVUrl
  relatedVideos: MVItem[]
}
interface IMovieDetailPage {
  fetchMovieDetail: (id: number) => Promise<void>
  fetchMovieUrl: (id: number, r?: number) => Promise<void>
  fetchRelatedVideo: (id: number) => Promise<void>
  handleMovieItemClick: (e: WechatMiniprogram.BaseEvent) => void
}

Page<IMovieDetailData, IMovieDetailPage>({
  data: {
    info: null,
    mvUrlInfo: null,
    relatedVideos: [],
  },

  onLoad(options) {
    if (!options.id) return
    const id = parseInt(options.id)
    this.fetchMovieDetail(id)
    this.fetchMovieUrl(id)
    this.fetchRelatedVideo(id)
  },

  async fetchMovieDetail(id) {
    const { data } = await getMovieDetail(id)
    if (!data) return
    this.setData({ info: data })
  },

  async fetchMovieUrl(id, r) {
    const { data } = await getMovieUrl(id, r)
    if (!data) return
    this.setData({ mvUrlInfo: data })
  },

  async fetchRelatedVideo(id) {
    const { data = [] } = await getRelatedVideos(id)
    this.setData({ relatedVideos: data })
  },

  handleMovieItemClick(e) {
    const id = e.currentTarget.dataset.id as number
    wx.redirectTo({
      url: `/pages/video-detail/index?id=${id}`,
    })
  },
})
