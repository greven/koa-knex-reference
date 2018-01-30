const { isSet } = require('../../lib/objects')

module.exports = async (ctx, next) => {
  if (isSet(() => ctx.state.jwt.sub.id)) {
    ctx.state.user = await ctx.app.db
      .from('users')
      .first()
      .where({ id: ctx.state.jwt.sub.id })
  }
  return next()
}
