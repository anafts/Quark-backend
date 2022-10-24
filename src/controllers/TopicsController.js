const knex = require('../database');

module.exports = {

    async listTopics( req, res, next) {
         
        try {

            const listTopics = await knex('topics')
            .select('id', 'title', 'order', 'active_icon', 'disabled_icon', 'created_at', 'updated_at', 'skills_id');

            return res.status(200).send(listTopics);
        
                
        } catch (error) {

            next(error);
        }
    },

    async updateTopics( req, res, next) {

        const { title, order, active_icon, disabled_icon } = req.body;

        const { id } = req.params;


        await knex('topics')
        .update({ 'title': title, 'order': order, 'active_icon': active_icon, 'disabled_icon': disabled_icon})
        .where({ 'id': id });

        return res.status(200).send()

    },

    async createTopics( req, res, next) {

        try {
            
            const { title, order, active_icon, disabled_icon } = req.body;

            await knex('topics')
            .insert({ title, order, active_icon, disabled_icon, skills_id: req.params.skillId })

            return res.status(200).send("Topics created");

        } catch (error) {

            next(error)
        }
    }

};