const app = require('express')();

const port = 8000;

// use express router
app.use('/', require('./routes'));


// setting up our view engine
app.set('view engine', 'ejs');
app.set('views', './views');


app.listen(port, function(err) {
    if (err) {
        console.log(`Error in running the server:${err}`);
    }
    console.log(`Server is running on port:${port}`);
});