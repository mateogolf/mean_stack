const express = require("express"),
    path = require("path"),
    app = express(),
    // session = require('express-session'),
    PORT = 8090;
//Sessions
// app.use(session({ secret: 'someKey' }));
//Static and Views
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// const count=0;
// Root route to render the index.ejs view.
app.get('/', function (req, res) {
    res.render("index")//,{count:count});
})

// Start Node server listening on port 8000.
var server = app.listen(PORT, function () {
    console.log(`listening on port ${PORT}`);
})
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
    console.log("Client/socket is connected!");
    console.log("Client/socket id is: ", socket.id);
    //Code
    let count=0;
    socket.on('reset_button',(data)=>{
        count=0
        socket.emit('reset', { count: count })
    })
    socket.on('count_button', (data) => {
        count+=1;
        socket.emit('counted',{count:count})
    })

})