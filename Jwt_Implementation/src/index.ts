import express,{ Request,Response } from "express";
import cors from "cors"
import jsonwebtoken  from "jsonwebtoken";
import User from "./model";
import dbconnect from "./dbconnect";
import signinzod from "./Signintypes";
import signupzod from "./Signuptypes";
import protectedroutes from "./protectedroutes";
import dotenv from 'dotenv';
dotenv.config()


const app = express();
const port:number = 3000;
const jwtsecret:string = process.env.JWT_SECRET || '';

app.use(cors());
app.use(express.json());

dbconnect()

app.use("/api/v1/signedin",protectedroutes)

async function userexsist(username:String){
    const user = await User.findOne({username : username});
    if(!user){
        return false;
    }else{
        return true;
    }
}

app.post("/api/v1/signup",async(req:Request,res:Response)=>{
    const body = await req.body;
    const createacc:boolean = await userexsist(body.username)
    if(createacc){
        return res.json({
            msg: "user already exsists, Signin"
        })
    }
    const validate = signupzod.safeParse(body);
    try{
        if(!validate.success){
            res.json({
                msg: "invalid Inputs",
            });
        }else{
            User.create({
                username: body.username,
                password: body.password,
                name: body.name,
            });
            const token = await jsonwebtoken.sign({ username: body.username },jwtsecret);
            res.json({
                msg: "user created",
                jwt: token
            })
        }
    }catch(e){
        res.json({
            msg: "internal server error,try again later",
        })
    }
    
})

app.post("/api/v1/signin",async(req:Request,res:Response)=>{
    const body = await req.body;
    const validate = signinzod.safeParse(body);
    try{
        if(!validate.success){
            res.json({
                msg: "invalid Inputs",
            });
        }else{
            const user = await User.findOne({ username: body.username });

            if (!user) {
                return res.json({
                    msg: "Invalid username",
                });
            }
            
            if(body.password == user.password){
                const token = jsonwebtoken.sign({ username: user.username }, jwtsecret);
                res.json({
                    msg: "user signed in",
                    jwt: token
                });
            }else{
                return res.json({
                    msg: "Invalid password",
                });
            }
        }
    }catch(e){
        res.json({
            msg: "internal server error,try again later",
        })
    }
})

app.listen(port)
console.log(`port listening at ${port}`)
