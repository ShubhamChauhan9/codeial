const Post = require('../models/post');

module.exports.create = async function(req, res) {
    try {
        let createPost = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        return res.redirect('back');
    } catch (e) {
        console.log("error in creating Post in database");
        console.error(e);

    }
};