import EventEmitter from 'smelly-event-emitter'
import Q from 'q'
import PQueue from 'p-queue'
import Command from './Command'
import FetchCommand from './command/FetchCommand'
// import * as Constants from './constant';

export default class TmLabs extends EventEmitter {
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
      history
    })
    this.on('resolved', (command) => {
      this._map.get(this).history.push(command)
    })
  }

  /**
   *
   * @param {{command: string, params: object}} commands Array of command objects which contain command key and it params key for command run options
   * @param options
   * @returns {[{state: 'fulfilled', value: {}}|{state: 'rejected', reason: Error}]}
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
   * @param {[object]} objects array of request parameters
   * @param options additional options
   * @returns {[{state: 'fulfilled', value: {}}|{state: 'rejected', reason: Error}]}
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
   * @returns {Promise}
   */
  runCommand (command, params) {
    return new Promise((resolve, reject) => {
      this.emit('command', command, params)
      command.on('error', (error, cmd) => {
        this.emit('error', error, cmd)
        reject(error)
      })
      command.on('fetch', (options, cmd) => {
        this.emit('fetch', cmd, options)
      })
      command.on('response', (response, cmd) => {
        this.emit('response', cmd, response)
      })
      command.on('raw_response', (response, cmd) => {
        this.emit('raw_response', cmd, response)
      })
      this._map.get(this).queue.add(() => command.run(params).then((response) => {
        this.emit('resolved', command, response)
        resolve(response)
      }))
    })
  }

  get history () {
    return this._map.get(this).history
  }

  get key () {
    return this._map.get(this).key
  }

  get limit () {
    return this._map.get(this).limit
  }

  /**
   * Get number of pending requests
   * @returns {number}
   */
  get pending () {
    return this._map.get(this).queue.pending
  }
}
