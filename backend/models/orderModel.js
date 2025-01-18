import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true, min: 0 },
  address: {
    fullName: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    house: { type: String, required: true },
    entrance: { type: String },
    apartment: { type: String },
    floor: { type: String },
    intercom: { type: String },
    comment: { type: String },
    phone: { type: String, required: true },
  },
  status: { type: String, default: "Food Processing" },
  date: { type: Date, default: Date.now },
  payment: { type: Boolean, default: false },
  paymentMethod: { type: String, enum: ["cash", "card"], required: true },
  isCompleted: { type: Boolean, default: false }, // Поле для завершенных заказов
});

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;