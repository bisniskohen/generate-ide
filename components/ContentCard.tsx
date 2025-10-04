
import React, { useState } from 'react';
import type { ContentIdea } from '../types';
import { ClipboardIcon } from './icons/ClipboardIcon';

interface ContentCardProps {
  idea: ContentIdea;
  index: number;
}

export const ContentCard: React.FC<ContentCardProps> = ({ idea, index }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = `Hook: ${idea.hook}\n\nIde Konten: ${idea.ideKonten}\n\nSkrip: ${idea.skrip}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const formattedScript = idea.skrip.split('\n').map((line, i) => (
    <span key={i}>
      {line}
      <br />
    </span>
  ));

  return (
    <div className="bg-gray-900/50 backdrop-blur-md border border-blue-500/20 rounded-xl p-6 transition-all duration-300 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/10 relative overflow-hidden group">
        <div className="absolute -top-1 -right-1 bg-gradient-to-r from-cyan-400 to-violet-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
            IDE #{index + 1}
        </div>
        
        <div className="space-y-4">
            <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-cyan-400">HOOK</h4>
                <p className="mt-1 text-lg font-bold text-gray-100">{idea.hook}</p>
            </div>
            <div className="border-t border-gray-700/50 my-3"></div>
            <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-violet-400">IDE KONTEN</h4>
                <p className="mt-1 text-gray-300">{idea.ideKonten}</p>
            </div>
             <div className="border-t border-gray-700/50 my-3"></div>
            <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-pink-400">SKRIP</h4>
                <p className="mt-1 text-gray-300 whitespace-pre-wrap font-mono text-sm">{formattedScript}</p>
            </div>
        </div>
        
        <button 
            onClick={handleCopy}
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-800/50 text-gray-400 hover:bg-cyan-500 hover:text-white transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label="Salin skrip"
        >
            <ClipboardIcon />
        </button>

        {copied && (
          <div className="absolute bottom-4 right-4 bg-green-500 text-white text-xs px-2 py-1 rounded-md animate-fade-in-out">
            Disalin!
          </div>
        )}
    </div>
  );
};
