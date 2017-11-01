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
// app.post('/result', function (req, res) {
//     //Validations?
//     const data ={
//         'name': req.body.name,
//         'location': req.body.location,
//         'favorite': req.body.favorite,
//         'comments': req.body.comments
//     };
//     res.render("result", { data: data });
// })
var server = app.listen(PORT, function () {
    console.log(`listening on port ${PORT}`);
})
var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {
    console.log("Client/socket is connected!");
    console.log("Client/socket id is: ", socket.id);
    // all the server socket code goes in here
    socket.on("survey_submitted",(data)=>{
        let random = Math.floor((Math.random()*1000)+1)
        // console.log(random)
        socket.emit('random_number',{number:random})
    })

})