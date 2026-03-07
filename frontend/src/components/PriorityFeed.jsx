import { useState, useEffect } from 'react';
import axios from 'axios';
import NotificationCard from './NotificationCard';

const PriorityFeed = ({ priorityFilter = "all" }) => {
  const [notifications, setNotifications] = useState({
    urgent: [],
    important: [],
    low: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleDone = (id) => {
    setNotifications(prev => ({
      ...prev,
      urgent: prev.urgent.filter(n => (n._id || n.id) !== id),
      important: prev.important.filter(n => (n._id || n.id) !== id),
      low: prev.low.filter(n => (n._id || n.id) !== id)
    }));
  };

  // Fetch real data from the backend
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        // Replace with your actual backend URL/port
        const response = await axios.get('http://localhost:5000/api/gmail/emails');
        const data = response.data.data;
        const connected = response.data.connected;

        const userPrioritiesStr = localStorage.getItem("user_priorities");
        const userPriorities = userPrioritiesStr ? JSON.parse(userPrioritiesStr) : [];

        // Apply score boosting based on user priorities matching the AI category
        const enhancedData = data.map(email => {
          let score = email.priorityScore || 0;
          let isBoosted = false;
          
          if (email.category && userPriorities.map(p => p.toLowerCase()).includes(email.category.toLowerCase())) {
            score += 30;
            isBoosted = true;
          }

          return {
            ...email,
            priorityScore: score,
            isBoosted,
            matchedPriority: email.category
          };
        });

        // Categorize data based on Priority Score
        const urgent = enhancedData.filter(item => item.priorityScore >= 90);
        const important = enhancedData.filter(item => item.priorityScore >= 70 && item.priorityScore < 90);
        const low = enhancedData.filter(item => item.priorityScore < 70);

        setNotifications({ urgent, important, low, connected });
        setLoading(false);
      } catch (err) {
        console.error('Error fetching notifications:', err);
        setError('Failed to load notifications from the server.');
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto py-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto py-12">
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-12 pb-12">
      
      {!notifications.connected && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
          <div>
            <h3 className="text-lg font-bold text-blue-900 mb-1">Connect your Gmail</h3>
            <p className="text-blue-700 text-sm">You are currently seeing mock data. Connect your Gmail to process your real inbox.</p>
          </div>
          <button 
            onClick={() => window.location.href = 'http://localhost:5000/api/gmail/connect'}
            className="whitespace-nowrap bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md transition-colors"
          >
            Connect Gmail
          </button>
        </div>
      )}

      {/* Urgent Section */}
      {(priorityFilter === "all" || priorityFilter === "urgent") && notifications.urgent.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600">
              <span className="text-lg">🔥</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Urgent Actions</h2>
            <span className="bg-red-50 text-red-700 px-2.5 py-0.5 rounded-full text-sm font-medium border border-red-100">
              {notifications.urgent.length}
            </span>
          </div>
          <div className="space-y-4">
            {notifications.urgent.map(item => (
              <NotificationCard key={item._id || item.id} data={item} category="urgent" onDone={handleDone} />
            ))}
          </div>
        </section>
      )}

      {/* Important Section */}
      {(priorityFilter === "all" || priorityFilter === "important") && notifications.important.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-600">
              <span className="text-lg">⚡</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Important</h2>
            <span className="bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded-full text-sm font-medium border border-amber-100">
              {notifications.important.length}
            </span>
          </div>
          <div className="space-y-4">
            {notifications.important.map(item => (
              <NotificationCard key={item._id || item.id} data={item} category="important" onDone={handleDone} />
            ))}
          </div>
        </section>
      )}

      {/* Low Priority Section */}
      {(priorityFilter === "all" || priorityFilter === "low") && notifications.low.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600">
              <span className="text-lg">📬</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Low Priority</h2>
            <span className="bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full text-sm font-medium border border-blue-100">
              {notifications.low.length}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notifications.low.map(item => (
              <NotificationCard key={item._id || item.id} data={item} category="low" compact onDone={handleDone} />
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {notifications.urgent.length === 0 && notifications.important.length === 0 && notifications.low.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
          <p className="text-gray-500 font-medium">Inbox zero! No new notifications.</p>
        </div>
      )}
    </div>
  );
};

export default PriorityFeed;
