// here we load the Quote model that we created on the server.js page
var mongoose = require('mongoose');
var quotes = require('../controllers/quotes.js');
module.exports = function (app) {
    app.get('/', (req, res)=> {
        res.render('quote')
    })
    app.post('/quotes', (req, res)=> {
        quotes.create(req, res)
    })
    app.get('/main', (req, res)=> {
        quotes.show(req, res)
    })
}
