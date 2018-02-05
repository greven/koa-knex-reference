const Koa = require('koa')
const helmet = require('koa-helmet')
var logger = require('koa-logger')
var compress = require('koa-compress')
var responseTime = require('koa-response-time')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')
const db = require('./middleware/db')
const jwt = require('./middleware/jwt')
const user = require('./middleware/user')
const paginate = require('./middleware/paginate')

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

// json web token
app.use(jwt)

// paginate requests
app.use(paginate)

// context user state
app.use(user)

// body parser
app.use(bodyParser())

// cors config
app.use(cors(config.cors))

// compression
app.use(compress())

// routing
app.use(router)

module.exports = app
