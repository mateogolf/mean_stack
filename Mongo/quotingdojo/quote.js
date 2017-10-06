var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var moment = require('moment');
moment().format();
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
mongoose.connect('mongodb://localhost/valdemo');
var QuoteSchema = new mongoose.Schema({
    name: { type: String, required: true},
    quote: { type: String, required: true}
}, { timestamps: true });
mongoose.model('Quote', QuoteSchema); 
var Quote = mongoose.model('Quote')
mongoose.Promise = global.Promise;



// Routes
// Root Request
app.get('/', function (req, res) {
    res.render('quote');
})
// Add quote Request 
app.post('/quotes', function (req, res) {
    console.log("POST DATA", req.body);
    // create a new quote with the name and age corresponding to those from req.body
    var quote = new Quote(req.body);

    // console.log(quote.createdAt);
    // Try to save that new quote to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
    quote.save(function (err) {
        // if there is an error console.log that something went wrong!
        if (err) {
            console.log('something went wrong');
            res.render('quote', {errors: quote.errors });
        }
        else {
            console.log('successfully added a quote!');
            res.redirect('/quotes');
        }
    })
})
app.get('/quotes', function (req, res) {
    // Quote.find({},function (err, quotes) {
    //     res.render('allQuotes', { quotes: quotes });
    // }).sort({ createdAt: -1 });
    Quote.find({}).
        sort({ createdAt: -1 }).
        exec(function (err, quotes) {
        res.render('allQuotes', { quotes: quotes,moment:moment });
    });
})

// Setting our Server to Listen on Port: 8000
app.listen(8000, function () {
    console.log("listening on port 8000");
})
