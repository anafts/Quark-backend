/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {

    return knex.schema.createTable('content', function (table) {
        
        table.increments('id').primary()
        table.string('text', 1000)
        table.string('audioURL')
        table.string('videoURL')

        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())

        table
        .integer('methods_id')
        .notNullable()
        .references('id')
        .inTable('methods')
        .onDelete('CASCADE')

    });

  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {

    return knex.schema.dropTable('content');
  
};
