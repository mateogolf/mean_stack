const express = require('express');
const path = require('path')//Added in lecture
const app = express();
const PORT = 5000;
const bodyParser = require('body-parser');
const session = require('express-session');

app.use(express.static(path.resolve(__dirname, 'static')));//(__dirname, 'static'));
app.use(session({ secret: 'counter' }));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.get('/', function (req, res) {
    if (!('counter' in req.session)){//!req.session.counter){
        req.session.counter = 1;
    }
    else{
        req.session.counter++;
    }
    res.render("count", { counter: req.session.counter });
})
app.get('/reset', function (req, res) {
    req.session.counter = 1;    
    res.render("count", { counter: req.session.counter });
})
// notice that the function is app.get(...) why do you think the function is called get?
// Tell the express app to listen on port 8000
app.listen(PORT, function () {
    console.log(`listening on port ${PORT}`);
})