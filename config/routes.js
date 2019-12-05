const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller')



// Signup routes
router.get('/user/new', userController.new );

// Login routes
router.get('/login');
router.post('/login');
router.post('/logout');

module.exports = router;