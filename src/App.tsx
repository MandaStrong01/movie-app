import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Menu, Search, Play, MessageCircle, Film, Music, 
  Image as ImageIcon, Video, Mic, Zap, Clock, Upload, Database, 
  Sliders, Layers, Palette, Download, Share2, Youtube, Twitter, Instagram, 
  Facebook, BookOpen, Shield, Heart, Send, X, ChevronRight, ChevronLeft,
  Home, Settings, User, Check, Headphones, Volume2, Eye, FileVideo, 
  TrendingUp, Camera
} from 'lucide-react';

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
  Writing: generateTools([
    "Dialogue Writer", "Plot Generator", "Scene Writer", "Story Outliner", 
    "Character Developer", "Dialogue Editor", "Plot Designer", "Story Planner", 
    "Treatment Writer", "Script Formatter", "Plot Creator", "Three Act Builder"
  ]),
  Voice: generateTools([
    "Voice Maker", "Voice Cloner", "Voice Creator Tool", "Voice Recorder", 
    "Speech Converter", "Voice Builder", "Advanced Voice Generator", "Voice Studio Tool", 
    "Premium Voice Generator", "Voice Audio Tool", "Emotional Voice Generator", "Advanced Speech Creator"
  ]),
  Image: generateTools([
    "Image Creator", "Advanced Image Generator", "Design Generator", "Image Tool", 
    "Art Maker", "Art Mixer", "Image Stream Tool", "Art Library Tool", 
    "Workflow Tool", "Auto Image Generator", "Image Studio Pro", "Easy Image Generator"
  ]),
  Video: generateTools([
    "Motion Video Maker", "Video Creator", "Avatar Generator", "Video Synthesizer", 
    "Video Studio", "Video Flow Generator", "Video Creator Studio", "Video Crafter", 
    "Image to Motion Tool", "Video Style Tool", "Temporal Flow Tool", "Frame Blender"
  ]),
  Motion: generateTools([
    "Motion Animator", "Motion Studio", "Auto Animator", "Motion Flow Tool", 
    "Motion Capture Pro", "Webcam Motion Tool", "Skeleton Tracker", "Joint Tracker", 
    "Character Rigger", "3D Character Studio", "Player Avatar Creator", "Avatar Generator"
  ]),
  Editing: generateTools([
    "Smart Video Editor", "Auto Editor", "Video Tools Suite", "Edit Master", 
    "Scene Detector", "Beat Syncer", "Auto Assembly Tool", "Smart Timeline", 
    "Highlight Finder", "Key Moment Finder", "Context Editor", "Intelligent Cutter"
  ])
};

const ENHANCEMENT_TOOLS = [
  "AI Upscaling", "Noise Reduction", "Stabilization", "Color Enhancement", 
  "Audio Enhancement", "Frame Interpolation", "Sharpening", "Deblur", 
  "HDR Tone Mapping", "Face Enhancement", "Auto Crop", "Smart Zoom", 
  "Background Removal", "Object Removal", "Sky Replacement", "Style Transfer", 
  "Auto Color Grade", "Slow Motion", "Time Lapse", "Motion Blur", 
  "Depth of Field", "Vignette", "Grain Removal", "Contrast Boost", 
  "Saturation Boost", "Exposure Fix", "White Balance", "Shadow Recovery", 
  "Highlight Recovery", "Detail Enhancement"
];

const COMMUNITY_POSTS = [
  { title: "Epic Action Montage", author: "Sarah Johnson", time: "2 hours ago", likes: 1247, hearts: 823, comments: 156, emoji: "🎬", trending: true },
  { title: "Cinematic Travel Vlog", author: "Mike Chen", time: "5 hours ago", likes: 892, hearts: 634, comments: 89, emoji: "✈️" },
  { title: "Product Showcase Video", author: "Emily Rodriguez", time: "1 day ago", likes: 2156, hearts: 1423, comments: 267, emoji: "📦", trending: true },
  { title: "Music Video Edit", author: "Alex Thompson", time: "1 day ago", likes: 3421, hearts: 2789, comments: 445, emoji: "🎵", trending: true },
  { title: "Wedding Highlights", author: "Jessica Kim", time: "3 days ago", likes: 1847, hearts: 1234, comments: 203, emoji: "💍" },
  { title: "Gaming Montage", author: "David Brown", time: "4 days ago", likes: 2934, hearts: 1987, comments: 512, emoji: "🎮" }
];

export default function App() {
  const [page, setPage] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [duration, setDuration] = useState(90);
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [volume, setVolume] = useState(80);
  const [editorTab, setEditorTab] = useState('home');
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && page === 1) {
      videoRef.current.play().catch(() => {});
    }
  }, [page]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const goTo = (p: number) => {
    setPage(p);
    setMenuOpen(false);
  };

  const QuickAccessMenu = () => (
    <div className="fixed top-8 right-6 z-50">
      <button 
        onClick={() => setMenuOpen(!menuOpen)} 
        className="bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-full font-black uppercase text-white flex items-center gap-2 shadow-lg transition-all"
      >
        <Menu size={20} /> Quick Access
      </button>
      {menuOpen && (
        <div className="absolute top-16 right-0 bg-black border-2 border-purple-600 rounded-2xl p-4 w-64 shadow-2xl">
          <div className="flex flex-col gap-2">
            {[
              {page: 1, label: "Home"}, 
              {page: 4, label: "AI Hub"}, 
              {page: 12, label: "Editor Suite"}, 
              {page: 16, label: "Export"}, 
              {page: 17, label: "Tutorials"}, 
              {page: 19, label: "Help Desk"}, 
              {page: 21, label: "Finish"}
            ].map((item) => (
              <button 
                key={item.page} 
                onClick={() => goTo(item.page)} 
                className="text-left text-xs font-bold text-purple-400 px-4 py-2 hover:bg-purple-600 hover:text-white rounded-lg transition"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const HelpButton = () => page >= 3 && page !== 19 ? (
    <button 
      onClick={() => setPage(19)} 
      className="fixed bottom-8 right-8 z-50 bg-purple-600 hover:bg-purple-500 p-4 rounded-full shadow-lg transition-all"
    >
      <MessageCircle size={28} className="text-white" />
    </button>
  ) : null;

  const Footer = () => page >= 3 ? (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 py-3 text-center text-white text-xs md:text-sm font-black uppercase z-40 border-t border-purple-900/30">
      <p>MandaStrong1 2025 ~ Author of Doxy The School Bully ~ Also Find Me On MandaStrong1.Etsy.com</p>
    </div>
  ) : null;

  const Navigation = () => page >= 2 && page <= 21 ? (
    <div className="fixed bottom-20 right-6 z-50 flex flex-col gap-3">
      {page > 1 && page < 21 && (
        <button 
          onClick={() => setPage(page - 1)} 
          className="bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-full font-black uppercase text-white shadow-lg transition-all flex items-center gap-2"
        >
          <ChevronLeft size={20} /> Back
        </button>
      )}
      {page < 21 && (
        <button 
          onClick={() => setPage(page + 1)} 
          className="bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-full font-black uppercase text-white shadow-lg transition-all flex items-center gap-2"
        >
          Next <ChevronRight size={20} />
        </button>
      )}
      {page === 21 && (
        <>
          <button 
            onClick={() => setPage(1)} 
            className="bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-full font-black uppercase text-white shadow-lg transition-all"
          >
            Home
          </button>
          <button 
            className="bg-black hover:bg-gray-900 px-6 py-3 rounded-full font-black uppercase text-white shadow-lg transition-all border-2 border-white/20"
          >
            Close
          </button>
        </>
      )}
    </div>
  ) : null;

  const ToolBoard = ({ title, tools }: { title: string; tools: string[] }) => (
    <div className="min-h-screen bg-black text-white p-6 pb-32">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-black uppercase text-purple-500 mb-12">{title} BOARD</h1>
        <div className="grid grid-cols-2 gap-4">
          {tools.map((tool, i) => (
            <div 
              key={i} 
              className="bg-gray-900/50 border-2 border-purple-900/30 rounded-xl p-4 flex items-center gap-3 hover:border-purple-600 hover:bg-gray-900 transition-all cursor-pointer"
            >
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

      {/* PAGE 1: HOME */}
      {page === 1 && (
        <div className="relative h-screen overflow-hidden">
          <video 
            ref={videoRef} 
            className="absolute inset-0 w-full h-full object-cover" 
            src="background__2_.mp4" 
            loop 
            muted 
            playsInline 
          />
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
              <button 
                onClick={() => setPage(2)} 
                className="bg-black border border-white/20 px-10 py-3 rounded-xl text-xl font-black text-white hover:bg-gray-900 transition shadow-2xl"
              >
                Next
              </button>
              <button 
                onClick={() => setPage(3)} 
                className="bg-black border border-white/20 px-10 py-3 rounded-xl text-xl font-black text-white hover:bg-gray-900 transition shadow-2xl"
              >
                Login
              </button>
              <button 
                onClick={() => setPage(3)} 
                className="bg-black border border-white/20 px-10 py-3 rounded-xl text-xl font-black text-white hover:bg-gray-900 transition shadow-2xl"
              >
                Register
              </button>
              <button 
                onClick={() => setPage(4)} 
                className="bg-gray-800 border border-white/20 px-10 py-3 rounded-xl text-xl font-black text-white hover:bg-gray-700 transition shadow-2xl"
              >
                Browse For Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PAGE 2: WELCOME */}
      {page === 2 && (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 flex flex-col items-center justify-center text-center px-4">
          <Sparkles size={80} className="text-purple-400 mb-8" />
          <h1 className="text-6xl md:text-8xl font-black uppercase text-white mb-6">
            MANDASTRONG'S<br/>STUDIO
          </h1>
          <p className="text-3xl md:text-5xl font-black text-purple-300 mb-4">Make Amazing Family Movies</p>
          <p className="text-3xl md:text-5xl font-black text-purple-300">& Bring Dreams To Life!</p>
        </div>
      )}

      {/* PAGE 3: LOGIN/REGISTER/PRICING */}
      {page === 3 && (
        <div className="min-h-screen bg-black p-8 pb-32 overflow-y-auto">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 mb-16">
            {/* Login */}
            <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-2 border-purple-600 rounded-3xl p-8">
              <h2 className="text-5xl font-black mb-8 text-center">Login</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2">Email</label>
                  <input 
                    type="email" 
                    placeholder="your@email.com" 
                    className="w-full bg-transparent border-2 border-purple-600 rounded-xl px-4 py-3 text-white placeholder-gray-500" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Password</label>
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    className="w-full bg-transparent border-2 border-purple-600 rounded-xl px-4 py-3 text-white placeholder-gray-500" 
                  />
                </div>
                <button className="w-full bg-purple-600 hover:bg-purple-500 py-4 rounded-xl font-black text-xl mt-6">
                  Login
                </button>
              </div>
            </div>

            {/* Register */}
            <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-2 border-purple-600 rounded-3xl p-8">
              <h2 className="text-5xl font-black mb-8 text-center">Register</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2">Name</label>
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full bg-transparent border-2 border-purple-600 rounded-xl px-4 py-3 text-white placeholder-gray-500" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Email</label>
                  <input 
                    type="email" 
                    placeholder="your@email.com" 
                    className="w-full bg-transparent border-2 border-purple-600 rounded-xl px-4 py-3 text-white placeholder-gray-500" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Password</label>
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    className="w-full bg-transparent border-2 border-purple-600 rounded-xl px-4 py-3 text-white placeholder-gray-500" 
                  />
                </div>
                <button className="w-full bg-purple-600 hover:bg-purple-500 py-4 rounded-xl font-black text-xl mt-6">
                  Create Account
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 max-w-lg mx-auto mb-8">
            <div className="flex-1 h-px bg-gray-700"></div>
            <span className="text-gray-400 font-bold">or</span>
            <div className="flex-1 h-px bg-gray-700"></div>
          </div>

          <div className="max-w-lg mx-auto mb-16">
            <button className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-black text-xl flex items-center justify-center gap-2">
              <Eye size={24} /> Browse as Guest (View Only)
            </button>
            <p className="text-center text-gray-400 text-sm mt-4">Explore the platform without an account</p>
          </div>

          {/* Pricing */}
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-black text-center mb-10">Select Your Plan</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: 'Basic', price: '20', features: ['HD Export', '100 AI Tools', 'Basic Templates', '10GB Storage', 'Email Support'] },
                { name: 'Pro', price: '30', features: ['4K Export', '300 AI Tools', 'Premium Templates', '100GB Storage', 'Priority Support', 'Commercial License'], popular: true },
                { name: 'Studio', price: '50', features: ['8K Export', 'All 600 AI Tools', 'Unlimited Templates', '1TB Storage', '24/7 Live Support', 'Full Commercial Rights', 'Team Collaboration'] }
              ].map((plan, i) => (
                <div 
                  key={i} 
                  onClick={() => setSelectedPlan(plan.name.toLowerCase())} 
                  className={`bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-4 rounded-3xl p-8 transition-all cursor-pointer ${
                    selectedPlan === plan.name.toLowerCase() || plan.popular ? 'border-yellow-400 scale-105' : 'border-purple-900'
                  } ${plan.popular ? 'relative' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 px-4 py-1 rounded-full text-sm font-black">
                      POPULAR
                    </div>
                  )}
                  <h3 className="text-3xl font-black mb-4">{plan.name}</h3>
                  <div className="text-5xl font-black mb-6">
                    ${plan.price}<span className="text-2xl">/mo</span>
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check size={20} className="text-purple-400 flex-shrink-0" /> 
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {plan.popular && selectedPlan === plan.name.toLowerCase() && (
                    <div className="text-yellow-400 font-black text-center mt-6 flex items-center justify-center gap-2">
                      <Check size={20} /> SELECTED
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <button className="bg-purple-600 hover:bg-purple-500 px-16 py-5 rounded-xl font-black text-2xl uppercase">
                Continue to Payment
              </button>
              <p className="text-gray-400 mt-4">Secure payment powered by Stripe</p>
            </div>
          </div>
        </div>
      )}

      {/* PAGE 4: AI TOOL BOARD HUB */}
      {page === 4 && (
        <div className="min-h-screen bg-black p-8 pb-32">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-12">
              <h1 className="text-6xl font-black uppercase text-purple-500">AI TOOL BOARD</h1>
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
                <div 
                  key={board.page} 
                  onClick={() => setPage(board.page)} 
                  className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-2 border-purple-600 rounded-2xl p-8 hover:border-purple-400 hover:scale-105 transition-all cursor-pointer text-center"
                >
                  <div className="text-6xl mb-4">{board.icon}</div>
                  <h3 className="text-2xl font-black mb-2">{board.title}</h3>
                  <p className="text-purple-300">{board.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PAGES 5-9: TOOL BOARDS */}
      {page === 5 && <ToolBoard title="WRITING" tools={TOOL_BOARDS.Writing} />}
      {page === 6 && <ToolBoard title="VOICE" tools={TOOL_BOARDS.Voice} />}
      {page === 7 && <ToolBoard title="IMAGE" tools={TOOL_BOARDS.Image} />}
      {page === 8 && <ToolBoard title="VIDEO" tools={TOOL_BOARDS.Video} />}
      {page === 9 && <ToolBoard title="MOTION" tools={TOOL_BOARDS.Motion} />}

      {/* PAGE 10: EDITOR'S CHOICE */}
      {page === 10 && (
        <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 flex flex-col items-center justify-center p-8 pb-32">
          <div className="w-full max-w-5xl bg-gray-900/80 rounded-3xl p-12 border-4 border-gray-700 flex flex-col items-center justify-center min-h-[600px]">
            <Film size={120} className="text-gray-600 mb-6" />
            <h2 className="text-4xl font-black text-gray-400 mb-4">No Movies Yet</h2>
            <p className="text-gray-500 text-xl">Check back soon for new content</p>
          </div>
        </div>
      )}

      {/* PAGE 11: EDITING BOARD */}
      {page === 11 && <ToolBoard title="EDITING" tools={TOOL_BOARDS.Editing} />}

      {/* PAGE 12: EDITOR SUITE */}
      {page === 12 && (
        <div className="min-h-screen bg-black pb-32">
          {/* Top Navigation Tabs */}
          <div className="bg-gray-900/50 border-b border-gray-800 px-8 py-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-gray-400">Editor Suite</span>
            </div>
            <div className="flex gap-4 text-sm font-bold">
              <button 
                onClick={() => setEditorTab('home')}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${editorTab === 'home' ? 'bg-purple-600' : 'hover:bg-gray-800'}`}
              >
                <Home size={16} /> Editor Home
              </button>
              <button 
                onClick={() => setEditorTab('library')}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${editorTab === 'library' ? 'bg-purple-600' : 'hover:bg-gray-800'}`}
              >
                <Database size={16} /> Media Library
              </button>
              <button 
                onClick={() => setEditorTab('timeline')}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${editorTab === 'timeline' ? 'bg-purple-600' : 'hover:bg-gray-800'}`}
              >
                <Film size={16} /> Timeline
              </button>
              <button 
                onClick={() => setEditorTab('audio')}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${editorTab === 'audio' ? 'bg-purple-600' : 'hover:bg-gray-800'}`}
              >
                <Headphones size={16} /> Audio Mixer
              </button>
              <button 
                onClick={() => setEditorTab('settings')}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${editorTab === 'settings' ? 'bg-purple-600' : 'hover:bg-gray-800'}`}
              >
                <Settings size={16} /> Settings
              </button>
            </div>
          </div>

          <div className="p-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-6xl font-black uppercase text-purple-500 mb-2">EDITOR SUITE</h1>
                  <p className="text-gray-400">Professional-Grade Video Editing Platform</p>
                </div>
                <div className="flex gap-4">
                  <button className="bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-xl font-bold flex items-center gap-2">
                    <ChevronLeft size={20} /> My Projects
                  </button>
                  <button className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-bold flex items-center gap-2">
                    <Upload size={20} /> Upload Media
                  </button>
                </div>
              </div>

              {/* Feature Cards */}
              <div className="grid grid-cols-2 gap-6 mb-12">
                {[
                  { icon: Film, title: "Video Editor", desc: "Multi-track timeline with professional editing tools" },
                  { icon: Music, title: "Audio Mixer", desc: "Professional audio mixing and effects suite" },
                  { icon: Palette, title: "Color Grading", desc: "Advanced color correction and grading workspace" },
                  { icon: Layers, title: "Effects Library", desc: "Thousands of transitions, effects, and filters" },
                  { icon: Zap, title: "Precision Tools", desc: "Frame-accurate cutting and trimming" },
                  { icon: Sparkles, title: "AI Enhancement", desc: "AI-powered upscaling and enhancement" },
                ].map((item, i) => (
                  <div 
                    key={i} 
                    className="bg-gray-900/50 border-2 border-purple-900/30 rounded-2xl p-6 hover:border-purple-600 transition-all cursor-pointer"
                  >
                    <item.icon size={40} className="text-purple-500 mb-4" />
                    <h3 className="text-2xl font-black mb-2">{item.title}</h3>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* Ready to Create */}
              <div className="bg-purple-900/20 border-2 border-purple-600/30 rounded-2xl p-8 text-center mb-8">
                <h2 className="text-3xl font-black mb-4">Ready to Create?</h2>
                <p className="text-gray-300 mb-6">
                  Upload your media files and jump into our complete suite of professional editing tools!
                </p>
                <div className="flex gap-4 justify-center">
                  <button className="bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-xl font-black uppercase">
                    Media Library
                  </button>
                  <button className="bg-purple-600 hover:bg-purple-500 px-8 py-4 rounded-xl font-black uppercase">
                    Timeline Editor
                  </button>
                </div>
                <p className="text-gray-400 text-sm mt-4">
                  Upload media, edit on timeline, and export your masterpiece
                </p>
              </div>

              {/* Duration Control */}
              <div className="bg-gray-900/50 border-2 border-purple-900/30 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <Clock size={32} className="text-purple-500" />
                  <h3 className="text-3xl font-black">Set Movie Duration</h3>
                </div>
                <div className="text-center mb-6">
                  <div className="text-7xl font-black text-purple-500 mb-2">{duration}</div>
                  <div className="text-xl font-black text-purple-400">MINUTES</div>
                  <div className="text-gray-400">({Math.floor(duration / 60)}h {duration % 60}m)</div>
                </div>
                <div className="flex gap-4 mb-6">
                  {[30, 60, 90, 120].map((min) => (
                    <button 
                      key={min} 
                      onClick={() => setDuration(min)} 
                      className={`flex-1 py-3 rounded-xl font-black ${
                        duration === min ? 'bg-purple-600' : 'bg-gray-800 hover:bg-gray-700'
                      }`}
                    >
                      {min} min
                    </button>
                  ))}
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="240" 
                  value={duration} 
                  onChange={(e) => setDuration(parseInt(e.target.value))} 
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-600" 
                />
                <div className="flex justify-between text-sm text-gray-400 mt-2">
                  <span>0 min</span>
                  <span>240 min (4 hours)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PAGE 13: TIMELINE */}
      {page === 13 && (
        <div className="min-h-screen bg-black pb-32">
          {/* Top Nav */}
          <div className="bg-gray-900/50 border-b border-gray-800 px-8 py-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-gray-400">Editor Suite</span>
            </div>
            <div className="flex gap-4 text-sm font-bold">
              <button className="px-4 py-2 hover:bg-gray-800 rounded-lg flex items-center gap-2">
                <Home size={16} /> Editor Home
              </button>
              <button className="px-4 py-2 hover:bg-gray-800 rounded-lg flex items-center gap-2">
                <Database size={16} /> Media Library
              </button>
              <button className="px-4 py-2 bg-purple-600 rounded-lg flex items-center gap-2">
                <Film size={16} /> Timeline
              </button>
              <button className="px-4 py-2 hover:bg-gray-800 rounded-lg flex items-center gap-2">
                <Headphones size={16} /> Audio Mixer
              </button>
              <button className="px-4 py-2 hover:bg-gray-800 rounded-lg flex items-center gap-2">
                <Settings size={16} /> Settings
              </button>
            </div>
          </div>

          <div className="flex h-[calc(100vh-200px)]">
            {/* Media Library Sidebar */}
            <div className="w-64 bg-gray-900/50 border-r border-gray-800 p-4 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-black uppercase text-purple-400 text-sm">MEDIA LIBRARY</h3>
                <button className="text-purple-400 hover:text-purple-300">
                  <Upload size={18} />
                </button>
              </div>
              <div className="space-y-2">
                {[
                  "packageDTSBext.mp4",
                  "AI Generated Movie.mp4",
                  "rendered-video.mp4",
                  "Movie Prompt.MP4",
                  "DTSB.MP4",
                  "final_movie.mp4"
                ].map((file, i) => (
                  <div 
                    key={i} 
                    className="bg-gray-800/50 p-2 rounded text-xs hover:bg-gray-800 cursor-pointer"
                  >
                    <div className="font-bold text-white truncate">{file}</div>
                    <div className="text-gray-400">video</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Preview Window */}
            <div className="flex-1 flex items-center justify-center bg-black">
              <div className="text-center">
                <div className="w-32 h-32 bg-purple-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play size={48} className="text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-400">Video Preview Window</h3>
                <p className="text-gray-500">Select a video to preview</p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-gray-900/50 border-t-2 border-purple-600 p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-black uppercase text-purple-400">MULTI-TRACK TIMELINE</h3>
              <div className="flex items-center gap-2">
                <button className="bg-purple-600 hover:bg-purple-500 p-2 rounded">
                  <Play size={20} />
                </button>
                <span className="text-sm text-gray-400">0 clips</span>
              </div>
            </div>
            <div className="space-y-2">
              {['VIDEO 1', 'AUDIO 1', 'TEXT 1'].map((track, i) => (
                <div 
                  key={i} 
                  className="bg-gray-800/50 rounded-lg p-3 flex items-center justify-between"
                >
                  <span className="font-bold text-purple-400 text-sm">{track}</span>
                  <button className="text-purple-400 hover:text-purple-300 text-2xl">+</button>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-500 text-sm mt-4">
              Select or drag a media file from the library to add it to the timeline
            </p>
          </div>

          {/* Duration Slider */}
          <div className="bg-black p-6 border-t border-gray-800">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-4">
                <Clock size={24} className="text-purple-500" />
                <h3 className="text-xl font-black">Movie Duration</h3>
              </div>
              <div className="text-center mb-4">
                <div className="text-5xl font-black text-purple-500">{duration}</div>
                <div className="text-sm font-bold text-purple-400">MINUTES</div>
              </div>
              <input 
                type="range" 
                min="0" 
                max="180" 
                value={duration} 
                onChange={(e) => setDuration(parseInt(e.target.value))} 
                className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-600" 
              />
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>0 min</span>
                <span>180 min (3h)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PAGE 14: AUDIO MIXER */}
      {page === 14 && (
        <div className="min-h-screen bg-black pb-32">
          {/* Top Nav */}
          <div className="bg-gray-900/50 border-b border-gray-800 px-8 py-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-gray-400">Editor Suite</span>
            </div>
            <div className="flex gap-4 text-sm font-bold">
              <button className="px-4 py-2 hover:bg-gray-800 rounded-lg flex items-center gap-2">
                <Home size={16} /> Editor Home
              </button>
              <button className="px-4 py-2 hover:bg-gray-800 rounded-lg flex items-center gap-2">
                <Database size={16} /> Media Library
              </button>
              <button className="px-4 py-2 hover:bg-gray-800 rounded-lg flex items-center gap-2">
                <Film size={16} /> Timeline
              </button>
              <button className="px-4 py-2 bg-purple-600 rounded-lg flex items-center gap-2">
                <Headphones size={16} /> Audio Mixer
              </button>
              <button className="px-4 py-2 hover:bg-gray-800 rounded-lg flex items-center gap-2">
                <Settings size={16} /> Settings
              </button>
            </div>
          </div>

          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-black mb-2">AUDIO MIXER</h1>
                <p className="text-gray-400 text-sm">Rendered Video 12/30/2025, 7:25:44 AM</p>
              </div>
              <div className="flex gap-3">
                <button className="bg-purple-600 hover:bg-purple-500 px-6 py-2 rounded-lg font-bold flex items-center gap-2">
                  <ChevronLeft size={20} /> Back
                </button>
                <button className="bg-purple-600 hover:bg-purple-500 px-6 py-2 rounded-lg font-bold flex items-center gap-2">
                  Next <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-purple-400">PROFESSIONAL AUDIO MIXER</h2>
              <button className="bg-purple-600 hover:bg-purple-500 px-6 py-2 rounded-lg font-bold flex items-center gap-2">
                <Download size={20} /> Save Settings
              </button>
            </div>

            {/* Mixer Channels */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              {[
                { name: 'MUSIC', icon: Music, volume: 75 },
                { name: 'VOICE', icon: Mic, volume: 50 },
                { name: 'SFX', icon: Volume2, volume: 65 },
                { name: 'MASTER', icon: Zap, volume: volume, isMaster: true }
              ].map((channel, i) => (
                <div 
                  key={i} 
                  className={`bg-gray-900/50 rounded-2xl p-6 ${
                    channel.isMaster ? 'border-2 border-purple-600' : 'border-2 border-purple-900/30'
                  }`}
                >
                  <div className="text-center mb-4">
                    <channel.icon size={32} className="mx-auto mb-2 text-purple-400" />
                    <h3 className="font-black">{channel.name}</h3>
                  </div>
                  
                  {/* Gradient Bar */}
                  <div 
                    className="h-48 bg-gradient-to-t from-purple-600 to-purple-400 rounded-lg mb-4"
                    style={{ opacity: channel.volume / 100 }}
                  ></div>
                  
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={channel.volume} 
                    onChange={(e) => channel.isMaster && setVolume(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-600 mb-2" 
                  />
                  
                  <div className="text-center font-black text-lg mb-4">{channel.volume}%</div>
                  
                  {!channel.isMaster ? (
                    <div className="flex gap-2">
                      <button className="flex-1 bg-gray-800 hover:bg-gray-700 py-2 rounded text-xs font-bold">
                        MUTE
                      </button>
                      <button className="flex-1 bg-gray-800 hover:bg-gray-700 py-2 rounded text-xs font-bold">
                        SOLO
                      </button>
                    </div>
                  ) : (
                    <button className="w-full bg-purple-600 hover:bg-purple-500 py-2 rounded font-black">
                      OUTPUT
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Audio Effects */}
            <h3 className="text-xl font-black text-purple-400 mb-4">AUDIO EFFECTS</h3>
            <div className="grid grid-cols-4 gap-4">
              {['Reverb', 'Echo', 'Compressor', 'Equalizer'].map((effect) => (
                <button 
                  key={effect} 
                  className="bg-gray-800 hover:bg-gray-700 py-3 rounded-xl font-bold"
                >
                  {effect}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PAGE 15: SETTINGS */}
      {page === 15 && (
        <div className="min-h-screen bg-black pb-32">
          {/* Top Nav */}
          <div className="bg-gray-900/50 border-b border-gray-800 px-8 py-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-gray-400">Editor Suite</span>
            </div>
            <div className="flex gap-4 text-sm font-bold">
              <button className="px-4 py-2 hover:bg-gray-800 rounded-lg flex items-center gap-2">
                <Home size={16} /> Editor Home
              </button>
              <button className="px-4 py-2 hover:bg-gray-800 rounded-lg flex items-center gap-2">
                <Database size={16} /> Media Library
              </button>
              <button className="px-4 py-2 hover:bg-gray-800 rounded-lg flex items-center gap-2">
                <Film size={16} /> Timeline
              </button>
              <button className="px-4 py-2 hover:bg-gray-800 rounded-lg flex items-center gap-2">
                <Headphones size={16} /> Audio Mixer
              </button>
              <button className="px-4 py-2 bg-purple-600 rounded-lg flex items-center gap-2">
                <Settings size={16} /> Settings
              </button>
            </div>
          </div>

          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-4xl font-black">SETTINGS & CONFIGURATION</h1>
              <div className="flex gap-3">
                <button className="bg-purple-600 hover:bg-purple-500 px-6 py-2 rounded-lg font-bold flex items-center gap-2">
                  <ChevronLeft size={20} /> Back
                </button>
                <button className="bg-purple-600 hover:bg-purple-500 px-6 py-2 rounded-lg font-bold flex items-center gap-2">
                  Next <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <div className="max-w-4xl space-y-8">
              {/* Video Settings */}
              <div className="bg-gray-900/50 border-2 border-purple-600/30 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Settings size={24} className="text-purple-400" />
                  <h2 className="text-2xl font-black text-purple-400">Video Settings</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold mb-2">Movie Title</label>
                    <input 
                      type="text" 
                      defaultValue="My Awesome Movie" 
                      className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg px-4 py-3 text-white" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold mb-2">Resolution</label>
                      <select className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg px-4 py-3 text-white">
                        <option>1920x1080 (Full HD)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2">Frame Rate</label>
                      <select className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg px-4 py-3 text-white">
                        <option>30 fps</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Aspect Ratio</label>
                    <select className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg px-4 py-3 text-white">
                      <option>16:9 (Widescreen)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Color Grading */}
              <div className="bg-gray-900/50 border-2 border-purple-600/30 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Sliders size={24} className="text-purple-400" />
                  <h2 className="text-2xl font-black text-purple-400">Color Grading Workspace</h2>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  {['Exposure', 'Contrast', 'Highlights', 'Shadows', 'Saturation', 'Vibrance'].map((slider) => (
                    <div key={slider}>
                      <label className="text-sm font-bold mb-2 block">{slider}</label>
                      <input 
                        type="range" 
                        className="w-full accent-blue-600" 
                        defaultValue="0" 
                        min="-100" 
                        max="100" 
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>-100</span>
                        <span>0</span>
                        <span>+100</span>
                      </div>
                    </div>
                  ))}
                  {/* Temperature */}
                  <div>
                    <label className="text-sm font-bold mb-2 block">Temperature</label>
                    <input 
                      type="range" 
                      className="w-full accent-blue-600" 
                      defaultValue="0" 
                      min="-100" 
                      max="100" 
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>-100</span>
                      <span>0</span>
                      <span>+100</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Export Preferences */}
              <div className="bg-gray-900/50 border-2 border-purple-600/30 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <FileVideo size={24} className="text-purple-400" />
                  <h2 className="text-2xl font-black text-purple-400">Export Preferences</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold mb-2">Default Export Format</label>
                    <select className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg px-4 py-3 text-white">
                      <option>MP4 (H.264)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Quality Preset</label>
                    <select className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg px-4 py-3 text-white">
                      <option>Maximum Quality</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Bitrate (Mbps)</label>
                    <input 
                      type="number" 
                      defaultValue="20" 
                      className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg px-4 py-3 text-white" 
                    />
                  </div>
                </div>
              </div>

              {/* Auto-Save */}
              <div className="bg-gray-900/50 border-2 border-purple-600/30 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Database size={24} className="text-purple-400" />
                  <h2 className="text-2xl font-black text-purple-400">Auto-Save & Backup</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked className="w-5 h-5 accent-purple-600" />
                    <label className="font-bold">Enable Auto-Save</label>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Auto-Save Interval</label>
                    <select className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg px-4 py-3 text-white">
                      <option>Every 5 minutes</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked className="w-5 h-5 accent-purple-600" />
                    <label className="font-bold">Create Backup Files</label>
                  </div>
                </div>
              </div>

              {/* Movie Duration */}
              <div className="bg-gray-900/50 border-2 border-purple-600/30 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Clock size={24} className="text-purple-400" />
                  <h2 className="text-2xl font-black text-purple-400">Movie Duration</h2>
                </div>
                <div className="text-center mb-4">
                  <div className="text-6xl font-black text-purple-500">{duration}</div>
                  <div className="text-lg font-bold text-purple-400">MINUTES</div>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="180" 
                  value={duration} 
                  onChange={(e) => setDuration(parseInt(e.target.value))} 
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-600" 
                />
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>0 min</span>
                  <span>180 min</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PAGE 16: EXPORT CENTER */}
      {page === 16 && (
        <div className="min-h-screen bg-black p-8 pb-32">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-black">EXPORT CENTER</h1>
              <p className="text-gray-400">Ready to export your movie</p>
            </div>
            <div className="flex gap-3">
              <button className="bg-purple-600 hover:bg-purple-500 px-6 py-2 rounded-lg font-bold flex items-center gap-2">
                <ChevronLeft size={20} /> Back
              </button>
              <button className="bg-purple-600 hover:bg-purple-500 px-6 py-2 rounded-lg font-bold flex items-center gap-2">
                Next <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 mb-12">
            {/* Export Settings */}
            <div className="bg-gray-900/50 border-2 border-purple-600/30 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <FileVideo size={24} className="text-purple-400" />
                <h2 className="text-2xl font-black text-purple-400">Export Settings</h2>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-bold mb-2">Resolution</label>
                <div className="grid grid-cols-3 gap-2">
                  <button className="bg-purple-600 py-3 rounded-xl font-black text-sm">
                    4K<br/><span className="text-xs font-normal">3840x2160</span>
                  </button>
                  <button className="bg-gray-800 hover:bg-gray-700 py-3 rounded-xl font-bold text-sm">
                    1080p
                  </button>
                  <button className="bg-gray-800 hover:bg-gray-700 py-3 rounded-xl font-bold text-sm">
                    720p
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-bold mb-2">Export Format</label>
                <select className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg px-4 py-3 text-white">
                  <option>MP4 (H.264)</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-bold mb-2">Quality</label>
                <div className="grid grid-cols-3 gap-2">
                  <button className="bg-purple-600 py-3 rounded-xl font-black">High</button>
                  <button className="bg-gray-800 hover:bg-gray-700 py-3 rounded-xl font-bold">Medium</button>
                  <button className="bg-gray-800 hover:bg-gray-700 py-3 rounded-xl font-bold">Low</button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Frame Rate</label>
                <select className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg px-4 py-3 text-white">
                  <option>60 fps</option>
                </select>
              </div>
            </div>

            {/* Render Status */}
            <div className="bg-gray-900/50 border-2 border-purple-600/30 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
              <h2 className="text-2xl font-black text-purple-400 mb-8">Render Status</h2>
              
              <div className="w-32 h-32 bg-purple-900/50 rounded-2xl flex items-center justify-center mb-6">
                <Film size={64} className="text-purple-400" />
              </div>
              
              <h3 className="text-3xl font-black mb-4">Ready to Render</h3>
              <p className="text-gray-400 mb-8">Your movie is ready to be exported</p>
              
              <button className="bg-purple-600 hover:bg-purple-500 px-12 py-4 rounded-xl font-black text-xl">
                Start Rendering
              </button>
            </div>
          </div>

          {/* Duration */}
          <div className="bg-gray-900/50 border-2 border-purple-600/30 rounded-2xl p-8 max-w-4xl mx-auto mb-12">
            <div className="flex items-center gap-4 mb-6">
              <Clock size={32} className="text-purple-500" />
              <h3 className="text-3xl font-black">Movie Duration</h3>
            </div>
            <div className="text-center mb-6">
              <div className="text-7xl font-black text-purple-500 mb-2">{duration}</div>
              <div className="text-xl font-black text-purple-400">MINUTES</div>
            </div>
            <input 
              type="range" 
              min="0" 
              max="180" 
              value={duration} 
              onChange={(e) => setDuration(parseInt(e.target.value))} 
              className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-600" 
            />
            <div className="flex justify-between text-sm text-gray-400 mt-2">
              <span>0 min</span>
              <span>180 min</span>
            </div>
          </div>

          {/* Social Media Share */}
          <div className="bg-purple-900/20 border-2 border-purple-600/30 rounded-2xl p-8 max-w-4xl mx-auto">
            <h2 className="text-3xl font-black text-center mb-6">Share To Social Media</h2>
            <div className="grid grid-cols-6 gap-4">
              {[
                { name: 'YouTube', icon: Youtube },
                { name: 'X', icon: Twitter },
                { name: 'Instagram', icon: Instagram },
                { name: 'TikTok', icon: Music },
                { name: 'Vimeo', icon: Video },
                { name: 'Facebook', icon: Facebook }
              ].map((platform, i) => (
                <button 
                  key={i} 
                  className="bg-purple-600 hover:bg-purple-500 p-6 rounded-xl flex flex-col items-center gap-2 transition-all hover:scale-105"
                >
                  <platform.icon size={32} />
                  <span className="text-xs font-bold">{platform.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PAGE 17: TUTORIALS */}
      {page === 17 && (
        <div className="min-h-screen bg-black p-8 pb-32">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-black">TUTORIALS & LEARNING CENTER</h1>
            <div className="flex gap-3">
              <button className="bg-purple-600 hover:bg-purple-500 px-6 py-2 rounded-lg font-bold flex items-center gap-2">
                <ChevronLeft size={20} /> Back
              </button>
              <button className="bg-purple-600 hover:bg-purple-500 px-6 py-2 rounded-lg font-bold flex items-center gap-2">
                Next <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Video Player */}
            <div>
              <div className="bg-black rounded-xl border-2 border-gray-700 aspect-video flex items-center justify-center mb-4">
                <div className="text-center">
                  <div className="w-24 h-24 bg-purple-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play size={40} className="text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-bold">Tutorial Video Player</h3>
                  <p className="text-gray-500">Select a tutorial to begin learning</p>
                </div>
              </div>
              
              <div className="bg-gray-900/50 border-2 border-purple-600/30 rounded-xl p-6">
                <h2 className="text-2xl font-black mb-4">Getting Started with MandaStrong Studio</h2>
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-purple-600 px-3 py-1 rounded-full font-bold text-sm">Beginner</span>
                  <span className="text-gray-400">⏱️ 5:30</span>
                </div>
                <p className="text-gray-300">
                  Welcome to MandaStrong Studio! This tutorial shows you how to access the editor suite 
                  instantly and explore all the professional features available to you.
                </p>
              </div>
            </div>

            {/* Tutorial Library */}
            <div>
              <div className="bg-purple-900/20 border-2 border-purple-600/30 rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen size={24} className="text-purple-400" />
                  <h3 className="text-xl font-black">Tutorial Library</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { title: "Getting Started with MandaStrong Studio", duration: "5:30", level: "Beginner", active: true },
                    { title: "Multi-Track Timeline Editing", duration: "12:45", level: "Intermediate" },
                    { title: "Professional Color Grading Techniques", duration: "18:20", level: "Advanced" },
                    { title: "Audio Mixing & Mastering", duration: "15:10", level: "Intermediate" },
                    { title: "Creating Stunning Visual Effects", duration: "22:35", level: "Advanced" },
                    { title: "Export Settings for Social Media", duration: "8:15", level: "Beginner" }
                  ].map((tutorial, i) => (
                    <div 
                      key={i} 
                      className={`p-4 rounded-xl cursor-pointer transition ${
                        tutorial.active ? 'bg-purple-600' : 'bg-gray-800/50 hover:bg-gray-800'
                      }`}
                    >
                      <h4 className="font-bold text-sm mb-2">{tutorial.title}</h4>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-gray-400">⏱️ {tutorial.duration}</span>
                        <span className={`px-2 py-0.5 rounded-full ${
                          tutorial.level === 'Beginner' ? 'bg-green-600' :
                          tutorial.level === 'Intermediate' ? 'bg-purple-600' : 'bg-red-600'
                        }`}>
                          {tutorial.level}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Start Guide */}
              <div className="bg-purple-900/20 border-2 border-purple-600/30 rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Zap size={24} className="text-purple-400" />
                  <h3 className="text-xl font-black">Quick Start Guide</h3>
                </div>
                <ol className="space-y-3 text-sm">
                  <li className="flex gap-3">
                    <span className="font-black text-purple-400">1.</span>
                    <span>Click "Launch Editor Suite" to access all editing tools instantly</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-black text-purple-400">2.</span>
                    <span>Explore the timeline, effects, and color grading features</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-black text-purple-400">3.</span>
                    <span>Start editing and creating videos with the full suite</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-black text-purple-400">4.</span>
                    <span>Export and render your finished videos seamlessly</span>
                  </li>
                </ol>
              </div>

              {/* Learning Paths */}
              <div className="bg-gray-900/50 border-2 border-purple-600/30 rounded-2xl p-6 mb-6">
                <h3 className="text-lg font-black mb-4">Learning Paths</h3>
                <div className="space-y-2">
                  <button className="w-full bg-purple-600 hover:bg-purple-500 py-3 rounded-lg font-bold text-left px-4">
                    Complete Beginner Course
                  </button>
                  <button className="w-full bg-gray-800 hover:bg-gray-700 py-3 rounded-lg font-bold text-left px-4">
                    Professional Editing Mastery
                  </button>
                  <button className="w-full bg-gray-800 hover:bg-gray-700 py-3 rounded-lg font-bold text-left px-4">
                    Color Grading Specialist
                  </button>
                  <button className="w-full bg-gray-800 hover:bg-gray-700 py-3 rounded-lg font-bold text-left px-4">
                    Audio Production Expert
                  </button>
                </div>
              </div>

              {/* Help Desk Link */}
              <div className="bg-purple-900/20 border-2 border-purple-600/30 rounded-2xl p-6 text-center">
                <h3 className="text-xl font-black mb-2">Need Help?</h3>
                <p className="text-gray-300 text-sm mb-4">Chat with Agent Grok for instant assistance</p>
                <button 
                  onClick={() => setPage(19)}
                  className="w-full bg-white hover:bg-gray-100 text-purple-600 py-3 rounded-lg font-black"
                >
                  Open Help Desk
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PAGE 18: TERMS OF SERVICE */}
      {page === 18 && (
        <div className="min-h-screen bg-black p-8 pb-32">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-black">TERMS OF SERVICE & DISCLAIMER</h1>
            <div className="flex gap-3">
              <button className="bg-purple-600 hover:bg-purple-500 px-6 py-2 rounded-lg font-bold flex items-center gap-2">
                <ChevronLeft size={20} /> Back
              </button>
              <button className="bg-purple-600 hover:bg-purple-500 px-6 py-2 rounded-lg font-bold flex items-center gap-2">
                Next <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="bg-purple-900/30 border-2 border-purple-600 rounded-2xl p-8 mb-8 text-center">
              <Shield size={64} className="mx-auto mb-4 text-purple-400" />
              <h2 className="text-4xl font-black mb-4">Legal Agreement</h2>
              <p className="text-gray-300">Please read carefully before using MandaStrong Studio</p>
            </div>

            {/* Terms Content */}
            <div className="bg-gray-900/50 border-2 border-purple-900/30 rounded-2xl p-8 space-y-6">
              {/* Terms of Use */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen size={24} className="text-purple-400" />
                  <h3 className="text-2xl font-black text-purple-400">Terms of Use</h3>
                </div>
                <p className="text-gray-300 mb-4">
                  Welcome to MandaStrong Studio. By accessing and using this application, you agree to be 
                  bound by these Terms of Service. If you do not agree to these terms, please do not use the application.
                </p>
                <div className="space-y-3 text-sm text-gray-300">
                  <p>
                    <strong className="text-purple-400">1. Acceptance of Terms:</strong> By creating an account 
                    or using MandaStrong Studio, you acknowledge that you have read, understood, and agree to be 
                    bound by these Terms of Service and our Privacy Policy.
                  </p>
                  <p>
                    <strong className="text-purple-400">2. License Grant:</strong> We grant you a limited, 
                    non-exclusive, non-transferable, revocable license to use MandaStrong Studio for personal 
                    or commercial video creation purposes in accordance with these terms.
                  </p>
                  <p>
                    <strong className="text-purple-400">3. User Responsibilities:</strong> You are responsible 
                    for maintaining the security of your account and for all activities that occur under your 
                    account. You agree not to use the service for any unlawful purposes.
                  </p>
                </div>
              </div>

              {/* Privacy Policy */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Shield size={24} className="text-purple-400" />
                  <h3 className="text-2xl font-black text-purple-400">Privacy Policy</h3>
                </div>
                <div className="space-y-3 text-sm text-gray-300">
                  <p>
                    <strong className="text-purple-400">Data Collection:</strong> We collect information you 
                    provide directly to us, including your name, email address, and any content you create or 
                    upload to the platform. We use this information to provide, maintain, and improve our services.
                  </p>
                  <p>
                    <strong className="text-purple-400">Data Security:</strong> We implement appropriate technical 
                    and organizational measures to protect your personal information against unauthorized access, 
                    alteration, disclosure, or destruction.
                  </p>
                  <p>
                    <strong className="text-purple-400">Data Sharing:</strong> We do not sell your personal 
                    information. We may share your information with service providers who assist us in operating 
                    our platform, subject to strict confidentiality requirements.
                  </p>
                </div>
              </div>

              {/* Checkbox & Buttons */}
              <div className="pt-6 border-t border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                  <input 
                    type="checkbox" 
                    id="terms-agree" 
                    className="w-5 h-5 accent-purple-600" 
                  />
                  <label htmlFor="terms-agree" className="text-sm">
                    I have read and agree to the Terms of Service and Privacy Policy
                  </label>
                </div>
                
                <div className="flex gap-4">
                  <button className="flex-1 bg-purple-600 hover:bg-purple-500 py-4 rounded-xl font-black">
                    Accept & Continue
                  </button>
                  <button className="flex-1 bg-gray-800 hover:bg-gray-700 py-4 rounded-xl font-black">
                    Decline
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PAGE 19: HELP DESK */}
      {page === 19 && (
        <div className="min-h-screen bg-black p-8 pb-32">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-black flex items-center gap-4">
              <MessageCircle size={48} className="text-purple-500" />
              AGENT GROK - 24/7 HELP DESK
            </h1>
            <div className="flex gap-3">
              <button className="bg-purple-600 hover:bg-purple-500 px-6 py-2 rounded-lg font-bold flex items-center gap-2">
                <ChevronLeft size={20} /> Back
              </button>
              <button className="bg-purple-600 hover:bg-purple-500 px-6 py-2 rounded-lg font-bold flex items-center gap-2">
                Next <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Chat Interface */}
            <div className="bg-gray-900/50 border-2 border-purple-600 rounded-2xl p-6">
              {/* Agent Header */}
              <div className="bg-purple-600 rounded-xl p-4 mb-6 flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <MessageCircle size={24} className="text-purple-600" />
                </div>
                <div>
                  <h3 className="font-black">Agent Grok</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs">Online & Ready to Help</span>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="bg-gray-800/50 rounded-xl p-4 h-96 overflow-y-auto mb-4">
                <div className="bg-white/10 rounded-xl p-4 mb-4 max-w-xs">
                  <p className="text-sm mb-1">
                    Hello! I'm Agent Grok, your 24/7 AI assistant. How can I help you today?
                  </p>
                  <span className="text-xs text-gray-400">Just now</span>
                </div>
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Type your question..." 
                  className="flex-1 bg-gray-800 border-2 border-gray-700 rounded-xl px-4 py-3 text-white" 
                />
                <button className="bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-xl font-black">
                  <Send size={20} />
                </button>
              </div>
            </div>

            {/* FAQs & Info */}
            <div>
              {/* FAQs */}
              <div className="bg-gray-900/50 border-2 border-purple-900/30 rounded-2xl p-6 mb-6">
                <h3 className="text-2xl font-black mb-4">Frequently Asked Questions</h3>
                <div className="space-y-3">
                  {[
                    "How do I export my video?",
                    "What video formats are supported?",
                    "How do I add text to my video?",
                    "How do I adjust audio levels?"
                  ].map((q, i) => (
                    <button 
                      key={i} 
                      className="w-full bg-gray-800/50 hover:bg-gray-800 p-3 rounded-xl text-left text-sm font-bold"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Service Status */}
              <div className="bg-gray-900/50 border-2 border-purple-900/30 rounded-2xl p-6">
                <h3 className="text-2xl font-black mb-4">Service Status</h3>
                <div className="space-y-2 text-sm">
                  {['API Services', 'Render Queue', 'File Storage'].map((service, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span>{service}</span>
                      <span className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Operational
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PAGE 20: COMMUNITY HUB */}
      {page === 20 && (
        <div className="min-h-screen bg-black p-8 pb-32">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-black">COMMUNITY HUB</h1>
            <div className="flex gap-3">
              <button className="bg-purple-600 hover:bg-purple-500 px-6 py-2 rounded-lg font-bold flex items-center gap-2">
                <ChevronLeft size={20} /> Back
              </button>
              <button className="bg-purple-600 hover:bg-purple-500 px-6 py-2 rounded-lg font-bold flex items-center gap-2">
                Next <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-4 mb-8">
            <button className="bg-purple-600 px-6 py-2 rounded-full font-bold flex items-center gap-2">
              <Clock size={16} /> Recent
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 px-6 py-2 rounded-full font-bold flex items-center gap-2">
              <TrendingUp size={16} /> Popular
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 px-6 py-2 rounded-full font-bold flex items-center gap-2">
              <Zap size={16} /> Trending
            </button>
            <button className="ml-auto bg-purple-600 hover:bg-purple-500 px-6 py-2 rounded-full font-bold flex items-center gap-2">
              <Upload size={16} /> Upload Your Creation
            </button>
          </div>

          {/* Community Posts */}
          <div className="grid md:grid-cols-2 gap-6">
            {COMMUNITY_POSTS.map((post, i) => (
              <div 
                key={i} 
                className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-2 border-purple-600/30 rounded-2xl p-6 hover:border-purple-600 transition-all cursor-pointer"
              >
                {/* Trending Badge */}
                {post.trending && (
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-black bg-purple-600 flex items-center gap-1">
                      <Zap size={14} /> Trending
                    </span>
                  </div>
                )}

                {/* Preview */}
                <div className="aspect-video bg-purple-900/50 rounded-xl mb-4 flex items-center justify-center text-6xl">
                  {post.emoji}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-black mb-4">{post.title}</h3>
                
                {/* Author */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-sm font-black">
                    {post.author[0]}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{post.author}</p>
                    <p className="text-xs text-gray-400">{post.time}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6 text-sm mb-4">
                  <div className="flex items-center gap-2">
                    <Heart size={18} className="text-red-500" />
                    <span className="font-bold">{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart size={18} className="text-red-500 fill-red-500" />
                    <span className="font-bold">{post.hearts}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle size={18} className="text-blue-400" />
                    <span className="font-bold">{post.comments}</span>
                  </div>
                </div>

                {/* Recent Comments */}
                <div className="bg-black/30 rounded-lg p-3 mb-4 space-y-2 text-xs">
                  <p className="text-gray-400">Recent comments:</p>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center text-xs font-black">
                      U
                    </div>
                    <div>
                      <span className="font-bold">User123:</span>{' '}
                      <span className="text-gray-300">Amazing work!</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center text-xs font-black">
                      C
                    </div>
                    <div>
                      <span className="font-bold">Creator456:</span>{' '}
                      <span className="text-gray-300">Love the editing style!</span>
                    </div>
                  </div>
                </div>

                {/* View Comments */}
                <button className="w-full bg-purple-600 hover:bg-purple-500 py-2 rounded-xl font-black">
                  View All Comments
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PAGE 21: THAT'S ALL FOLKS */}
      {page === 21 && (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-900 p-8 pb-32 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-7xl font-black uppercase text-purple-400 text-center mb-12">
              THAT'S ALL FOLKS!
            </h1>
            
            {/* Thank You */}
            <div className="bg-purple-900/30 border-2 border-purple-600/30 rounded-3xl p-10 mb-8">
              <h2 className="text-4xl font-black mb-6">A Special Thank You</h2>
              <p className="text-lg leading-relaxed mb-4">
                To all current and future creators, dreamers, and storytellers...
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                Your creativity and passion inspire positive change in the world. Through your films and 
                stories, you have the power to educate, inspire, and bring awareness to critical issues.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Together, we are building a community of creators who use their talents to spread kindness, 
                understanding, and hope. Your impact matters more than you know.
              </p>
            </div>

            {/* User Guide */}
            <div className="bg-blue-900/20 border-2 border-blue-600/30 rounded-2xl p-8 mb-8 text-center">
              <BookOpen size={48} className="mx-auto mb-4 text-blue-400" />
              <h3 className="text-3xl font-black mb-3">Full User Guide To MandaStrong Studio</h3>
              <p className="text-gray-300 mb-6">Click to access the complete guide</p>
              <button className="bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-xl font-black">
                Open User Guide
              </button>
            </div>

            {/* Mission */}
            <div className="bg-purple-900/30 border-2 border-purple-600/30 rounded-3xl p-10 mb-8">
              <h2 className="text-4xl font-black mb-6">About Our Mission</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                <strong>MandaStrong Studio</strong> is more than a filmmaking platform. It's part of a 
                comprehensive educational initiative designed to bring awareness to bullying prevention, 
                social skills development, and the cultivation of humanity in our communities.
              </p>

              <div className="bg-purple-800/30 border-2 border-purple-600/30 rounded-2xl p-6 mb-6">
                <h3 className="text-2xl font-black mb-4">Supporting Our Heroes</h3>
                <p className="text-gray-200 mb-4">
                  <strong>All Etsy Store Proceeds Benefit Veterans Mental Health Services ~</strong> 100% of 
                  proceeds are donated to <strong>Veterans Mental Health Services</strong>.
                </p>
                <p className="text-gray-300 mb-6">
                  Visit our fundraiser at{' '}
                  <a 
                    href="https://MandaStrong1.Etsy.com" 
                    className="text-purple-400 hover:text-purple-300 underline font-bold"
                  >
                    MandaStrong1.Etsy.com
                  </a>
                </p>
              </div>
            </div>

            {/* Closing */}
            <div className="text-center">
              <p className="text-2xl italic text-purple-300 mb-4">
                "Your creativity matters. Your stories matter. Your impact matters."
              </p>
              <p className="text-white font-black text-xl">
                © 2025 MandaStrong1 - All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
