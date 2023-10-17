const Task = require("../models/task");
const User = require("../models/user");

// Task Create
module.exports.create = async (req, res) => {
    
    const {title, description, status, due_date} = req.body;

    if(!title || !description || !status || !due_date){
        return res.status(422).json({ error: "Plz Filled The Field Properly" });
    }

    try{

        const taskExist = await Task.findOne({ title: title });

        if(taskExist){
            return res.status(422).json({ error: "Task Already Exist" });
        }else{
            const task = new Task({ title, description, status, due_date});
            await task.save();

            const user = await User.findById(req.rootUser);
            user.tasks.push(task);
            user.save();

            return res.status(201).json({ message: "Task Created Successfully" });
        }

    }catch(error){
        console.log(error);
    }

}

// Task Read
module.exports.getData = async (req, res) => {
    try{
        const user = await User.findById(req.rootUser).populate('tasks');
        return res.status(201).json({ data: user.tasks});
    }catch(error){
        console.log(error);
    }
}


// Task Update
module.exports.update = async (req, res) => {
    try{

        const task = await Task.findById(req.params.id);
        const {title, description, status, due_date} = req.body;

        if(!task){
            return res.status(422).json({error: "Sorry, Task Not Exist"});
        }

        task.title = title;
        task.description = description;
        task.status = status;
        task.due_date = due_date;

        task.save();

        return res.status(201).json({message: "Task Updated Successfully"});

    }catch(error){
        console.log(error);
    }
}


// Task Delete
module.exports.delete = async (req, res) => {
    try{

        const task = await Task.findByIdAndDelete(req.params.id);
        // console.log(task);

        if(!task){
            return res.status(422).json({error: "Task not exists"});
        }

       await User.findOneAndUpdate(req.rootUser, {$pull: {tasks: task.id}});

       return res.status(201).json({message: "Task Deleted Successfully"});

    }catch(error){
        console.log(error);
    }
}
