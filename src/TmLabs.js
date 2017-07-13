import EventEmitter from 'smelly-event-emitter'
import PQueue from 'p-queue'
import PAll from 'p-all'
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
  }

  /**
   *
   * @param {{command: string, params: object}} commands Array of command objects which contain command key and it params key for command run options
   * @param options
   * @returns {Promise.<Array>}
   */
  async runBatch (commands = [], options = {}) {
    let batchResponse = []
    if (!options.throw) { // get array of results including errors
      for (let i = 0; i < commands.length; i++) {
        const commandObj = commands[i]
        try {
          if (!commandObj) throw new TypeError('Empty command')
          if (typeof commandObj !== 'object') throw new ReferenceError('Invalid command type')
          if (!commandObj.command) throw new TypeError("Empty required param 'method'")
          const command = commandObj.command
          // if (!Object.values(methods).includes(command.method)) throw new TypeError('Only command instance could be')
          const response = await this.runCommand(command, commandObj.params)
          batchResponse.push(response)
        } catch (e) {
          batchResponse.push({
            error: true,
            errorText: e.message
          })
        }
      }
    } else {
      let promises = []
      commands.forEach((commandObj) => {
        if (!commandObj) throw new TypeError('Empty command')
        if (typeof commandObj !== 'object') throw new ReferenceError('Invalid command type')
        if (!commandObj.command) throw new TypeError("Empty required param 'method'")
        const command = commandObj.command
        promises.push(() => this.runCommand(command, commandObj.params))
      })
      batchResponse = await PAll(promises, {concurrency: this.limit})
    }
    return batchResponse
  }

  /**
   * Fetch specific method multiple times with different params
   * @param {string} method API method dns|ip, etc
   * @param {[object]} objects array of request parameters
   * @param options additional options
   * @returns {Promise.<Array>}
   */
  async fetchBatch (method, objects = [], options = {}) {
    let batchResponse = []
    const methods = FetchCommand.getMethods()
    if (!method) throw new TypeError("Empty required param 'method'")
    if (!Object.values(methods).includes(method)) throw new TypeError('Invalid method param')
    if (!options.throw) { // get array of results including errors
      for (let i = 0; i < objects.length; i++) {
        try {
          const response = await this.fetch(method, objects[i])
          batchResponse.push(response)
        } catch (e) {
          batchResponse.push({
            error: true,
            errorText: e.message
          })
        }
      }
    } else {
      let promises = []
      objects.forEach((params) => {
        promises.push(this.fetch(method, params))
      })
      batchResponse = await PAll(promises, {concurrency: this.limit})
    }
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
  async runCommand (command, params) {
    this._map.get(this).history.push(command)
    this.emit('command', command, params)
    command.on('error', (error, cmd) => {
      this.emit('error', error, cmd)
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
    const answer = command.run(params)
    return answer
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
