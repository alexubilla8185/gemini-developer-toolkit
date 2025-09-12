import { GoogleGenAI, Type } from "@google/genai";

const regexResponseSchema = {
    type: Type.OBJECT,
    properties: {
        pattern: {
            type: Type.STRING,
            description: "The generated regular expression pattern as a string.",
        },
        explanation: {
            type: Type.STRING,
            description: "A step-by-step explanation of how the regular expression works, formatted for clarity.",
        },
    },
    required: ["pattern", "explanation"],
};

interface NetlifyEvent {
    body: string;
    // Fix: Add httpMethod to the NetlifyEvent type to match Netlify's function event shape.
    httpMethod: string;
}

export const handler = async (event: NetlifyEvent) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  if (!process.env.API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "API_KEY environment variable not set on the server." }),
    };
  }

  try {
    const { prompt } = JSON.parse(event.body);
    if (!prompt) {
        return { statusCode: 400, body: JSON.stringify({ error: "Prompt is required." }) };
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        // Fix: Simplified contents to be a direct string as per Gemini API guidelines for single text prompts.
        contents: `Generate a regular expression for this description: "${prompt}"`,
        config: {
            responseMimeType: "application/json",
            responseSchema: regexResponseSchema,
        }
    });
    
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: response.text, // Directly pass the JSON string from Gemini
    };

  } catch (error: any) {
    console.error("Error in generate-regex function:", error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: "Failed to generate regex.", details: error.message }),
    };
  }
};