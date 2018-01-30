const bcrypt = require('bcrypt')
const queries = require('./queries')
const jwt = require('../../lib/jwt')
const { isObject, isSet, omit } = require('../../../lib/objects')

module.exports = {

  /**
   * Get current user's data
   *
   * @param {Object} ctx  - The application context
   */
  async get (ctx) {
    if (isSet(() => ctx.state.user)) {
      const user = jwt.generateToken(ctx.state.user)
      ctx.body = user
    }
  },

  async register (ctx) {
    // NOTE: Do we really need try catch for one type of error?
    try {
      let user = ctx.request.body
      user.password = await bcrypt.hash(user.password, 10)

      // TODO: Validate user with schema
      // validate user
      await queries.createUser(user)
      user = jwt.generateToken(user)

      ctx.status = 201
      ctx.body = omit(user, ['password'])
    } catch (error) {
      throw error
    }
  },

  async update (ctx) {
    ctx.body = 'Authenticated'
  },

  async login (ctx) {
    try {
      const login = ctx.request.body

      if (!isObject(login) || !login.email || !login.password) {
        ctx.throw(422)
        // TODO: Throw validation error
      }

      let user = await queries.getUser(login.email)

      if (!user) {
        ctx.throw(401)
        // TODO: Throw validation error (user not found)
      }

      const isPassValid = await bcrypt.compare(login.password, user.password)

      if (!isPassValid) {
        ctx.throw(422)
        // TODO: Throw validation error (wrong password)
      }

      user = jwt.generateToken(user)
      ctx.body = omit(user, ['password'])
    } catch (error) {
      throw error
    }
  }
}
