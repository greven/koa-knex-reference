const config = require('../../config')
const db = require('knex')(config.db)

const flights = db('flights')

module.exports = {

  getAllFlights: () => {
    return flights
      .select('*')
  },

  getSingleFlight: (id) => {
    return flights
      .select('*')
      .where({ id: String(id) })
  },

  createFlight: (flight) => {
    return flights
      .insert(flight)
      .returning('*')
  }
}
