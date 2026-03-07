import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import PriorityFeed from '../components/PriorityFeed';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [priorityFilter, setPriorityFilter] = useState("all");

  useEffect(() => {
    if (!user) {
      console.log("No user found in localStorage, redirecting to /login");
      navigate("/login");
    }
  }, [user, navigate]);

  // Prevent rendering protected content before redirect
  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      
      <div className="flex pt-16">
        <Sidebar priorityFilter={priorityFilter} setPriorityFilter={setPriorityFilter} />
        
        <main className="flex-1 lg:ml-64 p-4 md:p-8 lg:p-12">
          <div className="max-w-4xl mx-auto mb-10">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2 mt-4 tracking-tight">Good morning, {user.name}</h1>
            <p className="text-gray-500 font-medium">You have <span className="text-red-500 font-bold">2</span> urgent items requiring your attention today.</p>
          </div>
          
          <PriorityFeed priorityFilter={priorityFilter} />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
