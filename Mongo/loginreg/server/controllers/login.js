var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    moment = require('moment'),
    session = require('express-session')

module.exports = {
    show: (req,res)=>{
        req.session.currentUser = undefined;
        User.find({},(err,users)=>{
            if(err){
                res.render('loginreg', { users: "NO USER" });
            }
            res.render('loginreg', { users: users });
        })
    },
    main: (req, res) => {
        // User.find({}, (err, users) => {
        const currentUser = req.session.currentUser;
        if (!currentUser) {
            return res.redirect('/');
        }
        res.render('main', { currentUser: currentUser})
        // })
    },
    login: (req,res)=>{
        const {email,login_password} = req.body;
        User.findOne({email},(err,user)=>{
            if(err){
                // req.session.loginErrors = err;
                // return res.redirect('/');
                res.render('loginreg',{loginErrors:err});
                return;
            }
            //Bcrypt
            user.login(login_password)
                .then(()=>{
                    // req.session.loginErrors = undefined;
                    req.session.currentUser = user;
                    return res.redirect('/main')
                })
                .catch(err => {
                    // req.session.errors = err;
                    // return res.redirect('/');
                    console.log(err)
                    return res.render('loginreg', { loginErrors: [err] });
                })
        })
    },
    register: (req,res)=>{
        if (req.body.password != req.body.pw_confirm) {
            console.log("Comparison WRONG")
            let errors = [{message:"Password and confirmaion don't match"}]
            res.render('loginreg', { regErrors: errors });//{ user:user,regErrors: user.errors});
            return;
        }
        // req.body.birthday = moment(req.body.birthday).toDate();//String date to Date object
        var user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
            birthday: moment(req.body.birthday).toDate()
        });
        console.log(user);
        user.save((err,newUser)=>{
            if(err){
                console.log('something went wrong');
                console.log(err);
                res.render('loginreg', {regErrors: user.errors });//{ user:user,regErrors: user.errors});
                return;
            }
            // console.log('successfully added a animal! at: ' + newAnimal._id);

            req.session.currentUser = user;
            res.redirect('/main');
        })
    }
}
