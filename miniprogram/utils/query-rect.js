export function queryRect(selector) {
  return new Promise((resolve) => {
    const query = wx.createSelectorQuery()
    query.select(selector).boundingClientRect()
    query.exec(resolve)
  })
}

export function queryAllRect(selector) {
  return new Promise((resolve) => {
    const query = wx.createSelectorQuery()
    query.selectAll(selector).boundingClientRect()
    query.exec(resolve)
  })
}