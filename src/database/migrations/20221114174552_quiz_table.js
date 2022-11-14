/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  
    return knex.schema.createTable('quiz', function (table) {
        
        table.increments('id').primary()

        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())

        table
        .integer('content_id')
        .notNullable()
        .references('id')
        .inTable('content')
        .onDelete('CASCADE')

    });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {

    return knex.schema.dropTable('quiz');

};
