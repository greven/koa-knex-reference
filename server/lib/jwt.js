const jwt = require('jsonwebtoken')
const { jwtConfig } = require('../config')
const { pick } = require('../lib/objects')

const generateToken = user => {
  return Object.assign({}, user, {
    token: jwt.sign({
      sub: pick(user, ['id', 'email', 'password'])
    }, jwtConfig.secret, jwtConfig.options)
  })
}

module.exports = { generateToken }
