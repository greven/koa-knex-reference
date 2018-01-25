const config = require('../../config')
const db = require('knex')(config.db)

module.exports = {

  getUser: email => {
    return db
      .first()
      .from('users')
      .where({ 'email': email })
  },

  getAllUsers: () => {
    return db
      .select('*')
      .from('users')
  },

  createUser: user => {
    return db
      .from('users')
      .insert(user)
      .returning('*')
  }
}
