const bcrypt = require('bcrypt')

exports.seed = (knex, promise) => {
  return knex('users').del()
    .then(async () => {
      return knex('users').insert({
        username: 'admin',
        password: await bcrypt.hash('w3lcome1!', 10),
        email: 'admin@ifly.com',
        bio: 'I am therefore I think!'
      })
    })
    .then(async () => {
      return knex('users').insert({
        username: 'user1',
        password: await bcrypt.hash('mypassword', 10),
        email: 'creepy.user@gmail.com',
        bio: 'Go away'
      })
    })
}
