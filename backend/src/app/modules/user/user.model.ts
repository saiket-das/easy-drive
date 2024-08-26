import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import config from "../../config";
import { UserRole } from "./user.constant";
import { StaticUserModel, UserProps } from "./user.interface";

const userSchema = new Schema<UserProps>(
  {
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
      // required: true,
      default: "",
    },
    address: {
      type: String,
      // required: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

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
// Static method to match Hash password and Plain password
userSchema.statics.isPasswordMatched = async function (
  plainPassword: string,
  hashPassword
) {
  return await bcrypt.compare(plainPassword, hashPassword);
};

export const UserModel = model<UserProps, StaticUserModel>("User", userSchema);
