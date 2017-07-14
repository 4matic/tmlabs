import Hasha from 'hasha'
import SHA256 from 'crypto-js/sha256'
import FetchCommand from './FetchCommand'
import { endpoint } from '../constant'

/**
 * HashCommand class for file & stream hashing.
 * Run method sends hash to API
 */
export default class HashCommand extends FetchCommand {
  constructor (params) {
    super({
      method: endpoint.HASH,
      ...params
    })
  }

  /**
   * Get file or stream hash and check it by sending request to API
   * @param {{stream: Stream}|{file: string}|{hash: string}} options
   * @returns {Promise}
   */
  async run (options = {}) {
    let fetchHash
    let runResponse
    const { stream, file, string, hash, ...otherOptions } = options
    try {
      if (stream) fetchHash = await this.getStreamHash(stream)
      else if (file) fetchHash = await this.getFileHash(file)
      else if (string) fetchHash = await this.getStringHash(string)
      else if (hash) fetchHash = hash
      else throw new TypeError('None of the required parameters was found')
      console.log('otherOptions', options, otherOptions)
      runResponse = this.fetch({
        hash: fetchHash,
        ...otherOptions
      })
    } catch (err) {
      this._map.get(this).error = true
      this._map.get(this).errorText = err.message
      this.emit('error', err, this)
      throw err
    }
    return runResponse
  }

  /**
   * Get Hash transform object
   * @see {@link https://nodejs.org/api/crypto.html#crypto_class_hash}
   */
  get hashStream () {
    return Hasha.stream({
      algorithm: 'sha256'
    })
  }

  /**
   * Get hash passing stream as parameter
   * @param {Stream} stream Stream object
   * @returns {Promise}
   */
  async getStreamHash (stream) {
    const hash = await Hasha.fromStream(stream, {
      algorithm: 'sha256'
    })
    return hash
  }

  /**
   * Get hash passing only file path
   * @param {string} filepath
   * @returns {Promise}
   */
  async getFileHash (filepath) {
    const hash = await Hasha.fromFile(filepath, {
      algorithm: 'sha256'
    })
    return hash
  }

  /**
   * Get SHA256 from string. Useful in browser
   * @param string
   * @returns {string}
   */
  getStringHash (string) {
    const hash = SHA256(string)
    return hash
  }
}
