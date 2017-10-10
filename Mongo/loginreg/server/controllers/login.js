var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    moment = require('moment')
    // session = require('express-session')

module.exports = {
    show: (req,res)=>{
        data = {}
        User.find({},(err,users)=>{
            if(err){
                res.render('loginreg', { users: "NO USER" });
            }
            res.render('loginreg', { users: users });
        })
    },
    main: (req, res) => {
        User.find({}, (err, users) => {
            const currentUser = req.session.currentUser;
            if (!currentUser) {
                return res.redirect('/');
            }
            res.render('main', { currentUser: currentUser, userJSON: users })
        })
    },
    login: (req,res)=>{
        const {email,login_password} = req.body;
        User.findOne({email},(err,user)=>{
            if(err){
                // req.session.loginErrors = err;
                // return res.redirect('/');
                return res.render('loginreg',{loginErrors:err});
            }

            user.login(login_password)
                .then(()=>{
                    // req.session.loginErrors = undefined;
                    req.session.currentUser = user;
                    return res.redirect('main')
                })
                .catch(err => {
                    // req.session.loginErrors = err;
                    // return res.redirect('/');
                    return res.render('loginreg', { loginErrors: err });
                })
        })
    },
    register: (req,res)=>{
        //change string to date
        // const body = req.body;
        // console.log(body);
        req.body.birthday = moment(req.body.birthday).toDate();//String date to Date object
        var user = new User(req.body);
        // console.log(user);
        user.save((err,newUser)=>{
            if(err){
                console.log('something went wrong');
                res.render('loginreg', { user:user,regErrors: user.errors});
                return;
            }
            console.log('successfully added a animal! at: ' + newAnimal._id);

            req.session.currentUser = user;
            res.redirect('/main');
        })
    }
}
