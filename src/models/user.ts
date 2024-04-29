import mongoose from "mongoose";
import { Users } from "../helpers/interface";

const userSchema = new mongoose.Schema<Users>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    collection: "user",
  }
);

export default mongoose.model<Users>("User", userSchema);
