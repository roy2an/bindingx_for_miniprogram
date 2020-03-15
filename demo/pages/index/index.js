//index.js
import BindingX from '../../bindingx.js'
//获取应用实例
const app = getApp()

Page({
  onReady: function () {
    // this.animation = wx.createAnimation()
    this.setAnimation({
      "eventType": "timing", // 事件类型,目前只支持timing类型
      "props": [ // 运行时参数列表,可选
        {
          "property": "transform.translateY", // 作用的属性
          "expression": "sin(t/400)*4", // 运行时的表达式
        }
      ]
    })
  },
  rotate: function () {
    this.setAnimation({
      "eventType": "timing", // 事件类型,目前只支持timing类型
      "exitExpression": "t>4000",
      "props": [ // 运行时参数列表,可选
        {
          "property": "transform.rotateZ", // 作用的属性
          "expression": "t/4", // 运行时的表达式
        }
      ]
    })
  },
  scale: function () {
    this.setAnimation({
      "eventType": "timing", // 事件类型,目前只支持timing类型
      "exitExpression": "t>4000",
      "props": [ // 运行时参数列表,可选
        {
          "property": "transform.scale", // 作用的属性
          "expression": "sin(t/300)*1.5 + 1.5", // 运行时的表达式
        }
      ]
    })
  },
  translate: function () {
    this.setAnimation({
      "eventType": "timing", // 事件类型,目前只支持timing类型
      "exitExpression": "t>4000",
      "props": [ // 运行时参数列表,可选
        {
          "property": "transform.translateX", // 作用的属性
          "expression": "sin(t/500)*40", // 运行时的表达式
        }
      ]
    })
  },
  skew: function () {
    this.setAnimation({
      "eventType": "timing", // 事件类型,目前只支持timing类型
      "exitExpression": "t>4000",
      "props": [ // 运行时参数列表,可选
        {
          "property": "transform.skewX", // 作用的属性
          "expression": "sin(t/500)*40", // 运行时的表达式
        }
      ]
    })
  },
  rotateAndScale: function () {
    this.setAnimation({
      "eventType": "timing", // 事件类型,目前只支持timing类型
      "exitExpression": "t>4000",
      "props": [ // 运行时参数列表,可选
        {
          "property": "transform.scale", // 作用的属性
          "expression": "sin(t/300)*1.5 + 1.5", // 运行时的表达式
        },
        {
          "property": "transform.rotateZ", // 作用的属性
          "expression": "t/4", // 运行时的表达式
        }
      ]
    })
  },
  rotateThenScale: function () {
    this.setAnimation({
      "eventType": "timing", // 事件类型,目前只支持timing类型
      "exitExpression": "t>4000",
      "props": [ // 运行时参数列表,可选
        {
          "property": "transform.scale", // 作用的属性
          "expression": "t > 2000 ? sin(t/300)/2 + 1 : sin(2000/300)/2 + 1", // 运行时的表达式
        },
        {
          "property": "transform.rotateZ", // 作用的属性
          "expression": "t < 2000 ? t/4 : 2000/4", // 运行时的表达式
        }
      ]
    })
  },
  reset: function () {
    this.clearAnimation(this.token)
    this.animation.rotate(0, 0)
                  .scale(1)
                  .translateY(0)
                  .skew(0, 0)
                  .step({duration: 0})
    this.setData({animation: this.animation.export()})
  },
  setAnimation (options) {
    this.clearAnimation(this.token)
    let bindingx = BindingX.bind(options, (e) => {
      if (e.state === 'running') {
        this.setData({
          animation: this.animation.export()
        })
      } else if (e.state === 'exit') {
        this.clearAnimation(token)
      }
    })
    this.animation = bindingx.animation
    let token = bindingx.token
    this.token = token
  },
  clearAnimation (token) {
    BindingX.unbind({
      token,
      "eventType": "timing"
    })
  }
})