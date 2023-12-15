import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true, enum: ["Admin", "User","Employee"] },
});
UserSchema.plugin(passportLocalMongoose);

export const UserModel = mongoose.model("User", UserSchema);
