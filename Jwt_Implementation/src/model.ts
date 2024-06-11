import { model, Schema } from 'mongoose';

interface user{
    username: string;
    password: string;
    name :string
}

const userSchema = new Schema<user>({
    username: {type:String , required:true },
    password: {type:String , required:true },
    name: {type:String },
})
 
const User = model("User",userSchema) 
export default User;