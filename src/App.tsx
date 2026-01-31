import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, Sparkles, ChevronRight, ChevronLeft, 
  CheckCircle, Play, Upload, MessageCircle, 
  Home, LogOut, Send, Mic, Video as VideoIcon, 
  PenTool, Zap, Camera, Shield, Heart, Share2, Music,
  Image as ImageIcon, Download, Settings, Sliders, Eye
} from 'lucide-react';

// --- PRODUCTION AI TOOLSET (600 TOTAL - 120 PER BOARD) ---
const generateOrderedTools = (category) => {
  const masterData = {
    Writing: ["Neural Script Architect", "DeepPlot Narrative AI", "Dialogue Synthesis Engine", "Character Core Logic", "Three-Act Quantum Solver", "Arc Flow Optimizer", "DeepLore Neural Link", "Subtext Logic Synth", "Scene-Beat Optimizer", "Climatic Logic Pro", "Backstory Neural Weaver", "Protagonist Core Lab"],
    Voice: ["Neural Vocal Clone Pro", "Atmospheric Timbre Synth", "Emotion-Depth Modulator", "Sonic Dialect Weaver", "DeepBreath Neural AI", "Vocal Clarity Engine", "Resonance Mapping Pro", "Linguistic Flow Lab", "Neural Accent Synthesis", "Studio Harmony Logic", "Whisper-Logic Pro", "Vocal Identity Synth"],
    Image: ["Neural Asset Architect", "Quantum Texture Mapper", "VFX Plate Synthesis", "Matte Painting Logic", "Atmospheric Light Engine", "Skin-Shader Neural Lab", "Depth-Field Logic Pro", "Style Transfer Matrix", "Background Weaver AI", "Cinematic Grain Synth", "Reflection Logic Engine", "Particle Physics Synth"],
    Video: ["Temporal Motion Synth", "Cinematic Camera Logic", "Neural Avatar rigger", "Dynamic Pan AI", "Crane Shot Simulator", "Dolly Zoom Neural Pro", "Tracking Shot Logic", "Frame Interpolation Pro", "Depth Motion Synth", "Action-Sequence Weaver", "Perspective Shift AI", "Dynamic Focus Lab"],
    Motion: ["Skeleton Tracker Pro", "Neural Mocap Logic", "Fluid Physics Engine", "Cloth Dynamics AI", "Facial Logic Synthesis", "Joint Precision Engine", "Gravity Simulator Lab", "Collision Matrix Pro", "Soft-Body Neural Pro", "Muscle-Fiber Logic", "Impact Logic Mapper", "Auto-Rigger Neural V2"]
  };

  const list = [];
  const source = masterData[category] || masterData["Writing"];
  for (let i = 0; i < 120; i++) {
    const base = source[i % source.length];
    const version = i >= source.length ? ` PRO ${Math.floor(i / source.length)}` : "";
    list.push(`${base}${version}`.toUpperCase());
  }
  return list;
};

const BOARD_DATA = {
  Writing: generateOrderedTools("Writing"),
  Voice: generateOrderedTools("Voice"),
  Image: generateOrderedTools("Image"),
  Video: generateOrderedTools("Video"),
  Motion: generateOrderedTools("Motion")
};

// --- THE PROFESSIONAL SMART BUBBLE (BOTTOM RIGHT - LINKED TO PG 19) ---
const HelpBubble = ({ onClick }) => (
  <button 
    onClick={onClick}
    className="fixed bottom-8 right-8 z-[250] flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full shadow-[0_0_50px_rgba(147,51,234,0.6)] transition-all border-2 border-white/40 hover:scale-110 active:scale-95 group"
  >
    <MessageCircle size={36} className="text-white" />
    <div className="absolute top-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-purple-600 animate-pulse" />
  </button>
);

export default function App() {
  const [page, setPage] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  
  // OWNER OVERRIDE: Defaulted to 'Studio' plan ($50)
  const [selectedPlan, setSelectedPlan] = useState('Studio');
  
  const [audioActive, setAudioActive] = useState(false);
  const videoRef = useRef(null);
  const playPromiseRef = useRef(null);

  useEffect(() => { setPage(1); window.scrollTo(0, 0); }, []);
  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  // Master Video Engine - background.mp4 with Automatic Un-mute Logic
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const runPlay = async () => {
      try {
        if (playPromiseRef.current) await playPromiseRef.current;
        playPromiseRef.current = video.play();
        await playPromiseRef.current;
      } catch (err) {}
    };

    if (page === 1 || page === 2 || page === 10 || page === 21) runPlay(); else video.pause();

    const startAudio = () => {
      if (video && (page === 1 || page === 2)) {
        video.muted = false;
        setAudioActive(true);
        runPlay();
      }
    };

    window.addEventListener('mousedown', startAudio);
    window.addEventListener('touchstart', startAudio);
    return () => {
      window.removeEventListener('mousedown', startAudio);
      window.removeEventListener('touchstart', startAudio);
    };
  }, [page]);

  const goTo = (p) => { setPage(p); setMenuOpen(false); };

  // --- PERSISTENT UI ---
  const PersistentUI = () => (
    <>
      {/* Top Right Quick Access Hub */}
      <div className="fixed top-8 right-8 z-[200]">
        <button onClick={() => setMenuOpen(!menuOpen)} className="bg-purple-600 p-3 rounded-full shadow-2xl hover:scale-110 transition text-white border-2 border-white/20">
          <Menu size={24} />
        </button>
        {menuOpen && (
          <div className="absolute top-16 right-0 bg-zinc-950 border-2 border-purple-600 p-6 rounded-3xl w-72 shadow-2xl animate-in slide-in-from-right-4 duration-300 z-[210]">
            <h3 className="text-white font-black uppercase text-xs mb-4 tracking-widest opacity-50 text-right">Quick Access Hub</h3>
            <div className="flex flex-col gap-2 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
              {[1, 4, 11, 13, 16, 17, 19, 21].map((p) => {
                const labels = {
                  1: "Home", 4: "AI Hub Directory", 11: "Editor Suite", 
                  13: "AI Enhancement", 16: "Final Hub", 17: "Knowledge Center", 19: "Agent Grok Help Desk", 21: "Finish"
                };
                return (
                  <button key={p} onClick={() => goTo(p)} className="text-right text-[11px] font-black uppercase text-purple-400 p-3.5 hover:bg-purple-600 hover:text-white rounded-xl transition border border-purple-900/30">
                    {labels[p]}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Persistent Help Bubble - Bottom Right */}
      <HelpBubble onClick={() => setPage(19)} />

      {/* Universal Fundraiser Footer */}
      {page >= 3 && (
        <div className="fixed bottom-0 left-0 w-full bg-black/90 py-4 text-center z-[150] border-t border-purple-900/30 backdrop-blur-md">
          <p className="text-[10px] md:text-[13px] font-black text-white uppercase tracking-widest px-4 leading-tight">
            MANDASTRONG1 2025 ~ Author of Doxy The School Bully ~ Please Help With Our Fundraiser If You Can. Thank you.
          </p>
        </div>
      )}
    </>
  );

  return (
    <div className="h-screen bg-transparent overflow-hidden relative font-sans selection:bg-purple-600 selection:text-white">
      <PersistentUI />
      
      {/* NO FILTER VIDEO FOUNDATION - background.mp4 */}
      {(page === 1 || page === 2 || page === 10 || page === 21) && (
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none" key="cinematic-foundation">
          <video 
            ref={videoRef} 
            autoPlay 
            loop 
            muted={!audioActive}
            playsInline 
            className="w-full h-full object-cover"
          >
            <source src="background.mp4" type="video/mp4" />
          </video>
        </div>
      )}

      <main className="relative z-10 h-full">
        
        {/* PAGE 1: EXACT IMAGE MATCH (TOP BRANDING, BOTTOM NAVIGATION) */}
        {page === 1 && (
          <div className="h-full flex flex-col justify-between items-center text-center px-4 pt-14 pb-20">
            {/* BRANDING (TOP) */}
            <div className="z-20">
              <h1 className="text-5xl md:text-[7rem] lg:text-[10rem] font-black text-black uppercase tracking-tighter leading-none italic font-serif drop-shadow-[0_4px_15px_rgba(255,255,255,0.4)]">
                MANDASTRONG'S STUDIO
              </h1>
              <p className="text-xl md:text-3xl lg:text-5xl font-black text-black italic uppercase tracking-tight drop-shadow-[0_2px_6px_rgba(255,255,255,0.4)] mt-4">
                Welcome To The All-In-One Make-A-Movie App!
              </p>
            </div>
            
            <div className="flex-grow pointer-events-none" />
            
            {/* NAVIGATION (BOTTOM) */}
            <div className="flex flex-col items-center gap-6 z-20">
               <div className="flex gap-6">
                  <button onClick={() => setPage(2)} className="bg-black text-white px-16 py-5 rounded-xl text-3xl font-black uppercase hover:scale-105 transition-all shadow-2xl active:scale-95">Next</button>
                  <button onClick={() => setPage(3)} className="bg-black text-white px-16 py-5 rounded-xl text-3xl font-black uppercase hover:scale-105 transition-all shadow-2xl active:scale-95">Login</button>
                  <button onClick={() => setPage(3)} className="bg-black text-white px-16 py-5 rounded-xl text-3xl font-black uppercase hover:scale-105 transition-all shadow-2xl active:scale-95">Register</button>
               </div>
            </div>
          </div>
        )}

        {/* PAGE 2: MISSION SPLASH */}
        {page === 2 && (
          <div className="h-full flex flex-col justify-center items-center text-center px-4 bg-black/20 backdrop-blur-sm">
            <Sparkles size={120} className="text-purple-500 mb-8 animate-pulse" />
            <h1 className="text-6xl md:text-[9.5rem] font-black text-white uppercase leading-none mb-6 italic drop-shadow-lg text-center">
              MANDASTRONG'S STUDIO
            </h1>
            <p className="text-2xl md:text-5xl font-black text-purple-500 uppercase mb-24 tracking-tighter italic max-w-6xl leading-tight">
              Make Awesome Family Movies Or Put Your Dreams Into Reality. Enjoy!
            </p>
            <div className="flex gap-8">
              <button onClick={() => setPage(1)} className="bg-zinc-900/60 border-2 border-purple-600 px-20 py-6 rounded-[30px] text-2xl font-black uppercase text-purple-400 flex items-center gap-4 transition hover:bg-purple-900/20 shadow-xl">
                <ChevronLeft size={40}/> Back
              </button>
              <button onClick={() => setPage(3)} className="bg-purple-600 border-2 border-purple-400 px-20 py-6 rounded-[30px] text-2xl font-black uppercase text-white shadow-[0_0_60px_rgba(168,85,247,0.5)] flex items-center gap-4 transition hover:scale-105">
                Next <ChevronRight size={40}/>
              </button>
            </div>
          </div>
        )}

        {/* PAGE 3: THE PORTAL ([Login] [Browse For Now] [Register]) */}
        {page === 3 && (
          <div className="h-full bg-black pt-16 pb-48 px-8 flex flex-col items-center overflow-y-auto custom-scrollbar">
              <div className="flex flex-col items-center w-full max-w-7xl">
                <div className="flex justify-center items-center gap-12 mb-20">
                    <button onClick={() => setPage(4)} className="bg-zinc-950 border-2 border-purple-900/30 px-16 py-8 rounded-3xl text-4xl font-black text-white uppercase hover:bg-purple-600 transition shadow-xl">Login</button>
                    <button onClick={() => setPage(4)} className="bg-purple-600 px-16 py-8 rounded-3xl text-4xl font-black text-white uppercase hover:scale-105 transition shadow-[0_0_40px_rgba(147,51,234,0.4)]">Browse For Now</button>
                    <button onClick={() => setPage(4)} className="bg-zinc-950 border-2 border-purple-900/30 px-16 py-8 rounded-3xl text-4xl font-black text-white uppercase hover:bg-purple-600 transition shadow-xl">Register</button>
                </div>

                <div className="grid grid-cols-3 gap-10 w-full mt-10">
                  {[
                    {t:'Basic', p:'$20', d:['HD Export', '120 AI Tools', '10GB Storage']},
                    {t:'Pro', p:'$30', d:['4K Export', '360 AI Tools', '100GB Storage']},
                    {t:'Studio', p:'$50', d:['8K Export', 'All 600 AI Tools', '1TB Storage']}
                  ].map(plan => (
                    <div key={plan.t} onClick={() => setSelectedPlan(plan.t)} className={`p-10 rounded-[50px] border-2 transition-all duration-500 text-left cursor-pointer relative ${selectedPlan === plan.t ? 'bg-zinc-900 border-purple-500 shadow-[0_0_80px_rgba(138,43,226,0.5)] scale-105' : 'bg-zinc-950 border-purple-900/20'}`}>
                      {plan.t === 'Studio' && <div className="absolute -top-4 left-12 bg-purple-600 text-white text-[11px] px-5 py-1.5 rounded-full font-black uppercase tracking-widest shadow-xl">STUDIO ACCESS ACTIVE</div>}
                      <h3 className="text-3xl font-black text-white mb-2 mt-4 uppercase italic tracking-tighter text-center">{plan.t}</h3>
                      <div className="text-6xl font-black text-purple-400 mb-10 tracking-tighter text-center">{plan.p}<span className="text-xl text-white/40"> Monthly</span></div>
                      <ul className="space-y-4 mb-10">
                        {plan.d.map(item => (
                          <li key={item} className="text-sm font-black text-white/80 flex items-center gap-4">
                            <CheckCircle size={18} className="text-purple-500" /> {item}
                          </li>
                        ))}
                      </ul>
                      {selectedPlan === plan.t && <div className="text-center text-purple-500 font-black tracking-widest uppercase">✓ Master Access</div>}
                    </div>
                  ))}
                </div>
              </div>
          </div>
        )}

        {/* AI BOARDS (PAGES 4-9) - 120 scrollable tools */}
        {page >= 4 && page <= 9 && (
          <div className="flex h-full bg-black pt-20 overflow-hidden">
            <div className="w-1/3 h-full border-r border-purple-900/30 p-12 overflow-y-auto flex flex-col custom-scrollbar bg-black/50 text-purple-400">
               <div className="flex justify-between items-center mb-10">
                  <h2 className="text-5xl font-black text-purple-600 uppercase italic leading-none tracking-tighter">
                    {page === 4 ? "DIRECTORY" : (Object.keys(BOARD_DATA)[page-5]?.toUpperCase() || "EDITOR")}
                  </h2>
               </div>
               
               {page === 4 && (
                 <div className="grid grid-cols-1 gap-6 pb-20">
                    {Object.keys(BOARD_DATA).map((cat, idx) => (
                      <button key={cat} onClick={() => setPage(5 + idx)} className="bg-zinc-950 border-2 border-purple-900/30 p-12 rounded-[40px] hover:bg-purple-600 group transition shadow-xl text-left flex items-center justify-between px-10">
                        <span className="text-3xl font-black uppercase text-purple-300 group-hover:text-black italic tracking-tighter">{cat} BOARD</span>
                        <ChevronRight className="text-purple-900 group-hover:text-black" size={32}/>
                      </button>
                    ))}
                 </div>
               )}

               {(page >= 5 && page <= 9) && (
                 <div className="grid grid-cols-1 gap-4 pb-32">
                    {Object.values(BOARD_DATA)[page-5]?.map((tool, i) => (
                      <button key={i} className="bg-zinc-950 border-2 border-purple-900/30 p-10 rounded-[30px] group hover:bg-purple-600 transition text-left relative overflow-hidden shadow-lg">
                        <div className="absolute top-0 left-0 w-1 h-full bg-purple-600 group-hover:bg-black transition-all" />
                        <span className="text-2xl font-black text-purple-500 group-hover:text-black uppercase italic tracking-tighter leading-none">{tool}</span>
                      </button>
                    ))}
                 </div>
               )}

               <div className="mt-auto pt-10 flex gap-6 pb-24">
                  <button onClick={() => setPage(Math.max(1, page-1))} className="bg-zinc-900 border-2 border-purple-600 px-12 py-4 rounded-2xl font-black uppercase text-purple-400 hover:bg-purple-900/20 transition shadow-lg">Back</button>
                  <button onClick={() => setPage(Math.min(21, page+1))} className="bg-purple-600 border-2 border-purple-400 px-12 py-4 rounded-2xl font-black text-black uppercase hover:bg-purple-500 transition shadow-xl">Next</button>
               </div>
            </div>

            <div className="w-2/3 h-full relative overflow-hidden bg-zinc-900 border-l border-purple-900/10 flex items-center justify-center text-center p-12">
               <div className="bg-black/40 p-12 rounded-[60px] border border-purple-500/20 backdrop-blur-2xl text-center">
                  <Sparkles size={120} className="text-purple-500 mb-8 mx-auto animate-pulse" />
                  <h3 className="text-5xl font-black text-white uppercase italic tracking-tighter">AI Production Engine</h3>
                  <p className="text-purple-400 font-mono mt-6 tracking-widest text-lg opacity-50 italic text-center">Synthesizing High-Resolution Cinematic Assets...</p>
               </div>
            </div>
          </div>
        )}

        {/* PAGE 10: EDITOR'S CHOICE (ONLY Title + Upload) */}
        {page === 10 && (
          <div className="h-full flex flex-col justify-center items-center text-center px-4 bg-black/10 backdrop-blur-md">
            <h1 className="text-6xl md:text-[10rem] font-black text-purple-600 uppercase leading-none mb-10 italic drop-shadow-2xl text-center leading-none">
              EDITOR'S CHOICE
            </h1>
            <div className="w-full max-w-4xl h-[45vh] bg-zinc-900/90 rounded-[100px] border-4 border-dashed border-purple-500/40 flex flex-col items-center justify-center shadow-3xl group hover:border-purple-500 transition-all">
               <Upload size={140} className="text-purple-500 group-hover:scale-110 transition-transform mb-10 animate-bounce" />
               <button className="bg-purple-600 text-white px-24 py-10 rounded-[60px] text-5xl font-black uppercase italic shadow-[0_0_60px_rgba(147,51,234,0.5)] hover:scale-105 active:scale-95 transition">
                  Upload Media
               </button>
               <p className="text-purple-400 mt-10 font-black uppercase tracking-[0.4em] text-sm opacity-50 text-center">8K RAW / AI Generated Sequences Supported</p>
            </div>
          </div>
        )}

        {/* PAGE 19: AGENT GROK INLINE HELP CENTRE (24/7 Support) */}
        {page === 19 && (
           <div className="h-full bg-black p-10 pt-24 flex flex-col items-center overflow-y-auto custom-scrollbar">
              <h1 className="text-[9rem] font-black text-purple-600 uppercase italic mb-16 tracking-tighter leading-none text-center leading-none">AGENT GROK</h1>
              <div className="w-full max-w-5xl bg-zinc-950 border-[6px] border-purple-600 rounded-[80px] h-[65vh] flex flex-col shadow-2xl overflow-hidden relative">
                 <div className="bg-purple-600 p-12 flex items-center gap-10">
                    <div className="w-28 h-28 bg-black rounded-full flex items-center justify-center border-8 border-white/20 shadow-xl overflow-hidden text-purple-500">
                       <MessageCircle size={80} />
                    </div>
                    <div>
                       <h3 className="text-5xl font-black text-white uppercase italic leading-none tracking-tighter">Inline Help Centre</h3>
                       <p className="text-purple-200 text-xl font-black uppercase tracking-widest mt-4 animate-pulse italic text-left">24/7 Professional Live Support</p>
                    </div>
                 </div>
                 <div className="flex-grow p-16 space-y-10 overflow-y-auto bg-black/20 custom-scrollbar text-white font-bold text-3xl uppercase italic tracking-tight leading-relaxed text-center leading-none">
                    Welcome to the 24/7 Help Centre. How can Agent Grok assist your cinematic vision today?
                 </div>
                 <div className="p-12 bg-black/60 flex gap-10">
                    <input type="text" placeholder="Describe your technical or creative issue..." className="flex-grow bg-black border-4 border-purple-900 p-8 rounded-3xl font-black text-white text-2xl italic outline-none focus:border-purple-600" />
                    <button className="bg-purple-600 p-8 rounded-3xl text-white shadow-2xl hover:scale-105 transition"><Send size={48}/></button>
                 </div>
              </div>
           </div>
        )}

        {/* PAGE 21: FINALE (thatsallfolks.mp4) */}
        {page === 21 && (
          <div className="h-full bg-black flex flex-col justify-center items-center p-20 text-center relative overflow-hidden overflow-y-auto custom-scrollbar">
            <div className="w-full max-w-[1500px] h-[40vh] bg-zinc-900 rounded-[100px] border-[12px] border-double border-purple-600 flex items-center justify-center mb-12 shadow-[0_0_150px_rgba(138,43,226,0.4)] relative overflow-hidden">
               <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
                  <source src="thatsallfolks.mp4" type="video/mp4" />
               </video>
               <span className="relative z-10 text-white font-mono text-6xl uppercase italic tracking-[1.2em] animate-pulse drop-shadow-2xl font-black text-center leading-none">thatsallfolks.mp4</span>
            </div>
            <h1 className="text-[14rem] font-black text-purple-600 uppercase italic leading-none mb-10 drop-shadow-[0_0_100px_rgba(138,43,226,0.7)] tracking-tighter underline underline-offset-8 decoration-purple-900/50 text-center leading-none">THAT'S ALL FOLKS!</h1>
            <div className="max-w-6xl space-y-16 mb-24 text-center">
              <p className="text-5xl font-bold text-white uppercase tracking-tight leading-tight">
                Thank you for exploring MandaStrong Studio - The All-In-One Make-A-Movie App!
              </p>
              <p className="text-3xl text-purple-400 italic">
                Your cinematic journey starts here.
              </p>
            </div>
            <div className="flex gap-8">
              <button onClick={() => setPage(1)} className="bg-purple-600 px-20 py-8 rounded-[40px] text-3xl font-black uppercase text-white hover:scale-105 transition shadow-[0_0_60px_rgba(147,51,234,0.5)]">
                Return Home
              </button>
            </div>
          </div>
        )}
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 10px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #000; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #7c3aed; border-radius: 5px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #a855f7; }
      `}</style>
    </div>
  );
}
