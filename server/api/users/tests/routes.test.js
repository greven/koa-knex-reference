const supertest = require('supertest')
const bcrypt = require('bcrypt')
const config = require('../../../config')
const app = require('../../../app')
// const jwt = require('../../lib/jwt')
const db = require('knex')(config.db)

const server = app.listen(4000)
const request = supertest.agent(server)

describe('routes: users', () => {
  beforeEach(() => {
    return db.migrate.rollback()
      .then(() => { return db.migrate.latest() })
      .then(() => { return db.seed.run() })
  })

  afterEach(() => db.migrate.rollback())

  afterAll(() => server.close())

  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const response = await request.post('/api/users').send({
        username: 'newuser',
        email: 'newuser@mail.com',
        password: await bcrypt.hash('p@sswoRd', 10),
        bio: 'I\'m a VIP!'
      })
      expect(response.status).toBe(201)
      expect(response.type).toBe('application/json')
      expect(response.body).toBeDefined()
      expect(response.body.username).toBe('newuser')

      let userCount = await db
        .from('users')
        .count('*')
      userCount = userCount[0]['count(*)']

      expect(userCount).toBe(3)
    })
  })

  describe('POST /api/users/login', () => {
    it('should login an existing user', async () => {
      const response = await request.post('/api/users/login').send({
        email: 'admin@ifly.com',
        password: 'w3lcome1!'
      })
      expect(response.status).toBe(200)
      expect(response.type).toBe('application/json')
      expect(response.body).toBeDefined()
      expect(response.body.username).toBe('admin')
    })
  })

  describe('GET /api/users', () => {
    it('should get the current logged user', async () => {
      const loginRes = await request.post('/api/users/login').send({
        email: 'admin@ifly.com',
        password: 'w3lcome1!'
      })

      const response = await request.get('/api/users')
        .set('Authorization', 'Token ' + loginRes.body.token)
      expect(response.status).toBe(200)
      expect(response.type).toBe('application/json')
      expect(response.body).toBeDefined()
    })

    it('should fail without authentication', async () => {
      const response = await request.get('/api/users')
      expect(response.status).toBe(401)
    })
  })
})
