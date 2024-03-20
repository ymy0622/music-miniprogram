import { getBanner, Banner } from '@/service/banner'
import { getPlaylist, Playlist } from '@/service/playlist'
import queryRect from '../../utils/query-rect'

interface IMusicData {
  swiperHeight: number
  banners: Banner[]
  playlists: Playlist[]
}
interface IMusicPage {
  fetchGetBanner: () => Promise<void>
  fetchGetPlaylist: () => Promise<void>
  handleSearchClick: () => void
  handleSwiperImageLoaded: () => void
}

Page<IMusicData, IMusicPage>({
  data: {
    swiperHeight: 0,
    banners: [],
    playlists: [],
  },
  onLoad() {
    this.fetchGetBanner()
    this.fetchGetPlaylist()
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
