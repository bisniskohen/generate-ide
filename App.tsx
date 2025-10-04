
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { OutputDisplay } from './components/OutputDisplay';
import { generateContentIdeas } from './services/geminiService';
import type { ContentIdea, UserInputs } from './types';

const App: React.FC = () => {
  const [userInputs, setUserInputs] = useState<UserInputs>({
    hookType: '',
    languageStyle: '',
    targetMarket: '',
    productLink: '',
  });
  const [generatedContent, setGeneratedContent] = useState<ContentIdea[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedContent([]);
    try {
      const content = await generateContentIdeas(userInputs);
      setGeneratedContent(content);
    } catch (err) {
      setError(err instanceof Error ? `Terjadi kesalahan: ${err.message}` : 'Terjadi kesalahan yang tidak diketahui.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [userInputs]);

  return (
    <div className="min-h-screen text-gray-200 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <Header />
        <main>
          <InputForm
            userInputs={userInputs}
            setUserInputs={setUserInputs}
            onGenerate={handleGenerate}
            isLoading={isLoading}
          />
          <OutputDisplay
            content={generatedContent}
            isLoading={isLoading}
            error={error}
          />
        </main>
      </div>
    </div>
  );
};

export default App;
