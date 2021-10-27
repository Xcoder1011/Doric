import { LayoutSpec, NativeViewModel, View } from "doric"
import { toPixelString, toRGBAString ,DoricModel} from "../../doric/utils"
import { obtainContext } from "../../doric/context"
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
    subModels: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  lifetimes: {
    attached: function () {
      const doricModel = this.properties.doricModel as DoricModel
      const props = doricModel.nativeViewModel.props as Partial<View>
      const doricStyle: Record<string, string> = doricModel.cssStyle

      if (props.border) {
        doricStyle["border-style"] = "solid"
        doricStyle["border-width"] = toPixelString(props.border.width)
        doricStyle["border-color"] = toRGBAString(props.border.color as unknown as number)
      }
      if (props.padding) {
        doricStyle["padding-left"] = toPixelString(props.padding.left || 0)
        doricStyle["padding-right"] = toPixelString(props.padding.right || 0)
        doricStyle["padding-top"] = toPixelString(props.padding.top || 0)
        doricStyle["padding-bottom"] = toPixelString(props.padding.bottom || 0)
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
          width = toPixelString((props.width || 0)
            - (props.padding?.left || 0)
            - (props.padding?.right || 0)
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
          height = toPixelString((props.height || 0)
            - (props.padding?.top || 0)
            - (props.padding?.bottom || 0)
            - (props.border?.width || 0) * 2)
          break
      }
      doricStyle["height"] = height

      if (props.backgroundColor !== undefined) {
        doricStyle["background-color"] = toRGBAString(props.backgroundColor as unknown as number)
      }
      doricModel.cssStyle = doricStyle
      this.setData({
        doricModel: doricModel,
        type:doricModel.nativeViewModel.type
      })
    }
  }
})
