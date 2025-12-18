
import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  Cell
} from 'recharts';
import { JobStat, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface Props {
  stats: JobStat[];
  language: Language;
}

const JobCharts: React.FC<Props> = ({ stats, language }) => {
  const t = TRANSLATIONS[language];
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleBarClick = () => {
    const element = document.getElementById('skill-analysis-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Custom Tick Component for Y-Axis to handle highlighting and stricter truncation
  const CustomYAxisTick = (props: any) => {
    const { x, y, payload, index } = props;
    const isActive = index === activeIndex;
    const text = payload.value;
    
    // Stricter truncation for Chinese characters to fit in 150px width
    // Assuming approx 14px per Chinese char, 150px fits about 10 chars safely.
    const maxLength = 10; 
    const displayText = text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;

    return (
      <g transform={`translate(${x},${y})`}>
        <title>{text}</title> {/* Native tooltip on hover */}
        <text 
          x={0} 
          y={0} 
          dy={4} 
          textAnchor="end" 
          fill={isActive ? '#4f46e5' : '#475569'} 
          fontWeight={isActive ? 700 : 500}
          fontSize={12}
          className="transition-colors duration-200 ease-in-out cursor-default"
        >
          {displayText}
        </text>
      </g>
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-full flex flex-col">
      <div className="mb-4 shrink-0">
        <h3 className="text-lg font-bold text-slate-800">{t.jobChartTitle}</h3>
        <p className="text-sm text-slate-500 mt-1">{t.jobChartSubtitle}</p>
      </div>
      
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={stats}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
            onMouseMove={(state: any) => {
              if (state && state.activeTooltipIndex !== undefined) {
                setActiveIndex(state.activeTooltipIndex);
              }
            }}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={true} opacity={0.3} />
            <XAxis type="number" domain={[0, 100]} hide />
            <YAxis 
                type="category" 
                dataKey="role" 
                width={140} 
                tick={<CustomYAxisTick />}
                interval={0}
                axisLine={false}
                tickLine={false}
            />
            <Tooltip 
                cursor={{fill: '#f1f5f9', opacity: 0.5}}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
            />
            <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ paddingTop: '0px' }}/>
            
            <Bar 
              dataKey="volumeIndex" 
              name={t.volume} 
              fill="#4f46e5" 
              radius={[0, 4, 4, 0]} 
              barSize={12}
              onClick={handleBarClick}
              className="cursor-pointer"
            >
                {stats.map((entry, index) => (
                    <Cell 
                      key={`cell-vol-${index}`} 
                      fillOpacity={activeIndex === index ? 1 : 0.7} 
                      className="transition-opacity duration-200"
                    />
                ))}
            </Bar>
            
            <Bar 
              dataKey="difficulty" 
              name={t.difficulty} 
              fill="#ef4444" 
              radius={[0, 4, 4, 0]} 
              barSize={12}
              onClick={handleBarClick}
              className="cursor-pointer"
            >
               {stats.map((entry, index) => (
                    <Cell 
                      key={`cell-diff-${index}`} 
                      fillOpacity={activeIndex === index ? 1 : 0.7} 
                      className="transition-opacity duration-200"
                    />
                ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default JobCharts;
