import mongoose, { Document, Schema } from "mongoose";

interface TwopModelInterface extends Document {
    Title: string;
    option1: string;
    option2: string;
    option1points: number;
    option2points: number;
}

const twopSchema: Schema = new Schema({
    Title: { type: String, required: true },
    option1: { type: String, required: true },
    option2: { type: String, required: true },
    option1points: {type: Number, default: 0},
    option2points: {type: Number, default: 0},
});

export default mongoose.model<TwopModelInterface>("twopmodel", twopSchema);
