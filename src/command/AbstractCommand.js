import EventEmitter from 'smelly-event-emitter'

export default class AbstractCommand extends EventEmitter {
  constructor (action, params) {
    super()
    if (new.target === AbstractCommand) {
      throw new TypeError('Cannot construct AbstractCommand instance directly')
    }
    if (!action) throw new ReferenceError('Empty action string argument')
    if (typeof action !== 'string') throw new ReferenceError('Invalid action type')
    if (params !== false) {
      if (!params) throw new ReferenceError('Empty params object argument')
      if (typeof params !== 'object') throw new ReferenceError('Invalid params type')
      if (Object.keys(params).length === 0) throw new ReferenceError('Empty params object')
    }
    this._map = new WeakMap()
    this._map.set(this, {
      action,
      pending: false,
      params
    })
  }
  set action (action) {
    if (!action) {
      throw new Error('Empty action')
    }
    this._map.get(this).action = action
  }
  get action () {
    return this._map.get(this).action
  }
  get params () {
    return this._map.get(this).params
  }
  set params (params) {
    if (!params) {
      throw new Error('Empty params')
    }
    this._map.get(this).params = params
  }
}
