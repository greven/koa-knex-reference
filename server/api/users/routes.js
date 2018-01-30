const Router = require('koa-router')
const { get, update, register, login } = require('./controllers')
const auth = require('../../middleware/auth')

const router = new Router()

router
  .post('/users', register)
  .post('/users/login', login)
  .get('/users', auth, get)
  .put('/users', auth, update)
  // .get('users/all', admin, update) // TODO: Add admin auth: https://stackoverflow.com/questions/45025613/role-based-jwt-authorization

module.exports = router.routes()
