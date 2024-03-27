import { getSongDetail, Song } from '@/service/song'
import queryRect from '../../utils/query-rect'

type Mode = 'sequence' | 'single' | 'random'
const playModeNames: Mode[] = ['sequence', 'single', 'random']

interface IPlayerData {
  maxLyricListHeight: number
  currentSong: Song | null

  isPlaying: boolean
  playingName: 'pause' | 'play'

  playModeIndex: number
  playModeName: Mode
}
interface IPlayerPage {
  fetchGetSongDetail: (id: number) => Promise<void>
  handleModeBtnClick: () => void
  handlePauseBtnClick: () => void
  getLyricHeight: () => void
}

Page<IPlayerData, IPlayerPage>({
  data: {
    maxLyricListHeight: 0,
    currentSong: null,

    isPlaying: false,
    playingName: 'play',

    playModeIndex: 0,
    playModeName: 'sequence',
  },
  onLoad(options: { id: string }) {
    this.getLyricHeight()
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
  handleModeBtnClick() {
    let playModeIndex = this.data.playModeIndex + 1
    if (playModeIndex === 3) playModeIndex = 0
    this.setData({
      playModeIndex,
      playModeName: playModeNames[playModeIndex],
    })
  },
  handlePauseBtnClick() {
    const isPlaying = !this.data.isPlaying
    const playingName = isPlaying ? 'pause' : 'play'
    this.setData({ isPlaying, playingName })
  },
  // 获取歌词容器的高度（根据实际高度和歌词行高计算，避免出现显示一半歌词的情况）
  getLyricHeight() {
    setTimeout(() => {
      const pixelRatio = 750 / wx.getSystemInfoSync().windowWidth
      const lyricItemHeight = 60 / pixelRatio
      queryRect('#music-info').then((res) => {
        if (res && res.length) {
          const rect = res[0]
          const multiple = Math.floor(rect.height / lyricItemHeight)
          const maxLyricListHeight =
            (multiple > 3 ? 3 : multiple) * lyricItemHeight
          this.setData({ maxLyricListHeight })
        }
      })
    }, 0)
  },
})
