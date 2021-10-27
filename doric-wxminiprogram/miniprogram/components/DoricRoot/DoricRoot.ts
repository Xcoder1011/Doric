import { NativeViewModel } from "doric"
import { getChildren, toCSSStyle } from "../../doric/utils"

// compoents/DoricRoot/DoricRoot.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    doricModel: {
      type: Object
    },
    doricStyle: {
      type: Object
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  lifetimes: {
    attached: function () {
      this.setData({
        cssStyle: toCSSStyle(this.properties.doricStyle),
        children: getChildren(this.properties.doricModel as NativeViewModel)
      })
    }
  }
})
