const knex = require('../database');

module.exports = {

    async listQuizzes(req, res, next) {

        try {

            const listQuizzes = await knex('quiz, questions, answers')
            .select('id', 'question', 'alternative', 'correct' );

            return res.status(200).send(listQuizzes);
            
        } catch (error) {

            next(error)
        }
    },

    async updateQuizzes(rez, res, next) {

        try {

            const { question, alternative, correct } = req.body;
 
            const { id } = req.params;
            
         await knex('quiz, questions, answers')
         .update({ 'question': question, 'alternative': alternative, 'correct': correct })
         .where({ 'id': id });
 
         return res.status(200).send("quiz updated");

        } catch (error) {
            
            next(error)
        }

    },

    async createQuizzes(req, res, next) {

        try {
            
            const { question, alternative, correct } = req.body;
 
             await knex('quiz, questions, answers')
             .insert({ question, alternative, correct, content_id: req.params.contentId })
 
             return res.status(200).send("quiz created");
 
        } catch (error) {
            
            next(error)
        }

    }

};