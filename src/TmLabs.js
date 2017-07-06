import * as Constants from './constant';

export default class TmLabs {
  constructor(options) {
    // console.log('Constants', Constants);
    // console.log('Options', options);
    if(options) {
      try {
        this.token = options.token;
      } catch (e) {
        console.error(e);
      }
    }
  }
  fetch = async (params) => {

  }

  doAction = async (command) => {

  }

  set token(token) {
    if(!token) {
      throw new Error("Token is empty!");
    }
    this.token = token;
  }
  get token() {
    return this.token;
  }
}
