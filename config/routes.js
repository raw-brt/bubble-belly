const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller')

// Signup routes
router.get('/user/new', userController.new);
router.post('/user/new', userController.create);

// Login routes
router.get('/login', userController.login);
router.post('/login', userController.doLogin);
router.post('/logout', userController.logout);

// Home
router.get('/user/home', userController.home);

module.exports = router;