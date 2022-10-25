/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {

    return knex.schema.createTable('subtopics', function (table) {
        
        table.increments('id').primary()
        table.string('title').unique().notNullable()
        table.string('order').notNullable() 

        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())

        table
        .integer('topics_id')
        .notNullable()
        .references('id')
        .inTable('topics')
        .onDelete('CASCADE')
      });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {

    return knex.schema.dropTable('subtopics') ;
  
};
