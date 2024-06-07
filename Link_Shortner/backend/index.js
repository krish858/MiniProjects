const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const zod = require("zod");
const crypto = require('crypto')
const { urlvalidation } = require("./types");
const { Urls } = require("./model");
const port = 3000;

app.use(cors());
app.use(express.json());


function sha256(text){
    const hash = crypto.createHash('sha256').update(text, 'utf8').digest('hex');
    const shortenedHash = hash.substr(0, 5);
    return shortenedHash;
}

app.get("/:hash",async function(req,res){
    const hash = req.params.hash;
    try{
        const urldata = await Urls.findOne({hashedurl: hash});
        if(urldata){
            res.redirect(urldata.url);
        }else{
            res.send("Invalid Url")
        }
    }catch(error){
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

app.post("/api/shorternurl",async function(req,res){
    const response = req.body;
    const validate = urlvalidation.safeParse(response);
    if(!validate.success){
        res.status(411).json({
            msg: "Enter Valid Url",
        })
    }else{
        const url = response.url;
        const hashedurl = sha256(url);
        await Urls.create({
            url: url,
            hashedurl: hashedurl,
        });
        res.json({
            msg: "Url shortened",
            hashedurl: hashedurl,
        });
    }

})

app.listen(port);

console.log("server is running in port",port);