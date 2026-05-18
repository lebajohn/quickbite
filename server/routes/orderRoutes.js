import express from "express";

import {
  createOrder,
  getOrders,
  getMyOrders,
  updateOrder,
} from "../controllers/orderController.js";

import {
  protect,
  admin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createOrder);

router.get("/myorders", protect, getMyOrders);

router.get("/", protect, admin, getOrders);

router.put("/:id", protect, admin, updateOrder);

export default router;