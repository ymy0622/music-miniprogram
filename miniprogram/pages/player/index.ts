import { getSongDetail, Song } from '@/service/song'

interface IPlayerData {
  currentSong: Song | null
}
interface IPlayerPage {
  fetchGetSongDetail: (id: number) => Promise<void>
}

Page<IPlayerData, IPlayerPage>({
  data: {
    currentSong: null,
  },
  onLoad(options: { id: string }) {
    const id = options.id
    if (!id) {
      wx.navigateBack()
      return
    }
    this.fetchGetSongDetail(parseInt(id))
  },
  onUnload() {},
  async fetchGetSongDetail(id) {
    const res = await getSongDetail(id)
    if (!res || res.songs.length <= 0) return
    this.setData({ currentSong: res.songs[0] })
  },
})
