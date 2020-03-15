module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/bindingx.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/binding.js":
/*!************************!*\
  !*** ./src/binding.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_fn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/fn */ "./src/lib/fn.js");
/* harmony import */ var _lib_expression__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/expression */ "./src/lib/expression.js");
/* harmony import */ var _lib_handlers_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/handlers/index */ "./src/lib/handlers/index.js");
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
        this._eventHandler = new _lib_handlers_index__WEBPACK_IMPORTED_MODULE_2__["TimingHandler"](this);
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
    return _lib_expression__WEBPACK_IMPORTED_MODULE_1__["default"].execute(expression, Object.assign(_lib_fn__WEBPACK_IMPORTED_MODULE_0__["default"], params));
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

/* harmony default export */ __webpack_exports__["default"] = ({
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
});

/***/ }),

/***/ "./src/bindingx.js":
/*!*************************!*\
  !*** ./src/bindingx.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _parser_parse__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parser/parse */ "./src/parser/parse.js");
/* harmony import */ var _binding__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./binding */ "./src/binding.js");
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





function formatExpression (expression) {
  if (expression === undefined) return;
  try {
    expression = JSON.parse(expression);
  } catch (err) {

  }
  let resultExpression = {};
  if (typeof expression === 'string') {
    resultExpression.origin = expression;
  } else if (expression) {
    resultExpression.origin = expression.origin;
    resultExpression.transformed = expression.transformed;
  }
  if (!resultExpression.transformed && !resultExpression.origin) return;
  resultExpression.transformed = resultExpression.transformed || _parser_parse__WEBPACK_IMPORTED_MODULE_0__["default"].parse(resultExpression.origin);
  return resultExpression;
}

/* harmony default export */ __webpack_exports__["default"] = ({
  bind (options, callback, animation) {
    if (!options) {
      throw new Error('should pass options for binding');
    }

    options.exitExpression = formatExpression(options.exitExpression);

    if (options.props) {
      options.props.forEach((prop) => {
        prop.expression = formatExpression(prop.expression);
      });
    }
    
    return _binding__WEBPACK_IMPORTED_MODULE_1__["default"].bind(options, callback, animation)
  },
  unbind(options) {
    if (!options) {
      throw new Error('should pass options for binding');
    }
    return _binding__WEBPACK_IMPORTED_MODULE_1__["default"].unbind(options);
  },
  unbindAll() {
    return _binding__WEBPACK_IMPORTED_MODULE_1__["default"].unbindAll();
  }
});

/***/ }),

/***/ "./src/lib/expression.js":
/*!*******************************!*\
  !*** ./src/lib/expression.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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



function toNumber(value) {
  return Number(value);
}

function toBoolean(value) {
  return !!value;
}


function equal(v1, v2) {
  return v1 == v2;
}

function strictlyEqual(v1, v2) {
  return v1 === v2;
}

function execute(node, scope) {

  let type = node.type;
  let children = node.children;
  switch (type) {
    case 'StringLiteral':
      return String(node.value);
    case 'NumericLiteral':
      return parseFloat(node.value);
    case 'BooleanLiteral':
      return !!node.value;
    case 'Identifier':
      return scope[node.value];
    case 'CallExpression':
      let fn = execute(children[0], scope);
      let args = [];
      let jsonArguments = children[1].children;
      for (let i = 0; i < jsonArguments.length; i++) {
        args.push(execute(jsonArguments[i], scope));
      }
      return fn.apply(null, args);
    case '?':
      if (execute(children[0], scope)) {
        return execute(children[1], scope);
      }
      return execute(children[2], scope);
    case '+':
      return toNumber(execute(children[0], scope)) + toNumber(execute(children[1], scope));
    case '-':
      return toNumber(execute(children[0], scope)) - toNumber(execute(children[1], scope));
    case '*':
      return toNumber(execute(children[0], scope)) * toNumber(execute(children[1], scope));
    case '/':
      return toNumber(execute(children[0], scope)) / toNumber(execute(children[1], scope));
    case '%':
      return toNumber(execute(children[0], scope)) % toNumber(execute(children[1], scope));
    case '**':
      return Math.pow(toNumber(execute(children[0], scope)), toNumber(execute(children[1], scope)));

    case '>':
      return toNumber(execute(children[0], scope)) > toNumber(execute(children[1], scope));
    case '<':
      return toNumber(execute(children[0], scope)) < toNumber(execute(children[1], scope));
    case '>=':
      return toNumber(execute(children[0], scope)) >= toNumber(execute(children[1], scope));
    case '<=':
      return toNumber(execute(children[0], scope)) <= toNumber(execute(children[1], scope));

    case '==':
      return equal(execute(children[0], scope), execute(children[1], scope));
    case '===':
      return strictlyEqual(execute(children[0], scope), execute(children[1], scope));
    case '!=':
      return !equal(execute(children[0], scope), execute(children[1], scope));
    case '!==':
      return !strictlyEqual(execute(children[0], scope), execute(children[1], scope));

    case '&&':
      let result;
      result = execute(children[0], scope);
      if (!toBoolean(result))
        return result;
      return execute(children[1], scope);
    case '||':
      result = execute(children[0], scope);
      if (toBoolean(result))
        return result;
      return execute(children[1], scope);
    case '!':
      return !toBoolean(execute(children[0], scope));

  }
  return null;
}

/* harmony default export */ __webpack_exports__["default"] = ({
  execute
});

/***/ }),

/***/ "./src/lib/fn.js":
/*!***********************!*\
  !*** ./src/lib/fn.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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



// inset function
function colorToDecimal(hexColor) {
  let hex = hexColor.replace(/'|"|#/g, '');
  return parseInt(hex, 16);
}

function decToHex(dec) {
  let hex = dec.toString(16);
  let a = [];
  for (let i = 0; i < 6 - hex.length; i++) {
    a.push('0');
  }
  return a.join('') + hex;
}


function parseColor(hexColor) {
  let hex = hexColor.replace(/'|"|#/g, '');
  hex = hex.length === 3 ? [hex[0], hex[0], hex[1], hex[1], hex[2], hex[2]].join('') : hex;
  let r = `${hex[0]}${hex[1]}`;
  let g = `${hex[2]}${hex[3]}`;
  let b = `${hex[4]}${hex[5]}`;
  return {
    r,
    g,
    b,
    dr: colorToDecimal(r),
    dg: colorToDecimal(g),
    db: colorToDecimal(b)
  };
}


let Fn = {
  max: Math.max,
  min: Math.min,
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
  sqrt: Math.sqrt,
  cbrt: Math.cbrt,
  log: Math.log,
  abs: Math.abs,
  atan: Math.atan,
  floor: Math.floor,
  ceil: Math.ceil,
  pow: Math.pow,
  exp: Math.exp,
  PI: Math.PI,
  E: Math.E,
  acos: Math.acos,
  asin: Math.asin,
  sign: Math.sign,
  atan2: Math.atan2,
  round: Math.round,
  rgb: function(r, g, b) {
    return `rgb(${parseInt(r)},${parseInt(g)},${parseInt(b)})`;
  },
  rgba: function(r, g, b, a) {
    return `rgb(${parseInt(r)},${parseInt(g)},${parseInt(b)},${a})`;
  },
  getArgs: function() {
    return arguments;
  },
  evaluateColor: function(colorFrom, colorTo, percent) {
    percent = percent > 1 ? 1 : percent;
    let from = parseColor(colorFrom);
    let to = parseColor(colorTo);
    let dr = parseInt((to.dr - from.dr) * percent + from.dr);
    let dg = parseInt((to.dg - from.dg) * percent + from.dg);
    let db = parseInt((to.db - from.db) * percent + from.db);
    let resDec = dr * 16 * 16 * 16 * 16 + dg * 16 * 16 + db;
    return `#${decToHex(resDec)}`;
  },

  svgDrawCmd: function(index, values, cmd) {
    return {
      index,
      values,
      cmd
    };
  },
  svgDrawCmds: function() {
    return arguments;
  },
  asArray: function() {
    return [...arguments];
  }
};

/* harmony default export */ __webpack_exports__["default"] = (Fn);

/***/ }),

/***/ "./src/lib/handlers/animation-util/bezier.js":
/*!***************************************************!*\
  !*** ./src/lib/handlers/animation-util/bezier.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

const CubicBezier = function(x1, y1, x2, y2) {
  this._cx = 3.0 * x1;
  this._bx = 3.0 * (x2 - x1) - this._cx;
  this._ax = 1.0 - this._cx - this._bx;

  this._cy = 3.0 * y1;
  this._by = 3.0 * (y2 - y1) - this._cy;
  this._ay = 1.0 - this._cy - this._by;
};

CubicBezier.prototype = {
  solve: function(x, epsilon) {
    return this._sampleCurveY(this._solveCurveX(x, epsilon));
  },
  _sampleCurveX: function(t) {
    return ((this._ax * t + this._bx) * t + this._cx) * t;
  },

  _sampleCurveY: function(t) {
    return ((this._ay * t + this._by) * t + this._cy) * t;
  },

  _sampleCurveDerivativeX: function(t) {
    return (3.0 * this._ax * t + 2.0 * this._bx) * t + this._cx;
  },
  // Given an x value, find a parametric value it came from.
  _solveCurveX: function(x, epsilon) {
    var t0, t1, t2, x2, d2, i;
    for (t2 = x, i = 0; i < 8; i++) {
      x2 = this._sampleCurveX(t2) - x;
      if (Math.abs(x2) < epsilon)
        return t2;
      d2 = this._sampleCurveDerivativeX(t2);
      if (Math.abs(d2) < 1e-6)
        break;
      t2 = t2 - x2 / d2;
    }

    // Fall back to the bisection method for reliability.
    t0 = 0.0;
    t1 = 1.0;
    t2 = x;

    if (t2 < t0)
      return t0;
    if (t2 > t1)
      return t1;

    while (t0 < t1) {
      x2 = this._sampleCurveX(t2);
      if (Math.abs(x2 - x) < epsilon)
        return t2;
      if (x > x2)
        t0 = t2;
      else
        t1 = t2;
      t2 = (t1 - t0) * 0.5 + t0;
    }

    // Failure.
    return t2;
  }
};

module.exports = CubicBezier;


/***/ }),

/***/ "./src/lib/handlers/animation-util/easing.js":
/*!***************************************************!*\
  !*** ./src/lib/handlers/animation-util/easing.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var {PI, sin, cos, sqrt, pow} = Math;
var c1 = 1.70158;
var c2 = c1 * 1.525;
var c3 = c1 + 1;
var c4 = ( 2 * PI ) / 3;
var c5 = ( 2 * PI ) / 4.5;

// x is the fraction of animation progress, in the range 0..1
function bounceOut(x) {
  var n1 = 7.5625,
    d1 = 2.75;
  if (x < 1 / d1) {
    return n1 * x * x;
  } else if (x < 2 / d1) {
    return n1 * (x -= (1.5 / d1)) * x + .75;
  } else if (x < 2.5 / d1) {
    return n1 * (x -= (2.25 / d1)) * x + .9375;
  } else {
    return n1 * (x -= (2.625 / d1)) * x + .984375;
  }
}


var Easing = {
  linear: function(x) {
    return x;
  },
  easeInQuad: function(x) {
    return x * x;
  },
  easeOutQuad: function(x) {
    return 1 - ( 1 - x ) * ( 1 - x );
  },
  easeInOutQuad: function(x) {
    return x < 0.5 ?
      2 * x * x :
      1 - pow(-2 * x + 2, 2) / 2;
  },
  easeInCubic: function(x) {
    return x * x * x;
  },
  easeOutCubic: function(x) {
    return 1 - pow(1 - x, 3);
  },
  easeInOutCubic: function(x) {
    return x < 0.5 ?
      4 * x * x * x :
      1 - pow(-2 * x + 2, 3) / 2;
  },
  easeInQuart: function(x) {
    return x * x * x * x;
  },
  easeOutQuart: function(x) {
    return 1 - pow(1 - x, 4);
  },
  easeInOutQuart: function(x) {
    return x < 0.5 ?
      8 * x * x * x * x :
      1 - pow(-2 * x + 2, 4) / 2;
  },
  easeInQuint: function(x) {
    return x * x * x * x * x;
  },
  easeOutQuint: function(x) {
    return 1 - pow(1 - x, 5);
  },
  easeInOutQuint: function(x) {
    return x < 0.5 ?
      16 * x * x * x * x * x :
      1 - pow(-2 * x + 2, 5) / 2;
  },
  easeInSine: function(x) {
    return 1 - cos(x * PI / 2);
  },
  easeOutSine: function(x) {
    return sin(x * PI / 2);
  },
  easeInOutSine: function(x) {
    return -( cos(PI * x) - 1 ) / 2;
  },
  easeInExpo: function(x) {
    return x === 0 ? 0 : pow(2, 10 * x - 10);
  },
  easeOutExpo: function(x) {
    return x === 1 ? 1 : 1 - pow(2, -10 * x);
  },
  easeInOutExpo: function(x) {
    return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ?
          pow(2, 20 * x - 10) / 2 :
          ( 2 - pow(2, -20 * x + 10) ) / 2;
  },
  easeInCirc: function(x) {
    return 1 - sqrt(1 - pow(x, 2));
  },
  easeOutCirc: function(x) {
    return sqrt(1 - pow(x - 1, 2));
  },
  easeInOutCirc: function(x) {
    return x < 0.5 ?
      ( 1 - sqrt(1 - pow(2 * x, 2)) ) / 2 :
      ( sqrt(1 - pow(-2 * x + 2, 2)) + 1 ) / 2;
  },
  easeInElastic: function(x) {
    return x === 0 ? 0 : x === 1 ? 1 :
        -pow(2, 10 * x - 10) * sin(( x * 10 - 10.75 ) * c4);
  },
  easeOutElastic: function(x) {
    return x === 0 ? 0 : x === 1 ? 1 :
        pow(2, -10 * x) * sin(( x * 10 - 0.75 ) * c4) + 1;
  },
  easeInOutElastic: function(x) {
    return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ?
          -( pow(2, 20 * x - 10) * sin(( 20 * x - 11.125 ) * c5)) / 2 :
          pow(2, -20 * x + 10) * sin(( 20 * x - 11.125 ) * c5) / 2 + 1;
  },
  easeInBack: function(x) {
    return c3 * x * x * x - c1 * x * x;
  },
  easeOutBack: function(x) {
    return 1 + c3 * pow(x - 1, 3) + c1 * pow(x - 1, 2);
  },
  easeInOutBack: function(x) {
    return x < 0.5 ?
      ( pow(2 * x, 2) * ( ( c2 + 1 ) * 2 * x - c2 ) ) / 2 :
      ( pow(2 * x - 2, 2) * ( ( c2 + 1 ) * ( x * 2 - 2 ) + c2 ) + 2 ) / 2;
  },
  easeInBounce: function(x) {
    return 1 - bounceOut(1 - x);
  },
  easeOutBounce: bounceOut,
  easeInOutBounce: function(x) {
    return x < 0.5 ?
      ( 1 - bounceOut(1 - 2 * x) ) / 2 :
      ( 1 + bounceOut(2 * x - 1) ) / 2;
  },
  cubicBezier: function() {
  }
};

module.exports = Easing;

/***/ }),

/***/ "./src/lib/handlers/animation-util/index.js":
/*!**************************************************!*\
  !*** ./src/lib/handlers/animation-util/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./timer */ "./src/lib/handlers/animation-util/timer.js");

/***/ }),

/***/ "./src/lib/handlers/animation-util/raf.js":
/*!************************************************!*\
  !*** ./src/lib/handlers/animation-util/raf.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var raf = function(callback) {
    setTimeout(callback, 1000 / 60);
  };

var cancelRAF = clearTimeout;

module.exports = {
  raf,
  cancelRAF
};


/***/ }),

/***/ "./src/lib/handlers/animation-util/timer.js":
/*!**************************************************!*\
  !*** ./src/lib/handlers/animation-util/timer.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var easing = __webpack_require__(/*! ./easing */ "./src/lib/handlers/animation-util/easing.js");
var Bezier = __webpack_require__(/*! ./bezier */ "./src/lib/handlers/animation-util/bezier.js");
var {raf, cancelRAF} = __webpack_require__(/*! ./raf */ "./src/lib/handlers/animation-util/raf.js");


var TYPES = {
  START: 'start',
  END: 'end',
  RUN: 'run',
  STOP: 'stop'
};

var noop = () => {
};

var MIN_DURATION = 1;

function Timer(cfg) {
  this.init(cfg);
}

Timer.prototype = {
  init: function(cfg) {
    this.cfg = Object.assign({
      easing: 'linear',
      duration: Infinity,
      onStart: noop,
      onRun: noop,
      onStop: noop,
      onEnd: noop
    }, cfg);
  },
  run: function() {
    let {duration, onStart, onRun} = this.cfg;
    if (duration <= MIN_DURATION) {
      this.isfinished = true;
      typeof onRun === 'function' ? onRun({percent: 1}) : null;
      this.stop();
    }
    if (this.isfinished) return;
    this._hasFinishedPercent = this._stop && this._stop.percent || 0;
    this._stop = null;
    this.start = Date.now();
    this.percent = 0;
    typeof onStart === 'function' ? onStart({percent: 0, type: TYPES.START}) : null;
    // epsilon determines the precision of the solved values
    let epsilon = (1000 / 60 / duration) / 4;
    let b = this.cfg.bezierArgs;

    if (b && b.length === 4) {
      this.bezier = this.bezier || new Bezier(b[0], b[1], b[2], b[3]);
      this.easingFn = function(x) {
        return this.bezier.solve(x, epsilon);
      };
    } else {
      this.easingFn = easing[this.cfg.easing];
    }

    // this.easingFn = b && b.length === 4 ? this.bezier.solve(epsilon) : easing[this.cfg.easing];
    this._run();
  },

  _run: function() {
    let {onRun, onStop} = this.cfg;
    cancelRAF(this._raf);
    this._raf = raf(() => {
      this.now = Date.now();
      this.t = this.now - this.start;
      this.duration = this.now - this.start >= this.cfg.duration ? this.cfg.duration : this.now - this.start;
      this.progress = this.easingFn(this.duration / this.cfg.duration);
      this.percent = this.duration / this.cfg.duration + this._hasFinishedPercent;
      if (this.percent >= 1 || this._stop) {
        this.percent = this._stop && this._stop.percent ? this._stop.percent : 1;
        this.duration = this._stop && this._stop.duration ? this._stop.duration : this.duration;

        if (!this._stop) {
          typeof onRun === 'function' ? onRun({
            percent: this.progress,
            originPercent: this.percent,
            t: this.t,
            type: TYPES.RUN
          }) : null;
        }
        
        typeof onStop === 'function' ? onStop({
          percent: this.percent,
          t: this.t,
          type: TYPES.STOP
        }) : null;

        if (this.percent >= 1) {
          this.isfinished = true;
          this.stop();
        }
        return;
      }

      typeof onRun === 'function' ? onRun({
        percent: this.progress,
        originPercent: this.percent,
        t: this.t,
        type: TYPES.RUN
      }) : null;

      this._run();
    });
  },

  stop: function() {
    let {onEnd} = this.cfg;
    this._stop = {
      percent: this.percent,
      now: this.now
    };
    typeof onEnd === 'function' ? onEnd({
      percent: 1,
      t: this.t,
      type: TYPES.END
    }) : null;
    cancelRAF(this._raf);
  }
};

Timer.raf = raf;
Timer.cancelRAF = cancelRAF;
module.exports = Timer;






/***/ }),

/***/ "./src/lib/handlers/index.js":
/*!***********************************!*\
  !*** ./src/lib/handlers/index.js ***!
  \***********************************/
/*! exports provided: TimingHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _timing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timing */ "./src/lib/handlers/timing.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TimingHandler", function() { return _timing__WEBPACK_IMPORTED_MODULE_0__["default"]; });




/***/ }),

/***/ "./src/lib/handlers/timing.js":
/*!************************************!*\
  !*** ./src/lib/handlers/timing.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TimingHandler; });
/* harmony import */ var _animation_util_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./animation-util/index */ "./src/lib/handlers/animation-util/index.js");
/* harmony import */ var _animation_util_index__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_animation_util_index__WEBPACK_IMPORTED_MODULE_0__);
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





class TimingHandler {
  constructor(binding) {
    this.binding = binding;
    let {props = [], exitExpression} = this.binding.options;

    props.forEach((prop) => {
      let {expression} = prop;
      if (expression && expression.transformed && typeof expression.transformed === 'string') {
        expression.transformed = JSON.parse(expression.transformed);
      }
    });

    let exitTransformed;
    if (exitExpression && exitExpression.transformed) {
      exitTransformed = JSON.parse(exitExpression.transformed);
    }
    let animation = this.animation = new _animation_util_index__WEBPACK_IMPORTED_MODULE_0___default.a({
      duration: Infinity,
      easing: 'linear',
      onStart: () => {
        this.binding.callback({state: 'start', t: 0});
      },
      onRun: (e) => {
        if (exitTransformed && this.binding.getValue({t: e.t}, exitTransformed)) {
          this.animation.stop();
        }
        let changes = []
        props.forEach((prop) => {
          let change = this.animate({
            exitTransformed,
            t: e.t,
            ...prop
          })
          changes.push(change);
        });
        this.binding.setProperty(changes);
        this.binding.callback({state: 'running', t: e.t - 1000 / 60});
      },
      onStop: (e) => {
        this.binding.callback({state: 'exit', t: e.t - 1000 / 60});
      }
    });
    animation.run();
  }

  animate(args) {
    let {property, expression, t} = args;
    let value = this.binding.getValue({t}, expression.transformed);
    return {property, value}
  }

  destroy() {
    if (this.animation) {
      this.animation.stop();
    }
  }

}

/***/ }),

/***/ "./src/parser/parse.js":
/*!*****************************!*\
  !*** ./src/parser/parse.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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



var lex = {
  InputElementDiv: '<WhiteSpace>|<LineTerminator>|<ReservedWord>|<Identifier>|<NumericLiteral>|<Punctuator>|<StringLiteral>',
  InputElementRegExp: '<WhiteSpace>|<LineTerminator>|<ReservedWord>|<Identifier>|<NumericLiteral>|<Punctuator>|<StringLiteral>',
  ReservedWord: '<Keyword>|<NullLiteral>|<BooleanLiteral>',
  WhiteSpace: /[\t\v\f\u0020\u00A0\u1680\u180E\u2000-\u200A\u202F\u205f\u3000\uFEFF]/,
  LineTerminator: /[\n\r\u2028\u2029]/,
  Keyword: /new(?![_$a-zA-Z0-9])|void(?![_$a-zA-Z0-9])|delete(?![_$a-zA-Z0-9])|in(?![_$a-zA-Z0-9])|instanceof(?![_$a-zA-Z0-9])|typeof(?![_$a-zA-Z0-9])/,
  NullLiteral: /null(?![_$a-zA-Z0-9])/,
  BooleanLiteral: /(?:true|false)(?![_$a-zA-Z0-9])/,
  Identifier: /[_$a-zA-Z][_$a-zA-Z0-9]*/,
  Punctuator: /\/|=>|\*\*|>>>=|>>=|<<=|===|!==|>>>|<<|%=|\*=|-=|\+=|<=|>=|==|!=|\^=|\|=|\|\||&&|&=|>>|\+\+|--|\:|}|\*|&|\||\^|!|~|-|\+|\?|%|=|>|<|,|;|\.(?![0-9])|\]|\[|\)|\(|{/,
  DivPunctuator: /\/=|\//,
  NumericLiteral: /(?:0[xX][0-9a-fA-F]*|\.[0-9]+|(?:[1-9]+[0-9]*|0)(?:\.[0-9]*|\.)?)(?:[eE][+-]{0,1}[0-9]+)?(?![_$a-zA-Z0-9])/,
  StringLiteral: /"(?:[^"\n\\\r\u2028\u2029]|\\(?:['"\\bfnrtv\n\r\u2028\u2029]|\r\n)|\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}|\\[^0-9ux'"\\bfnrtv\n\\\r\u2028\u2029])*"|'(?:[^'\n\\\r\u2028\u2029]|\\(?:['"\\bfnrtv\n\r\u2028\u2029]|\r\n)|\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}|\\[^0-9ux'"\\bfnrtv\n\\\r\u2028\u2029])*'/,
  RegularExpressionLiteral: /\/(?:\[(?:\\[\s\S]|[^\]])*\]|[^*\/\\\n\r\u2028\u2029]|\\[^\n\r\u2028\u2029])(?:\[(?:\\[\s\S]|[^\]])*\]|[^\/\\\n\r\u2028\u2029]|\\[^\n\r\u2028\u2029])*\/[0-9a-zA-Z]*/
};

function XRegExp(xregexps, rootname, flag) {
  var expnames = [rootname];

  function buildRegExp(source) {
    var regexp = new RegExp;
    regexp.compile(source.replace(/<([^>]+)>/g,
      function (all, expname) {
        if (!xregexps[expname])
          return '';
        expnames.push(expname);
        if (xregexps[expname] instanceof RegExp)
          return '(' + xregexps[expname].source + ')';
        return '(' + buildRegExp(xregexps[expname]).source + ')';
      }), flag);
    return regexp;
  }

  var regexp = buildRegExp(xregexps[rootname]);
  this.exec = function (string) {
    var matches = regexp.exec(string);
    if (matches == null)
      return null;
    var result = new String(matches[0]);
    for (var i = 0; i < expnames.length; i++)
      if (matches[i])
        result[expnames[i]] = matches[i];
    return result;
  };
  Object.defineProperty(this, 'lastIndex',
    {
      'get': function () {
        return regexp.lastIndex;
      },
      'set': function (v) {
        regexp.lastIndex = v;
      }
    });
}

function LexicalParser() {
  var inputElementDiv = new XRegExp(lex, 'InputElementDiv', 'g');
  var inputElementRegExp = new XRegExp(lex, 'InputElementRegExp', 'g');
  var source;
  Object.defineProperty(this, 'source', {
    'get': function () {
      return source;
    },
    'set': function (v) {
      source = v;
      inputElementDiv.lastIndex = 0;
      inputElementRegExp.lastIndex = 0;
    }
  });
  this.reset = function () {
    inputElementDiv.lastIndex = 0;
    inputElementRegExp.lastIndex = 0;
  };
  this.getNextToken = function (useDiv) {
    var lastIndex = inputElementDiv.lastIndex;
    var inputElement;
    if (useDiv)
      inputElement = inputElementDiv;
    else
      inputElement = inputElementRegExp;
    var token = inputElement.exec(source);
    if (token && inputElement.lastIndex - lastIndex > token.length) {
      throw new SyntaxError('Unexpected token ILLEGAL');
    }
    inputElementDiv.lastIndex = inputElement.lastIndex;
    inputElementRegExp.lastIndex = inputElement.lastIndex;
    return token;
  };
}

var rules = {
  'IdentifierName': [['Identifier']],
  'Literal': [['NullLiteral'], ['BooleanLiteral'], ['NumericLiteral'], ['StringLiteral'], ['RegularExpressionLiteral']],
  'PrimaryExpression': [['Identifier'], ['Literal'], ['(', 'Expression', ')']],
  'CallExpression': [['PrimaryExpression', 'Arguments'], ['CallExpression', 'Arguments']],
  'Arguments': [['(', ')'], ['(', 'ArgumentList', ')']],
  'ArgumentList': [['ConditionalExpression'], ['ArgumentList', ',', 'ConditionalExpression']],
  'LeftHandSideExpression': [['PrimaryExpression'], ['CallExpression']],
  'UnaryExpression': [['LeftHandSideExpression'], ['void', 'UnaryExpression'], ['+', 'UnaryExpression'], ['-', 'UnaryExpression'], ['~', 'UnaryExpression'], ['!', 'UnaryExpression']],
  'ExponentiationExpression': [['UnaryExpression'], ['ExponentiationExpression', '**', 'UnaryExpression']],
  'MultiplicativeExpression': [['MultiplicativeExpression', '/', 'ExponentiationExpression'], ['ExponentiationExpression'], ['MultiplicativeExpression', '*', 'ExponentiationExpression'], ['MultiplicativeExpression', '%', 'ExponentiationExpression']],
  'AdditiveExpression': [['MultiplicativeExpression'], ['AdditiveExpression', '+', 'MultiplicativeExpression'], ['AdditiveExpression', '-', 'MultiplicativeExpression']],
  'ShiftExpression': [['AdditiveExpression'], ['ShiftExpression', '<<', 'AdditiveExpression'], ['ShiftExpression', '>>', 'AdditiveExpression'], ['ShiftExpression', '>>>', 'AdditiveExpression']],
  'RelationalExpression': [['ShiftExpression'], ['RelationalExpression', '<', 'ShiftExpression'], ['RelationalExpression', '>', 'ShiftExpression'], ['RelationalExpression', '<=', 'ShiftExpression'], ['RelationalExpression', '>=', 'ShiftExpression'], ['RelationalExpression', 'instanceof', 'ShiftExpression'], ['RelationalExpression', 'in', 'ShiftExpression']],
  'EqualityExpression': [['RelationalExpression'], ['EqualityExpression', '==', 'RelationalExpression'], ['EqualityExpression', '!=', 'RelationalExpression'], ['EqualityExpression', '===', 'RelationalExpression'], ['EqualityExpression', '!==', 'RelationalExpression']],
  'BitwiseANDExpression': [['EqualityExpression'], ['BitwiseANDExpression', '&', 'EqualityExpression']],
  'BitwiseXORExpression': [['BitwiseANDExpression'], ['BitwiseXORExpression', '^', 'BitwiseANDExpression']],
  'BitwiseORExpression': [['BitwiseXORExpression'], ['BitwiseORExpression', '|', 'BitwiseXORExpression']],
  'LogicalANDExpression': [['BitwiseORExpression'], ['LogicalANDExpression', '&&', 'BitwiseORExpression']],
  'LogicalORExpression': [['LogicalANDExpression'], ['LogicalORExpression', '||', 'LogicalANDExpression']],
  'ConditionalExpression': [['LogicalORExpression'], ['LogicalORExpression', '?', 'LogicalORExpression', ':', 'LogicalORExpression']],
  'Expression': [['ConditionalExpression'], ['Expression', ',', 'ConditionalExpression']],
  'Program': [['Expression']]

};

function Symbol(symbolName, token) {
  this.name = symbolName;
  this.token = token;
  this.childNodes = [];
  this.toString = function (indent) {
    if (!indent)
      indent = '';
    if (this.childNodes.length == 1)
      return this.childNodes[0].toString(indent);
    var str = indent + this.name + (this.token != undefined && this.name != this.token ? ':' + this.token : '') + '\n';
    for (var i = 0; i < this.childNodes.length; i++)
      str += this.childNodes[i].toString(indent + '    ');
    return str;
  };
}

function SyntacticalParser() {
  var currentRule;
  var root = {
    Program: '$'
  };
  var hash = {};

  function closureNode(node) {

    hash[JSON.stringify(node)] = node;

    var queue = Object.getOwnPropertyNames(node);
    while (queue.length) {
      var symbolName = queue.shift();
      if (!rules[symbolName])
        continue;
      rules[symbolName].forEach(function (rule) {
        if (!node[rule[0]])
          queue.push(rule[0]);
        var rulenode = node;
        var lastnode = null;
        rule.forEach(function (symbol) {
          if (!rulenode[symbol])
            rulenode[symbol] = {};
          lastnode = rulenode;
          rulenode = rulenode[symbol];
        });
        if (node[symbolName].$div)
          rulenode.$div = true;
        rulenode.$reduce = symbolName;
        rulenode.$count = rule.length;
      });
    }

    for (var p in node) {
      if (typeof node[p] != 'object' || p.charAt(0) == '$' || node[p].$closure)
        continue;
      if (hash[JSON.stringify(node[p])])
        node[p] = hash[JSON.stringify(node[p])];
      else {
        closureNode(node[p]);
      }
    }
    node.$closure = true;
  }

  closureNode(root);
  var symbolStack = [];
  var statusStack = [root];
  var current = root;
  this.insertSymbol = function insertSymbol(symbol, haveLineTerminator) {
    while (!current[symbol.name] && current.$reduce) {
      var count = current.$count;
      var newsymbol = new Symbol(current.$reduce);
      while (count--)
        newsymbol.childNodes.push(symbolStack.pop()), statusStack.pop();
      current = statusStack[statusStack.length - 1];
      this.insertSymbol(newsymbol);
    }
    current = current[symbol.name];
    symbolStack.push(symbol), statusStack.push(current);
    if (!current)
      throw new Error();
    return current.$div;
  };
  this.reset = function () {
    current = root;
    symbolStack = [];
    statusStack = [root];
  };
  Object.defineProperty(this, 'grammarTree', {
    'get': function () {
      try {
        while (current.$reduce) {
          var count = current.$count;
          var newsymbol = new Symbol(current.$reduce);
          while (count--)
            newsymbol.childNodes.push(symbolStack.pop()), statusStack.pop();
          current = statusStack[statusStack.length - 1];
          this.insertSymbol(newsymbol);
        }
        if (symbolStack.length > 0 && current[';']) {
          this.insertSymbol(new Symbol(';', ';'));
          return this.grammarTree;
        }
        if (symbolStack.length != 1 || symbolStack[0].name != 'Program')
          throw new Error();
      } catch (e) {
        throw new SyntaxError('Unexpected end of input');
      }
      return symbolStack[0];
    }
  });
}

function Parser() {
  this.lexicalParser = new LexicalParser();
  this.syntacticalParser = new SyntacticalParser();
  var terminalSymbols = ['NullLiteral', 'BooleanLiteral', 'NumericLiteral', 'StringLiteral', 'RegularExpressionLiteral', 'Identifier', '**', '=>', '{', '}', '(', ')', '[', ']', '.', ';', ',', '<', '>', '<=', '>=', '==', '!=', '===', '!==', '+', '-', '*', '%', '++', '--', '<<', '>>', '>>>', '&', '|', '^', '!', '~', '&&', '||', '?', ':', '=', '+=', '-=', '*=', '%=', '<<=', '>>=', '>>>=', '&=', '|=', '^=', '/', '/=', 'instanceof', 'typeof', 'new', 'void', 'debugger', 'this', 'delete', 'in'];
  var terminalSymbolIndex = {};
  terminalSymbols.forEach(function (e) {
    Object.defineProperty(terminalSymbolIndex, e, {});
  });
  this.reset = function () {
    this.lexicalParser.reset();
    this.syntacticalParser.reset();
  };
  this.parse = function (source, onInputElement) {
    var token;
    var haveLineTerminator = false;
    this.lexicalParser.source = source;
    var useDiv = false;
    while (token = this.lexicalParser.getNextToken(useDiv)) {
      if (onInputElement)
        onInputElement(token);
      try {
        if (Object.getOwnPropertyNames(token).some(
            (e) => {
            if (terminalSymbolIndex.hasOwnProperty(e)) {
          useDiv = this.syntacticalParser.insertSymbol(new Symbol(e, token), haveLineTerminator);
          haveLineTerminator = false;
          return true;
        } else
          return false;
      }))
        continue;
        if ((token.Keyword || token.Punctuator || token.DivPunctuator) && terminalSymbolIndex.hasOwnProperty(token.toString())) {
          useDiv = this.syntacticalParser.insertSymbol(new Symbol(token.toString(), token), haveLineTerminator);
        }
      } catch (e) {
        throw new SyntaxError('Unexpected token ' + token);
      }
    }
    return this.syntacticalParser.grammarTree;
  };
}

var parser = new Parser();

function JavaScriptExpression(text) {
  parser.reset();
  this.tree = (parser.parse(text));
  this.paths = [];
  var context = Object.create(null);
  var me = this;
  var pathIndex = Object.create(null);
  this.isSimple;
  this.isConst;
  walk(this.tree);
  checkSimple(this.tree);
  if (this.paths.length === 0) {
    this.isConst = true;
  }
  this.setter = function (path) {
    var curr = context;
    for (var i = 0; i < path.length - 1; i++) {
      if (!curr[path[i]])
        curr[path[i]] = Object.create(null);
      curr = curr[path[i]];
    }
    return {
      isCompleted: function () {
        for (var p in pathIndex)
          if (!pathIndex[p])
            return false;
        return true;
      },
      set: function (value) {
        if (!pathIndex[path.join('.')]) {
          pathIndex[path.join('.')] = true;
        }
        curr[path[i]] = (value);
        if (this.isCompleted()) {
          return me.exec();
        } else {
          return undefined;
        }
      }
    };
  };

  this.valueOf = this.exec = function () {
    try {
      return function () {
        return eval(text);
      }.call(context);
    } catch (e) {
    }
  };

  function checkSimple(symbol) {

    var curr = symbol;
    while (curr.childNodes.length <= 1 && curr.name !== 'MemberExpression') {
      curr = curr.childNodes[0];
    }
    // TODO: need to point out "[……]"
    if (curr.name === 'MemberExpression') {
      me.isSimple = true;
    } else {
      me.isSimple = false;
    }
  }

  function walk(symbol) {
    if (symbol.name === 'CallExpression' && symbol.childNodes[symbol.childNodes.length - 1].name !== 'CallExpression') {
      var path = getPath(symbol.childNodes[1]);
      walk(symbol.childNodes[0]);
    } else if (symbol.name === 'NewExpression' && symbol.childNodes.length === 1) {
      var path = getPath(symbol.childNodes[0]);
    } else if (symbol.name === 'MemberExpression' && symbol.childNodes.length === 1) {
      var path = getPath(symbol);
    } else {
      for (var i = 0; i < symbol.childNodes.length; i++)
        walk(symbol.childNodes[i]);
    }

  }


  function getPath(symbol) {
    // [["PrimaryExpression"], ["MemberExpression", "[", "Expression", "]"], ["MemberExpression", ".", "IdentifierName"], ["new", "MemberExpression", "Arguments"]],

    if (symbol.childNodes[0].name === 'IdentifierName') { // MemberExpression : MemberExpression "." IdentifierName
      var path = getPath(symbol.childNodes[2]);
      if (path)
        path = path.concat(symbol.childNodes[0].childNodes[0].token.toString());
      createPath(path);
      return path;

    } else if (symbol.childNodes[0].name === 'PrimaryExpression') { // MemberExpression : PrimaryExpression
      if (symbol.childNodes[0].childNodes[0].name === 'Identifier') {
        var path = [symbol.childNodes[0].childNodes[0].token.toString()];
        createPath(path);
        return path;
      } else {
        return null;
      }
    } else if (symbol.childNodes[0].name === ']') { // MemberExpression : MemberExpression "[" Expression "]"
      getPath(symbol.childNodes[3]);
      walk(symbol.childNodes[1]);
      return null;

    } else if (symbol.childNodes[0].name === 'Arguments') { // MemberExpression : "new" MemberExpression Arguments
      walk(symbol.childNodes[0]);
      walk(symbol.childNodes[1]);
      return null;
    } else {
      for (var i = 0; i < symbol.childNodes.length; i++)
        walk(symbol.childNodes[i]);
    }
  }


  function createPath(path) {
    var curr = context;
    for (var i = 0; i < path.length - 1; i++) {
      if (!curr[path[i]])
        curr[path[i]] = Object.create(null);
      curr = curr[path[i]];
    }
    me.paths.push(path);
    pathIndex[path.join('.')] = false;
  }
}

function visit(tree) {
  var childNodes = tree.childNodes.slice().reverse();
  var children = childNodes.filter(e =>
    !e.token || !e.token.Punctuator);
  if (tree.name === 'UnaryExpression') {
    // negative number support
    if (childNodes.length === 2 && childNodes[0].name === '-' && children.length === 1) {
      var res = visit(children[0]);
      res.value = -res.value;
      return res;
    }
  }

  if (tree.name === 'Arguments') {
    var argumentList = [];
    var listNode = children[0];
    while (listNode) {
      if (listNode.childNodes.length === 3) {
        argumentList.unshift(listNode.childNodes[0]);
        listNode = listNode.childNodes[2];
      }
      if (listNode.childNodes.length === 1) {
        argumentList.unshift(listNode.childNodes[0]);
        listNode = null;
      }
    }
    return {
      type: 'Arguments',
      children: argumentList.map(e => visit(e))
  };
  }


  if (children && children.length === 1) {
    var res = visit(children[0]);
    return res;
  }

  if (tree.token && ['NullLiteral', 'BooleanLiteral', 'NumericLiteral', 'StringLiteral', 'Identifier'].some(e => tree.token[e])) {
    var type = Object.keys(tree.token).filter(e => e.match(/Literal/) || e.match(/Identifier/))[0];
    var value = {
      'NullLiteral': null,
      'BooleanLiteral': Boolean(tree.token),
      'NumericLiteral': Number(tree.token),
      'StringLiteral': tree.token,
      'Identifier': tree.token,
    }[type];

    return {
      type: type,
      value: value
    };
  }

  if (tree.name === 'CallExpression')
    return {
      type: 'CallExpression',
      children: [visit(childNodes[0]), visit(childNodes[1])]
    };

  return {
    type: childNodes.filter(e => e.token && e.token.Punctuator)[0].name,
    children: childNodes.filter(e => !e.token || !e.token.Punctuator).map(e => visit(e))
};
}

function parse(originExp) {
  var exp = new JavaScriptExpression(originExp);
  return JSON.stringify(visit(exp.tree), null);
}

/* harmony default export */ __webpack_exports__["default"] = ({
  parse
});

/***/ })

/******/ });
//# sourceMappingURL=bindingx.js.map