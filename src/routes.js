const express = require('express');
const UserController = require('./controllers/UserController');
const SkillController = require('./controllers/SkillController');

const routes = express.Router();

// login and signup routes
routes.post('/login', UserController.login );
routes.post('/signup', UserController.signup );

// skills routes
routes.get('/skills', SkillController.listSkill );
routes.put('/updateSkill/:id', SkillController.updateSkill );
routes.post('/createSkill', SkillController.createSkill );





module.exports = routes;
