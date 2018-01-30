const { UnauthorizedError } = require('../lib/errors')

// Check if we have a logged in user
module.exports = (ctx, next) => {
  if (!ctx.state.user) {
    ctx.throw(401, new UnauthorizedError())
  }
  return next()
}
