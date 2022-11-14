/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('quiz').del()
  await knex('quiz').insert([
    {
      content_id: 1
    }
  ]);
};
