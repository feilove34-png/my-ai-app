
import React from 'react';
import { NewsItem, Language } from '../types';
import { ExternalLink, Newspaper } from 'lucide-react';
import { TRANSLATIONS } from '../constants';

interface Props {
  news: NewsItem[];
  language: Language;
}

const NewsSection: React.FC<Props> = ({ news, language }) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Newspaper className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-bold text-slate-800">{t.newsTitle}</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {news.map((item, idx) => (
          <div key={idx} className="group p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100">
            <h4 className="font-semibold text-slate-800 mb-2 leading-tight group-hover:text-indigo-600 transition-colors">
              {item.title}
            </h4>
            <p className="text-sm text-slate-600 mb-3 line-clamp-3">
              {item.summary}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                {item.source || 'Aggregated Source'}
              </span>
              {item.url && item.url !== '#' && (
                 <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-indigo-500 hover:text-indigo-700 font-medium"
                 >
                    {t.readSource} <ExternalLink className="w-3 h-3" />
                 </a>
              )}
            </div>
          </div>
        ))}
        {news.length === 0 && (
            <div className="text-center text-slate-400 py-10">
                {t.noNews}
            </div>
        )}
      </div>
    </div>
  );
};

export default NewsSection;
