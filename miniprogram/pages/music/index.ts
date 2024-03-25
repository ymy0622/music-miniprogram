import { getBanner, Banner } from '@/service/banner'
import { getPlaylist, Playlist, getPlaylistDetail } from '@/service/playlist'
import { getRankingList, RankingList } from '@/service/ranking'
import queryRect from '../../utils/query-rect'

interface IMusicData {
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
  handleSearchClick: () => void
  handleSwiperImageLoaded: () => void
}

Page<IMusicData, IMusicPage>({
  data: {
    swiperHeight: 0,
    banners: [], // banner图
    playlists: [], // 热门歌单

    upRankings: null, // 飙升榜
    hotRankings: null, // 热歌榜
    newRankings: null, // 新歌榜
  },
  onLoad() {
    this.fetchGetBanner()
    this.fetchGetPlaylist()
    this.fetchGetRankingList()
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
    const upRankings = list.find((item) => item.name === '飙升榜')
    if (upRankings && !(upRankings?.tracks)) {
      const res =  await getPlaylistDetail(upRankings.id)
      upRankings.tracks = res.playlist.tracks?.slice(0, 3) || []
    }
    const hotRankings = list.find((item) => item.name === '热歌榜')
    if (hotRankings && !(hotRankings?.tracks)) {
      const res =  await getPlaylistDetail(hotRankings.id)
      hotRankings.tracks = res.playlist.tracks?.slice(0, 3) || []
    }
    const newRankings = list.find((item) => item.name === '新歌榜')
    if (newRankings && !(newRankings?.tracks)) {
      const res =  await getPlaylistDetail(newRankings.id)
      newRankings.tracks = res.playlist.tracks?.slice(0, 3) || []
    }
    this.setData({ upRankings, hotRankings, newRankings })
  },
  handleSearchClick() {
    wx.navigateTo({ url: '/pages/search/index' })
  },
  handleSwiperImageLoaded() {
    if (this.data.banners.length > 0 && this.data.swiperHeight !== 0) return
    queryRect('.swiper-image').then((res) => {
      if (res && res.length) {
        const rect = res[0]
        if (rect) this.setData({ swiperHeight: rect.height })
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
