exports.up = function (knex, Promise) {
  return knex.schema
    .createTable('flights', function (table) {
      table.uuid('id').unique().primary().notNullable()
      table.string('origin').notNullable()
      table.string('destination').notNullable()
      table.string('company').notNullable()
      table.date('date').notNullable()
      table.text('note').defaultTo('')
      table.timestamps(true, true)
    })
}

exports.down = function (knex, Promise) {
  return knex.schema
    .dropTableIfExists('flights')
}
