import React from 'react';
import { Industry, CandidateType, Language } from '../types';
import { INDUSTRIES, CANDIDATE_TYPES, INDUSTRY_ICONS, TRANSLATIONS } from '../constants';
import { Search, Download, Languages, Image as ImageIcon } from 'lucide-react';

interface Props {
  selectedIndustry: Industry;
  selectedType: CandidateType;
  language: Language;
  onIndustryChange: (ind: Industry) => void;
  onTypeChange: (type: CandidateType) => void;
  onLanguageChange: (lang: Language) => void;
  onGenerate: () => void;
  onExportPDF: () => void;
  onExportImage: () => void;
  isLoading: boolean;
  hasData: boolean;
}

const Controls: React.FC<Props> = ({
  selectedIndustry,
  selectedType,
  language,
  onIndustryChange,
  onTypeChange,
  onLanguageChange,
  onGenerate,
  onExportPDF,
  onExportImage,
  isLoading,
  hasData
}) => {
  const t = TRANSLATIONS[language];

  return (
    <div id="controls-section" className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6 no-print">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        
        {/* Industry Selector */}
        <div className="md:col-span-5">
          <div className="flex justify-between items-center mb-2">
             <label className="block text-xs font-semibold text-slate-500 uppercase">{t.selectIndustry}</label>
             
             {/* Mobile Language Toggle (Visible only on small screens) */}
             <button 
                onClick={() => onLanguageChange(language === 'CN' ? 'EN' : 'CN')}
                className="md:hidden flex items-center gap-1 text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded"
             >
                <Languages size={12} />
                {language}
             </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {INDUSTRIES.map((ind) => (
              <button
                key={ind}
                onClick={() => onIndustryChange(ind)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 border ${
                  selectedIndustry === ind
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-700 ring-1 ring-indigo-200 font-medium'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {INDUSTRY_ICONS[ind]}
                {ind}
              </button>
            ))}
          </div>
        </div>

        {/* Vertical Divider (Desktop) */}
        <div className="hidden md:block md:col-span-1 h-full w-px bg-slate-200 mx-auto"></div>

        {/* Type Selector */}
        <div className="md:col-span-3">
          <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">{t.targetAudience}</label>
          <div className="flex gap-2 bg-slate-100 p-1 rounded-lg">
            {CANDIDATE_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => onTypeChange(type)}
                className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-all ${
                  selectedType === type
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="md:col-span-3 flex justify-end gap-2">
           {/* Desktop Language Toggle */}
           <button 
                onClick={() => onLanguageChange(language === 'CN' ? 'EN' : 'CN')}
                className="hidden md:flex items-center gap-1.5 px-3 py-3 rounded-lg text-slate-700 font-bold bg-white border border-slate-200 hover:bg-slate-50 transition-all"
                title="Switch Language"
            >
                <Languages className="w-5 h-5" />
                {language}
            </button>

          {hasData && (
            <>
                <button
                    onClick={onExportImage}
                    className="flex items-center justify-center gap-2 px-3 py-3 rounded-lg text-slate-700 font-medium bg-white border border-slate-200 hover:bg-slate-50 transition-all"
                    title={t.downloadImage}
                >
                    <ImageIcon className="w-5 h-5" />
                    <span className="hidden xl:inline">{t.downloadImage}</span>
                </button>
                <button
                    onClick={onExportPDF}
                    className="flex items-center justify-center gap-2 px-3 py-3 rounded-lg text-slate-700 font-medium bg-white border border-slate-200 hover:bg-slate-50 transition-all"
                    title={t.downloadPDF}
                >
                    <Download className="w-5 h-5" />
                    <span className="hidden xl:inline">{t.downloadPDF}</span>
                </button>
            </>
          )}
          
          <button
            onClick={onGenerate}
            disabled={isLoading}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white font-medium transition-all ${
              isLoading
                ? 'bg-indigo-300 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg'
            }`}
          >
            {isLoading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t.analyzing}
                </>
            ) : (
                <>
                    <Search className="w-5 h-5" />
                    {t.generate}
                </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Controls;