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
                req.flash('Success', 'Comment Posted !!!');
                return res.redirect('/');
            } else {
                // console.log("comment creation unsuccessfull for pushing into foundPosts");
                req.flash('error', 'oops comment could not ne posted');
                return res.redirect('/');
            }
        } else {
            // console.log("posts can not be found by post id");
            req.flash('error', 'Post not found !!');
            return res.redirect('/');
        }
    } catch (e) {
        // console.log(e);
        req.flash('error', e);
        return res.redirect('/');

    }
};

module.exports.deleteComment = async function(req, res) {
    try {
        let toDeleteComment = await Comment.findById(req.params.id);
        //     .id means converting the object _id to String
        // console.log(toDeletePost.user.id.toString('hex') == req.user.id.toString());

        if (toDeleteComment.user.id.toString('hex') == req.user.id.toString()) {
            // toDeleteComment.remove(); this syntax is deprecated
            let postId = toDeleteComment.post;
            await Comment.findOneAndDelete({ _id: req.params.id });
            let updatedPosts = await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });
            req.flash('Success', 'Comment deleted');
            return res.redirect('back');

        } else {
            // console.log("comment authorization to delete comment not matched");
            req.flash('error', 'Cant delete unauthorized');
            return res.redirect('back');
        }

    } catch (err) {
        // console.log("error in deletind comment");
        req.flash('error', err);
        // console.error(err);
        return res.redirect('back');
    }
};