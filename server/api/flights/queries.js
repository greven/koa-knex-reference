const config = require('../../config')
const db = require('knex')(config.db)
const { createQueryFilter } = require('../../lib/filters')

module.exports = {

  getAllFlights: (query) => {
    return db
      .select('*')
      .from('flights')
      .modify(createQueryFilter, query, [
        'origin',
        'destination',
        'company',
        'date'
      ])
  },

  getSingleFlight: (id) => {
    return db
      .first()
      .from('flights')
      .where({ id: String(id) })
  },

  createFlight: (flight) => {
    return db
      .from('flights')
      .insert(flight)
      .returning('*')
  }
}
