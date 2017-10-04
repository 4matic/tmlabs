import EventEmitter from 'smelly-event-emitter'
import StatusCommand from './command/StatusCommand'
import { event } from './constant'

class Account extends EventEmitter {
  /**
   * Account for API requests
   * @constructs Account
   * @param {Object} options - The options object
   * @param {String} [options.key] - Token key
   */
  constructor (options = {}) {
    super()
    if (typeof options === 'string') {
      this.key = options
    } else {
      if (options.key) this.key = options.key
    }
    if (!this.key) this.key = false
    this._map = new WeakMap()
    this._map.set(this, {
      balance_remaining: undefined,
      balance_lastbill: undefined,
      balance_reset: undefined
    })
  }

  /**
   * Run command with params on behalf of this account
   * @param {Command} command
   * @param params command params
   * @member Account#runCommand
   * @see {@link module:constants~event}
   * @returns {Promise} result
   */
  runCommand (command, params) {
    let newParams = params
    if (this.key) newParams.key = this.key
    command.on(event.RESPONSE, (response, cmd) => {
      const prevBalance = this._map.get(this).balance_remaining
      if (prevBalance !== cmd.balanceRemaining) {
        this.emit(event.BALANCE_CHANGED, cmd, cmd.balanceLastbill)
      }
      this._map.get(this).balance_remaining = cmd.balanceRemaining
      this._map.get(this).balance_lastbill = cmd.balanceLastbill
      this._map.get(this).balance_reset = cmd.balanceReset
    })
    return command.run(newParams)
  }

  /**
   * Remaining balance
   * @member Account#balanceRemaining
   * @see {@link FetchCommand#balanceRemaining}
   * @returns {double|undefined}
   */
  get balanceRemaining () {
    return this._map.get(this).balance_remaining
  }

  /**
   * Last billing cost
   * @member Account#balanceLastBill
   * @see {@link FetchCommand#balanceLastBill}
   * @returns {double|undefined}
   */
  get balanceLastBill () {
    return this._map.get(this).balance_lastbill
  }

  /**
   * Returns number of seconds before free key credits renew
   * @member Account#balanceReset
   * @see {@link FetchCommand#balanceReset}
   * @returns {undefined|double}
   */
  get balanceReset () {
    return this._map.get(this).balance_reset
  }

  /**
   * Get account balance by making new request
   * @member Account#getBalance
   * @see {@link Account#getStatus}
   * @returns {{}}
   */
  async getBalance () {
    const statusData = await this.getStatus()
    return {
      remaining: statusData['balance-remaining'],
      reset: statusData['balance-reset']
    }
  }

  /**
   * Get account subscriptions by making new request
   * @member Account#getSubscriptions
   * @see {@link Account#getStatus}
   * @returns {null|{}}
   */
  async getSubscriptions () {
    const statusData = await this.getStatus()
    const { subscriptions } = statusData
    return subscriptions
  }

  /**
   * Get account status by making new request
   * @member Account#getStatus
   * @see {@link StatusCommand}
   * @returns {{}}
   */
  async getStatus () {
    const statusCommand = new StatusCommand({
      key: this.key
    })
    const { content, headers } = await this.runCommand(statusCommand, false)
    return Object.assign({}, {
      'balance-reset': parseInt(headers['x-balance-reset'][0], 10)
    }, content)
  }
}

export default Account
