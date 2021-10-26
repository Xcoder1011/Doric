import { toPixelString, toRGBAString } from "../../doric/utils"

// compoents/DoricText/DoricText.ts
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
  lifetimes:{
    attached :function(){
      const props = this.properties.doricModel.nativeViewModel.props
      this.setData({
        text:props.text,
        textColor:toRGBAString(props.textColor),
        textSize:toPixelString(props.textSize)
      })
    }
  }
})
