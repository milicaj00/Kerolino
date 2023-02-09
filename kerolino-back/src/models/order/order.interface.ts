import mongoose from 'mongoose'
import { UserModelInterface } from "../user/user.interface";


interface IOrder {
    product: mongoose.Types.ObjectId,
    buyer: mongoose.Types.ObjectId,
    amount: number,
    sent: boolean
}

export interface OrderModelInterface extends IOrder, mongoose.Document {
    createdAt: Date,
    updatedAt: Date
}

// export interface OrderModelInterface extends mongoose.Model<OrderDoc> {
//     build(attr: IOrder): OrderDoc
// }

