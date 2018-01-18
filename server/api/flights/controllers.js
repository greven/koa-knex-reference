const uuid = require('uuid')
const queries = require('./queries')
// const { ServerError, NotFoundError } = require('../../lib/errors')

const getAll = async ctx => {
  try {
    const flights = await queries.getAllFlights(ctx)
    ctx.body = flights
  } catch (error) {
    throw error
  }
}

const getOne = async ctx => {
  try {
    const flight = await queries.getSingleFlight(ctx)
    ctx.body = flight
  } catch (error) {
    throw error
  }
}

const create = async ctx => {
  try {
    let data = ctx.request.body
    data.date = new Date(data.date) // TODO: Validate the date
    data.id = uuid()

    const flight = await queries.createFlight(ctx, data)

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
}

const update = async ctx => {

}

const del = async ctx => {

}

module.exports = { getAll, getOne, create, update, del }
