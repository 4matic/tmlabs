
export default class AbstractCommand {
  constructor (action, params) {
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
    this.map = new WeakMap()
    this.map.set(this, {
      action,
      params
    })
  }
  set action (action) {
    if (!action) {
      throw new Error('Empty action')
    }
    this.map.get(this).action = action
  }
  get action () {
    return this.map.get(this).action
  }
  get params () {
    return this.map.get(this).params
  }
  set params (params) {
    if (!params) {
      throw new Error('Empty params')
    }
    this.map.get(this).params = params
  }
}
