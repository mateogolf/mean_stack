var mongoose = require('mongoose'),
    Task = mongoose.model('Task')

module.exports = {
    show:(req,res)=>{
        Task.find({},(err,tasks)=>{
            if(err){
                console.error(err);
            }else{
                console.log("Successful!");
            }
            res.json(tasks);
        })
    },
    showOne:(req,res)=>{
        Task.findOne({ _id: req.params.id},(err,task)=>{
            if (err) {
                console.error(err);
                return res.redirect('/tasks');
            }
            console.log("Successful!");
            res.json(task);
        })
    },
    create:(req,res)=>{
        console.log("POST DATA", req.params);
        // const task = new Task(req.params);
        // task.save((err,newTask)=>{
        //     if(err){
        //         console.error(err);
        //         // res.render('newTask',{errors:task.errors});
        //         // return;//err;//api only
        //     }
        //     else{
        //         console.log("Task added")
        //     }
        //     return res.redirect('/tasks')
        // })
    },
    update:(req,res)=>{
        console.log("POST DATA", req.params);
        var task = new Task(req.body);
        Task.update({ _id: req.params.id},task,(err)=>{
            if(err){
                console.log(err);
                res.render('editTask',{errors:task.errors});
                return;// err;//api?
            }

        });

    },
    delete:(req,res)=>{

    }
}