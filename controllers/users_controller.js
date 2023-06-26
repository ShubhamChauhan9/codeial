const User = require('../models/user');

module.exports.profile = function(req, res) {
    // res.end('<h1>User Profile</h1>');
    return res.render('users', {
        title: "User"
    })
}


// render sign in page
module.exports.signUp = function(req, res) {

    return res.render('user_sign_up', {
        title: "codeial | user sign up"
    })
}


// render sign up page
module.exports.signIn = function(req, res) {
    return res.render('user_sign_in', {
        title: "codeial | user sign in"
    })
}

module.exports.userProfile = function(req, res) {
    return res.render('user_profile');
}



// get the sign up for the user
// module.exports.create = function(req, res) {
//     // console.log(req.body);
//     if (req.body.password != req.body.confirm_password) {
//         return res.redirect('back');
//     }
//     User.findOne({ email: req.body.email }, function(err, user) {
//         if (err) { console.log("error in finding User while signing up"); return; }

//         if (!user) {
//             User.create(req.body, (err, user) => {
//                 if (err) { console.log("error in creating a User while signing up"); return; }

//                 return res.redirect('/users/sign-in');
//             })
//         } else {
//             return res.redirect('back');
//         }


//     })

// }

// above syntax on find one and create of mongoose deprecated so using async await
module.exports.create = async function(req, res) {
    try {
        // Check if passwords match
        if (req.body.password !== req.body.confirm_password) {
            return res.redirect('back');
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.redirect('back');
        }

        // Create the user
        const user = await User.create(req.body);
        return res.redirect('/users/sign-in');
    } catch (err) {
        console.error("Error in creating a User while signing up:", err);
        return res.redirect('back');
    }
};




// sign in and create a session for the user
module.exports.createSession = function(req, res) {
    return res.redirect('/');
}