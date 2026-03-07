import { useState, useEffect } from 'react';
import { Mail, Github, MessageSquare, Bot, ArrowRight, CheckCircle2, Calendar, Gamepad2, MessageCircle, Instagram, Slack, Bell, XCircle } from 'lucide-react';


const getSourceIcon = (source) => {
  switch (source) {
    case "gmail":
      return <Mail className="w-6 h-6 text-red-500" />;
    case "whatsapp":
      return <MessageCircle className="w-6 h-6 text-green-500" />;
    case "instagram":
      return <Instagram className="w-6 h-6 text-pink-500" />;
    case "slack":
      return <Slack className="w-6 h-6 text-purple-600" />;
    case "calendar":
      return <Calendar className="w-6 h-6 text-blue-500" />;
    case "github":
      return <Github className="w-6 h-6 text-gray-800" />;
    case "discord":
      return <Gamepad2 className="w-6 h-6 text-indigo-500" />;
    default:
      return <Bell className="w-6 h-6 text-gray-500" />;
  }
};

const getSourceBg = (source) => {
  switch (source) {
    case "gmail": return "bg-red-50";
    case "whatsapp": return "bg-green-50";
    case "instagram": return "bg-pink-50";
    case "slack": return "bg-purple-50";
    case "calendar": return "bg-blue-50";
    case "github": return "bg-gray-100";
    case "discord": return "bg-indigo-50";
    default: return "bg-gray-50";
  }
};

const getScoreColor = (score) => {
  if (score >= 90) return 'text-red-600 bg-red-50 border-red-200';
  if (score >= 70) return 'text-amber-600 bg-amber-50 border-amber-200';
  return 'text-blue-600 bg-blue-50 border-blue-200';
};

const categoryEmojis = {
  work: '💼 Work',
  school: '🎓 School',
  finance: '💰 Finance',
  travel: '✈ Travel',
  social: '💬 Social',
  other: '📌 Other'
};

const NotificationCard = ({ data, category, compact = false, onDone }) => {
  const [summary, setSummary] = useState(data.summary || "");
  const [loadingSummary, setLoadingSummary] = useState(false);

  const bgStyle = getSourceBg(data.source);

  useEffect(() => {
    // If we already have a backend-provided mock summary, don't generate another.
    // If it's missing, fetch from our new OpenAI route.
    if (!summary) {
      generateSummary();
    }
  }, [data.id]);

  const generateSummary = async () => {
    // Skip low priority notifications
    if (data.priorityScore < 80) {
      setSummary("Low priority notification.");
      return;
    }

    if(summary) return;

    setLoadingSummary(true);

    try {
      const text = data.subject + " " + (data.snippet || "");
      const res = await fetch("http://localhost:5000/api/ai/summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text })
      });
      const resData = await res.json();
      
      if(resData.summary){
        setSummary(resData.summary);
      }

    } catch(error){
      console.error("Summary fetch failed", error);
    }
    setLoadingSummary(false);
  };

  const sendFeedback = async (action) => {
    const senderStr = data.senderEmail || data.sender;
    if (!senderStr) return;
    try {
      await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sender: senderStr, action })
      });
    } catch (err) {
      console.error("Feedback error", err);
    }
  };

  const handleOpen = (e) => {
    e.stopPropagation();
    sendFeedback('open');
    let url = '#';
    if (data.source === 'gmail') url = `https://mail.google.com/mail/u/0/#inbox/${data.id}`;
    else if (data.source === 'whatsapp') url = `https://web.whatsapp.com/`;
    else if (data.source === 'instagram') url = `https://instagram.com/`;
    else if (data.source === 'slack') url = `https://app.slack.com/`;
    window.open(url, "_blank");
  };

  const handleDone = (e) => {
    e.stopPropagation();
    sendFeedback('done');
    if (onDone) onDone(data.id || data._id);
  };

  const handleIgnore = (e) => {
    e.stopPropagation();
    sendFeedback('ignore');
    if (onDone) onDone(data.id || data._id);
  };

  if (compact) {
    return (
      <div className="glass-panel rounded-2xl p-4 transition-all hover:shadow-2xl hover:scale-[1.01] group cursor-pointer h-full flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-md ${bgStyle}`}>
                {getSourceIcon(data.source)}
              </div>
              <span className="text-sm font-semibold text-gray-700">{data.sender}</span>
            </div>
            <span className="text-xs text-gray-400">{data.time}</span>
          </div>
          <h3 className="font-medium text-gray-900 text-sm mb-1 line-clamp-1">{data.subject}</h3>
          <div className="mt-1">
             <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-800">
               {categoryEmojis[data.category?.toLowerCase()] || categoryEmojis.other}
             </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-2xl p-5 md:p-6 transition-all hover:shadow-2xl hover:scale-[1.01] group cursor-pointer relative overflow-hidden">
      {category === 'urgent' && (
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-red-500 to-orange-500"></div>
      )}
      
      <div className="flex items-start gap-4">
        {/* Source Icon */}
        <div className={`p-3 rounded-xl shrink-0 ${bgStyle} notification-icon`}>
          {getSourceIcon(data.source)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900 leading-none">{data.sender}</span>
              <span className="text-sm text-gray-400 leading-none px-2 border-l border-gray-200">
                {data.time}
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className={`px-2.5 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${getScoreColor(data.priorityScore)}`}>
                Score: {data.priorityScore}
              </div>
            </div>
          </div>

          {data.isBoosted && (
            <p className="text-xs text-blue-600 font-medium mb-1.5">
              Boosted because it matches your <span className="capitalize">{data.matchedPriority || data.category}</span> priority.
            </p>
          )}

          {data.interactionScore > 0 && (
            <p className="text-xs text-green-600 font-medium mb-1.5">
              Boosted because you often open emails from this sender.
            </p>
          )}

          <h3 className={`font-bold text-gray-900 mb-1 ${category === 'urgent' ? 'text-lg' : 'text-base'}`}>
            {data.subject}
          </h3>

          <div className="mb-3">
             <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 border border-gray-200">
               {categoryEmojis[data.category?.toLowerCase()] || categoryEmojis.other}
             </span>
          </div>

          <div className="bg-gradient-to-r from-blue-50/50 to-indigo-50/30 rounded-xl p-4 border border-blue-50/50 relative">
            <Bot className="absolute top-4 right-4 w-5 h-5 text-blue-300 opacity-50" />
            <div className="ai-summary text-sm leading-relaxed pr-8 text-gray-600">
              <span className="text-blue-700 font-semibold mr-2 border-b border-blue-200">
                AI Summary:
              </span>
              {data.priorityScore < 80 
                ? " Low priority notification." 
                : loadingSummary
                  ? " Generating summary..."
                  : " " + summary}
            </div>
          </div>
          
          <div className="flex items-center gap-3 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={handleOpen}
              className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
            >
              Open <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={handleDone}
              className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition-colors"
            >
              <CheckCircle2 className="w-4 h-4" /> Mark Done
            </button>
            <button 
              onClick={handleIgnore}
              className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-700 bg-gray-50 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors"
            >
              <XCircle className="w-4 h-4" /> Ignore
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
