import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config()

const dbUrl = process.env.DB_URL || '';

const dbconnect = async () => {
    try{
        await mongoose.connect(dbUrl);
        console.log("connected")
    }catch(e){
        console.log("")
    }
}

export default dbconnect;