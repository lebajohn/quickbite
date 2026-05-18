import express from "express";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  rateProduct,
} from "../controllers/productController.js";

import {
  protect,
  admin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getProducts);

router.post(
  "/",
  protect,
  admin,
  createProduct
);

router.put(
  "/:id",
  protect,
  admin,
  updateProduct
);

router.delete(
  "/:id",
  protect,
  admin,
  deleteProduct
);

router.post(
  "/:id/rate", 
  protect, 
  rateProduct
);

export default router;