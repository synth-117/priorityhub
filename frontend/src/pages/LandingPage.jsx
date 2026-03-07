import { ArrowRight, BellRing, BrainCircuit, ShieldAlert, Sparkles, Zap, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-blue-200">
      
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center bg-blue-600 rounded-lg shadow-lg shadow-blue-500/30">
              <BellRing className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 tracking-tight">
              PriorityHub
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#problem" className="hover:text-blue-600 transition-colors">The Problem</a>
            <a href="#how-it-works" className="hover:text-blue-600 transition-colors">How it Works</a>
            <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="hidden md:flex text-sm font-semibold text-gray-600 hover:text-gray-900">
              Log in
            </Link>
            <Link to="/dashboard" className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg shadow-blue-500/30 transition-all hover:scale-105 active:scale-95">
              Launch Demo
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-tr from-blue-100 to-indigo-50 rounded-full blur-[100px] -z-10 opacity-70"></div>
        <div className="absolute top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-bl from-purple-100 to-transparent rounded-full blur-[80px] -z-10 opacity-50"></div>

        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-semibold mb-8">
            <Sparkles className="w-4 h-4" /> Hackathon Project 2026
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
            Clear the noise.<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Focus on what matters.
            </span>
          </h1>
          <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Stop drowning in notifications. PriorityHub uses AI to aggregate, analyze, and rank your emails and messages so you only see what's truly urgent.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/dashboard" className="w-full sm:w-auto px-8 py-4 text-base font-bold text-white bg-gray-900 hover:bg-gray-800 rounded-full shadow-xl shadow-gray-900/20 transition-all flex items-center justify-center gap-2 group">
              Try the Dashboard 
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          {/* Hero UI Mockup */}
          <div className="mt-20 max-w-5xl mx-auto">
             <div className="relative rounded-2xl border border-gray-200/60 bg-white/50 backdrop-blur-xl shadow-2xl overflow-hidden p-2">
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 opacity-50"></div>
                <img 
                  src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2000&auto=format&fit=crop" 
                  alt="Abstract blurred background representing focus"
                  className="w-full h-80 object-cover rounded-xl opacity-20 hidden md:block" 
                />
                
                {/* Floating Mock UI Elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl px-4">
                  <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                        <span className="text-xl">🔥</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">URGENT: Production Outage</h4>
                        <p className="text-sm text-gray-500">DevOps Alerts • 5m ago</p>
                      </div>
                      <div className="ml-auto bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-bold border border-red-100">
                        Score: 98
                      </div>
                    </div>
                    <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100/50 flex gap-2 items-start mt-4">
                      <BrainCircuit className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-600"><span className="font-semibold text-blue-700">AI Summary:</span> Immediate intervention required to mitigate 99% CPU lockups on database node 2.</p>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section id="problem" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold tracking-widest text-indigo-600 uppercase mb-3">The Problem</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">Information Overload is killing your productivity.</h3>
            <p className="text-lg text-gray-600">The average professional receives over 120 emails and dozens of Slack/Discord pings a day. You spend hours context switching instead of doing deep work.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-6">
                <ShieldAlert className="w-6 h-6 text-red-500" />
              </div>
              <h4 className="text-xl font-bold mb-3">Missed Priorities</h4>
              <p className="text-gray-500">Critical alerts get buried under newsletters and low-priority meeting invites.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-amber-500" />
              </div>
              <h4 className="text-xl font-bold mb-3">Context Switching</h4>
              <p className="text-gray-500">Checking 4 different apps every 20 minutes destroys your deep-work focus state.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                <BrainCircuit className="w-6 h-6 text-blue-500" />
              </div>
              <h4 className="text-xl font-bold mb-3">Mental Fatigue</h4>
              <p className="text-gray-500">Reading long email threads just to find out you didn't need to be CC'd.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-3">How it works</h2>
              <h3 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-8 leading-tight">Smart algorithms that understand your workflow.</h3>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold shrink-0">1</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Connect your tools</h4>
                    <p className="text-gray-500">Link Gmail, GitHub, Calendar, and Discord via strict minimal-permission OAuth.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold shrink-0">2</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Scoring Algorithm Applies</h4>
                    <p className="text-gray-500">Our engine grades every incoming message based on sender importance, urgent keywords, and your calendar state.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold shrink-0">3</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">AI Summarizes the Long Reads</h4>
                    <p className="text-gray-500">OpenAI processes long chains and outputs a single punchy sentence so you can act immediately.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-transparent rounded-3xl transform rotate-3 scale-105 opacity-50"></div>
              <div className="bg-gray-900 rounded-3xl p-8 shadow-2xl relative">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="space-y-4 font-mono text-sm">
                  <div className="text-green-400">Incoming webhook: Slack_Alert</div>
                  <div className="text-blue-300">Evaluating sender PriorityBoost()...</div>
                  <div className="text-blue-300">Searching urgentKeywords array...</div>
                  <div className="text-purple-400">Match found: "server outage" (+25 pts)</div>
                  <div className="text-amber-300 animate-pulse">Running OpenAI prompt generation...</div>
                  <div className="text-green-400">Final Score: 98. Emitting to URGENT queue.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-gray-900 text-white rounded-[3rem] mx-4 lg:mx-8 mb-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-sm font-bold tracking-widest text-blue-400 uppercase mb-3">Features</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold mb-16">Everything you need to regain focus.</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-left">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                <BellRing className="w-6 h-6 text-blue-400" />
              </div>
              <h4 className="text-xl font-bold mb-3">Unified Feed</h4>
              <p className="text-gray-400 leading-relaxed">View emails, PRs, and pings in one single chronological view.</p>
            </div>
            <div className="text-left">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                <BrainCircuit className="w-6 h-6 text-indigo-400" />
              </div>
              <h4 className="text-xl font-bold mb-3">AI Summaries</h4>
              <p className="text-gray-400 leading-relaxed">Save hours of reading with GPT-4 powered 1-sentence overviews.</p>
            </div>
            <div className="text-left">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-purple-400" />
              </div>
              <h4 className="text-xl font-bold mb-3">VIP Contacts</h4>
              <p className="text-gray-400 leading-relaxed">Always see messages from your boss or key clients first.</p>
            </div>
            <div className="text-left">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                <CheckCircle2 className="w-6 h-6 text-green-400" />
              </div>
              <h4 className="text-xl font-bold mb-3">Inbox Zero</h4>
              <p className="text-gray-400 leading-relaxed">Easily mark tasks as done and watch your queues disappear.</p>
            </div>
          </div>

          <div className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <h4 className="text-2xl font-bold">Ready to try PriorityHub?</h4>
            <Link to="/dashboard" className="px-8 py-4 text-base font-bold text-gray-900 bg-white hover:bg-gray-100 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95">
              Launch Hackathon Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-8 text-center text-gray-500 text-sm">
        <p>Built during the 2026 Developer Hackathon by Sandi.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
