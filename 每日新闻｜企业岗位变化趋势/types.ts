
export enum Industry {
  INTERNET = '互联网',
  ECOMMERCE = '电商',
  FMCG = '快消',
  AI = '人工智能 (AI)',
  NEW_ENERGY = '新能源',
  FINANCE = '金融',
  CONSULTING = '咨询',
  PETS = '宠物',
  ROBOTICS = '机器人',
  HEALTHCARE = '大健康医疗'
}

export enum CandidateType {
  GRADUATE = '应届毕业生',
  INTERN = '日常实习生'
}

export type Language = 'CN' | 'EN';

export interface NewsItem {
  title: string;
  summary: string;
  source?: string;
  url?: string;
}

export interface JobStat {
  role: string; // e.g., Product, Operation, Marketing
  volumeIndex: number; // 0-100 scale representing hiring volume
  difficulty: number; // 0-100 scale
  primarySkill: string;
}

export interface CapabilityWeight {
    name: string; // e.g., "Internship Experience", "Academic Background", "Hard Skills"
    percentage: number; // 0-100
}

export interface SkillRequirement {
  roleCategory: string;
  hardSkills: string[];
  softSkills: string[];
  successTip: string;
  preferredStudentProfile: string; // Description of students with high success rate
  capabilityBreakdown: CapabilityWeight[]; // For the pie/bar chart visualization
}

export interface CityStat {
  name: string;
  heatIndex: number; // 0-100
  desc: string; // Short description of why this city is hot
}

export interface CompanyInfo {
  name: string;
  location: string; // City
  scale: string; // Market Cap, Valuation, or Employee count
}

export interface CompanyCategory {
  categoryName: string; // e.g., "Large Giants", "Unicorns", "Startups"
  description: string; // Brief description of pros/cons working here
  companies: CompanyInfo[]; // List of companies with details
}

export interface YearlyStrategy {
  year: string; // e.g., "大一 (Freshman)"
  focus: string; // Main focus area
  recommendedRoles: string[]; // Roles to apply for
  reasoning: string; // Why these roles?
}

export interface MarketSentiment {
  summary: string; // Detailed summary with data and policy backing
  keywords: string[]; // 3-5 keywords
  opportunities: string[]; // List of opportunity points
  risks: string[]; // List of risk points/pitfalls
}

export interface AnalysisResult {
  date: string;
  industry: string;
  news: NewsItem[];
  jobStats: JobStat[];
  skills: SkillRequirement[];
  topCities: CityStat[];
  recommendedCompanies: CompanyCategory[];
  marketSentiment: MarketSentiment;
  bestOpportunityRole: string;
  yearlyGuide: YearlyStrategy[];
}

export interface SelectOption {
    label: string;
    value: string;
}
