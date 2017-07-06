import AbstractCommand from './AbstractCommand';

export default class FetchCommand extends AbstractCommand{
  constructor(params) {
    super('fetch', params);
  }
  do() {

  }
}
