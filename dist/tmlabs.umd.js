(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.tmlabs = global.tmlabs || {})));
}(this, (function (exports) { 'use strict';

/* eslint-disable import/extensions */

var IP = 'ip';
var PORT = 'port';

var endpoints = Object.freeze({
	IP: IP,
	PORT: PORT
});

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

(function (self) {
  'use strict';

  if (self.fetch) {
    return;
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && function () {
      try {
        new Blob();
        return true;
      } catch (e) {
        return false;
      }
    }(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  };

  if (support.arrayBuffer) {
    var viewClasses = ['[object Int8Array]', '[object Uint8Array]', '[object Uint8ClampedArray]', '[object Int16Array]', '[object Uint16Array]', '[object Int32Array]', '[object Uint32Array]', '[object Float32Array]', '[object Float64Array]'];

    var isDataView = function isDataView(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj);
    };

    var isArrayBufferView = ArrayBuffer.isView || function (obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
    };
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name);
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name');
    }
    return name.toLowerCase();
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value);
    }
    return value;
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function next() {
        var value = items.shift();
        return { done: value === undefined, value: value };
      }
    };

    if (support.iterable) {
      iterator[Symbol.iterator] = function () {
        return iterator;
      };
    }

    return iterator;
  }

  function Headers(headers) {
    this.map = {};

    if (headers instanceof Headers) {
      headers.forEach(function (value, name) {
        this.append(name, value);
      }, this);
    } else if (Array.isArray(headers)) {
      headers.forEach(function (header) {
        this.append(header[0], header[1]);
      }, this);
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function (name) {
        this.append(name, headers[name]);
      }, this);
    }
  }

  Headers.prototype.append = function (name, value) {
    name = normalizeName(name);
    value = normalizeValue(value);
    var oldValue = this.map[name];
    this.map[name] = oldValue ? oldValue + ',' + value : value;
  };

  Headers.prototype['delete'] = function (name) {
    delete this.map[normalizeName(name)];
  };

  Headers.prototype.get = function (name) {
    name = normalizeName(name);
    return this.has(name) ? this.map[name] : null;
  };

  Headers.prototype.has = function (name) {
    return this.map.hasOwnProperty(normalizeName(name));
  };

  Headers.prototype.set = function (name, value) {
    this.map[normalizeName(name)] = normalizeValue(value);
  };

  Headers.prototype.forEach = function (callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this);
      }
    }
  };

  Headers.prototype.keys = function () {
    var items = [];
    this.forEach(function (value, name) {
      items.push(name);
    });
    return iteratorFor(items);
  };

  Headers.prototype.values = function () {
    var items = [];
    this.forEach(function (value) {
      items.push(value);
    });
    return iteratorFor(items);
  };

  Headers.prototype.entries = function () {
    var items = [];
    this.forEach(function (value, name) {
      items.push([name, value]);
    });
    return iteratorFor(items);
  };

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'));
    }
    body.bodyUsed = true;
  }

  function fileReaderReady(reader) {
    return new Promise(function (resolve, reject) {
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = function () {
        reject(reader.error);
      };
    });
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsArrayBuffer(blob);
    return promise;
  }

  function readBlobAsText(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsText(blob);
    return promise;
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf);
    var chars = new Array(view.length);

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i]);
    }
    return chars.join('');
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0);
    } else {
      var view = new Uint8Array(buf.byteLength);
      view.set(new Uint8Array(buf));
      return view.buffer;
    }
  }

  function Body() {
    this.bodyUsed = false;

    this._initBody = function (body) {
      this._bodyInit = body;
      if (!body) {
        this._bodyText = '';
      } else if (typeof body === 'string') {
        this._bodyText = body;
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body;
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body;
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString();
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer);
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer]);
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body);
      } else {
        throw new Error('unsupported BodyInit type');
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8');
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type);
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }
      }
    };

    if (support.blob) {
      this.blob = function () {
        var rejected = consumed(this);
        if (rejected) {
          return rejected;
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob);
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]));
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob');
        } else {
          return Promise.resolve(new Blob([this._bodyText]));
        }
      };

      this.arrayBuffer = function () {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer);
        } else {
          return this.blob().then(readBlobAsArrayBuffer);
        }
      };
    }

    this.text = function () {
      var rejected = consumed(this);
      if (rejected) {
        return rejected;
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob);
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text');
      } else {
        return Promise.resolve(this._bodyText);
      }
    };

    if (support.formData) {
      this.formData = function () {
        return this.text().then(decode);
      };
    }

    this.json = function () {
      return this.text().then(JSON.parse);
    };

    return this;
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

  function normalizeMethod(method) {
    var upcased = method.toUpperCase();
    return methods.indexOf(upcased) > -1 ? upcased : method;
  }

  function Request(input, options) {
    options = options || {};
    var body = options.body;

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read');
      }
      this.url = input.url;
      this.credentials = input.credentials;
      if (!options.headers) {
        this.headers = new Headers(input.headers);
      }
      this.method = input.method;
      this.mode = input.mode;
      if (!body && input._bodyInit != null) {
        body = input._bodyInit;
        input.bodyUsed = true;
      }
    } else {
      this.url = String(input);
    }

    this.credentials = options.credentials || this.credentials || 'omit';
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers);
    }
    this.method = normalizeMethod(options.method || this.method || 'GET');
    this.mode = options.mode || this.mode || null;
    this.referrer = null;

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests');
    }
    this._initBody(body);
  }

  Request.prototype.clone = function () {
    return new Request(this, { body: this._bodyInit });
  };

  function decode(body) {
    var form = new FormData();
    body.trim().split('&').forEach(function (bytes) {
      if (bytes) {
        var split = bytes.split('=');
        var name = split.shift().replace(/\+/g, ' ');
        var value = split.join('=').replace(/\+/g, ' ');
        form.append(decodeURIComponent(name), decodeURIComponent(value));
      }
    });
    return form;
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers();
    rawHeaders.split(/\r?\n/).forEach(function (line) {
      var parts = line.split(':');
      var key = parts.shift().trim();
      if (key) {
        var value = parts.join(':').trim();
        headers.append(key, value);
      }
    });
    return headers;
  }

  Body.call(Request.prototype);

  function Response(bodyInit, options) {
    if (!options) {
      options = {};
    }

    this.type = 'default';
    this.status = 'status' in options ? options.status : 200;
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = 'statusText' in options ? options.statusText : 'OK';
    this.headers = new Headers(options.headers);
    this.url = options.url || '';
    this._initBody(bodyInit);
  }

  Body.call(Response.prototype);

  Response.prototype.clone = function () {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    });
  };

  Response.error = function () {
    var response = new Response(null, { status: 0, statusText: '' });
    response.type = 'error';
    return response;
  };

  var redirectStatuses = [301, 302, 303, 307, 308];

  Response.redirect = function (url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code');
    }

    return new Response(null, { status: status, headers: { location: url } });
  };

  self.Headers = Headers;
  self.Request = Request;
  self.Response = Response;

  self.fetch = function (input, init) {
    return new Promise(function (resolve, reject) {
      var request = new Request(input, init);
      var xhr = new XMLHttpRequest();

      xhr.onload = function () {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        };
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
        var body = 'response' in xhr ? xhr.response : xhr.responseText;
        resolve(new Response(body, options));
      };

      xhr.onerror = function () {
        reject(new TypeError('Network request failed'));
      };

      xhr.ontimeout = function () {
        reject(new TypeError('Network request failed'));
      };

      xhr.open(request.method, request.url, true);

      if (request.credentials === 'include') {
        xhr.withCredentials = true;
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob';
      }

      request.headers.forEach(function (value, name) {
        xhr.setRequestHeader(name, value);
      });

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
    });
  };
  self.fetch.polyfill = true;
})(typeof self !== 'undefined' ? self : undefined);

var _this2 = undefined;

var FetchCommand = function (_AbstractCommand) {
  inherits(FetchCommand, _AbstractCommand);

  function FetchCommand(params) {
    classCallCheck(this, FetchCommand);

    var _this = possibleConstructorReturn(this, (FetchCommand.__proto__ || Object.getPrototypeOf(FetchCommand)).call(this, 'fetch', params));

    _initialiseProps.call(_this);

    var method = params.method,
        fetchFunc = params.fetchFunc;

    var methods = FetchCommand.getMethods();

    if (!method) throw new TypeError("Empty required param 'method'");
    if (!Object.values(methods).includes(method)) throw new TypeError("Invalid method param");
    if (fetchFunc) _this.fetchFunc = fetchFunc;else _this.fetchFunc = fetch;

    _this.api_url = 'https://tempicolabs.com/';
    _this.version = 'v2';
    _this.map.get(_this).method = method;
    return _this;
  }

  createClass(FetchCommand, [{
    key: 'method',
    set: function set$$1(method) {
      if (!method) {
        throw new ReferenceError("Empty method");
      }
      this.map.get(this).method = method;
    },
    get: function get$$1() {
      return this.map.get(this).method;
    }
  }], [{
    key: 'getMethods',
    value: function getMethods() {
      return endpoints;
    }
  }]);
  return FetchCommand;
}(AbstractCommand);

FetchCommand.makeRequest = function () {
  var _ref = asyncToGenerator(regeneratorRuntime.mark(function _callee(url) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var fetchFunc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var headers, body, method, response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!url) {
              _context.next = 2;
              break;
            }

            throw new ReferenceError("Empty url");

          case 2:
            if (!fetchFunc) fetchFunc = fetch;
            _context.prev = 3;
            headers = params.headers, body = params.body, method = params.method;

            if (!headers) headers = {
              'Content-Type': 'application/json'
            };
            if (!method) method = 'GET';
            _context.next = 9;
            return fetchFunc(url, {
              headers: headers,
              method: method
            });

          case 9:
            response = _context.sent;
            return _context.abrupt('return', response);

          case 13:
            _context.prev = 13;
            _context.t0 = _context['catch'](3);

            console.error(_context.t0);

          case 16:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this2, [[3, 13]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.do = asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt('return', FetchCommand.makeRequest(_this3.api_url + 'api/' + _this3.version + '/' + _this3.method));

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this3);
  }));
};

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
var fetch$1 = function () {
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
exports.fetch = fetch$1;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=tmlabs.umd.js.map
