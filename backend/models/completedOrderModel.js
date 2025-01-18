import mongoose from "mongoose";

const completedOrderSchema = new mongoose.Schema({
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
  status: { type: String, default: "Delivered" },
  payment: { type: Boolean, default: false },
  paymentMethod: { type: String, enum: ["cash", "card"], required: true },
  deliveredAt: { type: Date, default: Date.now }, // Добавляем поле deliveredAt
});

const CompletedOrderModel = mongoose.models.CompletedOrder || mongoose.model("CompletedOrder", completedOrderSchema);

export default CompletedOrderModel;