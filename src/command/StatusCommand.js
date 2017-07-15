import FetchCommand from './FetchCommand'
import { endpoint } from '../constant'

/**
 * StatusCommand for getting status about yourself
 * @module StatusCommand
 * @class
 * @extends FetchCommand
 */
class StatusCommand extends FetchCommand {
  /**
   *
   * @param {Object|false|undefined} params - command params
   */
  constructor (params) {
    super(Object.assign({}, params, {
      method: endpoint.STATUS,
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
