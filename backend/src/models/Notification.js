import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  sourceId: {
    type: String,
    required: true,
    unique: true, // e.g. Gmail message ID
  },
  source: {
    type: String,
    enum: ['gmail', 'github', 'slack', 'discord', 'calendar'],
    default: 'gmail',
  },
  sender: {
    type: String,
    required: true,
  },
  senderEmail: {
    type: String,
  },
  subject: {
    type: String,
    required: true,
  },
  snippet: {
    type: String,
  },
  summary: {
    type: String, // AI Generated
  },
  priorityScore: {
    type: Number,
    default: 0,
  },
  read: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  }
}, { timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
