const knex = require('../database');

module.exports = {

    async listQuizzes(req, res, next) {

        try {

            const listQuizzes = await knex('quiz')
            .join('questions', 'questions.quiz_id', 'quiz.id')
            .join('answers', 'answers.questions_id', 'answers.id' )
            .select('quiz.id', 'quiz.content_id', 'questions.question', 'questions.id', 'answers.*');

            return res.status(200).send(listQuizzes);
            
        } catch (error) {

            next(error)
        }
    },

    async updateQuizzes(req, res, next) {

        try {

            const { question, alternative, correct } = req.body;
 
            const { id } = req.params;
            
         await knex('questions')
         .update({ 'question': question })
         .where({ 'id': id });

         await knex('answers')
         .update({ 'alternative': alternative, 'correct': correct })
         where({ 'id': id})
 
         return res.status(200).send("quiz updated");

        } catch (error) {
            
            next(error)
        }

    },

    async createQuizzes(req, res, next) {

        try {

            for (const quiz of req.body) {

                const quizzes = await knex('quiz').insert({ content_id: req.params.contentId }).returning('id')

                const question = await knex('questions').insert({ quiz_id: quizzes[0].id, question: quiz.question }).returning('id')

                for (const alternative of quiz.alternatives) {
                    await knex('answers').insert({ alternative: alternative.value, correct: alternative.correct, questions_id: question[0].id })
                }
            }
 
            return res.status(200).send("quiz created");
 
        } catch (error) {
            
            next(error)
        }

    }

};