import AbstractCommand from './command/AbstractCommand';
import FetchCommand from './command/FetchCommand';
import AuthorizeCommand from './command/AuthorizeCommand';
import StatusCommand from './command/StatusCommand';

export default class Command extends AbstractCommand{
  constructor(action, params) {
    super(action, params);
    const commandClass = this.class;
    this.instance = new commandClass(this.params);
    if(!this.instance) {
      throw new TypeError("Action not found");
    }
    return new Proxy(this, {
      get(target, name) {
        if (name.startsWith('_')) {
          throw new TypeError('Accessing to a private property is not allowed');
        } else {
          if(['run', 'instance', 'class'].includes(name)) return target[name];
          else return target.instance[name];
        }
      }
    });
  }
  static getClass(action = false) {
    if(!action) throw new ReferenceError("Action param empty");
    switch (action) {
      case 'fetch':
        return FetchCommand;
      case 'auth':
        return AuthorizeCommand;
      case 'status':
        return StatusCommand;
      default:
        throw new ReferenceError('Action not found');
    }
  }
  get class() {
    const action = this.map.get(this).action;
    return Command.getClass(action);
  }
  // get instance() {
  //   const commandClass = this.class;
  //   return new commandClass(this.params);
  // }
  run() {
    if(this.instance) return this.instance.run();
  }
}
