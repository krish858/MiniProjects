const mongoose = require("mongoose");

mongoose.connect("your connection string")

const TodoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean,
})

const todo = mongoose.model("todos",TodoSchema);

module.exports={
    todo
}
