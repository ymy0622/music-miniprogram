interface IMusicData {
  
}
interface IMusicPage {
  handleSearchClick: () => void
}

Page<IMusicData, IMusicPage>({
  data: {
    
  },
  handleSearchClick() {
    wx.navigateTo({ url: '/pages/search/index' })
  },
  onShow() {
    // 每个tabbar页面都需要调用一下该方法，确保tabbar的选中状态正常
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setActive()
    }
  }
})
