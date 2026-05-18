import express from 'express';
import dotenv from 'dotenv';
import connectDB from '../server/config/db.js';

dotenv.config();
connectDB();

const app = express();

app.get('/api/test', (req, res) => {
  res.json({ message: "db connected" });
});

export default app;