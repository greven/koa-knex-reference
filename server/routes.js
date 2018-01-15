const Router = require('koa-router')
const router = new Router()

const api = require('./api')

router.use(api)

module.exports = router.routes()
