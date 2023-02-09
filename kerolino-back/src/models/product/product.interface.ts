import mongoose from 'mongoose'

interface IProduct {
    name: string;
    image: string;
    price: number;
    amount: number;
    category: mongoose.Types.ObjectId
    // owner: mongoose.Types.ObjectId;
}

export interface ProductModelInterface extends IProduct, mongoose.Document {

}

// export interface ProductModelInterface extends mongoose.Model<ProductDoc> {
//     build(attr: IProduct): ProductDoc
// }

