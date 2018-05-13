const Router = require('koa-router')
const router = new Router()
const api = new Router()

const flights = require('./flights')
const users = require('./users')

api.use(flights)
api.use(users)

router.use('/api', api.routes())

module.exports = router.routes()
