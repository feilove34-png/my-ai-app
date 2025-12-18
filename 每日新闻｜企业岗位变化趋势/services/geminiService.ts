
import { GoogleGenAI } from "@google/genai";
import { Industry, CandidateType, AnalysisResult, NewsItem, Language } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Helper to extract JSON from markdown code blocks if present
const extractJson = (text: string): any => {
  try {
    // Try standard parsing first
    return JSON.parse(text);
  } catch (e) {
    // Try extracting from code blocks
    const match = text.match(/```json\n([\s\S]*?)\n```/);
    if (match && match[1]) {
      try {
        return JSON.parse(match[1]);
      } catch (e2) {
        console.error("Failed to parse extracted JSON block", e2);
      }
    }
    // Fallback: simple cleanup of markdown syntax if no code block
    const cleaned = text.replace(/```json/g, '').replace(/```/g, '');
    try {
      return JSON.parse(cleaned);
    } catch (e3) {
      console.error("Failed to parse cleaned JSON", e3);
      throw new Error("Could not parse AI response.");
    }
  }
};

export const fetchDailyAnalysis = async (
  industry: Industry,
  candidateType: CandidateType,
  language: Language
): Promise<AnalysisResult> => {
  const today = new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });
  const langInstruction = language === 'CN' ? 'Simplified Chinese (简体中文)' : 'English';
  
  const prompt = `
    Role: You are a senior career consultant and industry analyst specializing in the Chinese job market.
    Task: Analyze the ${industry} industry for today (${today}) specifically for ${candidateType}.
    Focus: Non-technical roles (Product, Marketing, Operations, Sales, HR, Strategy/Analysis).
    LANGUAGE: Output strictly in ${langInstruction}.
    
    Actions:
    1. Search for the absolute latest breaking news (last 24-48 hours) in the ${industry} sector using Google Search.
    2. **MARKET SENTIMENT ANALYSIS**:
       - Analyze the current hiring sentiment.
       - **CRITICAL**: Cite specific OFFICIAL DATA (percentages, YOY growth) and RECENT GOVERNMENT POLICIES (e.g., from NDRC, MIIT, Ministry of Human Resources, or 5-Year Plans) to back up your analysis.
       - Extract 3-5 high-level KEYWORDS.
       - Identify specific OPPORTUNITY POINTS (where are the jobs? e.g., "Cross-border e-commerce due to new belt-road policies").
       - Identify specific RISKS/PITFALLS (what to avoid? e.g., "Shrinking offline retail teams").
    3. Estimate the "Hiring Volume Index" (0-100) for different non-tech job categories.
    4. Identify the Top 5 Hub Cities in China for these roles.
    5. List RECOMMENDED COMPANIES (3 categories).
       - Categories example: "Industry Giants", "High-Growth Unicorns", "Emerging/Niche Startups".
       - **CRITICAL DATA VOLUME**: The user will filter companies by city, so you MUST generate a large list.
       - **TARGET**: For EACH of the 3 categories, provide ~8-10 companies for EACH of these 5 cities: Beijing, Shanghai, Guangzhou, Shenzhen, Hangzhou.
       - (Total dataset should be approx 120-150 companies).
       - Required Fields: "name", "location" (Must exactly match the city name in target language), "scale" (Market Cap/Valuation/Employees).
    6. Analyze SKILLS & SUCCESS PROFILE: For each role category:
       - Describe hard/soft skills.
       - Describe the "Ideal Student Profile" (e.g., specific majors, personality type, background).
       - **CRITICAL**: Provide a 'capabilityBreakdown' which is a percentage estimation of what matters most for getting an offer. Factors: 'Internship Experience', 'Academic Background', 'Soft Skills', 'Hard Skills'. Sum to 100.
    7. Provide a YEAR-BY-YEAR GUIDE (University Year 1 to Year 4).

    Output format:
    You MUST return a valid JSON object wrapped in \`\`\`json\`\`\` code block. The structure must be exactly:
    {
      "date": "${today}",
      "industry": "${industry}",
      "news": [
        { "title": "News Title", "summary": "Short summary", "source": "Source Name" }
      ],
      "marketSentiment": {
        "summary": "Detailed text summary incorporating official data statistics and government policy backing...",
        "keywords": ["Keyword 1", "Keyword 2", "Keyword 3"],
        "opportunities": ["Opportunity 1", "Opportunity 2"],
        "risks": ["Risk 1", "Risk 2"]
      },
      "jobStats": [
        { "role": "Product Manager", "volumeIndex": 75, "difficulty": 80, "primarySkill": "Data Analysis" },
        ... (4-5 roles)
      ],
      "skills": [
        {
          "roleCategory": "Product/Strategy",
          "hardSkills": ["Skill 1", "Skill 2"],
          "softSkills": ["Skill A", "Skill B"],
          "successTip": "Specific advice",
          "preferredStudentProfile": "Descriptive text about the ideal candidate...",
          "capabilityBreakdown": [
            { "name": "Internship Experience", "percentage": 40 },
            { "name": "Academic Background", "percentage": 30 },
            { "name": "Hard Skills", "percentage": 20 },
            { "name": "Soft Skills", "percentage": 10 }
          ]
        },
        ... (2-3 categories)
      ],
      "yearlyGuide": [
        {
            "year": "大一 (Freshman)",
            "focus": "Exploration...",
            "recommendedRoles": ["Role A", "Role B"],
            "reasoning": "..."
        },
        ... (Sophomore, Junior, Senior)
      ],
      "topCities": [
        { "name": "Beijing", "heatIndex": 95, "desc": "Headquarters..." },
        ...
      ],
      "recommendedCompanies": [
        {
            "categoryName": "Leading Enterprises",
            "description": "...",
            "companies": [
                { "name": "Company A", "location": "Beijing", "scale": "100B USD Market Cap" },
                ...
            ]
        },
        ... (3 categories total)
      ],
      "bestOpportunityRole": "Name of the role"
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    const data = extractJson(text);
    
    // Enrich with grounding metadata URLs if available
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (chunks && data.news) {
        data.news = data.news.map((item: NewsItem) => {
            const chunk = chunks.find((c: any) => c.web?.title?.includes(item.title) || c.web?.title);
            return {
                ...item,
                url: chunk?.web?.uri || '#'
            };
        });
    }

    return data as AnalysisResult;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
