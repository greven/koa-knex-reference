const uuid = require('uuid')
const bcrypt = require('bcrypt')
const queries = require('./queries')
const { isObject, omit } = require('../../../lib/objects')
const { generateToken } = require('../../lib/jwt')

module.exports = {

  async get (ctx) {
    const user = generateToken(ctx.state.user)
    ctx.body = user
  },

  async create (ctx) {
    // NOTE: Do we really need try catch for one type of error?
    try {
      let user = ctx.request.body
      user.id = uuid()
      user.password = await bcrypt.hash(user.password, 12)

      // TODO: Validate user with schema
      // validate user
      await queries.createUser(user)
      user = generateToken(user)

      ctx.body = omit(user, ['password'])
    } catch (error) {
      throw error
    }
  },

  async update (ctx) {

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
        ctx.throw(422)
        // TODO: Throw validation error
      }

      const isPassValid = await bcrypt.compare(login.password, user.password)

      if (!isPassValid) {
        ctx.throw(422)
        // TODO: Throw validation error
      }

      user = generateToken(user)

      ctx.body = omit(user, ['password'])
    } catch (error) {
      throw error
    }
  }
}
