const express = require('express');

const router = express.Router();

const passport = require('passport');

const usersController = require('../controllers/users_controller');

router.get('/profile/:id', passport.checkAuthentication, usersController.profile);
router.post('/update/:id', passport.checkAuthentication, usersController.update);

router.get('/sign-up', usersController.signUp);

router.get('/sign-in', usersController.signIn);

router.get('/user-profile', usersController.userProfile);

router.post('/create', usersController.create);

router.post('/create_session', passport.authenticate(
    'local', { failureRedirect: '/users/sign-in' }
), usersController.createSession)

router.get('/sign-out', usersController.destroySession);

module.exports = router;