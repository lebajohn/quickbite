import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from '../server/routes/authRoutes.js';
import orderRoutes from '../server/routes/orderRoutes.js';
import productRoutes from '../server/routes/productRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI);
  }
};

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ error: "DB connection failed: " + err.message });
  }
});

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', authRoutes);

export default app;