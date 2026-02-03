import React, { useState, useRef, useEffect } from 'react';
import { Play, ChevronLeft, ChevronRight, Upload, Download, Save, Share2, Film, Volume2, Zap, Settings, Eye, Plus, Sparkles, MessageCircle, Users, Mail } from 'lucide-react';

const OCEAN_VIDEO = "https://assets.mixkit.co/videos/preview/mixkit-ocean-waves-loop-1196-large.mp4";
const AVATAR_VIDEO = "https://assets.mixkit.co/videos/preview/mixkit-person-holding-a-camera-3037-small.mp4";

const AI_TOOLS = [
  "Script Generator", "Story Architect", "Plot Weaver", "Character Designer", "Dialogue AI",
  "Scene Planner", "Shot List Pro", "Storyboard Creator", "Script Analyzer", "Genre Consultant",
  "Premise Builder", "Conflict Generator", "Theme Developer", "Arc Constructor", "Beat Sheet AI",
  "Logline Writer", "Synopsis Pro", "Treatment Builder", "Pitch Deck AI", "Budget Calculator",
  "Dialogue Writer", "Plot Generator", "Scene Writer", "Story Outliner", "Character Developer",
  "Dialogue Editor", "Plot Designer", "Story Planner", "Treatment Writer", "Script Formatter",
  "Plot Creator", "Three Act Builder", "Backstory Generator", "Motivation Builder", "Theme Generator",
  "Advanced Story Outliner", "Story Consultant", "Plot Twist Creator", "Scene Analyzer", "Conflict Manager",
  "Character Arc AI", "Narrative Flow", "Subtext Builder", "Metaphor Finder", "Pacing Guide",
  "Dialogue Polisher", "Scene Transition AI", "Story Beat Mapper", "Character Voice AI", "Screenplay Doctor",
  "Schedule Optimizer", "Location Scout AI", "Casting Director", "Costume Designer", "Prop Manager",
  "Set Designer Pro", "Mood Board AI", "Color Palette Pro", "Style Guide", "Reference Library",
  "Production Designer", "Scene Setup AI", "Actor Scheduler", "Crew Manager", "Call Sheet Builder",
  "Day Planner Pro", "Risk Analyzer", "Budget Tracker", "Timeline Planner", "Resource Allocator",
  "Location Manager", "Permit Advisor", "Insurance Guide", "Safety Planner", "Equipment Tracker",
  "Rental Manager", "Travel Coordinator", "Catering Planner", "Makeup Artist AI", "Wardrobe Stylist",
  "Hair Design AI", "Props Coordinator", "Extras Manager", "Sound Design Planner", "VFX Supervisor AI",
  "Post Schedule Builder", "Color Science Guide", "Camera Department AI", "Lighting Planner", "Grip Coordinator",
  "Sound Dept Manager", "Music Supervisor", "Distribution Planner", "Festival Strategist", "PR Manager AI",
  "Social Strategy", "Audience Analyzer", "Market Research AI", "Trailer Editor", "DVD Bonus Planner",
  "Shot Composer", "Camera Angle AI", "Movement Planner", "Lens Advisor", "Focal Length Guide",
  "Depth Calculator", "Focus Puller", "Exposure Meter", "ISO Optimizer", "Aperture Guide",
  "Shutter Speed AI", "White Balance Pro", "ND Filter Guide", "Gimbal Stabilizer", "Dolly Tracker",
  "Crane Planner", "Steadicam AI", "Handheld Smoother", "Drone Pilot", "Aerial Composer",
  "Time-lapse Builder", "Hyper-lapse Pro", "Slow Motion AI", "Speed Ramper", "Frame Blender",
  "Optical Flow Pro", "Motion Interpolation", "Frame Rate Converter", "Aspect Ratio Tool", "Crop Assistant",
  "Anamorphic Lens Guide", "Camera Profiler", "Sensor Advisor", "Zoom Control AI", "Rack Focus Tool",
  "Follow Focus AI", "Lens Metadata Reader", "Camera Calibrator", "Distortion Analyzer", "Lens Selector Pro",
  "Photometry Tool", "Light Meter Pro", "Scene Light Guide", "Camera Movement Pro", "Shot Planning AI",
  "Frame Composition", "Rule Of Thirds AI", "Golden Ratio Tool", "Visual Rhythm Guide", "Cinematic Framing",
  "Lighting Designer", "Three-Point Setup", "Key Light AI", "Fill Light Pro", "Back Light Guide",
  "Practical Lights", "Natural Light AI", "Studio Setup", "Location Light", "Color Temperature",
  "Gel Selector", "Light Intensity", "Shadow Control", "Contrast Manager", "Dynamic Range",
  "HDR Mapper", "Exposure Blend", "Highlight Recovery", "Shadow Lifter", "Midtone Balance",
  "LUT Creator Pro", "Grade Matcher", "Color Harmony", "Cinematic Look", "Film Emulation",
  "Digital Cinema", "Vintage Filter", "Modern Grade", "Commercial Style", "Documentary Look",
  "Tungsten Correction", "LED Panel Guide", "HMI Light Advisor", "Softbox Designer", "Ring Light Setup",
  "Studio Light Map", "Location Lighting AI", "Night Scene Guide", "Day Scene Planner", "Overcast Optimizer",
  "Rain Lighting AI", "Snow Scene Guide", "Fire Scene Light", "Underwater Light AI", "Interior Lighting Pro",
  "Exterior Light Plan", "Neon Light Setup", "Practical FX Light", "Light Painting Guide", "Color Wash Designer",
  "Audio Recorder Pro", "Voice Capture", "ADR Studio", "Foley Creator", "Ambience Generator",
  "Music Composer AI", "Sound Designer", "Audio Editor Pro", "Noise Reducer", "Hum Remover",
  "Click Eliminator", "Pop Filter", "Breath Remover", "De-Esser Pro", "Compressor AI",
  "EQ Wizard", "Reverb Designer", "Delay Creator", "Chorus Effect", "Flanger Pro",
  "Phaser Effect", "Distortion AI", "Saturation Pro", "Limiter Guard", "Gate Controller",
  "Expander Pro", "Multi-band Comp", "Stereo Widener", "Pan Automation", "Volume Mixer",
  "Fade Designer", "Cross-fade Pro", "Audio Ducking", "Side-chain AI", "Sync Master",
  "Soundtrack Builder", "Score Composer AI", "Sound Effects Bank", "Audio Mastering Pro", "Vocal Booth AI",
  "Microphone Advisor", "Room Tone Capture", "Audio Restoration", "Signal Chain AI", "Monitoring Guide",
  "Studio Acoustics", "Audio Format Guide", "Surround Mix AI", "Audio Stem Splitter", "Voice Isolation Pro",
  "Voice Clone AI", "Text-to-Speech Pro", "Speech-to-Text", "Auto Transcribe", "Caption Generator",
  "Subtitle Sync", "Translation AI", "Localization Pro", "Dubbing Studio", "Lip Sync AI",
  "Voice Enhancer", "Clarity Boost", "Vocal Isolation", "Background Remover", "Voice Morph",
  "Pitch Shifter", "Tempo Changer", "Voice Age AI", "Gender Morph", "Accent Trainer",
  "Dialect Generator", "Emotion Mapper", "Tone Analyzer", "Inflection AI", "Pronunciation Guide",
  "Voice Maker", "Voice Cloner", "Voice Creator Tool", "Voice Recorder", "Speech Converter",
  "Voice Builder", "Advanced Voice Generator", "Voice Studio Tool", "Premium Voice Generator", "Voice Audio Tool",
  "Emotional Voice Generator", "Advanced Speech Creator", "Natural Voice Generator", "Voice Reader", "Speech Generator",
  "Narration Creator", "Voice Imitator", "Fast Speech Generator", "Live Voice Tool", "Streaming Voice Generator",
  "Voice Mixing AI", "Vocal Harmony Pro", "Speaker Identification", "Voice Archive Tool", "Speech Enhancement",
  "Timeline Master", "Multi-track Editor", "Ripple Edit Pro", "Roll Edit AI", "Slip Editor",
  "Slide Tool", "Trim Precision", "Extend Editor", "Split Smart", "Join Seamless",
  "Group Manager", "Link Controller", "Nest Creator", "Compound Clip", "Multi-cam Sync",
  "Clip Merger", "Replace Tool", "Insert Smart", "Overwrite Pro", "Three-point Edit",
  "Four-point Edit", "Match Frame", "Find Gap", "Sequence Settings", "Timeline Zoom",
  "Cut Optimizer", "Edit Rhythm AI", "Scene Order AI", "Clip Organizer", "Edit Preview",
  "Proxy Editor", "Timeline Export", "Edit Templates", "Quick Cut AI", "Jump Cut Creator",
  "Montage Builder", "Sequence Planner", "Edit Decision List", "Frame Accurate Cut", "Audio Edit AI",
  "Multicam Editor", "Batch Trimmer", "Edit Assist Pro", "Smart Trim AI", "Clip Browser",
  "Edit History Pro", "Video Assembler", "Rough Cut Builder", "Fine Cut Polish", "Master Edit Tool",
  "Transition Library", "Fade Master", "Dissolve Pro", "Wipe Designer", "Slide Animator",
  "Push Effect", "Zoom Transition", "Spin Creator", "Flip Designer", "3D Rotate",
  "Cube Spin", "Door Swing", "Window Reveal", "Curtain Pull", "Iris Wipe",
  "Clock Wipe", "Heart Shape", "Star Burst", "Organic Wipe", "Light Leak",
  "Lens Flare Pro", "Light Rays", "God Rays", "Sun Burst", "Glow Effect",
  "Bloom Designer", "Chromatic Aberration", "RGB Split", "Glitch Generator", "Data Moshing",
  "Particle Transition", "Morph Effect", "Liquid Wipe", "Pixel Dissolve", "Shatter Glass",
  "Split Screen", "Picture in Picture", "Comparison View", "Side By Side", "Before After",
  "Effect Chain Builder", "Preset Effects", "Custom Effect Studio", "Effect Timing", "Easing Controls",
  "Transition Preview", "Effect Renderer", "Keyframe Effects", "Animation Curves", "Motion Graphics AI",
  "Green Screen Pro", "Chroma Keyer", "Luma Key", "Difference Key", "Color Range",
  "Spill Suppressor", "Edge Refiner", "Matte Cleaner", "Roto Tool Pro", "Mask Designer",
  "Track Mask", "Planar Tracker", "Point Tracker", "Camera Tracker", "Object Tracker",
  "Stabilizer Pro", "Deshake AI", "Rolling Shutter Fix", "Lens Corrector", "Distortion Fixer",
  "Vignette Tool", "CA Remover", "Sharpen Pro", "Blur Master", "Gaussian Blur",
  "Motion Blur Pro", "Radial Blur", "Zoom Blur", "Tilt-shift Effect", "Miniature Mode",
  "Sky Replacement", "Object Removal AI", "Inpainting Tool", "Face Detection AI", "Body Segmentation",
  "Scene Reconstruction", "Depth Map Generator", "3D Conversion", "Stereo 3D Tool", "VFX Compositing",
  "Shot Match AI", "Color Matching VFX", "Atmosphere Effects", "Crowd Simulation", "Vehicle Simulation",
  "Water Simulation", "Fire Simulation AI", "Destruction Sim", "Cloth Simulation", "Hair Simulation",
  "Film Grain AI", "Noise Generator", "Dust Overlay", "Scratch Effect", "Damage Creator",
  "Old Film Look", "8mm Emulator", "16mm Style", "Super 8 Feel", "VHS Aesthetic",
  "Scan Lines", "CRT Effect", "TV Static", "Signal Error", "Pixel Sorter",
  "Weather Generator", "Rain Creator", "Snow Effect", "Fog Machine", "Mist Layer",
  "Smoke Designer", "Fire Simulator", "Explosion FX", "Debris System", "Spark Generator",
  "Lightning Strike", "Thunder Flash", "Wind Effect", "Leaves Particles", "Dust Motes",
  "Light Particles", "Magic Sparkles", "Energy Beam", "Laser Effect", "Plasma Arc",
  "Muzzle Flash", "Blood Splatter", "Bullet Hole", "Glass Shatter", "Wood Splinter",
  "Film Tone AI", "Retro Film Filter", "Analog Warmth", "Cinema Grain Pack", "Film Stock Emulator",
  "Frame Jitter", "Film Flicker", "Light Bounce AI", "Shadow Detail AI", "Atmosphere Depth",
  "Metal Dent", "Concrete Crack", "Dust Cloud", "Dirt Kick", "Water Splash",
  "Sweat Drop", "Tear Effect", "Breath Vapor", "Steam Effect", "Heat Haze",
  "Speed Lines", "Motion Trails", "Action Lines", "Impact Flash", "Screen Shake",
  "Face Swap AI", "Age Progression", "Age Regression", "Beauty Filter Pro", "Skin Smoother",
  "Eye Enhancer", "Teeth Whitener", "Hair Color AI", "Makeup Virtual", "Face Morph",
  "Expression Clone", "Emotion Transfer", "Blink Fixer", "Gaze Corrector", "Head Tracker",
  "Body Tracker", "Pose Estimator", "Motion Capture", "Facial Capture", "Performance Clone",
  "Face Reconstruction", "Skin Texture AI", "Facial Animation", "Expression Mapper", "Micro Expression AI",
  "Face Lift AI", "Facial Symmetry", "Smile Enhancer", "Pupil Adjustment", "Skin Color Match",
  "Face Paint AI", "AR Face Filter", "3D Face Model", "Face Lighting AI", "Portrait Enhancement",
  "Lower Third Pro", "Title Designer", "End Card Maker", "Bug Creator", "Watermark Pro",
  "Logo Animator", "Text Animator", "Typewriter Effect", "Letter Reveal", "Word Slide",
  "Line Draw", "Handwriting AI", "Neon Text", "Fire Text", "Ice Text",
  "Gold Text", "Chrome Text", "Glass Text", "3D Extrude", "Bevel Tool",
  "Title Sequence AI", "Credit Roll Builder", "Chapter Title AI", "Opening Title Pro", "Closing Credits AI",
  "Subtitle Designer", "Caption Styler", "Text Tracking AI", "Dynamic Text", "Animated Logo Pro",
  "Color Grading Pro", "Primary Color Wheels", "Secondary Color Fix", "Creative LUT Maker", "Curves Master Pro", "HSL Adjustment", "Power Window AI", "Gradient Mask Tool", "Color Match Studio", "Shot Color Match", "Auto Color Balance", "Auto Tone Mapper", "Auto Contrast AI", "HDR Tone Mapper", "Gamut Checker", "False Color View", "Zebra Pattern AI", "Waveform Analyzer", "Vectorscope Tool", "Histogram Analyzer"
];

/* ─── NAV HELPERS ─── */
const NavButtons = ({ onBack, onNext, backLabel = "← Back", nextLabel = "Next →" }) => (
  <div className="flex gap-4 justify-center mt-8 mb-4">
    {onBack && (
      <button onClick={onBack} className="px-8 py-3 border border-purple-500 text-purple-400 font-bold rounded-lg hover:bg-purple-500 hover:text-white transition-all duration-300 flex items-center gap-2">
        {backLabel}
      </button>
    )}
    {onNext && (
      <button onClick={onNext} className="px-8 py-3 border border-purple-500 text-purple-400 font-bold rounded-lg hover:bg-purple-500 hover:text-white transition-all duration-300 flex items-center gap-2">
        {nextLabel}
      </button>
    )}
  </div>
);

const Footer = () => (
  <footer className="text-center mt-12 text-xs text-gray-600">
    MandaStrong Studio © 2025 • Author of Doxy The School Bully • MandaStrong1.Etsy.com
  </footer>
);

/* ─── PAGE 1: WELCOME ─── */
const Page1 = ({ onNext, onLogin, onRegister }) => {
  const videoRef = useRef(null);
  const avatarRef = useRef(null);
  const [avatarPlaying, setAvatarPlaying] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <video ref={videoRef} autoPlay loop playsInline muted className="absolute inset-0 w-full h-full object-cover">
        <source src={OCEAN_VIDEO} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      {/* Avatar bubble bottom-right */}
      <div className="absolute bottom-8 right-8 w-48 h-36 rounded-2xl overflow-hidden border-4 border-white shadow-2xl z-10">
        <video ref={avatarRef} loop playsInline muted className="w-full h-full object-cover">
          <source src={AVATAR_VIDEO} type="video/mp4" />
        </video>
        {!avatarPlaying && (
          <button onClick={() => { avatarRef.current && avatarRef.current.play(); setAvatarPlaying(true); }} className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 hover:bg-opacity-40 transition-all">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Play className="w-6 h-6 text-black ml-0.5" fill="black" />
            </div>
          </button>
        )}
      </div>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <h1 className="text-5xl font-black text-white mb-4 text-center px-6" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8)', fontFamily: 'Impact, sans-serif', letterSpacing: '0.08em' }}>
          MANDASTRONG'S STUDIO
        </h1>
        <p className="text-xl italic text-white mb-10 text-center px-6 max-w-2xl" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}>
          Welcome To The All-In-One Make-A-Movie App!
        </p>
        <div className="flex gap-4">
          <button onClick={onNext} className="px-8 py-3 bg-black text-white font-bold text-lg rounded-lg hover:bg-gray-800 transition-all shadow-xl hover:scale-105">Next</button>
          <button onClick={onLogin} className="px-8 py-3 bg-black text-white font-bold text-lg rounded-lg hover:bg-gray-800 transition-all shadow-xl hover:scale-105">Login</button>
          <button onClick={onRegister} className="px-8 py-3 bg-black text-white font-bold text-lg rounded-lg hover:bg-gray-800 transition-all shadow-xl hover:scale-105">Register</button>
        </div>
      </div>
    </div>
  );
};

/* ─── PAGE 2: INTRODUCTION ─── */
const Page2 = ({ onBack, onNext }) => (
  <div className="w-full h-full overflow-y-auto" style={{ background: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 40%, #5b21b6 100%)' }}>
    <div className="flex flex-col items-center justify-center min-h-full p-8">
      <div className="text-6xl mb-6">✨</div>
      <h1 className="text-5xl font-black text-white mb-6 text-center" style={{ fontFamily: 'Impact, sans-serif', letterSpacing: '0.06em' }}>
        MANDASTRONG'S STUDIO
      </h1>
      <p className="text-xl text-white text-center max-w-2xl mb-10 leading-relaxed font-medium">
        Make Amazing Family Movies & Bring Dreams To Life!
      </p>
      <NavButtons onBack={onBack} onNext={onNext} />
      {/* Chat bubble icon bottom-right */}
      <div className="fixed bottom-6 right-6">
        <button className="w-14 h-14 bg-purple-600 rounded-full flex items-center justify-center shadow-lg hover:bg-purple-500 transition-all hover:scale-110">
          <MessageCircle className="w-7 h-7 text-white" />
        </button>
      </div>
      <Footer />
    </div>
  </div>
);

/* ─── PAGE 3: MOVIE UPLOAD CHECK ─── */
const Page3 = ({ onBack, onNext }) => (
  <div className="w-full h-full bg-black text-white overflow-y-auto p-8">
    <div className="max-w-2xl mx-auto">
      <div className="flex flex-col items-center mt-12 mb-8">
        <Film className="w-16 h-16 text-purple-500 mb-4" />
        <h1 className="text-3xl font-bold text-white mb-3">No Movie Uploaded</h1>
        <p className="text-gray-400 text-center text-lg">Upload a Christmas movie to watch it here!</p>
      </div>
      <div className="text-center mt-8">
        <button onClick={onNext} className="px-8 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-500 transition-all text-lg">
          Go to Upload Page
        </button>
      </div>
      <NavButtons onBack={onBack} onNext={onNext} />
      <Footer />
    </div>
  </div>
);

/* ─── PAGE 4: LOGIN / REGISTER + PRICING ─── */
const Page4 = ({ onBack, onNext }) => {
  const [tab, setTab] = useState('signin');
  return (
    <div className="w-full h-full bg-black text-white overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto">
        {/* Amanda header */}
        <div className="bg-gray-900 border border-purple-500 rounded-xl p-6 mb-6 text-center">
          <h2 className="text-3xl font-black text-purple-400 mb-1">AMANDA STRONG</h2>
          <p className="text-white font-bold">Studio Plan</p>
        </div>

        {/* Sign In / Create Account */}
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-8">
          <div className="flex gap-3 mb-5">
            <button onClick={() => setTab('signin')} className={"flex-1 py-2 rounded-lg font-bold transition-all " + (tab === 'signin' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700')}>Sign In</button>
            <button onClick={() => setTab('signup')} className={"flex-1 py-2 rounded-lg font-bold transition-all " + (tab === 'signup' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700')}>Create Account</button>
          </div>
          {tab === 'signin' && (
            <div>
              <label className="block text-sm text-gray-400 mb-1">Email Address</label>
              <input type="email" placeholder="Email Address" className="w-full p-3 mb-3 bg-gray-800 rounded-lg text-white placeholder-gray-500 border border-gray-700 focus:border-purple-500 focus:outline-none" />
              <label className="block text-sm text-gray-400 mb-1">Password</label>
              <input type="password" placeholder="Password" className="w-full p-3 mb-4 bg-gray-800 rounded-lg text-white placeholder-gray-500 border border-gray-700 focus:border-purple-500 focus:outline-none" />
              <button className="w-full py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-500 transition-all">Sign In</button>
            </div>
          )}
          {tab === 'signup' && (
            <div>
              <label className="block text-sm text-gray-400 mb-1">Full Name</label>
              <input type="text" placeholder="Full Name" className="w-full p-3 mb-3 bg-gray-800 rounded-lg text-white placeholder-gray-500 border border-gray-700 focus:border-purple-500 focus:outline-none" />
              <label className="block text-sm text-gray-400 mb-1">Email Address</label>
              <input type="email" placeholder="Email Address" className="w-full p-3 mb-3 bg-gray-800 rounded-lg text-white placeholder-gray-500 border border-gray-700 focus:border-purple-500 focus:outline-none" />
              <label className="block text-sm text-gray-400 mb-1">Password</label>
              <input type="password" placeholder="Password" className="w-full p-3 mb-4 bg-gray-800 rounded-lg text-white placeholder-gray-500 border border-gray-700 focus:border-purple-500 focus:outline-none" />
              <button className="w-full py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-500 transition-all">Create Account</button>
            </div>
          )}
          <p className="text-center text-gray-500 mt-4 text-sm">or</p>
          <p className="text-center text-gray-400 text-sm mt-1">Explore features without creating an account</p>
        </div>

        {/* Pricing */}
        <h2 className="text-3xl font-bold text-center text-purple-400 mb-2">Choose Your Plan</h2>
        <p className="text-center text-gray-500 mb-6">Unlock your filmmaking potential</p>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { name: 'Basic', price: '0', dur: '30 min', tools: '100', storage: '5GB', export: 'HD', support: 'Email' },
            { name: 'Pro', price: '0', dur: '60 min', tools: '300', storage: '50GB', export: '4K', support: 'Priority', popular: true },
            { name: 'Studio', price: '0', dur: '150 min', tools: '600', storage: '500GB', export: '8K', support: '24/7 Live', selected: true }
          ].map((plan, i) => (
            <div key={i} className={"rounded-xl p-5 border-2 transition-all " + (plan.selected ? 'border-purple-500 bg-gray-900 scale-105 shadow-lg shadow-purple-500/20' : plan.popular ? 'border-purple-400 bg-gray-900' : 'border-gray-700 bg-gray-900 hover:border-purple-500')}>
              {plan.popular && <div className="text-center mb-2"><span className="bg-purple-600 text-white text-xs px-3 py-1 rounded-full font-bold">Most Popular</span></div>}
              {plan.selected && <div className="text-center mb-2"><span className="bg-purple-600 text-white text-xs px-3 py-1 rounded-full font-bold">✓ Selected</span></div>}
              <h3 className="text-xl font-bold text-white text-center mb-2">{plan.name}</h3>
              <p className="text-3xl font-black text-purple-400 text-center mb-1">{plan.price}<span className="text-sm font-normal text-gray-500">/mo</span></p>
              <p className="text-xs text-gray-500 text-center mb-3">{plan.dur} movie duration</p>
              <ul className="space-y-1.5 text-sm text-gray-300 mb-4">
                <li className="flex items-center"><span className="text-purple-400 mr-2">✓</span>{plan.export} Export</li>
                <li className="flex items-center"><span className="text-purple-400 mr-2">✓</span>{plan.tools} AI Tools</li>
                <li className="flex items-center"><span className="text-purple-400 mr-2">✓</span>{plan.storage} Storage</li>
                <li className="flex items-center"><span className="text-purple-400 mr-2">✓</span>{plan.support} Support</li>
              </ul>
              <button className={"w-full py-2 rounded-lg font-bold transition-all " + (plan.selected ? 'bg-purple-600 text-white cursor-default' : 'bg-gray-700 text-white hover:bg-purple-600')}>
                {plan.selected ? 'Selected' : 'Subscribe'}
              </button>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-600 text-xs mb-2">Secure payment • Cancel anytime</p>
        <NavButtons onBack={onBack} onNext={onNext} />
        <Footer />
      </div>
    </div>
  );
};

/* ─── PAGES 5-9: TOOL BOARD (5 pages × 120 tools) ─── */
const ToolBoardPage = ({ pageNum, tools, onBack, onNext }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const filtered = tools.filter(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
  return (
    <div className="w-full h-full bg-black text-white overflow-y-auto">
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-400 text-center mb-1">TOOL BOARD</h1>
        <p className="text-center text-gray-500 text-sm mb-4">Page {pageNum} of 5 • {tools.length} tools</p>
        <div className="flex gap-3 justify-center mb-6">
          <input
            type="text"
            placeholder="Quick search tools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none text-sm"
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-8">
          {filtered.map((tool, i) => (
            <button key={i} className="bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-purple-500 text-white text-sm font-bold p-3 rounded-lg transition-all duration-200 hover:scale-105 flex items-center gap-2 min-h-[56px]">
              <Sparkles className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
              <span className="leading-tight text-left">{tool}</span>
            </button>
          ))}
        </div>
        <NavButtons onBack={onBack} onNext={onNext} />
        <Footer />
      </div>
    </div>
  );
};

/* ─── PAGE 10: UPLOAD / DOXY ─── */
const Page10 = ({ onBack, onNext }) => (
  <div className="w-full h-full bg-black text-white overflow-y-auto p-6">
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-purple-400 text-center mb-2">Doxy The School Bully</h1>
      <p className="text-center text-gray-500 mb-8">Upload & manage your movie files</p>

      <div className="bg-gray-900 border-2 border-dashed border-purple-500 rounded-xl p-10 text-center mb-6 hover:bg-gray-800 transition-all cursor-pointer"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); alert('File dropped! Ready for upload.'); }}>
        <Upload className="mx-auto mb-3 text-purple-400" size={40} />
        <p className="text-gray-300 font-bold mb-1">Drag & drop your movie file here</p>
        <p className="text-gray-600 text-sm">MP4, AVI, MOV, MKV supported • Up to 150 min</p>
      </div>
      <div className="text-center mb-8">
        <label className="px-8 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-500 transition-all cursor-pointer inline-flex items-center gap-2">
          <Upload size={18} /> Browse Files
          <input type="file" accept="video/*" className="hidden" />
        </label>
      </div>

      <div className="bg-gray-900 rounded-xl border border-gray-700 p-5">
        <h3 className="text-lg font-bold text-purple-400 mb-3">Open From:</h3>
        <div className="grid grid-cols-2 gap-3">
          {["Open Files", "Open Photos / Videos", "Open Google Drive", "Drag & Drop"].map((src, i) => (
            <button key={i} className="bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-purple-500 p-3 rounded-lg text-sm font-bold text-white transition-all">{src}</button>
          ))}
        </div>
      </div>

      <NavButtons onBack={onBack} onNext={onNext} />
      <Footer />
    </div>
  </div>
);

/* ─── PAGE 11: MEDIA LIBRARY ─── */
const Page11 = ({ onBack, onNext }) => (
  <div className="w-full h-full bg-black text-white overflow-y-auto">
    <div className="flex items-center justify-between p-4 px-6 border-b border-gray-800">
      <h1 className="text-xl font-bold text-purple-400">MEDIA LIBRARY</h1>
      <NavButtons onBack={onBack} onNext={onNext} />
    </div>
    <div className="p-6 max-w-5xl mx-auto">
      <button className="w-full py-3 bg-purple-600 text-white font-bold rounded-lg mb-6 hover:bg-purple-500 transition-all flex items-center justify-center gap-2">
        <Upload size={18} /> Upload Media
      </button>
      <div className="space-y-2">
        {[
          { name: "Christmas_Movie_2024.mp4", type: "video", size: "1.2 GB", dur: "1h 45m" },
          { name: "Background_Music.mp3", type: "audio", size: "45 MB", dur: "3m 22s" },
          { name: "Title_Card.png", type: "image", size: "2.4 MB", dur: "—" },
          { name: "Scene_02_Intro.mp4", type: "video", size: "320 MB", dur: "12m 08s" },
          { name: "Narration_Track.wav", type: "audio", size: "88 MB", dur: "5m 15s" },
          { name: "End_Credits_BG.jpg", type: "image", size: "1.8 MB", dur: "—" },
        ].map((file, i) => (
          <div key={i} className="bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-purple-500 rounded-lg p-3 flex items-center justify-between transition-all cursor-pointer">
            <div className="flex items-center gap-3">
              {file.type === 'video' ? <Film className="text-purple-400" size={20} /> : file.type === 'audio' ? <Volume2 className="text-blue-400" size={20} /> : <div className="w-5 h-5 bg-green-500 rounded" />}
              <span className="font-medium text-sm">{file.name}</span>
            </div>
            <div className="text-xs text-gray-500 flex gap-4">
              <span>{file.dur}</span>
              <span>{file.size}</span>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  </div>
);

/* ─── PAGE 12: TIMELINE EDITOR ─── */
const Page12 = ({ onBack, onNext }) => (
  <div className="w-full h-full bg-black text-white overflow-y-auto">
    <div className="flex items-center justify-between p-4 px-6 border-b border-gray-800">
      <h1 className="text-xl font-bold text-purple-400">TIMELINE EDITOR</h1>
      <NavButtons onBack={onBack} onNext={onNext} />
    </div>
    <div className="p-6 max-w-6xl mx-auto">
      {/* Preview */}
      <div className="bg-gray-900 rounded-xl border border-gray-700 h-48 flex items-center justify-center mb-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-transparent"></div>
        <div className="text-gray-600 text-lg z-10">Video Preview</div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-3">
          <label className="block text-xs text-purple-400 font-bold mb-1">Aspect Ratio</label>
          <select className="w-full bg-gray-800 p-2 rounded text-white text-sm border border-gray-600 focus:border-purple-500 focus:outline-none">
            <option>16:9</option><option>4:3</option><option>1:1</option><option>9:16</option><option>21:9</option>
          </select>
        </div>
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-3">
          <label className="block text-xs text-purple-400 font-bold mb-1">Resolution</label>
          <select className="w-full bg-gray-800 p-2 rounded text-white text-sm border border-gray-600 focus:border-purple-500 focus:outline-none">
            <option>1080p</option><option>4K</option><option>8K</option><option>720p</option>
          </select>
        </div>
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-3">
          <label className="block text-xs text-purple-400 font-bold mb-1">Volume</label>
          <input type="range" min="0" max="100" defaultValue="80" className="w-full accent-purple-500 mt-1" />
        </div>
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-3">
          <label className="block text-xs text-purple-400 font-bold mb-1">Duration (min)</label>
          <input type="number" defaultValue="90" max="150" className="w-full bg-gray-800 p-2 rounded text-white text-sm border border-gray-600 focus:border-purple-500 focus:outline-none" />
        </div>
      </div>

      {/* 4-Track Timeline */}
      <div className="bg-gray-900 rounded-xl border border-gray-700 p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-purple-400">Timeline — 4 Tracks</h3>
          <button className="px-4 py-1.5 bg-purple-600 text-white text-sm font-bold rounded hover:bg-purple-500 transition-all flex items-center gap-1"><Plus size={14} />Add Track</button>
        </div>
        {[
          { label: "SRT", color: "from-yellow-500 to-yellow-600", labelColor: "text-yellow-400", w: "75%" },
          { label: "VIDEO", color: "from-purple-500 to-purple-600", labelColor: "text-purple-400", w: "90%" },
          { label: "AUDIO", color: "from-blue-500 to-blue-600", labelColor: "text-blue-400", w: "60%" },
          { label: "TEXT", color: "from-green-500 to-green-600", labelColor: "text-green-400", w: "40%" }
        ].map((track, i) => (
          <div key={i} className="bg-gray-800 rounded-lg p-2.5 flex items-center gap-3 mb-2 border border-gray-700 hover:border-purple-500 transition-all">
            <span className={"text-xs font-black w-14 " + track.labelColor}>{track.label}</span>
            <div className="flex-1 bg-gray-700 rounded h-8 overflow-hidden">
              <div className={"bg-gradient-to-r " + track.color + " h-full rounded"} style={{ width: track.w }}></div>
            </div>
          </div>
        ))}
        <div className="flex justify-between text-xs text-gray-600 mt-2 px-14">
          <span>0:00</span><span>0:30</span><span>1:00</span><span>1:30</span><span>2:00</span><span>2:30</span><span>3:00</span>
        </div>
      </div>

      <NavButtons onBack={onBack} onNext={onNext} />
      <Footer />
    </div>
  </div>
);

/* ─── PAGE 13: AUDIO MIXER ─── */
const Page13 = ({ onBack, onNext }) => (
  <div className="w-full h-full bg-black text-white overflow-y-auto">
    <div className="flex items-center justify-between p-4 px-6 border-b border-gray-800">
      <h1 className="text-xl font-bold text-purple-400">AUDIO MIXER</h1>
      <NavButtons onBack={onBack} onNext={onNext} />
    </div>
    <div className="p-6 max-w-5xl mx-auto">
      <div className="grid grid-cols-4 gap-4 mb-8">
        {["Master", "Music", "Dialogue", "SFX"].map((ch, i) => (
          <div key={i} className="bg-gray-900 border border-gray-700 rounded-xl p-4">
            <h4 className="text-sm font-bold text-purple-400 text-center mb-3">{ch}</h4>
            <div className="flex justify-center gap-1 items-end" style={{ height: '100px' }}>
              <div className="w-6 bg-gray-700 rounded-sm relative">
                <div className="absolute bottom-0 left-0 right-0 bg-purple-500 rounded-sm" style={{ height:  }}></div>
              </div>
            </div>
            <input type="range" min="0" max="100" defaultValue={[85,60,75,40][i]} className="w-full accent-purple-500 mt-3" />
            <p className="text-xs text-gray-500 text-center mt-1">{[85,60,75,40][i]}%</p>
          </div>
        ))}
      </div>
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-5">
        <h3 className="text-lg font-bold text-purple-400 mb-3">Audio Tracks</h3>
        {[
          { name: "Background_Music.mp3", color: "bg-blue-500", w: "70%" },
          { name: "Narration_Track.wav", color: "bg-purple-500", w: "55%" },
          { name: "Sound_Effects.wav", color: "bg-green-500", w: "40%" },
        ].map((t, i) => (
          <div key={i} className="flex items-center gap-3 mb-3">
            <span className="text-sm w-48 truncate text-gray-300">{t.name}</span>
            <div className="flex-1 bg-gray-700 rounded h-6 overflow-hidden">
              <div className={t.color + " h-full rounded"} style={{ width: t.w }}></div>
            </div>
            <Volume2 className="text-gray-500 hover:text-purple-400 cursor-pointer" size={16} />
          </div>
        ))}
      </div>
      <NavButtons onBack={onBack} onNext={onNext} />
      <Footer />
    </div>
  </div>
);

/* ─── PAGE 14: SETTINGS & CONFIGURATION ─── */
const Page14 = ({ onBack, onNext }) => (
  <div className="w-full h-full bg-black text-white overflow-y-auto">
    <div className="flex items-center justify-between p-4 px-6 border-b border-gray-800">
      <h1 className="text-xl font-bold text-purple-400">SETTINGS & CONFIGURATION</h1>
      <NavButtons onBack={onBack} />
    </div>
    <div className="p-6 max-w-3xl mx-auto">
      {[
        { title: "Project Settings", items: ["Project Name", "Frame Rate: 24 fps", "Color Space: Rec.709", "Audio Format: AAC 256kbps"] },
        { title: "Export Preferences", items: ["Default Format: MP4 H.264", "Max Bitrate: 50 Mbps", "Audio Channels: Stereo", "Thumbnail: Auto-generate"] },
        { title: "AI Duration Calculator", items: ["Max Duration: 150 min", "Render Engine: GPU Accelerated", "Quality Mode: Professional", "Auto-save: Every 5 min"] },
      ].map((section, i) => (
        <div key={i} className="bg-gray-900 border border-gray-700 rounded-xl p-5 mb-4">
          <h3 className="text-lg font-bold text-purple-400 mb-3">{section.title}</h3>
          {section.items.map((item, j) => (
            <div key={j} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0">
              <span className="text-gray-300 text-sm">{item.split(':')[0]}</span>
              <span className="text-gray-500 text-sm">{item.includes(':') ? item.split(':').slice(1).join(':').trim() : ''}</span>
            </div>
          ))}
        </div>
      ))}
      <div className="bg-gray-900 border border-purple-500 rounded-xl p-5">
        <h3 className="text-lg font-bold text-purple-400 mb-3 flex items-center gap-2"><Zap size={18} /> Generate</h3>
        <p className="text-gray-400 text-sm mb-4">Generate your final movie with all settings applied. AI will calculate optimal duration and quality.</p>
        <button className="w-full py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-500 transition-all flex items-center justify-center gap-2"><Zap size={18} /> Generate Final Movie</button>
      </div>
      <NavButtons onBack={onBack} onNext={onNext} />
      <Footer />
    </div>
  </div>
);

/* ─── PAGE 15: FULL PREVIEW ─── */
const Page15 = ({ onBack, onNext }) => (
  <div className="w-full h-full bg-black text-white flex flex-col">
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-purple-400 text-center mb-4">Full-Screen Preview</h1>
        <div className="bg-gray-900 border-2 border-purple-500 rounded-xl flex items-center justify-center relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-transparent"></div>
          <Play className="w-24 h-24 text-purple-400 z-10 cursor-pointer hover:scale-110 transition-transform" />
        </div>
      </div>
    </div>
    <div className="p-4">
      <NavButtons onBack={onBack} onNext={onNext} />
    </div>
  </div>
);

/* ─── PAGE 16: TERMS OF SERVICE ─── */
const LegalPage = ({ title, content, onBack, onNext }) => (
  <div className="w-full h-full bg-black text-white overflow-y-auto p-8">
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-purple-400 text-center mb-8">{title}</h1>
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 text-gray-300 leading-relaxed space-y-4">
        {content.map((p, i) => <p key={i} className="text-sm">{p}</p>)}
      </div>
      <NavButtons onBack={onBack} onNext={onNext} />
      <Footer />
    </div>
  </div>
);

/* ─── PAGE 19: AGENT GROK HELP DESK ─── */
const Page19 = ({ onBack, onNext }) => (
  <div className="w-full h-full bg-black text-white overflow-y-auto p-6">
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-purple-400 text-center mb-2">Agent Grok 24/7 Help Desk</h1>
      <p className="text-gray-500 text-center mb-8">AI-powered support — always available</p>
      <div className="bg-gray-900 border border-purple-500 rounded-xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center"><Settings className="w-6 h-6 text-white" /></div>
          <div><h3 className="font-bold text-white">Agent Grok</h3><p className="text-xs text-green-400">● Online — Ready to help</p></div>
        </div>
        <p className="text-gray-400 text-sm mb-4">Hello! I'm Agent Grok, your 24/7 AI assistant for MandaStrong Studio. How can I help you today?</p>
        <div className="flex gap-2">
          <input type="text" placeholder="Type your question..." className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none text-sm" />
          <button className="px-4 py-2 bg-purple-600 rounded-lg font-bold hover:bg-purple-500 transition-all text-sm">Send</button>
        </div>
      </div>
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-5">
        <h3 className="font-bold text-white mb-3">Quick Help Topics</h3>
        <div className="grid grid-cols-2 gap-2">
          {["How to upload movies?","Setting up timeline","Using AI tools","Export settings","Account & billing","Technical support"].map((q, i) => (
            <button key={i} className="bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-purple-500 p-3 rounded-lg text-sm text-gray-300 text-left transition-all">{q}</button>
          ))}
        </div>
      </div>
      <NavButtons onBack={onBack} onNext={onNext} />
      <Footer />
    </div>
  </div>
);

/* ─── PAGE 20: COMMUNITY HUB ─── */
const Page20 = ({ onBack, onNext }) => (
  <div className="w-full h-full bg-black text-white overflow-y-auto p-6">
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-purple-400 text-center mb-2">Community Hub</h1>
      <p className="text-gray-500 text-center mb-6">Share, inspire, and connect with filmmakers</p>
      <div className="text-center mb-8">
        <button className="px-8 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-500 transition-all inline-flex items-center gap-2"><Upload size={18} /> Share Your Movie</button>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { title: "Dreams of Tomorrow", dur: "1h 45m", rating: "⭐ 4.9" },
          { title: "Ocean Depths", dur: "2h 10m", rating: "⭐ 4.7" },
          { title: "City Nights", dur: "1h 30m", rating: "⭐ 4.8" },
          { title: "Mountain Echo", dur: "2h 05m", rating: "⭐ 4.6" },
          { title: "Silent Sky", dur: "1h 55m", rating: "⭐ 4.9" },
          { title: "Golden Hour", dur: "1h 20m", rating: "⭐ 4.5" },
        ].map((movie, i) => (
          <div key={i} className="bg-gray-900 border border-gray-700 hover:border-purple-500 rounded-xl overflow-hidden transition-all hover:scale-105">
            <div className="bg-gray-800 h-40 flex items-center justify-center border-b border-gray-700">
              <Play className="w-12 h-12 text-purple-400 cursor-pointer hover:scale-110 transition-transform" />
            </div>
            <div className="p-4">
              <h3 className="font-bold mb-2">{movie.title}</h3>
              <div className="flex justify-between text-xs text-gray-500"><span>{movie.dur}</span><span>{movie.rating}</span></div>
              <div className="flex gap-3 mt-2">
                <button className="text-xs text-purple-400 hover:text-purple-300">👍 Like</button>
                <button className="text-xs text-red-400 hover:text-red-300">❤️ Love</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <NavButtons onBack={onBack} onNext={onNext} />
      <Footer />
    </div>
  </div>
);

/* ─── PAGE 21: THANK YOU / CLOSING ─── */
const Page21 = ({ onBack }) => (
  <div className="w-full h-full bg-black text-white flex flex-col items-center justify-center overflow-y-auto p-8">
    <div className="max-w-2xl text-center">
      <h1 className="text-5xl font-black text-purple-400 mb-8">Thank You!</h1>
      <p className="text-lg text-gray-300 mb-4">Dear Creator,</p>
      <p className="text-gray-400 mb-4 leading-relaxed">Thank you for choosing MandaStrong Studio to bring your creative vision to life. Your stories matter, and I am honored to be part of your filmmaking journey.</p>
      <p className="text-gray-400 mb-4 leading-relaxed">Whether you are creating family memories or turning dreams into reality, this platform was built with love to empower your creativity.</p>
      <p className="text-gray-400 mb-6 leading-relaxed">Keep creating, keep dreaming, and most importantly keep telling your stories.</p>
      <p className="text-xl font-bold text-purple-400 mb-8">— Amanda Strong</p>
      <div className="text-4xl font-black text-purple-400 mb-8 animate-pulse">That's All Folks!</div>
      <div className="flex justify-center gap-4 mb-6">
        <a href="https://mandastrong1.etsy.com" target="_blank" rel="noopener noreferrer" className="px-6 py-2 border border-purple-500 text-purple-400 rounded-lg hover:bg-purple-500 hover:text-white transition-all text-sm font-bold">Visit Etsy Store</a>
      </div>
      <button onClick={onBack} className="px-8 py-2 border border-gray-600 text-gray-400 rounded-lg hover:border-purple-500 hover:text-purple-400 transition-all flex items-center gap-2 mx-auto">
        <ChevronLeft size={16} /> Back
      </button>
      <Footer />
    </div>
  </div>
);

/* ─── MAIN APP ─── */
const App = () => {
  const [page, setPage] = useState(1);
  const go = (n) => setPage(n);

  const renderPage = () => {
    switch (page) {
      case 1:  return <Page1   onNext={() => go(2)} onLogin={() => go(4)} onRegister={() => go(4)} />;
      case 2:  return <Page2   onBack={() => go(1)} onNext={() => go(3)} />;
      case 3:  return <Page3   onBack={() => go(2)} onNext={() => go(4)} />;
      case 4:  return <Page4   onBack={() => go(3)} onNext={() => go(5)} />;
      case 5:  return <ToolBoardPage pageNum={1} tools={AI_TOOLS.slice(0,120)}    onBack={() => go(4)}  onNext={() => go(6)} />;
      case 6:  return <ToolBoardPage pageNum={2} tools={AI_TOOLS.slice(120,240)}  onBack={() => go(5)}  onNext={() => go(7)} />;
      case 7:  return <ToolBoardPage pageNum={3} tools={AI_TOOLS.slice(240,360)}  onBack={() => go(6)}  onNext={() => go(8)} />;
      case 8:  return <ToolBoardPage pageNum={4} tools={AI_TOOLS.slice(360,480)}  onBack={() => go(7)}  onNext={() => go(9)} />;
      case 9:  return <ToolBoardPage pageNum={5} tools={AI_TOOLS.slice(480,600)}  onBack={() => go(8)}  onNext={() => go(10)} />;
      case 10: return <Page10  onBack={() => go(9)}  onNext={() => go(11)} />;
      case 11: return <Page11  onBack={() => go(10)} onNext={() => go(12)} />;
      case 12: return <Page12  onBack={() => go(11)} onNext={() => go(13)} />;
      case 13: return <Page13  onBack={() => go(12)} onNext={() => go(14)} />;
      case 14: return <Page14  onBack={() => go(13)} onNext={() => go(15)} />;
      case 15: return <Page15  onBack={() => go(14)} onNext={() => go(16)} />;
      case 16: return <LegalPage title="Terms of Service" onBack={() => go(15)} onNext={() => go(17)} content={[
        "Welcome to MandaStrong Studio. By using this platform, you agree to these Terms of Service. We reserve the right to modify these terms at any time.",
        "You must be at least 13 years old to use this service. You are responsible for all content you create and upload through our platform.",
        "MandaStrong Studio grants you a limited, non-exclusive license to use the platform for creating, editing, and sharing movies and video content.",
        "You may not use the platform for any illegal purpose, including but not limited to creating content that infringes on others' intellectual property rights.",
        "MandaStrong Studio is not liable for any damages arising from the use of this platform. Use at your own risk.",
        "We may terminate your account at any time if you violate these terms. All provisions shall survive termination."
      ]} />;
      case 17: return <LegalPage title="Disclaimer" onBack={() => go(16)} onNext={() => go(18)} content={[
        "This disclaimer applies to all content and services provided by MandaStrong Studio. We make no warranties, express or implied, regarding the platform.",
        "The platform is provided 'as is' and we do not guarantee uninterrupted service, accuracy, or fitness for any particular purpose.",
        "MandaStrong Studio's AI tools are experimental and may produce varying results. Always review AI-generated content before publishing.",
        "We are not responsible for any content created by users or any third-party services integrated into the platform.",
        "By using this platform, you acknowledge that you have read and understood this disclaimer and agree to its terms."
      ]} />;
      case 18: return <LegalPage title="Privacy Policy" onBack={() => go(17)} onNext={() => go(19)} content={[
        "MandaStrong Studio collects personal information such as your name, email, and usage data to provide and improve our services.",
        "We do not sell your personal data to third parties. Your data is stored securely and encrypted at rest and in transit.",
        "You have the right to access, modify, and delete your personal data at any time by contacting our support team.",
        "We use cookies and similar tracking technologies to enhance your experience. You can opt out of non-essential cookies in your settings.",
        "This privacy policy is subject to change. We will notify you of any significant changes via email or in-app notification."
      ]} />;
      case 19: return <Page19  onBack={() => go(18)} onNext={() => go(20)} />;
      case 20: return <Page20  onBack={() => go(19)} onNext={() => go(21)} />;
      case 21: return <Page21  onBack={() => go(20)} />;
      default: return <Page1   onNext={() => go(2)} onLogin={() => go(4)} onRegister={() => go(4)} />;
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden bg-black">
      {renderPage()}
    </div>
  );
};

export default App;
