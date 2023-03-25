import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// our table is called users with UserSchema
export const UserModel = mongoose.model("users", UserSchema);