import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, Sparkles, ChevronRight, ChevronLeft, 
  CheckCircle, Upload, MessageCircle, Send
} from 'lucide-react';

import { SubscriptionProvider } from './contexts/SubscriptionContext';
const OWNER_EMAIL = "woolleya129@gmail.com";

// --- PRODUCTION AI TOOLSET (600 TOTAL - 120 PER BOARD) ---
const generateOrderedTools = (category: string) => {
  const masterData: Record<string, string[]> = {
    Writing: ["Neural Script Architect", "DeepPlot Narrative AI", "Dialogue Synthesis Engine", "Character Core Logic"],
    Voice: ["Neural Vocal Clone Pro", "Atmospheric Timbre Synth", "Emotion-Depth Modulator"],
    Image: ["Neural Asset Architect", "Quantum Texture Mapper", "VFX Plate Synthesis"],
    Video: ["Temporal Motion Synth", "Cinematic Camera Logic", "Dynamic Pan AI"],
    Motion: ["Skeleton Tracker Pro", "Neural Mocap Logic", "Fluid Physics Engine"]
  };

  const list: string[] = [];
  const source = masterData[category] || masterData["Writing"];

  for (let i = 0; i < 120; i++) {
    const base = source[i % source.length];
    list.push(`${base} PRO ${i + 1}`.toUpperCase());
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

// --- HELP BUBBLE ---
const HelpBubble = ({ onClick }: { onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="fixed bottom-8 right-8 z-[250] w-16 h-16 bg-purple-600 rounded-full shadow-[0_0_50px_rgba(147,51,234,0.6)] border-2 border-white/40 hover:scale-110"
  >
    <MessageCircle size={32} className="text-white mx-auto" />
  </button>
);

export default function App() {
  const [page, setPage] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [audioActive, setAudioActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if ([1, 2, 10, 21].includes(page)) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [page]);

  return (
    <SubscriptionProvider>
      <div className="h-screen bg-black overflow-hidden relative font-sans">

        {/* BACKGROUND VIDEO */}
        {[1, 2, 10, 21].includes(page) && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted={!audioActive}
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
            <source src="background.mp4" type="video/mp4" />
          </video>
        )}

        {/* TOP MENU */}
        <div className="fixed top-6 right-6 z-50">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="bg-purple-600 p-3 rounded-full text-white"
          >
            <Menu size={24} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-4 bg-black border border-purple-600 rounded-xl p-4 w-64">
              {[1,4,11,19,21].map(p => (
                <button
                  key={p}
                  onClick={() => { setPage(p); setMenuOpen(false); }}
                  className="block w-full text-right text-purple-400 py-2 font-black uppercase hover:text-white"
                >
                  Page {p}
                </button>
              ))}
            </div>
          )}
        </div>

        <HelpBubble onClick={() => setPage(19)} />

        {/* MAIN */}
        <main className="relative z-10 h-full text-white">

          {/* PAGE 1 */}
          {page === 1 && (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <h1 className="text-7xl font-black italic">MANDASTRONG STUDIO</h1>
              <p className="text-2xl mt-6">All-In-One Make-A-Movie App</p>

