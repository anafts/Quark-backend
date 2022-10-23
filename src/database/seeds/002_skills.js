/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('skills').del()
  await knex('skills').insert([
    {
      title: 'Inteligência Emocional',
      color: '#FF9637',
    }
  ]);
};
