// compoents/DoricImage/DoricImage.ts
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
    onload: function(event: any) {
      const doricStyle = this.properties.doricStyle
      if (doricStyle["width"] === "max-content") {
        doricStyle["width"] = `${event.detail.width}px`
      }
      if (doricStyle["height"] === "max-content") {
        doricStyle["height"] = `${event.detail.height}px`
      }

      const cssStyle = Object.entries(doricStyle).map(e => `${e[0]}:${e[1]}`).join(";")
      this.setData({
        cssStyle
      })
    }
  },
  lifetimes: {
    attached: function () {
      const doricStyle = this.properties.doricStyle
      const cssStyle = Object.entries(doricStyle).map(e => `${e[0]}:${e[1]}`).join(";")
      this.setData({
        doricModel: this.properties.doricModel,
        cssStyle
      })
    }
  }
})
