const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller')

// Start route
router.get('/start', userController.start);

// Signup routes
router.get('/user/new', userController.new);
router.post('/user/new', userController.create);

// Login routes
router.get('/user/login', userController.login);
router.post('/user/login', userController.doLogin);
router.post('/user/logout', userController.logout);

// Home
router.get('/:userid/home', userController.home);

module.exports = router;