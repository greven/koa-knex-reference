const uuid = require('uuid')
const queries = require('./queries')

const getAll = async ctx => {
  try {
    const flights = await queries.getAllFlights()
    ctx.status = 200
    ctx.body = {
      status: 'success',
      data: flights
    }
  } catch (error) {
    ctx.status = 500
    ctx.body = {
      status: 'error',
      message: 'Something went wrong.'
    }
  }
}

const getOne = async ctx => {
  try {
    const movie = await queries.getSingleFlight(ctx.params.id)
    ctx.status = 200
    ctx.body = {
      status: 'success',
      data: movie
    }
  } catch (error) {
    ctx.status = 500
    ctx.body = {
      status: 'error',
      message: 'Something went wrong.'
    }
  }
}

const create = async ctx => {
  let data = ctx.request.body
  data.id = uuid()

  try {
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
}

const update = async ctx => {

}

const remove = async ctx => {

}

module.exports = { getAll, getOne, create, update, remove }
