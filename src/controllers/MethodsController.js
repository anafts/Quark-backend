const knex = require('../database');

module.exports = {

    async listMethods(req, res, next){
        try {
            const listMethods = await knex('methods')
            .select('id', 'title', 'order', 'description','created_at', 'updated_at', 'subtopics_id');

            return res.status(200).send(listMethods);
            
        } catch (error) {

          next (error); 
        }

    },

    async updateMethods( req, res, next) {

        try {
 
         const { title, order, description} = req.body;
 
         const { id } = req.params;
 
 
         await knex('methods')
         .update({ 'title': title, 'order': order, 'description': description })
         .where({ 'id': id });
 
         return res.status(200).send("Methods created")
         
        } catch (error) {
 
         next(error);
         
        }
 
     },
 
     async createMethods(req, res, next) {
 
         try {
             
             const { title, order, description } = req.body;
 
             await knex('methods')
             .insert({ title, order, description, subtopics_id: req.params.subtopicsId })
 
             return res.status(200).send("Methods created");
 
         } catch (error) {
 
             next(error);
         }
     }
 
 };
