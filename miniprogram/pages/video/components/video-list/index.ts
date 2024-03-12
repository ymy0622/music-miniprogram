Component({
  properties: {
    data: {
      type: Array,
    },
  },
  methods: {
    handleMovieItemClick(e: WechatMiniprogram.BaseEvent) {
      const id = e.currentTarget.dataset.id as number
      wx.navigateTo({ url: `/pages/video-detail/index?id=${id}` })
    },
  }
})