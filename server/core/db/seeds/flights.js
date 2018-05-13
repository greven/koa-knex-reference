exports.seed = (knex, promise) => {
  return knex('flights').del()
    .then(() => {
      return knex('flights').insert({
        origin: 'Lisbon',
        destination: 'Paris',
        company: 'TAP',
        user: 1,
        date: new Date('2017-01-12').toJSON(),
        note: 'My first flight!'
      })
    })
    .then(() => {
      return knex('flights').insert({
        origin: 'Paris',
        destination: 'Lisbon',
        company: 'Air France',
        user: 1,
        date: new Date('2017-02-07').toJSON(),
        note: 'Lovely Paris.'
      })
    })
    .then(() => {
      return knex('flights').insert({
        origin: 'Lisbon',
        destination: 'London',
        company: 'British Airways',
        user: 1,
        date: new Date('2015-01-24').toJSON(),
        note: 'Tea and biscuits!'
      })
    })
    .then(() => {
      return knex('flights').insert({
        origin: 'Manchester',
        destination: 'Sidney',
        company: 'British Airways',
        user: 1,
        date: new Date('2018-07-11').toJSON(),
        note: ''
      })
    })
    .then(() => {
      return knex('flights').insert({
        origin: 'Madrid',
        destination: 'London',
        company: 'Iberia',
        user: 1,
        date: new Date('2014-03-02').toJSON(),
        note: ''
      })
    })
}
