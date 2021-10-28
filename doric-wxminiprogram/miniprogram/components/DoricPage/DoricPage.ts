import { uniqueId } from "doric"
import { callEntityMethod, createContext } from "../../doric/context"
import { HelloDoric } from "../../doric/HelloDoric"
import { SnakePanel } from "../../doric/Snake"
import { DoricModel } from "../../doric/utils"

const contextId = uniqueId("context")
const context = createContext(contextId, HelloDoric)
const panel = context.entity


// components/DoricPage/DoricPage.ts
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
    context.hookAfter = () => {
      console.log("hookAfter", panel.getRootView().toModel())
      this.setData({
        doricModel: {
          contextId,
          nativeViewModel: panel.getRootView().toModel(),
          cssStyle: {},
          idList: [panel.getRootView().viewId]
        } as DoricModel
      })
    }
    callEntityMethod(context.id, "__onCreate__")
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    let query = wx.createSelectorQuery().in(this)
    query.select('.doric-container').boundingClientRect().exec(function (res) {
      const width = res[0].width
      const height = res[0].height
      callEntityMethod(context.id, "__build__", { width, height })
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    callEntityMethod(context.id, "__onShow__")
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    callEntityMethod(context.id, "__onHidden__")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    callEntityMethod(context.id, "__onDestroy__")
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