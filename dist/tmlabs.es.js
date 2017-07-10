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





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};



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



















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

// import * as Constants from './constant';

var TmLabs$1 = function () {
  function TmLabs(options) {
    classCallCheck(this, TmLabs);

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
  // fetch = async (params) => {
  //
  // }
  //
  // doAction = async (command) => {
  //
  // }

  createClass(TmLabs, [{
    key: 'token',
    set: function set$$1(token) {
      if (!token) {
        throw new Error('Token is empty!');
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
      throw new TypeError('Cannot construct AbstractCommand instance directly');
    }
    if (!action) throw new ReferenceError('Empty action string argument');
    if (typeof action !== 'string') throw new ReferenceError('Invalid action type');
    if (params !== false) {
      if (!params) throw new ReferenceError('Empty params object argument');
      if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) !== 'object') throw new ReferenceError('Invalid params type');
      if (Object.keys(params).length === 0) throw new ReferenceError('Empty params object');
    }
    this.map = new WeakMap();
    this.map.set(this, {
      action: action,
      params: params
    });
  }

  createClass(AbstractCommand, [{
    key: 'action',
    set: function set$$1(action) {
      if (!action) {
        throw new Error('Empty action');
      }
      this.map.get(this).action = action;
    },
    get: function get$$1() {
      return this.map.get(this).action;
    }
  }, {
    key: 'params',
    get: function get$$1() {
      return this.map.get(this).params;
    },
    set: function set$$1(params) {
      if (!params) {
        throw new Error('Empty params');
      }
      this.map.get(this).params = params;
    }
  }]);
  return AbstractCommand;
}();

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};



function unwrapExports (x) {
	return x && x.__esModule ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var fetchBrowser$1 = createCommonjsModule(function (module, exports) {
(function (self) {
  'use strict';

  function fetchPonyfill(options) {
    var Promise = options && options.Promise || self.Promise;
    var XMLHttpRequest = options && options.XMLHttpRequest || self.XMLHttpRequest;
    var global = self;

    return (function () {
      var self = Object.create(global, {
        fetch: {
          value: undefined,
          writable: true
        }
      });

      (function(self) {
        'use strict';

        if (self.fetch) {
          return
        }

        var support = {
          searchParams: 'URLSearchParams' in self,
          iterable: 'Symbol' in self && 'iterator' in Symbol,
          blob: 'FileReader' in self && 'Blob' in self && (function() {
            try {
              new Blob();
              return true
            } catch(e) {
              return false
            }
          })(),
          formData: 'FormData' in self,
          arrayBuffer: 'ArrayBuffer' in self
        };

        if (support.arrayBuffer) {
          var viewClasses = [
            '[object Int8Array]',
            '[object Uint8Array]',
            '[object Uint8ClampedArray]',
            '[object Int16Array]',
            '[object Uint16Array]',
            '[object Int32Array]',
            '[object Uint32Array]',
            '[object Float32Array]',
            '[object Float64Array]'
          ];

          var isDataView = function(obj) {
            return obj && DataView.prototype.isPrototypeOf(obj)
          };

          var isArrayBufferView = ArrayBuffer.isView || function(obj) {
            return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
          };
        }

        function normalizeName(name) {
          if (typeof name !== 'string') {
            name = String(name);
          }
          if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
            throw new TypeError('Invalid character in header field name')
          }
          return name.toLowerCase()
        }

        function normalizeValue(value) {
          if (typeof value !== 'string') {
            value = String(value);
          }
          return value
        }

        // Build a destructive iterator for the value list
        function iteratorFor(items) {
          var iterator = {
            next: function() {
              var value = items.shift();
              return {done: value === undefined, value: value}
            }
          };

          if (support.iterable) {
            iterator[Symbol.iterator] = function() {
              return iterator
            };
          }

          return iterator
        }

        function Headers(headers) {
          this.map = {};

          if (headers instanceof Headers) {
            headers.forEach(function(value, name) {
              this.append(name, value);
            }, this);

          } else if (headers) {
            Object.getOwnPropertyNames(headers).forEach(function(name) {
              this.append(name, headers[name]);
            }, this);
          }
        }

        Headers.prototype.append = function(name, value) {
          name = normalizeName(name);
          value = normalizeValue(value);
          var oldValue = this.map[name];
          this.map[name] = oldValue ? oldValue+','+value : value;
        };

        Headers.prototype['delete'] = function(name) {
          delete this.map[normalizeName(name)];
        };

        Headers.prototype.get = function(name) {
          name = normalizeName(name);
          return this.has(name) ? this.map[name] : null
        };

        Headers.prototype.has = function(name) {
          return this.map.hasOwnProperty(normalizeName(name))
        };

        Headers.prototype.set = function(name, value) {
          this.map[normalizeName(name)] = normalizeValue(value);
        };

        Headers.prototype.forEach = function(callback, thisArg) {
          for (var name in this.map) {
            if (this.map.hasOwnProperty(name)) {
              callback.call(thisArg, this.map[name], name, this);
            }
          }
        };

        Headers.prototype.keys = function() {
          var items = [];
          this.forEach(function(value, name) { items.push(name); });
          return iteratorFor(items)
        };

        Headers.prototype.values = function() {
          var items = [];
          this.forEach(function(value) { items.push(value); });
          return iteratorFor(items)
        };

        Headers.prototype.entries = function() {
          var items = [];
          this.forEach(function(value, name) { items.push([name, value]); });
          return iteratorFor(items)
        };

        if (support.iterable) {
          Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
        }

        function consumed(body) {
          if (body.bodyUsed) {
            return Promise.reject(new TypeError('Already read'))
          }
          body.bodyUsed = true;
        }

        function fileReaderReady(reader) {
          return new Promise(function(resolve, reject) {
            reader.onload = function() {
              resolve(reader.result);
            };
            reader.onerror = function() {
              reject(reader.error);
            };
          })
        }

        function readBlobAsArrayBuffer(blob) {
          var reader = new FileReader();
          var promise = fileReaderReady(reader);
          reader.readAsArrayBuffer(blob);
          return promise
        }

        function readBlobAsText(blob) {
          var reader = new FileReader();
          var promise = fileReaderReady(reader);
          reader.readAsText(blob);
          return promise
        }

        function readArrayBufferAsText(buf) {
          var view = new Uint8Array(buf);
          var chars = new Array(view.length);

          for (var i = 0; i < view.length; i++) {
            chars[i] = String.fromCharCode(view[i]);
          }
          return chars.join('')
        }

        function bufferClone(buf) {
          if (buf.slice) {
            return buf.slice(0)
          } else {
            var view = new Uint8Array(buf.byteLength);
            view.set(new Uint8Array(buf));
            return view.buffer
          }
        }

        function Body() {
          this.bodyUsed = false;

          this._initBody = function(body) {
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
              throw new Error('unsupported BodyInit type')
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
            this.blob = function() {
              var rejected = consumed(this);
              if (rejected) {
                return rejected
              }

              if (this._bodyBlob) {
                return Promise.resolve(this._bodyBlob)
              } else if (this._bodyArrayBuffer) {
                return Promise.resolve(new Blob([this._bodyArrayBuffer]))
              } else if (this._bodyFormData) {
                throw new Error('could not read FormData body as blob')
              } else {
                return Promise.resolve(new Blob([this._bodyText]))
              }
            };

            this.arrayBuffer = function() {
              if (this._bodyArrayBuffer) {
                return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
              } else {
                return this.blob().then(readBlobAsArrayBuffer)
              }
            };
          }

          this.text = function() {
            var rejected = consumed(this);
            if (rejected) {
              return rejected
            }

            if (this._bodyBlob) {
              return readBlobAsText(this._bodyBlob)
            } else if (this._bodyArrayBuffer) {
              return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
            } else if (this._bodyFormData) {
              throw new Error('could not read FormData body as text')
            } else {
              return Promise.resolve(this._bodyText)
            }
          };

          if (support.formData) {
            this.formData = function() {
              return this.text().then(decode)
            };
          }

          this.json = function() {
            return this.text().then(JSON.parse)
          };

          return this
        }

        // HTTP methods whose capitalization should be normalized
        var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

        function normalizeMethod(method) {
          var upcased = method.toUpperCase();
          return (methods.indexOf(upcased) > -1) ? upcased : method
        }

        function Request(input, options) {
          options = options || {};
          var body = options.body;

          if (input instanceof Request) {
            if (input.bodyUsed) {
              throw new TypeError('Already read')
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
            throw new TypeError('Body not allowed for GET or HEAD requests')
          }
          this._initBody(body);
        }

        Request.prototype.clone = function() {
          return new Request(this, { body: this._bodyInit })
        };

        function decode(body) {
          var form = new FormData();
          body.trim().split('&').forEach(function(bytes) {
            if (bytes) {
              var split = bytes.split('=');
              var name = split.shift().replace(/\+/g, ' ');
              var value = split.join('=').replace(/\+/g, ' ');
              form.append(decodeURIComponent(name), decodeURIComponent(value));
            }
          });
          return form
        }

        function parseHeaders(rawHeaders) {
          var headers = new Headers();
          rawHeaders.split(/\r?\n/).forEach(function(line) {
            var parts = line.split(':');
            var key = parts.shift().trim();
            if (key) {
              var value = parts.join(':').trim();
              headers.append(key, value);
            }
          });
          return headers
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

        Response.prototype.clone = function() {
          return new Response(this._bodyInit, {
            status: this.status,
            statusText: this.statusText,
            headers: new Headers(this.headers),
            url: this.url
          })
        };

        Response.error = function() {
          var response = new Response(null, {status: 0, statusText: ''});
          response.type = 'error';
          return response
        };

        var redirectStatuses = [301, 302, 303, 307, 308];

        Response.redirect = function(url, status) {
          if (redirectStatuses.indexOf(status) === -1) {
            throw new RangeError('Invalid status code')
          }

          return new Response(null, {status: status, headers: {location: url}})
        };

        self.Headers = Headers;
        self.Request = Request;
        self.Response = Response;

        self.fetch = function(input, init) {
          return new Promise(function(resolve, reject) {
            var request = new Request(input, init);
            var xhr = new XMLHttpRequest();

            xhr.onload = function() {
              var options = {
                status: xhr.status,
                statusText: xhr.statusText,
                headers: parseHeaders(xhr.getAllResponseHeaders() || '')
              };
              options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
              var body = 'response' in xhr ? xhr.response : xhr.responseText;
              resolve(new Response(body, options));
            };

            xhr.onerror = function() {
              reject(new TypeError('Network request failed'));
            };

            xhr.ontimeout = function() {
              reject(new TypeError('Network request failed'));
            };

            xhr.open(request.method, request.url, true);

            if (request.credentials === 'include') {
              xhr.withCredentials = true;
            }

            if ('responseType' in xhr && support.blob) {
              xhr.responseType = 'blob';
            }

            request.headers.forEach(function(value, name) {
              xhr.setRequestHeader(name, value);
            });

            xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
          })
        };
        self.fetch.polyfill = true;
      })(typeof self !== 'undefined' ? self : this);


      return {
        fetch: self.fetch,
        Headers: self.Headers,
        Request: self.Request,
        Response: self.Response
      };
    }());
  }

  if (typeof undefined === 'function' && undefined.amd) {
    undefined(function () {
      return fetchPonyfill;
    });
  } else {
    module.exports = fetchPonyfill;
  }
}(typeof self === 'undefined' ? commonjsGlobal : self));
});

var assertString_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = assertString;
function assertString(input) {
  var isString = typeof input === 'string' || input instanceof String;

  if (!isString) {
    throw new TypeError('This library (validator.js) validates strings only');
  }
}
module.exports = exports['default'];
});

var toDate_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toDate;



var _assertString2 = _interopRequireDefault(assertString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function toDate(date) {
  (0, _assertString2.default)(date);
  date = Date.parse(date);
  return !isNaN(date) ? new Date(date) : null;
}
module.exports = exports['default'];
});

var toFloat_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toFloat;



var _assertString2 = _interopRequireDefault(assertString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function toFloat(str) {
  (0, _assertString2.default)(str);
  return parseFloat(str);
}
module.exports = exports['default'];
});

var toInt_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toInt;



var _assertString2 = _interopRequireDefault(assertString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function toInt(str, radix) {
  (0, _assertString2.default)(str);
  return parseInt(str, radix || 10);
}
module.exports = exports['default'];
});

var toBoolean_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toBoolean;



var _assertString2 = _interopRequireDefault(assertString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function toBoolean(str, strict) {
  (0, _assertString2.default)(str);
  if (strict) {
    return str === '1' || str === 'true';
  }
  return str !== '0' && str !== 'false' && str !== '';
}
module.exports = exports['default'];
});

var equals_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = equals;



var _assertString2 = _interopRequireDefault(assertString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function equals(str, comparison) {
  (0, _assertString2.default)(str);
  return str === comparison;
}
module.exports = exports['default'];
});

var toString_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = toString;
function toString(input) {
  if ((typeof input === 'undefined' ? 'undefined' : _typeof(input)) === 'object' && input !== null) {
    if (typeof input.toString === 'function') {
      input = input.toString();
    } else {
      input = '[object Object]';
    }
  } else if (input === null || typeof input === 'undefined' || isNaN(input) && !input.length) {
    input = '';
  }
  return String(input);
}
module.exports = exports['default'];
});

var contains_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = contains;



var _assertString2 = _interopRequireDefault(assertString_1);



var _toString2 = _interopRequireDefault(toString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function contains(str, elem) {
  (0, _assertString2.default)(str);
  return str.indexOf((0, _toString2.default)(elem)) >= 0;
}
module.exports = exports['default'];
});

var matches_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = matches;



var _assertString2 = _interopRequireDefault(assertString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function matches(str, pattern, modifiers) {
  (0, _assertString2.default)(str);
  if (Object.prototype.toString.call(pattern) !== '[object RegExp]') {
    pattern = new RegExp(pattern, modifiers);
  }
  return pattern.test(str);
}
module.exports = exports['default'];
});

var merge_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = merge;
function merge() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var defaults = arguments[1];

  for (var key in defaults) {
    if (typeof obj[key] === 'undefined') {
      obj[key] = defaults[key];
    }
  }
  return obj;
}
module.exports = exports['default'];
});

var isByteLength_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = isByteLength;



var _assertString2 = _interopRequireDefault(assertString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable prefer-rest-params */
function isByteLength(str, options) {
  (0, _assertString2.default)(str);
  var min = void 0;
  var max = void 0;
  if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
    min = options.min || 0;
    max = options.max;
  } else {
    // backwards compatibility: isByteLength(str, min [, max])
    min = arguments[1];
    max = arguments[2];
  }
  var len = encodeURI(str).split(/%..|./).length - 1;
  return len >= min && (typeof max === 'undefined' || len <= max);
}
module.exports = exports['default'];
});

var isFQDN = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isFDQN;



var _assertString2 = _interopRequireDefault(assertString_1);



var _merge2 = _interopRequireDefault(merge_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var default_fqdn_options = {
  require_tld: true,
  allow_underscores: false,
  allow_trailing_dot: false
};

function isFDQN(str, options) {
  (0, _assertString2.default)(str);
  options = (0, _merge2.default)(options, default_fqdn_options);

  /* Remove the optional trailing dot before checking validity */
  if (options.allow_trailing_dot && str[str.length - 1] === '.') {
    str = str.substring(0, str.length - 1);
  }
  var parts = str.split('.');
  if (options.require_tld) {
    var tld = parts.pop();
    if (!parts.length || !/^([a-z\u00a1-\uffff]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)) {
      return false;
    }
    // disallow spaces
    if (/[\s\u2002-\u200B\u202F\u205F\u3000\uFEFF\uDB40\uDC20]/.test(tld)) {
      return false;
    }
  }
  for (var part, i = 0; i < parts.length; i++) {
    part = parts[i];
    if (options.allow_underscores) {
      part = part.replace(/_/g, '');
    }
    if (!/^[a-z\u00a1-\uffff0-9-]+$/i.test(part)) {
      return false;
    }
    // disallow full-width chars
    if (/[\uff01-\uff5e]/.test(part)) {
      return false;
    }
    if (part[0] === '-' || part[part.length - 1] === '-') {
      return false;
    }
  }
  return true;
}
module.exports = exports['default'];
});

var isEmail_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isEmail;



var _assertString2 = _interopRequireDefault(assertString_1);



var _merge2 = _interopRequireDefault(merge_1);



var _isByteLength2 = _interopRequireDefault(isByteLength_1);



var _isFQDN2 = _interopRequireDefault(isFQDN);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var default_email_options = {
  allow_display_name: false,
  require_display_name: false,
  allow_utf8_local_part: true,
  require_tld: true
};

/* eslint-disable max-len */
/* eslint-disable no-control-regex */
var displayName = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\s]*<(.+)>$/i;
var emailUserPart = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~]+$/i;
var quotedEmailUser = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f]))*$/i;
var emailUserUtf8Part = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i;
var quotedEmailUserUtf8 = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i;
/* eslint-enable max-len */
/* eslint-enable no-control-regex */

function isEmail(str, options) {
  (0, _assertString2.default)(str);
  options = (0, _merge2.default)(options, default_email_options);

  if (options.require_display_name || options.allow_display_name) {
    var display_email = str.match(displayName);
    if (display_email) {
      str = display_email[1];
    } else if (options.require_display_name) {
      return false;
    }
  }

  var parts = str.split('@');
  var domain = parts.pop();
  var user = parts.join('@');

  var lower_domain = domain.toLowerCase();
  if (lower_domain === 'gmail.com' || lower_domain === 'googlemail.com') {
    user = user.replace(/\./g, '').toLowerCase();
  }

  if (!(0, _isByteLength2.default)(user, { max: 64 }) || !(0, _isByteLength2.default)(domain, { max: 254 })) {
    return false;
  }

  if (!(0, _isFQDN2.default)(domain, { require_tld: options.require_tld })) {
    return false;
  }

  if (user[0] === '"') {
    user = user.slice(1, user.length - 1);
    return options.allow_utf8_local_part ? quotedEmailUserUtf8.test(user) : quotedEmailUser.test(user);
  }

  var pattern = options.allow_utf8_local_part ? emailUserUtf8Part : emailUserPart;

  var user_parts = user.split('.');
  for (var i = 0; i < user_parts.length; i++) {
    if (!pattern.test(user_parts[i])) {
      return false;
    }
  }

  return true;
}
module.exports = exports['default'];
});

var isIP_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isIP;



var _assertString2 = _interopRequireDefault(assertString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ipv4Maybe = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
var ipv6Block = /^[0-9A-F]{1,4}$/i;

function isIP(str) {
  var version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  (0, _assertString2.default)(str);
  version = String(version);
  if (!version) {
    return isIP(str, 4) || isIP(str, 6);
  } else if (version === '4') {
    if (!ipv4Maybe.test(str)) {
      return false;
    }
    var parts = str.split('.').sort(function (a, b) {
      return a - b;
    });
    return parts[3] <= 255;
  } else if (version === '6') {
    var blocks = str.split(':');
    var foundOmissionBlock = false; // marker to indicate ::

    // At least some OS accept the last 32 bits of an IPv6 address
    // (i.e. 2 of the blocks) in IPv4 notation, and RFC 3493 says
    // that '::ffff:a.b.c.d' is valid for IPv4-mapped IPv6 addresses,
    // and '::a.b.c.d' is deprecated, but also valid.
    var foundIPv4TransitionBlock = isIP(blocks[blocks.length - 1], 4);
    var expectedNumberOfBlocks = foundIPv4TransitionBlock ? 7 : 8;

    if (blocks.length > expectedNumberOfBlocks) {
      return false;
    }
    // initial or final ::
    if (str === '::') {
      return true;
    } else if (str.substr(0, 2) === '::') {
      blocks.shift();
      blocks.shift();
      foundOmissionBlock = true;
    } else if (str.substr(str.length - 2) === '::') {
      blocks.pop();
      blocks.pop();
      foundOmissionBlock = true;
    }

    for (var i = 0; i < blocks.length; ++i) {
      // test for a :: which can not be at the string start/end
      // since those cases have been handled above
      if (blocks[i] === '' && i > 0 && i < blocks.length - 1) {
        if (foundOmissionBlock) {
          return false; // multiple :: in address
        }
        foundOmissionBlock = true;
      } else if (foundIPv4TransitionBlock && i === blocks.length - 1) {
        // it has been checked before that the last
        // block is a valid IPv4 address
      } else if (!ipv6Block.test(blocks[i])) {
        return false;
      }
    }
    if (foundOmissionBlock) {
      return blocks.length >= 1;
    }
    return blocks.length === expectedNumberOfBlocks;
  }
  return false;
}
module.exports = exports['default'];
});

var isURL_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isURL;



var _assertString2 = _interopRequireDefault(assertString_1);



var _isFQDN2 = _interopRequireDefault(isFQDN);



var _isIP2 = _interopRequireDefault(isIP_1);



var _merge2 = _interopRequireDefault(merge_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var default_url_options = {
  protocols: ['http', 'https', 'ftp'],
  require_tld: true,
  require_protocol: false,
  require_host: true,
  require_valid_protocol: true,
  allow_underscores: false,
  allow_trailing_dot: false,
  allow_protocol_relative_urls: false
};

var wrapped_ipv6 = /^\[([^\]]+)\](?::([0-9]+))?$/;

function isRegExp(obj) {
  return Object.prototype.toString.call(obj) === '[object RegExp]';
}

function checkHost(host, matches) {
  for (var i = 0; i < matches.length; i++) {
    var match = matches[i];
    if (host === match || isRegExp(match) && match.test(host)) {
      return true;
    }
  }
  return false;
}

function isURL(url, options) {
  (0, _assertString2.default)(url);
  if (!url || url.length >= 2083 || /[\s<>]/.test(url)) {
    return false;
  }
  if (url.indexOf('mailto:') === 0) {
    return false;
  }
  options = (0, _merge2.default)(options, default_url_options);
  var protocol = void 0,
      auth = void 0,
      host = void 0,
      hostname = void 0,
      port = void 0,
      port_str = void 0,
      split = void 0,
      ipv6 = void 0;

  split = url.split('#');
  url = split.shift();

  split = url.split('?');
  url = split.shift();

  split = url.split('://');
  if (split.length > 1) {
    protocol = split.shift();
    if (options.require_valid_protocol && options.protocols.indexOf(protocol) === -1) {
      return false;
    }
  } else if (options.require_protocol) {
    return false;
  } else if (options.allow_protocol_relative_urls && url.substr(0, 2) === '//') {
    split[0] = url.substr(2);
  }
  url = split.join('://');

  if (url === '') {
    return false;
  }

  split = url.split('/');
  url = split.shift();

  if (url === '' && !options.require_host) {
    return true;
  }

  split = url.split('@');
  if (split.length > 1) {
    auth = split.shift();
    if (auth.indexOf(':') >= 0 && auth.split(':').length > 2) {
      return false;
    }
  }
  hostname = split.join('@');

  port_str = null;
  ipv6 = null;
  var ipv6_match = hostname.match(wrapped_ipv6);
  if (ipv6_match) {
    host = '';
    ipv6 = ipv6_match[1];
    port_str = ipv6_match[2] || null;
  } else {
    split = hostname.split(':');
    host = split.shift();
    if (split.length) {
      port_str = split.join(':');
    }
  }

  if (port_str !== null) {
    port = parseInt(port_str, 10);
    if (!/^[0-9]+$/.test(port_str) || port <= 0 || port > 65535) {
      return false;
    }
  }

  if (!(0, _isIP2.default)(host) && !(0, _isFQDN2.default)(host, options) && (!ipv6 || !(0, _isIP2.default)(ipv6, 6))) {
    return false;
  }

  host = host || ipv6;

  if (options.host_whitelist && !checkHost(host, options.host_whitelist)) {
    return false;
  }
  if (options.host_blacklist && checkHost(host, options.host_blacklist)) {
    return false;
  }

  return true;
}
module.exports = exports['default'];
});

var isMACAddress_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isMACAddress;



var _assertString2 = _interopRequireDefault(assertString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var macAddress = /^([0-9a-fA-F][0-9a-fA-F]:){5}([0-9a-fA-F][0-9a-fA-F])$/;

function isMACAddress(str) {
  (0, _assertString2.default)(str);
  return macAddress.test(str);
}
module.exports = exports['default'];
});

var isBoolean_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isBoolean;



var _assertString2 = _interopRequireDefault(assertString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isBoolean(str) {
  (0, _assertString2.default)(str);
  return ['true', 'false', '1', '0'].indexOf(str) >= 0;
}
module.exports = exports['default'];
});

var alpha_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var alpha = exports.alpha = {
  'en-US': /^[A-Z]+$/i,
  'cs-CZ': /^[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]+$/i,
  'da-DK': /^[A-ZÆØÅ]+$/i,
  'de-DE': /^[A-ZÄÖÜß]+$/i,
  'es-ES': /^[A-ZÁÉÍÑÓÚÜ]+$/i,
  'fr-FR': /^[A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]+$/i,
  'nl-NL': /^[A-ZÉËÏÓÖÜ]+$/i,
  'hu-HU': /^[A-ZÁÉÍÓÖŐÚÜŰ]+$/i,
  'pl-PL': /^[A-ZĄĆĘŚŁŃÓŻŹ]+$/i,
  'pt-PT': /^[A-ZÃÁÀÂÇÉÊÍÕÓÔÚÜ]+$/i,
  'ru-RU': /^[А-ЯЁ]+$/i,
  'sr-RS@latin': /^[A-ZČĆŽŠĐ]+$/i,
  'sr-RS': /^[А-ЯЂЈЉЊЋЏ]+$/i,
  'tr-TR': /^[A-ZÇĞİıÖŞÜ]+$/i,
  'uk-UA': /^[А-ЩЬЮЯЄIЇҐ]+$/i,
  ar: /^[ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]+$/
};

var alphanumeric = exports.alphanumeric = {
  'en-US': /^[0-9A-Z]+$/i,
  'cs-CZ': /^[0-9A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]+$/i,
  'da-DK': /^[0-9A-ZÆØÅ]$/i,
  'de-DE': /^[0-9A-ZÄÖÜß]+$/i,
  'es-ES': /^[0-9A-ZÁÉÍÑÓÚÜ]+$/i,
  'fr-FR': /^[0-9A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]+$/i,
  'hu-HU': /^[0-9A-ZÁÉÍÓÖŐÚÜŰ]+$/i,
  'nl-NL': /^[0-9A-ZÉËÏÓÖÜ]+$/i,
  'pl-PL': /^[0-9A-ZĄĆĘŚŁŃÓŻŹ]+$/i,
  'pt-PT': /^[0-9A-ZÃÁÀÂÇÉÊÍÕÓÔÚÜ]+$/i,
  'ru-RU': /^[0-9А-ЯЁ]+$/i,
  'sr-RS@latin': /^[0-9A-ZČĆŽŠĐ]+$/i,
  'sr-RS': /^[0-9А-ЯЂЈЉЊЋЏ]+$/i,
  'tr-TR': /^[0-9A-ZÇĞİıÖŞÜ]+$/i,
  'uk-UA': /^[0-9А-ЩЬЮЯЄIЇҐ]+$/i,
  ar: /^[٠١٢٣٤٥٦٧٨٩0-9ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]+$/
};

var englishLocales = exports.englishLocales = ['AU', 'GB', 'HK', 'IN', 'NZ', 'ZA', 'ZM'];

for (var locale, i = 0; i < englishLocales.length; i++) {
  locale = 'en-' + englishLocales[i];
  alpha[locale] = alpha['en-US'];
  alphanumeric[locale] = alphanumeric['en-US'];
}

alpha['pt-BR'] = alpha['pt-PT'];
alphanumeric['pt-BR'] = alphanumeric['pt-PT'];

// Source: http://www.localeplanet.com/java/
var arabicLocales = exports.arabicLocales = ['AE', 'BH', 'DZ', 'EG', 'IQ', 'JO', 'KW', 'LB', 'LY', 'MA', 'QM', 'QA', 'SA', 'SD', 'SY', 'TN', 'YE'];

for (var _locale, _i = 0; _i < arabicLocales.length; _i++) {
  _locale = 'ar-' + arabicLocales[_i];
  alpha[_locale] = alpha.ar;
  alphanumeric[_locale] = alphanumeric.ar;
}
});

var isAlpha_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isAlpha;



var _assertString2 = _interopRequireDefault(assertString_1);



function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isAlpha(str) {
  var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en-US';

  (0, _assertString2.default)(str);
  if (locale in alpha_1.alpha) {
    return alpha_1.alpha[locale].test(str);
  }
  throw new Error('Invalid locale \'' + locale + '\'');
}
module.exports = exports['default'];
});

var isAlphanumeric_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isAlphanumeric;



var _assertString2 = _interopRequireDefault(assertString_1);



function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isAlphanumeric(str) {
  var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en-US';

  (0, _assertString2.default)(str);
  if (locale in alpha_1.alphanumeric) {
    return alpha_1.alphanumeric[locale].test(str);
  }
  throw new Error('Invalid locale \'' + locale + '\'');
}
module.exports = exports['default'];
});

var isNumeric_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isNumeric;



var _assertString2 = _interopRequireDefault(assertString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var numeric = /^[-+]?[0-9]+$/;

function isNumeric(str) {
  (0, _assertString2.default)(str);
  return numeric.test(str);
}
module.exports = exports['default'];
});

var isLowercase_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isLowercase;



var _assertString2 = _interopRequireDefault(assertString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isLowercase(str) {
  (0, _assertString2.default)(str);
  return str === str.toLowerCase();
}
module.exports = exports['default'];
});

var isUppercase_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isUppercase;



var _assertString2 = _interopRequireDefault(assertString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isUppercase(str) {
  (0, _assertString2.default)(str);
  return str === str.toUpperCase();
}
module.exports = exports['default'];
});

var isAscii_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isAscii;



var _assertString2 = _interopRequireDefault(assertString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-control-regex */
var ascii = /^[\x00-\x7F]+$/;
/* eslint-enable no-control-regex */

function isAscii(str) {
  (0, _assertString2.default)(str);
  return ascii.test(str);
}
module.exports = exports['default'];
});

var isFullWidth_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fullWidth = undefined;
exports.default = isFullWidth;



var _assertString2 = _interopRequireDefault(assertString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fullWidth = exports.fullWidth = /[^\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/;

function isFullWidth(str) {
  (0, _assertString2.default)(str);
  return fullWidth.test(str);
}
});

var isHalfWidth_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.halfWidth = undefined;
exports.default = isHalfWidth;



var _assertString2 = _interopRequireDefault(assertString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var halfWidth = exports.halfWidth = /[\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/;

function isHalfWidth(str) {
  (0, _assertString2.default)(str);
  return halfWidth.test(str);
}
});

var isVariableWidth_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isVariableWidth;



var _assertString2 = _interopRequireDefault(assertString_1);





function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isVariableWidth(str) {
  (0, _assertString2.default)(str);
  return isFullWidth_1.fullWidth.test(str) && isHalfWidth_1.halfWidth.test(str);
}
module.exports = exports['default'];
});

var isMultibyte_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isMultibyte;



var _assertString2 = _interopRequireDefault(assertString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-control-regex */
var multibyte = /[^\x00-\x7F]/;
/* eslint-enable no-control-regex */

function isMultibyte(str) {
  (0, _assertString2.default)(str);
  return multibyte.test(str);
}
module.exports = exports['default'];
});

var isSurrogatePair_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isSurrogatePair;



var _assertString2 = _interopRequireDefault(assertString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var surrogatePair = /[\uD800-\uDBFF][\uDC00-\uDFFF]/;

function isSurrogatePair(str) {
  (0, _assertString2.default)(str);
  return surrogatePair.test(str);
}
module.exports = exports['default'];
});

var isInt_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isInt;



var _assertString2 = _interopRequireDefault(assertString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var int = /^(?:[-+]?(?:0|[1-9][0-9]*))$/;
var intLeadingZeroes = /^[-+]?[0-9]+$/;

function isInt(str, options) {
  (0, _assertString2.default)(str);
  options = options || {};

  // Get the regex to use for testing, based on whether
  // leading zeroes are allowed or not.
  var regex = options.hasOwnProperty('allow_leading_zeroes') && !options.allow_leading_zeroes ? int : intLeadingZeroes;

  // Check min/max/lt/gt
  var minCheckPassed = !options.hasOwnProperty('min') || str >= options.min;
  var maxCheckPassed = !options.hasOwnProperty('max') || str <= options.max;
  var ltCheckPassed = !options.hasOwnProperty('lt') || str < options.lt;
  var gtCheckPassed = !options.hasOwnProperty('gt') || str > options.gt;

  return regex.test(str) && minCheckPassed && maxCheckPassed && ltCheckPassed && gtCheckPassed;
}
module.exports = exports['default'];
});

var isFloat_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isFloat;



var _assertString2 = _interopRequireDefault(assertString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var float = /^(?:[-+])?(?:[0-9]+)?(?:\.[0-9]*)?(?:[eE][\+\-]?(?:[0-9]+))?$/;

function isFloat(str, options) {
  (0, _assertString2.default)(str);
  options = options || {};
  if (str === '' || str === '.') {
    return false;
  }
  return float.test(str) && (!options.hasOwnProperty('min') || str >= options.min) && (!options.hasOwnProperty('max') || str <= options.max) && (!options.hasOwnProperty('lt') || str < options.lt) && (!options.hasOwnProperty('gt') || str > options.gt);
}
module.exports = exports['default'];
});

var isDecimal_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isDecimal;



var _assertString2 = _interopRequireDefault(assertString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var decimal = /^[-+]?([0-9]+|\.[0-9]+|[0-9]+\.[0-9]+)$/;

function isDecimal(str) {
  (0, _assertString2.default)(str);
  return str !== '' && decimal.test(str);
}
module.exports = exports['default'];
});

var isHexadecimal_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isHexadecimal;



var _assertString2 = _interopRequireDefault(assertString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hexadecimal = /^[0-9A-F]+$/i;

function isHexadecimal(str) {
  (0, _assertString2.default)(str);
  return hexadecimal.test(str);
}
module.exports = exports['default'];
});

var isDivisibleBy_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isDivisibleBy;



var _assertString2 = _interopRequireDefault(assertString_1);



var _toFloat2 = _interopRequireDefault(toFloat_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isDivisibleBy(str, num) {
  (0, _assertString2.default)(str);
  return (0, _toFloat2.default)(str) % parseInt(num, 10) === 0;
}
module.exports = exports['default'];
});

var isHexColor_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isHexColor;



var _assertString2 = _interopRequireDefault(assertString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hexcolor = /^#?([0-9A-F]{3}|[0-9A-F]{6})$/i;

function isHexColor(str) {
  (0, _assertString2.default)(str);
  return hexcolor.test(str);
}
module.exports = exports['default'];
});

var isISRC_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isISRC;



var _assertString2 = _interopRequireDefault(assertString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// see http://isrc.ifpi.org/en/isrc-standard/code-syntax
var isrc = /^[A-Z]{2}[0-9A-Z]{3}\d{2}\d{5}$/;

function isISRC(str) {
  (0, _assertString2.default)(str);
  return isrc.test(str);
}
module.exports = exports['default'];
});

var isMD5_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isMD5;



var _assertString2 = _interopRequireDefault(assertString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var md5 = /^[a-f0-9]{32}$/;

function isMD5(str) {
  (0, _assertString2.default)(str);
  return md5.test(str);
}
module.exports = exports['default'];
});

var isJSON_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = isJSON;



var _assertString2 = _interopRequireDefault(assertString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isJSON(str) {
  (0, _assertString2.default)(str);
  try {
    var obj = JSON.parse(str);
    return !!obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
  } catch (e) {/* ignore */}
  return false;
}
module.exports = exports['default'];
});

var isEmpty_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isEmpty;



var _assertString2 = _interopRequireDefault(assertString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isEmpty(str) {
  (0, _assertString2.default)(str);
  return str.length === 0;
}
module.exports = exports['default'];
});

var isLength_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = isLength;



var _assertString2 = _interopRequireDefault(assertString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable prefer-rest-params */
function isLength(str, options) {
  (0, _assertString2.default)(str);
  var min = void 0;
  var max = void 0;
  if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
    min = options.min || 0;
    max = options.max;
  } else {
    // backwards compatibility: isLength(str, min [, max])
    min = arguments[1];
    max = arguments[2];
  }
  var surrogatePairs = str.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g) || [];
  var len = str.length - surrogatePairs.length;
  return len >= min && (typeof max === 'undefined' || len <= max);
}
module.exports = exports['default'];
});

var isUUID_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isUUID;



var _assertString2 = _interopRequireDefault(assertString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var uuid = {
  3: /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
  4: /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  5: /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  all: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i
};

function isUUID(str) {
  var version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'all';

  (0, _assertString2.default)(str);
  var pattern = uuid[version];
  return pattern && pattern.test(str);
}
module.exports = exports['default'];
});

var isMongoId_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isMongoId;



var _assertString2 = _interopRequireDefault(assertString_1);



var _isHexadecimal2 = _interopRequireDefault(isHexadecimal_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isMongoId(str) {
  (0, _assertString2.default)(str);
  return (0, _isHexadecimal2.default)(str) && str.length === 24;
}
module.exports = exports['default'];
});

var isAfter_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isAfter;



var _assertString2 = _interopRequireDefault(assertString_1);



var _toDate2 = _interopRequireDefault(toDate_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isAfter(str) {
  var date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : String(new Date());

  (0, _assertString2.default)(str);
  var comparison = (0, _toDate2.default)(date);
  var original = (0, _toDate2.default)(str);
  return !!(original && comparison && original > comparison);
}
module.exports = exports['default'];
});

var isBefore_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isBefore;



var _assertString2 = _interopRequireDefault(assertString_1);



var _toDate2 = _interopRequireDefault(toDate_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isBefore(str) {
  var date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : String(new Date());

  (0, _assertString2.default)(str);
  var comparison = (0, _toDate2.default)(date);
  var original = (0, _toDate2.default)(str);
  return !!(original && comparison && original < comparison);
}
module.exports = exports['default'];
});

var isIn_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = isIn;



var _assertString2 = _interopRequireDefault(assertString_1);



var _toString2 = _interopRequireDefault(toString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isIn(str, options) {
  (0, _assertString2.default)(str);
  var i = void 0;
  if (Object.prototype.toString.call(options) === '[object Array]') {
    var array = [];
    for (i in options) {
      if ({}.hasOwnProperty.call(options, i)) {
        array[i] = (0, _toString2.default)(options[i]);
      }
    }
    return array.indexOf(str) >= 0;
  } else if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
    return options.hasOwnProperty(str);
  } else if (options && typeof options.indexOf === 'function') {
    return options.indexOf(str) >= 0;
  }
  return false;
}
module.exports = exports['default'];
});

var isCreditCard_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isCreditCard;



var _assertString2 = _interopRequireDefault(assertString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable max-len */
var creditCard = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11}|62[0-9]{14})$/;
/* eslint-enable max-len */

function isCreditCard(str) {
  (0, _assertString2.default)(str);
  var sanitized = str.replace(/[- ]+/g, '');
  if (!creditCard.test(sanitized)) {
    return false;
  }
  var sum = 0;
  var digit = void 0;
  var tmpNum = void 0;
  var shouldDouble = void 0;
  for (var i = sanitized.length - 1; i >= 0; i--) {
    digit = sanitized.substring(i, i + 1);
    tmpNum = parseInt(digit, 10);
    if (shouldDouble) {
      tmpNum *= 2;
      if (tmpNum >= 10) {
        sum += tmpNum % 10 + 1;
      } else {
        sum += tmpNum;
      }
    } else {
      sum += tmpNum;
    }
    shouldDouble = !shouldDouble;
  }
  return !!(sum % 10 === 0 ? sanitized : false);
}
module.exports = exports['default'];
});

var isISIN_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isISIN;



var _assertString2 = _interopRequireDefault(assertString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isin = /^[A-Z]{2}[0-9A-Z]{9}[0-9]$/;

function isISIN(str) {
  (0, _assertString2.default)(str);
  if (!isin.test(str)) {
    return false;
  }

  var checksumStr = str.replace(/[A-Z]/g, function (character) {
    return parseInt(character, 36);
  });

  var sum = 0;
  var digit = void 0;
  var tmpNum = void 0;
  var shouldDouble = true;
  for (var i = checksumStr.length - 2; i >= 0; i--) {
    digit = checksumStr.substring(i, i + 1);
    tmpNum = parseInt(digit, 10);
    if (shouldDouble) {
      tmpNum *= 2;
      if (tmpNum >= 10) {
        sum += tmpNum + 1;
      } else {
        sum += tmpNum;
      }
    } else {
      sum += tmpNum;
    }
    shouldDouble = !shouldDouble;
  }

  return parseInt(str.substr(str.length - 1), 10) === (10000 - sum) % 10;
}
module.exports = exports['default'];
});

var isISBN_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isISBN;



var _assertString2 = _interopRequireDefault(assertString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isbn10Maybe = /^(?:[0-9]{9}X|[0-9]{10})$/;
var isbn13Maybe = /^(?:[0-9]{13})$/;
var factor = [1, 3];

function isISBN(str) {
  var version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  (0, _assertString2.default)(str);
  version = String(version);
  if (!version) {
    return isISBN(str, 10) || isISBN(str, 13);
  }
  var sanitized = str.replace(/[\s-]+/g, '');
  var checksum = 0;
  var i = void 0;
  if (version === '10') {
    if (!isbn10Maybe.test(sanitized)) {
      return false;
    }
    for (i = 0; i < 9; i++) {
      checksum += (i + 1) * sanitized.charAt(i);
    }
    if (sanitized.charAt(9) === 'X') {
      checksum += 10 * 10;
    } else {
      checksum += 10 * sanitized.charAt(9);
    }
    if (checksum % 11 === 0) {
      return !!sanitized;
    }
  } else if (version === '13') {
    if (!isbn13Maybe.test(sanitized)) {
      return false;
    }
    for (i = 0; i < 12; i++) {
      checksum += factor[i % 2] * sanitized.charAt(i);
    }
    if (sanitized.charAt(12) - (10 - checksum % 10) % 10 === 0) {
      return !!sanitized;
    }
  }
  return false;
}
module.exports = exports['default'];
});

var isISSN_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isISSN;



var _assertString2 = _interopRequireDefault(assertString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var issn = '^\\d{4}-?\\d{3}[\\dX]$';

function isISSN(str) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  (0, _assertString2.default)(str);
  var testIssn = issn;
  testIssn = options.require_hyphen ? testIssn.replace('?', '') : testIssn;
  testIssn = options.case_sensitive ? new RegExp(testIssn) : new RegExp(testIssn, 'i');
  if (!testIssn.test(str)) {
    return false;
  }
  var issnDigits = str.replace('-', '');
  var position = 8;
  var checksum = 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = issnDigits[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var digit = _step.value;

      var digitValue = digit.toUpperCase() === 'X' ? 10 : +digit;
      checksum += digitValue * position;
      --position;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return checksum % 11 === 0;
}
module.exports = exports['default'];
});

var isMobilePhone_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isMobilePhone;



var _assertString2 = _interopRequireDefault(assertString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable max-len */
var phones = {
  'ar-DZ': /^(\+?213|0)(5|6|7)\d{8}$/,
  'ar-SY': /^(!?(\+?963)|0)?9\d{8}$/,
  'ar-SA': /^(!?(\+?966)|0)?5\d{8}$/,
  'en-US': /^(\+?1)?[2-9]\d{2}[2-9](?!11)\d{6}$/,
  'cs-CZ': /^(\+?420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
  'de-DE': /^(\+?49[ \.\-])?([\(]{1}[0-9]{1,6}[\)])?([0-9 \.\-\/]{3,20})((x|ext|extension)[ ]?[0-9]{1,4})?$/,
  'da-DK': /^(\+?45)?(\d{8})$/,
  'el-GR': /^(\+?30)?(69\d{8})$/,
  'en-AU': /^(\+?61|0)4\d{8}$/,
  'en-GB': /^(\+?44|0)7\d{9}$/,
  'en-HK': /^(\+?852\-?)?[569]\d{3}\-?\d{4}$/,
  'en-IN': /^(\+?91|0)?[789]\d{9}$/,
  'en-KE': /^(\+?254|0)?[7]\d{8}$/,
  'en-NG': /^(\+?234|0)?[789]\d{9}$/,
  'en-NZ': /^(\+?64|0)2\d{7,9}$/,
  'en-UG': /^(\+?256|0)?[7]\d{8}$/,
  'en-RW': /^(\+?250|0)?[7]\d{8}$/,
  'en-TZ': /^(\+?255|0)?[67]\d{8}$/,
  'en-ZA': /^(\+?27|0)\d{9}$/,
  'en-ZM': /^(\+?26)?09[567]\d{7}$/,
  'es-ES': /^(\+?34)?(6\d{1}|7[1234])\d{7}$/,
  'fi-FI': /^(\+?358|0)\s?(4(0|1|2|4|5|6)?|50)\s?(\d\s?){4,8}\d$/,
  'fa-IR': /^(\+?98[\-\s]?|0)9[0-39]\d[\-\s]?\d{3}[\-\s]?\d{4}$/,
  'fr-FR': /^(\+?33|0)[67]\d{8}$/,
  'he-IL': /^(\+972|0)([23489]|5[0248]|77)[1-9]\d{6}/,
  'hu-HU': /^(\+?36)(20|30|70)\d{7}$/,
  'lt-LT': /^(\+370|8)\d{8}$/,
  'id-ID': /^(\+?62|0[1-9])[\s|\d]+$/,
  'it-IT': /^(\+?39)?\s?3\d{2} ?\d{6,7}$/,
  'ko-KR': /^((\+?82)[ \-]?)?0?1([0|1|6|7|8|9]{1})[ \-]?\d{3,4}[ \-]?\d{4}$/,
  'ja-JP': /^(\+?81|0)\d{1,4}[ \-]?\d{1,4}[ \-]?\d{4}$/,
  'ms-MY': /^(\+?6?01){1}(([145]{1}(\-|\s)?\d{7,8})|([236789]{1}(\s|\-)?\d{7}))$/,
  'nb-NO': /^(\+?47)?[49]\d{7}$/,
  'nl-BE': /^(\+?32|0)4?\d{8}$/,
  'nn-NO': /^(\+?47)?[49]\d{7}$/,
  'pl-PL': /^(\+?48)? ?[5-8]\d ?\d{3} ?\d{2} ?\d{2}$/,
  'pt-BR': /^(\+?55|0)\-?[1-9]{2}\-?[2-9]{1}\d{3,4}\-?\d{4}$/,
  'pt-PT': /^(\+?351)?9[1236]\d{7}$/,
  'ro-RO': /^(\+?4?0)\s?7\d{2}(\/|\s|\.|\-)?\d{3}(\s|\.|\-)?\d{3}$/,
  'en-PK': /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/,
  'ru-RU': /^(\+?7|8)?9\d{9}$/,
  'sr-RS': /^(\+3816|06)[- \d]{5,9}$/,
  'tr-TR': /^(\+?90|0)?5\d{9}$/,
  'vi-VN': /^(\+?84|0)?((1(2([0-9])|6([2-9])|88|99))|(9((?!5)[0-9])))([0-9]{7})$/,
  'zh-CN': /^(\+?0?86\-?)?1[345789]\d{9}$/,
  'zh-TW': /^(\+?886\-?|0)?9\d{8}$/
};
/* eslint-enable max-len */

// aliases
phones['en-CA'] = phones['en-US'];
phones['fr-BE'] = phones['nl-BE'];
phones['zh-HK'] = phones['en-HK'];

function isMobilePhone(str, locale) {
  (0, _assertString2.default)(str);
  if (locale in phones) {
    return phones[locale].test(str);
  } else if (locale === 'any') {
    return !!Object.values(phones).find(function (phone) {
      return phone.test(str);
    });
  }
  throw new Error('Invalid locale \'' + locale + '\'');
}
module.exports = exports['default'];
});

var isCurrency_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isCurrency;



var _merge2 = _interopRequireDefault(merge_1);



var _assertString2 = _interopRequireDefault(assertString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function currencyRegex(options) {
  var symbol = '(\\' + options.symbol.replace(/\./g, '\\.') + ')' + (options.require_symbol ? '' : '?'),
      negative = '-?',
      whole_dollar_amount_without_sep = '[1-9]\\d*',
      whole_dollar_amount_with_sep = '[1-9]\\d{0,2}(\\' + options.thousands_separator + '\\d{3})*',
      valid_whole_dollar_amounts = ['0', whole_dollar_amount_without_sep, whole_dollar_amount_with_sep],
      whole_dollar_amount = '(' + valid_whole_dollar_amounts.join('|') + ')?',
      decimal_amount = '(\\' + options.decimal_separator + '\\d{2})?';
  var pattern = whole_dollar_amount + decimal_amount;

  // default is negative sign before symbol, but there are two other options (besides parens)
  if (options.allow_negatives && !options.parens_for_negatives) {
    if (options.negative_sign_after_digits) {
      pattern += negative;
    } else if (options.negative_sign_before_digits) {
      pattern = negative + pattern;
    }
  }

  // South African Rand, for example, uses R 123 (space) and R-123 (no space)
  if (options.allow_negative_sign_placeholder) {
    pattern = '( (?!\\-))?' + pattern;
  } else if (options.allow_space_after_symbol) {
    pattern = ' ?' + pattern;
  } else if (options.allow_space_after_digits) {
    pattern += '( (?!$))?';
  }

  if (options.symbol_after_digits) {
    pattern += symbol;
  } else {
    pattern = symbol + pattern;
  }

  if (options.allow_negatives) {
    if (options.parens_for_negatives) {
      pattern = '(\\(' + pattern + '\\)|' + pattern + ')';
    } else if (!(options.negative_sign_before_digits || options.negative_sign_after_digits)) {
      pattern = negative + pattern;
    }
  }

  // ensure there's a dollar and/or decimal amount, and that
  // it doesn't start with a space or a negative sign followed by a space
  return new RegExp('^(?!-? )(?=.*\\d)' + pattern + '$');
}

var default_currency_options = {
  symbol: '$',
  require_symbol: false,
  allow_space_after_symbol: false,
  symbol_after_digits: false,
  allow_negatives: true,
  parens_for_negatives: false,
  negative_sign_before_digits: false,
  negative_sign_after_digits: false,
  allow_negative_sign_placeholder: false,
  thousands_separator: ',',
  decimal_separator: '.',
  allow_space_after_digits: false
};

function isCurrency(str, options) {
  (0, _assertString2.default)(str);
  options = (0, _merge2.default)(options, default_currency_options);
  return currencyRegex(options).test(str);
}
module.exports = exports['default'];
});

var isISO8601 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.iso8601 = undefined;

exports.default = function (str) {
  (0, _assertString2.default)(str);
  return iso8601.test(str);
};



var _assertString2 = _interopRequireDefault(assertString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable max-len */
// from http://goo.gl/0ejHHW
var iso8601 = exports.iso8601 = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
/* eslint-enable max-len */
});

var isBase64_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isBase64;



var _assertString2 = _interopRequireDefault(assertString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var notBase64 = /[^A-Z0-9+\/=]/i;

function isBase64(str) {
  (0, _assertString2.default)(str);
  var len = str.length;
  if (!len || len % 4 !== 0 || notBase64.test(str)) {
    return false;
  }
  var firstPaddingChar = str.indexOf('=');
  return firstPaddingChar === -1 || firstPaddingChar === len - 1 || firstPaddingChar === len - 2 && str[len - 1] === '=';
}
module.exports = exports['default'];
});

var isDataURI_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isDataURI;



var _assertString2 = _interopRequireDefault(assertString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dataURI = /^\s*data:([a-z]+\/[a-z0-9\-\+]+(;[a-z\-]+=[a-z0-9\-]+)?)?(;base64)?,[a-z0-9!\$&',\(\)\*\+,;=\-\._~:@\/\?%\s]*\s*$/i; // eslint-disable-line max-len

function isDataURI(str) {
  (0, _assertString2.default)(str);
  return dataURI.test(str);
}
module.exports = exports['default'];
});

var ltrim_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ltrim;



var _assertString2 = _interopRequireDefault(assertString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ltrim(str, chars) {
  (0, _assertString2.default)(str);
  var pattern = chars ? new RegExp('^[' + chars + ']+', 'g') : /^\s+/g;
  return str.replace(pattern, '');
}
module.exports = exports['default'];
});

var rtrim_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rtrim;



var _assertString2 = _interopRequireDefault(assertString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function rtrim(str, chars) {
  (0, _assertString2.default)(str);
  var pattern = chars ? new RegExp('[' + chars + ']') : /\s/;

  var idx = str.length - 1;
  while (idx >= 0 && pattern.test(str[idx])) {
    idx--;
  }

  return idx < str.length ? str.substr(0, idx + 1) : str;
}
module.exports = exports['default'];
});

var trim_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = trim;



var _rtrim2 = _interopRequireDefault(rtrim_1);



var _ltrim2 = _interopRequireDefault(ltrim_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function trim(str, chars) {
  return (0, _rtrim2.default)((0, _ltrim2.default)(str, chars), chars);
}
module.exports = exports['default'];
});

var _escape = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = escape;



var _assertString2 = _interopRequireDefault(assertString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function escape(str) {
  (0, _assertString2.default)(str);
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\//g, '&#x2F;').replace(/\\/g, '&#x5C;').replace(/`/g, '&#96;');
}
module.exports = exports['default'];
});

var _unescape = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = unescape;



var _assertString2 = _interopRequireDefault(assertString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function unescape(str) {
  (0, _assertString2.default)(str);
  return str.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#x2F;/g, '/').replace(/&#96;/g, '`');
}
module.exports = exports['default'];
});

var blacklist_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = blacklist;



var _assertString2 = _interopRequireDefault(assertString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function blacklist(str, chars) {
  (0, _assertString2.default)(str);
  return str.replace(new RegExp('[' + chars + ']+', 'g'), '');
}
module.exports = exports['default'];
});

var stripLow_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = stripLow;



var _assertString2 = _interopRequireDefault(assertString_1);



var _blacklist2 = _interopRequireDefault(blacklist_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function stripLow(str, keep_new_lines) {
  (0, _assertString2.default)(str);
  var chars = keep_new_lines ? '\\x00-\\x09\\x0B\\x0C\\x0E-\\x1F\\x7F' : '\\x00-\\x1F\\x7F';
  return (0, _blacklist2.default)(str, chars);
}
module.exports = exports['default'];
});

var whitelist_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = whitelist;



var _assertString2 = _interopRequireDefault(assertString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function whitelist(str, chars) {
  (0, _assertString2.default)(str);
  return str.replace(new RegExp('[^' + chars + ']+', 'g'), '');
}
module.exports = exports['default'];
});

var isWhitelisted_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isWhitelisted;



var _assertString2 = _interopRequireDefault(assertString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isWhitelisted(str, chars) {
  (0, _assertString2.default)(str);
  for (var i = str.length - 1; i >= 0; i--) {
    if (chars.indexOf(str[i]) === -1) {
      return false;
    }
  }
  return true;
}
module.exports = exports['default'];
});

var normalizeEmail_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = normalizeEmail;



var _isEmail2 = _interopRequireDefault(isEmail_1);



var _merge2 = _interopRequireDefault(merge_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var default_normalize_email_options = {
  // The following options apply to all email addresses
  // Lowercases the local part of the email address.
  // Please note this may violate RFC 5321 as per http://stackoverflow.com/a/9808332/192024).
  // The domain is always lowercased, as per RFC 1035
  all_lowercase: true,

  // The following conversions are specific to GMail
  // Lowercases the local part of the GMail address (known to be case-insensitive)
  gmail_lowercase: true,
  // Removes dots from the local part of the email address, as that's ignored by GMail
  gmail_remove_dots: true,
  // Removes the subaddress (e.g. "+foo") from the email address
  gmail_remove_subaddress: true,
  // Conversts the googlemail.com domain to gmail.com
  gmail_convert_googlemaildotcom: true,

  // The following conversions are specific to Outlook.com / Windows Live / Hotmail
  // Lowercases the local part of the Outlook.com address (known to be case-insensitive)
  outlookdotcom_lowercase: true,
  // Removes the subaddress (e.g. "+foo") from the email address
  outlookdotcom_remove_subaddress: true,

  // The following conversions are specific to Yahoo
  // Lowercases the local part of the Yahoo address (known to be case-insensitive)
  yahoo_lowercase: true,
  // Removes the subaddress (e.g. "-foo") from the email address
  yahoo_remove_subaddress: true,

  // The following conversions are specific to iCloud
  // Lowercases the local part of the iCloud address (known to be case-insensitive)
  icloud_lowercase: true,
  // Removes the subaddress (e.g. "+foo") from the email address
  icloud_remove_subaddress: true
};

// List of domains used by iCloud
var icloud_domains = ['icloud.com', 'me.com'];

// List of domains used by Outlook.com and its predecessors
// This list is likely incomplete.
// Partial reference:
// https://blogs.office.com/2013/04/17/outlook-com-gets-two-step-verification-sign-in-by-alias-and-new-international-domains/
var outlookdotcom_domains = ['hotmail.at', 'hotmail.be', 'hotmail.ca', 'hotmail.cl', 'hotmail.co.il', 'hotmail.co.nz', 'hotmail.co.th', 'hotmail.co.uk', 'hotmail.com', 'hotmail.com.ar', 'hotmail.com.au', 'hotmail.com.br', 'hotmail.com.gr', 'hotmail.com.mx', 'hotmail.com.pe', 'hotmail.com.tr', 'hotmail.com.vn', 'hotmail.cz', 'hotmail.de', 'hotmail.dk', 'hotmail.es', 'hotmail.fr', 'hotmail.hu', 'hotmail.id', 'hotmail.ie', 'hotmail.in', 'hotmail.it', 'hotmail.jp', 'hotmail.kr', 'hotmail.lv', 'hotmail.my', 'hotmail.ph', 'hotmail.pt', 'hotmail.sa', 'hotmail.sg', 'hotmail.sk', 'live.be', 'live.co.uk', 'live.com', 'live.com.ar', 'live.com.mx', 'live.de', 'live.es', 'live.eu', 'live.fr', 'live.it', 'live.nl', 'msn.com', 'outlook.at', 'outlook.be', 'outlook.cl', 'outlook.co.il', 'outlook.co.nz', 'outlook.co.th', 'outlook.com', 'outlook.com.ar', 'outlook.com.au', 'outlook.com.br', 'outlook.com.gr', 'outlook.com.pe', 'outlook.com.tr', 'outlook.com.vn', 'outlook.cz', 'outlook.de', 'outlook.dk', 'outlook.es', 'outlook.fr', 'outlook.hu', 'outlook.id', 'outlook.ie', 'outlook.in', 'outlook.it', 'outlook.jp', 'outlook.kr', 'outlook.lv', 'outlook.my', 'outlook.ph', 'outlook.pt', 'outlook.sa', 'outlook.sg', 'outlook.sk', 'passport.com'];

// List of domains used by Yahoo Mail
// This list is likely incomplete
var yahoo_domains = ['rocketmail.com', 'yahoo.ca', 'yahoo.co.uk', 'yahoo.com', 'yahoo.de', 'yahoo.fr', 'yahoo.in', 'yahoo.it', 'ymail.com'];

function normalizeEmail(email, options) {
  options = (0, _merge2.default)(options, default_normalize_email_options);

  if (!(0, _isEmail2.default)(email)) {
    return false;
  }

  var raw_parts = email.split('@');
  var domain = raw_parts.pop();
  var user = raw_parts.join('@');
  var parts = [user, domain];

  // The domain is always lowercased, as it's case-insensitive per RFC 1035
  parts[1] = parts[1].toLowerCase();

  if (parts[1] === 'gmail.com' || parts[1] === 'googlemail.com') {
    // Address is GMail
    if (options.gmail_remove_subaddress) {
      parts[0] = parts[0].split('+')[0];
    }
    if (options.gmail_remove_dots) {
      parts[0] = parts[0].replace(/\./g, '');
    }
    if (!parts[0].length) {
      return false;
    }
    if (options.all_lowercase || options.gmail_lowercase) {
      parts[0] = parts[0].toLowerCase();
    }
    parts[1] = options.gmail_convert_googlemaildotcom ? 'gmail.com' : parts[1];
  } else if (~icloud_domains.indexOf(parts[1])) {
    // Address is iCloud
    if (options.icloud_remove_subaddress) {
      parts[0] = parts[0].split('+')[0];
    }
    if (!parts[0].length) {
      return false;
    }
    if (options.all_lowercase || options.icloud_lowercase) {
      parts[0] = parts[0].toLowerCase();
    }
  } else if (~outlookdotcom_domains.indexOf(parts[1])) {
    // Address is Outlook.com
    if (options.outlookdotcom_remove_subaddress) {
      parts[0] = parts[0].split('+')[0];
    }
    if (!parts[0].length) {
      return false;
    }
    if (options.all_lowercase || options.outlookdotcom_lowercase) {
      parts[0] = parts[0].toLowerCase();
    }
  } else if (~yahoo_domains.indexOf(parts[1])) {
    // Address is Yahoo
    if (options.yahoo_remove_subaddress) {
      var components = parts[0].split('-');
      parts[0] = components.length > 1 ? components.slice(0, -1).join('-') : components[0];
    }
    if (!parts[0].length) {
      return false;
    }
    if (options.all_lowercase || options.yahoo_lowercase) {
      parts[0] = parts[0].toLowerCase();
    }
  } else if (options.all_lowercase) {
    // Any other address
    parts[0] = parts[0].toLowerCase();
  }
  return parts.join('@');
}
module.exports = exports['default'];
});

var index = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});



var _toDate2 = _interopRequireDefault(toDate_1);



var _toFloat2 = _interopRequireDefault(toFloat_1);



var _toInt2 = _interopRequireDefault(toInt_1);



var _toBoolean2 = _interopRequireDefault(toBoolean_1);



var _equals2 = _interopRequireDefault(equals_1);



var _contains2 = _interopRequireDefault(contains_1);



var _matches2 = _interopRequireDefault(matches_1);



var _isEmail2 = _interopRequireDefault(isEmail_1);



var _isURL2 = _interopRequireDefault(isURL_1);



var _isMACAddress2 = _interopRequireDefault(isMACAddress_1);



var _isIP2 = _interopRequireDefault(isIP_1);



var _isFQDN2 = _interopRequireDefault(isFQDN);



var _isBoolean2 = _interopRequireDefault(isBoolean_1);



var _isAlpha2 = _interopRequireDefault(isAlpha_1);



var _isAlphanumeric2 = _interopRequireDefault(isAlphanumeric_1);



var _isNumeric2 = _interopRequireDefault(isNumeric_1);



var _isLowercase2 = _interopRequireDefault(isLowercase_1);



var _isUppercase2 = _interopRequireDefault(isUppercase_1);



var _isAscii2 = _interopRequireDefault(isAscii_1);



var _isFullWidth2 = _interopRequireDefault(isFullWidth_1);



var _isHalfWidth2 = _interopRequireDefault(isHalfWidth_1);



var _isVariableWidth2 = _interopRequireDefault(isVariableWidth_1);



var _isMultibyte2 = _interopRequireDefault(isMultibyte_1);



var _isSurrogatePair2 = _interopRequireDefault(isSurrogatePair_1);



var _isInt2 = _interopRequireDefault(isInt_1);



var _isFloat2 = _interopRequireDefault(isFloat_1);



var _isDecimal2 = _interopRequireDefault(isDecimal_1);



var _isHexadecimal2 = _interopRequireDefault(isHexadecimal_1);



var _isDivisibleBy2 = _interopRequireDefault(isDivisibleBy_1);



var _isHexColor2 = _interopRequireDefault(isHexColor_1);



var _isISRC2 = _interopRequireDefault(isISRC_1);



var _isMD2 = _interopRequireDefault(isMD5_1);



var _isJSON2 = _interopRequireDefault(isJSON_1);



var _isEmpty2 = _interopRequireDefault(isEmpty_1);



var _isLength2 = _interopRequireDefault(isLength_1);



var _isByteLength2 = _interopRequireDefault(isByteLength_1);



var _isUUID2 = _interopRequireDefault(isUUID_1);



var _isMongoId2 = _interopRequireDefault(isMongoId_1);



var _isAfter2 = _interopRequireDefault(isAfter_1);



var _isBefore2 = _interopRequireDefault(isBefore_1);



var _isIn2 = _interopRequireDefault(isIn_1);



var _isCreditCard2 = _interopRequireDefault(isCreditCard_1);



var _isISIN2 = _interopRequireDefault(isISIN_1);



var _isISBN2 = _interopRequireDefault(isISBN_1);



var _isISSN2 = _interopRequireDefault(isISSN_1);



var _isMobilePhone2 = _interopRequireDefault(isMobilePhone_1);



var _isCurrency2 = _interopRequireDefault(isCurrency_1);



var _isISO2 = _interopRequireDefault(isISO8601);



var _isBase2 = _interopRequireDefault(isBase64_1);



var _isDataURI2 = _interopRequireDefault(isDataURI_1);



var _ltrim2 = _interopRequireDefault(ltrim_1);



var _rtrim2 = _interopRequireDefault(rtrim_1);



var _trim2 = _interopRequireDefault(trim_1);



var _escape2 = _interopRequireDefault(_escape);



var _unescape2 = _interopRequireDefault(_unescape);



var _stripLow2 = _interopRequireDefault(stripLow_1);



var _whitelist2 = _interopRequireDefault(whitelist_1);



var _blacklist2 = _interopRequireDefault(blacklist_1);



var _isWhitelisted2 = _interopRequireDefault(isWhitelisted_1);



var _normalizeEmail2 = _interopRequireDefault(normalizeEmail_1);



var _toString2 = _interopRequireDefault(toString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var version = '8.0.0';

var validator = {
  version: version,
  toDate: _toDate2.default,
  toFloat: _toFloat2.default,
  toInt: _toInt2.default,
  toBoolean: _toBoolean2.default,
  equals: _equals2.default,
  contains: _contains2.default,
  matches: _matches2.default,
  isEmail: _isEmail2.default,
  isURL: _isURL2.default,
  isMACAddress: _isMACAddress2.default,
  isIP: _isIP2.default,
  isFQDN: _isFQDN2.default,
  isBoolean: _isBoolean2.default,
  isAlpha: _isAlpha2.default,
  isAlphanumeric: _isAlphanumeric2.default,
  isNumeric: _isNumeric2.default,
  isLowercase: _isLowercase2.default,
  isUppercase: _isUppercase2.default,
  isAscii: _isAscii2.default,
  isFullWidth: _isFullWidth2.default,
  isHalfWidth: _isHalfWidth2.default,
  isVariableWidth: _isVariableWidth2.default,
  isMultibyte: _isMultibyte2.default,
  isSurrogatePair: _isSurrogatePair2.default,
  isInt: _isInt2.default,
  isFloat: _isFloat2.default,
  isDecimal: _isDecimal2.default,
  isHexadecimal: _isHexadecimal2.default,
  isDivisibleBy: _isDivisibleBy2.default,
  isHexColor: _isHexColor2.default,
  isISRC: _isISRC2.default,
  isMD5: _isMD2.default,
  isJSON: _isJSON2.default,
  isEmpty: _isEmpty2.default,
  isLength: _isLength2.default,
  isByteLength: _isByteLength2.default,
  isUUID: _isUUID2.default,
  isMongoId: _isMongoId2.default,
  isAfter: _isAfter2.default,
  isBefore: _isBefore2.default,
  isIn: _isIn2.default,
  isCreditCard: _isCreditCard2.default,
  isISIN: _isISIN2.default,
  isISBN: _isISBN2.default,
  isISSN: _isISSN2.default,
  isMobilePhone: _isMobilePhone2.default,
  isCurrency: _isCurrency2.default,
  isISO8601: _isISO2.default,
  isBase64: _isBase2.default,
  isDataURI: _isDataURI2.default,
  ltrim: _ltrim2.default,
  rtrim: _rtrim2.default,
  trim: _trim2.default,
  escape: _escape2.default,
  unescape: _unescape2.default,
  stripLow: _stripLow2.default,
  whitelist: _whitelist2.default,
  blacklist: _blacklist2.default,
  isWhitelisted: _isWhitelisted2.default,
  normalizeEmail: _normalizeEmail2.default,
  toString: _toString2.default
};

exports.default = validator;
module.exports = exports['default'];
});

var validator = unwrapExports(index);

/* eslint-disable import/extensions */

// @app.route('/api/v2/hash/<h>', methods=['GET'])
//
// @app.route('/api/v2/ip/<ipaddr>', methods=['GET'])
// @app.route('/api/v2/ip/<ipaddr>/<mode>', methods=['GET'])
//
// @app.route('/api/v2/me', methods=['GET'])
// @app.route('/api/v2/me/<mode>', methods=['GET'])
//
// @app.route('/api/email/leaks/<email>', methods=['GET'])
//
// @app.route('/api/v2/dns/<domain>', methods=['GET'])
//
// @app.route('/api/v2/scan/<ip>', methods=['GET'])
// @app.route('/api/v2/scan/<ip>/<portmin>', methods=['GET'])
// @app.route('/api/v2/scan/<ip>/<portmin>/<portmax>', methods=['GET'])
//
// @app.route('/api/status', methods=['GET'])

// todo: makeUrl('/api/:version/:method:arguments', {}, {key: 'test_key'})
var IP = 'ip';
var HASH = 'hash';
var SCAN = 'scan';
var AUTH = 'auth';
var STATUS = 'status';
var DNS = 'dns';
var ME = 'me';
var EMAIL_LEAKS = 'email/leaks';

var endpoint = Object.freeze({
	IP: IP,
	HASH: HASH,
	SCAN: SCAN,
	AUTH: AUTH,
	STATUS: STATUS,
	DNS: DNS,
	ME: ME,
	EMAIL_LEAKS: EMAIL_LEAKS
});

var _argument;

var mode = ['detailed', 'simple', 'blacklist', 'geoip'];

var argument = (_argument = {}, defineProperty(_argument, EMAIL_LEAKS, [{
  arg: 'email',
  required: true,
  check: {
    func: 'isEmail',
    args: [{
      require_display_name: false,
      allow_display_name: false,
      allow_utf8_local_part: true
    }]
  }
}]), defineProperty(_argument, SCAN, [{
  arg: 'ip',
  required: true,
  check: {
    func: 'isIP',
    args: [4]
  }
}, {
  arg: 'portmin',
  required: false,
  check: {
    func: 'isInt',
    args: [{
      gt: 0,
      lt: 65535
    }]
  }
}, {
  arg: 'portmax',
  required: false,
  check: {
    func: 'isInt',
    args: [{
      gt: 0,
      lt: 65535
    }]
  }
}]), defineProperty(_argument, HASH, [{
  arg: 'hash',
  required: true,
  check: {
    func: 'matches',
    args: [/[0-9a-f]{5,40}/i]
  }
}]), defineProperty(_argument, IP, [{
  arg: 'ip',
  alias: 'ipaddr',
  required: true,
  check: {
    func: 'isIP',
    args: [4]
  }
}, {
  arg: 'mode',
  required: false,
  check: mode
}]), defineProperty(_argument, DNS, [{
  arg: 'domain',
  required: true,
  check: {
    func: 'isFQDN',
    args: [{
      require_tld: true,
      allow_underscores: false,
      allow_trailing_dot: false
    }]
  }
}]), defineProperty(_argument, ME, [{
  arg: 'mode',
  required: false,
  check: mode
}]), _argument);

var InsufficientFundsError = function (_Error) {
  inherits(InsufficientFundsError, _Error);

  function InsufficientFundsError() {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Insufficient funds for request';
    classCallCheck(this, InsufficientFundsError);
    return possibleConstructorReturn(this, (InsufficientFundsError.__proto__ || Object.getPrototypeOf(InsufficientFundsError)).call(this, message));
  }

  return InsufficientFundsError;
}(Error);

var _specification;

var specification = (_specification = {}, defineProperty(_specification, STATUS, {
  version: false
}), defineProperty(_specification, EMAIL_LEAKS, {
  version: false
}), _specification);

/* global fetch:false */
/* eslint-disable no-unused-vars */
var _fetchPonyfill = fetchBrowser$1();
var fetch$1 = _fetchPonyfill.fetch;

var FetchCommand = function (_AbstractCommand) {
  inherits(FetchCommand, _AbstractCommand);

  function FetchCommand(params) {
    classCallCheck(this, FetchCommand);

    var _this = possibleConstructorReturn(this, (FetchCommand.__proto__ || Object.getPrototypeOf(FetchCommand)).call(this, 'fetch', params));

    var method = params.method,
        version = params.version,
        data = params.data,
        key = params.key,
        fetchFunc = params.fetchFunc; // todo: do data parsing

    var methods = FetchCommand.getMethods();

    if (!method) throw new TypeError("Empty required param 'method'");
    if (!Object.values(methods).includes(method)) throw new TypeError('Invalid method param');
    if (fetchFunc) _this.fetchFunc = fetchFunc;else _this.fetchFunc = fetch$1;

    _this.api_url = 'https://tempicolabs.com';
    if (version !== undefined) _this.version = version;else _this.version = 'v2';

    if (key !== undefined && typeof key === 'string') _this.map.get(_this).key = key;else if (process && process.env && process.env.TMLABS_KEY) _this.map.get(_this).key = process.env.TMLABS_KEY;
    _this.map.get(_this).method = method;
    _this.map.get(_this).headers = {};
    _this.map.get(_this).args = [];

    _this.map.get(_this).balance_remaining = undefined;
    _this.map.get(_this).balance_lastbill = undefined;
    _this.map.get(_this).balance_reset = undefined;
    // return new Proxy(this, {
    //   get (target, name) {
    //     console.log('PROXY', name)
    //     // if (name.startsWith('_')) {
    //     //   throw new TypeError('Accessing to a private property is not allowed')
    //     // } else {
    //     return target[name]
    //     // }
    //   }
    // })
    return _this;
  }

  createClass(FetchCommand, [{
    key: '_checkArguments',
    value: function _checkArguments(data) {
      var _this2 = this;

      if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object') throw new TypeError('Method params should be an object');else {
        var _error = false;
        var returnArgs = [];
        var methodSpec = FetchCommand.getMethodSpecifications(this.method);
        var args = methodSpec.args,
            spec = methodSpec.spec;

        if (args) {
          args.forEach(function (arg) {
            if (arg.required) {
              if (!{}.hasOwnProperty.call(data, arg.arg) && arg.alias && !{}.hasOwnProperty.call(data, arg.alias)) throw new TypeError('Method required params not found');
              var argValue = void 0,
                  argName = void 0;
              if (data[arg.arg]) {
                argValue = data[arg.arg];
                argName = arg.arg;
              } else if (data[arg.alias]) {
                argValue = data[arg.alias];
                argName = arg.alias;
              } else throw new TypeError('Method required param \'' + arg.arg + '\' validation error');
              if (arg.check) {
                if (_typeof(arg.check) === 'object') {
                  var _validator$func;

                  var _arg$check = arg.check,
                      func = _arg$check.func,
                      _args = _arg$check.args;

                  if (!func) throw new TypeError('Method required params validation function not found!');
                  var validation = (_validator$func = validator[func]).bind.apply(_validator$func, [_this2, argValue + ''].concat(toConsumableArray(_args))); // to string
                  if (!validation()) throw new TypeError('Method required param \'' + arg.arg + '\' validation error');
                }
              }
              returnArgs.push({
                val: argValue,
                arg: argName
              });
            } else {
              if ({}.hasOwnProperty.call(data, arg.arg) || arg.alias && {}.hasOwnProperty.call(data, arg.alias)) {
                var _argValue = void 0,
                    _argName = void 0;
                if (data[arg.arg]) {
                  _argValue = data[arg.arg];
                  _argName = arg.arg;
                } else if (data[arg.alias]) {
                  _argValue = data[arg.alias];
                  _argName = arg.alias;
                }
                if (arg.check) {
                  if (Array.isArray(arg.check)) {
                    if (!arg.check.includes(_argValue)) throw new TypeError('Method optional param \'' + arg.arg + '\' validation error');
                    returnArgs.push({
                      val: _argValue,
                      arg: _argName
                    });
                  }
                }
              }
            }
          });
        }
        return returnArgs;
      }
    }
  }, {
    key: '_makeRequest',
    value: function () {
      var _ref = asyncToGenerator(regeneratorRuntime.mark(function _callee(url) {
        var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var fetchFunc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var headers, body, method, options, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (url) {
                  _context.next = 2;
                  break;
                }

                throw new ReferenceError('Empty url');

              case 2:
                if (!fetchFunc) fetchFunc = fetch$1;
                _context.prev = 3;
                headers = params.headers, body = params.body, method = params.method;

                if (!headers) {
                  headers = {
                    'Content-Type': 'application/json'
                  };
                }
                options = {
                  headers: headers
                };

                if (!method) method = 'GET';else {
                  if (method.toLocaleLowerCase() === 'post' && body) {
                    options.body = JSON.stringify(body);
                  }
                }
                options.method = method;
                _context.next = 11;
                return fetchFunc(url, options);

              case 11:
                response = _context.sent;
                return _context.abrupt('return', response);

              case 15:
                _context.prev = 15;
                _context.t0 = _context['catch'](3);

                console.error(_context.t0);

              case 18:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 15]]);
      }));

      function _makeRequest(_x) {
        return _ref.apply(this, arguments);
      }

      return _makeRequest;
    }()
  }, {
    key: 'run',
    value: function run() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return this.fetch(options);
    }
  }, {
    key: 'fetch',
    value: function () {
      var _ref2 = asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var _this3 = this;

        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var params, method, fetchResponse, args, response, headers, status, statusText, content, contentType, headersList, billHeaders;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                params = {};
                method = options.method || 'GET';

                if (options.key !== undefined && typeof options.key === 'string') this.map.get(this).key = options.key;else if (process && process.env && process.env.TMLABS_KEY) this.map.get(this).key = process.env.TMLABS_KEY;
                fetchResponse = void 0;
                _context2.prev = 4;

                // console.log('FETCH', options);
                args = this._checkArguments(options);

                params = {
                  method: method
                };
                this.map.get(this).args = params.body = args;
                // console.log(this.url);
                // console.log(params);
                _context2.next = 10;
                return this._makeRequest(this.url, params);

              case 10:
                response = _context2.sent;
                headers = response.headers, status = response.status, statusText = response.statusText;
                content = void 0;
                contentType = headers.get('Content-Type');

                if (!(contentType.indexOf('text/html') !== -1)) {
                  _context2.next = 20;
                  break;
                }

                _context2.next = 17;
                return response.text();

              case 17:
                content = _context2.sent;
                _context2.next = 24;
                break;

              case 20:
                if (!(contentType.indexOf('application/json') !== -1)) {
                  _context2.next = 24;
                  break;
                }

                _context2.next = 23;
                return response.json();

              case 23:
                content = _context2.sent;

              case 24:
                fetchResponse = {
                  content: content,
                  headers: {},
                  error: !response.ok,
                  status: status,
                  statusText: statusText
                };
                this.map.get(this).content = content;
                if (headers._headers) {
                  headersList = headers._headers;
                  billHeaders = ['remaining', 'lastbill', 'reset'];

                  billHeaders.forEach(function (suffix) {
                    _this3.map.get(_this3)['balance_' + suffix] = headersList['x-balance-' + suffix];
                  });
                  fetchResponse.headers = headersList;
                }
                Object.keys(fetchResponse).forEach(function (key) {
                  _this3.map.get(_this3)[key] = fetchResponse[key];
                });

                if (!(!response.ok && content && content.error)) {
                  _context2.next = 32;
                  break;
                }

                this.map.get(this).errorText = content.error;

                if (!(status === 429)) {
                  _context2.next = 32;
                  break;
                }

                throw new InsufficientFundsError(content.error);

              case 32:
                return _context2.abrupt('return', fetchResponse);

              case 35:
                _context2.prev = 35;
                _context2.t0 = _context2['catch'](4);

                this.map.get(this).error = true;
                throw _context2.t0;

              case 39:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[4, 35]]);
      }));

      function fetch() {
        return _ref2.apply(this, arguments);
      }

      return fetch;
    }()
  }, {
    key: 'method',
    set: function set$$1(method) {
      if (!method) {
        throw new ReferenceError('Empty method');
      }
      this.map.get(this).method = method;
    },
    get: function get$$1() {
      return this.map.get(this).method;
    }
  }, {
    key: 'headers',
    get: function get$$1() {
      return this.map.get(this).headers;
    }
  }, {
    key: 'args',
    get: function get$$1() {
      return this.map.get(this).args;
    }
  }, {
    key: 'content',
    get: function get$$1() {
      return this.map.get(this).content;
    }
  }, {
    key: 'error',
    get: function get$$1() {
      return this.map.get(this).error;
    }
  }, {
    key: 'status',
    get: function get$$1() {
      return this.map.get(this).status;
    }
  }, {
    key: 'statusText',
    get: function get$$1() {
      return this.map.get(this).statusText;
    }
  }, {
    key: 'errorText',
    get: function get$$1() {
      return this.map.get(this).errorText;
    }
  }, {
    key: 'balanceRemaining',
    get: function get$$1() {
      return this.map.get(this).balance_remaining;
    }
  }, {
    key: 'balanceLastbill',
    get: function get$$1() {
      return this.map.get(this).balance_lastbill;
    }
  }, {
    key: 'balanceReset',
    get: function get$$1() {
      return this.map.get(this).balance_reset;
    }
  }, {
    key: 'url',
    get: function get$$1() {
      var parts = [this.api_url, 'api', this.version, this.method];
      var args = this.args;
      var url = '';
      parts.forEach(function (part) {
        if (part) url += part + '/';
      });
      if (args.length > 0) {
        args.forEach(function (arg) {
          if (arg) url += arg.val + '/';
        });
      }
      if (this.key) url += '?key=' + this.key;
      return url;
    }
  }, {
    key: 'key',
    get: function get$$1() {
      return this.map.get(this).key;
    }
  }], [{
    key: 'getMethodSpecifications',
    value: function getMethodSpecifications() {
      var method = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      var methods = FetchCommand.getMethods();
      var newMethods = {};
      var getOneMethodData = function getOneMethodData(method) {
        var args = argument[method];
        var spec = specification[method];
        var methodData = {};
        if (spec) methodData.spec = spec;
        if (args) methodData.args = args;else methodData.args = [];
        return methodData;
      };
      if (!method) {
        Object.values(methods).forEach(function (method) {
          var data = getOneMethodData(method);
          newMethods[method] = data;
        });
      } else return getOneMethodData(method);
      return newMethods;
    }
  }, {
    key: 'getMethods',
    value: function getMethods() {
      return endpoint;
    }
  }]);
  return FetchCommand;
}(AbstractCommand);

var AuthorizeCommand = function (_FetchCommand) {
  inherits(AuthorizeCommand, _FetchCommand);

  function AuthorizeCommand(params) {
    classCallCheck(this, AuthorizeCommand);

    var _this = possibleConstructorReturn(this, (AuthorizeCommand.__proto__ || Object.getPrototypeOf(AuthorizeCommand)).call(this, {
      method: AUTH
    }));

    var key = void 0;
    if (typeof params === 'string') key = params;else if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) === 'object') {
      key = params.key;
    } else {
      throw new TypeError('Invalid argument type');
    }
    if (!key) throw new TypeError("Empty required param 'key'");
    _this.key = key;
    return _this;
  }

  createClass(AuthorizeCommand, [{
    key: 'login',
    value: function () {
      var _ref = asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', this.fetch({
                  data: {
                    key: this.key
                  },
                  method: 'POST'
                }));

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function login() {
        return _ref.apply(this, arguments);
      }

      return login;
    }()
  }, {
    key: 'logout',
    value: function () {
      var _ref2 = asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt('return', this.fetch({
                  data: {
                    logout: true
                  },
                  method: 'GET'
                }));

              case 1:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function logout() {
        return _ref2.apply(this, arguments);
      }

      return logout;
    }()
  }, {
    key: 'run',
    value: function () {
      var _ref3 = asyncToGenerator(regeneratorRuntime.mark(function _callee3(options) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function run(_x) {
        return _ref3.apply(this, arguments);
      }

      return run;
    }()
  }]);
  return AuthorizeCommand;
}(FetchCommand);

var AuthorizeCommand$2 = function (_FetchCommand) {
  inherits(AuthorizeCommand, _FetchCommand);

  function AuthorizeCommand(params) {
    classCallCheck(this, AuthorizeCommand);
    return possibleConstructorReturn(this, (AuthorizeCommand.__proto__ || Object.getPrototypeOf(AuthorizeCommand)).call(this, Object.assign({}, params, {
      method: STATUS,
      version: false
    })));
  }

  createClass(AuthorizeCommand, [{
    key: 'run',
    value: function () {
      var _ref = asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', this.fetch(options));

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function run() {
        return _ref.apply(this, arguments);
      }

      return run;
    }()
  }]);
  return AuthorizeCommand;
}(FetchCommand);

var Command = function (_AbstractCommand) {
  inherits(Command, _AbstractCommand);

  function Command(action, params) {
    var _ret;

    classCallCheck(this, Command);

    var _this = possibleConstructorReturn(this, (Command.__proto__ || Object.getPrototypeOf(Command)).call(this, action, params));

    var commandClass = _this.class;
    _this.instance = new commandClass(_this.params);
    if (!_this.instance) {
      throw new TypeError('Action not found');
    }
    return _ret = new Proxy(_this, {
      get: function get$$1(target, name) {
        if (name.startsWith('_')) {
          throw new TypeError('Accessing to a private property is not allowed');
        } else {
          if (['run', 'instance', 'class'].includes(name)) return target[name];else return target.instance[name];
        }
      }
    }), possibleConstructorReturn(_this, _ret);
  }

  createClass(Command, [{
    key: 'run',
    value: function run(params) {
      if (this.instance) return this.instance.run(params);
    }
  }, {
    key: 'class',
    get: function get$$1() {
      var action = this.map.get(this).action;
      return Command.getClass(action);
    }
  }], [{
    key: 'getClass',
    value: function getClass() {
      var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!action) throw new ReferenceError('Action param empty');
      switch (action) {
        case 'fetch':
          return FetchCommand;
        case 'auth':
          return AuthorizeCommand;
        case 'status':
          return AuthorizeCommand$2;
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
    var command, answer;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            command = new Command('fetch', params);
            _context.next = 3;
            return command.do();

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

export { TmLabs$1 as TmLabs, Command, fetch };export default TmLabs$1;
//# sourceMappingURL=tmlabs.es.js.map
