import mongoose, { Document, Schema } from "mongoose";

interface FourpModelInterface extends Document {
    Title: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    option1points: number;
    option2points: number;
    option3points: number;
    option4points: number;
}

const fourpSchema: Schema = new Schema({
    Title: { type: String, required: true },
    option1: { type: String, required: true },
    option2: { type: String, required: true },
    option3: { type: String, required: true },
    option4: { type: String, required: true },
    option1points: {type: Number, default: 0},
    option2points: {type: Number, default: 0},
    option3points: {type: Number, default: 0},
    option4points: {type: Number, default: 0},
});

export default mongoose.model<FourpModelInterface>("fourpmodel", fourpSchema);
