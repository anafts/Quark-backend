/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('topics').del()
  const skill = await knex('skills').first()
  await knex('topics').insert([

    {
      title: 'Introdução',
      order: '1',
      active_icon: '/icons/inteligencia-emocional.svg',
      disabled_icon: '/icons/inteligencia-emocional-desativado.svg',
      skills_id: skill.id
    },


  ]);
};
