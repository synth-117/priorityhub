import { db } from '../index.js';

// POST /api/auth/login
export const loginDemoUser = (req, res) => {
  const user = {
    id: "demo-user",
    name: "Sandipan",
    email: "demo@priorityhub.com"
  };

  res.json({
    user,
    token: "demo-token"
  });
};

// Mock check for token or user
export const getCurrentUser = (req, res) => {
  // In a real app we'd verify the JWT token from headers here.
  // For the hackathon demo, we just trust the frontend's localStorage 
  // and handle it purely on the client side.
  res.status(401).json({ success: false, message: 'Verify via frontend localStorage' });
};

export const logoutUser = (req, res) => {
  const userIndex = db.users.findIndex(u => u.email === "demo@priorityhub.com");
  if (userIndex !== -1) {
    db.users[userIndex].gmailTokens = null;
    db.users[userIndex].gmailEmail = null;
  }
  res.json({ success: true, message: 'Logged out' });
};
