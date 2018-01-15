const Router = require('koa-router')

const { getAll, getOne, create, update, remove } = require('./controllers')

const router = new Router()

router
  .get('/flights', getAll)
  .get('/flights/:id', getOne)
  .post('/flights', create)
  .put('/flights/:id', update)
  .delete('/flights/:id', remove)

module.exports = router.routes()
