var controller = require('../controllers/taskController.js')
//Routes
module.exports = (app)=>{
    //View all
    app.get("/tasks",controller.show);
    //View One
    app.get("/tasks/:id", controller.showOne);
    //CREATE
    app.post("/tasks",controller.create);
    //Update
    app.put("/tasks/:id", controller.update);
    //Delete
    app.delete("tasks/:id",controller.delete);
}