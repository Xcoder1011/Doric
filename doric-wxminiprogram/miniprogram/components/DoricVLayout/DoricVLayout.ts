import { LEFT, RIGHT, CENTER, CENTER_X, CENTER_Y, BOTTOM, TOP } from "../../doric/utils"

// compoents/DoricVLayout/DoricVLayout.ts
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
      const props = this.properties.doricModel.nativeViewModel.props
      const doricStyle = this.properties.doricStyle

      if (props.space) {
        let space = props.space
      }
      if (props.gravity) {
        let gravity = props.gravity
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
        doricModel: this.properties.doricModel,
        cssStyle
      })
    }
  }
})
