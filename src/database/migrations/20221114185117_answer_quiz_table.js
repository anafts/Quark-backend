/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {

    return knex.schema.createTable('answers', function (table) {
        
        table.increments('id').primary()
        table.string('alternative', 1000).notNullable()
        table.boolean('correct')

        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())

        table
        .integer('questions_id')
        .notNullable()
        .references('id')
        .inTable('questions')
        .onDelete('CASCADE')
        
    });
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
    return knex.schema.dropTable('answers');

};
