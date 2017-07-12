import EventEmitter from 'smelly-event-emitter'
import Command from './Command'
// import * as Constants from './constant';

export default class TmLabs extends EventEmitter {
  constructor (options) {
    super()
    const key = options && options.key ? options.key : false
    const history = []
    this._map = new WeakMap()
    this._map.set(this, {
      key,
      history
    })
  }
  async fetch (method, params = {}) {
    if (this.key) params.key = this.key
    const answer = await this.doCommand(new Command('fetch', {
      method: method
    }), params)
    return answer
  }

  async doCommand (command, params) {
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
    const answer = await command.run(params)
    return answer
  }

  get history () {
    return this._map.get(this).history
  }

  get key () {
    return this._map.get(this).key
  }
}
