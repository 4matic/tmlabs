import AbstractCommand from './command/AbstractCommand';
import FetchCommand from './command/FetchCommand';

export default class Command extends AbstractCommand{
  constructor(action, params) {
    super(action, params);
    if(!this.instance) {
      throw new TypeError("Action not found");
    }
  }
  static getClass(action = false) {
    if(!action) throw new ReferenceError("Action param empty");
    switch (action) {
      case 'fetch':
        return FetchCommand;
      default:
        throw new ReferenceError('Action not found');
    }
  }
  get class() {
    const action = this.map.get(this).action;
    return Command.getClass(action);
  }
  get instance() {
    const commandClass = this.class;
    return new commandClass(this.params);
  }
  do() {
    // console.log('command object', this.class);
  }
}
