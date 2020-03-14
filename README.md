# README

````
//index.js
import BindingX from '../../bindingx.js'
//获取应用实例
const app = getApp()

Page({
  onReady: function () {
    let options = {
        "eventType": "timing", // 事件类型,目前只支持timing类型
        "exitExpression": "", // 边界条件,可选
        "props": [ // 运行时参数列表,可选
            {
                "element": "", // 作用的元素,已无效
                "property": "transform.translateY", // 作用的属性
                "expression": "sin(t/ 400) * 4", // 运行时的表达式
                "config": { // 额外配置,移至上层
                    "transformOrigin": ""
                }
            }
        ],
        "config": { // 额外配置,从props中转移至此处
            "perspective": 0, // 透视,已无效
            "transformOrigin": "" // 轴心
        }
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

````