import { ArrowLeft, ArrowRight, Bot, Zap, HelpCircle, MessageCircle } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import Footer from '../components/Footer';
import QuickAccess from '../components/QuickAccess';

interface PageProps {
  onNavigate: (page: number) => void;
}

interface ChatMessage {
  id: string;
  message: string;
  is_user: boolean;
  created_at: string;
}

export default function Page19({ onNavigate }: PageProps) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      loadMessages();
    }
  }, [user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadMessages = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello! How can I assist you with MandaStrong Studio today?";
    } else if (lowerMessage.includes('help')) {
      return "I can help you with: uploading media, using AI tools, editing videos, and navigating the platform. What would you like to know more about?";
    } else if (lowerMessage.includes('upload') || lowerMessage.includes('export')) {
      return "To export your video, navigate to the Export Center page. You can upload media through the Upload page or directly from the AI Tools Hub.";
    } else if (lowerMessage.includes('format')) {
      return "MandaStrong Studio supports MP4, MOV, AVI, and WebM video formats. For best results, we recommend using MP4 (H.264) format.";
    } else if (lowerMessage.includes('text') || lowerMessage.includes('font')) {
      return "You can add text to your video using the Text Creator tool. Custom fonts are supported - just upload your font file or select from our library.";
    } else if (lowerMessage.includes('audio')) {
      return "To adjust audio levels, use the Audio Studio page. You can control volume, add fade effects, and mix multiple audio tracks.";
    } else if (lowerMessage.includes('render') || lowerMessage.includes('quality')) {
      return "Render quality options include 720p, 1080p, and 4K. Higher quality renders take longer but provide better video output. You can select your preferred quality in the Export Center.";
    } else {
      return "Thanks for your message! I'm here to help with any questions about MandaStrong Studio. Feel free to ask about specific features or tools!";
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !user || sending) return;

    setSending(true);
    try {
      const { error: userError } = await supabase
        .from('chat_messages')
        .insert({
          user_id: user.id,
          message: inputMessage.trim(),
          is_user: true,
        });

      if (userError) throw userError;

      const aiResponse = generateAIResponse(inputMessage);

      const { error: aiError } = await supabase
        .from('chat_messages')
        .insert({
          user_id: user.id,
          message: aiResponse,
          is_user: false,
        });

      if (aiError) throw aiError;

      setInputMessage('');
      await loadMessages();
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFAQClick = (question: string) => {
    setInputMessage(question);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="flex items-center justify-between px-4 py-4 border-b border-purple-500/30">
          <button
            onClick={() => onNavigate(18)}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-lg font-bold transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
            <Bot className="w-5 h-5 text-purple-400" />
            AGENT GROK - 24/7 HELP DESK
          </h1>
          <button
            onClick={() => onNavigate(20)}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-lg font-bold transition-all"
          >
            Next
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid lg:grid-cols-[1fr,400px] gap-4 p-4">
          <div className="bg-purple-600/10 backdrop-blur-sm rounded-2xl border border-purple-500/30 p-6">
            <div className="bg-purple-600/20 rounded-lg p-4 mb-4 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-purple-300">Agent Grok</h3>
                <p className="text-xs text-green-400 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  Online & Ready to Help
                </p>
              </div>
              <div className="ml-auto">
                <div className="flex items-center gap-2 bg-purple-600/30 px-3 py-1 rounded-full">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-xs font-semibold">Instant Responses</span>
                </div>
              </div>
            </div>

            <div className="bg-black/50 rounded-lg p-4 mb-4 max-h-[300px] overflow-y-auto">
              <div className="space-y-3">
                {messages.length === 0 ? (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-purple-900/30 rounded-lg p-3 flex-1">
                      <p className="font-semibold text-sm mb-1">Agent Grok</p>
                      <p className="text-white/80 text-sm">
                        Hello! I'm Agent Grok, your 24/7 AI assistant for MandaStrong Studio. How can I help you today?
                      </p>
                      <p className="text-xs text-white/50 mt-1">Just now</p>
                    </div>
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div key={msg.id} className={`flex items-start gap-3 ${msg.is_user ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        msg.is_user ? 'bg-blue-600' : 'bg-purple-600'
                      }`}>
                        {msg.is_user ? <MessageCircle className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                      </div>
                      <div className={`rounded-lg p-3 flex-1 ${
                        msg.is_user ? 'bg-blue-900/30' : 'bg-purple-900/30'
                      }`}>
                        <p className="font-semibold text-sm mb-1">{msg.is_user ? 'You' : 'Agent Grok'}</p>
                        <p className="text-white/80 text-sm">{msg.message}</p>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                disabled={sending}
                className="flex-1 px-4 py-2 bg-black/50 border border-purple-500/50 rounded-lg text-white text-sm placeholder-white/50 focus:outline-none focus:border-purple-400 disabled:opacity-50"
              />
              <button
                onClick={handleSendMessage}
                disabled={sending || !inputMessage.trim()}
                className="bg-purple-600 hover:bg-purple-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold px-6 py-2 rounded-lg transition-all text-sm"
              >
                {sending ? 'Sending...' : 'Send'}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-purple-600/10 backdrop-blur-sm rounded-2xl border border-purple-500/30 p-6">
              <div className="flex items-center gap-2 mb-4">
                <HelpCircle className="w-5 h-5 text-purple-400" />
                <h3 className="font-bold text-purple-300">Frequently Asked Questions</h3>
              </div>
              <div className="space-y-2">
                {[
                  "How do I export my video?",
                  "What video formats are supported?",
                  "How do I add text to my video?",
                  "Can I use custom fonts?",
                  "How do I adjust audio levels?",
                  "What are the render quality options?"
                ].map((faq, index) => (
                  <button
                    key={index}
                    onClick={() => handleFAQClick(faq)}
                    className="w-full text-left px-4 py-2 bg-black/30 hover:bg-black/50 rounded-lg text-sm text-white/80 hover:text-white transition-all"
                  >
                    {faq}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-purple-600/10 backdrop-blur-sm rounded-2xl border border-purple-500/30 p-6">
              <h3 className="font-bold text-purple-300 mb-4">Common Topics</h3>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { name: "Video Editing Basics", color: "bg-purple-600" },
                  { name: "Audio & Music", color: "bg-black/50" },
                  { name: "Effects & Transitions", color: "bg-black/50" },
                  { name: "Export & Rendering", color: "bg-black/50" },
                  { name: "Troubleshooting", color: "bg-black/50" }
                ].map((topic, index) => (
                  <button
                    key={index}
                    className={`${topic.color} hover:bg-purple-600/70 px-4 py-2 rounded-lg font-semibold text-sm transition-all text-left`}
                  >
                    {topic.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-purple-600/20 backdrop-blur-sm rounded-2xl border border-purple-500/40 p-6">
              <div className="flex items-center justify-center mb-3">
                <MessageCircle className="w-12 h-12 text-purple-400" />
              </div>
              <h3 className="font-bold text-center mb-2">Need Human Support?</h3>
              <p className="text-sm text-white/70 text-center mb-4">
                Our support team is available 24/7 for complex issues
              </p>
              <button className="w-full bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-lg font-semibold transition-all">
                Contact Support Team
              </button>
            </div>

            <div className="bg-black/30 backdrop-blur-sm rounded-2xl border border-purple-500/30 p-4">
              <h3 className="font-bold text-sm mb-3 text-purple-300">Service Status</h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-white/70">API Services</span>
                  <span className="flex items-center gap-1 text-green-400">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    Operational
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Render Queue</span>
                  <span className="flex items-center gap-1 text-green-400">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    Operational
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">File Storage</span>
                  <span className="flex items-center gap-1 text-green-400">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    Operational
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <QuickAccess onNavigate={onNavigate} />
      <Footer />
    </div>
  );
}
