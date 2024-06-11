import mongoose from "mongoose";
import { DB_URL } from "./config";

const dbconnect = () =>{
    try{
        const connection = mongoose.connect(DB_URL) 
    }catch(e){
        console.error(`error message ${e}`)
    }
}

export default dbconnect