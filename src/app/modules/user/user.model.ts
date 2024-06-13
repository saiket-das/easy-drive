import { Schema } from "mongoose";
import { UserProps } from "./user.interface";
import { UserRole } from "./user.constant";

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

export const UserModel = mongoose.model("User", userSchema);
