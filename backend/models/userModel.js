import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true }, // Уникальное поле
  password: { type: String },
  cartData: { type: Object, default: {} },
  code: { type: String },
  codeExpires: { type: Date },
}, { minimize: false });

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;