const express = require('express');

const router = express.Router();

const usersController = require('../controllers/users_controller');

router.get('/profile', usersController.profile);

router.get('/sign-up', usersController.signUp);

router.get('/sign-in', usersController.signIn);

router.get('/user-profile', usersController.userProfile);

router.post('/create', usersController.create);

router.post('/create_session', usersController.createSession);

router.get('/sign-out', usersController.signOut);

module.exports = router;