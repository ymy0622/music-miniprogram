import { playerStore } from '@/store/index'
import { getPlaylistTracks, Privilege, Song } from '@/service/playlist'

interface IRanksData {
  hasMore: boolean
  id: number | null
  name: string

  songs: Song[]
  privileges: Privilege[]
}
interface IRanksPage {
  fetchGetPlaylistTracks: () => Promise<void>
  handleSongClick: (
    e: WechatMiniprogram.BaseEvent<{}, { index: number }, {}>
  ) => void
}

const limit = 20

Page<IRanksData, IRanksPage>({
  data: {
    hasMore: false,
    id: null,
    name: '',
    songs: [],
    privileges: [],
  },
  async onLoad(options: { id: string; name: string }) {
    const id = options.id
    const name = options.name
    if (!id || !name) {
      wx.navigateBack()
      return
    }
    this.data.id = parseInt(id)
    this.data.name = name
    await this.fetchGetPlaylistTracks()
  },
  async fetchGetPlaylistTracks() {
    const id = this.data.id as number
    const name = this.data.name
    wx.showNavigationBarLoading()
    const offset = this.data.songs.length
    const { songs, privileges } = await getPlaylistTracks(id, offset, limit)
    this.data.hasMore = songs.length === limit
    const _songs = offset === 0 ? songs : [...this.data.songs, ...songs]
    const _privileges =
      offset === 0 ? privileges : [...this.data.privileges, ...privileges]
    this.setData({ name, songs: _songs, privileges: _privileges })
    wx.hideNavigationBarLoading()
  },
  handleSongClick(e) {
    const index = e.currentTarget.dataset.index
    playerStore.setState("playListSongs", this.data.songs)
    playerStore.setState("playListIndex", index)
  },
  onReachBottom: async function () {
    if (!this.data.hasMore) return
    this.fetchGetPlaylistTracks()
  },
})
