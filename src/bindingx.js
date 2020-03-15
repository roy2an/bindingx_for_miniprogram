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

import Parser from './parser/parse'
import Binding from './binding'

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
  resultExpression.transformed = resultExpression.transformed || Parser.parse(resultExpression.origin);
  return resultExpression;
}

export default {
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
    
    return Binding.bind(options, callback, animation)
  },
  unbind(options) {
    if (!options) {
      throw new Error('should pass options for binding');
    }
    return Binding.unbind(options);
  },
  unbindAll() {
    return Binding.unbindAll();
  }
}