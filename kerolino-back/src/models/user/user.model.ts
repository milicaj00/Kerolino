import mongoose, { Schema } from "mongoose";
import { UserModelInterface } from "./user.interface";
import bcrypt from "bcrypt";

const UserSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        surname: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: false },
        address: { type: String, required: false },
        postNumber: { type: Number, required: false },
        city: { type: String, required: false },
        phoneNum: { type: String, required: false },
        is_seller: { type: Boolean, required: true },
      //  myProducts: { type: Array<Schema.Types.ObjectId>, ref: 'Product', default: [], required: false },
        myOrders: { type: Array<Schema.Types.ObjectId>, ref: 'Order', default: [], required: false }
    },
    {
        versionKey: false
    }
)

UserSchema.virtual("fullName").get(function (this: UserModelInterface) {
    return `${this.name} ${this.surname}`;
});

// When the user registers
UserSchema.pre(
    "save",
    async function (this: UserModelInterface, next: any) {
        // only hash the password if it has been modified (or is new)
        if (!this.isModified("password")) return next();

        // Random additional data
        const salt = await bcrypt.genSalt(10);

        const hash = bcrypt.hashSync(this.password, salt);

        // Replace the password with the hash
        this.password = hash;

        return next();
    }
);

// Compare a candidate password with the user's password
UserSchema.methods.comparePassword = async function (
    candidatePassword: string
): Promise<boolean> {
    // So we don't have to pass this into the interface method
    const user = this as UserModelInterface;

    return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};


export default mongoose.model<UserModelInterface>('User', UserSchema);