import { toPixelString, toRGBAString } from "../../doric/utils"

// compoents/DoricText/DoricText.ts
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
      if (props.textSize) {
        doricStyle["font-size"] = toPixelString(props.textSize)
      }
      
      if (props.textColor) {
        doricStyle["color"] = toRGBAString(props.textColor)
      }

      const cssStyle = Object.entries(doricStyle).map(e => `${e[0]}:${e[1]}`).join(";")
      this.setData({
        cssStyle,
        text: props.text,
      })
    }
  }
})
