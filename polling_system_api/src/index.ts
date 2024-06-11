// even if you want to give no as options send them as strings

import express, { json, Request,Response } from "express";
import dbconnect from "./mongooseconnect";
import fourpmodel from "./4pmodel"
import twopmodel from "./2pmodel"

const app = express();
const port:number = 3000;

dbconnect()
app.use(express.json());

// create polls with 2 options;
app.post("/poll/2p",(req:Request,res:Response)=>{
    const body = req.body;
    try{
        const data = twopmodel.create({
            Title: body.title,
            option1: body.option1,
            option2: body.option2,
        })
        res.json({
            msg: "poll created",
            data: data
        })
    }catch(e){
        res.json({
            msg: "some error ocuured or youd entered invalid arguments"
        })
    }
})

// create polls with 4 options 
app.post("/poll/4p",(req:Request,res:Response)=>{
    const body = req.body;
    try{
        fourpmodel.create({
            Title: body.title,
            option1: body.option1,
            option2: body.option2,
            option3: body.option3,
            option4: body.option4,
        })
        res.json({
            msg: "poll created"
        })
    }catch(e){
        res.json({
            msg: "some error ocuured or youd entered invalid arguments"
        })
    }

})

app.listen(port)
console.log(`Server is running on port ${port}`);
