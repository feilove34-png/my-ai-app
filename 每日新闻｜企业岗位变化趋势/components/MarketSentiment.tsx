
import React from 'react';
import { MarketSentiment, Language } from '../types';
import { TrendingUp, AlertTriangle, FileText, Tag, CheckCircle2 } from 'lucide-react';
import { TRANSLATIONS } from '../constants';

interface Props {
  sentiment: MarketSentiment;
  language: Language;
}

const MarketSentimentCard: React.FC<Props> = ({ sentiment, language }) => {
  const t = TRANSLATIONS[language];

  if (!sentiment) return null;

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-6 h-6 text-indigo-600" />
        <h2 className="text-xl font-bold text-slate-800">{t.marketSentiment}</h2>
      </div>

      <p className="text-slate-600 leading-relaxed text-sm md:text-base mb-6 bg-slate-50 p-4 rounded-lg border border-slate-100">
        {sentiment.summary}
      </p>

      {/* Keywords */}
      <div className="mb-6">
        <h3 className="text-xs font-bold text-slate-500 uppercase mb-2 flex items-center gap-1">
            <Tag size={12} /> {t.keywords}
        </h3>
        <div className="flex flex-wrap gap-2">
            {sentiment.keywords.map((kw, idx) => (
                <span key={idx} className="px-3 py-1 bg-indigo-50 text-indigo-700 text-sm font-medium rounded-full border border-indigo-100">
                    {kw}
                </span>
            ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Opportunities */}
        <div className="bg-emerald-50/50 rounded-xl p-4 border border-emerald-100">
            <h3 className="text-emerald-800 font-bold mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                {t.opportunities}
            </h3>
            <ul className="space-y-2">
                {sentiment.opportunities.map((opp, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-emerald-900">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{opp}</span>
                    </li>
                ))}
            </ul>
        </div>

        {/* Risks */}
        <div className="bg-red-50/50 rounded-xl p-4 border border-red-100">
            <h3 className="text-red-800 font-bold mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                {t.risks}
            </h3>
            <ul className="space-y-2">
                {sentiment.risks.map((risk, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-red-900">
                        <span className="w-4 h-4 flex items-center justify-center font-bold text-xs text-red-500 bg-red-100 rounded-full shrink-0 mt-0.5">!</span>
                        <span>{risk}</span>
                    </li>
                ))}
            </ul>
        </div>
      </div>
    </div>
  );
};

export default MarketSentimentCard;
