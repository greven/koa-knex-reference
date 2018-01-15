const supertest = require('supertest')
const uuid = require('uuid')
const config = require('../../../config')
const app = require('../../../app')
const db = require('knex')(config.db)

const server = app.listen(4000)
const request = supertest(server)

describe('routes: flights', () => {
  beforeEach(() => {
    return db.migrate.rollback()
      .then(() => { return db.migrate.latest() })
      .then(() => { return db.seed.run() })
  })

  afterEach(() => db.migrate.rollback())

  afterAll(() => server.close())

  describe('GET /api/flights', () => {
    it('should return all flights', async () => {
      const response = await request.get('/api/flights')
      const data = response.body.data
      expect(response.status).toBe(200)
      expect(response.type).toBe('application/json')
      expect(response.body.status).toBe('success')
      expect(data).toBeDefined()
      expect(data).toHaveLength(3)
    })
  })

  describe('GET /api/flights/:id', () => {
    it('should return a single flight', async () => {
      const response = await request.get('/api/flights/4de30f9e-1a8f-40bb-b6b6-dd24dc7f0a29')
      const data = response.body.data
      expect(response.status).toBe(200)
      expect(response.type).toBe('application/json')
      expect(response.body.status).toBe('success')
      expect(data).toBeDefined()
      expect(data).toHaveLength(1)
    })
  })

  describe('POST /api/flights', () => {
    it('should create a new flight', async () => {
      const response = await request.post('/api/flights').send({
        id: uuid(),
        origin: 'Dijon',
        destination: 'Paris',
        company: 'Air France',
        date: '2020-01-01',
        note: 'This is a note.'
      })
      expect(response.status).toBe(201)
      expect(response.type).toBe('application/json')
      expect(response.body.status).toBe('success')
      expect(response.body.data).toBeDefined()
    })

    it('should throw an error if payload is malformed', async () => {
      const response = await request.post('/api/flights').send({
        id: uuid(),
        origin: 'Tokyo'
      })
      expect(response.status).toBe(400)
      expect(response.type).toBe('application/json')
      expect(response.body.status).toBe('error')
      expect(response.body).toHaveProperty('message')
    })
  })
})
