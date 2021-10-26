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
      console.log(this.properties)
      this.setData({
        doricModel: this.properties.doricModel
      })
    }
  }
})
