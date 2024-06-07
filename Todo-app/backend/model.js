const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://krish:eXPWpnZy1cHibeHA@cluster0.qzvavbv.mongodb.net/todos")

const TodoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean,
})

const todo = mongoose.model("todos",TodoSchema);

module.exports={
    todo
}