import mongoose, { Schema } from "mongoose";
import { ProductModelInterface } from "./product.interface";

const ProductShema: Schema = new Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        amount: { type: Number, required: true },
        image: { type: String, required: false },
        category: { type: Schema.Types.ObjectId, ref: 'Category' }
      //  owner: { type: Schema.Types.ObjectId, ref: 'User' }
    },
    {
        timestamps: true
    }
)

export default mongoose.model<ProductModelInterface>('Product', ProductShema);