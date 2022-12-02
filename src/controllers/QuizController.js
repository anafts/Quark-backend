const knex = require('../database');

module.exports = {

    async listQuizzes(req, res, next) {

        try {

            const { contentId } = req.params

            const listQuizzes = await knex('quiz')
            .join('questions', 'questions.quiz_id', 'quiz.id')
            .join('answers', 'answers.questions_id', 'questions.id' )
            .select('quiz.id', 'questions.question', 'answers.alternative', 'questions.id as question_id', 'answers.correct')
            .where({ 'content_id': contentId })

            const questionIds = listQuizzes
                .map(quiz => quiz.question_id)
                .filter((questionId, index, array) => array.indexOf(questionId) === index)

            const questions = questionIds.map(questionId => {
                const question = listQuizzes.find(quiz => quiz.question_id === questionId)
                const alternatives = listQuizzes.filter(quiz => quiz.question_id === questionId).map(alternative => {
                    return {
                        id: alternative.id,
                        alternative: alternative.alternative,
                        correct: alternative.correct,
                    }
                })

                return {
                    id: question.question_id,
                    question: question.question,
                    alternatives: alternatives
                }
            })

            const quiz = {
                id: listQuizzes[0].id,
                questions: questions
            }

            return res.status(200).send(quiz);
            
        } catch (error) {

            next(error)
        }
    },

    async updateQuizzes(req, res, next) {
        
        try {
            const { id } = req.params;

            const [quiz] = await knex('quiz').where({ 'id': id })

            for ( const question of req.body) {
                if (question.update) {
                    const [questionResult] = await knex('questions').update({ 'question': question.question}).where({ id: question.id }).returning('id')

                    for ( const alternative of question.alternatives) {
                        if (alternative.update) {
                            await knex('answers').update({ 'alternative': alternative.value, 'correct': alternative.correct }).where({ 'id': alternative.id })
                        } else {
                            await knex('answers').insert({ 'alternative': alternative.value, 'correct': alternative.correct, 'questions_id': questionResult.id })
                        }
                    }
                } else {
                    const [questionResult] = await knex('questions').insert({ 'question': question.question, 'quiz_id': quiz.id}).returning('id')

                    for (const alternative of question.alternatives) {
                        await knex('answers').insert({ 'alternative': alternative.value, 'correct': alternative.correct, 'questions_id': questionResult.id})
                    }
                }
            }
 
            return res.status(200).send("quiz updated");

        } catch (error) {
            
            next(error)
        }

    },

    async listbyQuizId(req, res, next) {

        try {

            const { id } = req.params;
            
            const quiz = await knex('quiz')
            .join('questions', 'questions.quiz_id', 'quiz.id')
            .join('answers', 'answers.questions_id', 'questions.id' )
            .select('questions.id as question_id', 'questions.question', 'answers.alternative', 'answers.correct', 'answers.id')
            .where({ 'quiz.id': id })

            const questionIds = quiz
                .map(quiz => quiz.question_id)
                .filter((questionId, index, array) => array.indexOf(questionId) === index)

            const newQuiz = questionIds.map(questionId => {
                const question = quiz.find(quiz => quiz.question_id === questionId)
                const alternatives = quiz.filter(quiz => quiz.question_id === questionId).map(alternative => {
                    return {
                        id: alternative.id,
                        value: alternative.alternative,
                        correct: alternative.correct,
                        update: true
                    }
                })

                return {
                    id: question.question_id,
                    question: question.question,
                    alternatives: alternatives,
                    update: true
                }
            })

            return res.status(200).send(newQuiz);
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