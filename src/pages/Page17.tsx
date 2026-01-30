import { ArrowLeft, ArrowRight, Film, Settings } from 'lucide-react';
import { useState } from 'react';
import Footer from '../components/Footer';
import QuickAccess from '../components/QuickAccess';

interface PageProps {
  onNavigate: (page: number) => void;
}

export default function Page17({ onNavigate }: PageProps) {
  const [resolution, setResolution] = useState<'4K' | '1080p' | '720p'>('4K');
  const [quality, setQuality] = useState<'High' | 'Medium' | 'Low'>('High');
  const [frameRate, setFrameRate] = useState('60 fps');
  const [duration, setDuration] = useState(90);

  const handleStartRendering = () => {
    alert('Rendering started! Your video will be ready soon.');
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="flex items-center justify-between px-4 py-4 border-b border-purple-500/30">
          <button
            onClick={() => onNavigate(16)}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-lg font-bold transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="text-sm font-bold uppercase tracking-wider">EXPORT CENTER</h1>
          <button
            onClick={() => onNavigate(18)}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-lg font-bold transition-all"
          >
            Next
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          <p className="text-sm text-white/70 mb-6">Ready to export your movie</p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-purple-900/20 backdrop-blur-sm rounded-2xl border border-purple-500/30 p-6">
              <div className="flex items-center gap-2 mb-6">
                <Settings className="w-6 h-6 text-purple-400" />
                <h2 className="text-xl font-bold text-purple-300">Export Settings</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-3">Resolution</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['4K', '1080p', '720p'] as const).map((res) => (
                      <button
                        key={res}
                        onClick={() => setResolution(res)}
                        className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                          resolution === res
                            ? 'bg-purple-600 text-white'
                            : 'bg-black/40 text-white/70 hover:bg-black/60'
                        }`}
                      >
                        {res}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Export Format</label>
                  <select
                    className="w-full bg-black/40 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-400"
                    defaultValue="MP4 (H.264)"
                  >
                    <option>MP4 (H.264)</option>
                    <option>MOV</option>
                    <option>AVI</option>
                    <option>WebM</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3">Quality</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['High', 'Medium', 'Low'] as const).map((qual) => (
                      <button
                        key={qual}
                        onClick={() => setQuality(qual)}
                        className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                          quality === qual
                            ? 'bg-purple-600 text-white'
                            : 'bg-black/40 text-white/70 hover:bg-black/60'
                        }`}
                      >
                        {qual}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Frame Rate</label>
                  <select
                    className="w-full bg-black/40 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-400"
                    value={frameRate}
                    onChange={(e) => setFrameRate(e.target.value)}
                  >
                    <option>24 fps</option>
                    <option>30 fps</option>
                    <option>60 fps</option>
                    <option>120 fps</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-purple-900/20 backdrop-blur-sm rounded-2xl border border-purple-500/30 p-6">
                <h2 className="text-xl font-bold text-purple-300 mb-6">Render Status</h2>

                <div className="bg-black/40 rounded-xl p-8 flex flex-col items-center justify-center mb-6">
                  <Film className="w-20 h-20 text-purple-400 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Ready to Render</h3>
                  <p className="text-sm text-white/70 text-center">Your movie is ready to be exported</p>
                </div>

                <button
                  onClick={handleStartRendering}
                  className="w-full bg-purple-600 hover:bg-purple-500 px-6 py-4 rounded-lg font-bold text-lg transition-all"
                >
                  Start Rendering
                </button>
              </div>

              <div className="bg-purple-900/20 backdrop-blur-sm rounded-2xl border border-purple-500/30 p-6">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Film className="w-5 h-5 text-purple-400" />
                  <h3 className="font-bold text-purple-300">Movie Duration</h3>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/70">0 min</span>
                    <span className="text-3xl font-black text-purple-300">{duration}</span>
                    <span className="text-sm text-white/70">180 min</span>
                  </div>
                  <p className="text-center text-xs text-white/50 mb-3">MINUTES</p>
                </div>

                <input
                  type="range"
                  min="0"
                  max="180"
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value))}
                  className="w-full h-2 bg-black/40 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-purple-500 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, rgb(147 51 234) 0%, rgb(147 51 234) ${(duration / 180) * 100}%, rgb(0 0 0 / 0.4) ${(duration / 180) * 100}%, rgb(0 0 0 / 0.4) 100%)`
                  }}
                />
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
