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

// get the sign up for the user
module.exports.create = function(req, res) {
    // todo later
}

// sign in and create a session for the user
module.exports.create_session = function(req, res) {
    // todo later
}