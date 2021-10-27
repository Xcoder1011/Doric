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
    },
    doricParentModel: {
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
      const doricStyle: Record<string, string> = {}
      if (this.properties.doricParentModel) {
        let space = 0
        let parentType = this.properties.doricParentModel.nativeViewModel.type

        if (parentType === "VLayout" || parentType === "HLayout") {
          const parentProps = this.properties.doricParentModel.nativeViewModel.props
          if (parentProps.space) {
            space = parentProps.space
          }
        }

        let isLast = false
        for (let index = 0; index < this.properties.doricParentModel.children.length; index++) {
          const element = this.properties.doricParentModel.children[index];
          if (element.nativeViewModel.id === this.properties.doricModel.viewId) {
            if (index == this.properties.doricParentModel.children.length - 1) {
              isLast = true
            }
          }
        }

        if (props.layoutConfig) {
          doricStyle["margin-left"] = toPixelString(props.layoutConfig?.margin?.left || 0)
          if (parentType === "HLayout") {
            doricStyle["margin-right"] = toPixelString(isLast ? 0 : space
              + (props.layoutConfig?.margin?.right || 0))
          } else {
            doricStyle["margin-right"] = toPixelString(props.layoutConfig?.margin?.right || 0)
          }

          doricStyle["margin-top"] = toPixelString(props.layoutConfig?.margin?.top || 0)

          if (parentType === "VLayout") {
            doricStyle["margin-bottom"] = toPixelString(isLast ? 0 : space + (props.layoutConfig?.margin?.bottom || 0))
          } else {
            doricStyle["margin-bottom"] = toPixelString(props.layoutConfig?.margin?.bottom || 0)
          }
        }
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
