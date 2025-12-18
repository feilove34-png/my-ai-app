import React, { useState, useEffect } from 'react';
import DashboardHeader from './components/DashboardHeader';
import Controls from './components/Controls';
import NewsSection from './components/NewsSection';
import JobCharts from './components/JobCharts';
import SkillAnalysis from './components/SkillAnalysis';
import CityTrends from './components/CityTrends';
import CompanyList from './components/CompanyList';
import YearlyGuide from './components/YearlyGuide';
import MarketSentimentCard from './components/MarketSentiment';
import { Industry, CandidateType, AnalysisResult, Language } from './types';
import { fetchDailyAnalysis } from './services/geminiService';
import { TRANSLATIONS } from './constants';
import html2canvas from 'html2canvas';

const App: React.FC = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<Industry>(Industry.INTERNET);
  const [selectedType, setSelectedType] = useState<CandidateType>(CandidateType.GRADUATE);
  const [language, setLanguage] = useState<Language>('CN');
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Initial load
  useEffect(() => {
    handleGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchDailyAnalysis(selectedIndustry, selectedType, language);
      setData(result);
    } catch (err) {
      setError("Failed to fetch analysis. Please try again or check your API key/connection.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleExportPDF = () => {
    window.print();
  };

  const handleExportImage = async () => {
    const element = document.getElementById('report-container');
    if (!element) return;

    try {
        const canvas = await html2canvas(element, {
            useCORS: true,
            scale: 2, // Higher resolution
            backgroundColor: '#f8fafc',
            onclone: (clonedDoc) => {
                // Hide the controls section in the cloned document so it doesn't appear in the image
                const controls = clonedDoc.getElementById('controls-section');
                if (controls) {
                    controls.style.display = 'none';
                }
                
                // Adjust height of scrollable containers to show full content
                const scrollables = clonedDoc.querySelectorAll('.overflow-y-auto');
                scrollables.forEach((el) => {
                   (el as HTMLElement).style.overflow = 'visible';
                   (el as HTMLElement).style.height = 'auto';
                });

                // Expand fixed heights
                const fixedHeights = clonedDoc.querySelectorAll('.h-\\[450px\\]');
                 fixedHeights.forEach((el) => {
                   (el as HTMLElement).style.height = 'auto';
                   (el as HTMLElement).style.minHeight = '450px';
                });
            }
        });

        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = `MarketPulse-Report-${new Date().toISOString().split('T')[0]}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (e) {
        console.error("Image generation failed", e);
        alert("Could not generate image. Please try again.");
    }
  };

  const t = TRANSLATIONS[language];

  return (
    <div className="min-h-screen pb-12" id="report-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            <DashboardHeader date={data?.date || new Date().toLocaleDateString()} language={language} />
            
            <Controls 
                selectedIndustry={selectedIndustry}
                selectedType={selectedType}
                language={language}
                onIndustryChange={setSelectedIndustry}
                onTypeChange={setSelectedType}
                onLanguageChange={setLanguage}
                onGenerate={handleGenerate}
                onExportPDF={handleExportPDF}
                onExportImage={handleExportImage}
                isLoading={loading}
                hasData={!!data}
            />

            {error && (
                <div className="bg-red-50 text-red-700 p-4 rounded-lg border border-red-200 mb-6 flex items-center gap-3">
                    <span className="font-bold">Error:</span> {error}
                </div>
            )}

            {!loading && data && (
                <div className="space-y-8">
                    {/* Top Summary Section */}
                    <div className="break-inside-avoid">
                        <MarketSentimentCard sentiment={data.marketSentiment} language={language} />
                    </div>

                    {/* Main Stats Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Job Volume/Difficulty Chart */}
                        <div className="lg:col-span-5 h-[450px]">
                            <JobCharts stats={data.jobStats} language={language} />
                        </div>
                        
                        {/* City Trends */}
                        <div className="lg:col-span-3 h-[450px]">
                            <CityTrends cities={data.topCities || []} language={language} />
                        </div>

                        {/* News Feed */}
                        <div className="lg:col-span-4 h-[450px]">
                            <NewsSection news={data.news} language={language} />
                        </div>
                    </div>

                    {/* Yearly Strategy Guide */}
                    <div className="break-inside-avoid">
                        <YearlyGuide strategies={data.yearlyGuide || []} language={language} />
                    </div>

                    {/* Company Lists */}
                    <div className="break-inside-avoid">
                        <CompanyList categories={data.recommendedCompanies || []} language={language} />
                    </div>

                    {/* Skills & Strategy */}
                    <div className="break-inside-avoid">
                        <SkillAnalysis skills={data.skills} bestRole={data.bestOpportunityRole} language={language} />
                    </div>
                </div>
            )}

            {loading && (
                <div className="space-y-6 animate-pulse">
                     <div className="bg-slate-200 h-32 rounded-xl w-full"></div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="bg-slate-200 h-80 rounded-xl"></div>
                        <div className="bg-slate-200 h-80 rounded-xl"></div>
                        <div className="bg-slate-200 h-80 rounded-xl"></div>
                    </div>
                    <div className="bg-slate-200 h-64 rounded-xl col-span-full"></div>
                    <div className="bg-slate-200 h-96 rounded-xl col-span-full"></div>
                </div>
            )}

            {!loading && !data && !error && (
                <div className="text-center py-20 text-slate-400">
                    {language === 'CN' ? '请选择行业和人群以生成报告。' : 'Select an industry and target audience to generate a report.'}
                </div>
            )}
        </div>

        {/* Print Footer */}
        <div className="print-footer hidden">
            <p>MarketPulse Career Tracker Report - Generated on {new Date().toLocaleString()}</p>
        </div>
    </div>
  );
};

export default App;