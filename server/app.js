const Koa = require('koa')
const helmet = require('koa-helmet')
var logger = require('koa-logger')
var compress = require('koa-compress')
var responseTime = require('koa-response-time')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')
const db = require('./middleware/db')

const config = require('./config')
const router = require('./routes')

const app = new Koa()

if (!config.env.isTest) {
  // headers security
  app.use(helmet())

  // x-response-time
  app.use(responseTime())

  // logging
  app.use(logger())
}

// db
app.use(db(app))

// cors config
app.use(cors(config.cors))

// compression
app.use(compress())

// body parser
app.use(bodyParser())

// routing
app.use(router)

module.exports = app
