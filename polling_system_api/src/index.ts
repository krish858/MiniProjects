import express, { json, Request,Response } from "express";
import dbconnect from "./mongooseconnect";
import fourpmodel from "./4pmodel"
import twopmodel from "./2pmodel"

const app = express();
const port:number = 3000;

dbconnect()
app.use(express.json());

app.get("/",(req:Request,res:Response)=>{
    res.json({
        msg: "hi"
    })
})

// create polls with 2 options;
app.post("/poll/2p",(req:Request,res:Response)=>{
    const body = req.body;

})

// create polls with 4 options 
app.post("/poll/4p",(req:Request,res:Response)=>{
    const body = req.body;

})

app.listen(port)
console.log(`Server is running on port ${port}`);
