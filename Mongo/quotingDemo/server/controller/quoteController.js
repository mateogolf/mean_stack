var mongoose = require('mongoose');
var Quote = mongoose.model('Quote');
module.exports = {
    show: function (req, res) {
        Quote.find({}, function (err, quotes) {
            res.render('main', { quotes: quotes });
        })
    },
    create: function (req, res) {
        var quote = new Quote(req.body);
        quote.save(function (err) {
            if (err) {
                console.log("something went wrong");
            } else {
                res.redirect('/main');
            }
        })
    }
}
