import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Notification from './src/models/Notification.js';

dotenv.config({ path: '../.env' });

const mockNotifications = [
  // URGENT ITEMS (Scores 90-100)
  {
    sourceId: 'gmail-1',
    source: 'gmail',
    sender: 'DevOps Alerts',
    senderEmail: 'devops@priorityhub.com',
    subject: 'URGENT: Production Database CPU at 99%',
    snippet: 'Immediate intervention required. Database node 2 is experiencing severe CPU lock wait timeouts.',
    summary: 'The production database requires immediate intervention to mitigate 99% CPU usage lockups.',
    priorityScore: 98,
    date: new Date(Date.now() - 5 * 60000) // 5 mins ago
  },
  {
    sourceId: 'github-1',
    source: 'github',
    sender: 'GitHub Security',
    senderEmail: 'security@github.com',
    subject: 'Critical Vulnerability detected in jsonwebtoken',
    snippet: 'CVE-2024-xxxx patch required immediately for your backend repository.',
    summary: 'A critical vulnerability patch is required immediately for the jsonwebtoken dependency in the backend repository.',
    priorityScore: 95,
    date: new Date(Date.now() - 15 * 60000) // 15 mins ago
  },
  {
    sourceId: 'discord-1',
    source: 'discord',
    sender: 'Sarah Jenkins (CEO)',
    senderEmail: 'sarah@priorityhub.com',
    subject: 'Emergency Board Meeting',
    snippet: 'Everyone drop what you are doing, we need to hop on a call right now regarding the acquisition.',
    summary: 'The CEO has urgently called an emergency board meeting regarding the acquisition.',
    priorityScore: 92,
    date: new Date(Date.now() - 30 * 60000) // 30 mins ago
  },

  // IMPORTANT ITEMS (Scores 70-89)
  {
    sourceId: 'gmail-2',
    source: 'gmail',
    sender: 'Stripe Security',
    senderEmail: 'support@stripe.com',
    subject: 'Action Required: Update your integration',
    snippet: 'Your current Stripe integration uses deprecated APIs that will be retired next month.',
    summary: 'You must update your Stripe integration before deprecated APIs are retired next month.',
    priorityScore: 85,
    date: new Date(Date.now() - 2 * 3600000) // 2 hours ago
  },
  {
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
    sourceId: 'github-2',
    source: 'github',
    sender: 'Alex Chen',
    senderEmail: 'alex@priorityhub.com',
    subject: 'Review Requested: Implement OAuth Flow',
    snippet: 'I have finished the Google OAuth integration. Please review my PR before we deploy to staging.',
    summary: 'Alex Chen is requesting a code review for the Google OAuth integration PR before staging deployment.',
    priorityScore: 78,
    date: new Date(Date.now() - 3 * 3600000)
  },
  {
    sourceId: 'discord-2',
    source: 'discord',
    sender: 'Frontend Team Channel',
    senderEmail: 'frontend@discord.com',
    subject: 'Blocking issue on Dashboard',
    snippet: 'Hey guys, the dashboard is rendering a blank screen when the notifications array is empty.',
    summary: 'The frontend team is reporting a blocking issue where the dashboard renders a blank screen on empty notifications.',
    priorityScore: 75,
    date: new Date(Date.now() - 4 * 3600000)
  },
  {
    sourceId: 'gmail-3',
    source: 'gmail',
    sender: 'Vite Team',
    senderEmail: 'releases@vitejs.dev',
    subject: 'Vite 8.0 Release!',
    snippet: 'Vite 8 is out now with faster cold starts and improved React Fast Refresh.',
    summary: 'Vite 8.0 has been released featuring faster cold starts and improved React Fast Refresh.',
    priorityScore: 65,
    date: new Date(Date.now() - 8 * 3600000)
  },

  // REGULAR ITEMS (Scores 40-69)
  {
    sourceId: 'calendar-2',
    source: 'calendar',
    sender: 'Google Calendar',
    senderEmail: 'calendar@google.com',
    subject: 'Standup Meeting',
    snippet: 'Daily standup meeting starting in 5 minutes via Google Meet.',
    summary: 'The daily standup meeting begins in 5 minutes on Google Meet.',
    priorityScore: 60,
    date: new Date(Date.now() - 24 * 3600000)
  },
  {
    sourceId: 'gmail-4',
    source: 'gmail',
    sender: 'AWS Billing',
    senderEmail: 'billing@aws.amazon.com',
    subject: 'Your AWS Invoice for February',
    snippet: 'Your invoice for the previous month is ready. Total amount: $142.50.',
    summary: 'Your AWS invoice for February totaling $142.50 is ready for review.',
    priorityScore: 55,
    date: new Date(Date.now() - 26 * 3600000)
  },
  {
    sourceId: 'github-3',
    source: 'github',
    sender: 'Dependabot',
    senderEmail: 'dependabot@github.com',
    subject: 'Bump react from 18.2.0 to 18.3.0',
    snippet: 'Bumps react and react-dom to 18.3.0. Please review the changelog.',
    summary: 'Dependabot suggests bumping React to version 18.3.0.',
    priorityScore: 50,
    date: new Date(Date.now() - 48 * 3600000)
  },
  {
    sourceId: 'discord-3',
    source: 'discord',
    sender: 'General Channel',
    senderEmail: 'general@discord.com',
    subject: 'Lunch plans?',
    snippet: 'Is anyone going to the food trucks today around 1 PM?',
    summary: 'A team member is asking about lunch plans at the food trucks today.',
    priorityScore: 45,
    date: new Date(Date.now() - 49 * 3600000)
  },

  // LOW PRIORITY (Scores 0-39)
  {
    sourceId: 'gmail-5',
    source: 'gmail',
    sender: 'Medium Daily Digest',
    senderEmail: 'noreply@medium.com',
    subject: 'How to build scalable Node apps',
    snippet: 'Read this and 5 other stories picked just for you in today’s digest.',
    summary: 'Medium shared a daily digest including an article on building scalable Node apps.',
    priorityScore: 30,
    date: new Date(Date.now() - 60 * 3600000)
  },
  {
    sourceId: 'gmail-6',
    source: 'gmail',
    sender: 'Uber Eats',
    senderEmail: 'promotions@ubereats.com',
    subject: 'Craving pizza? Enjoy $15 off!',
    snippet: 'Use code PIZZA15 to get a discount on your next order tonight.',
    summary: 'Uber Eats is offering a $15 discount code for pizza orders tonight.',
    priorityScore: 15,
    date: new Date(Date.now() - 72 * 3600000)
  },
  {
    sourceId: 'discord-4',
    source: 'discord',
    sender: 'Watercooler Channel',
    senderEmail: 'watercooler@discord.com',
    subject: 'Check out this meme',
    snippet: 'Literal representation of me trying to fix a CSS flexbox issue.',
    summary: 'A colleague shared a meme about fixing CSS flexbox issues.',
    priorityScore: 10,
    date: new Date(Date.now() - 73 * 3600000)
  },
  {
    sourceId: 'github-4',
    source: 'github',
    sender: 'Github Actions',
    senderEmail: 'actions@github.com',
    subject: 'Run failed: UI Tests',
    snippet: 'The UI tests for branch "feature/dark-mode" failed on the main pipeline.',
    summary: 'The UI tests for the "feature/dark-mode" branch failed in GitHub Actions.',
    priorityScore: 35, // Low because it was an old branch
    date: new Date(Date.now() - 96 * 3600000)
  },
  {
    sourceId: 'gmail-7',
    source: 'gmail',
    sender: 'LinkedIn',
    senderEmail: 'notifications@linkedin.com',
    subject: 'You appeared in 14 searches this week',
    snippet: 'See who is looking at your profile. Upgrade to Premium for more details.',
    summary: 'LinkedIn notified you about appearing in 14 searches this week.',
    priorityScore: 20,
    date: new Date(Date.now() - 100 * 3600000)
  },
  {
    sourceId: 'calendar-3',
    source: 'calendar',
    sender: 'Google Calendar',
    senderEmail: 'calendar@google.com',
    subject: 'Company All Hands (Optional)',
    snippet: 'Monthly company town hall. Attendance is optional since it will be recorded.',
    summary: 'The optional monthly company All Hands meeting is scheduled and will be recorded.',
    priorityScore: 35,
    date: new Date(Date.now() - 120 * 3600000)
  },
  {
    sourceId: 'gmail-8',
    source: 'gmail',
    sender: 'Codecademy',
    senderEmail: 'hello@codecademy.com',
    subject: 'Master Python in 30 days',
    snippet: 'Enroll in our new Python bootcamp starting next week.',
    summary: 'Codecademy is promoting a new 30-day Python bootcamp.',
    priorityScore: 5,
    date: new Date(Date.now() - 150 * 3600000)
  },
  {
    sourceId: 'discord-5',
    source: 'discord',
    sender: 'Game Night Channel',
    senderEmail: 'gaming@discord.com',
    subject: 'Mario Kart Tournament',
    snippet: 'Don\'t forget we are doing a Mario Kart tournament this Friday after work!',
    summary: 'A reminder about the post-work Mario Kart tournament this Friday.',
    priorityScore: 8,
    date: new Date(Date.now() - 160 * 3600000)
  }
];

const seedDB = async () => {
  try {
    // Requires MONGO_URI in .env
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for Seeding');

    // Clear existing notifications
    await Notification.deleteMany({});
    console.log('Cleared existing notifications');

    // Insert mock data
    await Notification.insertMany(mockNotifications);
    console.log(`Successfully seeded ${mockNotifications.length} notifications`);

    process.exit();
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedDB();
