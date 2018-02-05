exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('flights', function(table) {
      table.increments()
      table.string('origin').notNullable()
      table.string('destination').notNullable()
      table.string('company').notNullable()
      table.date('date').notNullable()
      table
        .uuid('user')
        .notNullable()
        .references('users.id')
        .onDelete('CASCADE')
      table.text('note').defaultTo('')
      table.timestamps(true, true)
    })
    .createTable('users', function(table) {
      table.increments()
      table
        .string('username')
        .unique()
        .notNullable()
      table.string('password').notNullable()
      table
        .string('email')
        .unique()
        .notNullable()
      table.text('bio').defaultTo('')
      table.timestamps(true, true)
    })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('flights').dropTableIfExists('users')
}
