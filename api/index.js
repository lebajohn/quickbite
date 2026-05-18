// import app from '../server/server.js';

// export default app;


import app from '../server/server.js';

export default async (req, res) => {
  try {
    app(req, res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};