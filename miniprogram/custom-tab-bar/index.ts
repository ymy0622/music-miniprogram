Component({
  options: {
    styleIsolation: 'shared'
  },
  data: {
    active: 'music',
    color: "#B2B2B2",
    selectedColor: "#21D49B",
    list: [
      {
        key: 'music',
        pagePath: "/pages/music/index",
        text: "音乐",
        icon: "/assets/images/tabbar/music-outlined.svg",
        selectedIcon: "/assets/images/tabbar/music-filled.svg"
      },
      {
        key: 'video',
        pagePath: "/pages/video/index",
        text: "视频",
        icon: "/assets/images/tabbar/video-outlined.svg",
        selectedIcon: "/assets/images/tabbar/video-filled.svg"
      }
    ]
  },
  methods: {
    onChange(e: { detail: string }) {
      const active = e.detail
      const foundTab = this.data.list.find(item => item.key === active)
      if (foundTab) {
        wx.switchTab({ url: foundTab.pagePath });
      }
    },
    setActive() {
      const pages = getCurrentPages()
      const page = pages[pages.length - 1]
      const foundPage = this.data.list.find(item => item.pagePath === `/${page.route}`)
      if (foundPage) {
        this.setData({ active: foundPage.key })
      }
    }
  }
})