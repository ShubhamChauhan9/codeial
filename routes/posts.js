const express = require('express');

const router = express.Router();

const passsport = require('passport');

const postsController = require('../controllers/posts_controller');

router.post('/create', passsport.checkAuthentication, postsController.create);

module.exports = router;