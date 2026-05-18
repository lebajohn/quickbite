// import app from '../server/server.js';

// export default app;


import express from 'express';

const app = express();

app.get('/api/test', (req, res) => {
  res.json({ message: "express working" });
});

export default app;