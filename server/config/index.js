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
    protocol: process.env.PROTOCOL || 'http',
    root: ROOT,
    data: path.join(ROOT, '/data')
  },

  env: {
    isDev,
    isTest,
    isProd
  },

  db: knexfile[NODE_ENV],

  cors: {
    origin: '*',
    exposeHeaders: ['Authorization'],
    credentials: true,
    allowMethods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowHeaders: ['Authorization', 'Content-Type'],
    keepHeadersOnError: true
  }

}
