import mongoose from 'mongoose'

interface IUser {
    name: string;
    surname: string;
    email: string;
    password: string;
    address: string;
    role: boolean;
    //veza:string
}

interface UserDoc extends mongoose.Document { }

export interface UserModelInterface extends mongoose.Model<UserDoc> {
    build(attr: IUser): UserDoc
}

