
import React from 'react';
import { SkillRequirement, Language } from '../types';
import { Lightbulb, Target, Trophy, Award, UserCheck } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { TRANSLATIONS } from '../constants';

interface Props {
  skills: SkillRequirement[];
  bestRole: string;
  language: Language;
}

const COLORS = ['#4f46e5', '#0ea5e9', '#10b981', '#f59e0b', '#8b5cf6'];

const SkillAnalysis: React.FC<Props> = ({ skills, bestRole, language }) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="space-y-6" id="skill-analysis-section">
      {/* Best Opportunity Banner */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
            <Trophy size={100} />
        </div>
        <div className="relative z-10">
            <h3 className="text-indigo-100 font-medium uppercase text-xs tracking-wider mb-1">{t.successPrediction}</h3>
            <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold">{t.bestRole}:</span>
                <span className="text-3xl font-extrabold text-yellow-300">{bestRole}</span>
            </div>
            <p className="mt-2 text-indigo-100 text-sm max-w-2xl opacity-90">
                {t.bestRoleDesc}
            </p>
        </div>
      </div>

      <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 mt-8">
        <Target className="w-6 h-6 text-indigo-600" />
        {t.successProfile}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((skill, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
            <div className="bg-slate-50 p-4 border-b border-slate-100 flex justify-between items-center">
                <h4 className="font-bold text-slate-800">{skill.roleCategory}</h4>
                <Award className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="p-5 flex-1 flex flex-col gap-5">
                
                {/* Visual Breakdown */}
                <div className="flex flex-col md:flex-row gap-4 items-center bg-white border border-slate-100 rounded-lg p-2 shadow-sm">
                    <div className="w-32 h-32 shrink-0 relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={skill.capabilityBreakdown || []}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={25}
                                    outerRadius={45}
                                    paddingAngle={2}
                                    dataKey="percentage"
                                >
                                    {(skill.capabilityBreakdown || []).map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    formatter={(value: number) => `${value}%`}
                                    contentStyle={{ borderRadius: '8px', fontSize: '12px' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <span className="text-[10px] font-bold text-slate-400 uppercase">{t.impact}</span>
                        </div>
                    </div>
                    <div className="flex-1 w-full">
                        <h5 className="text-xs font-bold text-slate-500 uppercase mb-2">{t.successFactor}</h5>
                        <div className="space-y-2">
                             {(skill.capabilityBreakdown || []).map((item, i) => (
                                <div key={i} className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></span>
                                        <span className="text-slate-600">{item.name}</span>
                                    </div>
                                    <span className="font-bold text-slate-700">{item.percentage}%</span>
                                </div>
                             ))}
                        </div>
                    </div>
                </div>

                <div className="bg-indigo-50/50 p-3 rounded-lg border border-indigo-100">
                    <div className="flex items-center gap-2 mb-2 text-indigo-800">
                        <UserCheck className="w-4 h-4" />
                        <h5 className="text-xs font-bold uppercase">{t.idealProfile}</h5>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                        {skill.preferredStudentProfile || "Data not available for profile analysis."}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h5 className="text-xs font-bold text-slate-400 uppercase mb-2">{t.hardSkills}</h5>
                        <div className="flex flex-wrap gap-1.5">
                            {skill.hardSkills.map((s, i) => (
                                <span key={i} className="px-2 py-1 bg-white text-slate-600 text-xs rounded border border-slate-200 font-medium">
                                    {s}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h5 className="text-xs font-bold text-slate-400 uppercase mb-2">{t.softSkills}</h5>
                        <div className="flex flex-wrap gap-1.5">
                            {skill.softSkills.map((s, i) => (
                                <span key={i} className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded border border-emerald-100 font-medium">
                                    {s}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-auto pt-4 border-t border-slate-100">
                    <div className="flex gap-3">
                        <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                        <p className="text-sm text-slate-600 italic">
                           <span className="font-bold not-italic text-slate-800">{t.expertTip}: </span> 
                           "{skill.successTip}"
                        </p>
                    </div>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillAnalysis;
