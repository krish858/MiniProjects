const { createTodo } = require("./types.js");
const { updateTodo } = require("./types.js");
const { todo } = require("./model.js");

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const port = 3000;

app.use(cors())
app.use(express.json())

app.post("/todo",async function(req,res){
    const todorequest = req.body;
    const response = createTodo.safeParse(todorequest);
    if(!response.success){
        res.status(411).json({
            msg: "send right inputs"
        })
        return;
    }
    await todo.create({
        title: todorequest.title,
        description: todorequest.description,
        completed: false,
    })
    res.json({
        msg: "Todo created"
    });

})

app.get("/todos",async function(req,res){
    const todos = await todo.find({});
    console.log(todos);
    res.json({
        todos
    })
})

app.put("/completed", async function(req,res){
    const tocompleted = req.body();
    const response = updateTodo.safeParse(tocompleted);
    if(!response.success){
        res.status(411).json({
            msg: "Send id in right format",
        })
        return;
    }
    await todo.update({
        _id: tocompleted.id
    },{
        completed: true
    })
    res.json({
        msg: "Todo completed"
    })
})

app.listen(port);

