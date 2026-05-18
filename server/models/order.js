import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    orderItems: [
      {
        name: String,
        quantity: Number,
        image: String,
        price: Number,
      },
    ],

    shippingData: {
      fullName: String,
      phone: String,
      address: String,
      city: String,
    },

    paymentMethod: String,

    totalPrice: Number,

    isPaid: {
      type: Boolean,
      default: false,
    },

    isDelivered: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;