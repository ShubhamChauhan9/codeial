const User = require('../models/user');


module.exports.profile = async function(req, res) {
    try {
        if (req.cookies.user_id) {
            // console.log(req.cookies.user_id);
            const user = await User.findById(req.cookies.user_id).exec();

            // console.log(user);
            if (user) {
                return res.render('user_profile', {
                    title: "User Profile",
                    user: user
                });
            }
        }
        return res.redirect('/users/sign-in');
    } catch (error) {
        console.log("Error in fetching details from sign-in:", error);
    }
};

// the below syntax is deprecated for findbyId
// module.exports.profile = function(req, res) {
//     // res.end('<h1>User Profile</h1>');

//     // console.log(req.cookies);
//     if (req.cookies.user_id) {
//         console.log(req.cookies.user_id);
//         User.findById(req.cookies.user_id, function(err, user) {
//             if (err) {
//                 console.log("error in fetching details from sign in");
//             }
//             console.log(user);
//             if (user) {
//                 return res.render('user_profile', {
//                     title: "User Profile",
//                     user: user
//                 })
//             }
//         });
//     } else {
//         return res.redirect('/users/sign-in');
//     }
// }






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
// User.findOne({ email: req.body.email }, function(err, user) {
//     if (err) { console.log("error in finding User while signing up"); return; }
//     if (!user) {
//         User.create(req.body, (err, user) => {
//             if (err) { console.log("error in creating a User while signing up"); return; }
//             return res.redirect('/users/sign-in');
//         })
//     } else {
//         return res.redirect('back');
//     }
// })
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

module.exports.createSession = async function(req, res) {
    try {
        // steps to authenticate
        // find the user
        const user = await User.findOne({ email: req.body.email });

        // handle user found
        if (user) {
            // handle password which don't match
            if (user.password !== req.body.password) {
                return res.redirect('back');
            }

            // handle session creation
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
        } else {
            // handle user not found
            return res.redirect('back');
        }
    } catch (err) {
        console.log("Error in finding User while signing up:", err);
        return;
        // handle error
        // return an appropriate response or redirect
    }
}


// the below syntax is deprecated for mongoose function
// module.exports.createSession = function(req, res) {
//     // steps to authenticate
//     // find the user
//     User.findOne({ email: req.body.email }, function(err, user) {
//         if (err) { console.log("error in finding User while signing up"); return; }

//         // handle user found
//         if (user) {

//             // handle password which dont match
//             if (user.password != req.body.password) {
//                 return res.redirect('back');
//             }

//             // handle session creation
//             res.cookie('user_id', user.id);
//             return res.redirect('/users/profile');


//         } else {
//             // handle  user not found
//             return res.redirect('back');
//         }
//     })

// }

module.exports.signOut = function(req, res) {
    res.clearCookie('user_id');
    return res.redirect('/users/profile');
}