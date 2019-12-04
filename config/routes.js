const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller')

module.exports = router;

// Signup routes
router.get('/users/new', userController.new);

// Login routes
router.get('/login');
router.post('/login');
router.post('/logout');