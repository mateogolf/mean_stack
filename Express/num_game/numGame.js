//imports
const express = require('express');
const path = require('path')
const app = express();
const PORT = 8090;
const bodyParser = require('body-parser');
const session = require('express-session');
//declare
// app.use(express.static(__dirname + "/static"));
app.use(express.static(path.resolve(__dirname, 'static')));//static files
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'someKey' }));
//Templates
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
//LISTENER @ PORT IMPORTANT
app.listen(PORT, function () {
    console.log(`listening on port ${PORT}`);
})
app.get('/', function (req, res) {
    if (!('someKey' in req.session)) {//!req.session.counter){
        req.session.someKey = Math.floor((Math.random()*100)+1);
    }
    console.log(req.session.someKey);
    res.render("numGame");
});
app.post('/guess', function (req, res) {
    if (!('guess' in req.body)){
        res.redirect('/');
        return;
    }
    console.log("GUESS: " + req.body.guess);
    const guess = parseInt(req.body.guess);
    if (guess == NaN) { 
        req.session.hint = "Not a number";
        res.render("guess", { hint: req.session.hint });
    }
    else if(guess<req.session.someKey){
        console.log("Less Than");
        const hint = "Too Low!!";
        res.render("guess", { hint: hint });
    }else if(guess>req.session.someKey){
        const hint ="Too High!!";
        res.render("guess", { hint: hint });
    }else{
        console.log("FOUND!");
        const hint =`${guess} was the number!`;
        res.render("won", { hint: hint });
    }
});
// app.get('/reset', function (req, res) {
// });