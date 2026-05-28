import React from 'react';
import { History, ChevronRight } from 'lucide-react';

const HistoryFeed = ({ history, onSelect }) => {
  if (!history || history.length === 0) {
    return null;
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar snap-x">
      {history.map((item, index) => {
        const captionText = typeof item.caption === 'string' 
          ? item.caption 
          : (item.caption?.witty || item.caption?.text || 'Generated caption');

        return (
          <div 
            key={item.id || index}
            onClick={() => onSelect(item)}
            className="flex-shrink-0 w-64 glass-panel p-4 cursor-pointer group snap-start"
          >
            <div className="aspect-video w-full rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800 mb-3 relative">
              {item.preview ? (
                item.type?.startsWith('video') ? (
                  <video src={item.preview} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                ) : (
                  <img src={item.preview} alt="history-thumbnail" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                )
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-700">
                  <History size={24} />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                <ChevronRight size={16} className="text-zinc-300" />
              </div>
            </div>
            
            <p className="text-xs text-zinc-500 font-medium mb-1">
              {new Date(item.timestamp || Date.now()).toLocaleDateString()}
            </p>
            <p className="text-sm text-zinc-300 line-clamp-2 leading-relaxed group-hover:text-zinc-100 transition-colors">
              {captionText}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default HistoryFeed;
