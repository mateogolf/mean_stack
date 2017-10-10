var controller = require('../controllers/login.js');
// Routes
module.exports = (app) => {
    app.get('/', (req, res) => {
        controller.show(req, res)
        // res.render('loginreg',{userJSON:controller.show(req,res)})//,{loginErrors:,regErrors:req.session.regErrors});
    });
    app.post('/login', (req, res) => {
        controller.login(req,res);
    });
    app.post('/register', (req, res) => { 
        controller.register(req,res);
    });
    app.get('/main', (req, res) => {
        const currentUser = req.session.currentUser;
        if (!currentUser){
            return res.redirect('/');
        }
        res.render('main',{currentUser:currentUser})//,{loginErrors:,regErrors:req.session.regErrors});
    });
    app.get('/logout', (req, res) => {
        req.session.currentUser = undefined;
        res.redirect('/');
    })
}