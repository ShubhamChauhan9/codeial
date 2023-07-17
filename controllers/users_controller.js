const User = require('../models/user');

module.exports.profile = async function(req, res) {
    // res.end('<h1>User Profile</h1>');
    try {
        let user = await User.findById(req.params.id);
        return res.render('user_profile', {
            title: "User Profile",
            profile_user: user
        })
    } catch (e) {
        console.log("error in finding friends profile by id ", e);
    }


}


// render sign in page
module.exports.signUp = function(req, res) {

    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up', {
        title: "codeial | user sign up"
    })
}


// render sign up page
module.exports.signIn = function(req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

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
            req.flash('Success', 'PassWord missmatched');
            return res.redirect('back');
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            req.flash('Success', 'User already exists');
            return res.redirect('back');
        }

        // Create the user
        const user = await User.create(req.body);
        req.flash('Success', 'User SignUp successfull');
        return res.redirect('/users/sign-in');
    } catch (err) {
        // console.error("Error in creating a User while signing up:", err);
        req.flash('error', err);
        return res.redirect('back');
    }
};

module.exports.update = async function(req, res) {
    try {
        // console.log(req.user.id, req.params.id);
        if (req.user.id == req.params.id) {
            let updatedUser = await User.findByIdAndUpdate(req.params.id, { name: req.body.name, email: req.body.email });
            req.flash('Success', 'User Updated');
            return res.redirect('back');
        }
    } catch (err) {

        // console.error("Error in Updating a User:", err);
        req.flash('error', err);
        return res.status(401).send('Unauthorized');
    }
};




// sign in and create a session for the user
module.exports.createSession = function(req, res) {

    req.flash('Success', 'Logged-in Successfully');
    return res.redirect('/');
}

// sign out a session using passport
// module.exports.destroySession = function(req, res) {
//     req.logout();
//     return res.redirect('/home');
// }
// as above syntax is deprecated
module.exports.destroySession = function(req, res) {
    req.logout((e) => {
        if (e) {
            console.error(e);
        }
        req.flash('Success', 'Logged-out');
        return res.redirect('/');
    });

}