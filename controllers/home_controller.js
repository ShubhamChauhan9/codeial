const Posts = require('../models/post');

module.exports.home = async function(req, res) {
    // return res.end('<h1> Express is up for CodeIal</h1>');
    // console.log(req.cookies);
    // res.cookie('user_id', 25);
    try {
        let foundPosts = await Posts.find({}).populate('user').populate({
            path: "comments",
            populate: {
                path: "user"
            }
        }).exec();
        return res.render('home', {
            title: "Codeial | Home",
            posts: foundPosts
        })
    } catch (err) {
        console.error(err);
    }

}