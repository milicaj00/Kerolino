import mongoose from 'mongoose'

interface IProduct {
    name: string;
    image: string;
    price: Number;
    owner: string;
}

interface ProductDoc extends mongoose.Document { }

export interface ProductModelInterface extends mongoose.Model<ProductDoc> {
    build(attr: IProduct): ProductDoc
}

