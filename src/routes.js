const express = require('express');
const UserController = require('./controllers/UserController');
const SkillController = require('./controllers/SkillController');
const TopicsController = require('./controllers/TopicsController');
const SubTopicsController = require('./controllers/SubTopicsController');

const routes = express.Router();

// login and signup routes
routes.post('/login', UserController.login );
routes.post('/signup', UserController.signup );

// skills routes
routes.get('/skills', SkillController.listSkill );
routes.put('/updateSkill/:id', SkillController.updateSkill );
routes.post('/createSkill', SkillController.createSkill );

// topicos routes

routes.get('/topics', TopicsController.listTopics );
routes.put('/updateTopics/:id', TopicsController.updateTopics );
routes.post('/createTopics/:skillId', TopicsController.createTopics );

// subtopicos routes

routes.get('/subtopics', SubTopicsController.listSubTopics );
routes.put('/updateSubTopics/:id', SubTopicsController.updateSubTopics );
routes.post('/createSubTopics/:topicsId', SubTopicsController.createSubTopics );

module.exports = routes;
