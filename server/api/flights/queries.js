const config = require('../../config')
const db = require('knex')(config.db)
const { createQueryFilter } = require('../../lib/filters')

module.exports = {

  getAllFlights: (ctx) => {
    return db
      .select('*')
      .from('flights')
      .modify(createQueryFilter, ctx.query, [
        'origin',
        'destination',
        'company',
        'date'
      ])
  },

  getSingleFlight: (ctx) => {
    return db
      .first()
      .from('flights')
      .where({ id: String(ctx.params.id) })
  },

  createFlight: (ctx, flight) => {
    return db
      .from('flights')
      .insert(flight)
      .returning('*')
  }
}
