class InsufficientFundsError extends Error {
  constructor (message = 'Insufficient funds for request') {
    super(message)
  }
}

export { InsufficientFundsError }
