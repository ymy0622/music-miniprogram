import {
  getPlaylistDetail,
  getPlaylistTracks,
  Privilege,
  Song,
} from '@/service/playlist'
import Dialog from '@/miniprogram_npm/@vant/weapp/dialog/dialog'

interface IPlaylistData {
  hasMore: boolean
  
  id: number | null

  coverImgUrl: string
  name: string
  avatarUrl: string
  nickname: string
  description: string

  songs: Song[]
  privileges: Privilege[]
}
interface IPlaylistPage {
  fetchGetPlaylistDetail: () => Promise<void>
  fetchGetPlaylistTracks: () => Promise<void>
  handleShowDesc: () => void
}

const limit = 20

Page<IPlaylistData, IPlaylistPage>({
  data: {
    hasMore: false,
    id: null,
    name: '',
    coverImgUrl: '',
    avatarUrl: '',
    nickname: '',
    description: '',
    songs: [],
    privileges: [],
  },
  onLoad(options: { id: string }) {
    const id = options.id
    if (!id) {
      wx.navigateBack()
      return
    }
    this.data.id = parseInt(id)
    this.fetchGetPlaylistDetail()
    this.fetchGetPlaylistTracks()
  },
  async fetchGetPlaylistDetail() {
    const id = this.data.id as number
    const { playlist } = await getPlaylistDetail(id)
    if (playlist) {
      this.setData({
        coverImgUrl: playlist.coverImgUrl,
        name: playlist.name,
        avatarUrl: playlist.creator?.avatarUrl,
        nickname: playlist.creator?.nickname,
        description: playlist.description,
      })
    }
  },
  async fetchGetPlaylistTracks() {
    const id = this.data.id as number
    const offset = this.data.songs.length
    const { songs, privileges } = await getPlaylistTracks(id, offset, limit)
    this.data.hasMore = songs.length === limit
    const _songs = offset === 0 ? songs : [...this.data.songs, ...songs]
    const _privileges = offset === 0 ? privileges : [...this.data.privileges, ...privileges]
    this.setData({ songs: _songs, privileges: _privileges })
  },
  handleShowDesc() {
    Dialog.alert({
      title: '多多音乐',
      message: this.data.description,
      confirmButtonText: '关闭',
    })
  },
  onReachBottom: async function() {
    if (!this.data.hasMore) return
    this.fetchGetPlaylistTracks()
  }
})
