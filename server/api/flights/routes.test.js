const supertest = require('supertest')
// const uuid = require('uuid')
const config = require('../../config')
const app = require('../..//app')
const db = require('knex')(config.db)

const server = app.listen(4000)
const request = supertest.agent(server)

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
      expect(response.status).toBe(200)
      expect(response.type).toBe('application/json')
      expect(response.body).toBeDefined()
      expect(response.body).toHaveLength(5)
    })
    it('should return all the flights filtered by origin', async () => {
      const response = await request.get('/api/flights?origin=Lisbon')
      expect(response.status).toBe(200)
      expect(response.type).toBe('application/json')
      expect(response.body).toBeDefined()
      expect(response.body).toHaveLength(2)
      response.body.map(flight => {
        expect(flight.origin).toBe('Lisbon')
      })
    })
    it('should return all the flights filtered by multiple origins', async () => {
      const response = await request.get('/api/flights?origin=Lisbon,Paris')
      expect(response.status).toBe(200)
      expect(response.type).toBe('application/json')
      expect(response.body).toBeDefined()
      expect(response.body).toHaveLength(3)
      response.body.map(flight => {
        expect(['Paris', 'Lisbon']).toContain(flight.origin)
      })
    })
  })

  describe('GET /api/flights/:id', () => {
    it('should return a single flight', async () => {
      const response = await request.get('/api/flights/bbb9353b-80db-4583-ab82-1d46dc3b948c')
      expect(response.status).toBe(200)
      expect(response.type).toBe('application/json')
      expect(response.body).toBeDefined()
      expect(response.body.origin).toBe('Madrid')
      expect(Array.isArray(response.body)).toBeFalsy()
    })
  })

  // describe('POST /api/flights', () => {
  //   it('should create a new flight', async () => {
  //     const response = await request.post('/api/flights').send({
  //       id: uuid(),
  //       origin: 'Dijon',
  //       destination: 'Paris',
  //       company: 'Air France',
  //       date: '2020-01-01',
  //       note: 'This is a note.'
  //     })
  //     expect(response.status).toBe(201)
  //     expect(response.type).toBe('application/json')
  //     expect(response.body.status).toBe('success')
  //     expect(response.body.data).toBeDefined()
  //   })

  //   it('should throw an error if payload is malformed', async () => {
  //     const response = await request.post('/api/flights').send({
  //       id: uuid(),
  //       origin: 'Tokyo'
  //     })
  //     expect(response.status).toBe(400)
  //     expect(response.type).toBe('application/json')
  //     expect(response.body.status).toBe('error')
  //     expect(response.body).toHaveProperty('message')
  //   })
  // })
})
