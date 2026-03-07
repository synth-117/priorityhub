import Contact from '../models/Contact.js';

/**
 * Calculates a priority score for a given notification.
 * 
 * Rules:
 * +10 if sender is in important contacts
 * +7 if message contains keywords: hackathon, deadline, urgent, meeting
 * +5 if related to today's calendar event
 * -5 if promotional or newsletter
 * 
 * @param {Object} emailData - Extracted email data
 * @returns {Number} score
 */
export const calculatePriorityScore = async (emailData) => {
  let score = 0; // Base score

  if (!emailData) return score;

  // Rule 1: +10 if sender is in important contacts
  const contact = await Contact.findOne({ email: emailData.senderEmail?.toLowerCase() });
  if (contact && contact.isImportant) {
    score += 10;
  }

  // Define lowercased text blocks for searching
  const subjectLower = (emailData.subject || '').toLowerCase();
  const snippetLower = (emailData.snippet || '').toLowerCase();
  const fullText = `${subjectLower} ${snippetLower}`;

  // Rule 2: +7 if message contains keywords: hackathon, deadline, urgent, meeting
  const importantKeywords = ['hackathon', 'deadline', 'urgent', 'meeting'];
  const hasImportantKeyword = importantKeywords.some(keyword => fullText.includes(keyword));
  if (hasImportantKeyword) {
    score += 7;
  }

  // Rule 3: +5 if related to today's calendar event
  // Note: in a real app, this would query a calendar API. 
  // For this hackathon scope, we mock it by looking for "today" + "calendar"/"event"
  const isTodayEvent = fullText.includes('today') && 
                      (fullText.includes('calendar') || fullText.includes('event') || fullText.includes('invite'));
  if (isTodayEvent) {
    score += 5;
  }

  // Rule 4: -5 if promotional or newsletter
  const promoKeywords = ['newsletter', 'unsubscribe', 'offer', 'discount', 'sale', 'promotion'];
  const isPromotional = promoKeywords.some(keyword => fullText.includes(keyword));
  if (isPromotional) {
    score -= 5;
  }

  return score;
};
