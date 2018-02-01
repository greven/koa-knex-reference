const _ = require('lodash')

module.exports = async (ctx, next) => {
  if (_.has(ctx, 'state.jwt.sub.id')) {
    ctx.state.user = await ctx.app.db
      .from('users')
      .first()
      .where({ id: ctx.state.jwt.sub.id })
  }
  return next()
}
