import AbstractCommand from './command/AbstractCommand'
import FetchCommand from './command/FetchCommand'
import StatusCommand from './command/StatusCommand'

export default class Command extends AbstractCommand {
  constructor (action, params) {
    super(action, params)
    const CommandClass = this.class
    this.instance = new CommandClass(this.params)
    if (!this.instance) {
      throw new TypeError('Action not found')
    }
    return new Proxy(this, {
      get (target, name) {
        if (['run', 'instance', 'class'].includes(name)) return target[name]
        else return target.instance[name]
      }
    })
  }
  static getClass (action = false) {
    if (!action) throw new ReferenceError('Action param empty')
    switch (action) {
      case 'fetch':
        return FetchCommand
      case 'status':
        return StatusCommand
      default:
        throw new ReferenceError('Action not found')
    }
  }
  get class () {
    const action = this._map.get(this).action
    return Command.getClass(action)
  }
  run (params) {
    if (this.instance) return this.instance.run(params)
  }
}
