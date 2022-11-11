import mongoose, { model, Model, Schema } from "mongoose";

export interface IUser {
    _id?: string;
    name: string;
    email: string;
    password?: string;
    role: string;

    create_at?: string;
    update_at?: string;
}

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: {
            values: ["admin", "client"],
            message: "Invalid role",
            default: "client",
            required: true
        }
    }
}, {
    timestamps: true
})

const User: Model<IUser> = mongoose.models.User || model("User", userSchema)

export default User