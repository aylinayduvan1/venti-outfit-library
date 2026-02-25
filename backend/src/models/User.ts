import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  surname: string;
  username: string;
  email: string;
  password: string;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export const User = model<IUser>("User", UserSchema);