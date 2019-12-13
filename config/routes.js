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
router.get('/login', authMiddleware.isNotAuthenticated, userController.login);
router.post('/login', authMiddleware.isNotAuthenticated, userController.doLogin);
router.post('/logout', authMiddleware.isAuthenticated, userController.logout);

// Home
router.get('/user/:userid', authMiddleware.isAuthenticated, userController.home);

module.exports = router;