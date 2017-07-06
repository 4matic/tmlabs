(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.tmlabs = global.tmlabs || {})));
}(this, (function (exports) { 'use strict';

/* eslint-disable import/extensions */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};









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

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var TmLabs$1 = function () {
  function TmLabs(options) {
    var _this = this;

    classCallCheck(this, TmLabs);

    this.fetch = function () {
      var _ref = asyncToGenerator(regeneratorRuntime.mark(function _callee(params) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();

    this.doAction = function () {
      var _ref2 = asyncToGenerator(regeneratorRuntime.mark(function _callee2(command) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, _this);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }();

    // console.log('Constants', Constants);
    // console.log('Options', options);
    if (options) {
      try {
        this.token = options.token;
      } catch (e) {
        console.error(e);
      }
    }
  }

  createClass(TmLabs, [{
    key: "token",
    set: function set$$1(token) {
      if (!token) {
        throw new Error("Token is empty!");
      }
      this.token = token;
    },
    get: function get$$1() {
      return this.token;
    }
  }]);
  return TmLabs;
}();

var AbstractCommand = function () {
  function AbstractCommand(action, params) {
    classCallCheck(this, AbstractCommand);

    if (new.target === AbstractCommand) {
      throw new TypeError("Cannot construct AbstractCommand instance directly");
    }
    if (!action) throw new ReferenceError("Empty action string argument");
    if (typeof action !== 'string') throw new ReferenceError("Invalid action type");
    if (!params) throw new ReferenceError("Empty params object argument");
    if ((typeof params === "undefined" ? "undefined" : _typeof(params)) !== 'object') throw new ReferenceError("Invalid params type");
    if (Object.keys(params).length === 0) throw new ReferenceError("Empty params object");
    this.map = new WeakMap();
    this.map.set(this, {
      action: action,
      params: params
    });
  }

  createClass(AbstractCommand, [{
    key: "action",
    set: function set$$1(action) {
      if (!action) {
        throw new Error("Empty action");
      }
      this.map.get(this).action = action;
    },
    get: function get$$1() {
      return this.map.get(this).action;
    }
  }, {
    key: "params",
    get: function get$$1() {
      return this.map.get(this).params;
    },
    set: function set$$1(params) {
      if (!params) {
        throw new Error("Empty params");
      }
      this.map.get(this).params = params;
    }
  }]);
  return AbstractCommand;
}();

var FetchCommand = function (_AbstractCommand) {
  inherits(FetchCommand, _AbstractCommand);

  function FetchCommand(params) {
    classCallCheck(this, FetchCommand);
    return possibleConstructorReturn(this, (FetchCommand.__proto__ || Object.getPrototypeOf(FetchCommand)).call(this, 'fetch', params));
    // throw new TypeError("Empty required param 'method'");
  }

  createClass(FetchCommand, [{
    key: 'do',
    value: function _do() {}
  }]);
  return FetchCommand;
}(AbstractCommand);

var Command = function (_AbstractCommand) {
  inherits(Command, _AbstractCommand);

  function Command(action, params) {
    classCallCheck(this, Command);

    var _this = possibleConstructorReturn(this, (Command.__proto__ || Object.getPrototypeOf(Command)).call(this, action, params));

    if (!_this.instance) {
      throw new TypeError("Action not found");
    }
    return _this;
  }

  createClass(Command, [{
    key: 'do',
    value: function _do() {
      // console.log('command object', this.class);
    }
  }, {
    key: 'class',
    get: function get$$1() {
      var action = this.map.get(this).action;
      return Command.getClass(action);
    }
  }, {
    key: 'instance',
    get: function get$$1() {
      var commandClass = this.class;
      return new commandClass(this.params);
    }
  }], [{
    key: 'getClass',
    value: function getClass() {
      var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!action) throw new ReferenceError("Action param empty");
      switch (action) {
        case 'fetch':
          return FetchCommand;
        default:
          throw new ReferenceError('Action not found');
      }
    }
  }]);
  return Command;
}(AbstractCommand);

var _this = undefined;

//
var fetch = function () {
  var _ref = asyncToGenerator(regeneratorRuntime.mark(function _callee(params) {
    var tmLabs, answer;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            tmLabs = new TmLabs$1();
            _context.next = 3;
            return tmLabs.doAction(new Command('fetch', params));

          case 3:
            answer = _context.sent;
            return _context.abrupt('return', answer);

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  }));

  return function fetch(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports['default'] = TmLabs$1;
exports.TmLabs = TmLabs$1;
exports.fetch = fetch;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=tmlabs.umd.js.map
