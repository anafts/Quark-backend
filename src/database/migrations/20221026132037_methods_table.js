/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {

    return knex.schema.createTable('methods', function (table) {
        
        table.increments('id').primary()
        table.string('title').unique().notNullable()
        table.string('description', 1000).notNullable() 
        table.string('order').notNullable() 


        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())

        table
        .integer('subtopics_id')
        .notNullable()
        .references('id')
        .inTable('subtopics')
        .onDelete('CASCADE')
      });

};

  


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    
    return knex.schema.dropTable('methods') ;
  
};

