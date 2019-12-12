const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const babyController = require('../controllers/baby.controller');
const eventController = require('../controllers/event.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Start route
router.get('/', (_, res) => res.redirect('/start'))
router.get('/start', userController.start, authMiddleware.isNotAuthenticated);

// Signup routes
router.get('/user/new', userController.new);
router.post('/user/new', userController.create);

// Login routes
router.get('/user/login', userController.login, authMiddleware.isNotAuthenticated);
router.post('/user/login', authMiddleware.isNotAuthenticated, userController.doLogin);
router.post('/user/logout', userController.logout, authMiddleware.isNotAuthenticated);

// Home
router.get('/user/:userid', userController.home, babyController.home, eventController.home, authMiddleware.isAuthenticated);

module.exports = router;