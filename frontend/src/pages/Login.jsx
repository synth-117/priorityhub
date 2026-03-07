import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, Loader2, AlertCircle } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('user')) {
      if (!localStorage.getItem('user_priorities')) {
        navigate('/onboarding');
      } else {
        navigate('/dashboard');
      }
    }
  }, [navigate]);

  const handleLogin = async () => {
    console.log("Login button clicked");
    setIsLoading(true);
    setError(null);

    try {
      console.log("Sending POST request to /api/auth/login...");
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: "Sandipan",
          email: "demo@priorityhub.com"
        })
      });

      const data = await res.json();
      console.log("Login response data:", data);

      if (res.ok && data.token) {
        localStorage.setItem("user", JSON.stringify(data.user));
        console.log("User stored in localStorage, navigating to /onboarding");
        navigate("/onboarding");
      } else {
        console.error("Login failed:", data.message || "Unknown API error");
        setError(data.message || "Failed to authenticate with the server.");
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Login failed during network request:", err);
      setError("Network error: Could not reach the backend server at localhost:5000");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <LogIn className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Welcome Back</h1>
        <p className="text-gray-500 mb-6">Sign in to access your intelligent priority feed.</p>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-left">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700 font-medium">{error}</p>
          </div>
        )}

        <button 
          onClick={handleLogin}
          disabled={isLoading}
          className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Signing In...
            </>
          ) : (
            <>Sign In</>
          )}
        </button>
        <p className="mt-6 text-sm text-gray-400">
          Hackathon Demo Mode: This will log you in as the demo user Sandipan.
        </p>
      </div>
    </div>
  );
};

export default Login;
