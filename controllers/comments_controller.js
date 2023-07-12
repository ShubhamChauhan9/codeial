const Comment = require('../models/comment');

const Post = require('../models/post');

module.exports.create = async function(req, res) {
    try {
        let foundPosts = await Post.findById(req.body.post);
        if (foundPosts) {

            let createdComment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            if (createdComment) {
                foundPosts.comments.push(createdComment);
                foundPosts.save();
                return res.redirect('/');
            } else {
                console.log("comment creation unsuccessfull for pushing into foundPosts");
            }
        } else {
            console.log("posts can not be found by post id");
        }
    } catch (e) {
        console.log(e);
    }
}