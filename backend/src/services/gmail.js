import { google } from 'googleapis';
import Notification from '../models/Notification.js';
import { calculatePriorityScore } from './priority.js';
import { generateAISummary } from './ai.js';

// Mock Gmail service for Hackathon purposes
// Replace with actual googleapis usage when OAuth is ready
export const fetchRecentEmails = async (authObj = null) => {
  try {
    // Simulated Gmail API response
    const mockEmails = [
      {
        id: `gmail-${Date.now()}-1`,
        source: 'gmail',
        sender: 'Security Team',
        senderEmail: 'security@company.com',
        subject: 'URGENT: Suspicious login attempt detected',
        snippet: 'A login attempt from an unrecognized device was blocked. Action required.',
      },
      {
        id: `gmail-${Date.now()}-2`,
        source: 'gmail',
        sender: 'GitHub',
        senderEmail: 'notifications@github.com',
        subject: '[PriorityHub] New Pull Request #42: Feature/Auth',
        snippet: 'User @johndoe wants to merge 3 commits into main from feature/auth',
      },
      {
        id: `gmail-${Date.now()}-3`,
        source: 'gmail',
        sender: 'Daily Digest',
        senderEmail: 'digest@newsletter.com',
        subject: 'Top 10 Tech News of the Week',
        snippet: 'Catch up on all the tech news you missed this week! Subscribe for more updates.',
      }
    ];

    const processedNotifications = [];

    // Process each mock email
    for (const email of mockEmails) {
      // Check if it already exists
      const existing = await Notification.findOne({ sourceId: email.id });
      if (existing) continue;

      // Calculate Priority Score
      const priorityScore = await calculatePriorityScore(email);

      // Generate AI Summary
      const summary = await generateAISummary(email.subject, email.snippet);

      // Save to database
      const newNotification = new Notification({
        sourceId: email.id,
        source: email.source,
        sender: email.sender,
        senderEmail: email.senderEmail,
        subject: email.subject,
        snippet: email.snippet,
        summary: summary,
        priorityScore: priorityScore,
        date: new Date(),
      });

      await newNotification.save();
      processedNotifications.push(newNotification);
    }

    return processedNotifications;
  } catch (error) {
    console.error('Error fetching emails:', error);
    throw error;
  }
};
