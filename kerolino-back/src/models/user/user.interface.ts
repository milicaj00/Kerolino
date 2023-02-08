import mongoose from 'mongoose'

interface IUser {
    name: string;
    surname: string;
    email: string;
    password: string;
    address: string;
    postNumber: number;
    city: string;
    phoneNum: string;
    is_seller: boolean;
    //myProducts: mongoose.Types.ObjectId[]
    //veza:string
}

export interface UserModelInterface extends IUser, mongoose.Document {
    fullName: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;

}

// export interface UserModelInterface extends mongoose.Model<UserDoc> {
//     build(attr: IUser): UserDoc
// }

