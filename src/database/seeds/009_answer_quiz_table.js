/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('answers').del()
  await knex('answers').insert([
    {
      alternative: "alternative 1",
      questions_id: 1
    },
    {
      alternative: "alternative 2",
      questions_id: 1
    }
  ]);
};
