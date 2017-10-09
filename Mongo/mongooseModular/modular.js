var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = 8000;
// var moment = require('moment');
// moment().format();
// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));
// var session = require('express-session');

// Setting our Static Folder Directory
var path = require('path');
app.use(express.static(path.join(__dirname, './client/static')));

// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './client/views'));
app.set('view engine', 'ejs');

//Mongoose
var mongoose = require('./server/config/mongoose.js');
// var mongoose = require('mongoose');
// // This is how we connect to the mongodb database using mongoose -- "basic_mongoose" is the name of
// //   our db in mongodb -- this should match the name of the db you are going to use for your project.
// mongoose.connect('mongodb://localhost/crud');
// var AnimalSchema = new mongoose.Schema({
//     name: { type: String, required: true }
// })//, { timestamps: true });
// mongoose.model('Animal', AnimalSchema);
// var Animal = mongoose.model('Animal')
// mongoose.Promise = global.Promise;



// Routes
var routes_setter = require('./server/config/routes.js');
routes_setter(app)
// //READ: View ALL
// app.get('/', (req, res)=> {
//     Animal.find({},function (err, animals) {
//             res.render('animal', { animals: animals});
//     });
// })
// //READ: ViewOne
// app.get('/mongooses/:id', (req, res)=> {
//     Animal.findOne({ _id: req.params.id }, function (err, animal) {
//         if(err){
//             console.log("ID NOT in database")
//             res.redirect('/');
//             return;
//         }
//         res.render('viewAnimal', { animal: animal });
//     })
// })
// //CREATE
// app.get('/new', (req, res)=> {
//     res.render('newAnimal');
// })
// // Add animal Request 
// app.post('/mongooses', (req, res)=> {
//     console.log("POST DATA", req.body);
//     // create a new animal with the name and age corresponding to those from req.body
//     var animal = new Animal(req.body);

//     // console.log(animal.createdAt);
//     // Try to save that new animal to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
//     animal.save((err,newAnimal)=> {
//         // if there is an error console.log that something went wrong!
//         if (err) {
//             console.log('something went wrong');
//             res.render('newAnimal', {errors: animal.errors });
//         }
//         else {
//             console.log('successfully added a animal! at: ' + newAnimal._id);
//             res.redirect('/mongooses/' + newAnimal._id);
//         }
//     })
// })
// //UPDATE: View form
// app.get('/mongooses/edit/:id', (req, res)=> {
//     Animal.findOne({ _id: req.params.id }, function (err, animal) {
//         if (err) {
//             console.log("ID NOT in database")
//             res.redirect('/');
//         }
//         res.render('editAnimal', { animal: animal });
//     })
// })
// // UPDATE
// app.post('/mongooses/:id', (req, res)=> {
//     console.log("POST DATA", req.body);
//     // create a new animal with the name and age corresponding to those from req.body
//     var animal = new Animal(req.body);

//     // console.log(animal.createdAt);
//     // Try to save that new animal to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
//     Animal.update({ _id: req.params.id },{name:req.body.name},function (err) {
//         // if there is an error console.log that something went wrong!
//         if (err) {
//             console.log('something went wrong');
//             res.render('editAnimal', { action: "Edit", errors: animal.errors });
//         }
//         else {
//             console.log('successfully added a animal! at: ' + req.params.id);
//             res.redirect('/mongooses/' + req.params.id);
//         }
//     })
// })

// //Destroy
// app.get('/mongooses/destroy/:id', (req, res)=> {
//     Animal.findOneAndRemove({ _id: req.params.id },(err) =>{
//         if (err) {
//             console.log("ID NOT in database")
//             // return;
//         }
//         res.redirect('/');
//     })
//     // res.redirect('/');
// })

// Setting our Server to Listen on Port: 8000
app.listen(PORT, function () {
    console.log(`listening on port ${PORT}`);
})
