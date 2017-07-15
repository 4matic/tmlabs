import EventEmitter from 'smelly-event-emitter'
import Q from 'q'
import PQueue from 'p-queue'
import Command from './Command'
import FetchCommand from './command/FetchCommand'

/**
 * Main TmLabs class.
 * @module TmLabs
 * @class
 * @extends EventEmitter
 */
export default class TmLabs extends EventEmitter {
  /**
   * @param {Object} [options] - The options object
   * @constructor
   */
  constructor (options) {
    super()
    const key = options && options.key ? options.key : false
    const limit = options && options.limit ? options.limit : Infinity
    const queue = new PQueue({ concurrency: limit })
    const history = []
    this._map = new WeakMap()
    this._map.set(this, {
      key,
      limit,
      queue,
      history,
      balance_remaining: undefined,
      balance_lastbill: undefined,
      balance_reset: undefined
    })
    this.on('resolved', (command) => {
      this._map.get(this).history.push(command)
    })
  }

  /**
   * Run commands
   * @param {Array.<Object>} commands Array of command objects which contain command key and it params key for command run options
   * @param {Object} [options] Batch command options
   * @param {Boolean} [options.throw=false] If true command will throw exceptions
   * @member TmLabs#runBatch
   * @returns {Promise}
   */
  async runBatch (commands = [], options = {}) {
    let batchResponse = []
    let promises = []
    commands.forEach((commandObj) => {
      if (!commandObj) throw new TypeError('Empty command')
      if (typeof commandObj !== 'object') throw new ReferenceError('Invalid command type')
      if (!commandObj.command) throw new TypeError("Empty required param 'method'")
      const command = commandObj.command
      promises.push(this.runCommand(command, commandObj.params))
    })
    if (!options.throw) batchResponse = await Q.allSettled(promises)
    else batchResponse = await Q.all(promises)
    return batchResponse
  }

  /**
   * Fetch specific method multiple times with different params
   * @param {string} method API method dns|ip, etc
   * @param {Object[]} objects array of request parameters
   * @param options additional options
   * @member TmLabs#fetchBatch
   * @returns {Promise}
   */
  async fetchBatch (method, objects = [], options = {}) {
    let batchResponse = []
    const methods = FetchCommand.getMethods()
    if (!method) throw new TypeError("Empty required param 'method'")
    if (!Object.values(methods).includes(method)) throw new TypeError('Invalid method param')
    let promises = []
    objects.forEach((params) => {
      promises.push(this.fetch(method, params))
    })
    if (!options.throw) batchResponse = await Q.allSettled(promises)
    else batchResponse = await Q.all(promises)
    return batchResponse
  }

  /**
   * Fetch specific method
   * @param {string} method API method dns|ip, etc
   * @param {object} params method parameters
   * @member TmLabs#fetch
   * @returns {Promise}
   */
  fetch (method, params = {}) {
    if (this.key) params.key = this.key
    const answer = this.runCommand(new Command('fetch', {
      method: method
    }), params)
    return answer
  }

  /**
   * Run command with params
   * @param {Command} command
   * @param params command params
   * @member TmLabs#runCommand
   * @resolves {Array.<Object>} result
   * @returns {Promise} result
   */
  runCommand (command, params) {
    let newParams = params
    if (this.key) newParams.key = this.key
    return new Promise((resolve, reject) => {
      this.emit('command', command, newParams)
      command.on('error', (error, cmd) => {
        this.emit('error', error, cmd)
        reject(error)
      })
      command.on('fetch', (options, cmd) => {
        this.emit('fetch', cmd, options)
      })
      command.on('response', (response, cmd) => {
        this.emit('response', cmd, response)
        this._map.get(this).balance_remaining = cmd.balanceRemaining
        this._map.get(this).balance_lastbill = cmd.balanceLastbill
        this._map.get(this).balance_reset = cmd.balanceReset
      })
      command.on('raw_response', (response, cmd) => {
        this.emit('raw_response', cmd, response)
      })
      this._map.get(this).queue.add(() => command.run(newParams).then((response) => {
        this.emit('resolved', command, response)
        resolve(response)
      }))
    })
  }

  /**
   * History array return
   * @member TmLabs#history
   * @returns {AbstractCommand[]}
   */
  get history () {
    return this._map.get(this).history
  }

  /**
   * Active token for TmLabs Object.
   * Overrides if passed into params of [FetchCommand Class]{@link FetchCommand} <code>key</code> or
   * @member TmLabs#key
   * @returns {string}
   */
  get key () {
    return this._map.get(this).key
  }

  /**
   * Get number of simultaneously requests
   * @member TmLabs#limit
   * @returns {number}
   */
  get limit () {
    return this._map.get(this).limit
  }

  /**
   * Get number of pending requests
   * @member TmLabs#pending
   * @returns {number}
   */
  get pending () {
    return this._map.get(this).queue.pending
  }

  /**
   * Remaining balance
   * @member TmLabs#balanceRemaining
   * @see {@link FetchCommand#balanceRemaining}
   * @returns {double|undefined}
   */
  get balanceRemaining () {
    return this._map.get(this).balance_remaining
  }

  /**
   * Last billing cost
   * @member TmLabs#balanceLastbill
   * @see {@link FetchCommand#balanceLastbill}
   * @returns {double|undefined}
   */
  get balanceLastbill () {
    return this._map.get(this).balance_lastbill
  }

  /**
   * Returns number of seconds before free key credits renew
   * @member TmLabs#balanceReset
   * @see {@link FetchCommand#balanceReset}
   * @returns {undefined|double}
   */
  get balanceReset () {
    return this._map.get(this).balance_reset
  }
}
