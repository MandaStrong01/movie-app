import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles, Menu, Search, Play, MessageCircle, Film, Music,
  Image as ImageIcon, Video, Mic, Zap, Clock, Upload, Database,
  Sliders, Layers, Palette, Download, Share2, Youtube, Twitter, Instagram,
  Facebook, BookOpen, Shield, Heart, Send, X, ChevronRight, ChevronLeft,
  Home, Settings, TrendingUp, User, Lock, Mail, Check, Headphones,
  Volume2, Activity, Eye, FileVideo, PenTool, Camera, Users, Guitar,
  LogOut, Plus, Trash2, Edit, Save, Folder, FileText
} from 'lucide-react';
import { useAuth } from './contexts/AuthContext';
import { supabase } from './lib/supabase';

const generateTools = (baseTools: string[]) => {
  const tools = [];
  for (let i = 0; i < 120; i++) {
    const base = baseTools[i % baseTools.length];
    const suffix = i >= baseTools.length ? ` PRO ${Math.floor(i / baseTools.length)}` : "";
    tools.push(`${base}${suffix}`);
  }
  return tools;
};

const TOOL_BOARDS = {
  Writing: generateTools(["Dialogue Writer", "Plot Generator", "Scene Writer", "Story Outliner", "Character Developer", "Dialogue Editor", "Plot Designer", "Story Planner", "Treatment Writer", "Script Formatter", "Plot Creator", "Three Act Builder"]),
  Voice: generateTools(["Voice Maker", "Voice Cloner", "Voice Creator Tool", "Voice Recorder", "Speech Converter", "Voice Builder", "Advanced Voice Generator", "Voice Studio Tool", "Premium Voice Generator", "Voice Audio Tool", "Emotional Voice Generator", "Advanced Speech Creator"]),
  Image: generateTools(["Image Creator", "Advanced Image Generator", "Design Generator", "Image Tool", "Art Maker", "Art Mixer", "Image Stream Tool", "Art Library Tool", "Workflow Tool", "Auto Image Generator", "Image Studio Pro", "Easy Image Generator"]),
  Video: generateTools(["Motion Video Maker", "Video Creator", "Avatar Generator", "Video Synthesizer", "Video Studio", "Video Flow Generator", "Video Creator Studio", "Video Crafter", "Image to Motion Tool", "Video Style Tool", "Temporal Flow Tool", "Frame Blender"]),
  Motion: generateTools(["Motion Animator", "Motion Studio", "Auto Animator", "Motion Flow Tool", "Motion Capture Pro", "Webcam Motion Tool", "Skeleton Tracker", "Joint Tracker", "Character Rigger", "3D Character Studio", "Player Avatar Creator", "Avatar Generator"]),
  Editing: generateTools(["Smart Video Editor", "Auto Editor", "Video Tools Suite", "Edit Master", "Scene Detector", "Beat Syncer", "Auto Assembly Tool", "Smart Timeline", "Highlight Finder", "Key Moment Finder", "Context Editor", "Intelligent Cutter"])
};

const ENHANCEMENT_TOOLS = ["AI Upscaling", "Noise Reduction", "Stabilization", "Color Enhancement", "Audio Enhancement", "Frame Interpolation", "Sharpening", "Deblur", "HDR Tone Mapping", "Face Enhancement", "Auto Crop", "Smart Zoom", "Background Removal", "Object Removal", "Sky Replacement", "Style Transfer", "Auto Color Grade", "Slow Motion", "Time Lapse", "Motion Blur", "Depth of Field", "Vignette", "Grain Removal", "Contrast Boost", "Saturation Boost", "Exposure Fix", "White Balance", "Shadow Recovery", "Highlight Recovery", "Detail Enhancement"];

export default function App() {
  const [page, setPage] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [duration, setDuration] = useState(90);
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [volume, setVolume] = useState(100);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'assistant', message: string}>>([
    { role: 'assistant', message: 'Hello! I\'m Agent Grok, your 24/7 assistant. How can I help you today?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [projects, setProjects] = useState<any[]>([]);
  const [currentProject, setCurrentProject] = useState<any>(null);
  const [projectTitle, setProjectTitle] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [menuPageIndex, setMenuPageIndex] = useState(0);

  const { user, signIn, signUp, signOut } = useAuth();

  useEffect(() => {
    if (videoRef.current && page === 1) {
      videoRef.current.play().catch(() => {});
    }
  }, [page]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  useEffect(() => {
    if (user) {
      loadProjects();
    }
  }, [user]);

  const loadProjects = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from('movie_projects')
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false });

    if (data) {
      setProjects(data);
    }
  };

  const createProject = async () => {
    if (!user || !projectTitle) return;

    const { data, error } = await supabase
      .from('movie_projects')
      .insert({
        user_id: user.id,
        title: projectTitle,
        duration: duration,
        current_phase: 1,
        completed: false
      })
      .select()
      .single();

    if (data) {
      setCurrentProject(data);
      setProjects([data, ...projects]);
      setProjectTitle('');
      setAuthSuccess('Project created successfully!');
      setTimeout(() => setAuthSuccess(''), 3000);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');

    try {
      await signIn(loginEmail, loginPassword);
      setAuthSuccess('Login successful!');
      setTimeout(() => {
        setAuthSuccess('');
        setPage(4);
      }, 1500);
    } catch (error: any) {
      setAuthError(error.message || 'Login failed');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');

    try {
      await signUp(registerEmail, registerPassword);
      setAuthSuccess('Account created! You can now login.');
      setRegisterName('');
      setRegisterEmail('');
      setRegisterPassword('');
    } catch (error: any) {
      setAuthError(error.message || 'Registration failed');
    }
  };

  const handleLogout = async () => {
    await signOut();
    setPage(1);
    setProjects([]);
    setCurrentProject(null);
  };

  const handleChatSend = async () => {
    if (!chatInput.trim()) return;

    const userMessage = chatInput;
    setChatMessages([...chatMessages, { role: 'user', message: userMessage }]);
    setChatInput('');

    setTimeout(() => {
      const responses = [
        "I can help you with that! Let me guide you through the process.",
        "Great question! Here's what you need to know...",
        "I'm here to help! Let me explain how that works.",
        "That's a fantastic idea! Here are some suggestions...",
        "I understand. Let me break this down for you step by step."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setChatMessages(prev => [...prev, { role: 'assistant', message: randomResponse }]);
    }, 1000);
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const goTo = (p: number) => {
    setPage(p);
    setMenuOpen(false);
  };

  const QuickAccessMenu = () => {
    const allPages = [
      {page: 1, label: "Page 1 - Home"},
      {page: 2, label: "Page 2 - Intro"},
      {page: 3, label: "Page 3 - Login/Register"},
      {page: 4, label: "Page 4 - AI Hub"},
      {page: 5, label: "Page 5 - Writing Board"},
      {page: 6, label: "Page 6 - Voice Board"},
      {page: 7, label: "Page 7 - Image Board"},
      {page: 8, label: "Page 8 - Video Board"},
      {page: 9, label: "Page 9 - Motion Board"},
      {page: 10, label: "Page 10 - Editor's Choice"},
      {page: 11, label: "Page 11 - Editor Suite"},
      {page: 12, label: "Page 12 - My Projects"},
      {page: 13, label: "Page 13 - Enhancement"},
      {page: 14, label: "Page 14 - Upload Assets"},
      {page: 15, label: "Page 15 - Timeline Builder"},
      {page: 16, label: "Page 16 - Export"},
      {page: 17, label: "Page 17 - Guide"},
      {page: 18, label: "Page 18 - Terms"},
      {page: 19, label: "Page 19 - Help Desk"},
      {page: 20, label: "Page 20 - Community"},
      {page: 21, label: "Page 21 - Finish"}
    ];

    const itemsPerPage = 5;
    const startIndex = menuPageIndex * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedPages = allPages.slice(startIndex, endIndex);
    const totalMenuPages = Math.ceil(allPages.length / itemsPerPage);

    return (
      <div className="fixed top-8 right-6 z-50">
        <button onClick={() => setMenuOpen(!menuOpen)} className="bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-full font-black uppercase text-white flex items-center gap-2 shadow-lg transition-all">
          <Menu size={20} /> Quick Access
        </button>
        {menuOpen && (
          <div className="absolute top-16 right-0 bg-black border-2 border-purple-600 rounded-2xl p-4 w-72 shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={() => setMenuPageIndex(Math.max(0, menuPageIndex - 1))}
                disabled={menuPageIndex === 0}
                className="p-1 hover:bg-purple-600 rounded disabled:opacity-30 disabled:hover:bg-transparent"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="text-xs text-gray-400">
                {menuPageIndex + 1} / {totalMenuPages}
              </span>
              <button
                onClick={() => setMenuPageIndex(Math.min(totalMenuPages - 1, menuPageIndex + 1))}
                disabled={menuPageIndex === totalMenuPages - 1}
                className="p-1 hover:bg-purple-600 rounded disabled:opacity-30 disabled:hover:bg-transparent"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {displayedPages.map((item) => (
                <button key={item.page} onClick={() => goTo(item.page)} className="text-left text-xs font-bold text-purple-400 px-4 py-2 hover:bg-purple-600 hover:text-white rounded-lg transition">
                  {item.label}
                </button>
              ))}
            </div>
            {user && (
              <button onClick={handleLogout} className="text-left text-xs font-bold text-red-400 px-4 py-2 hover:bg-red-600 hover:text-white rounded-lg transition flex items-center gap-2 mt-3 w-full">
                <LogOut size={16} /> Logout
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  const HelpButton = () => (
    <button onClick={() => setPage(19)} className="fixed bottom-8 right-8 z-50 bg-purple-600 hover:bg-purple-500 p-4 rounded-full shadow-lg transition-all">
      <MessageCircle size={28} className="text-white" />
    </button>
  );

  const Footer = () => page >= 3 ? (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 py-3 text-center text-white text-xs md:text-sm font-black uppercase z-40 border-t border-purple-900/30">
      <p>MandaStrong1 2025 ~ Author of Doxy The School Bully ~ Also Find Me On MandaStrong1.Etsy.com</p>
    </div>
  ) : null;

  const Navigation = () => (
    <div className="fixed bottom-20 right-6 z-50 flex flex-col gap-3">
      {page > 1 && page < 21 && (
        <button onClick={() => setPage(page - 1)} className="bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-full font-black uppercase text-white shadow-lg transition-all">
          ← Back
        </button>
      )}
      {page < 21 && (
        <button onClick={() => setPage(page + 1)} className="bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-full font-black uppercase text-white shadow-lg transition-all">
          Next →
        </button>
      )}
      {page === 21 && (
        <>
          <button onClick={() => setPage(1)} className="bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-full font-black uppercase text-white shadow-lg transition-all">
            Home
          </button>
          <button className="bg-black hover:bg-gray-900 px-6 py-3 rounded-full font-black uppercase text-white shadow-lg transition-all border-2 border-white/20">
            Close
          </button>
        </>
      )}
    </div>
  );

  const ToolBoard = ({ title, tools }: { title: string; tools: string[] }) => (
    <div className="min-h-screen bg-black text-white p-6 pb-32">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-black uppercase text-purple-500 mb-12 text-left">{title} BOARD</h1>
        <div className="grid grid-cols-2 gap-4">
          {tools.map((tool, i) => (
            <div key={i} className="bg-gray-900/50 border-2 border-purple-900/30 rounded-xl p-4 flex items-center gap-3 hover:border-purple-600 hover:bg-gray-900 transition-all cursor-pointer">
              <Sparkles size={20} className="text-purple-500 flex-shrink-0" />
              <span className="font-bold text-sm">{tool}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <QuickAccessMenu />
      <HelpButton />
      <Footer />
      <Navigation />

      {page === 1 && (
        <div className="relative h-screen overflow-hidden">
          <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" src="background__2_.mp4" loop muted playsInline />
          <div className="relative z-10 h-full flex flex-col justify-between items-center text-center px-4 py-8">
            <div className="mt-8">
              <h1 className="text-6xl md:text-8xl font-black text-black uppercase italic tracking-tighter leading-none drop-shadow-lg">
                MANDASTRONG'S STUDIO
              </h1>
              <p className="text-xl md:text-3xl font-black text-black italic uppercase mt-2 drop-shadow-lg">
                Welcome To The All-In-One Make-A-Movie App! ~ Up To 3 Hours
              </p>
            </div>
            <div className="flex flex-wrap gap-4 mb-8 justify-center">
              {!user ? (
                <>
                  <button onClick={() => setPage(2)} className="bg-black border border-white/20 px-10 py-3 rounded-xl text-xl font-black text-white hover:bg-gray-900 transition shadow-2xl">Next</button>
                  <button onClick={() => setPage(3)} className="bg-black border border-white/20 px-10 py-3 rounded-xl text-xl font-black text-white hover:bg-gray-900 transition shadow-2xl">Login</button>
                  <button onClick={() => setPage(3)} className="bg-black border border-white/20 px-10 py-3 rounded-xl text-xl font-black text-white hover:bg-gray-900 transition shadow-2xl">Register</button>
                  <button onClick={() => setPage(4)} className="bg-gray-800 border border-white/20 px-10 py-3 rounded-xl text-xl font-black text-white hover:bg-gray-700 transition shadow-2xl">Browse For Now</button>
                </>
              ) : (
                <>
                  <button onClick={() => setPage(4)} className="bg-purple-600 border border-white/20 px-10 py-3 rounded-xl text-xl font-black text-white hover:bg-purple-500 transition shadow-2xl">
                    <Sparkles size={20} className="inline mr-2" /> Start Creating
                  </button>
                  <button onClick={() => setPage(12)} className="bg-black border border-white/20 px-10 py-3 rounded-xl text-xl font-black text-white hover:bg-gray-900 transition shadow-2xl">
                    <Folder size={20} className="inline mr-2" /> My Projects
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {page === 2 && (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 flex flex-col items-center justify-center text-center px-4">
          <Sparkles size={80} className="text-purple-400 mb-8" />
          <h1 className="text-6xl md:text-8xl font-black uppercase text-white mb-6">MANDASTRONG'S<br/>STUDIO</h1>
          <p className="text-3xl md:text-5xl font-black text-purple-300 mb-4">Make Amazing Family Movies</p>
          <p className="text-3xl md:text-5xl font-black text-purple-300">& Bring Dreams To Life!</p>
        </div>
      )}

      {page === 3 && (
        <div className="min-h-screen bg-black p-8 pb-32 overflow-y-auto">
          {authError && (
            <div className="max-w-lg mx-auto mb-4 bg-red-900/50 border-2 border-red-600 rounded-xl p-4 text-center">
              <p className="text-red-300 font-bold">{authError}</p>
            </div>
          )}
          {authSuccess && (
            <div className="max-w-lg mx-auto mb-4 bg-green-900/50 border-2 border-green-600 rounded-xl p-4 text-center">
              <p className="text-green-300 font-bold">{authSuccess}</p>
            </div>
          )}

          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-2 border-purple-600 rounded-3xl p-8">
              <h2 className="text-5xl font-black mb-8 text-center">Login</h2>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full bg-transparent border-2 border-purple-600 rounded-xl px-4 py-3 text-white placeholder-gray-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full bg-transparent border-2 border-purple-600 rounded-xl px-4 py-3 text-white placeholder-gray-500"
                    required
                  />
                </div>
                <button type="submit" className="w-full bg-purple-600 hover:bg-purple-500 py-4 rounded-xl font-black text-xl mt-6">Login</button>
              </form>
            </div>

            <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-2 border-purple-600 rounded-3xl p-8">
              <h2 className="text-5xl font-black mb-8 text-center">Register</h2>
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2">Name</label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    className="w-full bg-transparent border-2 border-purple-600 rounded-xl px-4 py-3 text-white placeholder-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    className="w-full bg-transparent border-2 border-purple-600 rounded-xl px-4 py-3 text-white placeholder-gray-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    className="w-full bg-transparent border-2 border-purple-600 rounded-xl px-4 py-3 text-white placeholder-gray-500"
                    required
                  />
                </div>
                <button type="submit" className="w-full bg-purple-600 hover:bg-purple-500 py-4 rounded-xl font-black text-xl mt-6">Create Account</button>
              </form>
            </div>
          </div>

          <div className="flex items-center gap-4 max-w-lg mx-auto mb-8">
            <div className="flex-1 h-px bg-gray-700"></div>
            <span className="text-gray-400 font-bold">or</span>
            <div className="flex-1 h-px bg-gray-700"></div>
          </div>

          <div className="max-w-lg mx-auto mb-16">
            <button onClick={() => setPage(4)} className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-black text-xl flex items-center justify-center gap-2">
              <Eye size={24} /> Browse as Guest (View Only)
            </button>
            <p className="text-center text-gray-400 text-sm mt-4">Explore the platform without an account</p>
          </div>

          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-black text-center mb-10">Select Your Plan</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: 'Basic', price: '20', features: ['HD Export', '100 AI Tools', 'Basic Templates', '10GB Storage', 'Email Support'] },
                { name: 'Pro', price: '30', features: ['4K Export', '300 AI Tools', 'Premium Templates', '100GB Storage', 'Priority Support', 'Commercial License'], popular: true },
                { name: 'Studio', price: '50', features: ['8K Export', 'All 600 AI Tools', 'Unlimited Templates', '1TB Storage', '24/7 Live Support', 'Full Commercial Rights', 'Team Collaboration'] }
              ].map((plan, i) => (
                <div key={i} onClick={() => setSelectedPlan(plan.name.toLowerCase())} className={`bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-4 rounded-3xl p-8 transition-all cursor-pointer ${selectedPlan === plan.name.toLowerCase() || plan.popular ? 'border-yellow-400 scale-105' : 'border-purple-900'} ${plan.popular ? 'relative' : ''}`}>
                  {plan.popular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 px-4 py-1 rounded-full text-sm font-black">POPULAR</div>}
                  <h3 className="text-3xl font-black mb-4">{plan.name}</h3>
                  <div className="text-5xl font-black mb-6">${plan.price}<span className="text-2xl">/mo</span></div>
                  <ul className="space-y-3 text-left">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2"><Check size={20} className="text-purple-400" /> {feature}</li>
                    ))}
                  </ul>
                  {plan.popular && selectedPlan === plan.name.toLowerCase() && (
                    <div className="text-yellow-400 font-black text-center mt-6 flex items-center justify-center gap-2"><Check size={20} /> SELECTED</div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <button className="bg-purple-600 hover:bg-purple-500 px-16 py-5 rounded-xl font-black text-2xl uppercase">Continue to Payment</button>
              <p className="text-gray-400 mt-4">Secure payment powered by Stripe</p>
            </div>
          </div>
        </div>
      )}

      {page === 4 && (
        <div className="min-h-screen bg-black p-8 pb-32">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h1 className="text-6xl font-black uppercase text-purple-500">AI TOOL BOARD</h1>
                {user && <p className="text-gray-400 mt-2">Welcome back, {user.email}!</p>}
              </div>
              <button className="bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-full font-bold flex items-center gap-2">
                <Search size={20} /> Search
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { page: 5, title: "Writing Board", icon: "✍️", desc: "120 Story & Script Tools" },
                { page: 6, title: "Voice Board", icon: "🎙️", desc: "120 Voice Generation Tools" },
                { page: 7, title: "Image Board", icon: "🎨", desc: "120 Image Creation Tools" },
                { page: 8, title: "Video Board", icon: "🎬", desc: "120 Video Production Tools" },
                { page: 9, title: "Motion Board", icon: "🎭", desc: "120 Animation Tools" },
                { page: 10, title: "Editor's Choice", icon: "⭐", desc: "Featured Movie Player" },
              ].map((board) => (
                <div key={board.page} onClick={() => setPage(board.page)} className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-2 border-purple-600 rounded-2xl p-8 hover:border-purple-400 hover:scale-105 transition-all cursor-pointer text-center">
                  <div className="text-6xl mb-4">{board.icon}</div>
                  <h3 className="text-2xl font-black mb-2">{board.title}</h3>
                  <p className="text-purple-300">{board.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {page === 5 && <ToolBoard title="WRITING" tools={TOOL_BOARDS.Writing} />}
      {page === 6 && <ToolBoard title="VOICE" tools={TOOL_BOARDS.Voice} />}
      {page === 7 && <ToolBoard title="IMAGE" tools={TOOL_BOARDS.Image} />}
      {page === 8 && <ToolBoard title="VIDEO" tools={TOOL_BOARDS.Video} />}
      {page === 9 && <ToolBoard title="MOTION" tools={TOOL_BOARDS.Motion} />}

      {page === 10 && (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 pb-32">
          <h1 className="text-6xl font-black uppercase text-purple-500 mb-12">EDITOR'S CHOICE</h1>
          <div className="w-full max-w-6xl aspect-video bg-gray-900 rounded-2xl border-4 border-purple-600 flex items-center justify-center mb-8">
            <div className="text-center">
              <Play size={80} className="text-purple-500 mx-auto mb-4" />
              <p className="text-2xl font-bold text-gray-400">No Movie Uploaded</p>
              <p className="text-gray-500 mt-2">Upload a movie to watch it here!</p>
            </div>
          </div>
          <button onClick={() => setPage(14)} className="bg-purple-600 hover:bg-purple-500 px-8 py-4 rounded-xl font-black text-xl flex items-center gap-2">
            <Upload size={24} /> Go to Upload Page
          </button>
        </div>
      )}

      {page === 11 && (
        <div className="min-h-screen bg-black p-8 pb-32">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-6xl font-black uppercase text-purple-500 mb-4">EDITOR SUITE</h1>
            <p className="text-gray-400 mb-12">Professional-Grade Video Editing Platform</p>

            <div className="grid grid-cols-2 gap-6 mb-12">
              {[
                { icon: Film, title: "Video Editor", desc: "Multi-track timeline with professional tools" },
                { icon: Music, title: "Audio Mixer", desc: "Professional audio mixing suite" },
                { icon: Palette, title: "Color Grading", desc: "Advanced color correction workspace" },
                { icon: Layers, title: "Effects Library", desc: "Thousands of transitions and effects" },
                { icon: Zap, title: "Precision Tools", desc: "Frame-accurate cutting" },
                { icon: Sparkles, title: "AI Enhancement", desc: "AI-powered upscaling" },
              ].map((item, i) => (
                <div key={i} className="bg-gray-900/50 border-2 border-purple-900/30 rounded-2xl p-6 hover:border-purple-600 transition-all cursor-pointer">
                  <item.icon size={40} className="text-purple-500 mb-4" />
                  <h3 className="text-2xl font-black mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-gray-900/50 border-2 border-purple-900/30 rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <Clock size={32} className="text-purple-500" />
                <h3 className="text-3xl font-black">Set Movie Duration</h3>
              </div>
              <div className="text-center mb-6">
                <div className="text-7xl font-black text-purple-500 mb-2">{duration}</div>
                <div className="text-xl font-black text-purple-400">MINUTES</div>
              </div>
              <input type="range" min="0" max="240" value={duration} onChange={(e) => setDuration(parseInt(e.target.value))} className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-600" />
            </div>
          </div>
        </div>
      )}

      {page === 12 && (
        <div className="min-h-screen bg-black p-8 pb-32">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-6xl font-black uppercase text-purple-500 mb-4">MY PROJECTS</h1>
            <p className="text-gray-400 mb-12">Manage all your movie projects in one place</p>

            {user ? (
              <>
                <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-2 border-purple-600 rounded-2xl p-8 mb-8">
                  <h2 className="text-3xl font-black mb-6">Create New Project</h2>
                  <div className="flex gap-4">
                    <input
                      type="text"
                      placeholder="Project Title..."
                      value={projectTitle}
                      onChange={(e) => setProjectTitle(e.target.value)}
                      className="flex-1 bg-transparent border-2 border-purple-600 rounded-xl px-4 py-3 text-white placeholder-gray-500"
                    />
                    <button onClick={createProject} className="bg-purple-600 hover:bg-purple-500 px-8 py-3 rounded-xl font-black flex items-center gap-2">
                      <Plus size={20} /> Create
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {projects.length === 0 ? (
                    <div className="col-span-2 text-center py-12 text-gray-400">
                      <Folder size={64} className="mx-auto mb-4 opacity-50" />
                      <p className="text-xl">No projects yet. Create your first one above!</p>
                    </div>
                  ) : (
                    projects.map((project) => (
                      <div key={project.id} className="bg-gray-900/50 border-2 border-purple-900/30 rounded-2xl p-6 hover:border-purple-600 transition-all">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-2xl font-black mb-2">{project.title}</h3>
                            <p className="text-gray-400 text-sm">Duration: {project.duration} minutes</p>
                            <p className="text-gray-400 text-sm">Phase: {project.current_phase} of 3</p>
                          </div>
                          <div className="flex gap-2">
                            <button className="p-2 bg-purple-600 hover:bg-purple-500 rounded-lg">
                              <Edit size={16} />
                            </button>
                            <button className="p-2 bg-red-600 hover:bg-red-500 rounded-lg">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2 mb-4">
                          <div className="bg-purple-600 h-2 rounded-full" style={{width: `${(project.current_phase / 3) * 100}%`}}></div>
                        </div>
                        <button onClick={() => {setCurrentProject(project); setPage(15);}} className="w-full bg-purple-600 hover:bg-purple-500 py-2 rounded-lg font-bold">
                          Open Project
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <Lock size={64} className="mx-auto mb-4 text-purple-500" />
                <p className="text-xl text-gray-400 mb-4">Please login to access your projects</p>
                <button onClick={() => setPage(3)} className="bg-purple-600 hover:bg-purple-500 px-8 py-3 rounded-xl font-black">
                  Go to Login
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {page === 13 && (
        <div className="min-h-screen bg-black p-8 pb-32 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-6xl font-black uppercase text-purple-500 mb-12">ENHANCEMENT STUDIO</h1>

            <div className="bg-gray-900/50 border-2 border-purple-600 rounded-2xl p-8 mb-8">
              <div className="flex items-center gap-4 mb-6">
                <Clock size={32} className="text-purple-500" />
                <h3 className="text-3xl font-black">Master Duration Control</h3>
              </div>
              <div className="text-center mb-6">
                <div className="text-7xl font-black text-purple-500 mb-2">{duration}</div>
                <div className="text-xl font-black text-purple-400">MINUTES</div>
              </div>
              <input type="range" min="0" max="180" value={duration} onChange={(e) => setDuration(parseInt(e.target.value))} className="w-full h-3 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-600" />
              <div className="flex justify-between text-sm text-gray-400 mt-2">
                <span>0 minutes</span>
                <span>180 minutes (3 hours)</span>
              </div>
            </div>

            <h2 className="text-3xl font-black text-purple-400 mb-6">30 Professional Enhancement Tools</h2>
            <div className="grid grid-cols-3 gap-4">
              {ENHANCEMENT_TOOLS.map((tool, i) => (
                <div key={i} className="bg-gray-900/50 border-2 border-purple-900/30 rounded-xl p-4 flex items-center gap-3 hover:border-purple-600 hover:bg-gray-900 transition-all cursor-pointer">
                  <Zap size={20} className="text-purple-500 flex-shrink-0" />
                  <span className="font-bold text-sm">{tool}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {page === 14 && (
        <div className="min-h-screen bg-black p-8 pb-32">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-6xl font-black uppercase text-purple-500 mb-4">UPLOAD ASSETS</h1>
            <p className="text-gray-400 mb-12">Upload videos, images, audio, and other media files</p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-2 border-purple-600 rounded-2xl p-8">
                <div className="border-4 border-dashed border-purple-600 rounded-2xl p-12 text-center hover:border-purple-400 transition-all cursor-pointer">
                  <Upload size={64} className="mx-auto mb-4 text-purple-500" />
                  <h3 className="text-2xl font-black mb-2">Upload Video Files</h3>
                  <p className="text-gray-400 mb-4">MP4, MOV, AVI up to 5GB</p>
                  <button className="bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-xl font-bold">
                    Choose Files
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-2 border-purple-600 rounded-2xl p-8">
                <div className="border-4 border-dashed border-purple-600 rounded-2xl p-12 text-center hover:border-purple-400 transition-all cursor-pointer">
                  <ImageIcon size={64} className="mx-auto mb-4 text-purple-500" />
                  <h3 className="text-2xl font-black mb-2">Upload Images</h3>
                  <p className="text-gray-400 mb-4">JPG, PNG, GIF up to 50MB</p>
                  <button className="bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-xl font-bold">
                    Choose Files
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-2 border-purple-600 rounded-2xl p-8">
                <div className="border-4 border-dashed border-purple-600 rounded-2xl p-12 text-center hover:border-purple-400 transition-all cursor-pointer">
                  <Music size={64} className="mx-auto mb-4 text-purple-500" />
                  <h3 className="text-2xl font-black mb-2">Upload Audio</h3>
                  <p className="text-gray-400 mb-4">MP3, WAV, M4A up to 200MB</p>
                  <button className="bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-xl font-bold">
                    Choose Files
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-2 border-purple-600 rounded-2xl p-8">
                <div className="border-4 border-dashed border-purple-600 rounded-2xl p-12 text-center hover:border-purple-400 transition-all cursor-pointer">
                  <FileText size={64} className="mx-auto mb-4 text-purple-500" />
                  <h3 className="text-2xl font-black mb-2">Upload Scripts</h3>
                  <p className="text-gray-400 mb-4">TXT, PDF, DOCX up to 10MB</p>
                  <button className="bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-xl font-bold">
                    Choose Files
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 border-2 border-purple-900/30 rounded-2xl p-8">
              <h2 className="text-3xl font-black mb-6">Uploaded Files</h2>
              {uploadedFiles.length === 0 ? (
                <p className="text-center text-gray-400 py-8">No files uploaded yet</p>
              ) : (
                <div className="space-y-3">
                  {uploadedFiles.map((file, i) => (
                    <div key={i} className="flex items-center justify-between bg-gray-800 rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <FileVideo size={24} className="text-purple-500" />
                        <span className="font-bold">{file.name}</span>
                      </div>
                      <button className="text-red-400 hover:text-red-300">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {page === 15 && (
        <div className="min-h-screen bg-black p-8 pb-32">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-6xl font-black uppercase text-purple-500 mb-4">TIMELINE BUILDER</h1>
            <p className="text-gray-400 mb-8">Drag and drop to build your movie timeline</p>

            {currentProject && (
              <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-2 border-purple-600 rounded-2xl p-6 mb-8">
                <h2 className="text-2xl font-black mb-2">Current Project: {currentProject.title}</h2>
                <p className="text-gray-400">Duration: {currentProject.duration} minutes</p>
              </div>
            )}

            <div className="bg-gray-900/50 border-2 border-purple-900/30 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-black mb-6">Timeline Preview</h3>
              <div className="bg-gray-800 rounded-xl p-6 min-h-[200px] border-2 border-dashed border-gray-700">
                <p className="text-center text-gray-500 py-12">Drop clips here to build your timeline</p>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-gray-900/50 border-2 border-purple-900/30 rounded-xl p-4">
                <h4 className="font-black mb-3 flex items-center gap-2">
                  <Video size={20} className="text-purple-500" /> Video Clips
                </h4>
                <div className="space-y-2">
                  <div className="bg-gray-800 rounded-lg p-3 cursor-pointer hover:bg-gray-700 transition">
                    <p className="text-sm font-bold">Intro Scene</p>
                    <p className="text-xs text-gray-400">0:30</p>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3 cursor-pointer hover:bg-gray-700 transition">
                    <p className="text-sm font-bold">Main Scene</p>
                    <p className="text-xs text-gray-400">5:00</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/50 border-2 border-purple-900/30 rounded-xl p-4">
                <h4 className="font-black mb-3 flex items-center gap-2">
                  <Music size={20} className="text-purple-500" /> Audio Tracks
                </h4>
                <div className="space-y-2">
                  <div className="bg-gray-800 rounded-lg p-3 cursor-pointer hover:bg-gray-700 transition">
                    <p className="text-sm font-bold">Background Music</p>
                    <p className="text-xs text-gray-400">3:45</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/50 border-2 border-purple-900/30 rounded-xl p-4">
                <h4 className="font-black mb-3 flex items-center gap-2">
                  <ImageIcon size={20} className="text-purple-500" /> Images
                </h4>
                <div className="space-y-2">
                  <div className="bg-gray-800 rounded-lg p-3 cursor-pointer hover:bg-gray-700 transition">
                    <p className="text-sm font-bold">Title Card</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/50 border-2 border-purple-900/30 rounded-xl p-4">
                <h4 className="font-black mb-3 flex items-center gap-2">
                  <Sparkles size={20} className="text-purple-500" /> Effects
                </h4>
                <div className="space-y-2">
                  <div className="bg-gray-800 rounded-lg p-3 cursor-pointer hover:bg-gray-700 transition">
                    <p className="text-sm font-bold">Fade In</p>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3 cursor-pointer hover:bg-gray-700 transition">
                    <p className="text-sm font-bold">Fade Out</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button className="bg-purple-600 hover:bg-purple-500 px-12 py-4 rounded-xl font-black text-xl flex items-center gap-2 mx-auto">
                <Save size={24} /> Save Timeline
              </button>
            </div>
          </div>
        </div>
      )}

      {page === 16 && (
        <div className="min-h-screen bg-black p-8 pb-32">
          <h1 className="text-5xl font-black uppercase mb-12">EXPORT CENTER</h1>

          <div className="max-w-4xl mx-auto">
            <div className="bg-purple-900/20 border-2 border-purple-600/30 rounded-2xl p-8 mb-8">
              <h2 className="text-3xl font-black mb-6">Export Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2">Quality</label>
                  <select className="w-full bg-gray-800 border-2 border-purple-600 rounded-xl px-4 py-3">
                    <option>4K (3840x2160)</option>
                    <option>1080p (1920x1080)</option>
                    <option>720p (1280x720)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Format</label>
                  <select className="w-full bg-gray-800 border-2 border-purple-600 rounded-xl px-4 py-3">
                    <option>MP4</option>
                    <option>MOV</option>
                    <option>AVI</option>
                  </select>
                </div>
                <button className="w-full bg-purple-600 hover:bg-purple-500 py-4 rounded-xl font-black text-xl flex items-center justify-center gap-2">
                  <Download size={24} /> Export Movie
                </button>
              </div>
            </div>

            <div className="bg-purple-900/20 border-2 border-purple-600/30 rounded-2xl p-8 mb-8 text-center">
              <h2 className="text-3xl font-black mb-6">Share To Social Media</h2>
              <div className="grid grid-cols-6 gap-4">
                {[
                  { name: 'YouTube', icon: Youtube },
                  { name: 'X', icon: Twitter },
                  { name: 'Instagram', icon: Instagram },
                  { name: 'TikTok', icon: Music },
                  { name: 'Vimeo', icon: Video },
                  { name: 'Facebook', icon: Facebook }
                ].map((platform, i) => (
                  <button key={i} className="bg-purple-600 hover:bg-purple-500 p-6 rounded-xl flex flex-col items-center gap-2 transition-all hover:scale-105">
                    <platform.icon size={32} />
                    <span className="text-xs font-bold">{platform.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {page === 17 && (
        <div className="min-h-screen bg-black p-8 pb-32">
          <h1 className="text-5xl font-black uppercase mb-12 text-center">TUTORIALS & LEARNING CENTER</h1>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <BookOpen size={80} className="mx-auto mb-4 text-purple-400" />
              <h2 className="text-3xl font-black">Master MandaStrong Studio</h2>
              <p className="text-gray-400 mt-4">Learn everything you need to create amazing movies</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Getting Started", icon: Play, lessons: 12 },
                { title: "AI Tools Mastery", icon: Sparkles, lessons: 24 },
                { title: "Video Editing Basics", icon: Film, lessons: 18 },
                { title: "Audio Production", icon: Music, lessons: 15 },
                { title: "Color Grading", icon: Palette, lessons: 10 },
                { title: "Export & Sharing", icon: Share2, lessons: 8 }
              ].map((course, i) => (
                <div key={i} className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-2 border-purple-600 rounded-2xl p-8 hover:scale-105 transition-all cursor-pointer">
                  <course.icon size={48} className="text-purple-400 mb-4" />
                  <h3 className="text-2xl font-black mb-2">{course.title}</h3>
                  <p className="text-gray-400">{course.lessons} Lessons</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {page === 18 && (
        <div className="min-h-screen bg-black p-8 pb-32">
          <h1 className="text-5xl font-black uppercase mb-12 text-center">TERMS OF SERVICE & DISCLAIMER</h1>
          <div className="max-w-4xl mx-auto">
            <div className="bg-purple-900/30 border-2 border-purple-600 rounded-2xl p-8 mb-8 text-center">
              <Shield size={64} className="mx-auto mb-4 text-purple-400" />
              <h2 className="text-4xl font-black mb-4">Legal Agreement</h2>
              <p className="text-gray-300 leading-relaxed">
                By using MandaStrong Studio, you agree to our terms of service.
                All content created using this platform is subject to copyright laws.
                Please use responsibly and respect intellectual property rights.
              </p>
            </div>

            <div className="bg-gray-900/50 border-2 border-purple-900/30 rounded-2xl p-8">
              <h3 className="text-2xl font-black mb-4">Key Points</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <Check size={20} className="text-purple-400 mt-1 flex-shrink-0" />
                  <span>You retain ownership of your original content</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={20} className="text-purple-400 mt-1 flex-shrink-0" />
                  <span>Commercial use requires appropriate license</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={20} className="text-purple-400 mt-1 flex-shrink-0" />
                  <span>AI-generated content follows fair use guidelines</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={20} className="text-purple-400 mt-1 flex-shrink-0" />
                  <span>Storage limits apply based on your plan</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {page === 19 && (
        <div className="min-h-screen bg-black p-8 pb-32">
          <h1 className="text-5xl font-black uppercase mb-8 flex items-center gap-4 justify-center">
            <MessageCircle size={48} className="text-purple-500" />
            AGENT GROK - 24/7 HELP DESK
          </h1>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-900/50 border-2 border-purple-600 rounded-2xl p-6 mb-6 h-[500px] overflow-y-auto">
              <div className="space-y-4">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] rounded-2xl p-4 ${msg.role === 'user' ? 'bg-purple-600' : 'bg-gray-800 border-2 border-purple-900/30'}`}>
                      <p>{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Type your message..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
                className="flex-1 bg-gray-900 border-2 border-purple-600 rounded-xl px-6 py-4 text-white placeholder-gray-500"
              />
              <button onClick={handleChatSend} className="bg-purple-600 hover:bg-purple-500 px-8 py-4 rounded-xl font-black flex items-center gap-2">
                <Send size={20} /> Send
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-8">
              {[
                "How do I start a new project?",
                "What AI tools are available?",
                "How to export my video?"
              ].map((question, i) => (
                <button
                  key={i}
                  onClick={() => {setChatInput(question); handleChatSend();}}
                  className="bg-gray-800 hover:bg-gray-700 border-2 border-purple-900/30 rounded-xl p-4 text-left text-sm"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {page === 20 && (
        <div className="min-h-screen bg-black p-8 pb-32">
          <h1 className="text-5xl font-black uppercase mb-8 text-center">COMMUNITY HUB</h1>

          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Users size={80} className="mx-auto mb-4 text-purple-400" />
              <h2 className="text-3xl font-black mb-2">Join Our Creator Community</h2>
              <p className="text-gray-400">Connect with fellow filmmakers and share your work</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-2 border-purple-600 rounded-2xl p-8">
                <h3 className="text-3xl font-black mb-6">Featured Projects</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-gray-900/50 rounded-xl p-4 border-2 border-purple-900/30">
                      <h4 className="font-black mb-2">Amazing Short Film #{i}</h4>
                      <p className="text-sm text-gray-400">by Creator {i}</p>
                      <div className="flex items-center gap-4 mt-3 text-sm">
                        <span className="flex items-center gap-1">
                          <Heart size={16} className="text-red-400" /> 234
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye size={16} className="text-blue-400" /> 1.2k
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-2 border-purple-600 rounded-2xl p-8">
                <h3 className="text-3xl font-black mb-6">Discussion Forums</h3>
                <div className="space-y-3">
                  {[
                    "Tips & Tricks",
                    "Show Your Work",
                    "Technical Help",
                    "Feature Requests",
                    "General Discussion"
                  ].map((forum, i) => (
                    <button key={i} className="w-full bg-gray-900/50 hover:bg-gray-800 border-2 border-purple-900/30 rounded-xl p-4 text-left font-bold transition-all">
                      {forum}
                      <span className="float-right text-gray-400 text-sm">{Math.floor(Math.random() * 500)} posts</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {page === 21 && (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-900 p-8 pb-32 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-7xl font-black uppercase text-purple-400 text-center mb-12">THAT'S ALL FOLKS!</h1>

            <div className="bg-purple-900/30 border-2 border-purple-600/30 rounded-3xl p-10 mb-8">
              <h2 className="text-4xl font-black mb-6">A Special Thank You</h2>
              <p className="text-lg leading-relaxed mb-4">To all current and future creators, dreamers, and storytellers...</p>
              <p className="text-gray-300 leading-relaxed">Your creativity and passion inspire positive change in the world.</p>
            </div>

            <div className="bg-purple-900/30 border-2 border-purple-600/30 rounded-3xl p-10">
              <h2 className="text-4xl font-black mb-6">About Our Mission</h2>
              <p className="text-gray-300 mb-4">MandaStrong Studio is more than a filmmaking platform.</p>
              <p className="text-gray-300 mb-6">Visit our fundraiser at <a href="https://MandaStrong1.Etsy.com" className="text-purple-400 underline font-bold">MandaStrong1.Etsy.com</a></p>
            </div>
          </div>
        </div>
      )}

      {![1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21].includes(page) && (
        <div className="min-h-screen bg-black flex items-center justify-center text-white">
          <div className="text-center">
            <h1 className="text-8xl font-black text-purple-500 mb-4">PAGE {page}</h1>
            <p className="text-gray-400">Content coming soon...</p>
          </div>
        </div>
      )}
    </div>
  );
}
