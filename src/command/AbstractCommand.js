import EventEmitter from 'smelly-event-emitter'

class AbstractCommand extends EventEmitter {
  /**
   * AbstractCommand main class which is parent for all commands
   * @constructs AbstractCommand
   * @augments EventEmitter
   * @abstract
   * @param {String} action - Action to be performed
   * @param {Object} params - command params
   * @member AbstractCommand
   * @throws TypeError
   * @throws ReferenceError
   */
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
      /**
       * Command action
       * @type {String}
       * @member AbstractCommand#action
       */
      action,
      /**
       * Pending status
       * @type {Boolean}
       * @member AbstractCommand#pending
       */
      pending: false,
      /**
       * Params
       * @type {Array}
       * @member AbstractCommand#params
       */
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

export default AbstractCommand
