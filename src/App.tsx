
import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, Sparkles, ChevronRight, ChevronLeft, 
  CheckCircle, Play, Upload, MessageCircle, 
  Send, Video as VideoIcon, 
  Zap, Camera, Shield, Heart, Share2, 
  ImageIcon, Download, Sliders, Eye,
  FileVideo, Lock, UserPlus, CreditCard, Mail, Key, User, Wand2,
  Monitor, Volume2, Layers, Scissors, Palette, BookOpen, Search, Activity,
  Settings, Database, TrendingUp, Clock, X, Wind, Sun, Target, Maximize
} from 'lucide-react';

// --- PRODUCTION AI TOOLSET GENERATOR (120 PER BOARD) ---
const generateTools = (category) => {
  const baseTools = {
    Writing: ["Neural Script Architect", "DeepPlot Narrative AI", "Dialogue Synthesis Engine", "Character Core Logic", "Three-Act Quantum Solver", "Arc Flow Optimizer", "DeepLore Neural Link", "Subtext Logic Synth", "Scene-Beat Optimizer", "Climatic Logic Pro", "Backstory Neural Weaver", "Protagonist Core Lab"],
    Voice: ["Neural Vocal Clone Pro", "Atmospheric Timbre Synth", "Emotion-Depth Modulator", "Sonic Dialect Weaver", "DeepBreath Neural AI", "Vocal Clarity Engine", "Resonance Mapping Pro", "Linguistic Flow Lab", "Neural Accent Synthesis", "Studio Harmony Logic", "Whisper-Logic Pro", "Vocal Identity Synth"],
    Image: ["Neural Asset Architect", "Quantum Texture Mapper", "VFX Plate Synthesis", "Matte Painting Logic", "Atmospheric Light Engine", "Skin-Shader Neural Lab", "Depth-Field Logic Pro", "Style Transfer Matrix", "Background Weaver AI", "Cinematic Grain Synth", "Reflection Logic Engine", "Particle Physics Synth"],
    Video: ["Temporal Motion Synth", "Cinematic Camera Logic", "Neural Avatar Rigger", "Dynamic Pan AI", "Crane Shot Simulator", "Dolly Zoom Neural Pro", "Tracking Shot Logic", "Frame Interpolation Pro", "Depth Motion Synth", "Action-Sequence Weaver", "Perspective Shift AI", "Dynamic Focus Lab"],
    Motion: ["Skeleton Tracker Pro", "Neural Mocap Logic", "Fluid Physics Engine", "Cloth Dynamics AI", "Facial Logic Synthesis", "Joint Precision Engine", "Gravity Simulator Lab", "Collision Matrix Pro", "Soft-Body Neural Pro", "Muscle-Fiber Logic", "Impact Logic Mapper", "Auto-Rigger Neural V2"]
  };
  const list = [];
  const source = baseTools[category] || baseTools["Writing"];
  for (let i = 0; i < 120; i++) {
    const base = source[i % source.length];
    const version = i >= source.length ? " PRO " + Math.floor(i / source.length) : "";
    list.push((base + version).toUpperCase());
  }
  return list;
};

// --- TITLED ENHANCEMENT TOOLS (30 SPECIFIC) ---
const ENHANCEMENT_TOOLS = [
  "4K Neural Upscale", "8K Texture Synth", "Anamorphic Flare", "Atmospheric Haze", "Bloom Radiance",
  "Chromatic Aberration", "Cinematic Grain", "Color Grade Pro", "Contrast Optimizer", "Deep Black Level",
  "Depth of Field", "Dynamic Range V3", "Edge Sharpness", "Film Stock Emulator", "Gamma Curve Logic",
  "Global Illumination", "HDR Neural Mapper", "Lens Distortion", "Light Wrap Synth", "Motion Blur Pro",
  "Neural De-Noise", "Ray Traced Shadows", "Reflection Matrix", "Saturation Flow", "Skin Tone Neural",
  "Soft Focus Filter", "Temporal Stability", "Tone Mapping AI", "Vignette Control", "White Balance Logic"
];

const BOARD_DATA = {
  Writing: generateTools("Writing"),
  Voice: generateTools("Voice"),
  Image: generateTools("Image"),
  Video: generateTools("Video"),
  Motion: generateTools("Motion")
};

export default function App() {
  const [page, setPage] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  
  // OWNER MASTER BYPASS: Default to Studio Master status
  const [selectedPlan, setSelectedPlan] = useState('Studio');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  
  const [duration, setDuration] = useState(90);
  const [isRendering, setIsRendering] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const videoRef = useRef(null);

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

  // --- CENTERED NAVIGATION (BACK / NEXT) ---
  const Navigation = () => {
    if (page === 0 || page === 1 || page === 21) return null;
    return (
      <div className="fixed bottom-12 left-0 w-full flex justify-center gap-4 z-[400] px-4 pointer-events-none pb-2">
        <button 
          onClick={() => setPage(page - 1)}
          className="nav-box-back pointer-events-auto bg-zinc-950 border border-studio-purple-dim px-10 py-2.5 rounded-full font-black uppercase text-studio-purple hover:bg-studio-purple hover:text-white transition-all shadow-xl flex items-center gap-2 backdrop-blur-xl active:scale-95 text-mini tracking-widest"
        >
          <ChevronLeft size={14} /> Back
        </button>
        <button 
          onClick={() => setPage(page + 1)}
          className="nav-box-next pointer-events-auto bg-studio-purple border border-studio-purple-dim px-10 py-2.5 rounded-full font-black uppercase text-white hover:bg-purple-800 transition-all shadow-glow flex items-center gap-2 active:scale-95 text-mini tracking-widest"
        >
          Next <ChevronRight size={14} />
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden font-sans selection:bg-studio-purple selection:text-white">
      
      {/* QUICK HUB */}
      {page > 0 && (
        <div className="fixed top-6 right-6 z-[500]">
          <button onClick={() => setMenuOpen(!menuOpen)} className="bg-studio-purple p-3 rounded-full shadow-glow text-white hover:scale-110 transition-transform">
            <Menu size={22} />
          </button>
          {menuOpen && (
            <div className="absolute top-16 right-0 bg-zinc-950 border border-studio-purple-dim p-5 rounded-3xl w-60 shadow-3xl animate-in slide-in-from-right-4 duration-300">
              <div className="flex flex-col gap-2">
                {[
                  {p:1, l:"Landing"}, {p:4, l:"AI Hub"}, {p:11, l:"Editor"}, 
                  {p:13, l:"Enhancer"}, {p:16, l:"Production Hub"}, {p:19, l:"Agent Grok Help"}, {p:21, l:"Finale"}
                ].map((item) => (
                  <button key={item.p} onClick={() => goTo(item.p)} className="text-right text-mini font-black uppercase text-studio-purple p-3 hover:bg-studio-purple hover:text-white rounded-xl transition-all border border-studio-purple-dim/10 leading-none">
                    {item.l}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* HELP BUBBLE */}
      {page > 0 && (
        <button onClick={() => setPage(19)} className="fixed bottom-6 right-6 z-[500] bg-studio-purple p-3.5 rounded-full shadow-glow border border-white/10 hover:scale-110 transition-transform">
          <MessageCircle size={22} className="text-white" />
        </button>
      )}

      {/* UNIVERSAL FOOTER */}
      {page >= 3 && (
        <div className="fixed bottom-0 left-0 w-full bg-black/95 py-2 text-center z-[350] border-t border-studio-purple-dim backdrop-blur-md">
          <p className="text-tiny uppercase font-black text-white/60 tracking-widest-plus px-4 leading-none">
            MandaStrong Studio 2025 • Author of Doxy The School Bully • MandaStrong1.Etsy.com
          </p>
        </div>
      )}

      <Navigation />

      {[1, 2, 10, 21].includes(page) && (
        <div className="absolute inset-0 z-0 bg-black">
          <video ref={videoRef} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-50">
            <source src="background.mp4" type="video/mp4" />
          </video>
        </div>
      )}

      <main className="relative z-10 min-h-screen">
        
        {/* PAGE 0: SPLASH SCREEN */}
        {page === 0 && (
          <div className="h-screen bg-black flex flex-col justify-center items-center text-center animate-in fade-in duration-1000">
            <Sparkles size={60} className="text-studio-purple mb-4 animate-pulse" />
            <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-1 leading-none">MANDASTRONG</h1>
            <p className="text-studio-purple font-black uppercase tracking-widest-ultra text-micro mb-8 opacity-80 leading-none">Cinema Intelligence</p>
            <div className="w-40 h-px-2 bg-zinc-900 rounded-full overflow-hidden">
              <div className="h-full bg-studio-purple animate-loading-bar" />
            </div>
            <button onClick={() => setPage(1)} className="mt-12 bg-white text-black px-10 py-3 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl active:scale-95 text-mini">
              Launch Studio
            </button>
          </div>
        )}

        {/* PAGE 1: LANDING PAGE (MATCH Blue-Print) */}
        {page === 1 && (
          <div className="h-screen flex flex-col justify-center items-center text-center px-6">
            <h1 className="text-studio-landing font-black text-white uppercase italic tracking-tighter leading-none mb-2 drop-shadow-2xl">
              MANDASTRONG'S STUDIO
            </h1>
            <p className="text-md md:text-xl font-black italic text-studio-purple max-w-2xl mb-12 uppercase tracking-tight leading-tight opacity-90">
              Welcome To An All In One Make A Movie App ~ Up To 3 Hours
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button onClick={() => setPage(2)} className="bg-white text-black px-12 py-4 rounded-xl font-black uppercase text-xl hover:scale-105 transition-all shadow-xl active:scale-95">Next</button>
              <button onClick={() => setPage(3)} className="bg-white text-black px-12 py-4 rounded-xl font-black uppercase text-xl hover:scale-105 transition-all shadow-xl active:scale-95">Login</button>
              <button onClick={() => setPage(3)} className="bg-white text-black px-12 py-4 rounded-xl font-black uppercase text-xl hover:scale-105 transition-all shadow-xl active:scale-95">Register</button>
            </div>
            <button onClick={() => setPage(4)} className="mt-10 text-white/30 text-tiny font-black uppercase tracking-widest-plus hover:text-studio-purple transition-all italic leading-none">Browse For Now</button>
          </div>
        )}

        {/* PAGE 2: MISSION SPLASH */}
        {page === 2 && (
          <div className="h-screen flex flex-col justify-center items-center text-center px-4 bg-studio-purple-overlay">
            <Sparkles size={50} className="text-studio-purple mb-4" />
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-4 leading-none">MANDASTRONG'S STUDIO</h1>
            <p className="text-xl md:text-3xl font-black text-studio-purple italic uppercase max-w-3xl mb-12 leading-tight text-center">Make Awesome Family Movies & Bring Dreams To Life!</p>
          </div>
        )}

        {/* PAGE 3: AUTH & PRICING */}
        {page === 3 && (
          <div className="p-4 pt-12 pb-40 max-w-6xl mx-auto overflow-y-auto custom-scrollbar">
            <div className="text-center mb-10">
               <div className="bg-studio-purple-dim border border-studio-purple-light text-studio-purple p-2 rounded-lg mb-10 text-center font-black uppercase tracking-widest text-[10px] max-w-md mx-auto shadow-glow backdrop-blur-md leading-none">
                  Logged in successfully! Studio Master Status Active
               </div>
              <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-10">
                 <div className="bg-zinc-950/50 border border-studio-purple-dim p-8 rounded-3xl text-left backdrop-blur-sm shadow-xl">
                    <h3 className="text-md font-black uppercase italic mb-6 flex items-center gap-2 text-white/90 tracking-widest border-b border-studio-purple-dim pb-2 leading-none"><Lock size={14} className="text-studio-purple"/> Login</h3>
                    <div className="space-y-3">
                       <input type="email" placeholder="Email Address" className="w-full bg-black/40 border border-zinc-800 p-2.5 rounded-lg text-mini font-bold focus:border-studio-purple outline-none transition-all text-white" />
                       <input type="password" placeholder="Password" className="w-full bg-black/40 border border-zinc-800 p-2.5 rounded-lg text-mini font-bold focus:border-studio-purple outline-none transition-all text-white" />
                       <button onClick={() => setIsLoggedIn(true)} className="w-full bg-studio-purple py-2.5 rounded-lg font-black uppercase text-mini tracking-widest shadow-md">Login</button>
                    </div>
                 </div>
                 <div className="bg-zinc-950/50 border border-studio-purple-dim p-8 rounded-3xl text-left backdrop-blur-sm shadow-xl">
                    <h3 className="text-md font-black uppercase italic mb-6 flex items-center gap-2 text-white/90 tracking-widest border-b border-studio-purple-dim pb-2 leading-none"><UserPlus size={14} className="text-studio-purple"/> Register</h3>
                    <div className="space-y-4">
                       <input type="text" placeholder="Full Name" className="w-full bg-black/40 border border-zinc-800 p-3 rounded-xl text-mini font-bold focus:border-studio-purple outline-none transition-all text-white" />
                       <input type="email" placeholder="Email Address" className="w-full bg-black/40 border border-zinc-800 p-3 rounded-xl text-mini font-bold focus:border-studio-purple outline-none transition-all text-white" />
                       <button className="w-full bg-zinc-900 border border-studio-purple-dim py-3 rounded-xl font-black uppercase text-mini tracking-widest hover:bg-studio-purple-overlay transition-all text-white/40">Register</button>
                    </div>
                 </div>
              </div>
            </div>

            <div className="border-t border-studio-purple-dim pt-12 text-center">
              <h2 className="text-xl font-black mb-6 uppercase italic text-studio-purple tracking-widest leading-none">Studio Subscription Tiers</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
                {[
                  {t:'Basic', p:'20', d:['HD Export', '100 AI Tools']},
                  {t:'Pro', p:'30', d:['4K Export', '300 AI Tools']},
                  {t:'Studio', p:'50', d:['8K Export', 'All 600 AI Tools']}
                ].map(plan => (
                  <div key={plan.t} className={`bg-zinc-950/30 border rounded-xl p-6 transition-all ${selectedPlan === plan.t ? 'border-studio-purple shadow-glow scale-105 bg-studio-purple-overlay' : 'border-zinc-900 opacity-40'}`}>
                    <h3 className="text-standard font-black uppercase mb-1 text-white leading-none">{plan.t}</h3>
                    <div className="text-2xl font-black text-studio-purple mb-4 leading-none">${plan.p}<span className="text-micro opacity-50">/mo</span></div>
                    <ul className="space-y-1.5 mb-6 text-left">
                      {plan.d.map(item => (
                        <li key={item} className="text-micro font-bold uppercase flex items-center gap-1.5 text-white/60 leading-none">
                          <CheckCircle size={10} className="text-studio-purple" /> {item}
                        </li>
                      ))}
                    </ul>
                    <button className={`w-full py-1.5 rounded-lg font-black uppercase text-micro tracking-widest transition-all ${selectedPlan === plan.t ? 'bg-studio-purple text-white shadow-md' : 'bg-zinc-900 text-zinc-600'}`}>
                      {selectedPlan === plan.t ? 'Master Key' : 'Select'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PAGE 4: AI HUB */}
        {page === 4 && (
          <div className="p-8 pt-16 pb-40 max-w-7xl mx-auto text-center">
            <h1 className="text-5xl font-black uppercase italic text-studio-purple mb-12 tracking-tighter drop-shadow-xl leading-none">AI HUB DIRECTORY</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {["Writing", "Voice", "Image", "Video", "Motion"].map((cat, i) => (
                <div key={cat} onClick={() => setPage(5+i)} className="bg-zinc-950/40 border border-studio-purple-dim rounded-[40px] p-10 hover:border-studio-purple/60 transition-all cursor-pointer group shadow-2xl relative active:scale-95">
                  <div className="text-6xl mb-6 group-hover:scale-110 transition-transform drop-shadow-md">{["✍️", "🎙️", "🎨", "🎬", "🎭"][i]}</div>
                  <h3 className="text-xl font-black uppercase italic tracking-tighter mb-1 text-white/90 leading-none">{cat} Board</h3>
                  <p className="text-mini font-black text-studio-purple uppercase tracking-widest opacity-80 leading-none">120 PRO AI TOOLS</p>
                </div>
              ))}
              <div onClick={() => setPage(10)} className="bg-zinc-950/40 border border-zinc-800 rounded-[40px] p-10 hover:border-white/30 transition-all cursor-pointer group active:scale-95 shadow-2xl">
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">⭐</div>
                <h3 className="text-xl font-black uppercase italic tracking-tighter mb-1 text-white/90 leading-none">Editor's Choice</h3>
              </div>
            </div>
          </div>
        )}

        {/* PAGES 5-9: LIVE PRODUCTION BOARDS */}
        {(page >= 5 && page <= 9) && (
          <div className="flex h-screen bg-black pt-16 overflow-hidden">
             <div className="w-1/4 border-r border-studio-purple-dim p-6 overflow-y-auto custom-scrollbar bg-black/40">
                <h2 className="text-2xl font-black uppercase italic text-studio-purple tracking-widest mb-6 border-b border-studio-purple-dim pb-2 leading-none">{["Writing", "Voice", "Image", "Video", "Motion"][page-5]} BOARD</h2>
                <div className="grid grid-cols-1 gap-1.5 pb-40">
                   {BOARD_DATA[["Writing", "Voice", "Image", "Video", "Motion"][page-5]].map((tool, i) => (
                     <button key={i} className="bg-zinc-950/30 border border-zinc-900/50 p-3 rounded-lg text-left hover:border-studio-purple/40 hover:bg-studio-purple-overlay transition-all group active:scale-95 relative overflow-hidden">
                        <span className="text-micro font-black uppercase text-white/60 tracking-tighter italic block group-hover:text-white transition-colors leading-none">{tool}</span>
                     </button>
                   ))}
                </div>
             </div>
             <div className="flex-grow flex flex-col items-center justify-center relative bg-zinc-950/50 overflow-hidden text-center">
                <div className="z-10 opacity-30">
                   <Sparkles size={80} className="mx-auto mb-4 text-studio-purple animate-pulse" />
                   <h3 className="text-4xl font-black uppercase italic tracking-[0.3em] text-white/60 leading-none">Synthetic Engine Active</h3>
                   <p className="text-studio-purple font-mono text-mini mt-4 tracking-widest-ultra animate-pulse uppercase leading-none">8K CINEMA STREAM</p>
                </div>
             </div>
          </div>
        )}

        {/* PAGE 10: EDITOR'S CHOICE MOVIE */}
        {page === 10 && (
          <div className="h-screen flex flex-col justify-center items-center text-center p-8 bg-black/40">
             <h1 className="text-studio-title font-black uppercase italic text-studio-purple mb-8 tracking-tighter drop-shadow-2xl leading-none">EDITOR'S CHOICE</h1>
             <div className="w-full max-w-4xl aspect-video bg-zinc-950 border border-studio-purple-dim rounded-[40px] shadow-3xl flex flex-col items-center justify-center relative group hover:border-studio-purple/40 transition-all overflow-hidden">
                <Upload size={40} className="text-studio-purple mb-4 animate-bounce opacity-80" />
                <button onClick={() => setPage(11)} className="bg-studio-purple text-white px-12 py-4 rounded-2xl font-black uppercase text-xl shadow-lg hover:scale-105 active:scale-95 transition-transform">Upload Media</button>
             </div>
          </div>
        )}

        {/* PAGE 11: PRECISION EDITOR */}
        {page === 11 && (
          <div className="p-6 pt-16 pb-32 h-screen overflow-hidden flex flex-col">
            <h1 className="text-3xl font-black uppercase italic text-white/90 mb-6 tracking-widest leading-none">Precision Multi-Track Editor</h1>
            <div className="flex-grow grid grid-cols-4 gap-4">
               <div className="col-span-3 aspect-video bg-zinc-900/50 border border-studio-purple-dim rounded-[30px] shadow-3xl flex items-center justify-center relative group overflow-hidden">
                  <Play size={60} className="text-studio-purple/20 group-hover:text-studio-purple/60 transition-all cursor-pointer" />
               </div>
               <div className="bg-zinc-950/40 border border-zinc-900 rounded-[25px] p-5 shadow-2xl overflow-y-auto custom-scrollbar">
                  <h3 className="text-micro font-black uppercase mb-6 text-studio-purple tracking-widest opacity-70 border-b border-studio-purple-dim pb-1 leading-none">Asset Library</h3>
                  <div className="space-y-2">
                    {[1,2,3,4,5,6].map(i => (
                       <div key={i} className="bg-black/40 p-3 rounded-lg border border-zinc-800 flex items-center gap-3 group hover:border-studio-purple/30 transition-all cursor-move shadow-md">
                          <FileVideo size={16} className="text-zinc-700" />
                          <span className="text-micro font-black uppercase text-zinc-500 group-hover:text-white italic leading-none">SCENE_{i}.MP4</span>
                       </div>
                    ))}
                  </div>
               </div>
            </div>
          </div>
        )}

        {/* PAGE 12: ASSET MANAGER (UPLOAD TOP RIGHT) */}
        {page === 12 && (
          <div className="p-8 pt-16 pb-40 max-w-7xl mx-auto text-center relative">
             <div className="absolute top-16 right-8">
                <button className="bg-studio-purple text-white px-6 py-2 rounded-xl font-black uppercase text-mini shadow-glow hover:scale-105 transition-all flex items-center gap-2">
                   <Upload size={14} /> Upload Media
                </button>
             </div>
             <h1 className="text-4xl font-black uppercase italic text-studio-purple mb-10 tracking-widest leading-none">Media Asset Manager</h1>
             <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                {Array.from({length: 18}).map((_, i) => (
                  <div key={i} className="aspect-square bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center group hover:border-studio-purple transition-all cursor-pointer relative overflow-hidden shadow-xl">
                     <ImageIcon size={30} className="text-zinc-700 group-hover:text-studio-purple" />
                     <div className="absolute bottom-2 right-2 text-micro font-mono text-zinc-700">IMG_00{i}.png</div>
                  </div>
                ))}
             </div>
          </div>
        )}

        {/* PAGE 13: MOVIE ENHANCER STUDIO (30 TITLED BOXES) */}
        {page === 13 && (
          <div className="p-8 pt-16 text-center pb-80 max-w-7xl mx-auto overflow-y-auto custom-scrollbar">
            <h1 className="text-7xl font-black uppercase italic text-studio-purple mb-2 tracking-tighter drop-shadow-2xl leading-none">MOVIE ENHANCER</h1>
            <p className="text-white/40 font-black uppercase text-tiny tracking-widest-ultra mb-10 italic opacity-60 leading-none">Neural Cinematic Optimization Grid</p>
            
            <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-10 gap-2 mb-12 max-w-6xl mx-auto">
               {ENHANCEMENT_TOOLS.map((tool, i) => (
                  <button 
                    key={i} 
                    className="bg-zinc-950/50 border border-zinc-900 p-2 rounded-xl hover:border-studio-purple/50 hover:bg-studio-purple-overlay transition-all group active:scale-95 text-center flex flex-col items-center justify-center h-24 shadow-lg"
                  >
                     <Zap size={20} className="glyph-icon transition-all mb-2 opacity-60" />
                     <span className="text-micro font-black text-zinc-600 group-hover:text-white uppercase tracking-tighter leading-none block">{tool}</span>
                  </button>
               ))}
            </div>

            <div className="max-w-2xl mx-auto bg-zinc-900/50 p-10 rounded-[40px] border border-studio-purple-dim shadow-3xl backdrop-blur-2xl">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="text-tiny font-black uppercase tracking-widest-plus text-white/70 italic leading-none">Project Duration</h3>
                  <span className="text-studio-purple font-black text-5xl italic drop-shadow-lg tracking-tighter leading-none">{duration} <span className="text-lg opacity-30 font-mono">MIN</span></span>
               </div>
               <input 
                 type="range" min="0" max="180" value={duration} 
                 onChange={(e) => setDuration(parseInt(e.target.value))}
                 className="w-full h-2 bg-black rounded-full appearance-none cursor-pointer accent-studio-purple border border-white/5 shadow-inner" 
               />
               <p className="text-micro font-black uppercase text-zinc-700 mt-6 tracking-widest italic opacity-60 uppercase leading-none">8K Cinema Grade Export Limit: 180 Minutes</p>
            </div>
          </div>
        )}

        {/* PAGES 14-20 (PRODUCTION CONTINUITY) */}
        {page === 14 && (
           <div className="p-8 pt-16 flex flex-col h-screen">
             <h1 className="text-4xl font-black uppercase italic text-white mb-10 tracking-widest leading-none">Multi-Layer Composite View</h1>
             <div className="space-y-4">
                {["VFX Layer", "Green Screen", "Vocal Synthesis", "Ambience", "Base Plate"].map((layer, i) => (
                   <div key={i} className="bg-zinc-950 border border-zinc-900 h-16 rounded-xl flex items-center px-8 justify-between group hover:border-studio-purple transition-all shadow-lg">
                      <div className="flex items-center gap-4">
                         <Layers size={18} className="text-studio-purple" />
                         <span className="text-tiny font-black uppercase text-white/40 group-hover:text-white">{layer}</span>
                      </div>
                      <Eye size={16} className="text-zinc-800 group-hover:text-studio-purple cursor-pointer" />
                   </div>
                ))}
             </div>
          </div>
        )}

        {page === 15 && (
          <div className="p-8 pt-16 text-center max-w-6xl mx-auto">
             <h1 className="text-5xl font-black uppercase italic text-studio-purple mb-16 leading-none">Audio Mastering Suite</h1>
             <div className="grid grid-cols-4 md:grid-cols-8 gap-4 mb-20">
                {Array.from({length: 8}).map((_, i) => (
                   <div key={i} className="bg-zinc-950 p-6 rounded-2xl flex flex-col items-center gap-6 shadow-xl">
                      <div className="h-40 w-1 bg-zinc-900 rounded-full relative overflow-hidden">
                         <div className="absolute bottom-0 w-full bg-studio-purple h-2/3" />
                      </div>
                      <Volume2 size={18} className="text-zinc-700" />
                      <span className="text-micro font-black text-white/20">CH 0{i+1}</span>
                   </div>
                ))}
             </div>
          </div>
        )}

        {page === 16 && (
           <div className="p-8 pt-16 text-center max-w-7xl mx-auto">
              <h1 className="text-5xl font-black uppercase italic text-studio-purple mb-12 leading-none">Color Correction & Lighting</h1>
              <div className="grid grid-cols-2 gap-10">
                 <div className="aspect-video bg-zinc-900 border-2 border-studio-purple-dim rounded-[50px] flex items-center justify-center relative shadow-3xl">
                    <Palette size={60} className="text-studio-purple opacity-20" />
                    <div className="absolute top-4 left-4 bg-studio-purple text-white px-3 py-1 rounded-full text-micro font-black">8K PREVIEW</div>
                 </div>
                 <div className="space-y-6 text-left p-8 bg-zinc-950/50 rounded-[40px] border border-studio-purple-dim">
                    {["Contrast", "Saturation", "Gamma", "Exposure"].map(l => (
                       <div key={l}>
                          <div className="flex justify-between text-micro font-black uppercase mb-2 text-white/60"><span>{l}</span><span>50%</span></div>
                          <div className="h-1 bg-zinc-900 rounded-full"><div className="h-full bg-studio-purple w-1/2" /></div>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        )}

        {page === 17 && (
          <div className="p-8 pt-16 max-w-7xl mx-auto text-center">
             <h1 className="text-4xl font-black uppercase italic text-studio-purple mb-10 leading-none">Tutorial Center</h1>
             <div className="grid grid-cols-2 gap-8">
                <div className="aspect-video bg-zinc-900 border border-zinc-800 rounded-[40px] flex items-center justify-center relative group overflow-hidden cursor-pointer shadow-xl">
                   <Play size={60} className="text-zinc-800 group-hover:text-studio-purple transition-all" />
                   <div className="absolute bottom-6 left-6 text-tiny font-black uppercase text-white/40 tracking-widest">Masterclass 01: The Basics</div>
                </div>
                <div className="aspect-video bg-zinc-900 border border-zinc-800 rounded-[40px] flex items-center justify-center relative group overflow-hidden cursor-pointer shadow-xl">
                   <Play size={60} className="text-zinc-800 group-hover:text-studio-purple transition-all" />
                   <div className="absolute bottom-6 left-6 text-tiny font-black uppercase text-white/40 tracking-widest">Masterclass 02: Neural SFX</div>
                </div>
             </div>
          </div>
        )}

        {page === 18 && (
          <div className="p-8 pt-16 max-w-7xl mx-auto text-center">
             <h1 className="text-5xl font-black uppercase italic text-studio-purple mb-16 leading-none">Creator Community Hub</h1>
             <div className="grid grid-cols-3 gap-6">
                {Array.from({length: 6}).map((_, i) => (
                   <div key={i} className="aspect-video bg-zinc-900 border border-zinc-800 rounded-3xl p-4 flex flex-col justify-between shadow-lg">
                      <div className="flex justify-between items-center">
                         <span className="text-micro font-black text-white/30 uppercase tracking-widest">User_0{i+1}</span>
                         <Heart size={14} className="text-studio-purple fill-studio-purple/20" />
                      </div>
                      <Play size={30} className="mx-auto text-zinc-800" />
                      <div className="flex gap-2"><span className="text-micro font-black uppercase text-zinc-600 tracking-tighter">Verified Creator Clip</span></div>
                   </div>
                ))}
             </div>
          </div>
        )}

        {page === 19 && (
           <div className="h-screen flex flex-col justify-center items-center text-center p-10 bg-studio-purple-overlay">
              <MessageCircle size={80} className="text-studio-purple mb-6 animate-pulse shadow-2xl" />
              <h1 className="text-studio-title-large font-black uppercase italic tracking-tighter mb-8 text-white drop-shadow-2xl leading-none">Agent Grok</h1>
              <div className="w-full max-w-4xl bg-zinc-950/80 border border-studio-purple-dim rounded-[40px] p-12 text-center shadow-3xl backdrop-blur-md">
                 <p className="text-2xl font-black uppercase italic text-white/90 leading-relaxed mb-10 tracking-tight">
                   "Welcome back. Your Studio Master status is verified. How can I assist your movie making process today?"
                 </p>
                 <div className="flex gap-4">
                    <input type="text" placeholder="Describe your technical issue..." className="flex-grow bg-black/60 border border-zinc-800 p-4 rounded-xl font-black text-studio-purple uppercase italic outline-none focus:border-studio-purple transition-all text-mini shadow-inner" />
                    <button className="bg-studio-purple p-4 rounded-xl text-white shadow-xl hover:scale-105 active:scale-95 transition-transform"><Send size={24}/></button>
                 </div>
              </div>
           </div>
        )}

        {page === 20 && (
           <div className="p-8 pt-16 text-center pb-40">
              <h1 className="text-5xl font-black uppercase italic text-studio-purple mb-12 leading-none">Final Export Suite</h1>
              <div className="max-w-4xl mx-auto grid grid-cols-2 gap-10">
                 <div className="bg-zinc-950 border-2 border-studio-purple p-12 rounded-[50px] flex flex-col items-center gap-6 shadow-glow backdrop-blur-md">
                    <Monitor size={60} className="text-studio-purple" />
                    <button 
                      onClick={() => { setIsRendering(true); setTimeout(() => { setIsRendering(false); setShowShare(true); }, 3000); }} 
                      className="bg-studio-purple text-white px-10 py-3 rounded-xl font-black uppercase text-xl active:scale-95 transition-all"
                    >
                       {isRendering ? "Rendering..." : "Generate Master 8K"}
                    </button>
                 </div>
                 {showShare && (
                    <div className="bg-zinc-950 border border-zinc-800 p-10 rounded-[50px] flex flex-col items-center animate-in zoom-in backdrop-blur-md">
                       <h3 className="text-mini font-black uppercase mb-6 tracking-widest opacity-60">Distribution Hub</h3>
                       <div className="grid grid-cols-3 gap-4">
                          {[1,2,3,4,5,6].map(i => (
                             <button key={i} className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center hover:bg-studio-purple transition-all text-white active:scale-90 shadow-md">
                                <Share2 size={18} />
                             </button>
                          ))}
                       </div>
                    </div>
                 )}
              </div>
           </div>
        )}

        {/* PAGE 21: FINALE */}
        {page === 21 && (
          <div className="h-screen flex flex-col justify-center items-center text-center p-10 bg-black relative overflow-hidden">
            <div className="absolute inset-0 z-0">
               <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-90 grayscale">
                  <source src="thatsallfolks.mp4" type="video/mp4" />
               </video>
            </div>
            <div className="relative z-10 space-y-8 max-w-6xl p-12 bg-black/40 backdrop-blur-3xl rounded-[80px] border border-studio-purple-dim shadow-3xl">
               <h1 className="text-studio-title md:text-studio-finale font-black text-studio-purple uppercase italic mb-2 leading-none tracking-tighter drop-shadow-custom">THAT'S ALL FOLKS!</h1>
               <p className="text-3xl md:text-5xl font-black uppercase italic text-white/80 tracking-tight leading-none drop-shadow-lg text-center">
                 "Amanda’s Thank you to creators now in future. Supporting cinematic innovation through our Veteran Fundraiser mission."
               </p>
               <div className="pt-8 leading-none">
                  <a href="https://MandaStrong1.Etsy.com" target="_blank" className="inline-block text-6xl md:text-8xl font-black text-studio-purple hover:text-white transition-all underline underline-offset-[20px] decoration-4 decoration-studio-purple-dim tracking-tighter leading-none">MandaStrong1.Etsy.com</a>
               </div>
            </div>
            <div className="flex gap-8 mt-12 relative z-20">
               <button onClick={() => setPage(1)} className="bg-studio-purple text-white px-16 py-4 rounded-xl font-black uppercase text-3xl shadow-xl hover:scale-105 transition-transform active:scale-95 leading-none">Home</button>
               <button className="bg-zinc-900 border border-zinc-800 text-white/30 px-16 py-4 rounded-xl font-black uppercase text-3xl hover:bg-zinc-900 transition-all leading-none active:scale-95">Close</button>
            </div>
          </div>
        )}

      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --studio-purple: #7e22ce;
          --studio-purple-dim: rgba(126, 34, 206, 0.2);
          --studio-purple-light: rgba(126, 34, 206, 0.4);
          --studio-purple-glow: rgba(126, 34, 206, 0.3);
        }
        .text-studio-purple { color: var(--studio-purple); }
        .bg-studio-purple { background-color: var(--studio-purple); }
        .bg-studio-purple-overlay { background-color: var(--studio-purple-glow); }
        .bg-studio-purple-dim { background-color: var(--studio-purple-dim); }
        .border-studio-purple { border-color: var(--studio-purple); }
        .border-studio-purple-dim { border-color: var(--studio-purple-dim); }
        .border-studio-purple-light { border-color: var(--studio-purple-light); }
        .shadow-glow { box-shadow: 0 0 20px var(--studio-purple-glow); }
        .glyph-icon { color: #52525b; }
        .group:hover .glyph-icon { color: var(--studio-purple); }
        
        .text-micro { font-size: 8px; }
        .text-tiny { font-size: 9px; }
        .text-mini { font-size: 10px; }
        .text-standard { font-size: 12px; }
        .tracking-widest-plus { letter-spacing: 0.25em; }
        .tracking-widest-ultra { letter-spacing: 0.6em; }
        .h-px-2 { height: 2px; }
        
        .text-studio-landing { font-size: 7.5rem; }
        .text-studio-title { font-size: 10rem; }
        .text-studio-title-large { font-size: 9rem; }
        .text-studio-finale { font-size: 18rem; }
        .drop-shadow-custom { filter: drop-shadow(0 0 50px rgba(126, 34, 206, 0.8)); }

        @keyframes loading-bar { 0% { width: 0%; } 50% { width: 75%; } 100% { width: 100%; } }
        .animate-loading-bar { animation: loading-bar 2.5s infinite ease-in-out; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: var(--studio-purple); border-radius: 20px; }
        input[type=range] { -webkit-appearance: none; background: #18181b; border-radius: 20px; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; height: 30px; width: 30px; border-radius: 50%; background: var(--studio-purple); cursor: pointer; border: 4px solid white; shadow: 0 0 15px var(--studio-purple-glow); }
        input::placeholder { color: rgba(126, 34, 206, 0.2) !important; font-style: italic; }
        .shadow-3xl { box-shadow: 0 0 80px rgba(0,0,0,0.9); }
        .animate-in { animation-duration: 0.5s; animation-fill-mode: both; }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .fade-in { animation-name: fade-in; }
      `}} />
    </div>
  );
}