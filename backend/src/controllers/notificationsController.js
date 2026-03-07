import { db } from '../index.js';
import { fetchRecentEmails } from '../services/gmail.js';

// GET /api/notifications
// Retrieves notifications sorted by priority score (descending)
export const getNotifications = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    
    // Sort the in-memory array by priorityScore (descending)
    const sortedNotifications = [...db.notifications]
      .sort((a, b) => b.priorityScore - a.priorityScore)
      .slice(0, limit);

    res.json({
      success: true,
      count: sortedNotifications.length,
      data: sortedNotifications,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error retrieving notifications' });
  }
};

// GET /api/emails/sync
// Triggers Gmail fetch manually 
export const syncEmails = async (req, res) => {
  try {
    // In production, you would pass the user's OAuth tokens here.
    const newNotifications = await fetchRecentEmails(null);
    
    res.json({
      success: true,
      message: 'Emails synced successfully',
      newCount: newNotifications.length,
      data: newNotifications,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error syncing emails', error: error.message });
  }
};
