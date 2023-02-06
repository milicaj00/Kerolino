import mongoose, { Schema } from "mongoose";
import { UserModelInterface } from "./user.interface";

const UserShema: Schema = new Schema(
    {
        name: { type: String, required: true },
        surname: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        address: { type: String, required: true },
        role: { type: Boolean, required: false }
        //veza: { type: Schema.Types.ObjectId, ref: ' IME TABELE' }
    },
    {
        versionKey: false
    }
)

export default mongoose.model<UserModelInterface>('User', UserShema);