const express = require('express');
const path = require('path')//Added in lecture
const app = express();
const PORT = 8090; //process.env.PORT || 8090;


// this is the line that tells our server to use the "/static" folder for static content
app.use(express.static(path.resolve(__dirname, 'static')));//(__dirname, 'static'));
// two underscores before dirname
// try printing out __dirname using console.log to see what it is and why we use it
// console.log(__dirname);



// lets handle the base route "/" and respond with "Hello Express"
app.get('/', function (request, response) {
    response.send("<h1>Hello Express</h1>");
})

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

// notice that the function is app.get(...) why do you think the function is called get?
// Tell the express app to listen on port 8000
app.listen(PORT, function () {
    console.log(`listening on port ${PORT}`);
})
// this line will almost always be at the end of your server.js file (we only tell the server to listen after we have set up all of our rules)
