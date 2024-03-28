import { HYEventStore } from 'hy-event-store'
import { getSongDetail, getSongLyric } from '@/service/song'
import { parseLyric } from '@/utils/parse-lyric'

// const audioContext = wx.createInnerAudioContext() // audioContext
const audioContext = wx.getBackgroundAudioManager()

const playerStore = new HYEventStore({
  state: {
    isFirstPlay: true,
    isStoping: false,

    id: 0,
    currentSong: {},
    durationTime: 0,
    lyricInfos: [],

    currentTime: 0,
    currentLyricIndex: 0,
    currentLyricText: '',

    isPlaying: false,

    playModeIndex: 0, // 0: 循环播放 1: 单曲循环 2: 随机播放
    playListSongs: [],
    playListIndex: 0,
  },
  actions: {
    async playMusicWithSongIdAction(ctx: any, { id, isRefresh = false }: any) {
      if (ctx.id == id && !isRefresh) {
        this.dispatch('changeMusicPlayStatusAction', true)
        return
      }
      ctx.id = id

      // 0.修改播放的状态
      ctx.currentSong = {}
      ctx.durationTime = 0
      ctx.lyricInfos = []
      ctx.currentTime = 0
      ctx.currentLyricIndex = 0
      ctx.currentLyricText = ''

      // 1.根据id请求数据
      // 请求歌曲详情
      const { songs } = await getSongDetail(id)
      // this.setState('playListSongs', songs) // 测试代码
      // this.setState('playListIndex', 0) // 测试代码
      ctx.currentSong = songs[0]
      ctx.durationTime = songs[0].dt

      // 请求歌词数据
      const { lrc } = await getSongLyric(id)
      const lyricString = lrc.lyric
      const lyrics = parseLyric(lyricString)
      ctx.lyricInfos = lyrics

      // 2.播放对应id的歌曲
      audioContext.stop()
      audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
      audioContext.title = ctx.currentSong.name
      audioContext.epname = ctx.currentSong.al.name
      audioContext.singer = ctx.currentSong.ar.map((item: any) => item.name).join('/')
      audioContext.coverImgUrl = ctx.currentSong.al.picUrl
      audioContext.onCanplay(() => {
        audioContext.play()
      })

      // 3.监听audioContext一些事件
      if (ctx.isFirstPlay) {
        this.dispatch('setupAudioContextListenerAction')
        ctx.isFirstPlay = false
      }
    },

    setupAudioContextListenerAction(ctx: any) {
      // 1.监听歌曲可以播放
      audioContext.onCanplay(() => {
        audioContext.play()
      })

      // 2.监听时间改变
      audioContext.onTimeUpdate(() => {
        // 1.获取当前时间
        const currentTime = audioContext.currentTime * 1000

        // 2.根据当前时间修改currentTime
        ctx.currentTime = currentTime

        // 3.根据当前时间去查找播放的歌词
        if (!ctx.lyricInfos.length) return
        let i = 0
        for (; i < ctx.lyricInfos.length; i++) {
          const lyricInfo = ctx.lyricInfos[i]
          if (currentTime < lyricInfo.time) {
            break
          }
        }
        // 设置当前歌词的索引和内容
        const currentIndex = i - 1
        if (ctx.currentLyricIndex !== currentIndex) {
          const currentLyricInfo = ctx.lyricInfos[currentIndex]
          ctx.currentLyricIndex = currentIndex
          ctx.currentLyricText = currentLyricInfo.text
        }
      })

      // 3.监听歌曲播放完成
      audioContext.onEnded(() => {
        this.dispatch('changeNewMusicAction')
      })

      // 4.监听音乐暂停/播放/停止/失败
      audioContext.onPlay(() => {
        ctx.isPlaying = true
      })
      audioContext.onPause(() => {
        ctx.isPlaying = false
      })
      audioContext.onStop(() => {
        ctx.isPlaying = false
        ctx.isStoping = true
      })
      audioContext.onError(() => {
        ctx.isPlaying = false
        ctx.isStoping = true
      })
      audioContext.onNext(() => {
        this.dispatch('changeNewMusicAction')
      })
      audioContext.onPrev(() => {
        this.dispatch('changeNewMusicAction', false)
      })
    },

    changeMusicPlayStatusAction(ctx: any, isPlaying = true) {
      if (isPlaying && ctx.isStoping) {
        audioContext.src = `https://music.163.com/song/media/outer/url?id=${ctx.id}.mp3`
        audioContext.title = ctx.currentSong?.name ?? ''
        audioContext.epname = ctx.currentSong.al.name
        audioContext.singer = ctx.currentSong.ar.map((item: any) => item.name).join('/')
        audioContext.coverImgUrl = ctx.currentSong.al.picUrl
        audioContext.startTime = ctx.currentTime / 1000
        ctx.isStoping = false
      }
      isPlaying ? audioContext.play() : audioContext.pause()
    },

    changeNewMusicAction(ctx: any, isNext = true) {
      // 1.获取当前索引
      let index = ctx.playListIndex

      // 2.根据不同的播放模式, 获取下一首歌的索引
      switch (ctx.playModeIndex) {
        case 0: // 顺序播放
          index = isNext ? index + 1 : index - 1
          if (index === -1) index = ctx.playListSongs.length - 1
          if (index === ctx.playListSongs.length) index = 0
          break
        case 1: // 单曲循环
          break
        case 2: // 随机播放
          index = Math.floor(Math.random() * ctx.playListSongs.length)
          break
      }

      // 3.获取歌曲
      let currentSong = ctx.playListSongs[index]
      if (!currentSong) {
        currentSong = ctx.currentSong
      } else {
        // 记录最新的索引
        ctx.playListIndex = index
      }

      // 4.播放新的歌曲
      this.dispatch('playMusicWithSongIdAction', {
        id: currentSong.id,
        isRefresh: true,
      })
    },
  },
})

export { audioContext, playerStore }
