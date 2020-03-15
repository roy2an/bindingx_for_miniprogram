/**
 Copyright 2018 Alibaba Group

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
'use strict';

import Fn from './lib/fn'
import Expression from './lib/expression'
import {TimingHandler} from './lib/handlers/index'

class Binding {
  constructor(options, callback, animation) {
    this.options = options;
    this.callback = callback;
    this.token = this.genToken();
    this.animation = animation || this.genAnimation();
    let {eventType} = options;
    switch (eventType) {
      // case 'pan':
      //   this._eventHandler = new PanHandler(this);
      //   break;
      // case 'orientation':
      //   this._eventHandler = new OrientationHandler(this);
      //   break;
      case 'timing':
        this._eventHandler = new TimingHandler(this);
        break;
      // case 'scroll':
      //   this._eventHandler = new ScrollHandler(this);
      //   break;
    }
  }

  genAnimation() {
    let {config} = this.options
    let animation = wx.createAnimation(config||{})
    return animation;
  }

  getValue(params, expression) {
    return Expression.execute(expression, Object.assign(Fn, params));
  }

  genToken() {
    return parseInt(Math.random() * 10000000);
  }

  setProperty(changes) {
    let animation = this.animation
    while (changes.length) {
      let {property, value} = changes.shift()
      let ps = property.split('.')
      let p = ps[ps.length - 1]
      animation = animation[p](value)
    }
    animation.step({duration: 0})
  }

  destroy() {
    this._eventHandler.destroy();
  }

}

export default {
  _bindingInstances: [],
  bind (options, callback, animation) {
    if (!options) {
      throw new Error('should pass options for binding');
    }
    let existInstances = this._bindingInstances.filter((instance) => {
      if (options.anchor) {
        return instance.options.anchor === options.anchor && instance.options.eventType === options.eventType;
      }
    });
    // 销毁上次实例
    if (existInstances) {
      existInstances.forEach((inst) => {
        inst.destroy();
        this._bindingInstances.splice(this._bindingInstances.indexOf(inst), 1)
      });
    }
    let binding = new Binding(options, callback, animation);
    this._bindingInstances.push(binding);
    return {token: binding.token, animation: binding.animation};
  },
  unbind(options) {
    if (!options) {
      throw new Error('should pass options for binding');
    }
    let inst = this._bindingInstances.find((instance) => {
      return instance.options.eventType === options.eventType && instance.token === options.token;
    });
    if (inst) {
      inst.destroy();
    }
  },
  unbindAll() {
    this._bindingInstances.forEach((inst) => {
      inst.destroy({
        eventType: inst.options.eventType,
        token: inst.token
      });
    });
  },
}