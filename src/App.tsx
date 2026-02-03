import React, { useState, useRef, useEffect } from 'react';
import { Play, ChevronLeft, ChevronRight, Upload, Download, Save, Share2, Film, Scissors, Volume2, Zap, Settings, Eye, Trash2, Copy, Plus, Minus, Sparkles } from 'lucide-react';

const OCEAN_VIDEO = "https://assets.mixkit.co/videos/preview/mixkit-ocean-waves-loop-1196-large.mp4";
const AVATAR_VIDEO = "https://assets.mixkit.co/videos/preview/mixkit-person-holding-a-camera-3037-small.mp4";

const AI_TOOLS = [
  "Script Generator", "Story Architect", "Plot Weaver", "Character Designer", "Dialogue AI",
  "Scene Planner", "Shot List Pro", "Storyboard Creator", "Script Analyzer", "Genre Consultant",
  "Premise Builder", "Conflict Generator", "Theme Developer", "Arc Constructor", "Beat Sheet AI",
  "Logline Writer", "Synopsis Pro", "Treatment Builder", "Pitch Deck AI", "Budget Calculator",
  "Schedule Optimizer", "Location Scout AI", "Casting Director", "Costume Designer", "Prop Manager",
  "Set Designer Pro", "Mood Board AI", "Color Palette Pro", "Style Guide", "Reference Library",
  "Shot Composer", "Camera Angle AI", "Movement Planner", "Lens Advisor", "Focal Length Guide",
  "Depth Calculator", "Focus Puller", "Exposure Meter", "ISO Optimizer", "Aperture Guide",
  "Shutter Speed AI", "White Balance Pro", "ND Filter Guide", "Gimbal Stabilizer", "Dolly Tracker",
  "Crane Planner", "Steadicam AI", "Handheld Smoother", "Drone Pilot", "Aerial Composer",
  "Time-lapse Builder", "Hyper-lapse Pro", "Slow Motion AI", "Speed Ramper", "Frame Blender",
  "Optical Flow Pro", "Motion Interpolation", "Frame Rate Converter", "Aspect Ratio Tool", "Crop Assistant",
  "Lighting Designer", "Three-Point Setup", "Key Light AI", "Fill Light Pro", "Back Light Guide",
  "Practical Lights", "Natural Light AI", "Studio Setup", "Location Light", "Color Temperature",
  "Gel Selector", "Light Intensity", "Shadow Control", "Contrast Manager", "Dynamic Range",
  "HDR Mapper", "Exposure Blend", "Highlight Recovery", "Shadow Lifter", "Midtone Balance",
  "LUT Creator Pro", "Grade Matcher", "Color Harmony", "Cinematic Look", "Film Emulation",
  "Digital Cinema", "Vintage Filter", "Modern Grade", "Commercial Style", "Documentary Look",
  "Audio Recorder Pro", "Voice Capture", "ADR Studio", "Foley Creator", "Ambience Generator",
  "Music Composer AI", "Sound Designer", "Audio Editor Pro", "Noise Reducer", "Hum Remover",
  "Click Eliminator", "Pop Filter", "Breath Remover", "De-Esser Pro", "Compressor AI",
  "EQ Wizard", "Reverb Designer", "Delay Creator", "Chorus Effect", "Flanger Pro",
  "Phaser Effect", "Distortion AI", "Saturation Pro", "Limiter Guard", "Gate Controller",
  "Expander Pro", "Multi-band Comp", "Stereo Widener", "Pan Automation", "Volume Mixer",
  "Fade Designer", "Cross-fade Pro", "Audio Ducking", "Side-chain AI", "Sync Master",
  "Voice Clone AI", "Text-to-Speech Pro", "Speech-to-Text", "Auto Transcribe", "Caption Generator",
  "Subtitle Sync", "Translation AI", "Localization Pro", "Dubbing Studio", "Lip Sync AI",
  "Voice Enhancer", "Clarity Boost", "Vocal Isolation", "Background Remover", "Voice Morph",
  "Pitch Shifter", "Tempo Changer", "Voice Age AI", "Gender Morph", "Accent Trainer",
  "Dialect Generator", "Emotion Mapper", "Tone Analyzer", "Inflection AI", "Pronunciation Guide",
  "Timeline Master", "Multi-track Editor", "Ripple Edit Pro", "Roll Edit AI", "Slip Editor",
  "Slide Tool", "Trim Precision", "Extend Editor", "Split Smart", "Join Seamless",
  "Group Manager", "Link Controller", "Nest Creator", "Compound Clip", "Multi-cam Sync",
  "Clip Merger", "Replace Tool", "Insert Smart", "Overwrite Pro", "Three-point Edit",
  "Four-point Edit", "Match Frame", "Find Gap", "Sequence Settings", "Timeline Zoom",
  "Transition Library", "Fade Master", "Dissolve Pro", "Wipe Designer", "Slide Animator",
  "Push Effect", "Zoom Transition", "Spin Creator", "Flip Designer", "3D Rotate",
  "Cube Spin", "Door Swing", "Window Reveal", "Curtain Pull", "Iris Wipe",
  "Clock Wipe", "Heart Shape", "Star Burst", "Organic Wipe", "Light Leak",
  "Lens Flare Pro", "Light Rays", "God Rays", "Sun Burst", "Glow Effect",
  "Bloom Designer", "Chromatic Aberration", "RGB Split", "Glitch Generator", "Data Moshing",
  "Green Screen Pro", "Chroma Keyer", "Luma Key", "Difference Key", "Color Range",
  "Spill Suppressor", "Edge Refiner", "Matte Cleaner", "Roto Tool Pro", "Mask Designer",
  "Track Mask", "Planar Tracker", "Point Tracker", "Camera Tracker", "Object Tracker",
  "Stabilizer Pro", "Deshake AI", "Rolling Shutter Fix", "Lens Corrector", "Distortion Fixer",
  "Vignette Tool", "CA Remover", "Sharpen Pro", "Blur Master", "Gaussian Blur",
  "Motion Blur Pro", "Radial Blur", "Zoom Blur", "Tilt-shift Effect", "Miniature Mode",
  "Film Grain AI", "Noise Generator", "Dust Overlay", "Scratch Effect", "Damage Creator",
  "Old Film Look", "8mm Emulator", "16mm Style", "Super 8 Feel", "VHS Aesthetic",
  "Scan Lines", "CRT Effect", "TV Static", "Signal Error", "Pixel Sorter",
  "Weather Generator", "Rain Creator", "Snow Effect", "Fog Machine", "Mist Layer",
  "Smoke Designer", "Fire Simulator", "Explosion FX", "Debris System", "Spark Generator",
  "Lightning Strike", "Thunder Flash", "Wind Effect", "Leaves Particles", "Dust Motes",
  "Light Particles", "Magic Sparkles", "Energy Beam", "Laser Effect", "Plasma Arc",
  "Muzzle Flash", "Blood Splatter", "Bullet Hole", "Glass Shatter", "Wood Splinter",
  "Metal Dent", "Concrete Crack", "Dust Cloud", "Dirt Kick", "Water Splash",
  "Sweat Drop", "Tear Effect", "Breath Vapor", "Steam Effect", "Heat Haze",
  "Speed Lines", "Motion Trails", "Action Lines", "Impact Flash", "Screen Shake",
  "Face Swap AI", "Age Progression", "Age Regression", "Beauty Filter Pro", "Skin Smoother",
  "Eye Enhancer", "Teeth Whitener", "Hair Color AI", "Makeup Virtual", "Face Morph",
  "Expression Clone", "Emotion Transfer", "Blink Fixer", "Gaze Corrector", "Head Tracker",
  "Body Tracker", "Pose Estimator", "Motion Capture", "Facial Capture", "Performance Clone",
  "Lower Third Pro", "Title Designer", "End Card Maker", "Bug Creator", "Watermark Pro",
  "Logo Animator", "Text Animator", "Typewriter Effect", "Letter Reveal", "Word Slide",
  "Line Draw", "Handwriting AI", "Neon Text", "Fire Text", "Ice Text",
  "Gold Text", "Chrome Text", "Glass Text", "3D Extrude", "Bevel Tool",
  "Primary Corrector", "Secondary Grade", "Creative LUT", "Curves Master", "Color Wheels Pro",
  "HSL Secondary", "Qualifier Tool", "Power Window", "Gradient Mask", "Vignette Pro",
  "Color Match AI", "Shot Matcher", "Auto Balance", "Auto Tone", "Auto Contrast",
  "HDR Tone Map", "Gamut Warning", "False Color", "Zebra Pattern", "Waveform Pro",
  "Vectorscope Pro", "Histogram Pro", "Parade RGB", "Luma Graph", "Chroma Meter",
  "Lift Gamma Gain", "Offset Control", "Contrast Pro", "Saturation AI", "Vibrance Tool",
  "Hue Shift Pro", "Temperature Control", "Tint Adjuster", "Shadow Detail", "Midtone Balance",
  "Highlight Roll", "Black Point", "White Point", "Clarity Boost", "Dehaze Pro",
  "Master Mix", "Loudness Meter", "Peak Limiter", "RMS Analyzer", "True Peak",
  "LUFS Meter", "Dynamic Range", "Broadcast Safe", "Audio Normalize", "Level Matcher",
  "Phase Correlation", "Stereo Analyzer", "Frequency Graph", "Spectral Display", "Audio Repair",
  "Layer Manager", "Blend Modes", "Opacity Control", "Track Matte", "Alpha Channel",
  "Premultiply", "Channel Mixer", "Extract Channel", "Combine RGBA", "Split Channels",
  "Luma Matte", "Color Matte", "Difference Matte", "Garbage Matte", "Hold Out Matte",
  "3D Camera", "3D Light", "3D Layer", "Extrusion Pro", "Bevel Designer",
  "Material Editor", "Texture Mapper", "Environment Map", "Reflection Map", "Ray Tracer",
  "Shadow Catcher", "Ambient Occlusion", "Global Illumination", "Caustics", "Volumetrics",
  "Keyframe Pro", "Ease In Out", "Bezier Control", "Graph Editor", "Velocity Graph",
  "Motion Path", "Orient Along Path", "Position Animator", "Rotation Controller", "Scale Animator",
  "Opacity Fader", "Parameter Control", "Expression Engine", "Parent Link", "Null Object",
  "2D Tracker Pro", "3D Camera Solve", "Planar Track Pro", "Point Cloud", "Match Move",
  "Stabilization Pro", "Smooth Motion", "Lock Shot", "Remove Jitter", "Warp Stabilizer",
  "Rolling Shutter Repair", "Parallax Fixer", "Perspective Match", "Corner Pin", "Mesh Warp",
  "Time Remapping", "Speed Curves", "Frame Hold", "Freeze Frame", "Reverse Time",
  "Loop Creator", "Ping Pong", "Time Stretch", "Speed Ramp Pro", "Optical Flow Advanced",
  "Frame Blending Pro", "Motion Vectors", "Twixtor Effect", "Time Displacement", "Temporal Smooth",
  "Render Queue Pro", "Batch Export", "Smart Export", "Preset Manager", "Format Selector",
  "Codec Optimizer", "Bitrate Calculator", "Quality Analyzer", "File Validator", "Metadata Editor",
  "Timecode Burn", "Slate Generator", "Watermark Embed", "Caption Burn", "Chapter Markers",
  "DVD Authoring", "Blu-ray Master", "DCP Creator", "Cinema Package", "Broadcast Delivery",
  "YouTube Optimizer", "Vimeo Pro", "Instagram Reels", "TikTok Format", "Facebook Video",
  "Twitter Optimize", "LinkedIn Video", "Twitch Export", "Discord Compress", "WhatsApp Format",
  "Project Organizer", "Media Browser", "Smart Bins", "Metadata Tagger", "Keyword Search",
  "Rating System", "Color Labels", "Comments Manager", "Notes Panel", "Task Tracker",
  "Version Control", "Revision History", "Team Collaborate", "Client Review", "Approval System",
  "Archive Project", "Consolidate Media", "Relink Files", "Proxy Manager", "Offline Mode",
  "Neural Engine AI", "Machine Learning", "Deep Learning Pro", "AI Upscale 8K", "Temporal Denoise",
  "Scene Detection", "Smart Conform", "Auto Reframe", "Content Aware Fill", "Professional Master",
  "360 Video Pro", "VR Content", "AR Creator", "XR Studio", "Spatial Audio Pro",
  "Dolby Atmos", "5.1 Surround", "7.1 Cinema", "Binaural Audio", "Ambisonic Mix",
  "Multi-format Export", "Adaptive Bitrate", "Streaming Optimizer", "Live Broadcast", "Remote Collab",
  "Cloud Render", "Distributed Processing", "GPU Accelerate", "Real-time Preview", "Proxy Workflow",
  "Media Management", "Asset Tracking", "Rights Management", "Version Tracking", "Backup Automation",
  "Security Encryption", "Watermark Protection", "DRM Integration", "Access Control", "Audit Trail",
  "Analytics Dashboard", "Usage Metrics", "Performance Monitor", "Quality Control", "Delivery Check",
  "Format Conversion", "Standards Compliance", "Color Space Convert", "Frame Rate Adapt", "Resolution Scale",
  "Audio Conform", "Loudness Normalize", "Sync Validation", "Metadata Embed", "Closed Caption QC",
  "Subtitle Validation", "Language Check", "Accessibility Audit", "Platform Compliance", "Broadcast Standards",
  "Cinema DCP Check", "Festival Format", "Archive Format", "Preservation Master", "Distribution Copy",
  "Screening Preview", "Client Review Copy", "Edit Decision List", "AAF Export", "XML Exchange",
  "Project Archive", "Media Consolidate", "Conform AAF", "Reconnect Media", "Update Links"
];

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [avatarPlaying, setAvatarPlaying] = useState(false);
  const oceanRef = useRef(null);
  const avatarRef = useRef(null);

  useEffect(() => {
    if (oceanRef.current && (currentPage === 1 || currentPage === 2)) {
      oceanRef.current.muted = false;
      const playPromise = oceanRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          oceanRef.current.muted = true;
          oceanRef.current.play();
        });
      }
    }
  }, [currentPage]);

  const handleAvatarPlay = () => {
    if (avatarRef.current) {
      avatarRef.current.play();
      setAvatarPlaying(true);
    }
  };

  const renderPage = () => {
    switch(currentPage) {
      case 1:
        return <Page1 
          oceanRef={oceanRef} 
          avatarRef={avatarRef}
          avatarPlaying={avatarPlaying}
          onAvatarPlay={handleAvatarPlay}
          onNext={() => setCurrentPage(2)}
          onLogin={() => setCurrentPage(3)}
          onRegister={() => setCurrentPage(3)}
        />;
      case 2:
        return <Page2 
          oceanRef={oceanRef}
          onBack={() => setCurrentPage(1)}
          onNext={() => setCurrentPage(3)}
        />;
      case 3:
        return <Page3 
          onBack={() => setCurrentPage(2)}
          onNext={() => setCurrentPage(4)}
        />;
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
        return <ToolBoardPage 
          pageNum={currentPage}
          tools={AI_TOOLS.slice((currentPage - 4) * 120, (currentPage - 3) * 120)}
          onBack={() => setCurrentPage(currentPage - 1)}
          onNext={() => setCurrentPage(currentPage + 1)}
          onToolClick={(tool) => setCurrentPage(9)}
        />;
      case 9:
      case 11:
      case 12:
        return <EditorPage 
          pageNum={currentPage - 8}
          onBack={() => setCurrentPage(currentPage - 1)}
          onNext={() => setCurrentPage(currentPage + 1)}
        />;
      case 10:
        return <EditorsChoicePage
          onBack={() => setCurrentPage(9)}
          onNext={() => setCurrentPage(11)}
        />;
      case 13:
        return <FinalEditorPage 
          onBack={() => setCurrentPage(12)}
          onNext={() => setCurrentPage(14)}
        />;
      case 14:
        return <ViewerPage 
          onBack={() => setCurrentPage(13)}
          onNext={() => setCurrentPage(15)}
        />;
      case 15:
        return <LegalPage 
          title="Terms of Service"
          onBack={() => setCurrentPage(14)}
          onNext={() => setCurrentPage(16)}
        />;
      case 16:
        return <LegalPage 
          title="Disclaimer"
          onBack={() => setCurrentPage(15)}
          onNext={() => setCurrentPage(17)}
        />;
      case 17:
        return <LegalPage 
          title="Privacy Policy"
          onBack={() => setCurrentPage(16)}
          onNext={() => setCurrentPage(18)}
        />;
      case 18:
        return <LegalPage 
          title="Social Media Guidelines"
          onBack={() => setCurrentPage(17)}
          onNext={() => setCurrentPage(19)}
        />;
      case 19:
        return <CommunityPage 
          onBack={() => setCurrentPage(18)}
          onNext={() => setCurrentPage(20)}
        />;
      case 20:
        return <ContactPage 
          onBack={() => setCurrentPage(19)}
          onNext={() => setCurrentPage(21)}
        />;
      case 21:
        return <ThankYouPage 
          onBack={() => setCurrentPage(20)}
        />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden bg-black">
      {renderPage()}
    </div>
  );
};

const Page1 = ({ oceanRef, avatarRef, avatarPlaying, onAvatarPlay, onNext, onLogin, onRegister }) => (
  <div className="relative w-full h-full overflow-hidden">
    <video 
      ref={oceanRef}
      autoPlay 
      loop 
      playsInline
      className="absolute inset-0 w-full h-full object-cover"
    >
      <source src={OCEAN_VIDEO} type="video/mp4" />
    </video>

    <div className="absolute bottom-8 right-8 w-64 h-48 rounded-full overflow-hidden border-4 border-white shadow-2xl">
      <video 
        ref={avatarRef}
        loop
        playsInline
        className="w-full h-full object-cover"
      >
        <source src={AVATAR_VIDEO} type="video/mp4" />
      </video>
      {!avatarPlaying && (
        <button 
          onClick={onAvatarPlay}
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-60 transition-all duration-300"
        >
          <div className="w-16 h-16 flex items-center justify-center bg-white rounded-full shadow-lg hover:scale-110 transition-transform">
            <Play className="w-8 h-8 text-black ml-1" fill="black" />
          </div>
        </button>
      )}
    </div>

    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <h1 className="text-7xl font-black text-black bg-white bg-opacity-95 px-12 py-6 mb-6 shadow-2xl" 
          style={{ fontFamily: 'Impact, sans-serif', letterSpacing: '0.15em' }}>
        MandaStrong Studio
      </h1>
      <p className="text-2xl font-bold italic text-black bg-white bg-opacity-90 px-8 py-4 mb-16 shadow-xl">
        Professional cinema production platform with AI-powered tools for creating feature-length films up to 3 hours
      </p>
      
      <div className="flex gap-6">
        <button onClick={onNext} className="px-12 py-5 bg-black text-white font-bold text-xl rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105">
          Next
        </button>
        <button onClick={onLogin} className="px-12 py-5 bg-black text-white font-bold text-xl rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105">
          Login
        </button>
        <button onClick={onRegister} className="px-12 py-5 bg-black text-white font-bold text-xl rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105">
          Register
        </button>
      </div>
    </div>
  </div>
);

const Page2 = ({ oceanRef, onBack, onNext }) => (
  <div className="relative w-full h-full overflow-hidden">
    <video 
      ref={oceanRef}
      autoPlay 
      loop 
      muted={false}
      playsInline
      className="absolute inset-0 w-full h-full object-cover"
    >
      <source src={OCEAN_VIDEO} type="video/mp4" />
    </video>

    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <h1 className="text-7xl font-black italic text-black bg-white bg-opacity-95 px-12 py-6 mb-6 shadow-2xl"
          style={{ fontFamily: 'Impact, sans-serif', letterSpacing: '0.1em' }}>
        MANDASTRONG'S STUDIO
      </h1>
      <p className="text-3xl font-bold italic text-black bg-white bg-opacity-90 px-10 py-5 mb-16 max-w-4xl text-center shadow-xl leading-relaxed">
        Welcome! Make Awesome Family Videos Or Turn Your Dreams Into Film Reality! Enjoy.
      </p>
      
      <div className="flex gap-6">
        <button onClick={onBack} className="px-12 py-5 bg-black text-white font-bold text-xl rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105">
          Back
        </button>
        <button onClick={onNext} className="px-12 py-5 bg-black text-white font-bold text-xl rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105">
          Next
        </button>
      </div>
    </div>
  </div>
);

// ✅ FIXED PAGE 3 - NO FREE PLAN, AMANDA AS $50 STUDIO PRO OWNER
const Page3 = ({ onBack, onNext }) => {
  const [view, setView] = useState('signin');
  return (
  <div className="w-full h-full bg-black text-white p-8 overflow-y-auto">
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border-2 border-purple-500 mb-10 text-center shadow-xl">
        <h2 className="text-4xl font-black mb-2 text-purple-500">AMANDA STRONG</h2>
        <p className="text-xl text-white font-bold">Studio Plan</p>
      </div>
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border-2 border-gray-700 p-8 mb-10 shadow-xl">
        <div className="flex gap-4 mb-6">
          <button onClick={() => setView('signin')} className={`flex-1 py-3 rounded-lg font-bold transition-all ${view === 'signin' ? 'bg-purple-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}>Sign In</button>
          <button onClick={() => setView('signup')} className={`flex-1 py-3 rounded-lg font-bold transition-all ${view === 'signup' ? 'bg-purple-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}>Create Account</button>
        </div>
        {view === 'signin' && (
          <div>
            <label className="block text-sm text-gray-400 mb-1">Email Address</label>
            <input type="email" placeholder="Email Address" className="w-full p-3 mb-4 bg-gray-800 rounded-lg text-white placeholder-gray-500 border border-gray-700 focus:border-purple-500 focus:outline-none" />
            <label className="block text-sm text-gray-400 mb-1">Password</label>
            <input type="password" placeholder="Password" className="w-full p-3 mb-6 bg-gray-800 rounded-lg text-white placeholder-gray-500 border border-gray-700 focus:border-purple-500 focus:outline-none" />
            <button className="w-full py-3 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-400 transition-all">Sign In</button>
          </div>
        )}
        {view === 'signup' && (
          <div>
            <label className="block text-sm text-gray-400 mb-1">Full Name</label>
            <input type="text" placeholder="Full Name" className="w-full p-3 mb-4 bg-gray-800 rounded-lg text-white placeholder-gray-500 border border-gray-700 focus:border-purple-500 focus:outline-none" />
            <label className="block text-sm text-gray-400 mb-1">Email Address</label>
            <input type="email" placeholder="Email Address" className="w-full p-3 mb-4 bg-gray-800 rounded-lg text-white placeholder-gray-500 border border-gray-700 focus:border-purple-500 focus:outline-none" />
            <label className="block text-sm text-gray-400 mb-1">Password</label>
            <input type="password" placeholder="Password" className="w-full p-3 mb-6 bg-gray-800 rounded-lg text-white placeholder-gray-500 border border-gray-700 focus:border-purple-500 focus:outline-none" />
            <button className="w-full py-3 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-400 transition-all">Create Account</button>
          </div>
        )}
        <p className="text-center text-gray-500 mt-6 text-sm">or</p>
        <p className="text-center text-gray-400 text-sm mt-1">Explore features without creating an account</p>
      </div>
      <h2 className="text-4xl font-bold text-center mb-2 text-purple-500">Choose Your Plan</h2>
      <p className="text-center text-gray-400 mb-8">Start free, upgrade anytime</p>
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border-2 border-gray-700 hover:border-purple-500 transition-all duration-300 shadow-xl hover:scale-105">
          <h3 className="text-2xl font-bold mb-3 text-white">Basic</h3>
          <p className="text-4xl font-black text-purple-500 mb-4">$20<span className="text-base">/month</span></p>
          <ul className="space-y-2 text-sm text-gray-300 mb-6">
            <li className="flex items-center"><span className="text-purple-500 mr-2">✓</span> HD Export</li>
            <li className="flex items-center"><span className="text-purple-500 mr-2">✓</span> 100 AI Tools</li>
            <li className="flex items-center"><span className="text-purple-500 mr-2">✓</span> Basic Templates</li>
            <li className="flex items-center"><span className="text-purple-500 mr-2">✓</span> 10GB Storage</li>
            <li className="flex items-center"><span className="text-purple-500 mr-2">✓</span> Email Support</li>
          </ul>
          <button className="w-full py-3 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-400 transition-all">Subscribe</button>
        </div>
        <div className="bg-gradient-to-br from-purple-900 to-black p-8 rounded-2xl border-4 border-purple-500 shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform scale-105">
          <div className="text-center mb-3"><span className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-bold">Most Popular</span></div>
          <h3 className="text-2xl font-bold mb-3 text-white">Pro</h3>
          <p className="text-4xl font-black text-purple-500 mb-4">$30<span className="text-base">/month</span></p>
          <ul className="space-y-2 text-sm text-gray-300 mb-6">
            <li className="flex items-center"><span className="text-purple-500 mr-2">✓</span> 4K Export</li>
            <li className="flex items-center"><span className="text-purple-500 mr-2">✓</span> 300 AI Tools</li>
            <li className="flex items-center"><span className="text-purple-500 mr-2">✓</span> Premium Templates</li>
            <li className="flex items-center"><span className="text-purple-500 mr-2">✓</span> 100GB Storage</li>
            <li className="flex items-center"><span className="text-purple-500 mr-2">✓</span> Priority Support</li>
            <li className="flex items-center"><span className="text-purple-500 mr-2">✓</span> Commercial License</li>
          </ul>
          <button className="w-full py-3 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-400 transition-all">Subscribe</button>
        </div>
        <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border-4 border-purple-500 shadow-xl transition-all duration-300">
          <div className="text-center mb-3"><span className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-bold">Selected</span></div>
          <h3 className="text-2xl font-bold mb-3 text-white">Studio</h3>
          <p className="text-4xl font-black text-purple-500 mb-4">$50<span className="text-base">/month</span></p>
          <ul className="space-y-2 text-sm text-gray-300 mb-6">
            <li className="flex items-center"><span className="text-purple-500 mr-2">✓</span> 8K Export</li>
            <li className="flex items-center"><span className="text-purple-500 mr-2">✓</span> All 600 AI Tools</li>
            <li className="flex items-center"><span className="text-purple-500 mr-2">✓</span> Unlimited Templates</li>
            <li className="flex items-center"><span className="text-purple-500 mr-2">✓</span> 1TB Storage</li>
            <li className="flex items-center"><span className="text-purple-500 mr-2">✓</span> 24/7 Live Support</li>
            <li className="flex items-center"><span className="text-purple-500 mr-2">✓</span> Full Commercial Rights</li>
            <li className="flex items-center"><span className="text-purple-500 mr-2">✓</span> Team Collaboration</li>
          </ul>
          <button className="w-full py-3 bg-purple-500 text-white font-bold rounded-lg cursor-default">Selected</button>
        </div>
      </div>
      <p className="text-center text-gray-500 text-sm mb-2">Secure payment processing with Stripe</p>
      <p className="text-center text-gray-500 text-sm mb-10">Contact admin to upgrade your subscription tier</p>
      <div className="flex gap-6 justify-center">
        <button onClick={onBack} className="px-12 py-4 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition-all duration-300 flex items-center gap-2"><ChevronLeft />Back</button>
        <button onClick={onNext} className="px-12 py-4 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-400 transition-all duration-300 flex items-center gap-2">Next<ChevronRight /></button>
      </div>
      <footer className="text-center mt-16 text-sm text-gray-500">MandaStrong Studio 2025 • Author of Doxy The School Bully • MandaStrong1.Etsy.com</footer>
    </div>
  </div>
  );
};

  <div className="w-full h-full bg-black text-white overflow-y-auto">
    <div className="p-8">
      <h1 className="text-5xl font-bold text-center mb-4 text-purple-500">
        Professional AI Tools - Page {pageNum - 3} of 5
      </h1>
      <p className="text-center text-gray-400 mb-12 text-lg">Click any tool to access its interface</p>
      
      <div className="grid grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
        {tools.map((tool, index) => (
          <button
            key={index}
            onClick={() => onToolClick(tool)}
            className="bg-gradient-to-br from-purple-500 to-purple-600 text-black font-bold p-8 rounded-xl hover:from-purple-400 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 min-h-[120px] flex items-center justify-center text-center shadow-lg hover:shadow-purple-500/50 border-2 border-purple-400"
          >
            <span className="text-sm leading-tight">{tool}</span>
          </button>
        ))}
      </div>

      <div className="flex gap-6 justify-center mt-12">
        <button onClick={onBack} className="px-12 py-4 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition-all duration-300 flex items-center gap-2">
          <ChevronLeft />Back
        </button>
        <button onClick={onNext} className="px-12 py-4 bg-purple-500 text-black font-bold rounded-lg hover:bg-purple-400 transition-all duration-300 flex items-center gap-2">
          Next<ChevronRight />
        </button>
      </div>

      <footer className="text-center mt-16 text-sm text-gray-500">
        MandaStrong Studio 2025 • Author of Doxy The School Bully • MandaStrong1.Etsy.com
      </footer>
    </div>
  </div>
);



const ToolBoardPage = ({ pageNum, tools, onBack, onNext, onToolClick }) => (
  <div className="w-full h-full bg-black text-white overflow-y-auto">
    <div className="p-8">
      <h1 className="text-5xl font-bold text-center mb-4 text-purple-500">
        Professional AI Tools - Page {pageNum - 3} of 5
      </h1>
      <p className="text-center text-gray-400 mb-12 text-lg">Click any tool to access its interface</p>
      
      <div className="grid grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
        {tools.map((tool, index) => (
          <button
            key={index}
            onClick={() => onToolClick(tool)}
            className="bg-gradient-to-br from-purple-500 to-purple-600 text-white font-bold p-8 rounded-xl hover:from-purple-400 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 min-h-[120px] flex items-center justify-center text-center shadow-lg hover:shadow-purple-500/50 border-2 border-purple-400"
          >
            <span className="text-sm leading-tight">{tool}</span>
          </button>
        ))}
      </div>

      <div className="flex gap-6 justify-center mt-12">
        <button onClick={onBack} className="px-12 py-4 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition-all duration-300 flex items-center gap-2">
          <ChevronLeft />Back
        </button>
        <button onClick={onNext} className="px-12 py-4 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-400 transition-all duration-300 flex items-center gap-2">
          Next<ChevronRight />
        </button>
      </div>

      <footer className="text-center mt-16 text-sm text-gray-500">
        MandaStrong Studio 2025 • Author of Doxy The School Bully • MandaStrong1.Etsy.com
      </footer>
    </div>
  </div>
);
const EditorsChoicePage = ({ onBack, onNext }) => (
  <div className="w-full h-full bg-black text-white p-8 overflow-y-auto">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-5xl font-bold text-center mb-4 text-purple-500">Editor's Choice</h1>
      <p className="text-center text-gray-400 mb-12 text-lg">Showcase your masterpiece or browse community highlights</p>
      <div className="bg-gradient-to-br from-gray-900 to-black p-10 rounded-2xl border-2 border-purple-500 mb-12 text-center shadow-xl">
        <h2 className="text-3xl font-bold text-purple-500 mb-3">Upload Your Movie</h2>
        <p className="text-gray-400 mb-6 text-lg">Share your creation with the world – up to 180 min supported</p>
        <div className="border-4 border-dashed border-purple-500 rounded-xl p-12 mb-4 hover:bg-gray-800/50 transition-all cursor-pointer" onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); alert('File ready for upload!'); }}>
          <Upload className="mx-auto mb-4 text-purple-500" size={48} />
          <p className="text-gray-300 mb-2">Drag & drop your movie here</p>
          <p className="text-gray-500 text-sm">or click to browse</p>
        </div>
        <input type="file" accept="video/*" className="hidden" id="movie-upload" />
        <label htmlFor="movie-upload" className="px-12 py-5 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-400 transition-all duration-300 inline-flex items-center gap-3 text-xl shadow-lg hover:shadow-purple-500/50 cursor-pointer"><Upload /> Browse Files</label>
      </div>
      <h2 className="text-4xl font-bold text-purple-500 mb-8">Featured Films</h2>
      <div className="grid grid-cols-3 gap-8 mb-12">
        {[
          { title: 'Dreams of Tomorrow', dur: '1h 45m', rating: '⭐ 4.9' },
          { title: 'Ocean Depths', dur: '2h 10m', rating: '⭐ 4.7' },
          { title: 'City Nights', dur: '1h 30m', rating: '⭐ 4.8' },
          { title: 'Mountain Echo', dur: '2h 05m', rating: '⭐ 4.6' },
          { title: 'Silent Sky', dur: '1h 55m', rating: '⭐ 4.9' },
          { title: 'Golden Hour', dur: '1h 20m', rating: '⭐ 4.5' },
        ].map((movie, i) => (
          <div key={i} className="bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden border-2 border-gray-700 hover:border-purple-500 transition-all duration-300 hover:scale-105 shadow-xl">
            <div className="bg-gray-800 h-56 flex items-center justify-center border-b-2 border-gray-700"><Play className="w-16 h-16 text-purple-500 cursor-pointer hover:scale-110 transition-transform" /></div>
            <div className="p-6">
              <h3 className="font-bold text-xl mb-2">{movie.title}</h3>
              <div className="flex justify-between text-sm text-gray-400"><span>{movie.dur}</span><span>{movie.rating}</span></div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-6 justify-center">
        <button onClick={onBack} className="px-12 py-4 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition-all duration-300 flex items-center gap-2"><ChevronLeft />Back</button>
        <button onClick={onNext} className="px-12 py-4 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-400 transition-all duration-300 flex items-center gap-2">Next<ChevronRight /></button>
      </div>
      <footer className="text-center mt-16 text-sm text-gray-500">MandaStrong Studio 2025 • Author of Doxy The School Bully • MandaStrong1.Etsy.com</footer>
    </div>
  </div>
);
const EditorPage = ({ pageNum, onBack, onNext }) => (
  <div className="w-full h-full bg-black text-white flex">
    <div className="w-1/3 border-r border-gray-700 p-6 overflow-y-auto bg-gradient-to-b from-gray-900 to-black">
      <h2 className="text-3xl font-bold mb-6 text-purple-500">Media Library</h2>
      <button className="w-full py-4 bg-purple-500 text-black font-bold rounded-lg mb-6 hover:bg-purple-400 transition-all duration-300 flex items-center justify-center gap-2">
        <Upload />Upload Media
      </button>
      <div className="space-y-3">
        <div className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-all cursor-pointer border border-gray-700 hover:border-purple-500">
          <div className="flex items-center gap-3">
            <Film className="text-purple-500" />
            <span>Video_clip_001.mp4</span>
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-all cursor-pointer border border-gray-700 hover:border-purple-500">
          <div className="flex items-center gap-3">
            <Volume2 className="text-purple-500" />
            <span>Audio_track_002.mp3</span>
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-all cursor-pointer border border-gray-700 hover:border-purple-500">
          <div className="flex items-center gap-3">
            <Film className="text-purple-500" />
            <span>Image_background_003.jpg</span>
          </div>
        </div>
      </div>
    </div>

    <div className="flex-1 flex flex-col p-6">
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl mb-6 flex items-center justify-center h-2/3 border-2 border-gray-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent"></div>
        <div className="text-gray-600 text-2xl z-10">Video Preview Window</div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <label className="block text-sm mb-2 text-purple-500 font-bold">Ratio</label>
          <select className="w-full bg-gray-900 p-3 rounded-lg text-white border border-gray-600 focus:border-purple-500 focus:outline-none">
            <option>16:9</option>
            <option>4:3</option>
            <option>1:1</option>
            <option>9:16</option>
          </select>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <label className="block text-sm mb-2 text-purple-500 font-bold">Speed</label>
          <input type="range" min="0.25" max="4" step="0.25" defaultValue="1" className="w-full accent-purple-500" />
          <div className="text-xs text-center mt-1 text-gray-400">1x</div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <label className="block text-sm mb-2 text-purple-500 font-bold">Volume</label>
          <input type="range" min="0" max="100" defaultValue="100" className="w-full accent-purple-500" />
          <div className="text-xs text-center mt-1 text-gray-400">100%</div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <label className="block text-sm mb-2 text-purple-500 font-bold">Duration (max 150min)</label>
          <input type="number" max="150" defaultValue="120" className="w-full bg-gray-900 p-3 rounded-lg text-white border border-gray-600 focus:border-purple-500 focus:outline-none" />
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 flex-1 border-2 border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-purple-500">Timeline - DaVinci Style</h3>
          <button className="px-6 py-2 bg-purple-500 text-black font-bold rounded-lg text-sm hover:bg-purple-400 transition-all duration-300 flex items-center gap-2">
            <Plus size={16} />Add Track
          </button>
        </div>
        <div className="space-y-3">
          <div className="bg-gray-800 rounded-lg p-3 flex items-center border border-gray-600 hover:border-purple-500 transition-all">
            <span className="text-sm mr-4 w-20 text-purple-500 font-bold">Video 1</span>
            <div className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 h-10 rounded-lg shadow-lg"></div>
          </div>
          <div className="bg-gray-800 rounded-lg p-3 flex items-center border border-gray-600 hover:border-purple-500 transition-all">
            <span className="text-sm mr-4 w-20 text-blue-400 font-bold">Audio 1</span>
            <div className="flex-1 bg-gradient-to-r from-blue-400 to-blue-500 h-10 rounded-lg shadow-lg"></div>
          </div>
          <div className="bg-gray-800 rounded-lg p-3 flex items-center border border-gray-600 hover:border-purple-500 transition-all">
            <span className="text-sm mr-4 w-20 text-yellow-400 font-bold">Subtitles</span>
            <div className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 h-10 rounded-lg shadow-lg"></div>
          </div>
        </div>
      </div>

      <div className="flex gap-6 justify-center mt-6">
        <button onClick={onBack} className="px-12 py-4 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition-all duration-300 flex items-center gap-2">
          <ChevronLeft />Back
        </button>
        <button onClick={onNext} className="px-12 py-4 bg-purple-500 text-black font-bold rounded-lg hover:bg-purple-400 transition-all duration-300 flex items-center gap-2">
          Next<ChevronRight />
        </button>
      </div>
    </div>
  </div>
);

const FinalEditorPage = ({ onBack, onNext }) => {
  const [showEnhancementStudio, setShowEnhancementStudio] = useState(false);
  const [duration, setDuration] = useState(90);
  const [isRendering, setIsRendering] = useState(false);
  const [renderProgress, setRenderProgress] = useState(0);

  const handleRender = () => {
    setIsRendering(true);
    setRenderProgress(0);
    const interval = setInterval(() => {
      setRenderProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRendering(false);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  if (showEnhancementStudio) {
    return (
      <div className="w-full h-full bg-black text-white p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-bold text-purple-500">AI Enhancement Studio</h1>
          <button onClick={() => setShowEnhancementStudio(false)} className="px-6 py-3 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition-all">Close Studio</button>
        </div>
        <div className="bg-gray-800 border-2 border-purple-500 rounded-xl p-6 mb-6">
          <h3 className="text-xl font-bold text-purple-500 mb-4">Project Duration</h3>
          <div className="flex items-center gap-6">
            <input type="range" min="0" max="180" value={duration} onChange={(e) => setDuration(e.target.value)} className="flex-1 accent-purple-500" />
            <div className="text-2xl font-black text-purple-500 w-32 text-right">{duration} min</div>
          </div>
          <div className="flex justify-between text-sm text-gray-400 mt-2">
            <span>0 min</span><span>90 min</span><span>180 min (3 hours)</span>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-purple-500 mb-4">Professional Enhancement Tools</h2>
        <div className="grid grid-cols-4 gap-4 mb-6">
          {["Neural Upscale 8K", "Cinematic Color Grade", "HDR Enhancement", "Noise Reduction Pro", "Frame Interpolation", "Motion Blur Control", "Sharpness AI", "Contrast Optimizer", "Lighting Synthesis", "Shadow Recovery", "Highlight Control", "White Balance AI", "Skin Tone Perfection", "Color Harmony", "Film Grain", "Vintage Filter", "Slow Motion Pro", "Speed Ramping", "Stabilization AI", "Lens Correction", "Chromatic Fix", "Vignette Control", "Glow Effects", "Lens Flare AI", "Bokeh Enhancement", "Depth of Field", "Focus Puller", "Tracking AI", "Green Screen Pro", "Object Removal", "Sky Replacement", "Weather FX", "Particle Effects", "Light Leaks", "Transitions AI", "Text Animation", "Logo Placement", "Watermark Removal", "Audio Sync", "Voice Enhancement"].map((tool, i) => (
            <button key={i} className="bg-gradient-to-br from-gray-900 to-black p-4 rounded-lg border-2 border-purple-500 hover:border-purple-400 hover:scale-105 transition-all font-bold text-sm text-white hover:bg-gray-800">{tool}</button>
          ))}
        </div>
        <div className="flex gap-6 justify-center">
          <button onClick={() => setShowEnhancementStudio(false)} className="px-12 py-4 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition-all">Back to Editor</button>
          <button className="px-12 py-4 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-400 transition-all">Apply Enhancements</button>
        </div>
      </div>
    );
  }

  return (
  <div className="w-full h-full bg-black text-white flex flex-col p-6">
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-4xl font-bold text-purple-500">Final Editor & Export</h1>
      <button onClick={() => setShowEnhancementStudio(true)} className="px-8 py-3 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-400 transition-all duration-300 flex items-center gap-2"><Sparkles />Open Enhancement Studio</button>
    </div>
    <div className="flex flex-1 gap-6">
      <div className="flex-1 bg-gradient-to-br from-gray-900 to-black rounded-xl flex items-center justify-center border-2 border-gray-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent"></div>
        <div className="text-gray-600 text-2xl z-10">Final Video Preview</div>
      </div>
      <div className="w-1/3 space-y-4">
        <button className="w-full py-4 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-400 transition-all duration-300 flex items-center justify-center gap-2"><Eye />Preview</button>
        <button onClick={handleRender} disabled={isRendering} className={`w-full py-4 font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${isRendering ? 'bg-yellow-500 cursor-not-allowed' : 'bg-purple-500 text-white hover:bg-purple-400'}`}>
          {isRendering ? (<><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>Rendering... {renderProgress}%</>) : renderProgress === 100 ? (<><Zap />Render Complete!</>) : (<><Zap />Generate Final Video</>)}
        </button>
        {isRendering && (<div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden"><div className="bg-purple-500 h-full transition-all duration-500 rounded-full" style={{ width: `${renderProgress}%` }}></div></div>)}
        <button className="w-full py-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-400 transition-all duration-300 flex items-center justify-center gap-2"><Save />Save Project</button>
        <button className="w-full py-4 bg-green-500 text-white font-bold rounded-lg hover:bg-green-400 transition-all duration-300 flex items-center justify-center gap-2"><Download />Download</button>
        <button className="w-full py-4 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-400 transition-all duration-300 flex items-center justify-center gap-2"><Share2 />Share</button>
        <div className="bg-gray-800 p-6 rounded-xl border-2 border-purple-500">
          <h3 className="font-bold mb-4 text-purple-500 text-lg">Export To:</h3>
          <select className="w-full bg-gray-900 p-3 rounded-lg mb-4 text-white border border-gray-600 focus:border-purple-500 focus:outline-none">
            <option>YouTube</option><option>Vimeo</option><option>Instagram</option><option>TikTok</option><option>Facebook</option><option>Twitter</option><option>Local File</option>
          </select>
          <button className="w-full py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-400 transition-all duration-300">Export Now</button>
        </div>
      </div>
    </div>
    <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 mt-6 border-2 border-gray-700">
      <h3 className="text-xl font-bold mb-4 text-purple-500">Final Timeline</h3>
      <div className="space-y-3">
        <div className="bg-gray-800 rounded-lg p-3 flex items-center border border-gray-600"><span className="text-sm mr-4 w-24 text-purple-500 font-bold">Main Video</span><div className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 h-10 rounded-lg shadow-lg"></div></div>
        <div className="bg-gray-800 rounded-lg p-3 flex items-center border border-gray-600"><span className="text-sm mr-4 w-24 text-blue-400 font-bold">Audio Mix</span><div className="flex-1 bg-gradient-to-r from-blue-400 to-blue-500 h-10 rounded-lg shadow-lg"></div></div>
      </div>
    </div>
    <div className="flex gap-6 justify-center mt-6">
      <button onClick={onBack} className="px-12 py-4 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition-all duration-300 flex items-center gap-2"><ChevronLeft />Back</button>
      <button onClick={onNext} className="px-12 py-4 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-400 transition-all duration-300 flex items-center gap-2">Next<ChevronRight /></button>
    </div>
  </div>
  );
};

        </button>
        <button className="w-full py-4 bg-purple-500 text-black font-bold rounded-lg hover:bg-purple-400 transition-all duration-300 flex items-center justify-center gap-2">
          <Zap />Generate Final Video
        </button>
        <button className="w-full py-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-400 transition-all duration-300 flex items-center justify-center gap-2">
          <Save />Save Project
        </button>
        <button className="w-full py-4 bg-green-500 text-white font-bold rounded-lg hover:bg-green-400 transition-all duration-300 flex items-center justify-center gap-2">
          <Download />Download
        </button>
        <button className="w-full py-4 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-400 transition-all duration-300 flex items-center justify-center gap-2">
          <Share2 />Share
        </button>
        
        <div className="bg-gray-800 p-6 rounded-xl border-2 border-purple-500">
          <h3 className="font-bold mb-4 text-purple-500 text-lg">Export To:</h3>
          <select className="w-full bg-gray-900 p-3 rounded-lg mb-4 text-white border border-gray-600 focus:border-purple-500 focus:outline-none">
            <option>YouTube</option>
            <option>Vimeo</option>
            <option>Instagram</option>
            <option>TikTok</option>
            <option>Facebook</option>
            <option>Twitter</option>
            <option>Local File</option>
          </select>
          <button className="w-full py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-400 transition-all duration-300">
            Export Now
          </button>
        </div>
      </div>
    </div>

    <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 mt-6 border-2 border-gray-700">
      <h3 className="text-xl font-bold mb-4 text-purple-500">Final Timeline</h3>
      <div className="space-y-3">
        <div className="bg-gray-800 rounded-lg p-3 flex items-center border border-gray-600">
          <span className="text-sm mr-4 w-24 text-purple-500 font-bold">Main Video</span>
          <div className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 h-10 rounded-lg shadow-lg"></div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3 flex items-center border border-gray-600">
          <span className="text-sm mr-4 w-24 text-blue-400 font-bold">Audio Mix</span>
          <div className="flex-1 bg-gradient-to-r from-blue-400 to-blue-500 h-10 rounded-lg shadow-lg"></div>
        </div>
      </div>
    </div>

    <div className="flex gap-6 justify-center mt-6">
      <button onClick={onBack} className="px-12 py-4 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition-all duration-300 flex items-center gap-2">
        <ChevronLeft />Back
      </button>
      <button onClick={onNext} className="px-12 py-4 bg-purple-500 text-black font-bold rounded-lg hover:bg-purple-400 transition-all duration-300 flex items-center gap-2">
        Next<ChevronRight />
      </button>
    </div>
  </div>
);

const ViewerPage = ({ onBack, onNext }) => (
  <div className="w-full h-full bg-black flex flex-col">
    <div className="flex-1 flex items-center justify-center">
      <div className="text-white text-center">
        <h1 className="text-5xl font-bold mb-12 text-purple-500">Your Complete Movie</h1>
        <div className="bg-gradient-to-br from-gray-900 to-black w-[1280px] h-[720px] rounded-2xl flex items-center justify-center border-4 border-purple-500 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent"></div>
          <Play className="w-32 h-32 text-purple-500 z-10 cursor-pointer hover:scale-110 transition-transform" />
        </div>
      </div>
    </div>
    
    <div className="flex gap-6 justify-center p-8">
      <button onClick={onBack} className="px-12 py-4 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition-all duration-300 flex items-center gap-2">
        <ChevronLeft />Back
      </button>
      <button onClick={onNext} className="px-12 py-4 bg-purple-500 text-black font-bold rounded-lg hover:bg-purple-400 transition-all duration-300 flex items-center gap-2">
        Next<ChevronRight />
      </button>
    </div>
  </div>
);

const LegalPage = ({ title, onBack, onNext }) => (
  <div className="w-full h-full bg-black text-white p-8 overflow-y-auto">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-5xl font-bold mb-12 text-purple-500 text-center">{title}</h1>
      <div className="space-y-6 text-gray-300 leading-relaxed">
        <p className="text-lg">This is a placeholder for the {title} content. You should replace this with your actual legal documentation.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </div>

      <div className="flex gap-6 justify-center mt-16">
        <button onClick={onBack} className="px-12 py-4 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition-all duration-300 flex items-center gap-2">
          <ChevronLeft />Back
        </button>
        <button onClick={onNext} className="px-12 py-4 bg-purple-500 text-black font-bold rounded-lg hover:bg-purple-400 transition-all duration-300 flex items-center gap-2">
          Next<ChevronRight />
        </button>
      </div>

      <footer className="text-center mt-16 text-sm text-gray-500">
        MandaStrong Studio 2025 • Author of Doxy The School Bully • MandaStrong1.Etsy.com
      </footer>
    </div>
  </div>
);

const CommunityPage = ({ onBack, onNext }) => (
  <div className="w-full h-full bg-black text-white p-8 overflow-y-auto">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-5xl font-bold mb-12 text-purple-500 text-center">Community Gallery</h1>
      
      <button className="w-full py-5 bg-purple-500 text-black font-bold rounded-lg mb-12 hover:bg-purple-400 transition-all duration-300 flex items-center justify-center gap-2 text-xl">
        <Upload />Upload Your Movie
      </button>

      <div className="grid grid-cols-3 gap-8 mb-12">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden border-2 border-gray-700 hover:border-purple-500 transition-all duration-300 hover:scale-105">
            <div className="bg-gray-800 h-56 flex items-center justify-center border-b-2 border-gray-700">
              <Play className="w-16 h-16 text-purple-500 cursor-pointer hover:scale-110 transition-transform" />
            </div>
            <div className="p-6">
              <h3 className="font-bold mb-4 text-xl">User Movie {i}</h3>
              <div className="flex gap-6 text-base">
                <button className="flex items-center gap-2 text-purple-500 hover:text-purple-400 transition-all">
                  👍 <span>Like</span>
                </button>
                <button className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-all">
                  ❤️ <span>Love</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-6 justify-center">
        <button onClick={onBack} className="px-12 py-4 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition-all duration-300 flex items-center gap-2">
          <ChevronLeft />Back
        </button>
        <button onClick={onNext} className="px-12 py-4 bg-purple-500 text-black font-bold rounded-lg hover:bg-purple-400 transition-all duration-300 flex items-center gap-2">
          Next<ChevronRight />
        </button>
      </div>

      <footer className="text-center mt-16 text-sm text-gray-500">
        MandaStrong Studio 2025 • Author of Doxy The School Bully • MandaStrong1.Etsy.com
      </footer>
    </div>
  </div>
);

const ContactPage = ({ onBack, onNext }) => (
  <div className="w-full h-full bg-black text-white p-8 overflow-y-auto">
    <div className="max-w-3xl mx-auto">
      <h1 className="text-5xl font-bold mb-12 text-purple-500 text-center">Contact Support</h1>
      
      <div className="bg-gradient-to-br from-gray-900 to-black p-10 rounded-2xl mb-12 border-2 border-purple-500 shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-purple-500">24/7 AI Agent Support</h2>
        <p className="mb-6 text-gray-300 text-lg leading-relaxed">
          Get instant answers to your questions with our intelligent AI helpdesk. 
          Our agents are available around the clock to assist you with any queries or technical issues.
        </p>
        <button className="w-full py-5 bg-purple-500 text-black font-bold rounded-lg hover:bg-purple-400 transition-all duration-300 text-xl">
          Chat with Agent Now
        </button>
      </div>

      <div className="bg-gradient-to-br from-gray-900 to-black p-10 rounded-2xl border-2 border-gray-700">
        <h3 className="text-2xl font-bold mb-6 text-white">Send a Message</h3>
        <input type="text" placeholder="Your Name" className="w-full p-4 mb-6 bg-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500" />
        <input type="email" placeholder="Your Email" className="w-full p-4 mb-6 bg-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500" />
        <textarea placeholder="Your Message" rows="6" className="w-full p-4 mb-6 bg-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"></textarea>
        <button className="w-full py-4 bg-purple-500 text-black font-bold rounded-lg hover:bg-purple-400 transition-all duration-300">
          Send Message
        </button>
      </div>

      <div className="flex gap-6 justify-center mt-12">
        <button onClick={onBack} className="px-12 py-4 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition-all duration-300 flex items-center gap-2">
          <ChevronLeft />Back
        </button>
        <button onClick={onNext} className="px-12 py-4 bg-purple-500 text-black font-bold rounded-lg hover:bg-purple-400 transition-all duration-300 flex items-center gap-2">
          Next<ChevronRight />
        </button>
      </div>

      <footer className="text-center mt-16 text-sm text-gray-500">
        MandaStrong Studio 2025 • Author of Doxy The School Bully • MandaStrong1.Etsy.com
      </footer>
    </div>
  </div>
);

const ThankYouPage = ({ onBack }) => (
  <div className="w-full h-full bg-black text-white flex items-center justify-center">
    <div className="text-center max-w-3xl p-12">
      <h1 className="text-6xl font-bold mb-12 text-purple-500">Thank You!</h1>
      <p className="text-2xl mb-8 text-gray-300">
        Dear Creator,
      </p>
      <p className="text-xl mb-8 text-gray-300 leading-relaxed">
        Thank you for choosing MandaStrong Studio to bring your creative vision to life. 
        Your stories matter, and I am honored to be part of your filmmaking journey.
      </p>
      <p className="text-xl mb-8 text-gray-300 leading-relaxed">
        Whether you are creating family memories or turning dreams into reality, 
        this platform was built with love to empower your creativity.
      </p>
      <p className="text-xl mb-12 text-gray-300 leading-relaxed">
        Keep creating, keep dreaming, and most importantly keep telling your stories.
      </p>
      <p className="text-2xl font-bold text-purple-500 mb-4">
        - Amanda Strong
      </p>
      
      <div className="text-5xl font-black text-purple-500 mb-16 animate-pulse">
        That's All Folks!
      </div>

      <div className="flex justify-center">
        <button onClick={onBack} className="px-12 py-4 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition-all duration-300 flex items-center gap-2">
        <ChevronLeft />Back
      </button>

      <footer className="mt-16 text-sm text-gray-500">
        MandaStrong Studio 2025 • Author of Doxy The School Bully • MandaStrong1.Etsy.com
      </footer>
    </div>
  </div>
);

export default App;
