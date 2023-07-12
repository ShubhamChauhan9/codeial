const express = require('express');

const router = express.Router();

const passsport = require('passport');

const commentsController = require('../controllers/comments_controller');

router.post('/create', passsport.checkAuthentication, commentsController.create);
router.get('/deleteComment/:id', passsport.checkAuthentication, commentsController.deleteComment);

module.exports = router;