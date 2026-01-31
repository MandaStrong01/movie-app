import React, { useState, useEffect, useRef } from 'react';
import {
  Menu, Sparkles, ChevronRight, ChevronLeft,
  CheckCircle, Upload, MessageCircle, Send
} from 'lucide-react';

/* ======================================================
   MANDASTRONG STUDIO 2025 — OWNER HARD LOCK
   Author: Amanda Woolley
   FIXES:
   - Free plan override
   - Gemini downgrade bug
   - Browse-for-now demotion
   ====================================================== */

const OWNER_EMAIL = "woolleya129@gmail.com";

/* 🔒 HARD OWNER LOCK (NO AUTH REQUIRED) */
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
  /* ---------- GLOBAL STATE ---------- */
  const [page, setPage] = useState<number>(1);

  /* 🔐 PLAN IS LOCKED HERE */
  const [plan, setPlan] = useState<'Free' | 'Basic' | 'Pro' | 'Studio'>(
    IS_O_
