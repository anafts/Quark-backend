/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('methods').del()
  const subtopics = await knex('subtopics').first()
  await knex('methods').insert([
    {
      title: 'O que vamos falar nesse módulo?',
      order: '2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      subtopics_id: subtopics.id
    }
  ]);
};
