var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require('path');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var POST = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/message_board');
var MessageSchema = new mongoose.Schema({
    name: { type: String, minlength: 4},
    content: { type: String},
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
}, { timestamps: true });
MessageSchema.path('name').required(true, 'Name must be at least 4 characters');
MessageSchema.path('content').required(true, 'There is no content in this message.');
mongoose.model('Message', MessageSchema);
var Message = mongoose.model('Message');

// What would we need to add to make the below snippet work properly? Read your console!
var CommentSchema = new mongoose.Schema({
    // since this is a reference to a different document, the _ is the naming convention!
    name: { type: String, minlength: 4},
    _message: { type: Schema.Types.ObjectId, ref: 'Message' },
    content: { type: String}
}, { timestamps: true });
CommentSchema.path('name').required(true, 'Name must be at least 4 characters');
CommentSchema.path('content').required(true, 'There is no content in this comment.');
mongoose.model('Comment', CommentSchema);
var Comment = mongoose.model('Comment');

mongoose.Promise = global.Promise;//Promise


//Routes
//  "/": View all messages
app.get('/', (req, res)=> {
    // the populate method is what grabs all of the comments using their IDs stored in the 
    // comment property array of the post document!
    Message.find({})
        .populate('comments')
        .exec(function (err, posts) {
            if(err){
                console.log("Can't find all???");
                res.render('wall');
                return;
            }
            res.render('wall', { posts: posts });
    });
});
//  "/messages": New message
app.post('/messages', (req, res) => {
    console.log("POST DATA", req.body);
    // create a new animal with the name and age corresponding to those from req.body
    var message = new Message(req.body);

    // console.log(animal.createdAt);
    // Try to save that new animal to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
    message.save((err, newPost) => {
        // if there is an error console.log that something went wrong!
        if (err) {
            console.log('something went wrong');
            Message.find({})
                .populate('comments')
                .exec(function (err, posts) {
                    res.render('wall', { posts: posts, messageErrors: message.errors });
            });
        }
        else {
            console.log('successfully added a message');
            res.redirect('/');
        }
    })
})

//  "/comment/:messageId/": Post new comment
app.post('/messages/:id', (req, res) => {
    Message.findOne({ _id: req.params.id }, (err, message) => {
        // data from form on the front end
        var comment = new Comment(req.body);
        //  set the reference like this:
        comment._message = message._id;
        // now save both to the DB
        comment.save((err) => {
            message.comments.push(comment);
            message.save((err) => {
                if (err) {
                    console.log('Error on comments');
                    Post.find({})
                        .populate('comments')
                        .exec(function (err, post) {
                            res.render('wall', { posts: post, commentErrors: comment.errors });
                    });
                } else {
                    res.redirect('/');
                }
            });
        });
    });
});



// Setting our Server to Listen on Port: 8000
app.listen(POST, function () {
    console.log(`listening on port ${POST}`);
})