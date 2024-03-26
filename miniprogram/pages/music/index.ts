import { getBanner, Banner } from '@/service/banner'
import { getPlaylist, Playlist, getPlaylistDetail } from '@/service/playlist'
import { getRankingList, RankingList } from '@/service/ranking'
import queryRect from '../../utils/query-rect'

interface IMusicData {
  initLoading: boolean
  swiperHeight: number
  banners: Banner[]
  playlists: Playlist[]
  upRankings: RankingList | null
  hotRankings: RankingList | null
  newRankings: RankingList | null
}
interface IMusicPage {
  fetchGetBanner: () => Promise<void>
  fetchGetPlaylist: () => Promise<void>
  fetchGetRankingList: () => Promise<void>
  fetchGetRankingDetail: (
    data: RankingList,
    type: 'up' | 'hot' | 'new'
  ) => Promise<void>
  handleSearchClick: () => void
  handlePlaylistClick: (e: WechatMiniprogram.BaseEvent) => void
  handleRankingClick: (e: WechatMiniprogram.BaseEvent) => void
  handleSwiperImageLoaded: () => void
}

Page<IMusicData, IMusicPage>({
  data: {
    initLoading: true,

    swiperHeight: 0,
    banners: [], // banner图
    playlists: [], // 热门歌单

    upRankings: null, // 飙升榜
    hotRankings: null, // 热歌榜
    newRankings: null, // 新歌榜
  },
  async onLoad() {
    await this.fetchGetPlaylist()
    await this.fetchGetRankingList()
    await this.fetchGetBanner()
  },
  async fetchGetBanner() {
    const { banners } = await getBanner()
    if (banners) {
      this.setData({ banners })
    }
  },
  async fetchGetPlaylist() {
    const { playlists } = await getPlaylist()
    if (playlists) {
      this.setData({ playlists })
    }
  },
  async fetchGetRankingList() {
    const { list } = await getRankingList()
    if (!list) return
    const upRankings = list.find((item) => item.name === '飙升榜')
    if (upRankings) this.fetchGetRankingDetail(upRankings, 'up')
    const hotRankings = list.find((item) => item.name === '热歌榜')
    if (hotRankings) this.fetchGetRankingDetail(hotRankings, 'hot')
    const newRankings = list.find((item) => item.name === '新歌榜')
    if (newRankings) this.fetchGetRankingDetail(newRankings, 'new')
  },
  async fetchGetRankingDetail(data, type) {
    if (!data?.tracks) {
      const res = await getPlaylistDetail(data.id)
      data.tracks = res.playlist.tracks?.slice(0, 3) || []
    }
    switch (type) {
      case 'up':
        this.setData({ upRankings: data })
        break
      case 'hot':
        this.setData({ hotRankings: data })
        break
      case 'new':
        this.setData({ newRankings: data })
        break
    }
  },
  handleSearchClick() {
    wx.navigateTo({ url: '/pages/search/index' })
  },
  handlePlaylistClick(e) {
    const id = e.currentTarget.dataset.id as number
    if (!id) return
    wx.navigateTo({ url: `/pages/playlist/index?id=${id}` })
  },
  handleRankingClick(e) {
    const id = e.currentTarget.dataset.id as number
    const name = e.currentTarget.dataset.name as string
    if (!id || !name) return
    wx.navigateTo({ url: `/pages/ranks/index?id=${id}&name=${name}` })
  },
  handleSwiperImageLoaded() {
    if (this.data.banners.length > 0 && this.data.swiperHeight !== 0) return
    queryRect('.swiper-image').then((res) => {
      if (res && res.length) {
        const rect = res[0]
        if (rect) {
          this.setData({ swiperHeight: rect.height, initLoading: false })
        }
      }
    })
  },
  onShow() {
    // 每个tabbar页面都需要调用一下该方法，确保tabbar的选中状态正常
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setActive()
    }
  },
})
