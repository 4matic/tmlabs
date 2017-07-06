
export default class AbstractCommand {
  constructor(action, params) {
    if (new.target === AbstractCommand) {
      throw new TypeError("Cannot construct AbstractCommand instance directly");
    }
    if(!action) throw new ReferenceError("Empty action string");
    if(!params) throw new ReferenceError("Empty params object");
    this.action = action;
    this.params = params;
  }
  set action(action) {
    if(!action) {
      throw new Error("Empty action");
    }
    this.action = action;
  }
  get action() {
    return this.action;
  }
  get params() {
    return this.params;
  }
  set params(params) {
    if(!params) {
      throw new Error("Empty params");
    }
    this.params = params;
  }
}
