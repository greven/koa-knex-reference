const koaJwt = require('koa-jwt')
const { jwtConfig } = require('../config')

module.exports = koaJwt({
  getToken (ctx, options) {
    const { authorization } = ctx.header

    if (authorization && authorization.split(' ')[0] === 'Bearer') {
      return authorization.split(' ')[1]
    }

    if (authorization && authorization.split(' ')[0] === 'Token') {
      return authorization.split(' ')[1]
    }
    return null
  },
  secret: jwtConfig.secret,
  passthrough: true,
  key: 'jwt'
})
