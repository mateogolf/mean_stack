var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));

// Setting our Static Folder Directory
var path = require('path');
app.use(express.static(path.join(__dirname, './static')));

// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

//Mongoose
var mongoose = require('mongoose');
// This is how we connect to the mongodb database using mongoose -- "basic_mongoose" is the name of
//   our db in mongodb -- this should match the name of the db you are going to use for your project.
mongoose.connect('mongodb://localhost/basic_mongoose');
var UserSchema = new mongoose.Schema({
    name: String,
    age: Number
})
mongoose.model('User', UserSchema); // We are setting this Schema in our Models as 'User'
var User = mongoose.model('User') // We are retrieving this Schema from our Models, named 'User'
mongoose.Promise = global.Promise;



// Routes
// Root Request
app.get('/', function (req, res) {
    // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
    const users = [];
    User.find({}, function (err, users) {
        // This is the method that finds all of the users from the database
        // Notice how the first parameter is the options for what to find and the second is the
        //   callback function that has an error (if any) and all of the users
        // Keep in mind that everything you want to do AFTER you get the users from the database must
        //   happen inside of this callback for it to be synchronous 
        // Make sure you handle the case when there is an error, as well as the case when there is no error
        res.render('index',{users:users});
    })

    // res.render('index');
})
// Add User Request 
app.post('/users', function (req, res) {
    console.log("POST DATA", req.body);
    // create a new User with the name and age corresponding to those from req.body
    var user = new User({ name: req.body.name, age: req.body.age });
    // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
    user.save(function (err) {
        // if there is an error console.log that something went wrong!
        if (err) {
            console.log('something went wrong');
        } else { // else console.log that we did well and then redirect to the root route
            console.log('successfully added a user!');
            res.redirect('/');
        }
    })
})

// Setting our Server to Listen on Port: 8000
app.listen(8000, function () {
    console.log("listening on port 8000");
})
