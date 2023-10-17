const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        status : {
            type: String,
            enum: ["Completed", "In Progress", "Not Completed"]
        },
        due_date: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;