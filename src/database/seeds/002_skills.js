/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('skills').del()
  await knex('skills').insert([
    {
      title: 'InteligĂȘncia Emocional',
      color: '#FF9637',
    }
  ]);
};
