import { playerStore } from '@/store/index'
import type { Song } from '@/service/song'

Component({
  options: {
    styleIsolation: 'apply-shared',
  },
  properties: {
    song: {
      type: Object,
    },
    privilege: {
      type: Object,
    },
    showIndex: {
      type: Boolean,
    },
    index: {
      type: Number,
    },
  },
  data() {
    currentSong: null
  },
  lifetimes: {
    ready() {
      playerStore.onState('currentSong', (currentSong: Song) => {
        this.setData({ currentSong })
      })
    },
  },
  methods: {
    handleSongClick() {
      const id = this.properties.song.id
      // 1.页面跳转
      wx.navigateTo({
        url: '/pages/player/index?id=' + id,
      })
      // 2.对歌曲的数据请求和其他操作
      playerStore.dispatch('playMusicWithSongIdAction', { id })
    },
  },
})
