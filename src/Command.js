import AbstractCommand from './command/AbstractCommand';
import FetchCommand from './command/FetchCommand';

export default class Command extends AbstractCommand{
  constructor(action, params) {
    super(action, params);
    // console.log('CLASS', this.class);
  }
  get class() {
    switch (this.action) {
      case 'fetch':
        return new FetchCommand(this.params);
      default:
        throw new ReferenceError('Action not found');
    }
  }
  do() {
    // console.log('command object', this.class);
  }
}
