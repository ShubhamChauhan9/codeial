const express = require('express');

const router = express.Router();

const passsport = require('passport');

const commentsController = require('../controllers/comments_controller');

router.post('/create', passsport.checkAuthentication, commentsController.create);

module.exports = router;