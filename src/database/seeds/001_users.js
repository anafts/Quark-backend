/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  
  // users login
  await knex('users').del()
  await knex('users').insert([
    {email: 'professor@example.com', password: 'quark12345'}
  ]);
};
