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

            return res.redirect('back');

        } else {
            console.log("comment authorization to delete comment not matched");
            return res.redirect('back');
        }

    } catch (err) {
        console.log("error in deletind comment");
        console.error(err);
    }
};