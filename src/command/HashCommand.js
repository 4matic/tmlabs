import Hasha from 'hasha'
import FetchCommand from './FetchCommand'
import { endpoint, event } from '../constant/index'

class HashCommand extends FetchCommand {
  /**
   * HashCommand class for file & stream hashing.
   * Run method sends hash to API.
   * This class implements {@link https://www.npmjs.com/package/hasha|Hasha} for hashing functionality
   * @constructs HashCommand
   * @augments FetchCommand
   * @param [params]
   * @param {string} [params.key] - API key.
   * @param {string} [params.algorithm=sha256] - Algorithm used for hashing. Only `sha256` and `md5` are allowed
   * @param {string} [params.encoding=hex] - Encoding of the returned hash. {@link https://www.npmjs.com/package/hasha#encoding|Available values}
   * @throws TypeError
   */
  constructor (params = {}) {
    super({
      method: endpoint.HASH,
      ...params
    })
    const { algorithm, encoding } = params
    if (algorithm && !(['sha256', 'md5']).includes(algorithm)) throw new TypeError('Only sha256 and md5 are allowed')

    this._map.get(this).options = {
      algorithm: algorithm || 'sha256',
      encoding: encoding || 'hex'
    }
  }

  /**
   * HashCommand options
   * @type {{ algorithm: string, encoding: string }}
   * @readonly
   * @member HashCommand#options
   */
  get options () {
    return this._map.get(this).options
  }

  /**
   * Get file or stream hash and check it by sending request to API
   * @async
   * @member HashCommand#run
   * @param options You can pass options used in {@link FetchCommand#fetch} merged with options below
   * @param {string} [options.hash] - Hash to check.
   * @param {Stream} [options.stream] - Stream object. {@link HashCommand#hashStream}
   * @param {string} [options.file] - The path to the file. {@link HashCommand#getFileHash}
   * @param {(Buffer|string|Buffer[]|string[])} [options.input] - Input for hashing. {@link HashCommand#getInputHash}
   * @fulfil {Object}
   * @reject {Error}
   * @throws {InsufficientFundsError|TypeError}
   * @returns {Promise}
   */
  async run (options = {}) {
    let fetchHash
    let runResponse
    const { stream, file, input, hash, ...otherOptions } = options
    try {
      if (stream) fetchHash = await this.getStreamHash(stream)
      else if (file) fetchHash = await this.getFileHash(file)
      else if (input) fetchHash = await this.getInputHash(input)
      else if (hash) fetchHash = hash
      else throw new TypeError('None of the required parameters was found')
      runResponse = this.fetch({
        hash: fetchHash,
        ...otherOptions
      })
    } catch (err) {
      this._map.get(this).error = true
      this._map.get(this).errorText = err.message
      this.emit(event.ERROR, err, this)
      throw err
    }
    return runResponse
  }

  /**
   * Get a hash transform stream.
   * *** NOTE: Can't use in browser
   * @see {@link https://nodejs.org/api/crypto.html#crypto_class_hash}
   * @member HashCommand#hashStream
   * @returns {Stream}
   */
  get hashStream () {
    return Hasha.stream(this.options)
  }

  /**
   * Get hash passing stream as parameter.
   * *** NOTE: Can't use in browser
   * @param {Stream} stream Stream object
   * @member HashCommand#getStreamHash
   * @returns {Promise<string>}
   */
  getStreamHash (stream) {
    return Hasha.fromStream(stream, this.options)
  }

  /**
   * Get hash passing only file path.
   * *** NOTE: Can't use in browser
   * @param {string} filepath The path to the file
   * @member HashCommand#getFileHash
   * @returns {Promise<string>}
   */
  getFileHash (filepath) {
    return Hasha.fromFile(filepath, this.options)
  }

  /**
   * Get hash.
   * Can be used in browser
   * @param {(Buffer|string|Buffer[]|string[])} input Input for hashing
   * @see {@link https://www.npmjs.com/package/hasha#input}
   * @member HashCommand#getInputHash
   * @returns {string}
   */
  getInputHash (input) {
    return Hasha(input, this.options)
  }
}

export default HashCommand
