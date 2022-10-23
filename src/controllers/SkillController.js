const knex = require('../database');

module.exports = {

    async listSkill( req, res, next) {
         
        try {

            const listSkill = await knex('skills')
            .select('id', 'title', 'color', 'created_at', 'updated_at');

            return res.status(200).send(listSkill);
        
                
        } catch (error) {

            next(error);
        }
    },

    async updateSkill( req, res, next) {

        const { title, color } = req.body;

        const { id } = req.params;

        await knex('skills')
        .update({ 'title': title, 'color': color })
        .where({ 'id': id });

        return res.status(200).send()

    },

    async createSkill( req, res, next) {

        try {
            
            const { title, color } = req.body;

            await knex('skills')
            .insert({ title, color })

            return res.status(200).send("Skill created");

        } catch (error) {

            next(error)
        }
    }
    
}