/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('answers').del()
  const question = await knex('questions').first()
  await knex('answers').insert([
    {
      alternative: "alternative 1",
      questions_id: question.id
    },
    {
      alternative: "alternative 2",
      questions_id: question.id
    }
  ]);
};
