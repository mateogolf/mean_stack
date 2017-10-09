var mongoose = require('mongoose');
var Animal = mongoose.model('Animal');

// Routes
module.exports = {
    showAll: (req,res)=>{
        Animal.find({}, function (err, animals) {
            res.render('animal', { animals: animals });
        });
    },
    showOne: (req, res) => {
        Animal.findOne({ _id: req.params.id }, function (err, animal) {
            if (err) {
                console.log("ID NOT in database")
                res.redirect('/');
                return;
            }
            res.render('viewAnimal', { animal: animal });
        })
    },
    create: (req, res) => {
        console.log("POST DATA", req.body);
        var animal = new Animal(req.body);
        animal.save((err, newAnimal) => {
            if (err) {
                console.log('something went wrong');
                res.render('newAnimal', { errors: animal.errors });
            }
            else {
                console.log('successfully added a animal! at: ' + newAnimal._id);
                res.redirect('/mongooses/' + newAnimal._id);
            }
        })
    },
    edit: (req, res) => {
        Animal.findOne({ _id: req.params.id }, function (err, animal) {
            if (err) {
                console.log("ID NOT in database")
                res.redirect('/');
            }
            res.render('editAnimal', { animal: animal });
        })
    },
    update: (req, res) => {
        console.log("POST DATA", req.body);
        var animal = new Animal(req.body);
        Animal.update({ _id: req.params.id }, { name: req.body.name }, function (err) {
            if (err) {
                console.log('something went wrong');
                res.render('editAnimal', { action: "Edit", errors: animal.errors });
            }
            else {
                console.log('successfully added a animal! at: ' + req.params.id);
                res.redirect('/mongooses/' + req.params.id);
            }
        })
    },
    destroy: (req, res) => {
        Animal.findOneAndRemove({ _id: req.params.id }, (err) => {
            if (err) {
                console.log("ID NOT in database")
                // return;
            }
            res.redirect('/');
        })
    }
}