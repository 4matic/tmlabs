import FetchCommand from './FetchCommand'
import { endpoint } from '../constant'

class StatusCommand extends FetchCommand {
  /**
   * StatusCommand for getting status about yourself
   * @augments FetchCommand
   * @constructs StatusCommand
   * @param {Object|false|undefined} [params] - command params
   */
  constructor (params) {
    let method = endpoint.ACCOUNT_STATUS
    super(Object.assign({}, params, {
      method,
      version: false
    }))
  }

  /**
   * Return API status promise
   * @param options
   * @member StatusCommand#run
   * @returns {Promise}
   */
  async run (options = {}) {
    return this.fetch(options)
  }
}

export default StatusCommand
