
import React from 'react';
import type { ContentIdea } from '../types';
import { Loader } from './Loader';
import { ContentCard } from './ContentCard';

interface OutputDisplayProps {
  content: ContentIdea[];
  isLoading: boolean;
  error: string | null;
}

export const OutputDisplay: React.FC<OutputDisplayProps> = ({ content, isLoading, error }) => {
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-red-900/20 border border-red-500 rounded-lg">
        <h3 className="text-xl font-bold text-red-400">Error</h3>
        <p className="text-red-300 mt-2">{error}</p>
      </div>
    );
  }
  
  if (content.length === 0) {
     return (
        <div className="text-center py-16 px-6 border-2 border-dashed border-gray-700 rounded-2xl">
          <svg className="mx-auto h-12 w-12 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <h3 className="mt-2 text-xl font-semibold text-gray-300">Hasil Generasi Akan Muncul Disini</h3>
          <p className="mt-1 text-gray-500">Isi formulir di atas dan klik generate untuk memulai.</p>
        </div>
     );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-violet-400">
        ✨ 20 Ide Konten Untuk Anda ✨
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {content.map((idea, index) => (
          <ContentCard key={index} idea={idea} index={index} />
        ))}
      </div>
    </div>
  );
};
