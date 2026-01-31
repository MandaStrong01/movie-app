import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Upload,
  MessageCircle,
  Send
} from 'lucide-react';

/* ======================================================
   MANDASTRONG STUDIO 2025 — OWNER HARD LOCK (FINAL)
   Author: Amanda Woolley
   ====================================================== */

/* 🔒 OWNER LOCK */
const IS_OWNER = true;

/* ---------- AI TOOL DATA ---------- */
const generateTools = (label: string) =>
  Array.from({ length: 120 }, (_, i) => `${label} PRO ${i + 1}`);

const BOARD_DATA = {
  Writing: generateTools("WRITING AI"),
  Voice: generateTools("VOICE AI"),
  Image: generateTools("IMAGE AI"),
  Video: generateTools("VIDEO AI"),
  Motion: generateTools("MOTION AI"),
};

/* ---------- HELP BUBBLE ---------- */
const HelpBubble = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="fixed bottom-8 right-8 z-[999] w-16 h-16 rounded-full
               bg-purple-600 text-white shadow-[0_0_50px_rgba(147,51,234,0.7)]
               hover:scale-110 transition"
  >
    <MessageCircle size={34} className="mx-auto" />
  </button>
);

export default function App() {
  const [page, setPage] = useState(1);

  /* 🔐 STUDIO IS HARD-LOCKED HERE */
  const [plan, setPlan] = useState<'Studio'>('Studio');

  const videoRef = useRef<HTMLVideoElement | null>(null);

  /* FORCE STUDIO — NO FREE FALLBACK EXISTS */
  useEffect(() => {
    setPlan('Studio');
  }, []);

  /* VIDEO CONTROL */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if ([1, 2, 10, 21].includes(page)) v.play().catch(() => {});
    else v.pause();
  }, [page]);

  return (
    <div className="h-screen w-screen bg-black text-white overflow-hidden relative">

      {/* BACKGROUND VIDEO */}
      {[1, 2, 10, 21].includes(page) && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="background.mp4" type="video/mp4" />
        </video>
      )}

      <HelpBubble onClick={() => setPage(19)} />

      <main className="relative z-10 h-full">

        {/* PAGE 1 — HOME */}
        {page === 1 && (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <h1 className="text-7xl font-black italic">MANDASTRONG STUDIO</h1>
            <p className="text-2xl mt-6">All-In-One Make-A-Movie App</p>
            <div className="mt-10 flex gap-6">
              <button onClick={() => setPage(2)} className="btn">Next</button>
              <button onClick={() => setPage(3)} className="btn">Enter</button>
            </div>
          </div>
        )}

        {/* PAGE 2 — SPLASH */}
        {page === 2 && (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <Sparkles size={120} className="text-purple-500 mb-6" />
            <h1 className="text-6xl font-black italic">
              CREATE · IMAGINE · FILM
            </h1>
            <button onClick={() => setPage(3)} className="btn-lg mt-10">
              Enter Studio
            </button>
          </div>
        )}

        {/* PAGE 3 — PLAN CONFIRMATION */}
        {page === 3 && (
          <div className="h-full p-20 text-center">
            <h1 className="text-6xl font-black mb-12">YOUR PLAN</h1>

            <div className="mx-auto max-w-xl p-12 rounded-3xl border-4
                            border-purple-600 shadow-[0_0_60px_rgba(147,51,234,0.7)]">
              <h2 className="text-4xl font-black mb-4">STUDIO</h2>
              <p className="text-purple-400 font-black uppercase tracking-widest">
                OWNER ACCESS — ACTIVE
              </p>
            </div>

            <button
              onClick={() => setPage(4)}
              className="btn-lg mt-16"
            >
              Continue
            </button>
          </div>
        )}

        {/* AI BOARDS */}
        {page >= 4 && page <= 8 && (
          <div className="h-full p-16 overflow-y-auto">
            <h1 className="text-5xl font-black mb-10">AI TOOLBOARD</h1>
            <div className="grid grid-cols-2 gap-4">
              {Object.values(BOARD_DATA)[page - 4].map((tool, i) => (
                <div key={i} className="tool">{tool}</div>
              ))}
            </div>
            <div className="mt-10 flex justify-between">
              <button onClick={() => setPage(page - 1)} className="btn">Back</button>
              <button onClick={() => setPage(page + 1)} className="btn">Next</button>
            </div>
          </div>
        )}

        {/* PAGE 10 — UPLOAD */}
        {page === 10 && (
          <div className="h-full flex flex-col items-center justify-center">
            <Upload size={120} className="text-purple-500 mb-8" />
            <button className="btn-lg">
              Upload Media (Studio Enabled)
            </button>
          </div>
        )}

        {/* PAGE 19 — HELP */}
        {page === 19 && (
          <div className="h-full p-20 flex flex-col items-center">
            <h1 className="text-6xl font-black mb-10">AGENT GROK</h1>
            <div className="w-full max-w-4xl bg-zinc-900 p-10 rounded-3xl">
              <input
                placeholder="How can we help?"
                className="w-full p-4 bg-black border border-purple-600 rounded-xl"
              />
              <button className="btn mt-6 flex items-center gap-3">
                <Send /> Send
              </button>
            </div>
          </div>
        )}

        {/* PAGE 21 — FINISH */}
        {page === 21 && (
          <div className="h-full flex flex-col items-center justify-center">
            <h1 className="text-7xl font-black italic text-purple-600">
              THAT’S ALL FOLKS
            </h1>
            <button onClick={() => setPage(1)} className="btn-lg mt-10">
              Return Home
            </button>
          </div>
        )}
      </main>

      <style>{`
        .btn {
          background:#18181b;
          padding:16px 40px;
          border-radius:16px;
          font-weight:900;
        }
        .btn-lg {
          background:#7c3aed;
          padding:24px 60px;
          border-radius:20px;
          font-weight:900;
          font-size:1.5rem;
        }
        .tool {
          padding:16px;
          background:#09090b;
          border:1px solid #3b0764;
          border-radius:12px;
          font-weight:800;
          color:#c084fc;
        }
      `}</style>
    </div>
  );
}
