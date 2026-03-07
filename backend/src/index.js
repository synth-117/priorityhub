import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Route imports
import notificationsRoutes from './routes/notificationsRoutes.js';
import contactsRoutes from './routes/contactsRoutes.js';
import authRoutes from './routes/authRoutes.js';
import gmailRoutes from './routes/gmailRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

// Load env variables
dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Simplified CORS as requested for hackathon
app.use(express.json());

// In-Memory Data Stores for Hackathon Demo
export const db = {
  users: [],
  notifications: [
    {
      id: 'mock-1',
      sourceId: 'gmail-1',
      source: 'gmail',
      sender: 'Sarah Jenkins (CEO)',
      senderEmail: 'sarah@priorityhub.com',
      subject: 'Emergency Board Meeting',
      snippet: 'Everyone drop what you are doing, we need to hop on a call right now regarding the acquisition.',
      summary: 'The CEO has urgently called an emergency board meeting regarding the acquisition.',
      priorityScore: 92,
      date: new Date(Date.now() - 30 * 60000)
    },
    {
      id: 'mock-2',
      sourceId: 'github-1',
      source: 'github',
      sender: 'GitHub Security',
      senderEmail: 'security@github.com',
      subject: 'Critical Vulnerability detected in jsonwebtoken',
      snippet: 'CVE-2024-xxxx patch required immediately for your backend repository.',
      summary: 'A critical vulnerability patch is required immediately for the jsonwebtoken dependency in the backend repository.',
      priorityScore: 95,
      date: new Date(Date.now() - 15 * 60000)
    },
    {
      id: 'mock-3',
      sourceId: 'calendar-1',
      source: 'calendar',
      sender: 'Google Calendar',
      senderEmail: 'calendar@google.com',
      subject: 'Upcoming: Client Demo @ 2:00 PM',
      snippet: 'You have a meeting with Acme Corp in 30 minutes. Please ensure the staging environment is ready.',
      summary: 'Prepare the staging environment for the upcoming Acme Corp client demo in 30 minutes.',
      priorityScore: 82,
      date: new Date(Date.now() - 1 * 3600000)
    },
    {
      id: 'mock-4',
      sourceId: 'slack-1',
      source: 'slack',
      sender: 'General Channel',
      senderEmail: 'general@discord.com',
      subject: 'Lunch plans?',
      snippet: 'Is anyone going to the food trucks today around 1 PM?',
      summary: 'A team member is asking about lunch plans at the food trucks today.',
      priorityScore: 45,
      date: new Date(Date.now() - 49 * 3600000)
    }
  ],
  contacts: []
};

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/contacts', contactsRoutes);
app.use('/api/gmail', gmailRoutes);
app.use('/api/ai', aiRoutes);

// Base route for health check
app.get('/', (req, res) => {
  res.json({ status: "PriorityHub backend running" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log('Running with IN-MEMORY database for Hackathon mode.');
});
