import { useState, useCallback } from 'react';
import { GoogleGenAI } from '@google/genai';

// Initialize the API outside so we don't do it on every render, assuming key is present.
// Note: Client-side generative AI calls expose the API key. 
// For a production app it must be done server-side, but for this demo frontend usage is expected.
const getAiClient = () => {
    const key = import.meta.env.VITE_GEMINI_API_KEY;
    if (!key) return null;
    return new GoogleGenAI({ apiKey: key });
};

export const useGemini = () => {
  const [insights, setInsights] = useState('');
  const [loadingAI, setLoadingAI] = useState(false);
  const [errorAI, setErrorAI] = useState(null);

  const generateInsights = useCallback(async (weatherData) => {
    const aiClient = getAiClient();
    
    if (!aiClient) {
      setErrorAI('VITE_GEMINI_API_KEY is missing in .env');
      return;
    }
    if (!weatherData) return;

    setLoadingAI(true);
    setErrorAI(null);

    const condition = weatherData.weather[0].description;
    const temp = weatherData.main.temp;
    const city = weatherData.name;
    const wind = weatherData.wind.speed;

    const prompt = `You are a helpful and premium AI Weather Assistant. 
Given the current weather in ${city}:
- Temperature: ${temp}°C
- Condition: ${condition}
- Wind Speed: ${wind} m/s

Please provide:
1. A brief clothing recommendation.
2. A short travel/activity advice.
3. Any weather safety warnings if applicable.
Keep it concise, friendly, and well formatted. Limit to 3 short paragraphs or bullet points.`;

    try {
      const response = await aiClient.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
      });
      
      setInsights(response.text);
    } catch (err) {
      console.error('Gemini API Error:', err);
      setErrorAI('Failed to generate insights.');
    } finally {
      setLoadingAI(false);
    }
  }, []);

  return { insights, loadingAI, errorAI, generateInsights };
};
