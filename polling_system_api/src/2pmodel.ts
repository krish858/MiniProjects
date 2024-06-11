import mongoose, {Document,Schema} from "mongoose";
import { string } from "zod";

interface twopmodelinterface extends Document{
    Title: string,
    option1: string,
    option2: string,
}

const twopschema:Schema = new Schema({
    name: {type:string, required:true },
    option1 : {type:string, required:true },
    option2 : {type:string, required:true },
})
 

export default mongoose.model<twopmodelinterface>("twopmodel",twopschema)
