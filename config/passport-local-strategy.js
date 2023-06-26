const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');


// authenticate using passport
passport.use(new LocalStrategy({ usernameField: 'email' },

    async function(email, password, done) {
        try {
            //   find a user and establish the identity
            let user = await User.findOne({ email: email });
            if (!user || user.password != password) {
                console.log("invalid username/password");
                return done(null, false);
            }
            return done(null, user);
        } catch (error) {
            console.log("error in finding user-->passport")
            return done(error);
        }

    }
));

// serialize the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// deserialize the from the key in the cookies
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

module.exports = passport;