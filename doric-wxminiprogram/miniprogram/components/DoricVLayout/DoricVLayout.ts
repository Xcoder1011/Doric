import { NativeViewModel, VLayout } from "doric"
import { LEFT, RIGHT, CENTER_X, CENTER_Y, BOTTOM, TOP, getChildren, DoricModel } from "../../doric/utils"

// compoents/DoricVLayout/DoricVLayout.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    doricModel: {
      type: Object,
      observer:"onUpdate",
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
    onUpdate: function () {
      const doricModel = this.properties.doricModel as DoricModel
      const nativeViewModel = doricModel.nativeViewModel
      const props = nativeViewModel.props as Partial<VLayout>
      const doricStyle = doricModel.cssStyle

      if (props.space) {
        let space = props.space
      }
      if (props.gravity) {
        let gravity = props.gravity as unknown as number
        if ((gravity & LEFT) === LEFT) {
          doricStyle["align-items"] = "flex-start"
        } else if ((gravity & RIGHT) === RIGHT) {
          doricStyle["align-items"] = "flex-end"
        } else if ((gravity & CENTER_X) === CENTER_X) {
          doricStyle["align-items"] = "center"
        }
        if ((gravity & TOP) === TOP) {
          doricStyle["justify-content"] = "flex-start"
        } else if ((gravity & BOTTOM) === BOTTOM) {
          doricStyle["justify-content"] = "flex-end"
        } else if ((gravity & CENTER_Y) === CENTER_Y) {
          doricStyle["justify-content"] = "center"
        }
      }

      const cssStyle = Object.entries(doricStyle).map(e => `${e[0]}:${e[1]}`).join(";")
      this.setData({
        cssStyle,
        children: getChildren(doricModel)
      })
    }
  },
})
