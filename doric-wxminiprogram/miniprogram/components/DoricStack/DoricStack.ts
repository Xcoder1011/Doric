import { NativeViewModel, Stack } from "doric"
import { getChildren } from "../../doric/utils"

// compoents/DoricStack/DoricStack.ts
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
      const nativeViewModel = this.properties.doricModel as NativeViewModel
      const props = nativeViewModel.props as Partial<Stack>
      const doricStyle = this.properties.doricStyle
      const cssStyle = Object.entries(doricStyle).map(e => `${e[0]}:${e[1]}`).join(";")
      this.setData({
        cssStyle,
        children: getChildren(nativeViewModel)
      })
    }
  }
})
