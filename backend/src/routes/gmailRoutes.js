import express from 'express';
import { google } from 'googleapis';
import dotenv from 'dotenv';
import axios from 'axios';
import { db } from '../index.js';

dotenv.config({ path: '../.env' });

const router = express.Router();

console.log("Loaded Google Client ID:", process.env.GOOGLE_CLIENT_ID);

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// GET /api/gmail/connect
router.get('/connect', (req, res) => {
  const scopes = [
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
  ];

  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: scopes
  });

  res.redirect(url);
});

// GET /api/gmail/callback
router.get('/callback', async (req, res) => {
  const { code } = req.query;

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    console.log("OAuth scopes granted:", tokens.scope);

    // Get user info to map to demo user
    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    const userInfo = await oauth2.userinfo.get();
    
    // In our mock backend, we store the token on the demo user
    let user = db.users.find(u => u.email === "demo@priorityhub.com");
    if (user) {
      user.gmailTokens = tokens;
      user.gmailEmail = userInfo.data.email;
    } else {
       // if they connected gmail before logging in, force create the demo user
      db.users.push({
        id: "demo-user",
        name: "Sandipan",
        email: "demo@priorityhub.com",
        gmailTokens: tokens,
        gmailEmail: userInfo.data.email
      });
    }

    res.redirect('http://localhost:5173/dashboard');
  } catch (error) {
    console.error('Error during Google Callback:', error);
    res.redirect('http://localhost:5173/dashboard?error=gmail_failed');
  }
});

// GET /api/gmail/emails
router.get('/emails', async (req, res) => {
  try {
    const user = db.users.find(u => u.email === "demo@priorityhub.com");
    
    if (!user || !user.gmailTokens) {
      // Fallback to mock data if not connected
      console.log('User not connected to Gmail. Returning mocked fallback data.');
      return res.json({ connected: false, data: db.notifications });
    }

    oauth2Client.setCredentials(user.gmailTokens);
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    // Fetch the latest 20 messages
    const response = await gmail.users.messages.list({
      userId: 'me',
      maxResults: 20
    });

    const messages = response.data.messages || [];
    const formattedEmails = [];

    for (const message of messages) {
      const msgData = await gmail.users.messages.get({
        userId: 'me',
        id: message.id,
        format: 'metadata',
        metadataHeaders: ['From', 'Subject', 'Date']
      });

      const headers = msgData.data.payload.headers;
      const subject = headers.find(h => h.name === 'Subject')?.value || 'No Subject';
      const from = headers.find(h => h.name === 'From')?.value || 'Unknown Sender';
      const date = headers.find(h => h.name === 'Date')?.value || new Date().toISOString();

      const textForAi = subject + " " + (msgData.data.snippet || "");
      let category = "other";
      try {
        const port = process.env.PORT || 5000;
        const aiRes = await axios.post(`http://localhost:${port}/api/ai/classify`, { text: textForAi });
        if (aiRes.data && aiRes.data.category) {
          category = aiRes.data.category;
        }
      } catch (err) {
        console.error(`AI Classification failed for email ${message.id}`);
      }

      // Algorithm: Base Score + Sender Interaction Context
      let interactionScore = 0;
      if (db.senderStats && db.senderStats[from]) {
        const stats = db.senderStats[from];
        interactionScore = (stats.opens * 5) + (stats.done * 2) - (stats.ignored * 3);
      }
      
      let baseScore = Math.floor(Math.random() * 100);
      let newScore = baseScore + interactionScore;
      if (newScore > 100) newScore = 100;
      if (newScore < 0) newScore = 0;

      formattedEmails.push({
        id: message.id,
        sourceId: message.id,
        source: 'gmail',
        sender: from,
        subject: subject,
        snippet: msgData.data.snippet,
        priorityScore: newScore,
        interactionScore: interactionScore,
        date: new Date(date),
        category: category
      });
    }

    const mockOtherSources = [
      {
        id: "mock-wa-1",
        sourceId: "mock-wa-1",
        source: "whatsapp",
        sender: "Client",
        subject: "Need proposal by today",
        snippet: "Please send over the updated proposal by EOD.",
        priorityScore: 94,
        date: new Date(),
        category: "work"
      },
      {
        id: "mock-ig-1",
        sourceId: "mock-ig-1",
        source: "instagram",
        sender: "Startup Founder",
        subject: "Let's collaborate",
        snippet: "Love your product, let us jump on a quick call.",
        priorityScore: 82,
        date: new Date(),
        category: "social"
      },
      {
        id: "mock-sl-1",
        sourceId: "mock-sl-1",
        source: "slack",
        sender: "Engineering Team",
        subject: "Deploy successful",
        snippet: "Production deployment completed without errors.",
        priorityScore: 45,
        date: new Date(),
        category: "work"
      }
    ];

    const allNotifications = [...formattedEmails, ...mockOtherSources];
    // Sort by priorityScore descending
    allNotifications.sort((a, b) => b.priorityScore - a.priorityScore);
    
    res.json({
      connected: true,
      data: allNotifications
    });

  } catch (error) {
    console.error('Error fetching Gmail emails:', error);
    // On failure or token expiration, fallback to mock DB
    res.json({ connected: false, data: db.notifications });
  }
});

export default router;
