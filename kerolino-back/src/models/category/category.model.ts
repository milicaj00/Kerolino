import mongoose, { Schema } from "mongoose";
import { CategoryModelInterface } from "./category.interface";

const CategoryShema: Schema = new Schema(
    {
       // product: { type: Array<Schema.Types.ObjectId>, ref: 'Product', required: true },
        name: { type: String, required: true },
       // index: { type: Number, required: true },
    },
    {
        timestamps: true
    }
)


export default mongoose.model<CategoryModelInterface>('Category', CategoryShema);