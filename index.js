const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const port = 8000;
const path = require('path');
const db = require('./config/mongoose');
// const mongoose = require('mongoose');


// used for session cookies
// express session auto encrypt and store user_id as key into cookies for user authentication
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

// const MongoStore = require('connect-mongo')(session);
const MongoStore = require('connect-mongo');

// ...

// const store = MongoStore.create({
//     mongoUrl: 'mongodb://127.0.0.1:27017/codeial_development',
//     collectionName: 'sessions',
//     mongooseConnection: mongoose.connection,
//     autoRemove: 'disabled'
// }, function(error) {
//     console.log(error || 'connect-mongodb setup is ok');
// });

// const MongoStore = require('connect-mongo')(session);



const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON bodies (for JSON data)
app.use(bodyParser.json());


// use express router


// app.use(express.urlencoded());

app.use(express.static('./assets'));

app.use(cookieParser());

app.use(expressLayouts);

// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



// setting up our view engine
app.set('view engine', 'ejs');
app.set('views', './views');
app.set('views', path.join(__dirname, 'views'));


// mongostore is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    // todo change the secret when deployment in production mode
    secret: 'something',
    saveUninitialized: false,
    resave: false,

    cookie: {
        maxAge: (1000 * 60 * 100)
    },

    store: MongoStore.create({
            mongoUrl: 'mongodb://127.0.0.1:27017/codeial_development',
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function(e) {
            console.log(e || "connect-mongodb setup is ok");
        }
    )

}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes'));



// starting our server on port:8000
app.listen(port, function(err) {
    if (err) {
        console.log(`Error in running the server:${err}`);
    }
    console.log(`Server is running on port:${port}`);
});