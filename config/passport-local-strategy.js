const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');


// authenticate using passport
passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true },

    async function(req, email, password, done) {
        try {
            //   find a user and establish the identity
            let user = await User.findOne({ email: email });
            if (!user || user.password != password) {
                // console.log("invalid username/password");
                req.flash('error', 'invalid Username/Password');
                return done(null, false);
            }
            return done(null, user);
        } catch (error) {
            // console.log("error in finding user-->passport")
            req.flash('error', `${error}`);
            return done(error);
        }

    }
));

// serialize the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// deserialize the user from the key in the cookies
passport.deserializeUser(async function(id, done) {
    try {
        let user = await User.findById(id);
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    } catch (err) {
        console.log("error in finding user-->passport");
        return done(err);
    }

});

// check if the useris authenticated
passport.checkAuthentication = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    // if user not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next) {
    if (req.isAuthenticated()) {
        // req.user contains the current signed in user in the sessions cookies
        // and we are sending this to the locals fro the views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;