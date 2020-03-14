//index.js
import BindingX from '../../bindingx.js'
//获取应用实例
const app = getApp()

Page({
  onReady: function () {
    let options = {
      "eventType": "timing", // 事件类型,目前只支持timing类型
      "props": [ // 运行时参数列表,可选
        {
          "property": "transform.translateY", // 作用的属性
          "expression": "sin(t/ 400) * 4", // 运行时的表达式
        }
      ]
    }
    this.bindingx = BindingX.bind(options, (e) => {
        // e.state start/exit/running
        // e.t 动画时间
        if (e.state === 'running') {
            this.setData({
                animation: this.animation.export()
            })
        } else if (e.state === 'exit') {
            BindingX.unbind({
                token: this.token,
                "eventType": "timing"
            })
        }
    })
    this.animation = this.bindingx.animation
    this.token = this.bindingx.token
  }
})