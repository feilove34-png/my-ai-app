
import React from 'react';
import { YearlyStrategy, Language } from '../types';
import { GraduationCap, BookOpen, Compass, Briefcase } from 'lucide-react';
import { TRANSLATIONS } from '../constants';

interface Props {
  strategies: YearlyStrategy[];
  language: Language;
}

const getIcon = (index: number) => {
    switch(index) {
        case 0: return <Compass className="w-6 h-6 text-emerald-500" />; // Freshman - Explore
        case 1: return <BookOpen className="w-6 h-6 text-indigo-500" />; // Sophomore - Learn
        case 2: return <Briefcase className="w-6 h-6 text-purple-500" />; // Junior - Work
        case 3: return <GraduationCap className="w-6 h-6 text-amber-500" />; // Senior - Graduate
        default: return <Compass className="w-6 h-6" />;
    }
};

const getGradient = (index: number) => {
    switch(index) {
        case 0: return "from-emerald-500 to-teal-600";
        case 1: return "from-indigo-500 to-blue-600";
        case 2: return "from-purple-500 to-violet-600";
        case 3: return "from-amber-500 to-orange-600";
        default: return "from-slate-500 to-slate-600";
    }
};

const YearlyGuide: React.FC<Props> = ({ strategies, language }) => {
  const t = TRANSLATIONS[language];
  
  if (!strategies || strategies.length === 0) return null;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <div className="flex items-center gap-2 mb-6">
        <GraduationCap className="w-6 h-6 text-indigo-600" />
        <h3 className="text-xl font-bold text-slate-800">{t.roadmap}</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {strategies.map((strategy, idx) => (
          <div key={idx} className="relative flex flex-col h-full">
            {/* Header Card */}
            <div className={`p-4 rounded-t-xl bg-gradient-to-br ${getGradient(idx)} text-white`}>
                <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-lg">{strategy.year}</span>
                    <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
                        {getIcon(idx)}
                    </div>
                </div>
                <div className="text-xs font-medium uppercase tracking-wide opacity-90">{t.coreFocus}</div>
                <div className="font-semibold text-sm leading-tight mt-0.5">{strategy.focus}</div>
            </div>

            {/* Content Body */}
            <div className="p-4 bg-slate-50 border-x border-b border-slate-200 rounded-b-xl flex-1 flex flex-col">
                <div className="mb-4">
                    <h5 className="text-xs font-bold text-slate-400 uppercase mb-2">{t.bestRolesTarget}</h5>
                    <ul className="space-y-2">
                        {strategy.recommendedRoles.map((role, rIdx) => (
                            <li key={rIdx} className="flex items-start gap-2 text-sm text-slate-700 font-medium">
                                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-1.5 shrink-0"></span>
                                {role}
                            </li>
                        ))}
                    </ul>
                </div>
                
                <div className="mt-auto pt-3 border-t border-slate-100">
                    <p className="text-xs text-slate-500 leading-relaxed">
                        <span className="font-semibold text-slate-600">{t.why}</span> {strategy.reasoning}
                    </p>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YearlyGuide;
