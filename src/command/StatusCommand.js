import FetchCommand from './FetchCommand';
import { endpoint } from '../constant';

export default class AuthorizeCommand extends FetchCommand{
  constructor(params) {
    super({
      method: endpoint.STATUS,
      version: false,
    });
  }
  run = async (options = {}) => {
    return await this.fetch(options);
  }
}
