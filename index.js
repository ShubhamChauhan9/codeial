const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const port = 8000;
const path = require('path');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON bodies (for JSON data)
app.use(bodyParser.json());


// use express router
app.use('/', require('./routes'));

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


// starting our server on port:8000
app.listen(port, function(err) {
    if (err) {
        console.log(`Error in running the server:${err}`);
    }
    console.log(`Server is running on port:${port}`);
});