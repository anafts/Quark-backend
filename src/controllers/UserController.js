
const knex = require('../database');

module.exports = {

    async login (req, res, next) {
        try {
            const { email, password } = req.body;

            const user = await knex('users')
            .where('email', email)
            .andWhere('password', password)
            .first()

            if(!user) {
                return res.status(404).send("Crie uma conta!")
            } else {
                return res.status(200).send(user);
            }
            
        } catch (error) {
            next(error)
            
        }
    
    },

    async signup (req, res, next) {
        try {
            const { email, password } = req.body;

            await knex('users')
            .insert({email, password})

            return res.status(200).send('created')
            
        } catch (error) {
            next(error)
            
        }
    
    }

}