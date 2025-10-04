
import React from 'react';
import type { UserInputs } from '../types';
import { HOOK_TYPES, LANGUAGE_STYLES } from '../constants';
import { SparklesIcon } from './icons/SparklesIcon';

interface InputFormProps {
  userInputs: UserInputs;
  setUserInputs: React.Dispatch<React.SetStateAction<UserInputs>>;
  onGenerate: () => void;
  isLoading: boolean;
}

const formControlClass = "w-full p-3 bg-gray-900/50 border border-blue-500/30 rounded-lg text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition duration-200";
const labelClass = "block mb-2 text-sm font-medium text-cyan-300";

export const InputForm: React.FC<InputFormProps> = ({ userInputs, setUserInputs, onGenerate, isLoading }) => {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserInputs(prev => ({ ...prev, [name]: value }));
  };
  
  const isFormValid = userInputs.hookType && userInputs.languageStyle && userInputs.targetMarket;

  return (
    <div className="p-6 sm:p-8 bg-black/30 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-2xl shadow-blue-500/10 mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Kolom Kiri */}
        <div>
          <label htmlFor="hookType" className={labelClass}>
            Pilih Jenis Hook
          </label>
          <select
            id="hookType"
            name="hookType"
            value={userInputs.hookType}
            onChange={handleChange}
            className={formControlClass}
            required
          >
            <option value="" disabled>Pilih satu...</option>
            {HOOK_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="languageStyle" className={labelClass}>
            Pilih Style Bahasa
          </label>
          <select
            id="languageStyle"
            name="languageStyle"
            value={userInputs.languageStyle}
            onChange={handleChange}
            className={formControlClass}
            required
          >
            <option value="" disabled>Pilih satu...</option>
            {LANGUAGE_STYLES.map(style => <option key={style} value={style}>{style}</option>)}
          </select>
        </div>
        {/* Kolom Full-width */}
        <div className="md:col-span-2">
          <label htmlFor="targetMarket" className={labelClass}>
            Tentukan Target Market Anda
          </label>
          <input
            type="text"
            id="targetMarket"
            name="targetMarket"
            value={userInputs.targetMarket}
            onChange={handleChange}
            className={formControlClass}
            placeholder="Contoh: Wanita usia 25-35, tertarik pada skincare, tinggal di kota besar"
            required
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="productLink" className={labelClass}>
            Link Produk (Opsional)
          </label>
          <input
            type="text"
            id="productLink"
            name="productLink"
            value={userInputs.productLink}
            onChange={handleChange}
            className={formControlClass}
            placeholder="Contoh: https://tokopedia.com/produk-anda"
          />
        </div>
      </div>
      <div className="mt-8 text-center">
        <button
          onClick={onGenerate}
          disabled={isLoading || !isFormValid}
          className="inline-flex items-center justify-center gap-2 px-8 py-4 font-bold text-white rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Memproses...
            </>
          ) : (
            <>
              <SparklesIcon />
              Generate 20 Ide Konten
            </>
          )}
        </button>
        {!isFormValid && 
            <p className="text-xs text-yellow-400 mt-3">Harap isi Jenis Hook, Style Bahasa, dan Target Market.</p>
        }
      </div>
    </div>
  );
};
