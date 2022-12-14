'use strict'

class HttpError extends Error {
  constructor (status, message) {
    super()
    Error.captureStackTrace(this, this.constructor)
    this.message = typeof message === 'object' && message instanceof Error
      ? message.message
      : message || ''
    this.status = status|| 500
  }

  static assert (predicate, statusCode, message, extra) {
    if (predicate) return
    throw new HttpError(statusCode, message, extra)
  }
}

module.exports = HttpError