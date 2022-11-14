/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  
    return knex.schema.createTable('questions', function (table) {
        
        table.increments('id').primary()
        table.string('question', 1000)
        table.boolean('alternative')

        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())

        table
        .integer('quiz_id')
        .notNullable()
        .references('id')
        .inTable('quiz')
        .onDelete('CASCADE')

    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
    return knex.schema.dropTable('questions');

};
