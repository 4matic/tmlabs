import validator from 'validator';
import AbstractCommand from './AbstractCommand';
import { endpoint, specification, argument } from '../constant';

require('es6-promise').polyfill();
require('isomorphic-fetch');

export default class FetchCommand extends AbstractCommand{
  constructor(params) {
    super('fetch', params);
    const { method, version, data, fetchFunc } = params;
    const methods = FetchCommand.getMethods();

    if (!method) throw new TypeError("Empty required param 'method'");
    if (!Object.values(methods).includes(method)) throw new TypeError("Invalid method param");
    if (fetchFunc) this.fetchFunc = fetchFunc;
    else this.fetchFunc = fetch;

    this.api_url = 'https://tempicolabs.com';
    if(version !== undefined) this.version = version;
    else this.version = 'v2';
    this.map.get(this).method = method;
    this.map.get(this).headers = {};

    // this._checkArguments(data);

    return new Proxy(this, {
      get(target, name) {
        if (name.startsWith('_')) {
          throw new TypeError('Accessing to a private property is not allowed');
        } else {
          return target[name];
        }
      }
    });
  }
  _checkArguments(data) {
    if(typeof data !== 'object') throw new TypeError(`Method params should be an object`);
    else {
      let error = false;
      let returnArgs = {};
      const methodSpec = FetchCommand.getMethodSpecifications(this.method);
      const { args, spec } = methodSpec;
      if(args) {
        args.forEach((arg) => {
          if(arg.required) {
            if(!({}).hasOwnProperty.call(data, arg.arg) && (arg.alias && !({}).hasOwnProperty.call(data, arg.alias))) throw new TypeError(`Method required params not found`);
            const argValue = data[arg.arg] || data[arg.alias];
            if(!argValue) throw new TypeError(`Method required param '${arg.arg}' validation error`);
            if(arg.check) {
              if(typeof arg.check === 'object') {
                const { func, args } = arg.check;
                if(!func) throw new TypeError(`Method required params validation function not found!`);
                const validation = validator[func].bind(this, argValue, ...args);
                if(!validation()) throw new TypeError(`Method required param '${arg.arg}' validation error`);
              }
            }
          }
        });
      }
      return returnArgs;
    }
  }
  _makeRequest = async (url, params = {}, fetchFunc = false) => {
    if(!url) throw new ReferenceError("Empty url");
    if(!fetchFunc) fetchFunc = fetch;
    try {
      let { headers, body, method } = params;
      if(!headers) headers = {
        'Content-Type': 'application/json'
      };
      let options = {
        headers,
      };
      if(!method) method = 'GET';
      else {
        if(method.toLocaleLowerCase() === 'post' && body) {
          options.body = JSON.stringify(body);
        }
      }
      options.method = method;
      const response = await fetchFunc(url, options);
      return response;
    } catch(e) {
      console.error(e);
    }
  }
  static getMethodSpecifications(method = false) {
    const methods = FetchCommand.getMethods();
    const newMethods = {};
    const getOneMethodData = (method) => {
      const args = argument[method];
      const spec = specification[method];
      const methodData = {};
      if(spec) methodData.spec = spec;
      if(args) methodData.args = args;
      else methodData.args = [];
      return methodData;
    };
    if(!method) {
      Object.values(methods).forEach((method) => {
        const data = getOneMethodData(method);
        newMethods[method] = data;
      });
    } else return getOneMethodData(method);
    return newMethods;
  }
  static getMethods() {
    return endpoint;
  }
  set method(method) {
    if(!method) {
      throw new ReferenceError("Empty method");
    }
    this.map.get(this).method = method;
  }
  run = async (options = {}) => {
    return await this.fetch(options);
  }
  fetch = async (options = {}) => {
    let params = {};
    const method = options.method || 'GET';
    let fetchResponse;
    try {
      // console.log('FETCH', options);
      const args = this._checkArguments(options);
      params = {
        method,
      };
      params.body = args;
      // console.log(this.url);
      // console.log(params);
      const response = await this._makeRequest(this.url, params);
      const { headers, status, statusText } = response;
      let content;
      const contentType = response.headers.get('Content-Type');
      if(contentType.indexOf('text/html') !== -1) {
        content = await response.text();
      } else if(contentType.indexOf('application/json') !== -1) {
        content = await response.json();
      }
      fetchResponse = {
        content,
        headers: {},
        error: !response.ok,
        status,
        statusText,
      };
      this.map.get(this).content = content;
      ['remaining', 'lastbill', 'reset'].forEach((suffix) => {
        fetchResponse.headers[`balance_${suffix}`] = headers.get(`x-balance-${suffix}`);
      });
      Object.keys(fetchResponse).forEach((key) => {
        this.map.get(this)[key] = fetchResponse[key];
      });
      return fetchResponse;
    } catch(err) {
      this.map.get(this).error = true;
      console.error('FETCH EXCEPTION', err.message);
      throw err;
    }
  }
  get method() {
    return this.map.get(this).method;
  }
  get headers() {
    return this.map.get(this).headers;
  }
  get content() {
    return this.map.get(this).content;
  }
  get error() {
    return this.map.get(this).error;
  }
  get status() {
    return this.map.get(this).status;
  }
  get statusText() {
    return this.map.get(this).statusText;
  }
  get url() {
    const parts = [this.api_url, 'api', this.version, this.method];
    let query = '';
    let url = '';
    parts.forEach((part) => {
      if(part) url+=`${part}/`;
    });
    url += query;
    return url;
  }
}
