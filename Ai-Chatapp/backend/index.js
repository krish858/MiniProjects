require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
const app = express();
const cors = require("cors");
const genAI = new GoogleGenerativeAI(process.env.Gemini_api);
const port = 3000;

app.use(express.json());
app.use(cors());

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

const data = [
    {
      role: "user",
      parts: [{ text: "hi my name is krish" }],
    },
    {
      role: "model",
      parts: [{ text: "Hi " }],
    }
]

const chat = model.startChat({
    history: data,
    generationConfig: {
    maxOutputTokens: 1000,
    },
});

async function sendrequest(message){
    const msg = await message;
    await data.push({
        role: "user",
        parts: [{ text: msg }],
    })
    const result = await chat.sendMessage(msg, { history: data }); 
    const response = await result.response;
    const text = await response.text();
    await data.push({
        role: "model",
        parts: [{ text: text }],
    })
}

app.post("/",async function(req,res){
    message = req.body.message;
    const reply = await sendrequest(message);
    console.log(reply)
    res.json({
        msg: reply
    })
})

console.log("server running at port",port)
app.listen(port)