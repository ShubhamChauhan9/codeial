const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.create = async function(req, res) {
    try {
        let createPost = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        req.flash('Success', 'Post created Successfully')
        return res.redirect('back');
    } catch (e) {
        // console.log("error in creating Post in database");
        req.flash('error', e);
        console.error(e);
        return res.redirect('back');

    }
};

module.exports.deletePost = async function(req, res) {
    try {
        let toDeletePost = await Post.findById(req.params.id);
        //     .id means converting the object _id to String
        // console.log(toDeletePost.user.id.toString('hex') == req.user.id.toString());

        if (toDeletePost.user.id.toString('hex') == req.user.id.toString()) {
            // toDeletePost.remove(); this syntax is deprecated
            await Post.findOneAndDelete({ _id: req.params.id });
            await Comment.deleteMany({ toDeletePost: req.params.id });
            req.flash('Success', 'Post deleted Successfully');
            return res.redirect('back');

        } else {
            // console.log("post authorization to delete post not matched");
            req.flash('error', 'post authorization to delete post not matched');
            return res.redirect('back');
        }

    } catch (err) {
        // console.log("error in deletind post");
        req.flash('error', err);
        // console.error(err);
        return res.redirect('back');
    }
};