import express from 'express';
import dotenv from 'dotenv';
import connectDB from '../server/config/db.js';
import authRoutes from '../server/routes/authRoutes.js';
import orderRoutes from '../server/routes/orderRoutes.js';
import productRoutes from '../server/routes/productRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message, stack: err.stack });
});

app.get('/api/test', (req, res) => {
  res.json({ message: "all routes working" });
});

export default app;