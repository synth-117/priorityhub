import { LayoutDashboard, Mail, Star, Settings, ShieldAlert, Zap, Inbox } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = ({ priorityFilter = 'all', setPriorityFilter }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', id: 'dash' },
    { icon: Mail, label: 'All Emails', path: '/emails', count: '128', id: 'emails' },
    { icon: Star, label: 'Important Contacts', path: '/contacts', id: 'contacts' },
    { icon: Settings, label: 'Settings', path: '/settings', id: 'settings' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 fixed left-0 top-16 h-[calc(100vh-64px)] hidden lg:flex flex-col">
      <div className="p-4 flex-1">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-3">Menu</h3>
        <nav className="space-y-1">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <button
                key={link.id}
                onClick={() => navigate(link.path)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <link.icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                  {link.label}
                </div>
                {link.count && (
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                    isActive ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {link.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-8 mb-4 px-3">Priority Queues</h3>
        <nav className="space-y-1">
          <button 
            onClick={() => {
              navigate("/dashboard");
              if (setPriorityFilter) setPriorityFilter("urgent");
            }} 
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${priorityFilter === 'urgent' ? 'bg-red-50 text-red-700 activeQueue' : 'text-gray-600 hover:bg-red-50 hover:text-red-700'}`}
          >
            <ShieldAlert className="w-5 h-5 text-red-500" /> Urgent
            <span className="ml-auto bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs">Queue</span>
          </button>
          
          <button 
            onClick={() => {
              navigate("/dashboard");
              if (setPriorityFilter) setPriorityFilter("important");
            }} 
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${priorityFilter === 'important' ? 'bg-amber-50 text-amber-700 activeQueue' : 'text-gray-600 hover:bg-amber-50 hover:text-amber-700'}`}
          >
            <Zap className="w-5 h-5 text-amber-500" /> Important
            <span className="ml-auto bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-xs">Queue</span>
          </button>
          
          <button 
            onClick={() => {
              navigate("/dashboard");
              if (setPriorityFilter) setPriorityFilter("low");
            }} 
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${priorityFilter === 'low' ? 'bg-blue-50 text-blue-700 activeQueue' : 'text-gray-600 hover:bg-blue-50 hover:text-blue-700'}`}
          >
            <Inbox className="w-5 h-5 text-blue-500" /> Low Priority
          </button>
          
          {priorityFilter !== 'all' && (
            <button 
              onClick={() => {
                navigate("/dashboard");
                if (setPriorityFilter) setPriorityFilter("all");
              }} 
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-gray-500 hover:text-gray-800 justify-center mt-2"
            >
              Clear Filter
            </button>
          )}
        </nav>
      </div>
      
      <div className="p-4 border-t border-gray-100">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
          <p className="text-sm font-medium text-blue-900 mb-1">AI Summarization</p>
          <p className="text-xs text-blue-700 opacity-80 mb-3">5k tokens remaining today</p>
          <div className="w-full bg-blue-200 rounded-full h-1.5">
            <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '45%' }}></div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
