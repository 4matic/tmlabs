import TmLabs from './TmLabs';
import Command from './Command';

//
const fetch = async (params) => {
  const command = new Command('fetch', params);
  const answer = await command.do();
  return answer;
};
//
export default TmLabs;
export { TmLabs, Command }
