import { playerStore } from '@/store/index'
import {
  getArtist,
  getArtistFollowCount,
  getArtistSong,
} from '@/service/artist'
import type { ArtistData, Song } from '@/service/artist'

interface IArtistData {
  id: null | number
  artist: null | ArtistData
  fansCount: number
  songs: Song[]
  hasMore: boolean
  moreLoading: boolean
}
interface IArtistPage {
  fetchArtist: (id: number) => Promise<void>
  fetchArtistFollowCount: (id: number) => Promise<void>
  fetchArtistSong: (
    id: number,
    order?: 'hot' | 'time',
    offset?: number
  ) => Promise<void>
  handleMore: () => Promise<void>
  handleSongClick: (
    e: WechatMiniprogram.BaseEvent<{}, { index: number }, {}>
  ) => void
}

Page<IArtistData, IArtistPage>({
  data: {
    id: null,
    artist: null,
    fansCount: 0,
    songs: [],
    hasMore: false,
    moreLoading: false,
  },
  onLoad(options: { id: string }) {
    if (!options.id) return
    const id = parseInt(options.id)
    this.setData({ id })
    this.fetchArtist(id)
    this.fetchArtistFollowCount(id)
    this.fetchArtistSong(id)
  },
  async fetchArtist(id) {
    const res = await getArtist(id)
    if (res.code !== 200) return
    this.setData({ artist: res.data })
  },
  async fetchArtistFollowCount(id) {
    const res = await getArtistFollowCount(id)
    if (res.code !== 200) return
    this.setData({ fansCount: res.data.fansCnt })
  },
  async fetchArtistSong(id, order = 'hot', offset = 0) {
    const res = await getArtistSong(id, order, offset)
    if (res.code !== 200) return
    const hasMore = res.more
    const songs = offset === 0 ? res.songs : [...this.data.songs, ...res.songs]
    this.setData({ songs, hasMore })
  },
  async handleMore() {
    if (this.data.id) {
      if (this.data.moreLoading) return
      this.data.moreLoading = true
      wx.showNavigationBarLoading()
      await this.fetchArtistSong(this.data.id, 'hot', this.data.songs.length)
      wx.hideNavigationBarLoading()
      this.data.moreLoading = false
    }
  },
  handleSongClick(e) {
    const index = e.currentTarget.dataset.index
    playerStore.setState('playListSongs', this.data.songs)
    playerStore.setState('playListIndex', index)
  },
})
