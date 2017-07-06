import TmLabs from './TmLabs';
import Command from './Command';

//
const fetch = async (params) => {
  const tmLabs = new TmLabs();
  const answer = await tmLabs.doAction(new Command('fetch', params));
  return answer;
};
//
export default TmLabs;
export { TmLabs, fetch }
