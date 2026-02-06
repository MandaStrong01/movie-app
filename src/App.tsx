import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, Sparkles, ChevronRight, ChevronLeft, 
  CheckCircle, Play, Upload, MessageCircle, 
  Home, Send, Mic, Video as VideoIcon, 
  PenTool, Zap, Camera, Shield, Heart, Share2, Music,
  Image as ImageIcon, Download, Settings, Sliders, Eye,
  Database, FileVideo, TrendingUp, BookOpen, Clock, Search, X,
  Lock, UserPlus, CreditCard, Mail, Key, User, Film
} from 'lucide-react';

// --- PRODUCTION AI TOOLSET GENERATOR (600 TOTAL) ---
const generateTools = (category) => {
  const baseTools = {
    Writing: ["Neural Script Architect", "DeepPlot Narrative AI", "Dialogue Synthesis Engine", "Character Core Logic", "Three-Act Quantum Solver", "Arc Flow Optimizer", "DeepLore Neural Link", "Subtext Logic Synth", "Scene-Beat Optimizer", "Climatic Logic Pro", "Backstory Neural Weaver", "Protagonist Core Lab"],
    Voice: ["Neural Vocal Clone Pro", "Atmospheric Timbre Synth", "Emotion-Depth Modulator", "Sonic Dialect Weaver", "DeepBreath Neural AI", "Vocal Clarity Engine", "Resonance Mapping Pro", "Linguistic Flow Lab", "Neural Accent Synthesis", "Studio Harmony Logic", "Whisper-Logic Pro", "Vocal Identity Synth"],
    Image: ["Neural Asset Architect", "Quantum Texture Mapper", "VFX Plate Synthesis", "Matte Painting Logic", "Atmospheric Light Engine", "Skin-Shader Neural Lab", "Depth-Field Logic Pro", "Style Transfer Matrix", "Background Weaver AI", "Cinematic Grain Synth", "Reflection Logic Engine", "Particle Physics Synth"],
    Video: ["Temporal Motion Synth", "Cinematic Camera Logic", "Neural Avatar rigger", "Dynamic Pan AI", "Crane Shot Simulator", "Dolly Zoom Neural Pro", "Tracking Shot Logic", "Frame Interpolation Pro", "Depth Motion Synth", "Action-Sequence Weaver", "Perspective Shift AI", "Dynamic Focus Lab"],
    Motion: ["Skeleton Tracker Pro", "Neural Mocap Logic", "Fluid Physics Engine", "Cloth Dynamics AI", "Facial Logic Synthesis", "Joint Precision Engine", "Gravity Simulator Lab", "Collision Matrix Pro", "Soft-Body Neural Pro", "Muscle-Fiber Logic", "Impact Logic Mapper", "Auto-Rigger Neural V2"]
  };
  const list = [];
  const tools = baseTools[category] || baseTools["Writing"];
  for (let i = 0; i < 120; i++) {
    list.push(`${tools[i % tools.length]}${i >= tools.length ? ` PRO ${Math.floor(i / tools.length)}` : ""}`.toUpperCase());
  }
  return list;
};

const BOARD_DATA = {
  Writing: generateTools("Writing"),
  Voice: generateTools("Voice"),
  Image: generateTools("Image"),
  Video: generateTools("Video"),
  Motion: generateTools("Motion")
};

// FIX 1: SPLASH PAGE COMPONENT
const SplashPage = ({ onContinue }) => (
  <div onClick={onContinue} className="h-screen bg-black flex flex-col justify-center items-center text-center cursor-pointer animate-in fade-in duration-1000">
    <div className="absolute inset-0" style={{background:'radial-gradient(ellipse at center, rgba(147,51,234,0.5) 0%, #000 75%)'}}></div>
    <div className="relative z-10">
      <div className="w-56 h-56 mx-auto rounded-full border-4 border-purple-700 flex items-center justify-center mb-12" style={{boxShadow:'0 0 80px rgba(147,51,234,0.6)'}}>
        <Film className="w-32 h-32 text-purple-400" strokeWidth={1.5} />
      </div>
      <h1 className="text-9xl font-black text-white mb-4 uppercase" style={{fontFamily:'Impact,sans-serif',letterSpacing:'0.15em',textShadow:'0 0 60px rgba(147,51,234,0.8)'}}>
        MANDASTRONG
      </h1>
      <h2 className="text-6xl font-bold text-purple-400 mb-16 uppercase" style={{letterSpacing:'0.4em'}}>STUDIO</h2>
      <div className="w-36 h-1 rounded-full mx-auto mb-14 bg-purple-600"></div>
      <p className="text-white text-2xl animate-pulse">Tap anywhere to continue</p>
    </div>
  </div>
);

export default function App() {
  // FIX 2: ADD SHOWSPLASH STATE
  const [showSplash, setShowSplash] = useState(true);
  const [page, setPage] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Studio');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [duration, setDuration] = useState(90);
  const videoRef = useRef(null);

  // FIX 3: SPLASH RENDER CHECK
  if (showSplash) {
    return <SplashPage onContinue={() => setShowSplash(false)} />;
  }

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if ([1, 2, 10, 21].includes(page)) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [page]);

  const goTo = (p) => { 
    setPage(p); 
    setMenuOpen(false); 
  };

  // FIX 4: CENTERED NAVIGATION
  const Navigation = () => {
    if (page === 1 || page === 21) return null;
    return (
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[400] flex gap-6 pointer-events-auto">
        {page > 1 && (
          <button 
            onClick={() => setPage(page - 1)}
            className="bg-zinc-950 border border-[#9333ea] px-10 py-2.5 rounded-full font-black uppercase text-[#9333ea] hover:bg-[#9333ea] hover:text-white transition-all shadow-2xl flex items-center gap-2 backdrop-blur-md active:scale-95 text-xs tracking-widest"
          >
            <ChevronLeft size={16} /> Back
          </button>
        )}
        {page < 21 && (
          <button 
            onClick={() => setPage(page + 1)}
            className="bg-[#9333ea] border border-[#9333ea] px-10 py-2.5 rounded-full font-black uppercase text-white hover:bg-purple-700 transition-all shadow-2xl flex items-center gap-2 active:scale-95 text-xs tracking-widest"
          >
            Next <ChevronRight size={16} />
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden font-sans selection:bg-[#9333ea] selection:text-white">
      
      {/* FIX 5: WATERMARK HIDING CSS */}
      <style dangerouslySetInnerHTML={{__html:`
        [data-bolt-badge], .bolt-badge, #bolt-badge,
        a[href*="bolt"], div[class*="fixed"][class*="bottom"] iframe,
        [class*="made-in"], [id*="bolt"],
        footer[class*="bolt"] { display: none !important; visibility: hidden !important; }
        
        @keyframes loading-bar { 0% { width: 0%; } 50% { width: 70%; } 100% { width: 100%; } }
        .animate-loading-bar { animation: loading-bar 2.5s infinite ease-in-out; }
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #000; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #9333ea; border-radius: 10px; border: 2px solid black; }
        input::placeholder { color: rgba(147, 51, 234, 0.4); font-style: italic; }
        .shadow-3xl { box-shadow: 0 0 100px rgba(0,0,0,0.8); }
        .animate-in { animation-duration: 0.5s; animation-fill-mode: both; }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .fade-in { animation-name: fade-in; }
      `}}/>

      {/* QUICK ACCESS MENU */}
      {page > 0 && (
        <div className="fixed top-6 right-6 z-[300]">
          <button onClick={() => setMenuOpen(!menuOpen)} className="bg-[#9333ea] p-3 rounded-full shadow-2xl text-white hover:scale-110 transition-transform">
            <Menu size={20} />
          </button>
          {menuOpen && (
            <div className="absolute top-14 right-0 bg-zinc-950 border border-[#9333ea] p-4 rounded-2xl w-56 shadow-2xl">
              <div className="flex flex-col gap-1">
                {[{p:1, l:"Home"}, {p:4, l:"AI Hub"}, {p:11, l:"Editor"}, {p:21, l:"Finish"}].map((item) => (
                  <button key={item.p} onClick={() => goTo(item.p)} className="text-right text-[10px] font-black uppercase text-[#9333ea] p-2.5 hover:bg-[#9333ea] hover:text-white rounded-lg transition-all border border-[#9333ea]/10">
                    {item.l}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* HELP BUBBLE - FROM PAGE 1 */}
      {page >= 1 && (
        <button onClick={() => setPage(19)} className="fixed bottom-6 right-6 z-[500] bg-[#9333ea] p-3.5 rounded-full shadow-[0_0_30px_rgba(147,51,234,0.5)] border border-white/20 hover:scale-110 transition-transform">
          <MessageCircle size={24} className="text-white" />
        </button>
      )}

      {/* FOOTER */}
      {page >= 3 && (
        <div className="fixed bottom-0 left-0 w-full bg-black/95 py-2.5 text-center z-[350] border-t border-[#9333ea]/20 backdrop-blur-md">
          <p className="text-[10px] uppercase font-black text-white/80 tracking-[0.2em] px-4">
            MandaStrong Studio 2025 • Author of Doxy The School Bully • MandaStrong1.Etsy.com
          </p>
        </div>
      )}

      <Navigation />

      {/* VIDEO BACKGROUND */}
      {[1, 2, 10, 21].includes(page) && (
        <div className="absolute inset-0 z-0 bg-black">
          <video ref={videoRef} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-50">
            <source src="background.mp4" type="video/mp4" />
          </video>
        </div>
      )}

      <main className="relative z-10 min-h-screen">
        
        {/* PAGE 1: LANDING - FIX 6: LOGIN/REGISTER/NEXT BUTTONS */}
        {page === 1 && (
          <div className="h-screen flex flex-col justify-center items-center text-center px-6">
            <h1 className="text-6xl md:text-[9rem] font-black text-white uppercase italic tracking-tighter leading-none mb-4 drop-shadow-2xl">
              MandaStrong Studio
            </h1>
            <p className="text-lg md:text-2xl font-black italic text-[#9333ea] max-w-3xl mb-16 uppercase tracking-tight leading-tight">
              Professional cinema production platform with AI-powered tools for creating feature-length films up to 3 hours
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <button onClick={() => setPage(2)} className="bg-white text-black px-14 py-4 rounded-2xl font-black uppercase text-2xl hover:scale-105 transition-all shadow-2xl">Next</button>
              <button onClick={() => setPage(3)} className="bg-[#9333ea] text-white px-14 py-4 rounded-2xl font-black uppercase text-2xl hover:scale-105 transition-all shadow-xl">Login</button>
              <button onClick={() => setPage(3)} className="bg-[#9333ea] text-white px-14 py-4 rounded-2xl font-black uppercase text-2xl hover:scale-105 transition-all shadow-xl">Register</button>
            </div>
          </div>
        )}

        {/* PAGE 2: MISSION */}
        {page === 2 && (
          <div className="h-screen flex flex-col justify-center items-center text-center px-4 bg-[#9333ea]/5">
            <Sparkles size={64} className="text-[#9333ea] mb-6" />
            <h1 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter mb-6">MANDASTRONG'S STUDIO</h1>
            <p className="text-2xl md:text-5xl font-black text-[#9333ea] italic uppercase max-w-4xl mb-16 leading-none">Make Awesome Family Movies & Bring Dreams To Life!</p>
          </div>
        )}

        {/* PAGE 3: AUTH & PRICING - FIX 7: NO FREE PLAN, BASIC $20, PRO $30, STUDIO $50 */}
        {page === 3 && (
          <div className="p-6 pt-16 pb-40 max-w-7xl mx-auto overflow-y-auto custom-scrollbar">
            {isLoggedIn && (
               <div className="bg-[#9333ea] text-white p-4 rounded-2xl mb-8 text-center font-black uppercase tracking-widest animate-in slide-in-from-top-4 shadow-[0_0_20px_rgba(147,51,234,0.5)]">
                  Logged in successfully!
               </div>
            )}
            
            <div className="text-center mb-12">
              <p className="text-[#9333ea] font-black uppercase text-[11px] tracking-[0.3em] mb-4">Contact admin to upgrade your subscription tier</p>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
                 {/* SIGN IN */}
                 <div className="bg-zinc-950 border border-[#9333ea]/30 p-8 rounded-3xl text-left">
                    <h3 className="text-xl font-black uppercase italic mb-6 flex items-center gap-2"><Lock size={18} className="text-[#9333ea]"/> Sign In</h3>
                    <div className="space-y-4">
                       <div className="relative"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16}/><input type="email" placeholder="Email Address" className="w-full bg-black border border-zinc-800 p-4 pl-12 rounded-xl text-sm font-bold focus:border-[#9333ea] outline-none transition-all text-white" /></div>
                       <div className="relative"><Key className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16}/><input type="password" placeholder="Password" className="w-full bg-black border border-zinc-800 p-4 pl-12 rounded-xl text-sm font-bold focus:border-[#9333ea] outline-none transition-all text-white" /></div>
                       <button onClick={() => setIsLoggedIn(true)} className="w-full bg-[#9333ea] py-4 rounded-xl font-black uppercase text-sm tracking-widest shadow-lg active:scale-95 transition-all">Sign In</button>
                    </div>
                 </div>

                 {/* CREATE ACCOUNT */}
                 <div className="bg-zinc-950 border border-[#9333ea]/30 p-8 rounded-3xl text-left">
                    <h3 className="text-xl font-black uppercase italic mb-6 flex items-center gap-2"><UserPlus size={18} className="text-[#9333ea]"/> Create Account</h3>
                    <div className="space-y-4">
                       <div className="relative"><User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16}/><input type="text" placeholder="Full Name" className="w-full bg-black border border-zinc-800 p-4 pl-12 rounded-xl text-sm font-bold focus:border-[#9333ea] outline-none transition-all text-white" /></div>
                       <div className="relative"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16}/><input type="email" placeholder="Email Address" className="w-full bg-black border border-zinc-800 p-4 pl-12 rounded-xl text-sm font-bold focus:border-[#9333ea] outline-none transition-all text-white" /></div>
                       <div className="relative"><Key className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16}/><input type="password" placeholder="Password" className="w-full bg-black border border-zinc-800 p-4 pl-12 rounded-xl text-sm font-bold focus:border-[#9333ea] outline-none transition-all text-white" /></div>
                       <button className="w-full bg-zinc-900 border border-[#9333ea] py-4 rounded-xl font-black uppercase text-sm tracking-widest hover:bg-[#9333ea] transition-all">Register</button>
                    </div>
                 </div>
              </div>
              
              <button onClick={() => setPage(4)} className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em] hover:text-[#9333ea] transition-all mb-4 italic">or Explore features without creating an account</button>
            </div>

            <h2 className="text-3xl font-black text-center mb-10 uppercase italic text-[#9333ea]">Choose Your Plan</h2>
            <p className="text-center text-zinc-500 text-xs mb-10 font-bold uppercase tracking-widest">Start free, upgrade anytime</p>
            
            {/* FIX 8: STUDIO PLAN TEXT UNDER AMANDA STRONG */}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-black text-white uppercase">AMANDA STRONG</h3>
              <p className="text-sm font-bold text-[#9333ea] uppercase tracking-widest">Studio Plan</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
              {[
                {t:'Basic', p:'20', d:['HD Export', '100 AI Tools', 'Basic Templates', '10GB Storage', 'Email Support']},
                {t:'Pro', p:'30', d:['4K Export', '300 AI Tools', 'Premium Templates', '100GB Storage', 'Priority Support', 'Commercial License']},
                {t:'Studio', p:'50', d:['8K Export', 'All 600 AI Tools', 'Unlimited Templates', '1TB Storage', '24/7 Live Support', 'Full Commercial Rights', 'Team Collaboration']}
              ].map(plan => (
                <div key={plan.t} className={`bg-zinc-950 border rounded-3xl p-6 transition-all group hover:scale-[1.02] ${selectedPlan === plan.t ? 'border-[#9333ea] shadow-[0_0_30px_rgba(147,51,234,0.2)]' : 'border-zinc-900 opacity-80'}`}>
                  {plan.t === 'Pro' && <div className="bg-[#9333ea] text-[9px] font-black uppercase px-3 py-1 rounded-full w-fit mb-4">Most Popular</div>}
                  <h3 className="text-xl font-black uppercase italic mb-1 text-white">{plan.t}</h3>
                  <div className="text-4xl font-black text-[#9333ea] mb-8 tracking-tighter">${plan.p}<span className="text-xs opacity-50">/mo</span></div>
                  <ul className="space-y-2.5 mb-10 min-h-[220px]">
                    {plan.d.map(item => (
                      <li key={item} className="text-[10px] font-bold uppercase flex items-center gap-2 text-white/70 leading-none">
                        <CheckCircle size={10} className="text-[#9333ea]" /> {item}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => setSelectedPlan(plan.t)} className={`w-full py-3 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all ${selectedPlan === plan.t ? 'bg-[#9333ea] text-white shadow-lg' : 'bg-zinc-900 text-zinc-600 hover:text-white'}`}>
                    {selectedPlan === plan.t ? 'Selected' : 'Choose Plan'}
                  </button>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col items-center gap-4 opacity-40">
               <p className="text-[9px] font-black uppercase tracking-widest italic">Secure payment processing with Stripe</p>
            </div>
          </div>
        )}

        {/* PAGE 4: HUB DIRECTORY */}
        {page === 4 && (
          <div className="p-8 pt-20 pb-40 max-w-7xl mx-auto text-center">
            <h1 className="text-7xl font-black uppercase italic text-[#9333ea] mb-12 tracking-tighter">AI HUB DIRECTORY</h1>
            <div className="grid md:grid-cols-3 gap-8">
              {["Writing", "Voice", "Image", "Video", "Motion"].map((cat, i) => (
                <div key={cat} onClick={() => setPage(5+i)} className="bg-zinc-950 border border-[#9333ea]/20 rounded-[40px] p-12 hover:border-[#9333ea] transition-all cursor-pointer group shadow-2xl relative overflow-hidden active:scale-95">
                  <div className="text-8xl mb-8 group-hover:animate-bounce transition-all">{["✍️", "🎙️", "🎨", "🎬", "🎭"][i]}</div>
                  <h3 className="text-4xl font-black uppercase italic tracking-tighter mb-2">{cat} Board</h3>
                  <p className="text-sm font-black text-[#9333ea] uppercase tracking-widest">120 Professional Tools</p>
                </div>
              ))}
              <div onClick={() => setPage(10)} className="bg-zinc-950 border border-zinc-800 rounded-[40px] p-12 hover:border-white transition-all cursor-pointer group shadow-2xl active:scale-95">
                <div className="text-8xl mb-8 group-hover:scale-110 transition-transform">⭐</div>
                <h3 className="text-4xl font-black uppercase italic tracking-tighter mb-2">Editor's Choice</h3>
                <p className="text-sm font-black text-white/40 uppercase tracking-widest">Master Screening Room</p>
              </div>
            </div>
          </div>
        )}

        {/* AI BOARDS (5-9) */}
        {(page >= 5 && page <= 9) && (
          <div className="flex h-screen bg-black pt-20 overflow-hidden">
             <div className="w-1/3 border-r border-[#9333ea]/30 p-10 overflow-y-auto custom-scrollbar bg-black/50">
                <h2 className="text-5xl font-black uppercase italic text-[#9333ea] tracking-tighter mb-10">{["Writing", "Voice", "Image", "Video", "Motion"][page-5]} BOARD</h2>
                <div className="grid grid-cols-1 gap-4 pb-40">
                   {BOARD_DATA[["Writing", "Voice", "Image", "Video", "Motion"][page-5]].map((tool, i) => (
                     <button key={i} className="bg-zinc-950 border-2 border-zinc-900 p-6 rounded-2xl text-left hover:border-[#9333ea] hover:bg-[#9333ea]/10 transition-all group shadow-lg active:scale-95">
                        <span className="text-sm font-black uppercase text-white tracking-tight leading-none italic">{tool}</span>
                     </button>
                   ))}
                </div>
             </div>
             <div className="flex-grow flex items-center justify-center relative bg-zinc-900">
                <div className="text-center opacity-20">
                   <VideoIcon size={120} className="mx-auto mb-6 text-[#9333ea]" />
                   <h3 className="text-3xl font-black uppercase italic">Synthetic Preview Engine</h3>
                </div>
                <div className="absolute top-8 left-8 bg-[#9333ea] text-white px-6 py-2 rounded-full font-black uppercase text-[10px] tracking-[0.3em]">AI Stream Active</div>
             </div>
          </div>
        )}

        {/* PAGE 10: EDITOR'S CHOICE */}
        {page === 10 && (
          <div className="h-screen flex flex-col justify-center items-center text-center p-8 bg-black/40">
             <h1 className="text-[8rem] font-black uppercase italic text-[#9333ea] mb-12 tracking-tighter drop-shadow-2xl">Editor's Choice</h1>
             <div className="w-full max-w-4xl aspect-video bg-zinc-950 rounded-[60px] border-[6px] border-zinc-900 shadow-3xl flex flex-col items-center justify-center relative group hover:border-[#9333ea] transition-all overflow-hidden">
                <Upload size={100} className="text-[#9333ea] mb-8 animate-bounce" />
                <button onClick={() => setPage(11)} className="bg-[#9333ea] text-white px-24 py-6 rounded-[30px] font-black uppercase text-4xl shadow-2xl hover:scale-105 active:scale-95">Upload Media</button>
             </div>
          </div>
        )}

        {/* PAGE 11-18: PLACEHOLDER PAGES */}
        {page >= 11 && page <= 18 && (
          <div className="min-h-screen p-8 pt-20 pb-40">
            <h1 className="text-4xl font-black uppercase italic text-[#9333ea] mb-8">Page {page}</h1>
            <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-10">
              <p className="text-white/50 font-bold">Content for page {page}</p>
            </div>
          </div>
        )}

        {/* PAGE 19: HELP DESK */}
        {page === 19 && (
           <div className="h-screen flex flex-col justify-center items-center text-center p-10">
              <MessageCircle size={64} className="text-[#9333ea] mb-6" />
              <h1 className="text-6xl font-black uppercase italic mb-8">Agent Grok</h1>
              <div className="w-full max-w-2xl bg-zinc-950 border-2 border-[#9333ea] p-10 rounded-[30px] text-lg font-bold">
                 Welcome back. Your Studio Master status is verified. How can I assist your movie making process today?
              </div>
           </div>
        )}

        {/* PAGE 20: COMMUNITY */}
        {page === 20 && (
          <div className="min-h-screen p-8 pt-20 pb-40">
            <h1 className="text-4xl font-black uppercase italic text-[#9333ea] mb-8">Community Hub</h1>
            <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-10">
              <p className="text-white/50 font-bold">Community content coming soon</p>
            </div>
          </div>
        )}

        {/* PAGE 21: FINALE - FIX 9: THATSALLFOLKS VIDEO */}
        {page === 21 && (
          <div className="h-screen flex flex-col justify-center items-center text-center p-10 bg-black pb-40">
            <div className="mb-8 w-full max-w-3xl">
              <video autoPlay loop muted playsInline className="w-full rounded-xl border-4 border-purple-700">
                <source src="/ThatsAllFolks.MP4" type="video/mp4" />
              </video>
            </div>
            <h1 className="text-[12rem] font-black text-[#9333ea] uppercase italic mb-8 leading-none tracking-tighter drop-shadow-2xl">THAT'S ALL FOLKS!</h1>
            <div className="max-w-4xl mb-16 space-y-8">
              <p className="text-4xl font-black uppercase italic text-white tracking-tight leading-none drop-shadow-lg">
                "Amanda's Thank you to creators now in future. Supporting cinematic innovation through our Veteran Fundraiser mission."
              </p>
              <a href="https://MandaStrong1.Etsy.com" target="_blank" className="inline-block text-7xl font-black text-purple-400 hover:text-white transition-all underline underline-offset-[20px] decoration-8 decoration-[#9333ea]/50">MandaStrong1.Etsy.com</a>
            </div>
            <div className="flex gap-8">
               <button onClick={() => setPage(1)} className="bg-[#9333ea] text-white px-20 py-5 rounded-2xl font-black uppercase text-3xl shadow-[0_0_50px_rgba(147,51,234,0.4)] hover:scale-105 active:scale-95">Home</button>
               <button className="bg-zinc-900 border-2 border-zinc-800 px-20 py-5 rounded-2xl font-black uppercase text-3xl hover:bg-zinc-800 transition-all text-white/50">Close</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
