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
import TmLabs from './../TmLabs'
import { endpoint, specification, argument, error, event } from '../constant/index'
promisePonyfill.polyfill()
const { fetch } = fetchPonyfill()
// const { fetch } = require('fetch-ponyfill')()
const { InsufficientFundsError, ResponseError, NotFoundError } = error

const validator = {
  isIP,
  isInt,
  isFQDN,
  isEmail,
  matches
}

class FetchCommand extends AbstractCommand {
  /**
   * FetchCommand for API requests
   * @constructs FetchCommand
   * @param {Object} params - The params object
   * @param {String} [params.key] - Token key
   * @param {String} params.method - Fetch method
   * @param {Boolean} [params.formatting=true] - Enable JSON formatting (for better performance)
   * @augments AbstractCommand
   * @throws TypeError
   * @throws ReferenceError
   */
  constructor (params) {
    super('fetch', params)
    const { method, version, data, key, fetchFunc, formatting } = params // todo: do data parsing
    const methods = FetchCommand.methods

    if (!method) throw new TypeError("Empty required param 'method'")
    if (!Object.values(methods).includes(method)) throw new TypeError('Invalid method param')
    if (fetchFunc) this.fetchFunc = fetchFunc
    else this.fetchFunc = FetchCommand.fetchClass

    if (version !== undefined) this.version = version
    else this.version = 'v3'

    if (key !== undefined && typeof key === 'string') this._map.get(this).key = key
    else if (process.env.TMLABS_KEY) this._map.get(this).key = process.env.TMLABS_KEY

    if (formatting !== undefined) this.formatting = formatting
    else this.formatting = true

    /**
     * FetchCommand method
     * @type {string}
     * @throws ReferenceError
     * @member FetchCommand#method
     */
    this._map.get(this).method = method
    this._map.get(this).headers = {}
    this._map.get(this).args = []
    this._map.get(this).rawArgs = []

    this._map.get(this).balance_remaining = undefined
    this._map.get(this).balance_lastbill = undefined
    this._map.get(this).balance_reset = undefined
  }

  /**
   * Available methods
   * @static
   * @property {array} method list
   */
  static get methods () {
    return endpoint
  }

  /**
   * API hostname
   * @static
   * @returns {String}
   */
  static get apiUrl () {
    return 'https://tempicolabs.com'
  }

  /**
   * Get method specifications
   * @static
   * @param {String|false} [method=false] if method defined get specifications for this method, else get all
   * @member FetchCommand#getMethodSpecifications
   * @returns {Object|Object[]}
   */
  static getMethodSpecifications (method = false) {
    const methods = FetchCommand.methods
    const newMethods = {}
    const getOneMethodData = (method) => {
      const args = argument[method]
      const spec = specification[method]
      const methodData = {}
      if (spec) methodData.spec = spec
      if (args) {
        methodData.args = args.map((arg) => {
          let checkFunc = null
          if (arg.check && arg.check.func) checkFunc = validator[arg.check.func]
          arg.checkFunc = checkFunc
          return arg
        })
      } else methodData.args = []
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

  /**
   * Checking arguments
   * @param {Object|false} data - checking data
   * @returns {Array}
   * @throws TypeError
   * @member FetchCommand#_checkArguments
   * @private
   */
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

  /**
   * Instance function for making request
   * @async
   * @param {String} url fetching url
   * @param {Object} [params={}] request parameters
   * @param {function|false} [fetchFunc=false] fetch function
   * @throws Error
   * @throws ReferenceError
   * @member FetchCommand#_makeRequest
   * @returns {Promise}
   * @private
   */
  async _makeRequest (url, params = {}, fetchFunc = false) {
    try {
      this.emit(event.FETCH, params, this)
      this._map.get(this).pending = true
      const fetchResponse = await FetchCommand.makeRequest(url, params, fetchFunc)
      const { response, options } = fetchResponse
      this._map.get(this).pending = false
      this.emit(event.RAW_RESPONSE, response, this)
      return response
    } catch (err) {
      this._map.get(this).error = true
      this._map.get(this).errorText = err.message
      this.emit(event.ERROR, err, this)
      throw err
    }
  }

  /**
   * Main static fetch function
   * @async
   * @static
   * @param {String} url fetching url
   * @param {Object} [params={}] request parameters
   * @param {function|false} [fetchFunc=false] fetch function
   * @throws Error
   * @throws ReferenceError
   * @member FetchCommand#makeRequest
   * @returns {Promise}
   * @private
   */
  static async makeRequest (url, params = {}, fetchFunc = false) {
    if (!url) throw new ReferenceError('Empty url')
    if (!fetchFunc) fetchFunc = fetch
    try {
      let { headers, body, method, formatting } = params
      if (!headers) {
        headers = {
          'Content-Type': 'application/json'
        }
        if (!process.env.browser) {
          headers['User-Agent'] = `${os.type()}_${process.arch} Node ${process.version} - TempicoLabs SDK v${TmLabs.version}`
        }
        if (formatting) {
          headers['X-Requested-With'] = 'XMLHttpRequest'
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
      const response = await fetchFunc(url, options)
      return { response, options }
    } catch (err) {
      throw err
    }
  }

  get method () {
    return this._map.get(this).method
  }

  set method (method) {
    if (!method) {
      throw new ReferenceError('Empty method')
    }
    this._map.get(this).method = method
  }

  /**
   * Run FetchCommand.
   * Options params can be found in [fetch method]{@link FetchCommand#fetch}
   * @param {Object} [options={}] - The options object
   * @member FetchCommand#run
   * @returns {Promise}
   */
  run (options = {}) {
    return this.fetch(options)
  }

  /**
   * Fetch method
   * @async
   * @param {Object} [options={}] - The options object
   * @param {String} [options.key] - Token key
   * @param {Object} [options.headers=false] - Custom headers for request
   * @param {String} [options.method='GET'] - Custom method. e.g 'POST', 'GET'
   * @member FetchCommand#fetch
   * @throws InsufficientFundsError
   * @throws NotFoundError
   * @throws ResponseError
   * @throws Error
   * @returns {Promise}
   */
  async fetch (options = {}) {
    let params = {}
    let fetchResponse
    if (!options) options = {}
    try {
      // if (options.key !== undefined && typeof options.key === 'string') this._map.get(this).key = options.key
      const args = this._checkArguments(options)
      const method = options.method || 'GET'
      const headers = options.headers || false
      if (process.env.TMLABS_KEY) options.key = process.env.TMLABS_KEY
      this._map.get(this).rawArgs = options
      params = {
        method
      }
      if (headers !== false) params.headers = headers
      this._map.get(this).args = params.body = args
      params.formatting = this.formatting
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
          error: !response.ok,
          status,
          statusText
        }
        this._map.get(this).content = content
        this._map.get(this).status = status
        let responseHeaders = {}
        if (headers._headers) responseHeaders = headers._headers
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
        if (fetchResponse.error || (content && content.error)) {
          if (status === 429) throw new InsufficientFundsError(content.error, this._map.get(this).balance_reset)
          if (status === 404 && options.throwNotFound === true) throw new NotFoundError(content.error, response)
          else if ((status === 404 || status === 200) && !options.throwNotFound) fetchResponse.content = null
          else throw new ResponseError(content.error, response)
        }
      } else {
        throw new ResponseError('Response is empty!')
      }
      this.emit(event.RESPONSE, fetchResponse, this)
      return fetchResponse
    } catch (err) {
      // if (err instanceof NotFoundError) {
      //
      // } else {
      // }
      this._map.get(this).error = true
      this._map.get(this).errorText = err.message
      this.emit(event.ERROR, err, this)
      throw err
    }
  }

  /**
   * Request headers
   * @type {Object|undefined}
   * @readonly
   * @member FetchCommand#headers
   */
  get headers () {
    return this._map.get(this).headers
  }

  /**
   * Filtered command arguments
   * @type {Object[]}
   * @readonly
   * @member FetchCommand#args
   */
  get args () {
    return this._map.get(this).args
  }

  /**
   * Filtered command arguments
   * @type {Object}
   * @readonly
   * @member FetchCommand#rawArgs
   */
  get rawArgs () {
    return this._map.get(this).rawArgs
  }

  /**
   * Request json encoded object
   * @type {Object}
   * @readonly
   * @member FetchCommand#content
   */
  get content () {
    return this._map.get(this).content
  }

  /**
   * Error occurred?
   * @type {Boolean}
   * @readonly
   * @member FetchCommand#error
   */
  get error () {
    return this._map.get(this).error
  }

  /**
   * Get status code.
   * @example
   * return 200
   * @member FetchCommand#status
   * @readonly
   * @returns {number|undefined}
   */
  get status () {
    return this._map.get(this).status
  }

  /**
   * todo: fix
   * Get command request statusText. e.g 'OK', 'NOT FOUND' and etc.
   * @example
   * return 'OK'
   * @member FetchCommand#statusText
   * @readonly
   * @returns {String|undefined}
   */
  get statusText () {
    return this._map.get(this).statusText
  }

  /**
   * Get command error text if error occurred
   * @member FetchCommand#errorText
   * @readonly
   * @returns {String|undefined}
   */
  get errorText () {
    return this._map.get(this).errorText
  }

  /**
   * Remaining balance
   * @type {double|undefined}
   * @readonly
   * @member FetchCommand#balanceRemaining
   */
  get balanceRemaining () {
    return this._map.get(this).balance_remaining
  }

  /**
   * Get last request cost
   * @type {double|undefined}
   * @readonly
   * @member FetchCommand#balanceLastbill
   */
  get balanceLastbill () {
    return this._map.get(this).balance_lastbill
  }

  /**
   * Returns number of seconds before free key credits renew
   * @type {double|undefined}
   * @readonly
   * @member FetchCommand#balanceReset
   */
  get balanceReset () {
    return this._map.get(this).balance_reset
  }

  /**
   * Is pending request or not
   * @type {Boolean}
   * @readonly
   * @member FetchCommand#pending
   */
  get pending () {
    return this._map.get(this).pending
  }

  /**
   * Request url
   * @type {String}
   * @readonly
   * @member FetchCommand#url
   */
  get url () {
    const parts = [FetchCommand.apiUrl, 'api', this.version, this.method]
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

  /**
   * Token key
   * @type {String}
   * @readonly
   * @member FetchCommand#key
   */
  get key () {
    return this._map.get(this).key
  }

  /**
   * Fetch class used in module, fetch-ponyfill
   * @type {Function}
   * @static
   * @readonly
   * @member FetchCommand#fetchClass
   */
  static get fetchClass () {
    return fetch
  }
}

export default FetchCommand
