exports.seed = (knex, promise) => {
  return knex('flights').del()
    .then(() => {
      return knex('flights').insert({
        id: 'ec92854e-0be6-4620-a872-632d796b7ba9',
        origin: 'Lisbon',
        destination: 'Paris',
        company: 'TAP',
        date: '2017-01-12',
        note: 'My first flight!'
      })
    })
    .then(() => {
      return knex('flights').insert({
        id: '4de30f9e-1a8f-40bb-b6b6-dd24dc7f0a29',
        origin: 'Paris',
        destination: 'Lisbon',
        company: 'Air France',
        date: '2017-02-07',
        note: 'Lovely Paris.'
      })
    })
    .then(() => {
      return knex('flights').insert({
        id: '9892748d-fea5-4437-89fd-8e2fc507d9b6',
        origin: 'Lisbon',
        destination: 'London',
        company: 'British Airways',
        date: '2018-02-05',
        note: 'Tea and biscuits!'
      })
    })
}
