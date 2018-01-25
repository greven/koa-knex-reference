const Router = require('koa-router')
const { get, create, update, login } = require('./controllers')
const auth = require('../../middleware/auth')

const router = new Router()

router
  .post('/users', create)
  .post('/users/login', login)
  .get('/users', auth, get)
  .put('/users', auth, update)
  // .get('users/all', admin, update) // TODO: Add admin auth: https://stackoverflow.com/questions/45025613/role-based-jwt-authorization

module.exports = router.routes()
