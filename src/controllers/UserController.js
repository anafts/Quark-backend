const knex = require('../database');
const bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

module.exports = {

    async login (req, res, next) {

        try {

            const { email, password } = req.body;

            const user = await knex('users')
            .where('email', email)
            .andWhere('password', password)
            .first()

            if (!user) {

                return res.status(404).send("Create a account!");

            } else {

                const verifyPassword = await bcrypt.compare(password, user.password);

                if (!verifyPassword) {

                    return res.status(401).send("Invalid credencial!");
                }
                
                const token = await jwt.sign(user.email, user.password);

                return res.status(200).send(token);
            }
            
        } catch (error) {
            next(error)
            
        }
    
    },

    async signup (req, res, next) {

        try {

            const { email, password } = req.body;

            const hashPassword = await bcrypt.hash(password, 10);

            await knex('users')
            .insert({ email: email, password: hashPassword })

            return res.status(200).send('created')
            
        } catch (error) {

            next(error)
            
        }
    
    }

}