const { ValidationError } = require('yup')

class BadRequestError extends Error {}

class UnauthorizedError extends Error {}

class ForbiddenError extends Error {}

class NotFoundError extends Error {}

class ServerError extends Error {
  constructor (message, status) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
    this.status = 500
  }
}

module.exports = {
  BadRequestError, // 400
  UnauthorizedError, // 401
  ForbiddenError, // 403
  NotFoundError, // 404
  ValidationError, // 422
  ServerError // 500
}
