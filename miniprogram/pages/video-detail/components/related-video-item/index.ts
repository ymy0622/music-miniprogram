Component({
  properties: {
    item: {
      type: Object,
    },
  },
  methods: {
    handleMovieItemClick(e: WechatMiniprogram.BaseEvent) {
      const id = e.currentTarget.dataset.id as number
      wx.redirectTo({
        url: `/pages/video-detail/index?id=${id}`,
      })
    },
  },
})
