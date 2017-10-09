var controller = require('../controllers/animalController.js');
// Routes
module.exports = (app)=>{
    //READ: View ALL
    app.get('/', (req, res) => {
        controller.showAll(req,res);
    })
    //READ: ViewOne
    app.get('/mongooses/:id', (req, res) => {
        controller.showOne(req, res);
    })
    //CREATE
    app.get('/new', (req, res) => {
        res.render('newAnimal');
    })
    // Add animal Request 
    app.post('/mongooses', (req, res) => {
        controller.create(req,res);
    })
    //UPDATE: View form
    app.get('/mongooses/edit/:id', (req, res) => {
        controller.edit(req, res);
    })
    // UPDATE
    app.post('/mongooses/:id', (req, res) => {
        controller.update(req, res);
    })
    //Destroy
    app.get('/mongooses/destroy/:id', (req, res) => {
        controller.destroy(req, res);
    })
}