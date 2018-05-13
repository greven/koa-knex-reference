const _ = require('lodash')
const jwt = require('jsonwebtoken')
const { jwtConfig } = require('../config')

const generateToken = user => {
  return Object.assign({}, user, {
    token: jwt.sign({
      sub: _.pick(user, ['id', 'email', 'password'])
    }, jwtConfig.secret, jwtConfig.options)
  })
}

module.exports = { generateToken }
