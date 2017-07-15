/**
 * @module error
 * @desc SDK errors
 */

/**
 * Error for insufficient funds
 * @class
 */
class InsufficientFundsError extends Error {
  /**
   * @constructor
   * @param {string} [message] - Error message
   */
  constructor (message = 'Insufficient funds for request') {
    super(message)
  }
}

export { InsufficientFundsError }
