(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.tmlabs = global.tmlabs || {})));
}(this, (function (exports) { 'use strict';

/* eslint-disable import/extensions */

var IP = 'ip';
var PORT = 'port';



var Constants = Object.freeze({
	IP: IP,
	PORT: PORT
});

var asyncToGenerator = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var TmLabs = function TmLabs(options) {
  var _this = this;

  classCallCheck(this, TmLabs);

  this.fetch = function () {
    var _ref = asyncToGenerator(regeneratorRuntime.mark(function _callee(params) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();

  this.setToken = function (token) {};

  console.log('Constants', Constants);
  console.log('Options', options);
};
var fetch = function fetch(options) {
  var tmLabs = new TmLabs(options);
  return tmLabs.fetch();
};

exports['default'] = TmLabs;
exports.fetch = fetch;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=tmlabs.umd.js.map
