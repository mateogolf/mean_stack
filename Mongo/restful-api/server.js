var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = 8090;
const session = require('express-session');
app.use(session({ secret: 'somethingSUPERSECRET1343$' }));

// app.use(bodyParser.urlencoded({ extended: true }));//http response instead of json
app.use(bodyParser.json());
//Client Imports
// var path = require('path');
// app.use(express.static(path.join(__dirname, './client/static')));
// app.set('views', path.join(__dirname, './client/views'));
// app.set('view engine', 'ejs');

//Mongoose
var mongoose = require('./server/config/mongoose.js');

// Routes
var routes_setter = require('./server/config/routes.js');
routes_setter(app)
// Setting our Server to Listen on Port: 8090
app.listen(PORT, function () {
    console.log(`listening on port ${PORT}`);
})
