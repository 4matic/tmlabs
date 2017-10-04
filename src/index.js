import TmLabs from './TmLabs'
import Command from './Command'
import Account from './Account'
import FetchCommand from './command/FetchCommand'
import StatusCommand from './command/StatusCommand'
import HashCommand from './command/HashCommand'

/**
 * Simple fetch function.
 * @example
 * // es6
 * import { fetch } from '@tempicolabs/tmlabs'
 * fetch('ip', { ip: '8.8.8.8' }).then((ipData) => {
 *  console.log('Status data:', ipData);
 * });
 * @function fetch
 * @param method
 * @param params See options argument {@link FetchCommand#fetch}
 * @member module:TmLabs.fetch
 * @returns {Promise}
 */
const fetch = async (method, params) => {
  const command = new FetchCommand({ method })
  const answer = await command.run(params)
  return answer
}

/**
 * Simple hash function
 * @example
 * // es6
 * import { hash } from '@tempicolabs/tmlabs'
 * hash({ hash: 'ff2178501f16e2c6ab435cfbabd45c90e7419c0e828d7da9d5c63acf016ba051' }).then((hashData) => {
 *  console.log('Hash data:', hashData);
 * });
 * @function hash
 * @param params See options argument {@link HashCommand#run}
 * @member module:TmLabs.hash
 * @returns {Promise}
 */
const hash = async (params) => {
  const command = new HashCommand()
  const answer = await command.run(params)
  return answer
}

export default TmLabs

/**
 * SDK Available Globals.
 * Default export is Main TmLabs object class.
 * @example
 * // es6
 * // returns specific classes from package module
 * import { HashCommand as HashClass } from '@tempicolabs/tmlabs'
 *
 * // or
 *
 * var tmLabs = require('@tempicolabs/tmlabs');
 * var HashCommand = tmLabs.HashCommand;
 * @example
 * // in browser
 * <script src="dist/tmlabs.min.js"></script>
 * <script>
 *   var tmLabs = TmLabs.HashCommand();
 * </script>
 * @example
 * // es6
 * // returns default TmLabs main object class
 * import TmLabs from '@tempicolabs/tmlabs'
 *
 * // or
 * var TmLabs = require('@tempicolabs/tmlabs');
 * var tmLabs = TmLabs.TmLabs();
 * //or
 * var tmLabs = TmLabs.default();
 * @example
 * // in browser
 * <script src="dist/tmlabs.min.js"></script>
 * <script>
 *   var tmLabs = TmLabs.default();
 *   //or
 *   var tmLabs2 = TmLabs.TmLabs();
 * </script>
 * @module TmLabs
 * @property {TmLabs} TmLabs - Main object TmLabs class
 * @property {Command} Command - Main Command object class
 * @property {Account} Account - Class for account
 * @property {FetchCommand} FetchCommand - FetchCommand object class
 * @property {HashCommand} HashCommand - HashCommand object class
 * @property {StatusCommand} StatusCommand - StatusCommand object class
 */
export {
  TmLabs,
  Command,
  Account,
  fetch,
  hash,
  FetchCommand,
  StatusCommand,
  HashCommand
}
