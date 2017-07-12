import TmLabs from './TmLabs'
import Command from './Command'
import FetchCommand from './command/FetchCommand'

const fetch = async (params) => {
  const command = new Command('fetch', params)
  const answer = await command.do(params)
  return answer
}
//
export default TmLabs
export { TmLabs, Command, fetch, FetchCommand }
