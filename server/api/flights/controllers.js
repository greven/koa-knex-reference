const queries = require('./queries')
// const { ServerError, NotFoundError } = require('../../lib/errors')

module.exports = {
  async getAll(ctx) {
    try {
      const flights = await queries.getAllFlights(ctx.query)
      ctx.body = flights
    } catch (error) {
      throw error
    }
  },

  async getOne(ctx) {
    try {
      const flight = await queries.getSingleFlight(ctx.params.id)
      ctx.body = flight
    } catch (error) {
      throw error
    }
  },

  async create(ctx) {
    try {
      let data = ctx.request.body
      data.user = 1 // FIXME: This is just temporary
      // data.user = ctx.state.user.id
      data.date = new Date(data.date).toJSON() // TODO: Validate the date

      const flight = await queries.createFlight(data)

      if (flight.length) {
        ctx.status = 201
        ctx.body = {
          status: 'success',
          data: flight
        }
      } else {
        ctx.status = 400
        ctx.body = {
          status: 'error',
          message: 'Something went wrong.'
        }
      }
    } catch (error) {
      ctx.status = 400
      ctx.body = {
        status: 'error',
        message: error.message || 'Sorry, an error occurred.'
      }
    }
  },

  async update(ctx) {},

  async del(ctx) {}
}
