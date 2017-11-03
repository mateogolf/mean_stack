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
let users= [];
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
    socket.emit('existing_users', { users: users })
    console.log("Client/socket is connected!");
    console.log("Client/socket id is: ", socket.id);
    //Code
    socket.on('new_user', (data) => {
        let user = { id: socket.id, name: data.name }
        users.push(user)
        socket.emit('logged_in', { user_id: socket.id })
        io.emit('existing_users', { users: users })
        socket.broadcast.emit('joined',{name:user.name})
    })

    socket.on('disconnect', (data) => {
        console.log("Disconnected User:", socket.id)//JSON.stringify(data.user))
        for (let i = 0; i < users.length; i++) {
            if (users[i].id == socket.id){ 
                var dis_user = users[i]
                users.splice(i, 1);
            }
        }
        console.log(users)
        io.emit('disconnected_user', { user: dis_user })
    })
    socket.on('message_sent',(data)=>{
        let message_received= `${data.name}: ${data.message}`
        io.emit('message_received', { new_message: message_received})
    })
})