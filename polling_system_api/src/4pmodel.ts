import mongoose, {Document,Schema} from "mongoose";
import { string } from "zod";

interface fourpmodelinterface extends Document{
    Title: string,
    option1: string,
    option2: string,
    option3: string,
    option4: string,
}

const fourpschema:Schema = new Schema({
    name: {type:string, required:true },
    option1 : {type:string, required:true },
    option2 : {type:string, required:true },
    option3 : {type:string, required:true },
    option4 : {type:string, required:true },
})

export default mongoose.model<fourpmodelinterface>("fourpmodel",fourpschema)