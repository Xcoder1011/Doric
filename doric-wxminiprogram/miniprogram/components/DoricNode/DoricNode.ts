import { LayoutSpec } from "doric"
import { toPixelString, toRGBAString } from "../../doric/utils"

// compoents/DoricNode.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    doricModel: {
      type: Object
    }
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
      const doricStyle: Record<string, string> = {}
      if (props.layoutConfig && props.layoutConfig.margin) {
        doricStyle["margin-left"] = toPixelString(props.layoutConfig.margin.left || 0)
        doricStyle["margin-right"] = toPixelString(props.layoutConfig.margin.right || 0)
        doricStyle["margin-top"] = toPixelString(props.layoutConfig.margin.top || 0)
        doricStyle["margin-bottom"] = toPixelString(props.layoutConfig.margin.bottom || 0)
      }
      if (props.border) {
        doricStyle["border-style"] = "solid"
        doricStyle["border-width"] = toPixelString(props.border.width)
        doricStyle["border-color"] = toRGBAString(props.border.color)
      }
      if (props.padding) {
        doricStyle["padding-left"] = toPixelString(props.padding.left)
        doricStyle["padding-right"] = toPixelString(props.padding.right)
        doricStyle["padding-top"] = toPixelString(props.padding.top)
        doricStyle["padding-bottom"] = toPixelString(props.padding.bottom)
      }
      let width: string
      const widthSpec = props.layoutConfig?.widthSpec || LayoutSpec.JUST;
      switch (widthSpec) {
        case LayoutSpec.FIT:
          width = "max-content"
          break
        case LayoutSpec.MOST:
          width = "100%"
          break
        case LayoutSpec.JUST:
        default:
          width = toPixelString(props.width || 0
            - props.padding?.left || 0
            - props.padding?.right || 0
            - (props.border?.width || 0) * 2)
          break
      }
      doricStyle["width"] = width
      let height: string
      const heightSpec = props.layoutConfig?.heightSpec || LayoutSpec.JUST;
      switch (heightSpec) {
        case LayoutSpec.FIT:
          height = "max-content"
          break
        case LayoutSpec.MOST:
          height = "100%"
          break
        case LayoutSpec.JUST:
        default:
          height = toPixelString(props.height || 0
            - props.padding?.top || 0
            - props.padding?.bottom || 0
            - (props.border?.width || 0) * 2)
          break
      }
      doricStyle["height"] = height

      if (props.backgroundColor !== undefined) {
        doricStyle["background-color"] = toRGBAString(props.backgroundColor)
      }

      this.setData({
        doricModel: this.properties.doricModel,
        doricStyle,
      })
    }
  }
})
