import { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { UserProps } from "./user.interface";
import { UserRole } from "./user.constant";
import config from "../../config";

const mongoose = require("mongoose");

const userSchema = new Schema<UserProps>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: UserRole,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

// Hashing password
userSchema.pre("save", async function (next) {
  const student = this;
  student.password = await bcrypt.hash(
    student.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});
// Send user empty string after hasshing password
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

// Static method to check is user exists or not
userSchema.statics.isUserExists = async function (email: string) {
  return await UserModel.findOne({ email }).select("+password");
};
// Static method to check is user exists or not
userSchema.statics.isPasswordMatched = async function (
  plainPassword: string,
  hashPassword
) {
  return await bcrypt.compare(plainPassword, hashPassword);
};

export const UserModel = mongoose.model("User", userSchema);
