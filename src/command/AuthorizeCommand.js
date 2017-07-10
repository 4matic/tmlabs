import FetchCommand from './FetchCommand'
import { endpoint } from '../constant'

export default class AuthorizeCommand extends FetchCommand {
  constructor (params) {
    super({
      method: endpoint.AUTH
    })
    let key
    if (typeof params === 'string') key = params
    else if (typeof params === 'object') {
      key = params.key
    } else {
      throw new TypeError('Invalid argument type')
    }
    if (!key) throw new TypeError("Empty required param 'key'")
    this.key = key
  }
  async login () {
    return this.fetch({
      data: {
        key: this.key
      },
      method: 'POST'
    })
  }
  async logout () {
    return this.fetch({
      data: {
        logout: true
      },
      method: 'GET'
    })
  }
  async run (options) {
    // console.log('login', options);
    // return await this.login();
  }
}
