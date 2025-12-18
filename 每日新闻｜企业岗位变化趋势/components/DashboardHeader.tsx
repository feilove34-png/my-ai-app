
import React from 'react';
import { Sparkles } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface Props {
  date: string;
  language?: Language;
}

const DashboardHeader: React.FC<Props> = ({ date, language = 'CN' }) => {
  const t = TRANSLATIONS[language];
  return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 rounded-2xl shadow-lg mb-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-indigo-500 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-emerald-500 rounded-full blur-3xl opacity-20"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2 text-indigo-300 font-semibold tracking-wider text-sm uppercase">
            <Sparkles className="w-4 h-4" />
            <span>Daily Intelligence</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            {t.title}
          </h1>
          <p className="text-slate-400 mt-2 max-w-xl text-sm md:text-base">
            {t.subtitle}
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 text-center">
            <div className="text-xs text-slate-300 uppercase">{t.analysisDate}</div>
            <div className="text-lg font-mono font-bold text-white">{date || 'Loading...'}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
