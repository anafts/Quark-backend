/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('subtopics').del()
  const topics = await knex('topics').first()
  await knex('subtopics').insert([

    {
      title: 'O que é liderança',
      order: '2',
      topics_id: topics.id
    },


  ]);
};
