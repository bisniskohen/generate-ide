
import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
        <div className="relative h-16 w-16">
            <div className="absolute top-0 left-0 h-full w-full rounded-full border-4 border-t-cyan-400 border-r-cyan-400 border-b-blue-500/30 border-l-blue-500/30 animate-spin"></div>
            <div className="absolute top-0 left-0 h-full w-full rounded-full border-4 border-t-violet-500 border-r-violet-500 border-b-blue-500/30 border-l-blue-500/30 animate-spin [animation-delay:-0.2s] opacity-75"></div>
        </div>
      <h3 className="mt-6 text-xl font-semibold text-gray-300 tracking-wider">
        AI sedang meracik ide...
      </h3>
      <p className="text-gray-500 mt-1">Ini mungkin memakan waktu beberapa saat.</p>
    </div>
  );
};
