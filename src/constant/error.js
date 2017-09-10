/**
 * @module error
 * @desc SDK errors
 */

/**
 * Response error
 * @class
 */
class ResponseError extends Error {
  /**
   * @constructor
   * @param {string} [message] - Error message
   * @param {Object} [response] - Fetch function object
   */
  constructor (message = 'Response error', response) {
    super(message)
    this.message = message
    this.name = 'ResponseError'
    this.response = response
  }
}

/**
 * Not found error
 * @class
 */
class NotFoundError extends ResponseError {
  /**
   * @constructor
   * @param {string} [message] - Error message
   * @param {Object} [response] - Fetch function object
   */
  constructor (message = 'Not found!', response) {
    super(message, response)
    this.name = 'NotFoundError'
  }
}

/**
 * Error for insufficient funds
 * @class
 */
class InsufficientFundsError extends Error {
  /**
   * @constructor
   * @param {string} [message] - Error message
   * @param {number} [balanceReset] - Seconds until balance change
   */
  constructor (message = 'Insufficient funds for request', balanceReset) {
    super(message)
    this.name = 'InsufficientFundsError'
    this.balanceReset = balanceReset
  }
}

export { InsufficientFundsError, ResponseError, NotFoundError }
