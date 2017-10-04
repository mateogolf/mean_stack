const express = require('express');
const path = require('path')//Added in lecture
const app = express();
const PORT = 8090;
const bodyParser = require('body-parser');
const session = require('express-session');

app.use(express.static(path.resolve(__dirname, 'static')));//(__dirname, 'static'));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.get('/', function (req, res) {
    const data = {
        'name': req.body.name,
        'comments': req.body.comments
    };
    res.render("index", { data: data });
});
app.post('/result', function (req, res) {
    //Validations?
    const data ={
        'name': req.body.name,
        'location': req.body.location,
        'favorite': req.body.favorite,
        'comments': req.body.comments
    };
    res.render("result", { data: data });
})
app.listen(PORT, function () {
    console.log(`listening on port ${PORT}`);
})