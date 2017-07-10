import FetchCommand from './FetchCommand'
import { endpoint } from '../constant'

export default class AuthorizeCommand extends FetchCommand {
  constructor (params) {
    super(Object.assign({}, params, {
      method: endpoint.STATUS,
      version: false
    }))
  }
  async run (options = {}) {
    return this.fetch(options)
  }
}
