const path = require('path')

const knexfile = require('./knexfile')

const ROOT = path.resolve(__dirname, '../')
const NODE_ENV = process.env.NODE_ENV || 'development'

const isProd = NODE_ENV === 'production'
const isTest = NODE_ENV === 'test'
const isDev = NODE_ENV === 'development'

module.exports = {
  server: {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3000,
    root: ROOT,
    data: path.join(ROOT, '/data')
  },

  env: {
    isDev,
    isTest,
    isProd
  },

  paginate: {
    default: 10,
    max: 50
  },

  db: knexfile[NODE_ENV],

  jwtConfig: {
    secret: process.env.JWT_SECRET || 'secret',
    options: {
      expiresIn: '5d'
    }
  },

  cors: {
    origin: '*',
    exposeHeaders: ['Authorization'],
    credentials: true,
    allowMethods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowHeaders: ['Authorization', 'Content-Type'],
    keepHeadersOnError: true
  }
}
