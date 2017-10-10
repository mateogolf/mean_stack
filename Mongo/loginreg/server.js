var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = 8000;
const session = require('express-session');
app.use(session({ secret: 'currentUser' }));
// app.use(session({ secret: 'regErrors' }));

app.use(bodyParser.urlencoded({ extended: true }));
//Client Imports
var path = require('path');
app.use(express.static(path.join(__dirname, './client/static')));
app.set('views', path.join(__dirname, './client/views'));
app.set('view engine', 'ejs');

//Mongoose
var mongoose = require('./server/config/mongoose.js');

// Routes
var routes_setter = require('./server/config/routes.js');
routes_setter(app)
// Setting our Server to Listen on Port: 8000
app.listen(PORT, function () {
    console.log(`listening on port ${PORT}`);
})
