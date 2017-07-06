import * as Constants from './constant';

export default class TmLabs {
  constructor(options) {
    console.log('Constants', Constants);
    console.log('Options', options);
  }
  fetch = async (params) => {

  }
  setToken = (token) => {

  }
}
//
const fetch = (options) => {
  const tmLabs = new TmLabs(options);
  return tmLabs.fetch();
};
//
export { fetch }
