import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Briefcase, GraduationCap, DollarSign, Plane, Users, ArrowRight } from "lucide-react";

const options = [
  { id: "work", label: "Work", icon: Briefcase, color: "text-blue-500", bg: "bg-blue-50", border: "border-blue-200" },
  { id: "school", label: "School", icon: GraduationCap, color: "text-purple-500", bg: "bg-purple-50", border: "border-purple-200" },
  { id: "finance", label: "Finance", icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-50", border: "border-emerald-200" },
  { id: "travel", label: "Travel", icon: Plane, color: "text-amber-500", bg: "bg-amber-50", border: "border-amber-200" },
  { id: "social", label: "Social", icon: Users, color: "text-pink-500", bg: "bg-pink-50", border: "border-pink-200" },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [selectedPriorities, setSelectedPriorities] = useState([]);

  const togglePriority = (id) => {
    if (selectedPriorities.includes(id)) {
      setSelectedPriorities(selectedPriorities.filter(p => p !== id));
    } else {
      setSelectedPriorities([...selectedPriorities, id]);
    }
  };

  const handleContinue = () => {
    localStorage.setItem("user_priorities", JSON.stringify(selectedPriorities));
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white text-center">
          <h1 className="text-3xl font-extrabold mb-2">Personalize Your Feed</h1>
          <p className="text-blue-100 text-lg opacity-90">What notifications matter most to you?</p>
        </div>

        <div className="p-8">
          <p className="text-gray-500 text-sm font-medium mb-6 text-center uppercase tracking-wider">
            Select one or more priorities
          </p>

          <div className="space-y-3 mb-8">
            {options.map((option) => {
              const TechIcon = option.icon;
              const isSelected = selectedPriorities.includes(option.id);
              
              return (
                <button
                  key={option.id}
                  onClick={() => togglePriority(option.id)}
                  className={`w-full flex items-center p-4 rounded-2xl border-2 transition-all duration-200 ${
                    isSelected 
                      ? `${option.bg} ${option.border} shadow-sm transform scale-[1.02]` 
                      : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className={`p-3 rounded-xl ${isSelected ? 'bg-white shadow-sm' : 'bg-gray-100'}`}>
                    <TechIcon className={`w-6 h-6 ${isSelected ? option.color : 'text-gray-500'}`} />
                  </div>
                  
                  <span className={`ml-4 text-lg font-bold flex-1 text-left ${isSelected ? 'text-gray-900' : 'text-gray-600'}`}>
                    {option.label}
                  </span>
                  
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                    isSelected ? 'bg-blue-600 text-white' : 'border-2 border-gray-300'
                  }`}>
                    {isSelected && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                </button>
              );
            })}
          </div>

          <button
            onClick={handleContinue}
            className="w-full bg-gray-900 text-white font-bold py-4 px-6 rounded-2xl hover:bg-gray-800 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-gray-200"
          >
            Continue to Dashboard
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
