import TmLabs from './TmLabs'
import Command from './Command'
import FetchCommand from './command/FetchCommand'
import StatusCommand from './command/StatusCommand'
import HashCommand from './command/HashCommand'

/**
 * Simple fetch function
 * @function fetch
 * @param params
 * @member module:TmLabs.fetch
 * @returns {Promise}
 */
const fetch = async (params) => {
  const command = new FetchCommand(params)
  const answer = await command.run(params)
  return answer
}

/**
 * Simple hash function
 * @function hash
 * @param params
 * @member module:TmLabs.hash
 * @returns {Promise}
 */
const hash = async (params) => {
  console.log('hash', params)
  const command = new HashCommand()
  const answer = await command.run(params)
  return answer
}

export default TmLabs

/**
 * SDK Available Globals.
 * Default export is Main TmLabs object class.
 * @example
 * // returns specific classes from package module
 * import { HashCommand as HashClass } '@tempicolabs/tmlabs'
 * @example
 * // returns default TmLabs main object class
 * import TmLabs '@tempicolabs/tmlabs'
 * @module TmLabs
 * @property {TmLabs} TmLabs - Main object TmLabs class
 * @property {Command} Command - Main Command object class
 * @property {FetchCommand} FetchCommand - FetchCommand object class
 * @property {HashCommand} HashCommand - HashCommand object class
 * @property {StatusCommand} StatusCommand - StatusCommand object class
 */
export {
  TmLabs,
  Command,
  fetch,
  hash,
  FetchCommand,
  StatusCommand,
  HashCommand
}
