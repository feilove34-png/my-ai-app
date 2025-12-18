
import React from 'react';
import { CityStat, Language } from '../types';
import { MapPin } from 'lucide-react';
import { TRANSLATIONS } from '../constants';

interface Props {
  cities: CityStat[];
  language: Language;
}

const CityTrends: React.FC<Props> = ({ cities, language }) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4 shrink-0">
        <MapPin className="w-5 h-5 text-red-500" />
        <h3 className="text-lg font-bold text-slate-800">{t.cityTitle}</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
        {cities.map((city, idx) => (
          <div key={idx} className="relative pb-2 border-b border-slate-50 last:border-0 last:pb-0">
            <div className="flex justify-between items-center mb-1 text-sm">
              <span className="font-bold text-slate-700 flex items-center gap-2">
                <span className={`flex items-center justify-center w-5 h-5 rounded-full text-[10px] ${idx < 3 ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-500'}`}>
                    {idx + 1}
                </span>
                {city.name}
              </span>
              <span className="font-mono font-medium text-slate-500 text-xs bg-slate-50 px-2 py-0.5 rounded-full">
                {city.heatIndex}/100
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 mb-2">
              <div 
                className="bg-gradient-to-r from-red-500 to-orange-400 h-1.5 rounded-full" 
                style={{ width: `${city.heatIndex}%` }}
              ></div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed text-justify">
                {city.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CityTrends;
