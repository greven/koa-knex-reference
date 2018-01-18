const Router = require('koa-router')

const { getAll, getOne, create, update, del } = require('./controllers')

const router = new Router()

router
  .get('/flights', getAll)
  .get('/flights/:id', getOne)
  .post('/flights', create)
  .put('/flights/:id', update)
  .delete('/flights/:id', del)

module.exports = router.routes()
