import { db } from '../index.js';

// POST /api/contacts/important
export const addImportantContact = async (req, res) => {
  const { email, name, priorityBoost } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  try {
    let contact = db.contacts.find((c) => c.email === email.toLowerCase());

    if (contact) {
      // Update existing contact
      contact.isImportant = true;
      if (name) contact.name = name;
      if (priorityBoost !== undefined) contact.priorityBoost = priorityBoost;
    } else {
      // Create new important contact
      contact = {
        id: String(Date.now()),
        email: email.toLowerCase(),
        name: name || '',
        isImportant: true,
        priorityBoost: priorityBoost || 20,
      };
      db.contacts.push(contact);
    }

    res.status(201).json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error saving contact', error: error.message });
  }
};

// GET /api/contacts/important
export const getImportantContacts = async (req, res) => {
  try {
    const contacts = db.contacts.filter((c) => c.isImportant).sort((a, b) => {
       if (a.name < b.name) return -1;
       if (a.name > b.name) return 1;
       return 0;
    });
    res.json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving contacts' });
  }
};
