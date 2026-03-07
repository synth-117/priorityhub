import express from 'express';
import { getNotifications, syncEmails } from '../controllers/notificationsController.js';

const router = express.Router();

// Route: /api/notifications
router.get('/', getNotifications);

// Route: /api/emails/sync
router.get('/sync', syncEmails); 

export default router;
