Component({
  options: {
    styleIsolation: 'shared',
  },
  properties: {
    title: {
      type: String,
      value: '多多音乐',
    },
    back: {
      type: Boolean,
      value: false,
    },
    home: {
      type: Boolean,
      value: false,
    },
    theme: {
      type: String,
      value: 'normal', // normal transparent
    },
  },
  data: {},
  methods: {
    handlerGobackClick() {
      const pages = getCurrentPages()
      if (pages.length > 1) {
        wx.navigateBack()
      } else {
        wx.switchTab({ url: '/pages/music/index' })
      }
    },
    handlerGohomeClick() {
      wx.switchTab({ url: '/pages/music/index' })
    },
  },
})
