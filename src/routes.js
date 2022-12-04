const UserController = require('./controllers/UserController');
const SkillController = require('./controllers/SkillController');
const TopicsController = require('./controllers/TopicsController');
const SubTopicsController = require('./controllers/SubTopicsController');
const ModulesController = require('./controllers/ModulesController');
const ContentController = require('./controllers/ContentController');
const QuizController = require('./controllers/QuizController');

const express = require('express');
const multer = require('multer');

const routes = express.Router();
const upload = multer();

// login and signup routes
routes.post('/login', UserController.login);
routes.post('/signup', UserController.signup);

// skills routes
routes.get('/skills', SkillController.listSkill);
routes.put('/updateSkill/:id', SkillController.updateSkill);
routes.post('/createSkill', SkillController.createSkill);

// topicos routes
routes.get('/topics', TopicsController.listTopics);
routes.put('/updateTopics/:id', TopicsController.updateTopics);
routes.post('/createTopics/:skillId', TopicsController.createTopics);

// subtopicos routes
routes.get('/subtopics', SubTopicsController.listSubTopics);
routes.put('/updateSubTopics/:id', SubTopicsController.updateSubTopics);
routes.post('/createSubTopics/:topicsId', SubTopicsController.createSubTopics);

// modules routes
routes.get('/modules',ModulesController.listModules);
routes.put('/updateModules/:id', ModulesController.updateModules);
routes.post('/createModules/:subtopicsId', ModulesController.createModules);

// content routes
routes.get('/content', ContentController.listContent);
routes.put('/updateContent/:id', upload.fields([{ name: 'video', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), ContentController.updateContent);
routes.post('/createContent/:methodsId', upload.fields([{ name: 'video', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), ContentController.createContent);

// quiz routes 
routes.get('/quizzes/:contentId', QuizController.listQuizzes);
routes.get('/quiz/:id', QuizController.listbyQuizId)
routes.put('/updateQuizzes/:id', QuizController.updateQuizzes);
routes.post('/createQuizzes/:contentId', QuizController.createQuizzes);



module.exports = routes;
