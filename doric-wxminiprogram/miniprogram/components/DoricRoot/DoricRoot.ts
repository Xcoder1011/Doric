import { DoricModel, getChildren, toCSSStyle } from "../../doric/utils"

// components/DoricRoot/DoricRoot.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    doricModel: {
      type: Object,
      observer: "onUpdate"
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
      this.setData({
        cssStyle: toCSSStyle(doricModel.cssStyle),
        children: getChildren(doricModel)
      })
    }
  },
})
