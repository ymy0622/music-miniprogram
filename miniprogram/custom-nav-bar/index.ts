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
  data: {
    menuRight: '', // 右上角胶囊按钮距离屏幕右边的距离
  },
  lifetimes: {
    ready() {
      // 获取系统信息
      const systemInfo = wx.getSystemInfoSync()
      // 胶囊按钮位置信息
      const menuButtonInfo = wx.getMenuButtonBoundingClientRect()
      const menuRight = systemInfo.screenWidth - menuButtonInfo.right + 'px'
      this.setData({ menuRight })
    },
  },
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
