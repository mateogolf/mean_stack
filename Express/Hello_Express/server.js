const express = require('express');
const path = require('path')//Added in lecture
const app = express();
const PORT = 8090; //process.env.PORT || 8090;
/*4: GET,POST*/
// require body-parser
const bodyParser = require('body-parser');
/*5:Session*/
// new code:
const session = require('express-session');

/*1 */
// lets handle the base route "/" and respond with "Hello Express"
app.get('/', function (request, response) {
    // response.send("<h1>Hello Express</h1>");
    response.render("index");
})
// notice that the function is app.get(...) why do you think the function is called get?
// Tell the express app to listen on port 8000
app.listen(PORT, function () {
    console.log(`listening on port ${PORT}`);
})
// this line will almost always be at the end of your server.js file (we only tell the server to listen after we have set up all of our rules)

/*2: Static*/
// this is the line that tells our server to use the "/static" folder for static content
app.use(express.static(path.resolve(__dirname, 'static')));//(__dirname, 'static'));
// two underscores before dirname
// try printing out __dirname using console.log to see what it is and why we use it
// console.log(__dirname);
/*3: Dynamic*/
// This sets the location where express will look for the ejs views
app.set('views', __dirname + '/views');
// Now lets set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
app.set('view engine', 'ejs');

app.get("/users", function (request, response) {
    // hard-coded user data
    var users_array = [
        { name: "Michael", email: "michael@codingdojo.com" },
        { name: "Jay", email: "jay@codingdojo.com" },
        { name: "Brendan", email: "brendan@codingdojo.com" },
        { name: "Andrew", email: "andrew@codingdojo.com" }
    ];
    response.render('users', { users: users_array });
})

/*4: GET,POST*/
// require body-parser
// const bodyParser = require('body-parser');//above
// use it!
app.use(bodyParser.urlencoded({ extended: true }));

// root route
app.get("/users/:id", function (req, res) {
    console.log("The user id requested is:", req.params.id);
    // just to illustrate that req.params is usable here:
    res.send("You requested the user with id: " + req.params.id);
    // code to get user from db goes here, etc...
});

// route to process new user form data:
app.post('/users', function (req, res) {
    console.log("POST DATA \n\n", req.body);
    //code to add user to db goes here!
    // redirect the user back to the root route.  
    res.redirect('/');
})

/*5:Session*/
// new code:
// const session = require('express-session');//above
// more new code:
// app.use(session({ secret: 'codingdojorocks' }));  // string for encryption
// app.post('/users', function (req, res) {
//     // set the name property of session.  
//     req.session.name = req.body.name;
//     console.log(req.session.name);
//     //code to add user to db goes here!
//     // redirect the user back to the root route. 
//     res.redirect('/');
// });
