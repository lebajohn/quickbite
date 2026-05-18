import order from "../models/Order.js";

// CREATE ORDER
export const createOrder = async (req, res) => {
  try {
    const order = await Order.create({
      user: req.user.id,

      orderItems: req.body.orderItems,

      paymentMethod: req.body.paymentMethod,

      shippingData: req.body.shippingData,

      totalPrice: req.body.totalPrice,

      isPaid: req.body.isPaid || false,

      isDelivered: false,
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// GET USER ORDERS
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL ORDERS (ADMIN)
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE ORDER STATUS
export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(
      req.params.id
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.isPaid =
      req.body.isPaid ?? order.isPaid;

    order.isDelivered =
      req.body.isDelivered ??
      order.isDelivered;

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};