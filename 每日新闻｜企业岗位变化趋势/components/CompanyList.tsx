
import React, { useState, useEffect } from 'react';
import { CompanyCategory, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { Building2, Rocket, TrendingUp, Info, MapPin, DollarSign } from 'lucide-react';

interface Props {
  categories: CompanyCategory[];
  language: Language;
}

const CITY_FILTERS = {
    CN: ['全部', '北京', '上海', '广州', '深圳', '杭州'],
    EN: ['All', 'Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Hangzhou']
};

const getIconForCategory = (index: number) => {
    switch (index) {
        case 0: return <Building2 className="w-5 h-5 text-indigo-600" />;
        case 1: return <TrendingUp className="w-5 h-5 text-emerald-600" />;
        case 2: return <Rocket className="w-5 h-5 text-purple-600" />;
        default: return <Building2 className="w-5 h-5 text-slate-600" />;
    }
};

const getColorForCategory = (index: number) => {
    switch (index) {
        case 0: return "border-t-indigo-500";
        case 1: return "border-t-emerald-500";
        case 2: return "border-t-purple-500";
        default: return "border-t-slate-500";
    }
};

const CompanyList: React.FC<Props> = ({ categories, language }) => {
  const t = TRANSLATIONS[language];
  const [selectedCity, setSelectedCity] = useState<string>(CITY_FILTERS[language][0]);

  // Reset selected city when language changes to match the correct localized string
  useEffect(() => {
    setSelectedCity(CITY_FILTERS[language][0]);
  }, [language]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Building2 className="w-6 h-6 text-indigo-600" />
            {t.topCompanies}
        </h3>
        
        {/* City Filter Buttons */}
        <div className="flex flex-wrap gap-2">
            {CITY_FILTERS[language].map((city) => (
                <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={`px-3 py-1 text-xs font-medium rounded-full border transition-all duration-200 ${
                        selectedCity === city
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                >
                    {city}
                </button>
            ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat, idx) => {
          // Filter companies based on selected city
          const filteredCompanies = selectedCity === CITY_FILTERS[language][0]
            ? cat.companies
            : cat.companies.filter(c => c.location.includes(selectedCity));

          return (
            <div key={idx} className={`bg-white rounded-xl shadow-sm border border-slate-200 border-t-4 ${getColorForCategory(idx)} overflow-hidden flex flex-col`}>
                <div className="p-5 border-b border-slate-100 bg-slate-50/50">
                    <div className="flex items-center gap-2 mb-2">
                        {getIconForCategory(idx)}
                        <h4 className="font-bold text-lg text-slate-800">{cat.categoryName}</h4>
                    </div>
                    <div className="flex gap-2 text-xs text-slate-500 leading-relaxed">
                        <Info className="w-3 h-3 mt-0.5 shrink-0" />
                        {cat.description}
                    </div>
                </div>
                
                <div className="flex-1 overflow-y-auto max-h-[400px]">
                    {filteredCompanies.length > 0 ? (
                        <div className="divide-y divide-slate-100">
                            {filteredCompanies.map((company, cIdx) => (
                                <div key={cIdx} className="p-4 hover:bg-slate-50 transition-colors">
                                    <div className="flex items-start justify-between mb-1">
                                        <span className="flex items-center gap-2 font-bold text-slate-700 text-sm">
                                            <span className="text-slate-300 text-xs font-mono">{(cIdx + 1).toString().padStart(2, '0')}</span>
                                            {company.name}
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        <div className="flex items-center gap-1 text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                                            <MapPin size={10} />
                                            {company.location}
                                        </div>
                                        <div className="flex items-center gap-1 text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                                            <DollarSign size={10} />
                                            {company.scale}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-40 text-slate-400 p-4 text-center">
                            <MapPin className="w-8 h-8 mb-2 opacity-20" />
                            <p className="text-xs">
                                {language === 'CN' 
                                    ? `在${selectedCity}暂无该类别推荐企业` 
                                    : `No ${cat.categoryName} listed in ${selectedCity}`
                                }
                            </p>
                        </div>
                    )}
                </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CompanyList;
