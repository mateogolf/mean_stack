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

mongoose.connect('mongodb://localhost/association');
var PostSchema = new mongoose.Schema({
    text: { type: String, required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
}, { timestamps: true });
// The 'type' property of the object inside of the array is an attribute
// that tells Mongoose what to look for.
mongoose.model('Post', PostSchema);
//UserSchema.path('email').required(true, 'User email cannot be blank');
var Post = mongoose.model('Post');

// What would we need to add to make the below snippet work properly? Read your console!
var CommentSchema = new mongoose.Schema({
    // since this is a reference to a different document, the _ is the naming convention!
    _post: { type: Schema.Types.ObjectId, ref: 'Post' },
    text: { type: String, required: true },
}, { timestamps: true });
mongoose.model('Comment', CommentSchema);
var Comment = mongoose.model('Comment');

mongoose.Promise = global.Promise;//Promise

//View One POST
// just an example route, your routes may look different
app.get('/posts/:id', function (req, res) {
    // the populate method is what grabs all of the comments using their IDs stored in the 
    // comment property array of the post document!
    Post.findOne({ _id: req.params.id })
        .populate('comments')
        .exec(function (err, post) {
            res.render('post', { post: post });
        });
});

//ADD A COMMENT
//  just a sample route.  Post request to update a post.
//  your routes will probably look different.
app.post('/posts/:id', function (req, res) {
    Post.findOne({ _id: req.params.id }, function (err, post) {
        // data from form on the front end
        var comment = new Comment(req.body);
        //  set the reference like this:
        comment._post = post._id;
        // now save both to the DB
        comment.save(function (err) {
            post.comments.push(comment);
            post.save(function (err) {
                if (err) {
                    console.log('Error');
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