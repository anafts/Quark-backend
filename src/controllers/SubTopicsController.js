const knex = require('../database');

module.exports = {

    async listSubTopics( req, res, next) {
         
        try {

            const listSubTopics = await knex('subtopics')
            .select('id', 'title', 'order', 'created_at', 'updated_at', 'topics_id');

            return res.status(200).send(listSubTopics);
        
                
        } catch (error) {

            next(error);
        }
    },

    async updateSubTopics( req, res, next) {

       try {

        const { title, order } = req.body;

        const { id } = req.params;


        await knex('subtopics')
        .update({ 'title': title, 'order': order })
        .where({ 'id': id });

        return res.status(200).send()
        
       } catch (error) {

        next(error);
        
       }

    },

    async createSubTopics( req, res, next) {

        try {
            
            const { title, order} = req.body;

            await knex('subtopics')
            .insert({ title, order, topics_id: req.params.topicsId })

            return res.status(200).send("Subtopics created");

        } catch (error) {

            next(error);
        }
    }

};