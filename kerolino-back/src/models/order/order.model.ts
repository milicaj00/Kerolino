import mongoose, { Schema } from "mongoose";
import { OrderModelInterface } from "./order.interface";

const OrderShema: Schema = new Schema(
    {
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        buyer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        amount: { type: Number, required: true },
        sent: { type: Boolean, default: false, required: true },
    },
    {
        timestamps: true
    }
)

export default mongoose.model<OrderModelInterface>('Order', OrderShema);