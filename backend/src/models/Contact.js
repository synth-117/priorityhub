import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  name: {
    type: String,
    trim: true,
  },
  isImportant: {
    type: Boolean,
    default: true,
  },
  priorityBoost: {
    type: Number,
    default: 20, // Add 20 points to emails from this person
  }
}, { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;
