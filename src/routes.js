const express = require('express');
const UserController = require('./controllers/UserController');

const routes = express.Router();


routes.post('/login', UserController.login );
routes.post('/signup', UserController.signup );



module.exports = routes;
