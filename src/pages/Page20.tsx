import { ArrowLeft, ArrowRight, Film, Plane, Package, Music, Heart, MessageCircle, Upload, Flame } from 'lucide-react';
import { useState } from 'react';
import Footer from '../components/Footer';
import QuickAccess from '../components/QuickAccess';

interface PageProps {
  onNavigate: (page: number) => void;
}

interface VideoProject {
  id: number;
  title: string;
  creator: string;
  timeAgo: string;
  likes: number;
  hearts: number;
  comments: number;
  icon: typeof Film;
  trending: boolean;
  recentComments: { user: string; text: string }[];
}

export default function Page20({ onNavigate }: PageProps) {
  const [activeTab, setActiveTab] = useState<'recent' | 'popular' | 'trending'>('recent');

  const projects: VideoProject[] = [
    {
      id: 1,
      title: "Epic Action Montage",
      creator: "Sarah Johnson",
      timeAgo: "2 hours ago",
      likes: 1247,
      hearts: 823,
      comments: 156,
      icon: Film,
      trending: true,
      recentComments: [
        { user: "User123", text: "Amazing work!" },
        { user: "Creator456", text: "Love the editing style!" }
      ]
    },
    {
      id: 2,
      title: "Cinematic Travel Vlog",
      creator: "Mike Chen",
      timeAgo: "5 hours ago",
      likes: 892,
      hearts: 634,
      comments: 89,
      icon: Plane,
      trending: false,
      recentComments: [
        { user: "User123", text: "Amazing work!" },
        { user: "Creator456", text: "Love the editing style!" }
      ]
    },
    {
      id: 3,
      title: "Product Showcase Video",
      creator: "Emily Rodriguez",
      timeAgo: "1 day ago",
      likes: 2156,
      hearts: 1423,
      comments: 267,
      icon: Package,
      trending: true,
      recentComments: [
        { user: "User123", text: "Amazing work!" },
        { user: "Creator456", text: "Love the editing style!" }
      ]
    },
    {
      id: 4,
      title: "Music Video Edit",
      creator: "Alex Thompson",
      timeAgo: "1 day ago",
      likes: 3421,
      hearts: 2789,
      comments: 445,
      icon: Music,
      trending: true,
      recentComments: [
        { user: "User123", text: "Amazing work!" },
        { user: "Creator456", text: "Love the editing style!" }
      ]
    },
    {
      id: 5,
      title: "Wedding Highlights",
      creator: "Jessica Kim",
      timeAgo: "2 days ago",
      likes: 1856,
      hearts: 1654,
      comments: 234,
      icon: Heart,
      trending: false,
      recentComments: [
        { user: "User123", text: "Amazing work!" },
        { user: "Creator456", text: "Love the editing style!" }
      ]
    },
    {
      id: 6,
      title: "Gaming Montage",
      creator: "David Brown",
      timeAgo: "4 days ago",
      likes: 4521,
      hearts: 3876,
      comments: 678,
      icon: Film,
      trending: false,
      recentComments: [
        { user: "User123", text: "Amazing work!" },
        { user: "Creator456", text: "Love the editing style!" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="flex items-center justify-between px-4 py-4 border-b border-purple-500/30">
          <button
            onClick={() => onNavigate(19)}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-lg font-bold transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="text-sm font-bold uppercase tracking-wider">COMMUNITY HUB</h1>
          <button
            onClick={() => onNavigate(21)}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-lg font-bold transition-all"
          >
            Next
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('recent')}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  activeTab === 'recent'
                    ? 'bg-purple-600 text-white'
                    : 'bg-black/30 text-purple-300 hover:bg-black/50'
                }`}
              >
                Recent
              </button>
              <button
                onClick={() => setActiveTab('popular')}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  activeTab === 'popular'
                    ? 'bg-purple-600 text-white'
                    : 'bg-black/30 text-purple-300 hover:bg-black/50'
                }`}
              >
                Popular
              </button>
              <button
                onClick={() => setActiveTab('trending')}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  activeTab === 'trending'
                    ? 'bg-purple-600 text-white'
                    : 'bg-black/30 text-purple-300 hover:bg-black/50'
                }`}
              >
                Trending
              </button>
            </div>

            <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-lg font-semibold text-sm transition-all">
              <Upload className="w-4 h-4" />
              Upload Your Creation
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {projects.map((project) => {
              const IconComponent = project.icon;
              return (
                <div
                  key={project.id}
                  className="bg-purple-900/20 backdrop-blur-sm rounded-2xl border border-purple-500/30 overflow-hidden hover:border-purple-400 transition-all cursor-pointer"
                >
                  {project.trending && (
                    <div className="absolute top-2 right-2 z-10">
                      <div className="flex items-center gap-1 bg-purple-600 px-3 py-1 rounded-full">
                        <Flame className="w-4 h-4" />
                        <span className="text-xs font-semibold">Trending</span>
                      </div>
                    </div>
                  )}

                  <div className="relative aspect-video bg-gradient-to-br from-purple-900/40 to-black/60 flex items-center justify-center">
                    <IconComponent className="w-16 h-16 text-purple-400/50" />
                  </div>

                  <div className="p-4 bg-black/40">
                    <h3 className="font-bold text-lg mb-1">{project.title}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold">
                        {project.creator.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold">{project.creator}</p>
                        <p className="text-xs text-white/60">{project.timeAgo}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-3 pb-3 border-b border-purple-500/20">
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4 text-purple-400" />
                        <span className="text-sm font-semibold">{project.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4 text-red-400 fill-red-400" />
                        <span className="text-sm font-semibold">{project.hearts}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4 text-purple-400" />
                        <span className="text-sm font-semibold">{project.comments}</span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-3">
                      <p className="text-xs font-semibold text-purple-300">Recent comments:</p>
                      {project.recentComments.map((comment, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <div className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                            {comment.user.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <p className="text-xs">
                              <span className="font-semibold">{comment.user}:</span>{' '}
                              <span className="text-white/70">{comment.text}</span>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button className="w-full bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-lg font-semibold text-sm transition-all">
                      View All Comments
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <QuickAccess onNavigate={onNavigate} />
      <Footer />
    </div>
  );
}
