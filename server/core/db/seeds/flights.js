exports.seed = (knex, promise) => {
  return knex('flights').del()
    .then(() => {
      return knex('flights').insert({
        id: 'ec92854e-0be6-4620-a872-632d796b7ba9',
        origin: 'Lisbon',
        destination: 'Paris',
        company: 'TAP',
        date: new Date('2017-01-12').toJSON(),
        note: 'My first flight!'
      })
    })
    .then(() => {
      return knex('flights').insert({
        id: '4de30f9e-1a8f-40bb-b6b6-dd24dc7f0a29',
        origin: 'Paris',
        destination: 'Lisbon',
        company: 'Air France',
        date: new Date('2017-02-07').toJSON(),
        note: 'Lovely Paris.'
      })
    })
    .then(() => {
      return knex('flights').insert({
        id: '9892748d-fea5-4437-89fd-8e2fc507d9b6',
        origin: 'Lisbon',
        destination: 'London',
        company: 'British Airways',
        date: new Date('2015-01-24').toJSON(),
        note: 'Tea and biscuits!'
      })
    })
    .then(() => {
      return knex('flights').insert({
        id: 'f3b6353a-ee52-4b8b-9622-20109516d22c',
        origin: 'Manchester',
        destination: 'Sidney',
        company: 'British Airways',
        date: new Date('2018-07-11').toJSON(),
        note: ''
      })
    })
    .then(() => {
      return knex('flights').insert({
        id: 'bbb9353b-80db-4583-ab82-1d46dc3b948c',
        origin: 'Madrid',
        destination: 'London',
        company: 'Iberia',
        date: new Date('2014-03-02').toJSON(),
        note: ''
      })
    })
}
