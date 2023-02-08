import mongoose from 'mongoose'

interface IOrder {
    product: mongoose.Types.ObjectId,
    buyer: mongoose.Types.ObjectId,
    amount: number
}

export interface OrderModelInterface extends IOrder, mongoose.Document { }

// export interface OrderModelInterface extends mongoose.Model<OrderDoc> {
//     build(attr: IOrder): OrderDoc
// }

