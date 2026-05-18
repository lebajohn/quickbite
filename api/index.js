import express from 'express';
import dotenv from 'dotenv';
import connectDB from '../server/config/db.js';
import productRoutes from '../server/routes/productRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/products', productRoutes);

app.get('/api/test', (req, res) => {
  res.json({ message: "products route working" });
});

export default app;