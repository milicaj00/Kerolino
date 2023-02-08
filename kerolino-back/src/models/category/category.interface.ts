import mongoose from 'mongoose'

interface ICastegory {
    //product: mongoose.Types.ObjectId[],
    name: string,
   // index: number
}

export interface CategoryModelInterface extends ICastegory, mongoose.Document { }