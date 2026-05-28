import React, { useState } from 'react';
import { Copy, Check, Sparkles, Hash, MessageSquare, Briefcase, Heart, MessageCircle, Send, Bookmark } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const CaptionDashboard = ({ captionData, previewUrl }) => {
  const [copied, setCopied] = useState(false);
  const [activeTone, setActiveTone] = useState('witty');
  const { user } = useAuth();

  if (!captionData) return null;

  const getCaptionVariation = (tone) => {
    if (typeof captionData === 'object' && captionData[tone]) {
      return captionData[tone];
    }
    const base = typeof captionData === 'string' ? captionData : captionData.text || captionData.caption || 'Beautiful moment captured beautifully.';
    if (tone === 'professional') return `${base} Excited to share this update with my network. #Growth #Professional`;
    if (tone === 'casual') return `${base} Vibes! ✨`;
    return base;
  };

  const currentCaption = getCaptionVariation(activeTone);
  const username = user?.username || 'your_username';

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCaption);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full mt-4 animate-in fade-in duration-500">
      <div className="glass-panel p-6 md:p-10">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Left Column: Output & Controls */}
          <div className="flex-1 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="text-amber-500" size={24} />
              <h2 className="text-2xl font-semibold text-zinc-100 tracking-tight">Generated Caption</h2>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {[
                { id: 'witty', label: 'Witty', icon: Hash },
                { id: 'casual', label: 'Casual', icon: MessageSquare },
                { id: 'professional', label: 'Pro', icon: Briefcase }
              ].map(tone => (
                <button
                  key={tone.id}
                  onClick={() => setActiveTone(tone.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all duration-300 ${
                    activeTone === tone.id 
                      ? 'bg-zinc-800 text-amber-500 border border-amber-500/50 shadow-sm' 
                      : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:bg-zinc-800 hover:text-zinc-300'
                  }`}
                >
                  <tone.icon size={14} />
                  {tone.label}
                </button>
              ))}
            </div>

            <div className="relative flex-1 flex flex-col">
              <div className="flex-1 bg-zinc-950 rounded-xl p-6 border border-zinc-800 shadow-inner text-zinc-300 text-lg leading-relaxed whitespace-pre-wrap">
                {currentCaption}
              </div>
              
              <button
                onClick={handleCopy}
                className={`mt-4 py-3.5 rounded-xl flex items-center justify-center gap-2 font-medium transition-all duration-300 shadow-sm ${
                  copied 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700 border border-zinc-700'
                }`}
              >
                {copied ? (
                  <>
                    <Check size={18} /> Copied to Clipboard!
                  </>
                ) : (
                  <>
                    <Copy size={18} /> Copy Caption
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Beautiful Instagram Mockup */}
          <div className="w-full lg:w-[360px] shrink-0">
            <h3 className="text-sm font-medium text-zinc-500 mb-4 tracking-wider uppercase">Instagram Preview</h3>
            
            <div className="bg-zinc-950 rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl">
              {/* Post Header */}
              <div className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-rose-500 p-[2px]">
                    <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center text-xs font-bold text-zinc-400">
                      {username[0].toUpperCase()}
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-zinc-200">{username}</span>
                </div>
                <div className="flex gap-1">
                  <div className="w-1 h-1 rounded-full bg-zinc-600"></div>
                  <div className="w-1 h-1 rounded-full bg-zinc-600"></div>
                  <div className="w-1 h-1 rounded-full bg-zinc-600"></div>
                </div>
              </div>

              {/* Post Image */}
              <div className="w-full aspect-square bg-zinc-900 border-y border-zinc-800 flex items-center justify-center overflow-hidden">
                {previewUrl ? (
                  <img src={previewUrl} alt="Post preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-zinc-700 font-medium text-sm">Image Preview</div>
                )}
              </div>

              {/* Post Actions */}
              <div className="p-3">
                <div className="flex items-center justify-between mb-3 text-zinc-300">
                  <div className="flex items-center gap-4">
                    <Heart size={24} className="hover:text-zinc-500 cursor-pointer" />
                    <MessageCircle size={24} className="hover:text-zinc-500 cursor-pointer" />
                    <Send size={24} className="hover:text-zinc-500 cursor-pointer" />
                  </div>
                  <Bookmark size={24} className="hover:text-zinc-500 cursor-pointer" />
                </div>
                
                <p className="text-sm font-semibold text-zinc-200 mb-1">1,234 likes</p>
                <div className="text-sm text-zinc-300 leading-relaxed">
                  <span className="font-semibold text-zinc-200 mr-2">{username}</span>
                  <span className="break-words">{currentCaption}</span>
                </div>
                <p className="text-xs text-zinc-500 mt-2 uppercase">Just now</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CaptionDashboard;
