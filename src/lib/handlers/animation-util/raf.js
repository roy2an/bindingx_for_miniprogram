'use strict';

var raf = function(callback) {
    setTimeout(callback, 1000 / 60);
  };

var cancelRAF = clearTimeout;

module.exports = {
  raf,
  cancelRAF
};
