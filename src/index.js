import TmLabs from './TmLabs'
import Command from './Command'
import FetchCommand from './command/FetchCommand'
import HashCommand from './command/HashCommand'

const fetch = async (params) => {
  const command = new FetchCommand(params)
  const answer = await command.run(params)
  return answer
}

const hash = async (params) => {
  console.log('hash', params)
  const command = new HashCommand()
  const answer = await command.run(params)
  return answer
}

export default TmLabs
export { TmLabs, Command, fetch, hash, FetchCommand, HashCommand }
