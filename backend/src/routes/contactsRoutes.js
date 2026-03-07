import express from 'express';
import { addImportantContact, getImportantContacts } from '../controllers/contactsController.js';

const router = express.Router();

// Route: /api/contacts/important
router.post('/important', addImportantContact);
router.get('/important', getImportantContacts);

export default router;
