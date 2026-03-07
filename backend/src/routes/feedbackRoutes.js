import express from 'express';
import { db } from '../index.js';

const router = express.Router();

router.post('/', (req, res) => {
  try {
    const { sender, action } = req.body;

    if (!sender || !action) {
      return res.status(400).json({ error: "Missing sender or action" });
    }

    // Initialize sender counter block if it is their first time mapped
    if (!db.senderStats) {
      db.senderStats = {};
    }
    
    if (!db.senderStats[sender]) {
      db.senderStats[sender] = { opens: 0, done: 0, ignored: 0 };
    }

    if (action === 'open') {
      db.senderStats[sender].opens += 1;
    } else if (action === 'done') {
      db.senderStats[sender].done += 1;
    } else if (action === 'ignore') {
      db.senderStats[sender].ignored += 1;
    } else {
      return res.status(400).json({ error: "Invalid action" });
    }

    res.json({ success: true, stats: db.senderStats[sender] });
  } catch (error) {
    console.error("Feedback route error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
