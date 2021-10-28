import { uniqueId } from "doric"
import { createContext } from "../../doric/context"
import { HelloDoric } from "../../doric/HelloDoric"
import { SnakePanel } from "../../doric/Snake"
import { DoricModel } from "../../doric/utils"

const contextId = uniqueId("context")
const context = createContext(contextId, HelloDoric)
const panel = context.entity

const createCallback = Reflect.get(panel, "__onCreate__")
const initCallback = Reflect.get(panel, "__init__")
const buildCallback = Reflect.get(panel, "__build__")
const showCallback = Reflect.get(panel, "__onShow__")
const hideCallback = Reflect.get(panel, "__onHidden__")
const destroyCallback = Reflect.get(panel, "__onDestroy__")

// compoents/DoricPage/DoricPage.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    Reflect.apply(createCallback, panel, [])
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    let query = wx.createSelectorQuery().in(this)
    const self = this
    query.select('.doric-container').boundingClientRect().exec(function (res) {
      const width = res[0].width
      const height = res[0].height
      Reflect.apply(buildCallback, panel, [{ width, height }])
      self.setData({
        doricModel: {
          contextId,
          nativeViewModel: panel.getRootView().toModel(),
          cssStyle: {},
          idList: [panel.getRootView().viewId]
        } as DoricModel
      })
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    Reflect.apply(showCallback, panel, [])
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    Reflect.apply(hideCallback, panel, [])
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    Reflect.apply(destroyCallback, panel, [])
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})