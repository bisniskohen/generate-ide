
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center py-8 sm:py-12">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500">
          Generator Konten Viral AI
        </span>
      </h1>
      <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
        Masukkan detail produk dan target market Anda, biarkan AI menciptakan hook dan skrip konten yang siap viral.
      </p>
    </header>
  );
};
