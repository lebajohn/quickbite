import express from 'express';
import dotenv from 'dotenv';
import connectDB from '../server/config/db.js';
import productRoutes from '../server/routes/productRoutes.js';
import authRoutes from '../server/routes/authRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

app.get('/api/test', (req, res) => {
  res.json({ message: "auth route working" });
});

export default app;