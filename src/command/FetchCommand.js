import AbstractCommand from './AbstractCommand';
import { endpoint } from '../constant';

require('es6-promise').polyfill();
require('isomorphic-fetch');

export default class FetchCommand extends AbstractCommand{
  constructor(params) {
    super('fetch', params);
    const { method, fetchFunc } = params;
    const methods = FetchCommand.getMethods();

    if (!method) throw new TypeError("Empty required param 'method'");
    if (!Object.values(methods).includes(method)) throw new TypeError("Invalid method param");
    if (fetchFunc) this.fetchFunc = fetchFunc;
    else this.fetchFunc = fetch;

    this.api_url = 'https://tempicolabs.com/';
    if(params.version !== false) this.version = 'v2';
    else this.version = params.version;
    this.map.get(this).method = method;
    this.map.get(this).headers = {};
  }
  makeRequest = async (url, params = {}, fetchFunc = false) => {
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
    const { data } = options;
    let params = {};
    console.log('options', options);
    const method = options.method || 'GET';
    let fetchResponse;
    try {
      params = {
        method,
      };
      if(data) params.body = data;
      console.log(this.url);
      console.log(params);
      const response = await this.makeRequest(this.url, params);
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
        //this.map.get(this).headers[`balance_${suffix}`] = headers.get(`x-balance-${suffix}`);
      });
      Object.keys(fetchResponse).forEach((key) => {
        this.map.get(this)[key] = fetchResponse[key];
      });
      return fetchResponse;
    } catch(err) {
      console.error(err);
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
  get url() { // todo: replace with url package
    const version = this.version ? `${this.version}/` : '';
    return `${this.api_url}api/${version}${this.method}`;
  }
}
