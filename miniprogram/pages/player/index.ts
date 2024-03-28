import { Song } from '@/service/song'
import { queryRect, queryAllRect } from '@/utils/query-rect'
import { audioContext, playerStore } from '@/store/index'
import Dialog from '@/miniprogram_npm/@vant/weapp/dialog/dialog'

type Mode = 'sequence' | 'single' | 'random'
const playModeNames: Mode[] = ['sequence', 'single', 'random']

interface IPlayerData {
  maxLyricListHeight: number

  allLyricHeight: number[]

  name: string
  currentSong: Song | null
  durationTime: number
  lyricInfos: {
    time: number
    text: string
  }[]

  currentTime: number
  currentLyricIndex: number
  currentLyricText: string

  isPlaying: boolean
  playingName: 'pause' | 'play'

  playModeIndex: number
  playModeName: Mode

  sliderValue: number
  isSliderChanging: boolean
  lyricScrollTop: number

  isDargLyric: boolean

  playListSongs: Song[]
  showPlaylist: boolean
}
interface IPlayerPage {
  handleModeBtnClick: () => void
  handlePauseBtnClick: () => void
  handleLastBtnClick: () => void
  handleNextBtnClick: () => void
  handleListBtnClick: () => void
  handleCurrentMusicListener: (data: {
    currentSong?: Song
    durationTime?: number
    lyricInfos?: any[]
  }) => void
  setupPlayerStoreListener: () => void
  getAllLyricItemHeight: () => void
  getLyricHeight: () => void
  handleSliderChanging: (e: { detail: { value: number } }) => void
  handleSliderChange: (e: { detail: number }) => void
  handleScrollDargStart: () => void
  handleScrollDargEnd: () => void
}

Page<IPlayerData, IPlayerPage>({
  data: {
    maxLyricListHeight: 0,
    allLyricHeight: [],

    name: '',
    currentSong: null,
    durationTime: 0,
    lyricInfos: [],

    currentTime: 0,
    currentLyricIndex: 0,
    currentLyricText: '',

    isPlaying: false,
    playingName: 'play',

    playModeIndex: 0,
    playModeName: 'sequence',

    sliderValue: 0,
    isSliderChanging: false,
    lyricScrollTop: 0,

    isDargLyric: false,

    playListSongs: [],
    showPlaylist: false,
  },
  onLoad(options: { id: string }) {
    this.getLyricHeight()
    const id = options.id
    if (!id) {
      wx.navigateBack()
      return
    }
    // playerStore.dispatch('playMusicWithSongIdAction', { id: parseInt(id) }) // 测试代码
    this.setupPlayerStoreListener()
  },

  handleModeBtnClick() {
    let playModeIndex = this.data.playModeIndex + 1
    if (playModeIndex === 3) playModeIndex = 0
    playerStore.setState('playModeIndex', playModeIndex)
  },
  handlePauseBtnClick() {
    playerStore.dispatch('changeMusicPlayStatusAction', !this.data.isPlaying)
  },
  handleLastBtnClick: function () {
    playerStore.dispatch('changeNewMusicAction', false)
  },
  handleNextBtnClick: function () {
    playerStore.dispatch('changeNewMusicAction')
  },
  handleListBtnClick() {
    this.setData({ showPlaylist: !this.data.showPlaylist })
  },

  // ========================   数据监听   ========================
  handleCurrentMusicListener: function ({
    currentSong,
    durationTime,
    lyricInfos,
  }) {
    if (currentSong) {
      const fee = currentSong.fee
      if (fee === 1) {
        Dialog.alert({
          message: 'VIP歌曲请移步至网易云APP播放',
          confirmButtonText: '我知道了',
        })
      }
      this.setData({ currentSong, name: currentSong.name ?? '' })
    }
    if (durationTime) this.setData({ durationTime })
    if (lyricInfos) {
      this.setData({ lyricInfos })
      this.getAllLyricItemHeight()
    }
  },

  setupPlayerStoreListener: function () {
    // 1.监听currentSong/durationTime/lyricInfos
    playerStore.onStates(
      ['currentSong', 'durationTime', 'lyricInfos'],
      this.handleCurrentMusicListener
    )

    // 2.监听currentTime/currentLyricIndex/currentLyricText
    playerStore.onStates(
      ['currentTime', 'currentLyricIndex', 'currentLyricText'],
      ({
        currentTime,
        currentLyricIndex,
        currentLyricText,
      }: {
        currentTime: number
        currentLyricIndex: number
        currentLyricText: string
      }) => {
        // 时间变化
        if (currentTime && !this.data.isSliderChanging) {
          const sliderValue = (currentTime / this.data.durationTime) * 100
          this.setData({ currentTime, sliderValue })
        }
        // 歌词变化
        if (currentLyricIndex) {
          this.setData({ currentLyricIndex })
          if (currentLyricIndex <= this.data.allLyricHeight.length) {
            if (!this.data.isDargLyric) {
              let newTop = 0
              for (let i = 0; i < currentLyricIndex; i++) {
                newTop += this.data.allLyricHeight[i]
              }
              this.setData({ lyricScrollTop: newTop })
            }
          }
        }
        if (currentLyricText) {
          this.setData({ currentLyricText })
        }
      }
    )

    // 3.监听播放模式相关的数据
    playerStore.onStates(
      ['playModeIndex', 'isPlaying'],
      ({
        playModeIndex,
        isPlaying,
      }: {
        playModeIndex: number
        isPlaying: boolean
      }) => {
        if (playModeIndex !== undefined) {
          this.setData({
            playModeIndex,
            playModeName: playModeNames[playModeIndex],
          })
        }

        if (isPlaying !== undefined) {
          this.setData({
            isPlaying,
            playingName: isPlaying ? 'pause' : 'play',
          })
        }
      }
    )

    // 4.监听playListSongs
    playerStore.onState('playListSongs', (playListSongs: Song[]) => {
      this.setData({ playListSongs })
    })
  },

  // 获取所有歌词view的高度
  getAllLyricItemHeight() {
    queryAllRect('.lyric-item').then((res) => {
      if (res && res.length) {
        const rects = res[0]
        const heights = rects.map(
          (item: { height: number }) => item.height
        ) as number[]
        this.setData({ allLyricHeight: heights })
      }
    })
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

  handleSliderChanging: function (event) {
    const value = event.detail.value
    const currentTime = (this.data.durationTime * value) / 100
    this.setData({ isSliderChanging: true, currentTime })
  },

  handleSliderChange: function (event) {
    // 1.获取slider变化的值
    const value = event.detail

    // 2.计算需要播放的currentTIme
    const currentTime = (this.data.durationTime * value) / 100

    // 3.设置context播放currentTime位置的音乐
    // audioContext.pause()
    audioContext.seek(currentTime / 1000)

    // 4.记录最新的sliderValue, 并且需要讲isSliderChaning设置回false
    this.setData({ sliderValue: value, isSliderChanging: false })
  },

  // 防止用户主动拖动歌词时仍然会跳转歌词
  handleScrollDargStart() {
    this.data.isDargLyric = true
  },
  handleScrollDargEnd() {
    this.data.isDargLyric = false
  },

  onUnload() {
    playerStore.offStates(
      ['currentSong', 'durationTime', 'lyricInfos'],
      this.handleCurrentMusicListener
    )
  },
})
