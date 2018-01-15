const Router = require('koa-router')
const router = new Router()
const api = new Router()

const flights = require('./flights')

api.use(flights)

router.use('/api', api.routes())

module.exports = router.routes()
