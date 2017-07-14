/* global fetch:false */
/* eslint-disable no-unused-vars */
import os from 'os'
import fetchPonyfill from 'fetch-ponyfill'
import promisePonyfill from 'es6-promise'
// import 'babel-polyfill'
import isIP from 'validator/lib/isIP'
import isFQDN from 'validator/lib/isFQDN'
import isEmail from 'validator/lib/isEmail'
import isInt from 'validator/lib/isInt'
import matches from 'validator/lib/matches'
import AbstractCommand from './AbstractCommand'
import { endpoint, specification, argument, error } from '../constant'
promisePonyfill.polyfill()
const { fetch } = fetchPonyfill()

const validator = {
  isIP,
  isInt,
  isFQDN,
  isEmail,
  matches
}

export default class FetchCommand extends AbstractCommand {
  constructor (params) {
    super('fetch', params)
    const { method, version, data, key, fetchFunc } = params // todo: do data parsing
    const methods = FetchCommand.getMethods()

    if (!method) throw new TypeError("Empty required param 'method'")
    if (!Object.values(methods).includes(method)) throw new TypeError('Invalid method param')
    if (fetchFunc) this.fetchFunc = fetchFunc
    else this.fetchFunc = fetch

    this.api_url = 'https://tempicolabs.com'
    if (version !== undefined) this.version = version
    else this.version = 'v2'

    if (key !== undefined && typeof key === 'string') this._map.get(this).key = key
    else if (process.env.TMLABS_KEY) this._map.get(this).key = process.env.TMLABS_KEY
    this._map.get(this).method = method
    this._map.get(this).headers = {}
    this._map.get(this).args = []
    this._map.get(this).rawArgs = []

    this._map.get(this).balance_remaining = undefined
    this._map.get(this).balance_lastbill = undefined
    this._map.get(this).balance_reset = undefined
  }
  static getMethods () {
    return endpoint
  }
  static getMethodSpecifications (method = false) {
    const methods = FetchCommand.getMethods()
    const newMethods = {}
    const getOneMethodData = (method) => {
      const args = argument[method]
      const spec = specification[method]
      const methodData = {}
      if (spec) methodData.spec = spec
      if (args) methodData.args = args
      else methodData.args = []
      return methodData
    }
    if (!method) {
      Object.values(methods).forEach((method) => {
        const data = getOneMethodData(method)
        newMethods[method] = data
      })
    } else return getOneMethodData(method)
    return newMethods
  }
  _checkArguments (data) {
    if (typeof data !== 'object' && data !== false) throw new TypeError(`Method params should be an object`)
    else {
      let error = false
      let returnArgs = []
      const methodSpec = FetchCommand.getMethodSpecifications(this.method)
      const { args, spec } = methodSpec
      if (data && args) {
        args.forEach((arg) => {
          if (arg.required) {
            if (!({}).hasOwnProperty.call(data, arg.arg) && (arg.alias && !({}).hasOwnProperty.call(data, arg.alias))) throw new TypeError(`Method required params not found`)
            let argValue, argName
            if (data[arg.arg]) {
              argValue = data[arg.arg]
              argName = arg.arg
            } else if (data[arg.alias]) {
              argValue = data[arg.alias]
              argName = arg.alias
            } else throw new TypeError(`Method required param '${arg.arg}' validation error`)
            if (arg.check) {
              if (typeof arg.check === 'object') {
                const { func, args } = arg.check
                if (!func) throw new TypeError(`Method required params validation function not found!`)
                const validation = validator[func].bind(this, argValue + '', ...args) // to string
                if (!validation()) throw new TypeError(`Method required param '${arg.arg}' validation error`)
              }
            }
            returnArgs.push({
              val: argValue,
              arg: argName
            })
          } else {
            if (({}).hasOwnProperty.call(data, arg.arg) || (arg.alias && ({}).hasOwnProperty.call(data, arg.alias))) {
              let argValue, argName
              if (data[arg.arg]) {
                argValue = data[arg.arg]
                argName = arg.arg
              } else if (data[arg.alias]) {
                argValue = data[arg.alias]
                argName = arg.alias
              }
              if (arg.check) {
                if (Array.isArray(arg.check)) {
                  if (!arg.check.includes(argValue)) throw new TypeError(`Method optional param '${arg.arg}' validation error`)
                } else if (typeof arg.check === 'object') {
                  const {func, args} = arg.check
                  if (!func) throw new TypeError(`Method optional params validation function not found!`)
                  const validation = validator[func].bind(this, argValue + '', ...args) // to string
                  if (!validation()) throw new TypeError(`Method optional param '${arg.arg}' validation error`)
                }
                returnArgs.push({
                  val: argValue,
                  arg: argName
                })
              }
            }
          }
        })
      }
      if (spec) {
        if (spec['version'] !== 'undefined') {
          this.version = spec['version']
        }
      }
      return returnArgs
    }
  }
  async _makeRequest (url, params = {}, fetchFunc = false) {
    if (!url) throw new ReferenceError('Empty url')
    if (!fetchFunc) fetchFunc = fetch
    try {
      let { headers, body, method } = params
      if (!headers) {
        headers = {
          'Content-Type': 'application/json'
        }
        if (typeof module !== 'undefined' && module.exports) {
          headers['User-Agent'] = `${os.type()}_${process.arch} Node ${process.version} - TempicoLabs SDK`
        }
      }
      let options = {
        headers
      }
      if (!method) method = 'GET'
      else {
        if (method.toLocaleLowerCase() === 'post' && body) {
          options.body = JSON.stringify(body)
        }
      }
      options.method = method
      // console.log(options)
      this.emit('fetch', options, this)
      this._map.get(this).pending = true
      const response = await fetchFunc(url, options)
      this._map.get(this).pending = false
      this.emit('raw_response', response, this)
      return response
    } catch (err) {
      this._map.get(this).error = true
      this._map.get(this).errorText = err.message
      this.emit('error', err, this)
      throw err
    }
  }
  set method (method) {
    if (!method) {
      throw new ReferenceError('Empty method')
    }
    this._map.get(this).method = method
  }
  run (options = {}) {
    return this.fetch(options)
  }
  async fetch (options = {}) {
    let params = {}
    const method = options.method || 'GET'
    const headers = options.headers || false
    if (options.key !== undefined && typeof options.key === 'string') this._map.get(this).key = options.key
    else if (process.env.TMLABS_KEY) this._map.get(this).key = process.env.TMLABS_KEY
    let fetchResponse
    try {
      // console.log('FETCH', options);
      this._map.get(this).rawArgs = options
      const args = this._checkArguments(options)
      params = {
        method
      }
      if (headers !== false) params.headers = headers
      this._map.get(this).args = params.body = args
      // console.log(this.url);
      // console.log(params);
      const response = await this._makeRequest(this.url, params)
      if (response) {
        const {headers, status, statusText} = response
        let content
        const contentType = headers.get('Content-Type')
        if (contentType.indexOf('text/html') !== -1) {
          content = await response.text()
        } else if (contentType.indexOf('application/json') !== -1) {
          content = await response.json()
        }
        fetchResponse = {
          content,
          headers: {},
          error: !response.ok && ![404].includes(status),
          status,
          statusText
        }
        this._map.get(this).content = content
        let responseHeaders = {}
        if (headers._headers) responseHeaders = headers._headers;
        else {
          for (let header of headers.entries()) {
            responseHeaders[header[0]] = header[1]
          }
        }
        if (responseHeaders) {
          const billHeaders = ['remaining', 'lastbill', 'reset']
          billHeaders.forEach((suffix) => {
            let value = responseHeaders[`x-balance-${suffix}`]
            if (Array.isArray(value)) value = value[0]
            this._map.get(this)[`balance_${suffix}`] = parseFloat(value)
          })
          fetchResponse.headers = responseHeaders
        }
        Object.keys(fetchResponse).forEach((key) => {
          this._map.get(this)[key] = fetchResponse[key]
        })
        if (fetchResponse.error && content && content.error) {
          this._map.get(this).errorText = content.error
          if (status === 429) throw new error.InsufficientFundsError(content.error)
          this.emit('error', new Error(content.error), this)
        }
      } else {
        throw new Error('Response is empty!')
      }
      this.emit('response', fetchResponse, this)
      return fetchResponse
    } catch (err) {
      this._map.get(this).error = true
      this._map.get(this).errorText = err.message
      this.emit('error', err, this)
      throw err
    }
  }
  get method () {
    return this._map.get(this).method
  }
  get headers () {
    return this._map.get(this).headers
  }

  /**
   * Get checked command arguments.
   * @returns {[{arg: string, val: *}]}
   */
  get args () {
    return this._map.get(this).args
  }

  /**
   * Get raw args. Fetch command args
   * @returns {Array}
   */
  get rawArgs () {
    return this._map.get(this).rawArgs
  }
  get content () {
    return this._map.get(this).content
  }
  get error () {
    return this._map.get(this).error
  }
  get status () {
    return this._map.get(this).status
  }
  get statusText () {
    return this._map.get(this).statusText
  }
  get errorText () {
    return this._map.get(this).errorText
  }
  get balanceRemaining () {
    return this._map.get(this).balance_remaining
  }
  get balanceLastbill () {
    return this._map.get(this).balance_lastbill
  }
  get balanceReset () {
    return this._map.get(this).balance_reset
  }
  get pending () {
    return this._map.get(this).pending
  }
  get url () {
    const parts = [this.api_url, 'api', this.version, this.method]
    const args = this.args
    let url = ''
    parts.forEach((part) => {
      if (part) url += `${part}/`
    })
    if (args.length > 0) {
      args.forEach((arg) => {
        if (arg) url += `${arg.val}/`
      })
    }
    if (this.key) url += `?key=${this.key}`
    return url
  }
  get key () {
    return this._map.get(this).key
  }
}
