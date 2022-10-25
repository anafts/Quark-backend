/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  
    return knex.schema.createTable('topics', function (table) {
        
        table.increments('id').primary()
        table.string('title').unique().notNullable()
        table.string('order').notNullable()

        table.string('active_icon', 1000).notNullable()
        table.string('disabled_icon', 1000).notNullable()

        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())

        table
        .integer('skills_id')
        .notNullable()
        .references('id')
        .inTable('skills')
        .onDelete('CASCADE')
      });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
    return knex.schema.dropTable('topics');

};
