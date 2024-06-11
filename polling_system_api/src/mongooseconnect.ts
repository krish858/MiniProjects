import mongoose from "mongoose";
import { DB_URL } from "./config";

const dbconnect =async () =>{
    try{
        await mongoose.connect(DB_URL)
        console.log("connected") 
    }catch(e){
        console.error(`error message ${e}`)
    }
}

export default dbconnect