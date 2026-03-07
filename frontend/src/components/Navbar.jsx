import { Bell, Search, Menu, LogOut, LogIn } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in via localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = () => {
    navigate('/login');
  };

  const logout = async () => {
    try {
      await fetch('http://localhost:5000/api/auth/logout');
    } catch (err) {
      console.error('Logout request failed:', err);
    }
    // Clear state and localStorage
    localStorage.removeItem('user');
    setUser(null);
    navigate('/'); // Redirect user home
  };

  return (
    <nav className="h-16 bg-white border-b border-gray-200 fixed w-full top-0 z-50 flex items-center justify-between px-4 lg:px-6 shadow-sm">
      <div className="flex items-center gap-4">
        <button className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Bell className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            PriorityHub
          </span>
        </div>
      </div>

      <div className="hidden md:flex flex-1 max-w-xl px-6">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search notifications..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors relative" onClick={() => window.location.reload()}>
          <Bell className="w-5 h-5" />
          {user && <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>}
        </button>
        
        {user ? (
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-gray-900 leading-none">Hello {user.name}</p>
            </div>
            <img src={user.avatar} alt="Avatar" className="w-8 h-8 rounded-full border border-gray-200 shadow-sm" />
            <button onClick={logout} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-1" title="Log out">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button 
            onClick={handleLogin}
            className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
          >
            <LogIn className="w-4 h-4" /> Sign In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
